import Image, { StaticImageData } from "next/image";

type Prop = {
  src: string | StaticImageData;
};

const CardMovieMobile = ({src}:Prop) => {
  return (
        <div className=" shadow max-w-[451px]">
            <div className=" flex gap-2">
                <div className=" shrink-0">
                    <Image src={src} width={60} height={91} alt="image" />
                </div>

                <div className="flex-row-1 m-3">
                    <div>
                        <h1 className="text-xl font-semibold">The way back</h1>
                        <p className="text-gray-500 text-sm mb-2">March 5, 2020 </p>
                        <div className=" space-x-3">
                            <span className="border border-gray-200 py-1 px-2 bg-gray-100 text-xs rounded cursor-pointer">Action</span>
                            <span className="border  border-gray-200 py-1 px-2 bg-gray-100 text-xs rounded cursor-pointer">Drama</span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <p className="text-xs text-gray-700">
                            A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...
                        </p>

                        {/* Stars */}
                    <div className="mt-2 flex gap-1 text-yellow-400">
                        ⭐ ⭐ ⭐✩✩✩✩✩✩✩
                    </div>
            </div>
             
        </div>
  );
};

export default CardMovieMobile;


