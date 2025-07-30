"use client";
import { useState, useEffect } from "react";
import { rateMovie } from "@/lip/rateMovie"; // path ឱ្យត្រឹមត្រូវ
import { Rate, message } from "antd";
import { useRated } from "@/hooks/useRated";
import { Movie } from "@/types/movie";

type Props = {
  movieId: string;
};

const VoteStar = ({ movieId }: Props) => {
  const { ratedData, isLoading } = useRated();
  const [rating, setRating] = useState<number>(0);
  
  //ដាក់ Effect ដើម្បី setRating ពី ratedData

  useEffect(() => {
    if (!movieId) return; // ប្រសិនបើ movieId មិនមានទេ កុំធ្វើអ្វី

    if (typeof ratedData !== "undefined" && !isLoading && ratedData.results) {
      const found = ratedData.results.find(
        (m: Movie) => String(m.id) === String(movieId)
      );
      if (found) {
        setRating(found.rating);
      }
    }
  }, [ratedData, isLoading, movieId]);

  const handleRate = async (value: number) => {  

    try {

      if(value === 0) return
      setRating(value);
      await rateMovie(String(movieId), value); // TMDB ទទួល rating 0.5-10 (មិនត្រូវគុណ 2)

    } catch (error) {
      console.error("Failed to rate:", error);
      message.error("ការវាយតម្លៃបរាជ័យ");
    }
  };

  return (
    <Rate
      count={10}
      allowHalf
      value={rating}
      style={{ fontSize: 18 }}
      // className={`flex flex-row custom-rate ${rating ? "opacity-40 disabled:" : ""}`}
      className={`flex flex-row custom-rate`}
      onChange={handleRate}
      // disabled={rating ? true : false}
    />
  );
};

export default VoteStar;
