"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Pagination } from "antd";
import { useMovie } from "@/hooks/useMovie";
import { useEffect} from "react";

const PaginationPage = () => {
  const searchParams = useSearchParams()!; //Or as ReadonlyURLSearchParams;
  const router = useRouter();
  const pathname = usePathname()!;
  const pageInitail = parseInt(searchParams.get("page") || "1");
  const queryInitail = searchParams.get("query") || "";
  const type = pathname.includes("search") ? "search" : "discover";
 

  const { data, isValidating ,isLoading} = useMovie(
    queryInitail,
    String(pageInitail),
    String(type),
  );

  

  useEffect(() => {
    if (!queryInitail && searchParams.has("page"),isLoading) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [queryInitail]);


  if (isValidating || !data) {
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
    <div className=" flex justify-center">
      <Pagination
        total={data.total_results}
        defaultPageSize={20}
        current={Number(pageInitail)}
        onChange={handleChangePage}
        showSizeChanger={false}
        disabled={isValidating}
        align="center"
        className={`${data.total_pages < 2 ? "invisible" : ""}`}
      />
     
    </div>
  );
};

export default PaginationPage;
