# folder hooks
Using to keep file as like as : useSubmitMovieRating, useDeleteRated,useMovie,useRated,getData
## file name
- **hooks/useSubmitMovieRating.ts**
```ts
'use client';
import useSWRMutation from "swr/mutation";

interface SubmitMovieRatingArgs {
  movieId: string; // Assuming movieId is a string for consistency with most APIs
  guestSession: string;
  rating: number;
}
const ratingFetcher = async( url: string, {arg}:{arg:SubmitMovieRatingArgs})=>{

    const { movieId, guestSession, rating } = arg;
     // Validate inputs
  if (!guestSession) {
    throw new Error("Guest session ID is required.");
  }
  if (!movieId) {
    throw new Error("Movie ID is required.");
  }
  if (rating == null || isNaN(rating)) {
    throw new Error("Valid rating is required.");
  }

  try {
    const endpointUrl = `${url}/${movieId}/rating?guest_session_id=${guestSession}`

    const response = await fetch(endpointUrl, {
    method: "POST",
    headers: {
       accept: 'application/json',
       "Content-Type": "application/json;charset=utf-8",
       Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLIENT_TOKEN_KEY}`,
       },
      body:JSON.stringify({"value":rating})
    });
  
  if (!response.ok) {
    const errorData = await response.json().catch(()=>{})
    return{
      success: false,
        error: errorData.status_message || `Failed to rate: ${response.status}`,
    }
   
  }

  const data = await response.json();
  return { success: true, data };

  } catch (error) {
       console.error("Rate movie error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  
  }

}

export const useSubmitMovieRating = () => {
    const url = process.env.NEXT_PUBLIC_CLIENT_WEB_URL
    const {trigger, isMutating} = useSWRMutation(`${url}/movie`, ratingFetcher, {
        populateCache: false
    })

    return {
        submitRating: trigger,
        isSubmitting: isMutating,
    }
}
 ```
 ---
 - **hooks/useDeleteRated.ts**
 ```ts

import useSWRMutation from "swr/mutation";

interface DeleteMovieRatingArgs {
  movieId: string | number; // Assuming movieId can be a string or number
  guestSession: string;
}

const fetcher = async (
  url: string,
  { arg }: { arg: DeleteMovieRatingArgs }
) => {
  const { movieId, guestSession } = arg;

  if (!guestSession) {
    throw new Error("guestSession are required for deletion.");
  }

  const cleanUrl = url.replace(/\/+$/, ""); // Remove trailing slashes
  const endpointUrl = `${cleanUrl}/${movieId}`;

  /*
  នេះអាចកាត់បញ្ហា / ជាប់ពី url ពេញ
  endpointUrl = url + "/" + movieId ស្មើ undefined/ ប្រសិនមិនផ្ញើ arg
  */
  try {  
    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guest_session_id: guestSession }),
    };
  
    const response = await fetch(endpointUrl, option);


    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.status_message || "Failed to delete rated movie.",
      };
    }

    return response.status === 204 ? { success: true } : await response.json();
  } catch (error) {
    console.error("Rate movie error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export function useDeleteRated() {

  const { trigger: deleteRate, isMutating: isDeleting } = useSWRMutation(
    `/api/rated/`,
    fetcher,
    {
      populateCache: false,
      revalidate: true,
    }
  );

  return { deleteRate, isDeleting };
}
```
---
- **hooks/useMovie**

```ts
import useSWR from "swr";
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch movie data");
  return res.json();
};

export const useMovie = (query: string, page: string, type: string) => {
  //  បង្កើត URL ដោយស្រាវជ្រាវលើ condition
  let endpoint: string | null = null;
  if (type === "search") {
    const trimmedQuery = query.trim();
    endpoint =
      trimmedQuery.length > 0
        ? `/api/movie?type=search&query=${trimmedQuery}&page=${page}`
        : null;
  } else {
    endpoint = `/api/movie?page=${page}`;
  }

  //  Call useSWR នៅទីតាំងតែមួយគត់
  const swrOptions =
    type === "search"
      ? { revalidateOnFocus: false }
      : { keepPreviousData: true };
  return useSWR(endpoint, fetcher, swrOptions);
};

//note.docs
```
---
- **hooks/useRated.ts**
```ts
'use client'
import { useEffect, useState } from "react";
import useSWR from "swr";


const fetcher = async (url:string, {arg}:{arg:string}) => {

  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
  });
  if(!response.ok){
    throw new Error(`Failed to fetch: ${response.statusText} (${response.status})`);
  }

  return response.json()

};

export const useRated = () => {
  
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);
  useEffect(()=>{
      if(typeof window !=="undefined"){
          const sessionId = localStorage.getItem('guest_session_id');
          if(sessionId){
            setGuestSessionId(sessionId)
          }
      }
  },[])

  
  const URL = guestSessionId
    ? `/api/rated?guest_session_id=${guestSessionId}`: null;


  const { data, isLoading, error} = useSWR(URL, fetcher,{
    revalidateOnFocus: false, 
    revalidateOnReconnect: false,
  });


  if (!guestSessionId || isLoading || !data) {
    return { ratedData: [], isLoading: true };
  }

  if (error) {
    return { ratedData: [], ratePage: 0, isLoading: false, error };
  }
  
  return { ratedData: data || [], ratePage: data.total_results, isLoading };
};
```
---
- **lip/getData.ts**
```ts
export const getData = async () => {
  const clientApiKey = process.env.NEXT_PUBLIC_CLIENT_WEB_URL;
  const apiKey = process.env.API_KEY;
  const token = process.env.NEXT_PUBLIC_CLIENT_TOKEN_KEY;

  if (!clientApiKey || !apiKey || !token) {
    console.error("Missing environment variables for client-side fetch.");
    return null;
  }

  try {
    const res = await fetch(`${clientApiKey}${apiKey}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const datas = await res.json();
    return datas;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
};
```
--- 
- **context/PaginationContext.tsx**
```ts
"use client";
import React, { createContext, useContext, useState } from "react";

type PageType = "search" | "rated" | "home";

type PageCache = {
  search: number;
  rated: number;
  home: number;
};

type PaginationContextType = {
  pageCache: PageCache;
  setPage: (type: keyof PageCache, page: number) => void;
};

const PaginationContext = createContext<PaginationContextType | undefined>(
  undefined,
);

export const PaginationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pageCache, setPageCache] = useState<PageCache>(() => {
    if (typeof window !== "undefined") {
      // Check if window is defined (client-side)
      const savedPageCache = localStorage.getItem("paginationPageCache");
      if (savedPageCache) {
        return JSON.parse(savedPageCache);
      }
    }
    return { search: 1, rated: 1, home: 1 };
  });

  const setPage = (type: PageType, page: number) => {
    setPageCache((prevCache) => {
      const newCache = { ...prevCache, [type]: page };
      if (typeof window !== "undefined") {
        // Save to localStorage
        localStorage.setItem("paginationPageCache", JSON.stringify(newCache));
      }
      return newCache;
    });
  };

  return (
    <PaginationContext.Provider value={{ pageCache, setPage }}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePaginationContext = () => {
  const context = useContext(PaginationContext);
  if (context === undefined) {
    throw new Error(
      "usePaginationContext must be used within a PaginationProvider",
    );
  }
  return context;
};
```
ប្រើជាមួយ useStorage.ts file

- **useStorage.ts**
```ts
import { usePaginationContext } from "@/context/PaginationContext";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
type pageType = "home" | "search" | "rated";

const useStorePage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPageFromUrl = Number(searchParams.get("page") || "1");

  const { pageCache, setPage } = usePaginationContext();
  const typePage: pageType = pathname.includes("search")
    ? "search"
    : pathname.includes("rated")
      ? "rated"
      : "home";

  useEffect(() => {
    if (pageCache[typePage] !== currentPageFromUrl) {
      setPage(typePage, currentPageFromUrl);
    }
  }, [currentPageFromUrl, pageCache, typePage, setPage]);

  return {
    pageCache,
    setPage,
  };
};

export default useStorePage;
```
- **layout.ts**
```ts
import Navbar from "@/componests/Navbar";
import { PaginationProvider } from "@/context/PaginationContext";

const geistSans = Geist({...
....
...
<div className="container mx-auto bg-white md:bg-white min-h-screen max-w-252.5">
          <div className=" mx-2 md:mx-3 md:p-2">
            <Navbar />
            <PaginationProvider>{children}</PaginationProvider>
          </div>
        </div>
```
