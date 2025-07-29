import z from "zod";

export const recruiterSchema = z.object ({
    name: z.string().min(2, "Company name must be at least 2 characters"),
    location: z.string().min(1, "Location must be real and given"),
    about: z.string().min(10, "Share a description of the company you represent or work at"),

    logo: z.string().url("Please upload a valid company logo"),
    website: z.string().url("Enter a real or operational url"),
    xAccount: z.string().optional(),
});

export const jobSeekerSchema = z.
object({
  name: z.string().min(2, "Name must be atleast 2 characters"),
  about: z.string().min(10, "Please provide more information about yourself"),
  resume: z.string().min(2, "Please upload your resume"),
     
})
