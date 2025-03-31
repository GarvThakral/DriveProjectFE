import { Button } from "@/components/ui/button"
import { Clock, Cloud, Computer, FileText, HardDrive, Image, Share, Star, Trash, UploadIcon, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation";

export function Sidebar() {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <div className="hidden w-64 flex-col border-r bg-background p-4 md:flex">
      <Button className="justify-start" variant="ghost" onClick = {()=>router.push('/files')}>
        <Cloud className="mr-2 h-4 w-4" />
        My Drive
      </Button>
      <Button className="justify-start" variant="ghost">
        <Computer className="mr-2 h-4 w-4" />
        Computers
      </Button>
      <Button className="justify-start" variant="ghost">
        <Share className="mr-2 h-4 w-4" />
        Shared with me
      </Button>
      <Button className="justify-start" variant="ghost">
        <Clock className="mr-2 h-4 w-4" />
        Recent
      </Button>
      <Button className="justify-start" variant="ghost">
        <Star className="mr-2 h-4 w-4" />
        Starred
      </Button>
      <Button className="justify-start" variant="ghost">
        <Trash className="mr-2 h-4 w-4" />
        Trash
      </Button>
      <div className="mt-4 border-t pt-4">
        <h3 className="mb-2 px-4 text-sm font-medium">Storage</h3>
        <div className="mb-2 px-4">
          <Progress value={3} />

          <p className="text-xs text-muted-foreground">2.5 GB of 15 GB used</p>
        </div>
      </div>
      <div className="mt-4 border-t pt-4 ">
        <h3 className="mb-2 px-4 text-sm font-medium ">Categories</h3>
        <Button className="justify-start w-full" variant="ghost">
          <Image className="mr-2 h-4 w-4" />
          Images
        </Button>
        <Button className="justify-start w-full" variant="ghost">
          <FileText className="mr-2 h-4 w-4" />
          Documents
        </Button>
        <Button className="justify-start w-full" variant="ghost">
          <HardDrive className="mr-2 h-4 w-4" />
          Storage
        </Button>
        <Button className="justify-start w-full" variant="ghost">
          <Users className="mr-2 h-4 w-4" />
          Shared
        </Button>
        <div className="w-28  flex justify-center p-2 items-center rounded-3xl bg-black text-white cursor-pointer drop-shadow-xl">
            <UploadIcon stroke="white" />
            <label className=" text-center cursor-pointer">
                Upload
                <input type="file" className="hidden text-black" />
            </label>
        </div>
      </div>
    </div>
  )
}

