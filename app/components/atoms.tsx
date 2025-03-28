import { create } from 'zustand'
import { fileResponse } from '../interfaces/fileReponseInterface';

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