import { create } from 'zustand'
import { fileResponse, FolderProps, starredResponse } from '../interfaces/fileReponseInterface';

interface viewInterface{
    view:string;
    setView:(view:string)=>void;
}

export const useView = create<viewInterface>((set)=>({
    view:'grid',
    setView:(view:string)=>set({view})
}))

interface ContentsState {
    contents: fileResponse[];
    setContents: (contents: fileResponse[]) => void;
  }
  
export const useContents = create<ContentsState>((set) => ({
contents: [],
setContents: (contents) => set({ contents }),
}));

interface FolderState {
  folders: FolderProps[];
  setFolders: (contents: FolderProps[]) => void;
}

export const useFolders= create<FolderState>((set) => ({
  folders: [],
  setFolders: (folders) => set({ folders }),
}));