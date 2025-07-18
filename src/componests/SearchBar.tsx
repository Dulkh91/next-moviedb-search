'use client'
import debounce from "lodash/debounce";
import { Flex,Input } from "antd";

import { useSearchParams, useRouter, usePathname } from "next/navigation";


const SearchBar = () => {

  const searchParams = useSearchParams()
  const route = useRouter()
  const pathname = usePathname()

  const handleSearch = debounce((value)=>{

      const params = new URLSearchParams(searchParams?.toString())
      params.set("query",String(value))
      route.push(`${pathname}?${params.toString()}`)

  },500)

  return (<Flex>
    <Input 
      onChange={(e)=> handleSearch(e.target.value) }
    />
  </Flex>);
};

export default SearchBar;
