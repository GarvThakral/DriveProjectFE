"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Grid, List } from "lucide-react"
import { useView } from "./atoms";
  
export default function Filters(){
    const { view, setView } = useView()
    return(
        <div className = {'h-14 w-full flex justify-between overflow-hidden'}>
            <div className = {'flex gap-4'}>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className = {'flex gap-4'}>
                <Grid className = {'cursor-pointer'} onClick = {()=>{setView("grid") ;console.log(view)}}/>
                <List className = {'cursor-pointer'}  onClick = {()=>{setView("list") ;console.log(view)}}/>
            </div>

        </div>
    )
}