"use client";
import Card from "./card";
import CardHorizontal from "./cardHorizontal";
import { useContents, useView } from "./atoms";
import { Table, TableBody, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { useEffect, useState } from "react";
import axios from "axios";

import Folder from "./folderCard";
import { useParams, usePathname } from "next/navigation";

export default function Contents({ setDragOver , params}: { setDragOver: (over: boolean) => void , params:string[]}) {
  const { view } = useView();
  const pathname = usePathname()
  const {contents, setContents} = useContents();
  const [token, setToken] = useState<string | null>(null);
  const [ parentFolderId , setParentFolderId ] = useState();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const paramString = params[params?.length-1].slice(0,params[params?.length-1].indexOf('-'))
    const fetchContent = async () => {
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        let filesArray;
        if(pathname != "/files"){
          filesArray = await axios.get(`http://localhost:3002/files/${paramString}`, { headers: { token } });
          setContents(filesArray.data.folderContents);
          return
        }
        filesArray = await axios.get(`http://localhost:3002/files/files`, { headers: { token } });
        setContents(filesArray.data.folderContents);
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
          {contents?.map((item, index) => (
            item.files.map((file, fileIndex) => (
              <Card
                key={`${index}-${fileIndex}`}
                id={file.id}
                fileName={file.fileName}
                fileSize={file.fileSize}
                creationDate={file.lastUpdated}
                starred={file.starred}
                previewLink={file.previewUrl} // or adjust as needed
              />
            ))
          ))}
          {contents?.map((item, index) => (
            item.subFolders?.map((folder, folderIndex) => (
                <Folder
                  key={folder.id}
                  id={folder.id}
                  folderName={folder.folderName}
                  folderSize={folder.folderSize}
                  parentId = {folder.parentId}
                  userId={folder.userId}
                />
            ))
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
              {contents?.map((item, index) => (
                item.files.map((file, fileIndex) => (
                  <CardHorizontal
                    key={`${index}-${fileIndex}`}
                    id={file.id}
                    fileName={file.fileName}
                    fileSize={file.fileSize}
                    creationDate={file.lastUpdated}
                    starred={file.starred}
                    previewLink={file.previewUrl} // or adjust as needed
                  />
                ))
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}