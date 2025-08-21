import { Ban, Link, PlusCircle } from "lucide-react";

export function EmptyState() {
    return (
        <div className="flex flex-col flex-1 h-full items-center justify-center rounded-md border border-dashed p-8">
            <div className="flex size-20 items-center justify-center rounded-full bg-primary-10">
                <Ban className="size-10 text-primary" />
            </div>

            <h2 className="mt-6 text-xl font-semibold">
                No Job Posts
            </h2>

            <p className="mb-8 mt-2 text-center text-sm leading-tight text-muted-foreground max-w-sm text-balance">Fliter not set correctly</p>

            <Link href="/" className={buttonVariant()}>
            <PlusCircle /> Go to hompage{""}
            </Link>
        </div>
    )
}