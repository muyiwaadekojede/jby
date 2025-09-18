import { EditJobForm } from "@/app/onboarding/EditJobForm";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";
import { notFound } from "next/navigation";


async function getData(jobId: string, p0: string) {
    const data = await prisma.jobPost.findUnique({
    where: {
        id: jobId,
        Company: {
            userId: p0,
        },
    },
    select: {
        id: true,
        benefits: true,
        jobTitle: true,
        jobDescription: true,
        salaryForm: true,
        salaryTo: true,
        location: true,
        employmentType: true,
        listingDuration: true,
        Company: {
            select: {
                about: true,
                name: true,
                location: true,
                website: true,
                xAccount: true,
                logo: true,

            },
        },
    },
    });

    if(!data) {
        return notFound();
    }

    return data;
}

type Params = Promise<{jobId: string}>


export default async function EditJobPage({params}: {params: Params}) {
    const{jobId} = await params;
    const user = await requireUser()
    const data = await  getData(jobId, user.id as string);
    return (
        <EditJobForm jobPost={data} />
        
    )
}