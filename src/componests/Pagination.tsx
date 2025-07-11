'use client'
type Props ={
    totalPages: number,
    currentPage: number,
    onPageChage: number
}

const Pagination = ({ totalPages, currentPage, onPageChage }:Props) => {
  return (
    <nav>
      <ul className="flex items-center justify-center -space-x-px h-10 text-base bottom-0">
        <li
          className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight hover:bg-blue-400 hover:text-white rounded-s-lg cursor-pointer
          ${currentPage === 1 ? "opacity-30 pointer-events-none" : ""}
        `}
          onClick={() => {
            // if (currentPage !== 1) onPageChage(currentPage - 1);
          }}
        >
          <svg
            className="w-3 h-3 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li
            key={i}
            className={`flex items-center justify-center px-4 h-10 leading-tight hover:bg-blue-400 hover:text-white cursor-pointer ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}
            // onClick={() => onPageChage(i + 1)}
          >
            {i + 1}
          </li>
        ))}
        <li
          className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border-gray-300 rounded-e-lg  hover:bg-blue-400 hover:textWhite cursor-pointer
          ${currentPage === totalPages ? "opacity-30 pointer-events-none" : ""}
        `}
          onClick={() => {
            // if (currentPage < totalPages) onPageChage(currentPage + 1);
          }}
        >
          <svg
            className="w-3 h-3 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;