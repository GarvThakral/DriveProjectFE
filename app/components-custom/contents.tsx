"use client";
import Card from "./card";
import CardHorizontal from "./cardHorizontal";
import { useContents, useFolders, useView } from "./atoms";
import { Table, TableBody, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { useEffect, useState } from "react";
import axios from "axios";

import Folder from "./folderCard";
import { useParams, usePathname } from "next/navigation";
import FolderHorizontal from "./folderHorizontal";

export default function Contents({ setDragOver , params}: { setDragOver: (over: boolean) => void , params:string[]}) {
  const { view } = useView();
  const pathname = usePathname();
  const {contents, setContents} = useContents();
  const {folders, setFolders} = useFolders();

  const [token, setToken] = useState<string | null>(null);
  const [ parentFolderId , setParentFolderId ] = useState();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const paramString = params[params?.length-1].slice(0,params[params?.length-1].indexOf('-'))
    console.log(paramString);
    const fetchContent = async () => {
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        let filesArray;
        if(pathname == "/drive/starred"){
          filesArray = await axios.get(`http://localhost:3002/files/starredFiles`, { headers: { token } });
          setContents(filesArray.data.files);
          return
        }
        if(pathname == "/drive/trash"){
          filesArray = await axios.get(`http://localhost:3002/files/trash`, { headers: { token } });
          setContents(filesArray.data.files);
          return
        }
        if(pathname != "/drive/files"){
          filesArray = await axios.get(`http://localhost:3002/files/getContent/${paramString}`, { headers: { token } });
          setContents(filesArray.data.folderContents[0].files);
          setFolders(filesArray.data.folderContents[0].subFolders);

          return
        }
        filesArray = await axios.get(`http://localhost:3002/files/getContent/files`, { headers: { token } });
        setContents(filesArray.data.folderContents[0].files);
        setFolders(filesArray.data.folderContents[0].subFolders);

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
          {contents?.map((file, index) => (
              <Card
                key={`${index}`}
                id={file.id}
                fileName={file.fileName}
                fileSize={file.fileSize}
                creationDate={file.lastUpdated}
                starred={file.starred}
                previewLink={file.previewUrl}
                status={file.status}
              />
          ))}
          {folders?.map((folder, index) => (
                <Folder
                  key={folder.id}
                  id={folder.id}
                  folderName={folder.folderName}
                  folderSize={folder.folderSize}
                  parentId = {folder.parentId}
                  createdAt={folder.createdAt}
                  userId={folder.userId}
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
              {contents?.map((file, index) => (
                  <CardHorizontal
                    key={`${index}`}
                    id={file.id}
                    fileName={file.fileName}
                    fileSize={file.fileSize}
                    creationDate={file.lastUpdated}
                    starred={file.starred}
                    previewLink={file.previewUrl} // or adjust as needed
                  />
              ))}
              {folders?.map((folder, index) => (
                <FolderHorizontal
                  key={folder.id}
                  id={folder.id}
                  folderName={folder.folderName}
                  folderSize={folder.folderSize}
                  createdAt={folder.createdAt}
                  parentId = {folder.parentId}
                  userId={folder.userId}
                />
            ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}