"use client";
import { MdDeleteOutline } from "react-icons/md";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { getRateMoviesSWRKey } from "@/utils/getRateMoviesSWRKey";
import { MovieApiResponse } from "@/types/MovieApiResponse";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDeleteRated } from "@/hooks/useDeleteRated";
import { useSearchParams } from "next/navigation";

type Props = {
  id: string;
  onSuccess?: (success: boolean) => void;
};

const DeleteBtn = ({ id, onSuccess }: Props) => {
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");

  const { mutate } = useSWR(
    guestSessionId || page ? getRateMoviesSWRKey(guestSessionId, page) : null,
    {
      revalidateOnFocus: false,
    },
  );
  const { deleteRate, isDeleting } = useDeleteRated();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setGuestSessionId(localStorage.getItem("guest_session_id"));
    }
  }, []);

  const handleDelete = async () => {
    try {
      if (!guestSessionId) {
        alert("The guestion sesstion not found.");
        return;
      }

      // លុប rating តាមរយៈ API
      const result = await deleteRate({
        movieId: id,
        guestSession: guestSessionId,
      });

      if (!result.success) {
        onSuccess?.(false);
      } else {
        onSuccess?.(true);

        mutate(
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
      }
    } catch (err) {
      console.error("បរាជ័យក្នុងការលុប rating", err);
      onSuccess?.(false);
    }
  };

  return (
    <button
      className=" group-hover absolute top-0 left-0"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? (
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
