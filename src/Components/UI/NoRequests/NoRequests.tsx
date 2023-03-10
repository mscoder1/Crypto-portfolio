import styles from './NoRequests.module.css';

const NoRequests = () => {
  return (
    <div className={styles.NoRequestsWrap}>
      Sorry, no requests left
      <br />
      Please wait
    </div>
  );
};

export default NoRequests;
