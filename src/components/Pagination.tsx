import classNames from 'classnames';
import { FC } from 'react';

const Pagination: FC = () => {
  const buttonClasses = classNames(
    'flex items-center gap-1',
    'border whitespace-nowrap',
    'hover:shadow hover:z-10 active:shadow-none',
    'transition duration-500 ease-in-out',
    'h-10 px-6 select-none'
  );
  const iconClasses = classNames('material-symbols-outlined', 'text-base');

  const disableClasses = classNames({
    'bg-gray-100 hover:shadow-none cursor-not-allowed': false,
    'cursor-pointer': true,
  });

  const handlePrevClick = () => {
    // handlePrevClick
  };

  const handleNextClick = () => {
    // handleNextClick
  };

  return (
    <div className="flex rounded-full bg-red-100">
      <button
        type="button"
        className={classNames(buttonClasses, disableClasses, 'rounded-l-full')}
        onClick={handlePrevClick}
      >
        <span className={classNames(iconClasses, disableClasses, '-ml-2')}>
          arrow_left_alt
        </span>
        <label className={classNames(disableClasses)}>Prev</label>
      </button>
      <button
        type="button"
        className={classNames(buttonClasses, disableClasses, 'rounded-r-full')}
        onClick={handleNextClick}
      >
        <label className={classNames(disableClasses)}>Next</label>
        <span className={classNames(iconClasses, disableClasses, '-mr-2')}>
          arrow_right_alt
        </span>
      </button>
    </div>
  );
};

export default Pagination;
