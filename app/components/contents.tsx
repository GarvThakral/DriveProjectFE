import jwt from 'jsonwebtoken';
import Card from "./card";
import CardHorizontal from "./cardHorizontal";
import { useView } from "./atoms";
import { StarIcon } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import axios from "axios";
import { fileResponse } from "../interfaces/fileReponseInterface";

export default async function Contents({ setDragOver }: { setDragOver: (over: boolean) => void }){

    function handleDragEnter(event:React.DragEvent<HTMLDivElement>){
        event.preventDefault();
        setDragOver(true);
    }
    function handleDragLeave(event:React.DragEvent<HTMLDivElement>){
        if(event.currentTarget.contains(event.relatedTarget as Node)){
            event.preventDefault();
            setDragOver(true);
        }
        setDragOver(false);
    }
    function handleDragOver(event:React.DragEvent<HTMLDivElement>){
        event.preventDefault();
    }
    const { view, setView } = useView()
    
    const session = await getServerSession(authOptions);
    if (session) {
      const userId = session.user.id; 
      const userEmail = session.user.email;
      console.log("User ID:", userId);
      console.log("User Email:", userEmail);
    } else {
      console.log("No session found");
    }


    const token = jwt.sign(session.user.id, process.env.NEXTAUTH_SECRET || "new");

    const filesArray = await axios.get('http://localhost:3002/files',{headers:{token}})
    const contents:fileResponse[] = filesArray.data.contents;
    return (
        <div>
            {view ==='grid' ? 
            <div 
                className={`w-full h-full flex-wrap flex gap-4`} 
                onDragEnter = {handleDragEnter} 
                onDragLeave = {handleDragLeave} 
                onDragOver = {handleDragOver}   
                onDrop = {()=>{}}
            >
                {contents.map((item)=>{
                    return <Card 
                        key = {parseInt(item.ETag)}  
                        id = {parseInt(item.ETag)} 
                        fileName = {item.Key}
                        fileSize = {item.Size}
                        creationDate = {item.LastModified}
                        starred = {false}
                        previewLink = {'/.test1.png'} 
                    />
                })}
            </div>:
            <div className = {'w-[95%] rounded-xl border-2 h-fit'}>
                <Table>
                    <TableHeader >
                        <TableRow className = {'text-center'}>
                        <TableHead className="w-[11%]"></TableHead>
                        <TableHead className="w-[15.5%]">Name</TableHead>
                        <TableHead className="w-[24.5%] text-right">Date added</TableHead>
                        <TableHead className="w-[24.5%] text-right">Size</TableHead>
                        <TableHead className="w-[24.5%] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    {contents.map((item)=>{
                    return <CardHorizontal 
                        key = {parseInt(item.ETag)}  
                        id = {parseInt(item.ETag)} 
                        fileName = {item.Key}
                        fileSize = {item.Size}
                        creationDate = {item.LastModified}
                        starred = {false}
                        previewLink = {'/.test1.png'} 
                    />
                })}
                </Table>
            </div>
            }
            
        </div>
    );
}

