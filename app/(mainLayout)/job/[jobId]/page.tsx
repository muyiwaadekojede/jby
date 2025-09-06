import { getFlagEmoji } from "@/app/utils/contries";
import { prisma } from "@/app/utils/db";
import { benefits } from "@/app/utils/listOfBenefits";
import { JsonToHtml } from "@/components/general/JsonToHtml";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { notFound } from "next/navigation";
import { string } from "zod";
import Image from 'next/image'
import arcjet, { tokenBucket, detectBot } from "@/app/utils/arcjet";
import { request } from "@arcjet/next";
import { auth } from "@/app/utils/auth";
import Link from "next/link";
import { SaveJobButton } from "@/components/forms/SubmitButtons";
import { saveJobPost, unsaveJobPost } from "@/app/actions";


const aj = arcjet.withRule(
    detectBot({
        mode: "LIVE",
        allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"]
    })
    
);

function getClient(session: boolean) {
    if(session) {
        return aj.withRule(
            tokenBucket({
                mode: "LIVE",
                capacity: 100,
                interval: 60,
                refillRate: 30,
            })
        )
    } else {
        return aj.withRule(
            tokenBucket({
                mode: "DRY_RUN",
                capacity: 100,
                interval: 60,
                refillRate: 10,
            })
        )

    }
}


async function getJob(jobId?: string, userId?: string) {


    const [jobData, savedJob] = await Promise.all([
        await prisma.jobPost.findUnique({
        where: {
            status: "ACTIVE",
            id: jobId, 
        },
        select: {
            jobTitle: true,
            jobDescription: true,
            location: true,
            employmentType: true,
            benefits: true,
            createdAt: true,
            listingDuration: true,
            Company: {
                select: {
                    name: true,
                    logo: true,
                    location: true,
                    about: true,
                },
            },
        },
    }),


    userId ? 
    prisma.savedJobPost.findUnique({
            where: {
                userId_jobPostId: {
                    userId: userId,
                    jobPostId: jobId as string
                }
            },
            select: {
                id: true
            }
    })
    : null,
    ])



    if(!jobData) {
        return notFound();
    }

    return {
        jobData, savedJob
    }
}

type Params = Promise<{ jobId: string }>;

export default async function JobIdPage({params}: {params: Params}) {
    const {jobId} = await params

    const session = await auth();
    
    const req = await request();

    const decision = await getClient(!!session).protect(req, {requested: 10});
    if (decision.isDenied()) {
        throw new Error("forbidden");
    }

    const { jobData: data, savedJob} = await getJob(jobId, session?.user?.id);

    const locationFlag = getFlagEmoji(data.location);
    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="space-y-8 col-span-2">
                {/*header*/}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Marketing Manager
                        </h1>
                        
                        <div className="flex items-center gap-2 mt-2">
                            <p className="font-medium">
                                {data.jobTitle}
                            </p>

                            <span className="hidden md:inline text-muted-foreground">
                                *
                            </span>
                        <Badge className="rounded-full" variant="secondary"> 
                            {data.employmentType}
                        </Badge>
                        <span className="hidden md:inline text-muted-foreground">
                            *
                        </span>

                        <Badge className="rounded-full">
                            {locationFlag && <span className="mr-1">{locationFlag}</span>}
                            {data.location}
                        </Badge>
                        </div>
                    </div>

                    {/* <Button variant="outline">
                        Save Job
                        <Heart className="size-4"/>
                    </Button> */}

                    {session && session.user ? (
                        <form action={
                            savedJob 
                            ? unsaveJobPost.bind(null, savedJob.id) 
                            : saveJobPost.bind(null, jobId)
                        }>

                            <SaveJobButton savedJob={!!savedJob} />
                        </form>
                    ) : (
                    <Link href="/login" className= {buttonVariants ({ variant: "outline" })} >
                        <Heart className="size-4"/>
                        Save Job
                    </Link> 
                    )}
                </div>

                <section>
                    <JsonToHtml json={JSON.parse(data.jobDescription)} />
                </section>

                <section>
                    <h3 className="font-semibold mb-4">
                        Benefits  {" "}

                        <span className="text-sm text-muted-foreground font-normal">
                            (green means offered)
                        </span>
                    </h3>

                    <div className="flex flex-wrap gap-3">
                        {benefits.map((benefit) => {

                            const isOffered = data.benefits.includes(benefit.id);
                            return (
                                    <Badge 
                                    className={cn(
                                        isOffered ? "" : "opacity-75 cursor-not-allowed",
                                        "text-sm px-4 py-1.5 rounded-full"
                                    )}
                                    key={benefit.id} 
                                    variant={isOffered ?  "default" : "outline"}
                                    >
                                        <span className="flex items-center gap-2">
                                            {benefit.icon}
                                            {benefit.label}
                                        </span>
                                    </Badge>
                                
                            )
                        })}
                    </div>
                </section>
            </div>

            {/* Second grid column for Apply Now card */}
            <div className="space-y-6">
                <Card className="p-6">
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold">
                                Apply Now
                            </h3>

                            <p className="text-sm text-muted-foreground mt-1">
                                Please let {data.Company.name} know you found this job on JobLand
                            </p>


                            <Button className="w-full">
                                Apply Now
                            </Button>
                        </div>
                    </div>
                </Card>


                {/* {Job Details Card} */}
                <Card className="p-6">
                    <h3 className="font-semibold">
                        About the Job
                    </h3>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                                Apply Before
                            </span>

                            <span className="text-sm">
                                {new Date(data.createdAt.getTime() + data.listingDuration * 24 *60 * 1000).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                                POSTED On
                            </span>

                            <span className="text-sm">
                                {data.createdAt.toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                }
                                )}
                            </span>
                        </div>


                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                                Employment Type
                            </span>

                            <span className="text-sm">
                                {data.employmentType}
                            </span>
                        </div>




                        
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                                Location
                            </span>

                            <span className="text-sm">
                             {locationFlag && <span className="mr-1">{locationFlag}</span>}
                                {data.location}
                            </span>
                        </div>
                    </div>
                </Card>

                  {/* {company card} */}
                <Card className="p-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Image src={data.Company.logo} alt={"Company logo"} 
                            width={48} height={48} className="round size-12" />
                        <div className="flex flex-xol">
                            <h3 className="font-semibold">
                                {data.Company.name}
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {data.Company.about}
                                </p>
                            </h3>
                        </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}