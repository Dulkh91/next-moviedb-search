"use client";
import { Skeleton, Flex } from "antd";
import dynamic from "next/dynamic";

const RatedPage = dynamic(() => import("@/componests/pages/RatedPage"), {
  ssr: false,
});

const PaginationPage = dynamic(() => import("@/componests/Pagination"), {
  loading: () => <Skeleton active />,
});
const RatingPage = () => {
  return (
    <>
      <RatedPage />;
      <Flex justify="center" flex={"flex"} className="mt-5 pagination-custom">
        <PaginationPage />
      </Flex>
    </>
  );
};

export default RatingPage;
