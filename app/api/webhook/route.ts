// import { prisma } from "@/app/utils/db";
// import { stripe } from "@/app/utils/stripe";
// import { headers } from "next/headers";
// import Stripe from "stripe";

// export async function POST(req:Request) {
//     const body = await req.text();

//     const headerList = await headers ();

//     const signature = headerList.get("Stripe-Signature") as string;

//     let event: Stripe.Event;

//     try {
//         event = stripe.webhooks.constructEvent(
//             body, 
//             signature, 
//             process.env.STRIPE_WEBHOOK_SECRET as string
//         )


//     } catch {
//         return new Response("Webhook error", { status: 400 });
//     }


//     const session = event.data.object as Stripe.Checkout.Session;

//         if(event.type === 'checkout.session.completed') {
//             const customerId = session.customer;
//             const jobId = session.metadata?.jobId; // Add 'const' here


//         if(!jobId) {
//             return new Response( 'No job id found', { status: 400 });
//         }

//         const company = await prisma.user.findUnique ({
//             where: {
//                 stripeCustomerId: customerId as string, 
//             },
//             select: {
//                 Company: {
//                     select: {
//                         id: true, 
//                     }
//                 }
//             }
//         });


//         if(!company) {
//             return new Response ( "No Company Found for User", {status: 400} );
//         }

//         await prisma.jobPost.update({
//             where: {
//                 id: jobId,
//                 companyId: company?.Company?.id as string,
//             },

//             data: {
//                 status: 'ACTIVE'
//             }
//         })
//     }

//     return new Response(null, { status: 200 });
// }

import { prisma } from "@/app/utils/db";
import { stripe } from "@/app/utils/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const headerList = await headers();
    const signature = headerList.get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body, 
            signature, 
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
    } catch (error) {
        console.error('Webhook signature verification failed:', error);
        return new Response("Webhook error", { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === 'checkout.session.completed') {
        const customerId = session.customer;
        const jobId = session.metadata?.jobId;

        if (!jobId) {
            return new Response('No job id found', { status: 400 });
        }

        // CORRECTED: Use the correct relation name from your generated client
        const user = await prisma.user.findUnique({
            where: {
                stripeCustomerId: customerId as string,
            },
            include: {
                Recruiter: true, // This matches your generated client - capital R
            }
        });

        if (!user || !user.Recruiter) {
            return new Response("No Recruiter Found for User", { status: 400 });
        }

        // Verify the job belongs to this recruiter before updating
        const jobPost = await prisma.jobPost.findUnique({
            where: { id: jobId },
            select: { recruiterId: true }
        });

        if (!jobPost || jobPost.recruiterId !== user.Recruiter.id) {
            return new Response("Job not found or unauthorized", { status: 404 });
        }

        // Update the job post status
        await prisma.jobPost.update({
            where: { id: jobId },
            data: { status: 'ACTIVE' }
        });

        console.log(`Job post ${jobId} activated for recruiter ${user.Recruiter.id}`);
    }

    return new Response(null, { status: 200 });
}