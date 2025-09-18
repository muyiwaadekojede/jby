"use client";

import React from 'react';
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countryList } from "../utils/contries";
import { SalaryRangeSelector } from "@/components/general/SalaryRangeSelector";
import JobDescriptionEditor from "@/components/richTextEditor/JobDescriptionEditor";
import { BenefitsSelector } from "@/components/BenefitsSelector";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { UploadDropzone } from "@uploadthing/react";
import { JobListingDuration } from "@/components/general/JobListingDurationSelector";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema } from "../utils/zodSchemas";
import { useState } from "react";
import { createJob, editJobPost } from "../actions";


interface iAppProps {
    jobPost: {
    id: string; // Add this line
    jobTitle: string;
    employmentType: string;
    location: string;
    salaryTo: number;
    jobDescription: string;
    listingDuration: number;
    benefits: string[];
    salaryForm: number;
    Company: {
        location: string;
        name: string;
        about: string;
        logo: string;
        website: string;
        xAccount: string | null;
    };
}
}


export function EditJobForm({jobPost}: iAppProps) {


        type JobFormData = z.infer<typeof jobSchema>;
            const form = useForm<JobFormData>({
            resolver: zodResolver(jobSchema),
            defaultValues: {
                benefits: [],
                companyAbout: jobPost.Company.about,
                companyLocation: jobPost.Company.location,
                companyName: jobPost.Company.name,
                companyLogo: jobPost.Company.logo,
                companyWebsite: jobPost.Company.website,
                companyXaccount: jobPost.Company.xAccount || "",
                employmentType: jobPost.employmentType,
                jobDescription: jobPost.jobDescription,
                jobTitle: jobPost.jobTitle,
                listingDuration: jobPost.listingDuration,
                location: jobPost.location,
                salaryForm: jobPost.salaryForm,
                salaryTo: jobPost.salaryTo,
            },
        });

                    const [pending, setPending] = useState(false) 

                    async function onSubmit(values: JobFormData) {

                        console.log("onSubmit called with values:", values);
                    try{
                        console.log("Form errors:", form.formState.errors);
                        console.log("Form values:", form.getValues());
                        setPending(true)
                        await editJobPost(values, jobPost.id); 
                        } catch (error) {
                            console.log("Form is valid:", form.formState.isValid);
                            if (!form.formState.isValid) {
                            console.log("Form validation failed:", form.formState.errors);
                            return;
                        }
                        
                        } finally {
                        setPending(false);
                        }
                    }

    return (
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="col-span-1 lg:col-span-2 flex flex-col gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Job Information
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="jobTitle"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Job Title
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Job Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="employmentType"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Employment Type
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select the job type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Employment Type
                                                    </SelectLabel>
                                                    <SelectItem value="full-time">
                                                        Full Time
                                                    </SelectItem>
                                                    <SelectItem value="part-time">
                                                        Part Time
                                                    </SelectItem>
                                                    <SelectItem value="contract">
                                                        Contract
                                                    </SelectItem>
                                                    <SelectItem value="internship">
                                                        Internship
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="location"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Job Location
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select location" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Worldwide
                                                    </SelectLabel>
                                                    <SelectItem value="worldwide">
                                                        <span>🌍</span>
                                                        <span className="pl-2">Worldwide/Remote</span>
                                                    </SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Location
                                                    </SelectLabel>
                                                    {countryList.map((country) => (
                                                        <SelectItem key={country.code} value={country.name}>
                                                            <span>{country.flagEmoji}</span>
                                                            <span className="pl-2">{country.name}</span>
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormItem>
                                <FormLabel>
                                    Salary Range
                                </FormLabel>
                                <FormControl>
                                    <SalaryRangeSelector 
                                        control={form.control} 
                                        minSalary={10000} 
                                        maxSalary={1000000} 
                                        currency="USD" 
                                        step={2000} 
                                    />
                                </FormControl>
                            </FormItem>
                        </div>

                        <FormField 
                            control={form.control}
                            name="jobDescription"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel> 
                                        Job Description
                                    </FormLabel>
                                    <FormControl>
                                        <JobDescriptionEditor field={field as any}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control={form.control}
                            name="benefits"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Benefits
                                    </FormLabel>
                                    <FormControl>
                                        <BenefitsSelector field={field as any} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Company Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField 
                                control={form.control}
                                name="companyName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Company name
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Company Name..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="companyLocation"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Company Location
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select location" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Worldwide
                                                    </SelectLabel>
                                                    <SelectItem value="worldwide">
                                                        <span>🌍</span>
                                                        <span className="pl-2">Worldwide/Remote</span>
                                                    </SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Location
                                                    </SelectLabel>
                                                    {countryList.map((country) => (
                                                        <SelectItem key={country.code} value={country.name}>
                                                            <span>{country.flagEmoji}</span>
                                                            <span className="pl-2">{country.name}</span>
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField 
                                control={form.control}
                                name="companyWebsite"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Company Website
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Company Website..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField 
                                control={form.control}
                                name="companyXaccount"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Company X Account
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Company X Account" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField 
                            control={form.control}
                            name="companyAbout"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Company Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            placeholder="Say something about your company" 
                                            {...field} 
                                            className="min-h-[120px]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="companyLogo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                       Company Logo
                                    </FormLabel>
                                    <FormControl>
                                        <div>
                                            {field.value ? (
                                                <div className="relative inline-block">
                                                    <Image 
                                                        src={field.value} 
                                                        alt="Company Logo" 
                                                        width={100} 
                                                        height={100} 
                                                        className="rounded-lg"
                                                    />
                                                    <Button 
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                                        onClick={() => field.onChange("")}
                                                    >
                                                        <XIcon className="size-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <UploadDropzone
                                                    endpoint="imageUploader" 
                                                    onClientUploadComplete={(res: { url: any; }[]) => {
                                                        field.onChange(res[0].url);
                                                    }}
                                                    onUploadError={() => {
                                                        console.log("something went wrong");
                                                    }}
                                                    className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary"
                                                />
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>


                <Button type="submit" className="w-full" disabled={pending}>
                    {pending ? 'Submitting...' : 'Edit Job Post'}
                </Button>
            </form>
        </Form>
    )
}