import z from "zod";

export const recruiterSchema = z.object ({
    name: z.string().min(2, "Company name must be at least 2 characters"),
    location: z.string().min(1, "Location must be real and given"),
    about: z.string().min(10, "Share a description of the company you represent or work at"),

    logo: z.string().min(2, "Upload the logo of the company you represent"),
    website: z.string().url("Enter a real or operational url"),
    xAccount: z.string().optional(),
});
