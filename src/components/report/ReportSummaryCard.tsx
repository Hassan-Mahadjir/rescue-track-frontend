import React from "react";
import { LucideIcon } from "lucide-react";

interface ReportSummaryCardProps {
  icon: LucideIcon;
  number: number | string;
  title: string;
  link?: string;
  className?: string;
}

const ReportSummaryCard: React.FC<ReportSummaryCardProps> = ({
  icon: Icon,
  number,
  title,
  className = "",
}) => {
  return (
    <div className={`p-3 rounded-lg  ${className}`}>
      <div className="flex justify-between items-center">
        <Icon className="w-6 h-6" />
        <p className="text-xl font-semibold">{number}</p>
      </div>
      <h1 className="mt-2 text-sm font-medium">{title}</h1>
    </div>
  );
};

export default ReportSummaryCard;
