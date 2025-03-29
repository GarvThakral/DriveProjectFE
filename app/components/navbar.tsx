import { HardDrive , SettingsIcon , InfoIcon , UploadIcon, Upload, MailOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link  from "next/link";
import { Button } from "@/components/ui/button";

export default function NavBar(){
    
    return(
        <div className = {'flex justify-between items-center w-full p-4 shadow-sm mb-0.5'}>
            <div>
                <HardDrive size={36}/>
            </div>
            <div>
                <Input className="w-96" placeholder="Search for documents"/>
            </div>
            <div className = {'flex items-center gap-8'}>
                <Link href = {"/features"}>
                    <span className = {'relative group p-1'}>Features
                        <span className = {'absolute left-1/2 w-0 h-0.5 bottom-0 bg-black group-hover:w-full group-hover:left-0 transition-all  duration:300'}></span>
                    </span>
                </Link>
                <Link href = {"/pricing"}>
                    <span className = {'relative group p-1'}>Pricing
                        <span className = {'absolute left-1/2 w-0 h-0.5 bottom-0 bg-black group-hover:w-full group-hover:left-0 transition-all  duration:300'}></span>
                    </span>
                </Link>
                <InfoIcon className = {"hover:scale-105"}/>
                <div className = {'hover:rotate-45 transition-transform duration:300'}>
                    <SettingsIcon />
                </div>
                <Link href = "signin">
                    <Button className = {'cursor-pointer'}>
                        <MailOpen /> Login
                    </Button>
                </Link>
            </div>
            
        </div>
    );
}