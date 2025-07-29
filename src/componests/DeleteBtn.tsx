"use client";
import { MdDeleteOutline } from "react-icons/md";
import { deleteRating } from "@/lip/deleteRated";
import { mutate } from "swr";
import { useState } from "react";
import { getRateMoviesSWRKey } from "@/utils/getRateMoviesSWRKey";
import { MovieApiResponse } from "@/types/MovieApiResponse";
const DeleteBtn = ({ id }: { id: string }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      // លុប rating តាមរយៈ API
       await deleteRating(id);

      mutate([getRateMoviesSWRKey],
        (key:MovieApiResponse | undefined):MovieApiResponse| undefined=>{
          if (!key) return key; 
          return {
            ...key,
            results: key.results.filter((movie) => String(movie.id) !== id)
          };
        },false)

    } catch (err) {
      console.error("បរាជ័យក្នុងការលុប rating", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="group-hover">
      <div
        className="absolute top-0 left-0 w-6 h-6 bg-gray-400/60 hover:bg-gray-400/20 rounded-full flex justify-center items-center cursor-pointer"
      >
        <MdDeleteOutline className="text-2xl text-white/70 hover:text-white"
         onClick={!deleting ? handleDelete : undefined}
        />
      </div>
    </div>
  );
};

export default DeleteBtn;