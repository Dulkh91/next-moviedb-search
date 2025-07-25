"use client";
import dynamic from "next/dynamic";
import { Skeleton } from "antd";
const MovieSearchPage = dynamic(() => import("@/app/search/MovieSeach"), {
  ssr: false,
  loading: () => <Skeleton active />,
});

const SearchMovie = () => {
  return <MovieSearchPage />;
};

export default SearchMovie;
