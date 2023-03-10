import { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalMinor from '../Modal/Modal';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const onClick = () => {
    setIsModalActive((isModalActive) => !isModalActive);
  };
  return (
    <div>
      <div className={styles.mainWrap}>
        <div className={styles.LinkBlock}>
          <Link className={styles.LinkElement} to="/">
            <div className={styles.NavText}>Main</div>
          </Link>
        </div>
        <div className={styles.LinkBlock}>
          <Link className={styles.LinkElement} to="/portfolio">
            <div className={styles.NavText}>Portfolio</div>
          </Link>
        </div>
        <div className={styles.LinkBlock}>
          <div className={styles.LinkElement} onClick={() => onClick()}>
            <div className={styles.NavText}>Search</div>
          </div>
        </div>
      </div>
      <ModalMinor isActive={isModalActive} setIsActive={setIsModalActive} />
    </div>
  );
};

export default Navbar;
