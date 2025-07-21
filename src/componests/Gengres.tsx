import { Skeleton ,Space } from "antd"
import { useGenres } from "@/hooks/useGenres"
type Props ={
    genres_id: number[]
}

const GengresPage = ({genres_id}:Props) => {
    const {genres,isLoading } = useGenres() 
    
    
    if(isLoading) return <Space>
        <Skeleton.Button active size={'small'} shape={'default'}/>
        <Skeleton.Avatar active size={'small'} shape={'circle'} />
        <Skeleton.Input active size={'small'} />
      </Space>

    const gengreMap:Record<number, string> = {}
    genres.forEach((genre:{id:number ,name:string})=>{
        gengreMap[genre.id] = genre.name
    })
  
    return (<>
        
        {genres_id && genres_id.map(id=>(
             <span key={id} className="border border-gray-200 py-1 px-2 bg-gray-100 text-xs rounded cursor-pointer">
               {gengreMap[id]}
            </span>
        ))}
    </> );
}
 
export default GengresPage;
