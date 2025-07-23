'use client'
import dynamicImport from "next/dynamic";
import { Skeleton } from "antd";

const SearchBar = dynamicImport(()=>import('@/componests/SearchBar'),{
ssr:false,loading: () => <Skeleton active />,
})


const ClientPageSearch = () => {
    return <SearchBar/>
}
 
export default ClientPageSearch;

/*
នេះគឺជា ជា Client Wrapper សម្រាប់បំលែង Client side ប្រើជាមួយ server side
*/