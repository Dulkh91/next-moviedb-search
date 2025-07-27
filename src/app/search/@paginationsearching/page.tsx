"use client";
import dynamic from "next/dynamic";
import { Skeleton } from "antd";
const MoviePagination = dynamic(() => import("@/componests/MoviePagination"), {
  ssr: false,
  loading: () => <Skeleton active />,
});

const PaginationSearching = () => {
  return <MoviePagination />;
};

export default PaginationSearching;
