import { FileChartColumnIncreasingIcon, EllipsisVerticalIcon, StarIcon, FolderIcon } from "lucide-react";
import { useView } from "./atoms";
import { CardProps } from "../interfaces/cardInterface";


export default function Folder(props: FolderProps) {
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
            <div className = {'h-[20%]'}>{props.folderName}Folder 1</div>
            <FolderIcon className = {'h-full w-full'}/>
            <div className = {'h-[10%]'}>19 MB</div>
        </div>
    );
}