តើ null នៅក្នុង useSWR មានន័យអ្វី?

```ts
useSWR(shouldFetch ? `/api/movie?query=${query}&page=${page}` : null, fetcher);
```

នេះមានន័យថា៖

ប្រសិនបើ shouldFetch === true → វាធ្វើ fetch

ប្រសិនបើ shouldFetch === false → ដាក់ null → ❌ គ្មាន fetch ទេ
👉 នេះគឺ intentional behavior មួយរបស់ SWR

📘 Next.js + SWR: បើ key ជា null, SWR នឹងមិន fetch ទេ — គ្មាន error!

❓ តើនេះ "មានបញ្ហា" ឬទេ?
មិនមានបញ្ហា ទេ! វាជាវិធីល្អបំផុតក្នុងការបញ្ឈប់ការទាញ data នៅពេល:

អ្នកមិនទាន់បញ្ចូល query

អ្នកចង់ឲ្យវាចាំរហូតដល់មាន data មុនគិត fetch

ឧទាហរណ៍:

```ts
const [searchTerm, setSearchTerm] = useState("");

// បើអ្នកទើបបើក page ឬ form ទទេ, SWR មិនទាញ data ទេ
const { data } = useSWR(
  searchTerm ? `/api/movie?query=${searchTerm}` : null,
  fetcher,
);
```

នេះជាការជៀសវាង request មិនចាំបាច់ ទៅកាន់ API ដំបូង ដោយ "query=return" ឬ "query=" ខ្សោយ។

✅ ការពិចារណាបន្ថែម
អ្នកអាចផ្ដល់ default value query = 'return' ទៅ useMovie() (ដូចខ្ញុំសរសេរខាងលើ) ប្រសិនបើចង់បញ្ចូល query ដើម

បើអ្នកចង់ “បង្ខំ fetch” នៅស្ថានភាពខ្លះៗ ទោះបី query ទទេ, អ្នកអាចគ្រាន់តែដាក់ fallback string:

```ts
const safeQuery = query?.trim() || "return";
```

📌 សង្ខេប
Condition Result
useSWR(null, ...) ❌ មិន fetch ទេ (ត្រឹមត្រូវ)
useSWR('/api/movie?...', ...) ✅ fetch
null មិនបង្កើត error ឡើយ ✅ ប្រើបានសុវត្ថិភាព

My create pagination

"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Pagination } from "antd";
import { useMovie } from "@/hooks/useMovie";
import { useEffect } from "react";
import { useRated } from "@/hooks/useRated";
import { usePaginationContext } from "@/context/PaginationContext";

const PaginationPage = () => {
const searchParams = useSearchParams();
const router = useRouter();
const pathname = usePathname();

const pageInitial = parseInt(searchParams.get("page") || "1");
const queryInitial = searchParams.get("query") || "";

const { data, isValidating, isLoading } = useMovie(
queryInitial,
String(pageInitial),
queryInitial ? "search" : "discover"
);
const { ratedData } = useRated(Number(pageInitial));

const { pageCache, setPage } = usePaginationContext()

const typePage =pathname.includes('rated')? 'rated': 'search'
const lastPage = pageCache[typePage]

console.log("rated:",pageCache.rated);
console.log("search:", pageCache.search);
console.log("lastPage", lastPage);

useEffect(() => {
const params = new URLSearchParams(searchParams.toString());
// ✅ ចំពោះ Rated Page ដែលមាន page > 1
if (ratedData && pageInitial !== 1 && ratedData.total_pages > 1) {
params.set("page", String(pageInitial));
router.push(`${pathname}?${params.toString()}`);
return;
}
// ✅ ចំពោះ Search Page: query ទទេ និងមាន page → លុប page ចេញ
const isSearchPage = queryInitial && searchParams.has("page") && isLoading;
if (isSearchPage) {
params.delete("page");
router.push(`${pathname}?${params.toString()}`);
}
setPage(typePage, pageInitial)
}, [
queryInitial,
searchParams,
pathname,
isLoading,
ratedData,
pageInitial,
router,
]);

const isRatedPage = pathname.includes("rated");
const paginationData = isRatedPage ? ratedData : data;

if (isValidating || !paginationData) {
return (

<div className="flex justify-center items-center min-h-screen">
{/_ <Skeleton active /> _/}
</div>
);
}

const handleChangePage = (newPage: number) => {
const params = new URLSearchParams(searchParams.toString());
params.set("page", String(newPage));
router.push(`${pathname}?${params.toString()}`);
window.scrollTo({ top: 0, behavior: "smooth" });
};

return (

<div className="flex justify-center mt-4">
{typeof paginationData.total_pages !== "undefined" && (
<Pagination
total={paginationData.total_results}
defaultPageSize={20}
current={Number(pageInitial)}
onChange={handleChangePage}
showSizeChanger={false}
disabled={isValidating}
className={`${paginationData.total_pages < 2 ? "invisible" : ""}`}
/>
)}
</div>
);
};

export default PaginationPage;
