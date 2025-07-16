"use client";
import { Movie } from "@/types/movie";
import CardMovie from "@/componests/CardDestop";
import CardMovieMobile from "@/componests/CardMobile";
import { Suspense } from "react";
import { defaultImage } from "@/lips/defaultImage";
import { Spin, Flex,Alert } from "antd";
import { useMovie } from "@/hooks/useMovie";

const SearchPage = () => {
  
const { data, error,isLoading } = useMovie()
  const base_url = process.env.NEXT_PUBLIC_CLIENT_IMAGE_BASE_URL;

  if (error) return <Alert message="Failed to load movies" type="error" className="text-lg"/> 

  if (isLoading || !data){
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Spin size="large" />
        </div>
    )
  }
  if (!data.results?.length) {
    return <Alert message="គ្មានភាពយន្តទេ" type="info" />;
  }
    

  return (
    <div className=" flex justify-center items-center min-h-screen duration-300 transition">
        <Flex align="center" gap={'middle'}>
      {/* Destop responsive */}
      <div className=" hidden md:grid grid-cols-2 mt-5 gap-5 duration-300 mx-auto">
      {data.results &&
        data.results.map((movie: Movie) => {
          const imageUrl = movie.poster_path
            ? `${base_url}${movie.poster_path}`
            : defaultImage;

          return (
            <CardMovie
              key={movie.id}
              title={movie.title}
              releaseDate={movie.release_date}
              overview={movie.overview}
              src={imageUrl}
              vote_average={movie.vote_average}
              vote_count={movie.vote_count}
            />
          );
        })}
        </div>
    
    {/* Mobile responsive */}
        <div className="md:hidden space-y-5 mt-5 duration-300 ">
            {data.results &&
        data.results.map((movie: Movie) => {
          const imageUrl = movie.poster_path
            ? `${base_url}${movie.poster_path}`
            : defaultImage;

          return (
            <CardMovieMobile
              key={movie.id}
              title={movie.title}
              releaseDate={movie.release_date}
              overview={movie.overview}
              src={imageUrl}
              vote_average={movie.vote_average}
              vote_count={movie.vote_count}
            />
          );
        })}
        </div>

        </Flex>
    </div>
  );
};

const MovieList = () => {
  return (
    <Suspense >
        <SearchPage />
    </Suspense>
  );
};

export default MovieList;