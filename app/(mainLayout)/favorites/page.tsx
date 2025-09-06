import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";
import { EmptyState } from "@/components/general/EmptyState";
import { JobCard } from "@/components/general/JobCard";

async function getFavourites(userId: string) {

    const data = await prisma.savedJobPost.findMany({
        where: {
            userId: userId,
        },
        select: {
            JobPost: {
                select: {
                    id: true,
                    jobTitle: true, 
                    salaryForm: true,
                    salaryTo: true,
                    employmentType: true,
                    location: true,
                    createdAt: true,
                    Company: {
                        select: {
                            name: true,
                            logo: true,
                            location: true,
                            about: true,
                        },
                    },
                },
            },
        },
    });

    return data;
}
    

export default async function FavouritesPage () {
    const session = await requireUser()
    const data = await getFavourites(session?.id as string)

    if(data.length === 0) {
        <EmptyState title="No Favourites Found" description="You dont have any favourite job yet" buttonText="Find a job" href="/" /> 

    }


    return (
        <div className="grid grid-cols-1 mt-5 gap-4">
            {data.map((favourite) => (
                <JobCard key={favourite.JobPost.id} job={favourite.JobPost}/>
            ))}
        </div>
    )
}