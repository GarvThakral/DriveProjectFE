import { create } from 'zustand'

interface viewInterface{
    view:string;
    setView:(view:string)=>void;
}

export const useView = create<viewInterface>((set)=>({
    view:'grid',
    setView:(view:string)=>set({view})
}))