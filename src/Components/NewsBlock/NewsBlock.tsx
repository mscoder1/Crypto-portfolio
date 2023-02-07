import { newsAPI } from '../../Services/NewsService';
import styles from './NewsBlock.module.css';

const NewsBlock = () => {
  interface INews {
    date: string;
    description: string;
    title: string;
    url: string;
  }

  const {
    data: news,
  } = newsAPI.useFetchNewsQuery('');

  return (
    <div className={styles.newsBlockWrap}>
      <div className={styles.newsBlockTitle}>Latest News</div>
      <div className={styles.newsCardsWrap}>
        {news?.map((element: INews) => (
          <a href={element.url} className={styles.newsCard} key={element.url}>
            {element.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsBlock;
