import Image from "next/image";
import { Suspense } from "react";
import { Spin } from "antd";
import dynamic from "next/dynamic";
import VoteStar from "./VoteStar";

const RateStar = dynamic(() => import("@/componests/RateStar"), { ssr: false });
const GengresPage = dynamic(() => import("@/componests/Gengres"), {
  ssr: false,
});
const ProgressRateColor = dynamic(
  () => import("@/componests/ProgressRateColor"),
  {
    ssr: false,
  }
);

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

const CardMobile = ({
  src,
  title,
  releaseDate,
  overview,
  vote_average,
  vote_count,
  genres,
  movieId,
}: Props) => {
  return (
    <div className=" shadow max-w-[451px] relative" id="card_mobile">
      <div className=" m-2 p-2">
        <div className=" flex gap-2">
          <div className=" relative shrink-0 w-[60px] h-[91px]">
            <Image
              src={src}
              layout="fill"
              alt="image"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="flex-row-1 m-3">
            <div>
              <h1 className="text-5 font-semibold mr-2">{title}</h1>
              <p className="text-gray-500 text-xs mb-2">{releaseDate} </p>
              
              {/* Genres button */}
              <div className="flex flex-wrap gap-1">
                <GengresPage genres_id={genres} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-700">{overview}</p>

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
            <div className=" flex mt-2 items-center whitespace-nowrap">
              <Suspense fallback={<Spin size="small" />}>
                <VoteStar movieId={movieId} />
              </Suspense>
            </div>
          )}
        </div>
      </div>

      {/* Progress */}
      {typeof vote_count === 'number' && (
        <div className=" absolute top-2 right-2">
          <ProgressRateColor rating={vote_count || 0} />
        </div>
      )}
    </div>
  );
};

export default CardMobile;
