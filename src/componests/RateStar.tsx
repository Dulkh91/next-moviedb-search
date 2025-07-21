"use client";
import { Rate } from "antd";
import {rateMovie } from '@/lip/tmdb'

type Props = {
  vote_average: number;
};

const RateStar = ({ vote_average }: Props) => {
  return (
    <Rate
      count={10}
      allowHalf
      defaultValue={vote_average}
      style={{ fontSize: 18 }}
      className=" flex flex-row custom-rate"
    />
  );
};

export default RateStar;
