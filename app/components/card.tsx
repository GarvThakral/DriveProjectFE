"use client"
import { FileChartColumnIncreasingIcon, EllipsisVerticalIcon, StarIcon, StarOffIcon, DeleteIcon, TrashIcon, DownloadIcon, ShareIcon, PackageOpenIcon } from "lucide-react";
import { useView } from "./atoms";
import { CardProps } from "../interfaces/cardInterface";
import axios from "axios";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Card(props: CardProps) {

    const [ starred , setStarred ] = useState(props.starred);

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

    async function starFile(){
        const fileStatus = await axios.post('http://localhost:3002/files/star/'+props.id,{},
            {headers:{
                token:localStorage.getItem('token')
            }}
        )
        console.log(fileStatus);
        setStarred((c)=>!c)
    } 
    async function deleteFile(){
        const fileStatus = await axios.post('http://localhost:3002/files/delete/'+props.id,{},
            {headers:{
                token:localStorage.getItem('token')
            }}
        )
        console.log(fileStatus);
        setStarred((c)=>!c)
    } 

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
                    <DropdownMenu>
                        <DropdownMenuTrigger><EllipsisVerticalIcon/></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel onClick = {()=>deleteFile()} className = {'flex items-center'}><TrashIcon/> Delete</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><DownloadIcon />Download</DropdownMenuItem>
                            <DropdownMenuItem><ShareIcon />Share</DropdownMenuItem>
                            <DropdownMenuItem><PackageOpenIcon/>Open</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    </span>
                </div>
                <span className={'text-sm font-light'}>
                    {props.fileSize?.toString()}
                </span>
            </div>
            <div className={'h-full w-[95%] mx-auto rounded-xl overflow-hidden shadow-sm'}>
                <img src={"https://cloudstorageproject123123123123.s3.us-east-1.amazonaws.com/"+props.fileName} alt={'Hi'} className={'object-fill h-full w-full'}></img>
            </div>
            <div className={'h-full flex justify-between items-center text-sm font-light'}>
                <div>{props.creationDate}</div>
                {starred ? <StarIcon className = {'fill-amber-400'} onClick = {()=>starFile()}/>:<StarIcon onClick = {()=>starFile()}/>}
            </div>
        </div>
    );
}