"use client"
import NavBar from '../components/navbar';
import StorageAlert from '../components/storageAlert';
import { Sidebar } from '../components/sidebar';
import Filters from '../components/filters';
import BreadCrumbFooter from '../components/breadCrumb';
import Contents from '../components/contents';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContents } from '../components/atoms';
import { useParams } from 'next/navigation';
export default function Home(){
    const params = useParams();
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
        const type = event.dataTransfer.files[0].type;
        const size = event.dataTransfer.files[0].size;
        const name = event.dataTransfer.files[0].name;
        const file = event.dataTransfer.files[0];
        const token = localStorage.getItem('token');
        event.preventDefault();
        let storagePath = '';
        const folderId = parseInt(params.files[params.files?.length-1]);
        console.log(folderId);
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