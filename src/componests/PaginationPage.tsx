"use client";
import { Pagination } from "antd";

type Props = {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
};

const PAGE_SIZE = 20;
const PaginationPage = ({
  totalItems,
  totalPages,
  currentPage,
  onPageChange,
  isLoading = false,
}: Props) => {

  if (totalPages < 2) return null; // hide if only 1 page

  return (
    <div className="flex justify-center mt-4">
      <Pagination
        total={totalItems}
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
