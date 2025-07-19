"use client";
import debounce from "lodash/debounce";
import { Flex, Input } from "antd";
import {
  useSearchParams,
  useRouter,
  usePathname,
  ReadonlyURLSearchParams,
} from "next/navigation";
import { useEffect, useState, useMemo } from "react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const pathname = usePathname();

  const initialQuery = searchParams.get("query") || "";
  const [inputValue, setInputValue] = useState(initialQuery);

  // ✅ debounce wrapped function
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("query", value);
        router.push(`${pathname}?${params.toString()}`);
      }, 500),
    [searchParams, pathname],
  );

  // ✅ debounce logic separated in effect
  useEffect(() => {
    debouncedSearch(inputValue);
    return debouncedSearch.cancel; // cleanup
  }, [inputValue, debouncedSearch]);

  return (
    <Flex>
      <Input
        placeholder="Type to search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </Flex>
  );
};

export default SearchBar;

/*

 if (value) {
        params.set("query", value);
      } else {
        params.delete("query");
      }
      router.push(`${pathname}?${params.toString()}`);


*/
