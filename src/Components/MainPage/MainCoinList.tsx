import { useState } from 'react';
import _ from 'lodash';
import { coinAPI } from '../../Services/CoinsService';
import NewsBlock from '../NewsBlock/NewsBlock';
import MainSingleCoinBLock from './MainSingleCoinBlock';
import styles from './MainCoinList.module.css';
import { IFullCoinInfo } from '../../Models/IFullCoinInfo';
import NoRequests from '../UI/NoRequests/NoRequests';
import TopInfoBlock from './MinorElements/TopInfoBlock';
import DataFetching from '../UI/DataFetching/DataFetching';

const MainCoinList = () => {
  const [page, setPage] = useState(1);

  const {
    data: coins,
    isFetching,
    error,
  } = coinAPI.useFetchAllCoinsQuery(page);

  const { data: AllCoins } = coinAPI.useSearchCoinQuery('');

  const PagesCount = AllCoins && _.range(Math.ceil(AllCoins.length / 100));

  /* DOPISAT KNOPKI MAPOM */

  console.log(PagesCount);

  return (
    <div className={styles.mainWrap}>
      <div className={styles.wrap}>
        <TopInfoBlock />
        <div className={styles.mainCoinListWrapScroll}>
          <div className={styles.mainCoinsListWrap}>
            {isFetching ? (
              <DataFetching />
            ) : (
              coins?.map((coin: IFullCoinInfo) => (
                <MainSingleCoinBLock
                  key={coin.id}
                  coin={coin}
                  currency="USD"
                />
              ))
            )}
            <div className={styles.bottomBtnBlockWrap}>
              {error && <NoRequests />}
              <div className={error ? styles.bottomBtnBlockNotActive : styles.bottomBtnBlock}>
                <button
                  type="button"
                  className={page === 1 ? styles.bottomBtnDisabled : styles.toFirstPageBtn}
                  onClick={() => setPage(1)}
                >
                  1
                </button>
                <button
                  type="button"
                  className={page > 2 ? styles.toPrevBtn : styles.bottomBtnDisabled}
                  onClick={() => setPage((page) => page - 1)}
                >
                  {page - 1}
                </button>
                <button
                  type="button"
                  className={styles.currentPageBtn}
                >
                  {page}
                </button>
                <button
                  type="button"
                  className={page >= 119 ? styles.bottomBtnDisabled : styles.toNextBtn}
                  onClick={() => setPage((page) => (page === 118 ? 119 : page + 1))}
                >
                  {page === 118 ? 119 : page + 1}
                </button>
                <button
                  type="button"
                  className={page === 120 ? styles.bottomBtnDisabled : styles.toLastPageBtn}
                  onClick={() => setPage(120)}
                >
                  120
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewsBlock />
    </div>
  );
};

export default MainCoinList;
