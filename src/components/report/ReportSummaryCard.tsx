import React from "react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

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
  link = "#",
  className = "",
}) => {
  return (
    <Link href={link}>
      <div
        className={`p-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-muted hover:shadow-lg ${className}`}
      >
        <div className="flex justify-between items-center">
          <Icon className="w-6 h-6" />
          <p className="text-xl font-semibold">{number}</p>
        </div>
        <h1 className="mt-2 text-sm font-medium transition-all duration-300 hover:underline">
          {title}
        </h1>
      </div>
    </Link>
  );
};

export default ReportSummaryCard;
