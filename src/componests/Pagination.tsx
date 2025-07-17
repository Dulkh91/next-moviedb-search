"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Pagination, Skeleton } from "antd";
import { useMovie } from "@/hooks/useMovie";

const PaginationPage = () => {
  const searchParams = useSearchParams()!; //Or as ReadonlyURLSearchParams;
  const router = useRouter();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "1");

  const { data, isValidating } = useMovie("", String(page), "");

  if (isValidating || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Skeleton active />
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
    <Pagination
      total={data?.total_results}
      current={page}
      onChange={handleChangePage}
      align="center"
      disabled={isValidating}
    />
  );
};

export default PaginationPage;
