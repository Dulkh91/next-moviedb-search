"use client";
import { Movie } from "@/types/movie";
import { defaultImage } from "@/lip/defaultImage";
import { Spin, Flex, Alert, FloatButton } from "antd";
import dynamic from "next/dynamic";
import { useMovie } from "@/hooks/useMovie";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

const CardDesktop = dynamic(() => import("@/componests/CardDestop"), {
  ssr: false,
});
const CardMobile = dynamic(() => import("@/componests/CardMobile"), {
  ssr: false,
});

const MovieList = () => {
  const search = useSearchParams() as ReadonlyURLSearchParams;
  const page = search.get("page") || "1";

  const { data, error, isLoading } = useMovie("", String(page), "");
  const base_url = process.env.NEXT_PUBLIC_CLIENT_IMAGE_BASE_URL;

  if (error)
    return (
      <Alert message="Failed to load movies" type="error" className="text-lg" />
    );

  if (isLoading || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }
  if (!data.results?.length) {
    return <Alert message="គ្មានភាពយន្តទេ" type="info" />;
  }
  // console.log(data);
  return (
    <>
      <div
        className=" flex justify-center items-center min-h-screen duration-300 transition mb-5"
        id="movie_list"
      >
        <Flex align="center" gap={"middle"}>
          {/* Destop responsive */}
          <div
            className=" hidden md:grid grid-cols-2 mt-5 gap-5 duration-300 mx-auto"
            id="movie_list-destop"
          >
            {data.results &&
              data.results.map((movie: Movie) => {
                const imageUrl = movie.poster_path
                  ? `${base_url}${movie.poster_path}`
                  : defaultImage;

                return (
                  <CardDesktop
                    key={movie.id}
                    title={movie.title}
                    releaseDate={movie.release_date}
                    overview={movie.overview}
                    src={imageUrl}
                    genres={movie.genre_ids}
                    //    vote_average={movie.vote_average}
                  />
                );
              })}
          </div>

          {/* Mobile responsive */}
          <div
            className="md:hidden space-y-5 mt-5 duration-300 "
            id="movie_list-mobile"
          >
            {data.results &&
              data.results.map((movie: Movie) => {
                const imageUrl = movie.poster_path
                  ? `${base_url}${movie.poster_path}`
                  : defaultImage;

                return (
                  <CardMobile
                    key={movie.id}
                    title={movie.title}
                    releaseDate={movie.release_date}
                    overview={movie.overview}
                    src={imageUrl}
                    genres={movie.genre_ids}
                    //   vote_average={movie.vote_average}
                  />
                );
              })}
          </div>
        </Flex>
      </div>
      <FloatButton.Group shape="circle" className="float_btn-edit">
        <FloatButton.BackTop visibilityHeight={400} />
      </FloatButton.Group>
    </>
  );
};

export default MovieList;
