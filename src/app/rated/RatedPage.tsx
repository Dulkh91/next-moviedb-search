"use client";
import dynamic from "next/dynamic";
import { Movie } from "@/types/movie";
import { Alert, Skeleton, Flex, FloatButton } from "antd";
import noImage from "../../../public/noImage.svg";
import useGuestSession from "@/hooks/useGuestSession";
import { useEffect } from "react";
import { mutate } from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useRated } from "@/hooks/useRated";

import { getRateMoviesSWRKey } from "@/utils/getRateMoviesSWRKey";

const CardDesktop = dynamic(() => import("@/componests/CardDestop"), {
  ssr: false,
});
const CardMobile = dynamic(() => import("@/componests/CardMobile"), {
  ssr: false,
});

const RatedPage = () => {
  useGuestSession();

  const search = useSearchParams()!;
  const page = search.get("page") || "1";
  const base_url = process.env.NEXT_PUBLIC_CLIENT_IMAGE_BASE_URL;

  const { ratedData, isLoading } = useRated(Number(page));

  useEffect(() => {
     mutate(getRateMoviesSWRKey)

  }, []);

  if (typeof ratedData.results === "undefined") {
    return (
      <Alert message="No rated movies found" type="info" className="text-lg" />
    );
  }

  if (isLoading) {
    return <Skeleton active />;
  }

  if (!ratedData) {
    <Alert message="Failed to load movies" type="error" className="text-lg" />;
  }

  //(!query || isLoading || !data || data.results.length === 0)
  if (isLoading || ratedData.results.length === 0) {
    return (
      <Alert
        message="There are no movies that matched your query."
        type="info"
        className="text-lg"
      />
    );
  }

  // console.log(ratedData);
  return (
    <>
      <Flex align="center" gap={"middle"}>
        {/* Destop responsive */}
        <div
          className=" hidden md:grid grid-cols-2 mt-5 gap-5 duration-300 mx-auto"
          id="movie_search-destop"
        >
          <AnimatePresence>
          {ratedData.results &&
            ratedData.results.map((movie: Movie) => {
              const imageUrl = movie.poster_path
                ? `${base_url}${movie.poster_path}`
                : noImage;
              return (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                <CardDesktop
                  
                  title={movie.title}
                  genres={movie.genre_ids}
                  releaseDate={movie.release_date}
                  overview={movie.overview}
                  src={imageUrl}
                  vote_average={movie.rating} // rate of vote
                  vote_count={movie?.vote_average}
                  deleteBtnId={movie.id}
                />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Mobile responsive */}
        <div
          className="md:hidden space-y-5 mt-5 duration-300 mx-auto "
          id="movie_search-mobile"
        >
          <AnimatePresence>
            {ratedData.results &&
              ratedData.results.map((movie: Movie) => {
                const imageUrl = movie.poster_path
                  ? `${base_url}${movie.poster_path}`
                  : noImage;

                return (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CardMobile
                      title={movie.title}
                      genres={movie.genre_ids}
                      releaseDate={movie.release_date}
                      overview={movie.overview}
                      src={imageUrl}
                      vote_average={movie.rating}
                      vote_count={movie.vote_average}
                      deleteBtnId={movie.id}
                    />
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>
      </Flex>
      {/* Go Top */}
      {/* <button onClick={async ()=> await deleteRating("1234821")}>delete card</button> */}

      <FloatButton.Group shape="circle" className="float_btn-edit">
        <FloatButton.BackTop visibilityHeight={400} />
      </FloatButton.Group>
    </>
  );
};

export default RatedPage;
