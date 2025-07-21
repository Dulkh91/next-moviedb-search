'use client'
import { useState } from 'react';
import { rateMovie } from "@/lip/tmdb"; // កែ path ឱ្យត្រឹមត្រូវ
import { Rate, message } from "antd";
type Props ={
    movieId: number,
    initialRating: number
}

const VoteStar = ({ movieId , initialRating = 0 }:Props) => {
    const [rating, setRating] = useState(initialRating);

    const handleRate = async (value:number) => {
        try {
            await rateMovie(String(movieId), value); // TMDB ទទួល rating 0.5-10 (មិនត្រូវគុណ 2)
            setRating(value);
            message.success(`អ្នកបានវាយតម្លៃ ${value} ផ្កាយ`);
        } catch (error) {
            console.error("Failed to rate:", error);
            message.error('ការវាយតម្លៃបរាជ័យ');
        }
    };
    
    return ( 
        <Rate
            count={10}
            allowHalf
            value={rating}
            style={{ fontSize: 18 }}
            className="flex flex-row custom-rate"
            onChange={handleRate} // ប្រើតម្លៃដោយផ្ទាល់ 1-10
        />
    );
}
 
export default VoteStar;