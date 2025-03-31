import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation";
  
export default function BreadCrumbFooter(){
    const pathname = usePathname();
    const newpathname = pathname.slice(6);
    const pathArray = newpathname.split('/');
    return(
        <div className = {'w-full h-12 flex items-center flex-shrink-0 '}>
            <Breadcrumb>
                <BreadcrumbList >
                    <BreadcrumbItem >
                        <BreadcrumbLink href="/files" >Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    {pathArray.map((item,index)=>{
                    return<div className = {'flex items-center'} key = {index}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={pathname.slice(0,pathname.lastIndexOf('/'+item)+item.length+1)}>{item.slice(item.indexOf('-')+1)}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        </div>
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}