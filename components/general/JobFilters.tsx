import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle } from "../ui/card";

export function JobFilter() {
    return (
        <Card className="col-span-1">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-2xl font-semibold">
                    Filter
                </CardTitle>

                <Button>
                    <XIcon className="size-4" />
                </Button>
            </CardHeader>




        </Card>
    )
}