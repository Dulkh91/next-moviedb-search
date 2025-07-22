'use client'
import dynamic from "next/dynamic";
const RatedPage = dynamic(()=>import("@/componests/RatedPage"),{ssr: false})
n
const RatingPage = () => {
    return <RatedPage/>
};

export default RatingPage;
