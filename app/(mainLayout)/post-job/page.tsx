import { CreateJobForm } from "@/components/forms/CreateJobForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import  ArcjetLogo from "@/public/arcjet.jpg";
import InngestLogo from "@/public/inngest-locale.png";
import Image from "next/image";



const companies = [
    {id: 0, name: "Arcject", logo: ArcjetLogo},
    {id: 1, name: "Inngest", logo: InngestLogo},
    {id: 2, name: "Arcject", logo: ArcjetLogo},
    {id: 3, name: "Inngest", logo: InngestLogo},
    {id: 4, name: "Arcject", logo: ArcjetLogo},
    {id: 5, name: "Inngest", logo: InngestLogo},
];


const stats = [
    { id: 0, value: "10k", label: "Monthly active job seekers"},
    { id: 1, value: "48h", label: "Average tme to hire" },
    { id: 2, value: "90%", label: "Employer Satisfaction Rate" },
    { id: 4, value: "500+", label: "Company hiring remotely" },

];


const testimonials = [
    {
        quote: "We found our ideal candidate within 48 hours of posting. The quality of applicants was exceptional!",
        author: "Sarach Balogun",
        company: "TechBaddie Inc",
    },
        {
        quote: "Good work culture at their office!",
        author: "Jide Bade",
        company: "Alliance Insurance",
    },
        {
        quote: "The machine they developed for our factory performs super well",
        author: "Tacha Tosin",
        company: "Olu Pando Yam PLC",
    },

];

export default function PostJobPage() {
    return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
     <CreateJobForm />

        <div className="col-span-1">
            <Card className="text-xl">
                <CardHeader>
                    <CardTitle>
                        Trusted by Industry Leaders
                    </CardTitle>
                    <CardDescription>
                        Join thousands of companies hiring the best talent
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Company Logos */}
                    
                <div className="grid grid-cols-3 gap-4">
                    {companies.map((company) => (
                        <div key={company.id}>
                            <Image src={company.logo} alt={company.name} width={80} height={80} className="rounded-lg opacity-75 transition-opacity hover:opacity-100" />
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    {testimonials.map((testimonials, index) => (
                        <blockquote key={index} className="border-l-2 border-primary pl-4">
                            <p className="text-sm text-muted-foreground italic ">
                                {testimonials.quote}
                            </p>
                            <footer className="mt-2 text-sm font-medium">
                                - {testimonials.author}, {testimonials.company}
                            </footer>
                        </blockquote>
                    ))}
                </div>

                {/* We will render stats here */}
                <div className="grid grid-cols-2 gap-4">
                    {stats.map((stats) => (
                        <div key={stats.id} className="rounded-lg bg-muted p-4">
                            <h4 className="text-2xl font-bold">
                                {stats.value}
                                <p className="text-sm text-muted-foreground">
                                    {stats.label}
                                </p>
                            </h4>
                        </div>
                    ))}
                </div>
                </CardContent>
            </Card>
        </div>
    </div>
    );
}