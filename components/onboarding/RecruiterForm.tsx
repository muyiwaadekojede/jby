import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recruiterSchema } from "@/app/utils/zodSchemas";
import {z} from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "@/components/ui/Input";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { countryList } from "@/app/utils/contries";
import { Textarea } from "../ui/textarea";

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


    return (
        <Form {...form}>
            <form className="space-y-6">
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


            </form>
        </Form>
    );
}