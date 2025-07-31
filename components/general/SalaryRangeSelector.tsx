import { Control, useController } from "react-hook-form";
import { Slider } from "../ui/slider";
import { useState } from "react";

interface iAppProps {
    control: Control<any>;
    minSalary: number;
    maxSalary: number;
    step: number;
    currency: string;
}

export function SalaryRangeSelector({control, currency, maxSalary, minSalary, step,
}: iAppProps) {
        const {field: fromField} = useController({
        name: 'salaryForm'
        control, 
    });

    const {field: toFiled} = useController({
        name: "salaryTo",
        control,
    });

    const [range, setRange] = useState<[number, number]>([
        fromField.value || minSalary,
        toFiled.value || maxSalary/2,
    ]);

    return (
    <div className="w-full space-y-4">
        <Slider min={minSalary} max={maxSalary} step={step} value={range} />
    </div>
    );
}