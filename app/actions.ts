"use server"

import {z} from "zod";
import { requireUser } from "./utils/requireUser";
import { jobSeekerSchema, recruiterSchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";

export async function CreateRecruiterCompany (data: z.infer<typeof recruiterSchema>) {
    const session = await requireUser();

    const validateData = recruiterSchema.parse(data);

    await prisma.user.update({
        where: {
            id: session.id,
        },

        data: {
            onboardingCompleted: true,
            userType: "COMPANY",
            Recruiter: {
                create: {
                    ...validateData
                }
            }
        }
    });


}


export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>){
    const user = await requireUser();

    const validateData = jobSeekerSchema.parse(data);

    await prisma.user.update ({
        where: {
            id: user.id as string 
        },
        data: {
            onboardingCompleted: true, 
            userType: "JOB_SEEKER",
            Jobseeker: {
                create: {
                   ...validateData
                }
            }
        },
    });

    return redirect("/");
}