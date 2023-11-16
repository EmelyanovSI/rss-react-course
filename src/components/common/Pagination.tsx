import { Page } from '@/interfaces/animal';
import classNames from 'classnames';
import { ChangeEvent, FC } from 'react';

interface PaginationProps {
  page: Page;
  options?: number[];
  onPrevClick?: () => void;
  onNextClick?: () => void;
  onPageChange?: (page: string) => void;
  onPageSizeChange?: (limit: string) => void;
}

const Pagination: FC<PaginationProps> = ({
  page,
  options = [10, 25, 50, 100],
  onPrevClick,
  onNextClick,
  onPageChange,
  onPageSizeChange,
}) => {
  const { firstPage, lastPage, pageNumber, totalPages, pageSize } = page;

  const iconClasses = classNames('material-symbols-outlined', 'text-base');
  const buttonClasses = classNames(
    'flex items-center gap-1',
    'border whitespace-nowrap',
    'hover:shadow hover:z-10 active:shadow-none',
    'transition duration-500 ease-in-out',
    'h-10 px-6 select-none'
  );

  const disableClasses = (disabled: boolean) => {
    return classNames({
      'bg-gray-100 hover:shadow-none cursor-not-allowed': disabled,
      'cursor-pointer': !disabled,
    });
  };

  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage.toString());
    }
  };

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (onPageSizeChange) {
      onPageSizeChange(event.target.value);
    }
  };

  const renderPageNumbers = () => {
    const currentPageNumber = pageNumber + 1;
    const pageNumbers = [];
    const maxVisiblePages = 4;
    const sidePages = (maxVisiblePages - 1) % 2;

    pageNumbers.push(
      <button
        key={1}
        type="button"
        disabled={1 === currentPageNumber}
        className={classNames(
          buttonClasses,
          disableClasses(1 === currentPageNumber)
        )}
        onClick={() => handlePageChange(1)}
      >
        1
      </button>
    );

    if (currentPageNumber > sidePages + 1) {
      pageNumbers.push(
        <span key="ellipsis-before" className="text-base">
          ...
        </span>
      );
    }

    for (
      let i = Math.max(2, currentPageNumber - sidePages);
      i <= Math.min(totalPages - 1, currentPageNumber + sidePages);
      ++i
    ) {
      pageNumbers.push(
        <button
          key={i}
          type="button"
          disabled={i === currentPageNumber}
          className={classNames(
            buttonClasses,
            disableClasses(i === currentPageNumber)
          )}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (currentPageNumber < totalPages - sidePages) {
      pageNumbers.push(
        <span key="ellipsis-after" className="text-base">
          ...
        </span>
      );
    }

    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key={totalPages}
          type="button"
          disabled={totalPages === currentPageNumber}
          className={classNames(
            buttonClasses,
            disableClasses(totalPages === currentPageNumber)
          )}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="mt-2 md:mt-0 mr-2">
        <span className="mr-2">Page Size:</span>
        <select
          role="combobox"
          name="size"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          {options.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex rounded-full bg-red-100">
        <button
          disabled={firstPage}
          type="button"
          className={classNames(
            buttonClasses,
            disableClasses(firstPage),
            'rounded-l-full'
          )}
          onClick={onPrevClick}
        >
          <span
            className={classNames(
              iconClasses,
              disableClasses(firstPage),
              '-ml-2'
            )}
          >
            arrow_left_alt
          </span>
          <span className={disableClasses(firstPage)}>Prev</span>
        </button>

        {renderPageNumbers()}

        <button
          disabled={lastPage}
          type="button"
          className={classNames(
            buttonClasses,
            disableClasses(lastPage),
            'rounded-r-full'
          )}
          onClick={onNextClick}
        >
          <span className={disableClasses(lastPage)}>Next</span>
          <span
            className={classNames(
              iconClasses,
              disableClasses(lastPage),
              '-mr-2'
            )}
          >
            arrow_right_alt
          </span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
