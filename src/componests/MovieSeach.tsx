"use client";
import dynamic from "next/dynamic";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useMovie } from "@/hooks/useMovie";
import { Movie } from "@/types/movie";
import { Alert, Skeleton, Flex, FloatButton } from "antd";
import noImage from "../../public/noImage.svg";
const CardDesktop = dynamic(() => import("@/componests/CardDestop"), {
  ssr: false,
});
const CardMobile = dynamic(() => import("@/componests/CardMobile"), {
  ssr: false,
});

const MovieSearchPage = () => {
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
      <Flex align="center" gap={"middle"}>
        {/* Destop responsive */}
        <div
          className=" hidden md:grid grid-cols-2 mt-5 gap-5 duration-300 mx-auto"
          id="movie_search-destop"
        >
          {data.results &&
            data.results.map((movie: Movie) => {
              const imageUrl = movie.poster_path
                ? `${base_url}${movie.poster_path}`
                : noImage;

              return (
                <CardDesktop
                  key={movie.id}
                  title={movie.title}
                  releaseDate={movie.release_date}
                  overview={movie.overview}
                  src={imageUrl}
                  vote_average={movie.vote_average}
                  vote_count={movie.vote_count}
                  genres={movie.genre_ids}
                />
              );
            })}
        </div>

        {/* Mobile responsive */}
        <div
          className="md:hidden space-y-5 mt-5 duration-300 "
          id="movie_search-mobile"
        >
          {data.results &&
            data.results.map((movie: Movie) => {
              const imageUrl = movie.poster_path
                ? `${base_url}${movie.poster_path}`
                : noImage;

              return (
                <CardMobile
                  key={movie.id}
                  title={movie.title}
                  releaseDate={movie.release_date}
                  overview={movie.overview}
                  src={imageUrl}
                  vote_average={movie.vote_average}
                  vote_count={movie.vote_count}
                  genres={movie.genre_ids}
                />
              );
            })}
        </div>
      </Flex>
      {/* Go Top */}
      <FloatButton.Group shape="circle" className="float_btn-edit">
        <FloatButton.BackTop visibilityHeight={400} />
      </FloatButton.Group>
    </>
  );
};

export default MovieSearchPage;
