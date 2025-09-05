import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { size } from "zod";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "../ui/select";
import { countryList } from "@/app/utils/contries";

const jobTypes = ["full-time", "part-time", "contract", "internship"]

export function JobFilter() {
    return (
        <Card className="col-span-1 h-fit">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-2xl font-semibold">
                    Filter
                </CardTitle>

                <Button variant="destructive" size="sm" className="h-8">
                    <span>Clear All</span>
                    <XIcon className="size-4" />
                </Button>
            </CardHeader>

            <SelectSeparator className="mb-4"/>


            <CardContent className="space--y-6">
                <div className="space-y-4">
                    <Label className="text-lg font-semibold">
                        Job Type
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                        {jobTypes.map((job) => (
                            <div key={job} className="flex items-center space-x-2 font-medium">
                                <Checkbox id={job} />
                                <Label  htmlFor={job}>
                                    {job}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <SelectSeparator />

                <div className="space-y-4">
                    <Label className="text-lg font-semibold">
                        Location
                    </Label>

                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Location"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>
                                                Worldwide
                                            </SelectLabel>
                                            <SelectItem value="worldwide">
                                                <span>
                                                    🌍
                                                </span>
                                                <span className="pl-2">
                                                    Worldwide/Remote
                                                </span>
                                            </SelectItem>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Location
                                                </SelectLabel>
                                                {countryList.map((country) =>(
                                                    <SelectItem key={country.code} value={country.name}>
                                                        <span>
                                                            {country.flagEmoji}
                                                        </span>
                                                        <span className="pl-2">
                                                            {country.name}
                                                        </span>
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectGroup>
                                    </SelectContent>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}