import styles from "./MySort.module.css";

interface mySortProps {
  options: optionTypes[];
  defaultValue: string;
  value: string;
  onChange: (e: string) => void;
}

interface optionTypes {
  name: string;
  value: string;
}

const MySort = ({ options, defaultValue, value, onChange }: mySortProps) => {
  return (
    <div className={styles.selectWrap}>
      <select
        className={styles.selectElement}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option disabled id="coinselect" value="">
          {defaultValue}
        </option>
        {options.map((option: optionTypes) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MySort;
