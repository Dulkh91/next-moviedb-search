"use client";
import { Skeleton, Flex } from "antd";
import dynamic from "next/dynamic";

const RatedPage = dynamic(() => import("@/app/rated/RatedPage"), {
  ssr: false,
  loading: () => <Skeleton active />,
});

const PaginationPage = dynamic(() => import("@/componests/Pagination"), {
  ssr: false,
  loading: () => <Skeleton active />,
});
const RateClientPage = () => {
  
  return (
    <>
      <RatedPage />
      <Flex justify="center" flex={"flex"} className="mt-5 pagination-custom">
        <PaginationPage />
      </Flex>
    </>
  );
};

export default RateClientPage;
