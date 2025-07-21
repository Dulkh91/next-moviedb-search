'use client'
import VoteStar from "@/componests/VoteStar";
const RatedPage = () => {
    return ( <>
        <p>hello page rate</p>
        <VoteStar movieId={123} initialRating={0}  />
    </> );
}
 
export default RatedPage;