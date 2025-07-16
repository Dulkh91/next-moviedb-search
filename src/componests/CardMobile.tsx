
import Image  from "next/image";
import { Suspense } from "react";
import RateStar from "./RateStar";
import { Spin,Progress } from "antd";


type Props = {
  src: string;
  title: string;
  releaseDate: string;
  overview:string;
vote_average?: number ;
vote_count?: number;

};

const CardMobile = ({ src,title, releaseDate,overview,vote_average,vote_count }: Props) => {
  return (
        <div className=" shadow max-w-[451px] relative">
           <div className=" m-2 p-2">
                 <div className=" flex gap-2">
                <div className=" relative shrink-0 w-[60px] h-[91px]">
                    <Image src={src} layout="fill" alt="image" style={{objectFit:"cover"}} />
                </div>

                <div className="flex-row-1 m-3">
                    <div>
                        <h1 className="text-5 font-semibold">{title}</h1>
                        <p className="text-gray-500 text-xs mb-2">{releaseDate} </p>
                        <div className=" space-x-3">
                            <span className="border border-gray-200 py-1 px-2 bg-gray-100 text-xs rounded cursor-pointer">Action</span>
                            <span className="border  border-gray-200 py-1 px-2 bg-gray-100 text-xs rounded cursor-pointer">Drama</span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <p className="text-xs text-gray-700">
                            {overview}
                        </p>
                {/* Stars */}

           {vote_average &&(
             <div className=" flex mt-2 items-center whitespace-nowrap">
              <Suspense fallback={<Spin size="small"/>}>
                <RateStar vote_average={vote_average} />
              </Suspense>
            </div>
           )}
            </div>
           </div>

             {/* Progress */}
       {vote_count &&(
        <div className=" absolute top-2 right-2">
            <Progress type="circle" percent={vote_count} size={30} format={(percent)=> `${percent}`} strokeColor={'#E9D100'} />
        </div>
       )}
             
        </div>
  );
};

export default CardMobile;
