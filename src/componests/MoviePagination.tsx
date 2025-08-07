"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MovieApiResponse } from "@/types/MovieApiResponse";
import { useMovie } from "@/hooks/useMovie";
import { Skeleton } from "antd";
import { useRated } from "@/hooks/useRated";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const PaginationPage = dynamic(() => import("@/componests/PaginationPage"), {
  ssr: false,
  loading: () => <Skeleton active />,
});

const MoviePagination = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const query = searchParams.get("query") || "";
  const isSearchPage = pathname.includes("search");
  const isRatedPage = pathname.includes("rated");

  const contentType = isRatedPage
    ? "rated"
    : query && isSearchPage
      ? "search"
      : "home"; // 'home' for discover

  // Get the current page from URL. If not present, use the cached page for the current content type.
  const currentPageFromUrl = Number(searchParams.get("page") || "1");
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);

  const { data } = useMovie(
    query,
    String(currentPageFromUrl),
    contentType === "search" || contentType === "home"
      ? contentType
      : "discover",
  );

  useEffect(() => {
    if (typeof window != "undefined") {
      const guestId = localStorage.getItem("guest_session_id");
      setGuestSessionId(guestId);
    }
  }, []);

  const { ratedData } = useRated(guestSessionId, currentPageFromUrl); // useRated should use the numeric current page

  const paginationInitail = isRatedPage ? ratedData : data;

  const paginationData: MovieApiResponse = paginationInitail || {
    page: currentPageFromUrl,
    results: [],
    total_pages: 0,
    total_results: 0,
  };

  useEffect(() => {
    if (query && searchParams.has("page")) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [query]);

  const handleChangePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));

    router.push(`${pathname}?${params.toString()}`);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PaginationPage
      // totalItems={paginationData.total_results}
      totalPages={paginationData.total_pages}
      currentPage={Number(currentPageFromUrl)}
      onPageChange={handleChangePage}
    />
  );
};

export default MoviePagination;
