import { getNumbers } from '../../utils';

interface Props {
  items: string[];
  ItemsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: React.FC<Props> = ({
  items,
  ItemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  function creativePageContent(
    data: string[],
    listLegth: number,
    selectPage: number = 1,
  ) {
    const arrayOfSliceData = [];
    const index = selectPage - 1;

    for (let i = 0; i < data.length; i += listLegth) {
      arrayOfSliceData.push(data.slice(i, i + listLegth));
    }

    const pageContent = arrayOfSliceData[index];

    return pageContent;
  }

  const content = creativePageContent(items, ItemsPerPage, currentPage);

  function handlePageChange(number: number) {
    setCurrentPage(number);
  }

  const totalPages = Math.ceil(items.length / ItemsPerPage);
  const pages: number[] = getNumbers(1, totalPages);

  function movePage(page: number, direction: string) {
    if (direction === 'back' && page !== 1) {
      setCurrentPage(page - 1);
    }

    if (direction === 'next' && page !== totalPages) {
      setCurrentPage(page + 1);
    }
  }

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''} `}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? true : false}
            onClick={() => movePage(currentPage, 'back')}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={`page-item ${currentPage === totalPages ? 'disabled' : ''} `}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages ? true : false}
            onClick={() => movePage(currentPage, 'next')}
          >
            »
          </a>
        </li>
      </ul>
      {}
      <ul>
        {content.map((n, index) => (
          <li key={index} data-cy="item">
            {n}
          </li>
        ))}
      </ul>
    </>
  );
};
