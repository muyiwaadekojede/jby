import Link from "next/link";
import { Card, CardHeader } from "../ui/card";
import { User2Icon } from "lucide-react";

export function JobCard() {
    return (
        <Link href={`/job`}>
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row gap-4">
                        <User2Icon className="size-6 text-white"/>
                    </div>
                </CardHeader>
            </Card>
        </Link>
    )
}