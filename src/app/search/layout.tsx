'use client'
import { ReactNode } from "react";
const layoutSearch = ({
    children, 
    searchmovie
}:{
    children: ReactNode;
    searchmovie: ReactNode
}

) => {
    return ( <div className=" space-y-5">
        <div>{children}</div>
        <div>{searchmovie}</div>
        {/* Add to pagination */}
    </div> );
}
 
export default layoutSearch;