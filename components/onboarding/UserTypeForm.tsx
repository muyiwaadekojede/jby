import { Building2, UserRound } from "lucide-react";
import { Button } from "../ui/button";

type UserSelectionType = "recruiter" | "jobSeeker";

interface UserTypeSelectionProps {
    onSelect: (type: UserSelectionType) => void;
}

export function UserTypeSelection({onSelect}: UserTypeSelectionProps) {
    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Welcome! Lets Get Started</h2>
                <p className="text-muted-foreground">Choose how to use our platform either as a jobseeker or recruiter looking to recruit talents</p>
            </div>
            
            
        <div  className="grid gap-4">
            <Button 
            onClick={() =>onSelect("recruiter")}
            variant="outline" 
            className="w-full h-auto p-6 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5" >
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="size-6 text-primary" />
                </div>

            <div className="text-left">
            <h3 className="font-semibold text-lg">Recruiter / Company</h3>
            <p>Post jobs and find exceptional talents</p>
            </div>
            </Button>


            <Button 
            onClick={() =>onSelect("jobSeeker")}
            variant="outline" 
            className="w-full h-auto p-6 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5" >
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                <UserRound className="size-6 text-primary" />
                </div>

            <div className="text-left">
            <h3 className="font-semibold text-lg">Jobseeker</h3>
            <p>Apply for jobs faster and better with the ai for free</p>
            </div>
            </Button>


        </div>
        
        </div>
    )
}