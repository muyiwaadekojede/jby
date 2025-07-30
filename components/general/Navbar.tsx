import Link from "next/link";
import Logo from "@/public/logo.png";
import Image from "next/image";
import {Button, buttonVariants} from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { signOut, auth } from "@/app/utils/auth";
import { UserDropdown } from "./UserDropDown";


export async function Navbar () {

    const session = await auth ();



    return (
        <nav className="flex items-center justify-between py-8 px-4 max-w-7xl mx-auto">
            <Link href="/" className="flex items-center gap-2"> 
            <Image src={Logo} alt="Logo for Jobbay" width={40} height={40}/>
             <h1 className="text-2xl font-bold">
                Job<span className="text-primary">Land</span>
             </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-5">
                <ThemeToggle />
                <Link className={buttonVariants({ size: "lg" })} href="/post-jobs">
                Post a Job
                </Link>
                {session?.user ? (
                    <UserDropdown 
                    email={session.user.email as string} 
                    image={session.user.image  as string} 
                    name={session.user.name  as string}  
                    />
                ) : (
                    <Link href="/login" className={buttonVariants({variant: "outline"})}>
                    Login
                    </Link>
                )}
            </div>
        </nav>
    );
};