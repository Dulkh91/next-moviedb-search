"use client";
import { MdDeleteOutline } from "react-icons/md";
import { deleteRating } from "@/lip/deleteRated";
import { mutate } from "swr";
import { useState } from "react";
import { getRateMoviesSWRKey } from "@/utils/getRateMoviesSWRKey";
import { MovieApiResponse } from "@/types/MovieApiResponse";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const DeleteBtn = ({ id }: { id: string }) => {
  const [deleting, setDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      // លុប rating តាមរយៈ API
      await deleteRating(id);
      const key = [getRateMoviesSWRKey];
      mutate(
        key,
        (currentData: MovieApiResponse | undefined) => {
          if (!currentData) return currentData;
          return {
            ...currentData,
            results: currentData.results.filter(
              (movie) => String(movie.id) !== id,
            ),
          };
        },
        false, // មិន revalidate ភ្លាម
      );
    } catch (err) {
      console.error("បរាជ័យក្នុងការលុប rating", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      className=" group-hover absolute top-0 left-0"
      onClick={handleDelete}
      disabled={deleting}
    >
      {deleting ? (
        <Spin indicator={<LoadingOutlined spin style={{ color: "white" }} />} />
      ) : (
        <span className="absolute top-0 left-0 w-6 h-6 bg-gray-400/60 hover:bg-gray-400/20 rounded-full flex justify-center items-center cursor-pointer">
          <MdDeleteOutline className="text-2xl text-white/70 hover:text-white" />
        </span>
      )}
    </button>
  );
};

export default DeleteBtn;
