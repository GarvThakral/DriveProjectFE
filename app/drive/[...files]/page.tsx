"use client"
import NavBar from '../../components-custom/navbar';
import StorageAlert from '../../components-custom/storageAlert';
import { Sidebar } from '../../components-custom/sidebar';
import Filters from '../../components-custom/filters';
import BreadCrumbFooter from '../../components-custom/breadCrumb';
import Contents from '../../components-custom/contents';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContents } from '../../components-custom/atoms';
import { useParams, usePathname } from 'next/navigation';
import StarredContents from '@/app/components-custom/starredContents';
import TrashContents from '@/app/components-custom/trashedContent';
export default function Home(){
    const params = useParams();
    const pathname = usePathname();
    function handleDragEnter(event:React.DragEvent<HTMLDivElement>){
        event.preventDefault();
        setDragOver(true);
    }
    function handleDragLeave(event:React.DragEvent<HTMLDivElement>){
        if(event.currentTarget.contains(event.relatedTarget as Node)){
            event.preventDefault();
            setDragOver(true);
        }
    }
    function handleDragOver(event:React.DragEvent<HTMLDivElement>){
        event.preventDefault();
    }
    async function handleFileDrop(event:React.DragEvent<HTMLDivElement>){
        console.log(event.dataTransfer.files)
        const type = event.dataTransfer.files[0].type;
        const size = event.dataTransfer.files[0].size;
        const name = event.dataTransfer.files[0].name;
        const file = event.dataTransfer.files[0];
        console.log("HERE");
        const token = localStorage.getItem('token');
        event.preventDefault();
        let storagePath = '';
        const folderId = parseInt(params.files[params.files?.length-1]);
        const preSignedResponse = await axios.post("http://localhost:3002/files/preSigned",
            {   
                fileName:name,
                fileSize:size,
                fileType:type,
                previewUrl:"https://<bucket-name>.s3.us-east-1.amazonaws.com/users/"+name,
                storagePath,
                folderId
            },
            {headers:{token}}
        )
        const formData = new FormData();
        formData.append('file', event.dataTransfer.files[0])
        const uploadResponse = await axios.put(
            preSignedResponse.data.uploadUrl, 
            file,
            {
                headers: {
                    'Content-Type': file.type
                }
            }
        );
        
        console.log("File uploaded successfully", uploadResponse);
        return uploadResponse;      

    }
    
    const [ dragover , setDragOver ] = useState(false);
    const { contents , setContents } = useContents();
    return(
            <div className='h-screen w-full flex flex-col overflow-hidden' >
                <NavBar />
                <StorageAlert />
                <div className='w-full flex flex-1 overflow-hidden px-2'>
                    <Sidebar />
                    <div className={`${dragover ? 'outline-dashed outline-2 outline-blue-600':''} flex flex-col w-full  px-4`}
                        onDragEnter = {handleDragEnter} 
                        onDragLeave = {handleDragLeave} 
                        onDragOver = {handleDragOver}   
                        onDrop = {handleFileDrop}
                    >
                        <Filters />
                        <div className={`  flex-1 overflow-auto`}>
                            <Contents setDragOver={setDragOver} params = {params.files}/>             
                        </div>
                        <BreadCrumbFooter/>
                    </div>
                </div>
            </div>
    )
}