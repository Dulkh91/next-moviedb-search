'use client'
import dynamicImport from "next/dynamic";
import { Skeleton } from "antd";
import { Suspense } from "react";

const SearchBar = dynamicImport(()=> import('@/componests/SearchBar'),{
  ssr:false, loading: () => <Skeleton active />
})

const SearchPage = () => {
  return  (<Suspense>
    <SearchBar/> 
  </Suspense>)
        
};

export default SearchPage;
