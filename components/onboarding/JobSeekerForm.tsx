import { jobSeekerSchema } from "@/app/utils/zodSchemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {z} from 'zod'
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import { UploadDropzone } from "../general/UploadThingReexported";
import { useState } from "react";
import { createJobSeeker } from "@/app/actions";
import { toast } from "sonner";
import PdfImage from "@/public/pdf.png"

export function JobSeekerForm() {
    const form = useForm<z.infer<typeof jobSeekerSchema>>({
        resolver: zodResolver(jobSeekerSchema),
        defaultValues: {
            about: "",
            name: "",
            resume: "",
        },
    });

const [pending, setPending] = useState(false);
  async function onSubmit(values: z.infer<typeof jobSeekerSchema>) {
    try {
      setPending(true);
      await createJobSeeker(values);
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setPending(false);
    }
  }


    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field } ) => (
                        <FormItem>
                            <FormLabel>
                               Full Name
                            </FormLabel>
                            <FormControl>
                                <input placeholder="Enter your name in full" {...field} />
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
                               Short Bio
                            </FormLabel>
                            <FormControl>
                                <Textarea placeholder="Tell us about yourself..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="resume"
                    render={({ field } ) => (
                        <FormItem>
                            <FormLabel>
                               Your Resume (PDF)
                            </FormLabel>
                            <FormControl>
                                <div>
                                    {field.value ? (
                                        <div className="relative inline-block">
                                            <Image src={PdfImage} 
                                            alt="PdfImage" 
                                            width={100} 
                                            height={100} 
                                            className="rounded-lg"
                                            />
                                            <Button 
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0">
                                                <XIcon className="size-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                <UploadDropzone endpoint="resumeUploader" 
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
                        {pending ? "Submitting..." : "Continue"}
                    </Button>
            </form>
        </Form>
    );
}