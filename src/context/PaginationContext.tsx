"use client";
import React, { createContext, useContext, useState } from "react";

type PageType = 'search' | 'rated' | 'home';

type PageCache = {
  search: number;
  rated: number;
  home: number;
};

type PaginationContextType = {
  pageCache: PageCache;
  setPage: (type: keyof PageCache, page: number) => void;
};

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export const PaginationProvider = ({ children }: { children: React.ReactNode }) => {

  const [pageCache, setPageCache] = useState<PageCache>(() => {
    if (typeof window !== 'undefined') { // Check if window is defined (client-side)
      const savedPageCache = localStorage.getItem('paginationPageCache');
      if (savedPageCache) {
        return JSON.parse(savedPageCache);
      }
    }
    return { search: 1, rated: 1, home: 1 };
  });

  const setPage = (type: PageType, page: number) => {
    setPageCache(prevCache => {
      const newCache = { ...prevCache, [type]: page };
      if (typeof window !== 'undefined') { // Save to localStorage
        localStorage.setItem('paginationPageCache', JSON.stringify(newCache));
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
    throw new Error('usePaginationContext must be used within a PaginationProvider');
  }
  return context;
};