"use client";
import { Pagination } from "antd";

type Props = {
  // totalItems: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
};

const PAGE_SIZE = 20;
const API_PAGE_LIMIT = 500; // ដែនកំណត់ទំព័ររបស់ TMDb API
const PaginationPage = ({
  // totalItems,
  totalPages,
  currentPage,
  onPageChange,
  isLoading = false,
}: Props) => {
  // ប្រើតម្លៃទំព័រតូចជាងគេរវាង totalPages របស់ API និង 500
  const limitedTotalPages = Math.min(totalPages, API_PAGE_LIMIT);
  const limitedTotalItems = limitedTotalPages * PAGE_SIZE;
  if (limitedTotalPages < 2 || typeof totalPages === "undefined") return null; // hide if only 1 page
  return (
    <div className="flex justify-center mt-4">
      <Pagination
        total={limitedTotalItems}
        defaultPageSize={PAGE_SIZE}
        current={currentPage}
        onChange={onPageChange}
        showSizeChanger={false}
        disabled={isLoading}
        className="animate-fadeIn"
      />
    </div>
  );
};

export default PaginationPage;
