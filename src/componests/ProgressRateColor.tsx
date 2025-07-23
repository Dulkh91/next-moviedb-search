import { Progress } from "antd";

const ProgressRateColor = ({ rating }: { rating: number }) => {
  // console.log("Rate...:", rating);
  const getRatingColor = (): string => {
    if (rating <= 3) return "#E90000";
    if (rating <= 5) return "#E97E00";
    if (rating <= 7) return "#E9D100";
    return "#66E900";
  };

  return (
    <Progress
      type="circle"
      percent={typeof rating === "number" ? rating * 10 : 0}
      size={25}
      // format={(percent) => `${percent}`}
      format={() => (rating >= 0 ? rating.toFixed(1) : "0.0")}
      strokeColor={getRatingColor()}
    />
  );
};

export default ProgressRateColor;
