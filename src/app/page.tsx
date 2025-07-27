import dynamic from "next/dynamic";
import { Skeleton, Flex } from "antd";

const MovieList = dynamic(() => import("@/componests/MovieList"), {
  loading: () => <Skeleton active />,
});
const PaginationPage = dynamic(() => import("@/componests/MoviePagination"), {
  loading: () => <Skeleton active />,
});

export default function Home() {
  return (
    <>
      <MovieList />
      <Flex justify="center" flex={"flex"} className="mt-3 pagination-custom">
        <PaginationPage />
      </Flex>
    </>
  );
}
