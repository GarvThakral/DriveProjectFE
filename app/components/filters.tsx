import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Grid, List } from "lucide-react";
import { useContents, useView } from "./atoms";
import { useEffect, useState } from "react";

export default function Filters() {
    const { view, setView } = useView();
    const { contents, setContents } = useContents();
    const [dateFilter, setDateFilter] = useState("any");
    const [sizeFilter, setSizeFilter] = useState("any");
    const [originalContents, setOriginalContents] = useState([]);

    useEffect(() => {
        // Store the original contents on the first render
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
            </div>
            <div className="flex gap-4">
                <Grid
                    className="cursor-pointer"
                    onClick={() => {
                        setView("grid");
                        console.log(view);
                    }}
                />
                <List
                    className="cursor-pointer"
                    onClick={() => {
                        setView("list");
                        console.log(view);
                    }}
                />
            </div>
        </div>
    );
}
