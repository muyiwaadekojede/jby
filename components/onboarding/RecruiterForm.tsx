import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recruiterSchema } from "@/app/utils/zodSchemas";
import {z} from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { countryList } from "@/app/utils/contries";
import { Textarea } from "../ui/textarea";
import { UploadDropzone } from "../general/UploadThingReexported";
import { CreateRecruiterCompany } from "@/app/actions";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from 'next/image'

export function RecruiterForm() {


    const form = useForm<z.infer<typeof recruiterSchema>>({
        resolver: zodResolver(recruiterSchema),
        defaultValues: {
            about: "",
            location: "",
            logo: "",
            name: "",
            website: "",
            xAccount: "",
        },
    });

    const [pending, setPending] = useState(false);

    async function onSubmit(data: z.infer<typeof recruiterSchema>) {
        try {
            setPending(true);
            await CreateRecruiterCompany(data)


        } catch (error) { 
            if(error instanceof Error && error.message !== 'NEXT_REDIRECT') {
                console.log("something went wrong")
            }

        } finally {
            setPending(false);
        }
    }

    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field } ) => (
                        <FormItem>
                            <FormLabel>
                               Recruiting Company Name
                            </FormLabel>
                            <FormControl>
                                <input placeholder="Enter Recruiting Company Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />


                    <FormField
                    control={form.control}
                    name="location"
                    render={({ field } ) => (
                        <FormItem>
                            <FormLabel>
                               Recruiting Company Location
                            </FormLabel>
                            <Select 
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Location" />
                                </SelectTrigger>

                            </FormControl>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>
                                        Worldwide
                                    </SelectLabel>
                                    <SelectItem value={"worldwide"}>
                                        <span>
                                            🌍
                                        </span>
                                        <span>
                                            Worldwide/Remote
                                        </span>
                                    </SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>
                                        Location
                                    </SelectLabel>
                                    {countryList.map((country) =>(
                                        <SelectItem key={country.code} value={country.name}>
                                            <span>
                                                {country.flagEmoji}
                                            </span>
                                            <span className="pl-2">
                                                {country.name}
                                            </span>
                                        </SelectItem>
                                    ))}
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
                    name="website"
                    render={({ field } ) => (
                        <FormItem>
                            <FormLabel>
                               Recruiting Company Website
                            </FormLabel>
                            <FormControl>
                                <input placeholder="https://yourrecruitingcompanywebsite" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="xAccount"
                    render={({ field } ) => (
                        <FormItem>
                            <FormLabel>
                               X account for your Recruiting Company
                            </FormLabel>
                            <FormControl>
                                <input placeholder="@recruitingcompany" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />        
            </div>
                    <FormField
                    control={form.control}
                    name="about"
                    render={({ field } ) => (
                        <FormItem>
                            <FormLabel>
                               About
                            </FormLabel>
                            <FormControl>
                                <Textarea placeholder="Give a description about the company you are recruiting for" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="logo"
                    render={({ field } ) => (
                        <FormItem>
                            <FormLabel>
                               Recruiting Company Logo
                            </FormLabel>
                            <FormControl>
                                <div>
                                    {field.value ? (
                                        <div className="relative w-fit">
                                            <Image src={field.value} 
                                            alt="Company Logo" 
                                            width={100} 
                                            height={100} 
                                            className="rounded-lg"
                                            />
                                        </div>
                                    ) : (
                                <UploadDropzone endpoint="imageUploader" 
                                onClientUploadComplete={(res) => {
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

                    <Button type="submit" className="w-full" disabled={pending}>
                        {pending ? "Submiting..." : "Continue"}
                    </Button>
            </form>
        </Form>
    );
}