
import dynamic from "next/dynamic";
import MovieList from "@/componests/MovieList";


// const ButtonTest = dynamic(()=> import("@/componests/MovieCard"))

export default function Home() {
  return (<MovieList />);
}
