import classNames from 'classnames';
import { FC } from 'react';

interface PaginationProps {
  first?: boolean;
  last?: boolean;
  onPrevClick?: () => void;
  onNextClick?: () => void;
}

const Pagination: FC<PaginationProps> = ({
  first = true,
  last = true,
  onPrevClick,
  onNextClick,
}) => {
  const buttonClasses = classNames(
    'flex items-center gap-1',
    'border whitespace-nowrap',
    'hover:shadow hover:z-10 active:shadow-none',
    'transition duration-500 ease-in-out',
    'h-10 px-6 select-none'
  );
  const iconClasses = classNames('material-symbols-outlined', 'text-base');

  const disableClasses = (disabled: boolean) => {
    return classNames({
      'bg-gray-100 hover:shadow-none cursor-not-allowed': disabled,
      'cursor-pointer': !disabled,
    });
  };

  return (
    <div className="flex rounded-full bg-red-100">
      <button
        disabled={first}
        type="button"
        className={classNames(
          buttonClasses,
          disableClasses(first),
          'rounded-l-full'
        )}
        onClick={onPrevClick}
      >
        <span
          className={classNames(iconClasses, disableClasses(first), '-ml-2')}
        >
          arrow_left_alt
        </span>
        <label className={disableClasses(first)}>Prev</label>
      </button>
      <button
        disabled={last}
        type="button"
        className={classNames(
          buttonClasses,
          disableClasses(last),
          'rounded-r-full'
        )}
        onClick={onNextClick}
      >
        <label className={disableClasses(last)}>Next</label>
        <span
          className={classNames(iconClasses, disableClasses(last), '-mr-2')}
        >
          arrow_right_alt
        </span>
      </button>
    </div>
  );
};

export default Pagination;
