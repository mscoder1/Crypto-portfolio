import { memo, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { coinAPI } from '../../Services/CoinsService';
import NoRequests from '../UI/NoRequests/NoRequests';
import styles from './ModalMinor.module.css';

interface ModalMinorProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}

interface SearchedCoinsTypes {
  id: string;
  symbol: string;
  name: string;
}

const ModalMinor = memo((props: ModalMinorProps) => {
  const [searchCoin, setSearchCoin] = useState('');
  const { data: coins = [], isError } = coinAPI.useSearchCoinQuery('');
  const onClick = () => {
    setSearchCoin('');
    props.setIsActive(false);
  };

  const exactSearchedElement: SearchedCoinsTypes[] = [];

  const SearchCards = useMemo(() => {
    return searchCoin
      ? [...coins].filter((coin) => {
        if (coin.name.toLowerCase() === searchCoin.toLocaleLowerCase()) {
          return exactSearchedElement.push(coin);
        } return coin.name
          .toLowerCase()
          .includes(searchCoin.toLocaleLowerCase());
      })
      : [];
  }, [searchCoin]);

  const SearchedCoins = exactSearchedElement.length ? exactSearchedElement : SearchCards;

  return (
    <div
      className={props.isActive ? styles.minorActive : styles.minorDisabled}
      onClick={() => onClick()}
    >
      <div
        className={styles.minorMainWrap}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.inputBlock}>
          <div className={styles.techInputWrap}>
            <input
              className={styles.inputSearch}
              value={searchCoin}
              onChange={(e) => setSearchCoin(e.target.value)}
              placeholder="Search..."
            />
          </div>
        </div>
        <div className={styles.minorCardsWrap}>
          {isError && <NoRequests />}
          {SearchedCoins?.map((element: SearchedCoinsTypes) => (
            <Link
              to={`/coins/${element.id}`}
              className={styles.minorCard}
              onClick={() => onClick()}
              key={element.id}
            >
              <div className={styles.minorCardText}>
                <div className={styles.minorCardTextTechWrap}>
                  {element.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
});

export default ModalMinor;
