"use client"
import { Input } from "@/components/ui/input"
import Card from '../components/card';
import NavBar from '../components/navbar';
import StorageAlert from '../components/storageAlert';
import { Sidebar } from '../components/sidebar';
import Filters from '../components/filters';
import BreadCrumbFooter from '../components/breadCrumb';
import Contents from '../components/contents';
import { useState } from 'react';
import axios from 'axios';
export default function Home(){
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
        const name = event.dataTransfer.files[0].name;
        const file = event.dataTransfer.files[0];
        const token = localStorage.getItem('token');
        event.preventDefault();
        const preSignedResponse = await axios.post("http://localhost:3002/files/preSigned",
            {filename:name},
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

    return(
            <div className='h-screen w-full flex flex-col overflow-hidden' >
                <NavBar />
                <StorageAlert />
                <div className='w-full flex flex-1 overflow-hidden p-2'>
                    <Sidebar />
                    <div className={`${dragover ? 'outline-dashed outline-2 outline-blue-600':''} flex flex-col w-full  p-4`}
                        onDragEnter = {handleDragEnter} 
                        onDragLeave = {handleDragLeave} 
                        onDragOver = {handleDragOver}   
                        onDrop = {handleFileDrop}
                    >
                        <Filters />
                        <div className={`  flex-1 overflow-auto`}>
                            <Contents setDragOver={setDragOver}/>
                        </div>
                        <BreadCrumbFooter/>
                    </div>
                </div>
            </div>
    )
}