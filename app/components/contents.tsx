"use client";
import Card from "./card";
import CardHorizontal from "./cardHorizontal";
import { useContents, useView } from "./atoms";
import { Table, TableBody, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { useEffect, useState } from "react";
import axios from "axios";
import { fileResponse } from "../interfaces/fileReponseInterface";

export default function Contents({ setDragOver }: { setDragOver: (over: boolean) => void }) {
  const { view } = useView();
  const {contents, setContents} = useContents();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        const filesArray = await axios.get("http://localhost:3002/files", { headers: { token } });
        console.log(filesArray.data['Contents'])
        setContents(filesArray.data['Contents']);
      } catch (error) {
        console.error("Failed to fetch contents:", error);
      }
    };
    if (token !== null) {
      fetchContent();
    }
  }, [token]);

  function handleDragEnter(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragOver(false);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  return (
    <div>
      {view === "grid" ? (
        <div
          className="w-full h-full flex-wrap flex gap-4"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={() => setDragOver(false)}
        >
          {contents?.map((item,index) => (
            <Card
              key={index}
              id={parseInt(item.ETag)}
              fileName={item.Key}
              fileSize={item.Size}
              creationDate={item.LastModified}
              starred={false}
              previewLink="/.test1.png"
            />
          ))}
        </div>
      ) : (
        <div className="w-[95%] rounded-xl border-2 h-fit">
          <Table>
            <TableHeader>
              <TableRow className="text-center">
                <TableHead className="w-[11%]"></TableHead>
                <TableHead className="w-[15.5%]">Name</TableHead>
                <TableHead className="w-[24.5%] text-right">Date added</TableHead>
                <TableHead className="w-[24.5%] text-right">Size</TableHead>
                <TableHead className="w-[24.5%] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contents?.map((item , index) => (
                <CardHorizontal
                  key={index}
                  id={parseInt(item.ETag)}
                  fileName={item.Key}
                  fileSize={item.Size}
                  creationDate={item.LastModified}
                  starred={false}
                  previewLink="/.test1.png"
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}