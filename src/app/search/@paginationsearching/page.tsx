'use client'
import dynamic from "next/dynamic";
import {Skeleton} from 'antd'
const PaginationPage = dynamic(()=>import('@/componests/Pagination'),{
    ssr:false, loading:()=> <Skeleton active/>
})

const PaginationSearching = () => {
    return ( <PaginationPage/> );
}
 
export default PaginationSearching;