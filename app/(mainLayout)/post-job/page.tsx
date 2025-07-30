import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import  ArcjetLogo from "@/public/arcjet.jpg";
import InngestLogo from "@/public/arcjet.jpg";
import Image from "next/image";



const companies = [
    {id: 0, name: "Arcject", logo: ArcjetLogo},
    {id: 1, name: "Inngest", logo: InngestLogo},
    {id: 2, name: "Arcject", logo: ArcjetLogo},
    {id: 3, name: "Inngest", logo: InngestLogo},
    {id: 4, name: "Arcject", logo: ArcjetLogo},
    {id: 5, name: "Inngest", logo: InngestLogo},
];



export default function PostJobPage() {
    return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
        <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
                <CardTitle>
                    This is the form
                </CardTitle>
            </CardHeader>
        </Card>

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
                <CardContent>
                    {/* Company Logos */}
                </CardContent>

                <div className="grid grid-cols-3 gap-4">
                    {companies.map((company) => (
                        <div key={company.id}>
                            <Image src={company.logo} alt={company.name} width={80} height={80} className="rounded-lg" />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    </div>
    );
}