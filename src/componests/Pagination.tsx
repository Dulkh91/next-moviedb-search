"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Pagination } from "antd";
import { useMovie } from "@/hooks/useMovie";
import { useEffect } from "react";
import { useRated } from "@/hooks/useRated";

const PaginationPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const pageInitial = parseInt(searchParams.get("page") || "1");
  const queryInitial = searchParams.get("query") || "";

  const { data, isValidating, isLoading } = useMovie(
    queryInitial,
    String(pageInitial),
    queryInitial ? "search" : "discover",
  );
  const { ratedData } = useRated();

  useEffect(() => {
    // switch to rated page
    if (ratedData && pageInitial !==1) {
      const params = new URLSearchParams(searchParams.toString());
      if(ratedData.total_pages> 1) {
        params.set("page", String(pageInitial));
        router.push(`${pathname}?${params.toString()}`);
      }
      return;
    }
    // if query is empty and page is set, remove page from URL of search page
    if (!queryInitial && searchParams.has("page") && isLoading) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    }

  }, [queryInitial, searchParams, pathname, isLoading, ratedData, pageInitial, router]);

  const isRatedPage = pathname.includes("rated");
  const paginationData = isRatedPage ? ratedData : data;

if (isValidating || !paginationData) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* <Skeleton active /> */}
    </div>
  );
}

const handleChangePage = (newPage: number) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set("page", String(newPage));
  router.push(`${pathname}?${params.toString()}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

return (
  <div className="flex justify-center mt-4">
    { typeof paginationData.total_pages !== "undefined" && (
      <Pagination
      total={paginationData.total_results}
      defaultPageSize={20}
      current={Number(pageInitial)}
      onChange={handleChangePage}
      showSizeChanger={false}
      disabled={isValidating}
      align="center"
      className={`${paginationData.total_pages < 2 ? "invisible" : ""}`}
    />
    )}
  </div>
);
};

export default PaginationPage;
