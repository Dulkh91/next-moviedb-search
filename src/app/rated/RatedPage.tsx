"use client";
import dynamic from "next/dynamic";
import { Movie } from "@/types/movie";
import { Alert, Skeleton, Flex, FloatButton } from "antd";
import noImage from "../../../public/noImage.svg";
import useGuestSession from "@/hooks/useGuestSession";
import { useEffect, useState } from "react";
import useSWR from "swr";
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

  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);
  const [rateStatus, setRateStatus] = useState<boolean>(true);

  const search = useSearchParams()!;
  const page = Number(search.get("page") || "1");

  const base_url = process.env.NEXT_PUBLIC_CLIENT_IMAGE_BASE_URL;
  const {mutate} = useSWR(
    guestSessionId || page ? getRateMoviesSWRKey(guestSessionId, page) : null,
  );
  const { ratedData,isLoading,error } = useRated(Number(page));

  useEffect(() => {
    if (typeof window != "undefined") {
     const guestId =  localStorage.getItem("guest_session_id");
      setGuestSessionId(guestId);
    }
  }, []);

  useEffect(() => {
    if (guestSessionId && mutate) {
      mutate(); // revalidate current SWR key
    }
  }, [guestSessionId, page, mutate]);

  // mutate( undefined, { revalidate: true });

// Loading state
  if (isLoading) {
    return <Skeleton active />;
  }

  // Error state
  if (error) {
    return (
      <Alert 
        message="Failed to load rated movies" 
        description={error.message || "Unknown error occurred"}
        type="error" 
        className="text-lg" 
      />
    );
  }

  // No data returned
  if (!ratedData) {
    return (
      <Alert 
        message="No data available" 
        type="info" 
        className="text-lg" 
      />
    );
  }

  // No results in data
  if (!ratedData.results || ratedData.results.length === 0) {
    return (
      <Alert
        message="No rated movies found"
        description="You haven't rated any movies yet."
        type="info"
        className="text-lg"
      />
    );
  }


  const statusDelete = (e: boolean) => {
    if (!e) {
      setRateStatus(e);
    } else {
      setRateStatus(e);
    }
  };

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
                      onSuccess={statusDelete}
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
                      onSuccess={statusDelete}
                    />
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>
      </Flex>
      {/* Message of error rate star */}
      <div
        className={`fixed top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 
        ${rateStatus ? "hidden" : ""}
      `}
      >
        <Alert
          type="error"
          message="Server error! Deleting the movie rating failed; please try again."
          banner
          onClick={() => setRateStatus(true)}
        />
      </div>

      {/* Go Top */}
      <FloatButton.Group shape="circle" className="float_btn-edit">
        <FloatButton.BackTop visibilityHeight={400} />
      </FloatButton.Group>
    </>
  );
};

export default RatedPage;
