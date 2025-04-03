"use client";
import Card from "./card";
import CardHorizontal from "./cardHorizontal";
import { useContents, useStarred, useView } from "./atoms";
import { Table, TableBody, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { useEffect, useState } from "react";
import axios from "axios";

import Folder from "./folderCard";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function StarredContents({ setDragOver , params}: { setDragOver: (over: boolean) => void , params:string[]}) {
  const { view } = useView();
  const router = useRouter();
  const pathname = usePathname();
  const {contents, setContents} = useStarred();
  const [token, setToken] = useState<string | null>(null);
  const [ parentFolderId , setParentFolderId ] = useState();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      if (!token) {
        router.push('/api/auth/signin');
      }        
        const filesArray = await axios.get(`http://localhost:3002/files/starredFiles`, { headers: { token } });
        setContents(filesArray.data.files);
        return
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
              <Card
                key={`${index}-${index}`}
                id={item.id}
                fileName={item.fileName}
                fileSize={item.fileSize}
                creationDate={item.lastUpdated}
                starred={item.starred}
                previewLink={item.previewUrl} // or adjust as needed
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