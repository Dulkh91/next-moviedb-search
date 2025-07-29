```tsx
"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MovieApiResponse } from "@/types/pageApi";
import { useMovie } from "@/hooks/useMovie";
import { useEffect } from "react";
import { Skeleton } from "antd";
import { useRated } from "@/hooks/useRated";
import dynamic from "next/dynamic";
import useStorePage from "@/hooks/useStorePage";

const PaginationPage = dynamic(() => import("@/componests/PaginationPage"), {
  ssr: false,
  loading: () => <Skeleton active />,
});

const MoviePagination = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPageFromUrl = Number(searchParams.get("page") || "1");
  const query = searchParams.get("query") || "";
  const isSearchPage = pathname.includes("search");
  const type = query && isSearchPage ? "search" : "discover";

  const { ratedData } = useRated(Number(currentPageFromUrl));
  const { data, isValidating } = useMovie(
    query,
    String(currentPageFromUrl),
    type,
  );

  const { pageCache } = useStorePage();

  const isRatedPage = pathname.includes("rated");
  const paginationInitail = isRatedPage ? ratedData : data;
  const paginationData: MovieApiResponse = paginationInitail || {
    page: currentPageFromUrl,
    results: [],
    total_pages: 0,
    total_results: 0,
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const isSearchPage = query && searchParams.has("page");
    if (isSearchPage) {
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [query]);

  const handleChangePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PaginationPage
      totalItems={paginationData.total_results}
      totalPages={paginationData.total_pages}
      currentPage={Number(currentPageFromUrl)}
      onPageChange={handleChangePage}
      isLoading={isValidating}
    />
  );
};

export default MoviePagination;
```

### restor page

```js

const { pageCache, setPage } = usePaginationContext();
const pageKey = type === "discover" ? "home" : type;


useEffect(() => {
  if (!searchParams.get("page") && pageCache[pageKey] > 1) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(pageCache[pageKey]));
    router.replace(`${pathname}?${params.toString()}`);
  }
}, []);

const handleChangePage = (newPage: number) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set("page", String(newPage));

  setPage(type==='discover'? 'home': type, newPage);
  router.push(`${pathname}?${params.toString()}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
};


```

### // useStorePage

```ts
useEffect(() => {
  if (pathname === "/") {
    setPage("home", Number(pages));
  } else if (searchPage) {
    setPage("search", Number(pages));
  } else if (ratedPage) {
    setPage("rated", Number(pages));
  }
}, [pathname, pages, searchPage, ratedPage, setPage]);
```

```js
//getRateMovie...
[
  "https://api.themoviedb.org/3/guest_session/b6da02eb24288c327467434f477cfa31/rated/movies",
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzZmZGM0MjM4NTQ0MWY5ZTFiZmM4OWJjOGVjNjkzZiIsIm5iZiI6MTc1MjI0MzQ1MS41NzEsInN1YiI6IjY4NzExY2ZiNWEzYzQwYzYwMDU0MTlmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.17USoqTiZAKAp6sSItKniqn2ZuLMWxuZSqJS84L6_HA",
];
```

```js
https://api.themoviedb.org/3/movie/1311031/rating?guest_session_id=b6da02eb24288c327467434f477cfa31

```

## base AIP url

**dicover**

```ts
https://api.themoviedb.org/3/discover/movie
```

**search**

```ts
https://api.themoviedb.org/3/search/movie
```

---

### from website:

**delete rate**

```ts
https://api.themoviedb.org/3/movie/{movie_id}/rating
```

**add rate**

```ts
https://api.themoviedb.org/3/movie/{movie_id}/rating
```

**rated movie**

```ts
https://api.themoviedb.org/3/guest_session/{guest_session_id}/rated/movies
```
