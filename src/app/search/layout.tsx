import { ReactNode } from "react";

const layoutSearch = ({
  children,
  searchmovie,
  paginationsearching,
}: {
  children: ReactNode;
  searchmovie: ReactNode;
  paginationsearching: ReactNode;
}) => {
  
  return (
    <div className=" space-y-5">
      <div>{children}</div>
      <div>{searchmovie}</div>
      <div>{paginationsearching}</div>
    </div>
  );
};

export default layoutSearch;
