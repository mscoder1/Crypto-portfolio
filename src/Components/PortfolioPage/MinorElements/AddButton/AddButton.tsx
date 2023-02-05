import { useState } from "react";
import ModalMinor from "../../../ModalMinor/ModalMinor";
import styles from "./AddButton.module.css";

const AddButton = () => {
  const [isModalMinor, setIsModalMinor] = useState(false);

  const onMinorWrap = () => {
    !isModalMinor ? setIsModalMinor(true) : setIsModalMinor(false);
  };

  return (
    <div className={styles.PPAddToPButton}>
      <button
        className={styles.PPAddBlockButtonAdd}
        onClick={() => onMinorWrap()}
      >
        Add coin
      </button>
      <ModalMinor isActive={isModalMinor} setIsActive={setIsModalMinor} />
    </div>
  );
};

export default AddButton;
