import SearchBar from "@/componests/SeachBar";
import CardMovie from "@/componests/CardMovie";
import CardMovieMobile from "@/componests/CardMovieMobile";
import Pagination from "@/componests/Pagination";
import photo from "../../../public/movieImages/imageMovie.png"
const SearchPage = () => {
    return ( <div>
        <SearchBar />

        <div className="flex justify-center duration-300 transition">
            {/* Destop */}
        <div className=" hidden md:grid grid-cols-2 mx-auto mt-5 gap-4 duration-300">
            <CardMovie src={photo}/>
            <CardMovie src={photo}/>
            <CardMovie src={photo}/>
            <CardMovie src={photo}/>
            <CardMovie src={photo}/>
            <CardMovie src={photo}/>
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-5 mt-5 duration-300 ">
            <CardMovieMobile src={photo}/>
            <CardMovieMobile src={photo}/>
        </div>
        </div>


        {/* Pagination  */}
        <footer className=" mt-4">
            <Pagination totalPages={2} currentPage={1} onPageChage={1}/>
        </footer>
    </div> );
}
 
export default SearchPage;