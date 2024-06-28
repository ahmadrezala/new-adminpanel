import React from 'react';
import { useRouter } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const router = useRouter();
  

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`?page=${page}`, { scroll: false });
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(currentPage - halfMaxPagesToShow, 1);
    let endPage = Math.min(currentPage + halfMaxPagesToShow, totalPages);

    if (currentPage - startPage < halfMaxPagesToShow) {
      endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
    }

    if (endPage - currentPage < halfMaxPagesToShow) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    const showDotsBefore = startPage > 1;
    const showDotsAfter = endPage < totalPages;

    if (showDotsBefore) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push('before-dots');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (showDotsAfter) {
      if (endPage < totalPages - 1) {
        pageNumbers.push('after-dots');
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((page, index) =>
      typeof page === 'string' ? (
        <span key={page}>{'...'}</span>
      ) : (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      )
    );
  };

  return (
    <div className="pagination">
      <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      {renderPageNumbers()}
      <button onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};


