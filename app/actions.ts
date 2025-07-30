"use server"

import {z} from "zod";
import { requireUser } from "./utils/requireUser";
import { jobSeekerSchema, recruiterSchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import arcjet, { detectBot, shield } from "./utils/arcjet";
import { request } from "@arcjet/next";


const aj = arcjet.withRule(
    shield({
        mode: "LIVE",
    })

).withRule (
    detectBot({
        mode: "LIVE",
        allow: [],
    })
);


export async function CreateRecruiterCompany (data: z.infer<typeof recruiterSchema>) {
    const session = await requireUser();

    const req = await request();

    const decision = await aj.protect(req);

    if (decision.isDenied()) {
    throw new Error("Forbidden")
    }
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

    const req = await request();

    const decision = await aj.protect(req);

    if (decision.isDenied()) {
    throw new Error("Forbidden")
    }

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