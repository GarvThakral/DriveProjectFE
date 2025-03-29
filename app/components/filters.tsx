import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Grid, List } from "lucide-react";
import { useContents, useView } from "./atoms";
import { useEffect, useRef, useState } from "react";
import { fileResponse } from "../interfaces/fileReponseInterface";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import axios from "axios";
import { useParams } from "next/navigation";
  
const API_URL = process.env.NEXTAUTH_URL
console.log(API_URL)
export default function Filters() {
    const params = useParams()
    const folderNameRef = useRef<HTMLInputElement>(null);
    const { view, setView } = useView();
    const { contents, setContents } = useContents();
    const [dateFilter, setDateFilter] = useState("any");
    const [sizeFilter, setSizeFilter] = useState("any");
    const [originalContents, setOriginalContents] = useState<fileResponse[]>([]);

    useEffect(() => {
        if (originalContents.length === 0 && contents.length > 0) {
            setOriginalContents(contents);
        }
    }, [contents]);

    function applyFilters() {
        if (dateFilter === "any" && sizeFilter === "any") {
            setContents(originalContents);
            return;
        }

        let sortedContents = [...originalContents]; 

        if (dateFilter !== "any") {
            sortedContents.sort((a, b) =>
                dateFilter === "newest"
                    ? new Date(b.LastModified) - new Date(a.LastModified) // Newest first
                    : new Date(a.LastModified) - new Date(b.LastModified) // Oldest first
            );
        }

        if (sizeFilter !== "any") {
            sortedContents.sort((a, b) =>
                sizeFilter === "largest"
                    ? b.Size - a.Size // Largest first
                    : a.Size - b.Size // Smallest first
            );
        }

        setContents(sortedContents);
    }

    useEffect(() => {
        if (originalContents.length > 0) {
            applyFilters();
        }
    }, [dateFilter, sizeFilter]);

    async function createFolder() {
        const token = localStorage.getItem('token');
        const folderName = folderNameRef.current?.value;
        const parentFolder = params.files[params.files?.length-1] || "files";
        
        try {
            const createdFolder = await axios.post(
                `http://localhost:3002/folder/create/${folderName}/${parentFolder}`,
                {},
                {
                    headers: { token }
                }
            );
            console.log(createdFolder);
        } catch (error) {
            console.error("Error creating folder:", error);
        }
    }

    return (
        <div className="h-14 w-full flex justify-between overflow-hidden">
            <div className="flex gap-4 items-center">
                <label>Sort by:</label>
                <Select onValueChange={(value) => setDateFilter(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                    </SelectContent>
                </Select>
                <Select onValueChange={(value) => setSizeFilter(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="largest">Largest First</SelectItem>
                        <SelectItem value="smallest">Smallest First</SelectItem>
                    </SelectContent>
                </Select>
                <Popover>
                    <PopoverTrigger  className = {'border-1 p-1.5 px-6 rounded-sm shadow-xs'}>Create Folder</PopoverTrigger>
                    <PopoverContent className = {'flex items-center'}><input ref = {folderNameRef} placeholder = {'folder name'}/><button onClick = {()=>createFolder()}>Create</button></PopoverContent>
                </Popover>
            </div>

            <div className="flex gap-2 items-center ">
                <Grid
                    className="cursor-pointer p-2 hover:bg-slate-200 rounded-2xl"
                    onClick={() => {
                        setView("grid");
                        console.log(view);
                    }}
                    size = {40}
                />
                <List
                    className="cursor-pointer p-2 hover:bg-slate-200 rounded-2xl"
                    onClick={() => {
                        setView("list");
                        console.log(view);
                    }}
                    size = {40}
                />
            </div>
        </div>
    );
}
