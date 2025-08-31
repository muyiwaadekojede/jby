"use server"

import {z} from "zod";
import { requireUser } from "./utils/requireUser";
import { jobSchema, jobSeekerSchema, recruiterSchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import arcjet, { detectBot, shield } from "./utils/arcjet";
import { request } from "@arcjet/next";
// COMMENTED OUT - Payment functionality disabled
// import { stripe } from "./utils/stripe";
// import { jobListingDurationPricing } from "./utils/jobListingDurationPricing";
import { inngest } from "./utils/inngest/client";

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

export async function createJob(data: z.infer<typeof jobSchema>) {
    const user = await requireUser();

    const req = await request();

    const decision = await aj.protect(req)

    if(decision.isDenied()) {
        throw new Error ("Forbidden");
    }

    const validateData = jobSchema.parse(data);

    const company = await prisma.recruiter.findUnique ({
        where: {
            userId: user.id
        },
        select: {
            id: true,
            // COMMENTED OUT - No longer need stripe customer ID
            // user: {
            //     select: {
            //         stripeCustomerId: true,
            //     },
            // }
        }
    })

    if(!company?.id) {
        return redirect("/")
    }

    // COMMENTED OUT - Payment functionality disabled
    // let stripeCustomerId = company.user.stripeCustomerId;

    // if(!stripeCustomerId) {
    //     const customer = await stripe.customers.create({
    //         email: user.email as string,
    //         name: user.name as string,
    //     });

    //     stripeCustomerId = customer.id;

    //     //update user with stripe customer id 
    //     await prisma.user.update ({
    //         where: {
    //             id: user.id, 
    //         },
    //         data: {
    //             stripeCustomerId: stripeCustomerId,
    //         },
    //     });
    // }

    const jobpost = await prisma.jobPost.create({
        data: {
            jobDescription: validateData.jobDescription,
            jobTitle: validateData.jobTitle,
            employmentType: validateData.employmentType,
            location: validateData.location,
            salaryForm: validateData.salaryFrom,
            salaryTo: validateData.salaryTo,
            listingDuration: validateData.listingDuration,
            benefits: validateData.benefits,
            status: 'ACTIVE', // CHANGED: Set to ACTIVE immediately instead of DRAFT
            Company: {
                connect: { id: company.id }
            },
        },
        select: {
            id: true,
        }
    });

    // Send job creation event after jobpost is created
    await inngest.send({
        name: "job/created",
        data: {
            jobId: jobpost.id,
            expirationDays: validateData.listingDuration,
        }
    });

    // COMMENTED OUT - Payment functionality disabled
    // const pricingTier = jobListingDurationPricing.find(
    //     (tier) => tier.days === validateData.listingDuration
    // );

    // if(!pricingTier) {
    //     throw new Error("Invalid Listing duration selected");
    // }

    // const session = await stripe.checkout.sessions.create({
    //     line_items: [
    //         {
    //             price_data: {
    //                 currency: 'usd',
    //                 unit_amount: pricingTier.price * 100,
    //                 product_data: {
    //                     name: `Job Posting - ${pricingTier.days} Days`,
    //                     description: pricingTier.description,
    //                 },
    //             },
    //             quantity: 1,
    //         },
    //     ],

    //     metadata: {
    //         jobId: jobpost.id,
    //     },

    //     mode: 'payment',
    //     success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
    //     cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
    // });

    // return redirect(session.url as string);

    // CHANGED: Redirect to success page instead of Stripe checkout
    return redirect("/dashboard?success=true");
}