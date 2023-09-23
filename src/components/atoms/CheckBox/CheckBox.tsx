import "./CheckBox.css";

type Props = {
  css?: string;
  label: string;
  checked: boolean;
  onChange: () => void;
};

const CheckBox = ({ css, label, checked, onChange }: Props) => {
  const handleChange = () => onChange();
  return (
    <div className={css}>
      <fieldset className="checkbox-002">
        <label>
          <input type="checkbox" name="checkbox-002" checked={checked} onChange={handleChange} />
          {label}
        </label>
      </fieldset>
    </div>
  );
};

export default CheckBox;
