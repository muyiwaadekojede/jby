// import { JobFilter } from "@/components/general/JobFilters";
// import { JobListings } from "@/components/general/JobListings";
// import { Card } from "@/components/ui/card";
// import Image from "next/image";


// export default function Home() {
//   return (
//     <div className="grid grid-cols-3 gap-8">
//       <JobFilter />

//       <div className="col-span-2 flex flex-col gap-6">
//         <JobListings />
//       </div>
//     </div>
//   );
// }


import { JobFilter } from "@/components/general/JobFilters";
import { JobListings } from "@/components/general/JobListings";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Home({ searchParams }: HomeProps) {
  const jobCreated = searchParams?.jobCreated === 'true';

  return (
    <div className="grid grid-cols-3 gap-8">
      <JobFilter />

      <div className="col-span-2 flex flex-col gap-6">
        {jobCreated && (
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-green-800 font-medium">
                Job posted successfully! Your job is now live and visible to candidates.
              </p>
            </div>
          </Card>
        )}
        
        <JobListings />
      </div>
    </div>
  );
}