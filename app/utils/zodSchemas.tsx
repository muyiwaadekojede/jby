// import z from "zod";

// export const recruiterSchema = z.object ({
//     name: z.string().min(2, "Company name must be at least 2 characters"),
//     location: z.string().min(1, "Location must be real and given"),
//     about: z.string().min(10, "Share a description of the company you represent or work at"),

//     logo: z.string().url("Please upload a valid company logo"),
//     website: z.string().url("Enter a real or operational url"),
//     xAccount: z.string().optional(),
// });

// export const jobSeekerSchema = z.
// object({
//   name: z.string().min(2, "Name must be atleast 2 characters"),
//   about: z.string().min(10, "Please provide more information about yourself"),
//   resume: z.string().min(2, "Please upload your resume"),
     
// })


// export const jobSchema = z.object({
//   jobTitle: z.string().min(2, "Job Title must be at least 2 characters long"),

//   employmentType: z.string().min 
//   (1, "Please select an employment type"),
//   location: z.string().min(1, "Please select location"),
//   salaryFrom: z.number().min(1, "Salary from is required"),
//   salaryTo: z.number().min(1, "Salary to is required"),
//   jobDescription: z.string().min(1, "Job description is required"),
//   listingDuration: z.number().min(1, "Listing duration is required"),
//   benefits: z.array(z.string()).min(1, "Please select at least one benefits"),
//   companyName: z.string().min(1, "Company name is required"),
//   companyLocation: z.string().min(1, "Company location is required"),
//   companyAbout: z.string().min(1, "Company description is required"),
//   companyLogo: z.string().min(1, "Logo is required"),
//   companyWebsite: z.string().min(1, "Company website is required"),
//   companyXaccount: z.string().optional(),

// });


import { z } from "zod";

export const recruiterSchema = z.object({
    name: z.string().min(2, "Company name must be at least 2 characters"),
    location: z.string().min(1, "Location must be real and given"),
    about: z.string().min(10, "Share a description of the company you represent or work at"),
    logo: z.string().url("Please upload a valid company logo"),
    website: z.string().url("Enter a real or operational url"),
    xAccount: z.string().optional(),
});

export const jobSeekerSchema = z.object({
    name: z.string().min(2, "Name must be atleast 2 characters"),
    about: z.string().min(10, "Please provide more information about yourself"),
    resume: z.string().min(2, "Please upload your resume"),
});

export const jobSchema = z.object({
    jobTitle: z.string().min(2, "Job Title must be at least 2 characters long"),
    employmentType: z.string().min(1, "Please select an employment type"),
    location: z.string().min(1, "Please select location"),
    salaryFrom: z.number().min(1, "Salary from is required"),
    salaryTo: z.number().min(1, "Salary to is required"),
    jobDescription: z.string().min(1, "Job description is required"),
    listingDuration: z.number().min(1, "Listing duration is required"),
    benefits: z.array(z.string()).min(1, "Please select at least one benefit"),
    companyName: z.string().min(1, "Company name is required"),
    companyLocation: z.string().min(1, "Company location is required"),
    companyAbout: z.string().min(1, "Company description is required"),
    companyLogo: z.string().min(1, "Logo is required"),
    companyWebsite: z.string().min(1, "Company website is required"),
    companyXaccount: z.string().optional(),
}).refine((data) => data.salaryTo >= data.salaryFrom, {
    message: "Maximum salary must be greater than or equal to minimum salary",
    path: ["salaryTo"],
});