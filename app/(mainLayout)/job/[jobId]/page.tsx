import { Badge } from "lucide-react";

export default function JobIdPage() {
    return (
        <div className="grid lg:grid-cols-[1fr, 400px] gap-8">
            <div className="space-y-8">
                {/*header*/}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Marketing Manager
                        </h1>
                        
                        <div className="flex items-center gap-2 mt-2">
                            <p className="font-medium">
                                Marshal LLC
                            </p>
                        <Badge> 
                            Full time
                        </Badge>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}