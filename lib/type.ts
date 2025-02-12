import type { LucideProps } from "lucide-react";

export type ShapeMetadata = {
    name: string;
    label: string;
    icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    color?: string;
};

export type QuestionMetadata = {
    name: string;
    question: string;
    answer: string;
};
