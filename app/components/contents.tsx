import { useState } from "react";
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
export default function Contents({ setDragOver }: { setDragOver: (over: boolean) => void }){

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
                <Card />
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
                    <CardHorizontal />
                    <CardHorizontal />
                    <CardHorizontal />
                </Table>
            </div>
            }
            
        </div>
    );
}

