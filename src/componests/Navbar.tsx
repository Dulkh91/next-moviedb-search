import Link from "next/link";
const Navbar = () => {
    return ( < >
        <nav className="p-3 flex justify-center">
            <ul>
                <Link href={`/search`}><li className=" text-blue-500 border-b-2 py-2 p-1">Search</li></Link>
            </ul> 
        </nav>
    </> );
}
 
export default Navbar;