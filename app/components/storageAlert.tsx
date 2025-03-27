import { Cross, InfoIcon, X } from "lucide-react";
import { useState } from "react";

export default function StorageAlert(){
    const [ visible, setVisible ] = useState(false);
    return(
        <div className = {`${visible ? 'hidden':''} h-10 w-full flex items-center justify-center bg-slate-50 gap-1`}>
            <InfoIcon stroke = "blue"/>
            <span>Running out of storage <span className = {"text-blue-800"}>Upgrade Now ?</span></span>
            <X className = {'absolute right-2 cursor-pointer'}  onClick={()=>{setVisible(c=>!c)}}/>
        </div>
    );    
}