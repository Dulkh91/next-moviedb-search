'use client'


const Pagination = () => {
  return (
    <nav>
      <ul className="flex items-center justify-center -space-x-px h-10 text-base bottom-0">
        <li
          className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight hover:bg-blue-400 hover:text-white rounded-s-lg cursor-pointer`}
        >
          <svg
            className="w-3 h-3 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </li>
      
          <li className={`flex items-center justify-center px-4 h-10 leading-tight hover:bg-blue-400 hover:text-white cursor-pointe`}>
            1
          </li>
           <li className={`flex items-center justify-center px-4 h-10 leading-tight hover:bg-blue-400 hover:text-white cursor-pointe`}>
            2
          </li>
       
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
      </ul>
    </nav>
  );
};

export default Pagination;