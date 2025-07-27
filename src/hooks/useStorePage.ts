import { usePaginationContext } from "@/context/PaginationContext";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
type pageType = 'home' | 'search' | 'rated'

const useStorePage = () => {

    const pathname = usePathname()
    const searchParams = useSearchParams()

    const currentPageFromUrl = Number(searchParams.get("page")|| '1') 
    
    const {pageCache,setPage} = usePaginationContext()
    const typePage: pageType = pathname.includes('search')
    ? 'search': pathname.includes('rated')
    ?'rated': 'home'


    useEffect(()=>{
        if(pageCache[typePage] !== currentPageFromUrl){
            setPage(typePage, currentPageFromUrl)
        }
    },[currentPageFromUrl,pageCache,typePage,setPage])

    return {
        pageCache,
        setPage
    }   
   
}
 
export default useStorePage;