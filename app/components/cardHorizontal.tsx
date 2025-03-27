// app/components/CardHorizontal.tsx
'use client';

import { FileChartColumnIncreasingIcon, EllipsisVerticalIcon, StarIcon, FolderIcon, FileSpreadsheetIcon, FileImageIcon, FileTextIcon, FileAudioIcon, FileVideoIcon, FileIcon } from 'lucide-react';
import { useView } from './atoms';
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
interface CardProps {
  id?: number;
  fileName?: string;
  fileSize?: string;
  creationDate?: string;
  starred?: boolean;
  previewLink?: string;
  fileType?: string;
}


export default function CardHorizontal(props: CardProps) {
  const { view, setView } = useView();

  function handleDragEnter(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    if (event.currentTarget.contains(event.relatedTarget as Node)) {
      event.preventDefault();
    }
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  // Map file types to icons
  const getFileIcon = (fileType: string | undefined) => {
    switch (fileType) {
      case 'document':
        return <FileTextIcon stroke="blue" />;
      case 'folder':
        return <FolderIcon stroke="blue" />;
      case 'spreadsheet':
        return <FileSpreadsheetIcon stroke="green" />;
      case 'image':
        return <FileImageIcon stroke="purple" />;
      case 'presentation':
        return <FileTextIcon stroke="orange" />;
      case 'audio':
        return <FileAudioIcon stroke="purple" />;
      case 'video':
        return <FileVideoIcon stroke="red" />;
      default:
        return <FileChartColumnIncreasingIcon stroke="blue" />;
    }
  };

  return (
    <TableBody>
        <TableRow>
            <TableCell className="w-[11%]" ><StarIcon className = {'mx-auto'} /></TableCell>
            <TableCell className="w-[15.5%] flex items-center gap-2">
                <div className="">
                    <FileIcon className="stroke-blue-500" />
                </div>
                TextFile.png
            </TableCell>
            <TableCell className="w-[24.5%] text-right">19 November</TableCell>
            <TableCell className="w-[24.5%] text-right">19.24 MB</TableCell>
            <TableCell className="w-[24.5%]"><EllipsisVerticalIcon className="ml-auto" /></TableCell>
        </TableRow>
    </TableBody>
  
  );
}