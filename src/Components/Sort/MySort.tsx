import styles from './MySort.module.css';

interface MySortProps {
  options: OptionTypes[];
  defaultValue: string;
  value: string;
  onChange: (e: string) => void;
}

interface OptionTypes {
  name: string;
  value: string;
}

const MySort = ({
  options, defaultValue, value, onChange,
}: MySortProps) => {
  return (
    <select
      className={styles.selectElement}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option disabled id="coinselect" value="">
        {defaultValue}
      </option>
      {options.map((option: OptionTypes) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default MySort;
