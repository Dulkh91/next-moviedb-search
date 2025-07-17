import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch movie data");
  return res.json();
};

export const useMovie = (query = "", page = "1", type: string) => {
  // ✅ បង្កើត URL ដោយស្រាវជ្រាវលើ condition
  let endpoint: string | null = null;

  if (type === "search") {
    const trimmedQuery = query.trim();
    endpoint = trimmedQuery.length > 0
      ? `/api/movie?type=search&query=${trimmedQuery}&page=${page}`
      : null;
  } else {
    endpoint = `/api/movie?page=${page}`;
  }

  // ✅ Call useSWR នៅទីតាំងតែមួយគត់
  const swrOptions =
    type === "search"
      ? { revalidateOnFocus: false }
      : { keepPreviousData: true };

  return useSWR(endpoint, fetcher, swrOptions);
};

//note.docs
