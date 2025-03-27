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
                <Link href = {"/features"}><span>Features</span></Link>
                <Link href = {"/pricing"}><span>Pricing</span></Link>
                <InfoIcon />
                <SettingsIcon />
                <Button>
                    <MailOpen /> Login
                </Button>
            </div>
            
        </div>
    );
}