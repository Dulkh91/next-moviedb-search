"use client";
import { Suspense } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Spin } from "antd";
import VoteStar from "./VoteStar";
import { useState } from "react";
import { CardProps } from "@/types/CardProps";

const RateStar = dynamic(() => import("@/componests/RateStarPage"), {
  ssr: false,
});
const GengresPage = dynamic(() => import("@/componests/Gengres"), {
  ssr: false,
});
const ProgressRateColor = dynamic(
  () => import("@/componests/ProgressRateColor"),
  {
    ssr: false,
  },
);
const CancelBtn = dynamic(() => import("@/componests/DeleteBtn"), {
  ssr: false,
});

const CardDesktop = ({
  src,
  title,
  releaseDate,
  overview,
  vote_average,
  vote_count,
  genres,
  movieId,
  deleteBtnId,
  onSuccess,
}: CardProps) => {
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  return (
    <div className=" shadow max-w-[451px] relative" id="card_desktop">
      <div className=" flex gap-2">
        <div className="shrink-0 relative w-[183px] h-[281] ">
          <Image
            src={src}
            alt={title}
            fill
            loading="lazy"
            // placeholder={"blur"}
            // blurDataURL={src}
            className={`object-fit transition-opacity duration-500 ease-in-out ${imageLoading ? "opacity-100" : "opacity-0"} `}
            onLoad={() => setImageLoading(true)}
            // onLoadingComplete={(img) => img.classList.remove("opacity-0")}
            sizes="(max-width: 768px) 183px, 183px"
          />
        </div>

        <div className="flex-row-1 m-3">
          <div>
            <h1 className="text-5 font-semibold mr-6">
              {title || "No title available"}
            </h1>
            <p className="text-gray-500 text-xs mb-2">
              {releaseDate || "Unknown date"}{" "}
            </p>

            {/* Gengre */}
            <div className=" flex flex-wrap gap-1">
              <GengresPage genres_id={genres} />
            </div>

            <p className="text-xs mt-2 text-gray-700 line-clamp-6 text-wrap">
              {overview || "No description provided."}
            </p>

            {/* Stars */}
            {typeof vote_average === "number" && (
              <div className=" flex mt-2 items-center whitespace-nowrap">
                <Suspense fallback={<Spin size="small" />}>
                  <RateStar vote_average={vote_average || 0} />
                </Suspense>
              </div>
            )}

            {/* Star vote rate */}
            {movieId && (
              <div className="flex mt-2 items-center whitespace-nowrap">
                <Suspense fallback={<Spin size="small" />}>
                  <VoteStar movieId={movieId} onSuccess={onSuccess} />
                </Suspense>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress */}
      {typeof vote_count === "number" && (
        <div className=" absolute top-2 right-2">
          {/* votepropress */}
          <ProgressRateColor rating={vote_count || 0} />
        </div>
      )}
      {/* Delete button for card */}
      {deleteBtnId && (
        <CancelBtn id={String(deleteBtnId)} onSuccess={onSuccess} />
      )}
    </div>
  );
};

export default CardDesktop;
