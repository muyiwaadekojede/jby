"use server"

import {z} from "zod";
import { requireUser } from "./utils/requireUser";
import { recruiterSchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";

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