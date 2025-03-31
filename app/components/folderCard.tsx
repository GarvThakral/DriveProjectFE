"use client"
import { FileChartColumnIncreasingIcon, EllipsisVerticalIcon, StarIcon, FolderIcon } from "lucide-react";
import { useContents, useView } from "./atoms";
import { CardProps } from "../interfaces/cardInterface";
import { useParams, usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";


export default function Folder(props: FolderProps) {
    const {contents, setContents} = useContents();
    const router = useRouter();
    const pathName = usePathname();
    let token:string;
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

    async function openFolder(){
        let filesArray;
        router.push(pathName+"/"+props.id+'-'+props.folderName)
        filesArray = await axios.get(`http://localhost:3002/files/${props.id}`, { headers: { token } });
        setContents(filesArray.data.folderContents);
    }
    useEffect(()=>{
        token = localStorage.getItem('token') || '';
        if(token == ''){
            router.push('/signin');
        }
    },[])

    return (
        <div 
            className="w-72 rounded-2xl grid grid-rows-[1fr_4fr_1fr] gap-2 h-64 p-4 bg-white shadow-md border-1"
            onDragEnter = {handleDragEnter} 
            onDragLeave = {handleDragLeave} 
            onDragOver = {handleDragOver}   
            onDrop = {()=>{}}
            onClick = {()=>openFolder()}
        >
            <div className = {'h-[20%]'}>{props.folderName}</div>
            <FolderIcon className = {'h-full w-full'}/>
            <div className = {'h-[10%]'}>19 MB</div>
        </div>
    );
}