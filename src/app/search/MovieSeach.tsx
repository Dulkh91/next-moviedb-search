"use client";
import dynamic from "next/dynamic";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useMovie } from "@/hooks/useMovie";
import { Movie } from "@/types/movie";
import { Alert, Skeleton, Flex, FloatButton } from "antd";
import noImage from "../../../public/noImage.svg";
import { useWindowSize } from "@/hooks/useWindow";

const CardDesktop = dynamic(() => import("@/componests/CardDestop"), {
  ssr: false,
});
const CardMobile = dynamic(() => import("@/componests/CardMobile"), {
  ssr: false,
});

const MovieSearchPage = () => {
  const { width } = useWindowSize();
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";
  // const type = pathname.includes("search") ? "search" : "discover";
  const { data, isLoading, error } = useMovie(
    query,
    page,
    query ? "search" : "discover", //កំណត់ថា type ប្រសិនបើ query មិនបានបញ្ចូលទិន្ន័យផ្ទេទៅ discover
  );

  if (isLoading) {
    return <Skeleton active />;
  }

  if (error && !data) {
    <Alert message="Failed to load movies" type="error" className="text-lg" />;
  }
  const base_url = process.env.NEXT_PUBLIC_CLIENT_IMAGE_BASE_URL;

  const isMobile = width !== undefined && width < 768;

  //(!query || isLoading || !data || data.results.length === 0)
  if (isLoading || !data || data.results.length === 0) {
    return (
      <Alert
        message="There are no movies that matched your query."
        type="info"
        className="text-lg"
      />
    );
  }

  return (
    <>
      <Flex
        align="center"
        gap={"middle"}
        wrap="wrap" // Allow items to wrap to the next line on smaller screens
        justify="center" // Center the items horizontally
        className="py-5 duration-300 transition" // Add some vertical padding
      >
        {data.results.map((movie: Movie) => {
          const imageUrl = movie.poster_path
            ? `${base_url}${movie.poster_path}`
            : noImage;

          // Render CardMobile for mobile devices, otherwise render CardDesktop
          return isMobile ? (
            <div key={movie.id}>
              {/* Full width on mobile, hidden on desktop */}
              <CardMobile
                title={movie.title}
                releaseDate={movie.release_date}
                genres={movie.genre_ids}
                overview={movie.overview}
                src={imageUrl}
                vote_count={movie.vote_average}
                movieId={String(movie.id)}
              />
            </div>
          ) : (
            <div
              key={movie.id}
              className="flex flex-col mt-5 gap-5 duration-300 mx-auto"
            >
              {/* Hidden on mobile, specific widths on desktop */}
              <CardDesktop
                title={movie.title}
                releaseDate={movie.release_date}
                genres={movie.genre_ids}
                overview={movie.overview}
                src={imageUrl}
                vote_count={movie.vote_average}
                movieId={String(movie.id)}
              />
            </div>
          );
        })}
      </Flex>
      {/* Float button for "Back to Top" functionality */}
      <FloatButton.Group shape="circle" className="float_btn-edit">
        <FloatButton.BackTop visibilityHeight={400} />
      </FloatButton.Group>
    </>
  );
};

export default MovieSearchPage;
