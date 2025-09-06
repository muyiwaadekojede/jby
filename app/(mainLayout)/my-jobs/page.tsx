import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";
import { EmptyState } from "@/components/general/EmptyState";
import { JobListings } from "@/components/general/JobListings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CopyCheckIcon, Icon, MoreHorizontal, PenBoxIcon, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getJob(userId: string) {
    const data = await prisma.jobPost.findMany({
        where: {
            Company: {
                userId: userId,
            },
        },

        select: {
            id: true,
            jobTitle: true,
            status: true,
            createdAt: true,
            Company: {
                select: {
                    name: true,
                    logo: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return data;
}
    

export default async function MyJobsPage() {
    const session = await requireUser()
    const data = await getJob(session.id as string);
    
    return (
        <>
            {data.length === 0 ? (
                <EmptyState title="No Job Post Found" description="You dont have any job post yet" buttonText="Create Job Post Now!" href="/post-job" />
            ) : (
                <Card> 
                    <CardHeader> 
                        <CardTitle>
                            My Jobs
                        </CardTitle>

                        <CardDescription>
                            Manage Your Job Listings and Applications here.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        Logo
                                    </TableHead>
                                    <TableHead>
                                        Company
                                    </TableHead>
                                    <TableHead>
                                        Job Title
                                    </TableHead>
                                    <TableHead>
                                        Status
                                    </TableHead>
                                    <TableHead>
                                        Created At
                                    </TableHead>
                                    <TableHead>
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {data.map((listing) => (
                                    <TableRow key={listing.id}>
                                        <TableCell>
                                            <Image 
                                                src={listing.Company.logo || "/default-logo.png"} 
                                                alt="logo of company" 
                                                width={40} 
                                                height={40} 
                                                sizes="10" 
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {listing.Company.name}
                                        </TableCell>
                                        <TableCell>
                                            {listing.jobTitle}
                                        </TableCell>
                                        <TableCell>
                                            {listing.status}
                                        </TableCell>
                                        <TableCell>
                                            {listing.createdAt.toDateString()}
                                        </TableCell>
                                        <TableCell>
                                            {/* Add your action buttons here */}
                                        </TableCell>

                                        <TableCell>
                                            {listing.Company.name}
                
                                        </TableCell>

                                        <TableCell>
                                            {listing.jobTitle}
                                        </TableCell>


                                        <TableCell>
                                            {listing.jobTitle}
                                        </TableCell>

                                        <TableCell>
                                            {listing.status.charAt(0).toUpperCase() + 
                                            listing.status.slice(1).toLowerCase()} 
                                        </TableCell>
                                        <TableCell>
                                            {listing.createdAt.toLocaleDateString('en-US', {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </TableCell>

                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal
                                                        />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>
                                                        Actions
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/my-jobs/${listing.id}/edit`}>
                                                        <PenBoxIcon  />
                                                        Edit Job
                                                        </Link>
                                                    </DropdownMenuItem>

                                                   <DropdownMenuItem asChild>
                                                        <Link href={`/my-jobs/${listing.id}/edit`}>
                                                        <CopyCheckIcon />
                                                        Copy Job Url
                                                        </Link>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuSeparator>
                                                        <DropdownMenuItem asChild>
                                                            
                                                   <DropdownMenuItem asChild>
                                                        <Link href={`/my-jobs/${listing.id}/delete`}>
                                                        <XCircle />
                                                        Delete Job
                                                        </Link>
                                                    </DropdownMenuItem>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuSeparator>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </>
    );
}