import { useForm } from "react-hook-form";
import {} from "@hookform/resolvers/zod"

export function RecruiterForm() {


    const form = useForm({
        resolver: zodResolver ()

    })


    return (
        <div>
            <h1>
                hello
            </h1>
        </div>
    );
}