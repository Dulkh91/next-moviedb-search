"use client";
import { Suspense } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Spin, Progress } from "antd";
import VoteStar from "./VoteStar";

const RateStar = dynamic(() => import("@/componests/RateStar"), { ssr: false });
const GengresPage = dynamic(() => import("@/componests/Gengres"), {
  ssr: false,
});

type Props = {
  src: string;
  title: string;
  releaseDate: string;
  overview: string;
  vote_average?: number;
  vote_count?: number;
  genres: number[];
  movieId?: string;
};

const CardDesktop = ({
  src,
  title,
  releaseDate,
  overview,
  vote_average,
  vote_count,
  genres,
  movieId
}: Props) => {
  return (
    <div className=" shadow max-w-[451px] relative" id="card_desktop">
      <div className=" flex gap-2">
        <div className="shrink-0  w-[183px] h-[281px] relative">
          <Image
            src={src}
            alt={title}
            fill
            sizes="183px"
            className="object-cover"
          />
        </div>

        <div className="flex-row-1 m-3">
          <div>
            <h1 className="text-5 font-semibold w-11/12">{title}</h1>
            <p className="text-gray-500 text-xs mb-2">{releaseDate} </p>
            {/* Gengre */}
            <div className=" flex flex-wrap gap-1">
              <GengresPage genres_id={genres} />
            </div>

            <p className="text-xs mt-2 text-gray-700 line-clamp-6 text-wrap">
              {overview}
            </p>

            {/* Stars */}

            {vote_average && (
              <div className=" flex mt-2 items-center whitespace-nowrap">
                <Suspense fallback={<Spin size="small" />}>
                  <RateStar vote_average={vote_average} />
                </Suspense>
              </div>
            )}
            {/* Star vote rate */}
            {movieId &&(
              <div className=" flex mt-2 items-center whitespace-nowrap">
                <Suspense fallback={<Spin size="small" />}>
                  <VoteStar movieId={movieId} />
                </Suspense>
              </div>
            )}

 
          </div>
        </div>
      </div>

      {/* Progress */}
      {vote_count && (
        <div className=" absolute top-2 right-2">
          <Progress
            type="circle"
            percent={vote_count}
            size={30}
            format={(percent) => `${percent}`}
            strokeColor={"#E9D100"}
          />
        </div>
      )}
    </div>
  );
};

export default CardDesktop;
