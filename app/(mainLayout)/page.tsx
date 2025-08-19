import { JobFilter } from "@/components/general/JobFilters";
import { Card } from "@/components/ui/card";
import Image from "next/image";


export default function Home() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <JobFilter />

    <Card className="cols-span-2">
      bb
    </Card>  
    </div>
  );
}
