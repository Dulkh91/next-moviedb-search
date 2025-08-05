'use client'
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcherMovie } from "@/lip/fecherMovie";


export const useRated = (page: number) => {
  
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
    ? `/api/rated?guest_session_id=${guestSessionId}&page=${page}`: null;


  const { data, isLoading} = useSWR(URL, fetcherMovie,{
    revalidateOnFocus: false, 
    revalidateOnReconnect: false,
  });


  if (!guestSessionId || isLoading || !data) {
    return { ratedData: [], isLoading: true };
  }


  return { ratedData: data || [], ratePage: data.total_results, isLoading };
};

