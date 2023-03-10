import { newsAPI } from '../../Services/NewsService';
import styles from './NewsBlock.module.css';

const NewsBlock = () => {
  interface INews {
    date: string;
    description: string;
    title: string;
    url: string;
  }

  const { data: news } = newsAPI.useFetchNewsQuery('');

  return (
    <section className={styles.newsBlockWrap}>
      <h2 className={styles.newsBlockTitle}>Latest News</h2>
      <div className={styles.newsCardsWrap}>
        {news?.map((element: INews) => (
          <article className={styles.newsCard} key={element.url}>
            <a href={element.url} className={styles.newsCard}>
              <h3>{element.title}</h3>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default NewsBlock;
