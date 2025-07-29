import Image from "next/image";
import { Suspense } from "react";
import { Spin } from "antd";
import dynamic from "next/dynamic";
import VoteStar from "./VoteStar";
import { useState } from "react";

const RateStar = dynamic(() => import("@/componests/RateStar"), { ssr: false });
const GengresPage = dynamic(() => import("@/componests/Gengres"), {
  ssr: false,
});
const ProgressRateColor = dynamic(
  () => import("@/componests/ProgressRateColor"),
  {
    ssr: false,
  },
);
const CancelBtn = dynamic(()=> import("@/componests/DeleteBtn"),{ ssr: false })

type Props = {
  src: string;
  title: string;
  releaseDate: string;
  overview: string;
  vote_average?: number;
  vote_count?: number;
  genres: number[];
  movieId?: string;
  deleteBtnId?: number;
};

const CardMobile = ({
  src,
  title,
  releaseDate,
  overview,
  vote_average,
  vote_count,
  genres,
  movieId,
  deleteBtnId
}: Props) => {
  const [imageLoading, setImageLoading] = useState(false);
  return (
    <div className="w-full">
      <div className="shadow relative m-2 p-2 w-[365px] " id="card_mobile">
        <div className=" flex gap-2">
          <div className=" relative shrink-0 w-[60px] h-[90px]">
            <Image
              src={src}
              fill
              alt={title}
              loading="lazy"
              // placeholder={"blur"}
              // blurDataURL={src}
              className={`object-fit transition-opacity duration-500 ease-in-out ${imageLoading ? "opacity-100" : "opacity-0"} `}
              onLoad={() => setImageLoading(true)}
              sizes="(max-width: 768px) 60px, 60px"
            />
          </div>

          <div className="flex-row-1 m-3">
            <div>
              <h1 className="text-5 font-semibold mr-2">
                {title || "No title available"}
              </h1>
              <p className="text-gray-500 text-xs mb-2">
                {releaseDate || "Unknown date"}{" "}
              </p>

              {/* Genres button */}
              <div className="flex flex-wrap gap-1">
                <GengresPage genres_id={genres} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <p
            className={`text-xs text-gray-700 mt-4 line-clamp-4 ${!overview ? "mt-5" : ""}`}
          >
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
            <div className="flex mt-2 items-center whitespace-nowrap justify-end">
              <Suspense fallback={<Spin size="small" />}>
                <VoteStar movieId={movieId} />
              </Suspense>
            </div>
          )}
        </div>

        {/* Progress */}
        {typeof vote_count === "number" && (
          <div className=" absolute top-2 right-2">
            <ProgressRateColor rating={vote_count || 0} />
          </div>
        )}

        {/* Delete button for card */}
        {deleteBtnId && <CancelBtn id={String(deleteBtnId)}/>} 
      </div>
    </div>
  );
};

export default CardMobile;
