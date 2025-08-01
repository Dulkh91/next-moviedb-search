"use client";
import { Rate } from "antd";

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
      disabled
      className="flex flex-row custom-rate"
    />
  );
};

export default RateStar;
