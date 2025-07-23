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
