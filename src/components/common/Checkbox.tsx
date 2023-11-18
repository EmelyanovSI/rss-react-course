import classNames from 'classnames';
import { FC } from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({ label, checked, onChange }) => {
  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <label
      className={classNames(
        'flex items-center gap-1 border-2',
        'rounded-full whitespace-nowrap',
        'hover:shadow active:shadow-none',
        'transition duration-500 ease-in-out',
        'border-red-100 h-10 px-6 select-none cursor-pointer',
        { 'bg-red-100': checked }
      )}
    >
      <input
        type="checkbox"
        name={label}
        checked={checked}
        onChange={handleChange}
        className={classNames(
          'material-symbols-outlined',
          '-ml-2 text-base cursor-pointer'
        )}
      />
      <span className="cursor-pointer">{label}</span>
    </label>
  );
};

export default Checkbox;
