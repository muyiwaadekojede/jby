import Image from "next/image";
import Logo from "@/public/logo.png";
import { Card, CardContent } from "../ui/card";



export function OnboardingForm () {
    return (
        <>
        <div className="flex items-center gap-4 mb-10">
            <Image src={Logo} alt="Jobland Logo" width={50} height={50} />
            <h1>
                Job<span className="text-primary">Marshal</span>
            </h1>
        </div>
        <Card>
            <CardContent className="max-w-lg w-full"></CardContent>
        </Card>
        </>
    );
}