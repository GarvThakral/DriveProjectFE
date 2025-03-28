import { FileChartColumnIncreasingIcon, EllipsisVerticalIcon, StarIcon } from "lucide-react";
import { useView } from "./atoms";
import { CardProps } from "../interfaces/cardInterface";


export default function Card(props: CardProps) {
    function handleDragEnter(event:React.DragEvent<HTMLDivElement>){
        event.preventDefault();
    }
    function handleDragLeave(event:React.DragEvent<HTMLDivElement>){
        if(event.currentTarget.contains(event.relatedTarget as Node)){
            event.preventDefault();
        }
    }
    function handleDragOver(event:React.DragEvent<HTMLDivElement>){
        event.preventDefault();
    }
    const { view , setView } = useView();

    return (
        <div 
            className="w-72 rounded-2xl grid grid-rows-[1fr_4fr_1fr] gap-2 h-64 p-4 bg-white shadow-md border-1"
            onDragEnter = {handleDragEnter} 
            onDragLeave = {handleDragLeave} 
            onDragOver = {handleDragOver}   
            onDrop = {()=>{}}
        >
            <div className={'h-full flex flex-col gap-1'}>
                <div className={'flex justify-between items-center'}>
                    <div className={'flex items-center text-xl'}>
                        <FileChartColumnIncreasingIcon stroke="blue" />
                        <span>{props.fileName}</span>
                    </div>
                    <span>
                        <EllipsisVerticalIcon />
                    </span>
                </div>
                <span className={'text-sm font-light'}>
                    {props.fileSize?.toString()}
                </span>
            </div>
            <div className={'h-full w-[95%] mx-auto rounded-xl overflow-hidden shadow-sm'}>
                <img src={"./test1.png"} alt={'Hi'} className={'object-fill h-full w-full'}></img>
            </div>
            <div className={'h-full flex justify-between items-center text-sm font-light'}>
                <div>{props.creationDate}</div>
                <StarIcon />
            </div>
        </div>
    );
}