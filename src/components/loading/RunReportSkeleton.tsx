import { Skeleton } from "@/components/ui/skeleton";
import { PatientInfoSkeleton } from "./PatientInfoSkeleton";

const RunReportSkeleton = () => {
  return (
    <div className="mt-6 space-y-8 px-4">
      {/* Tab or section header */}
      <div className="flex space-x-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex flex-col space-y-4 justify-center items-center">
        <Skeleton className="h-10 w-1/2" /> {/* Form input */}
        <div className="space-y-2 w-full">
          {[...Array(3)].map((_, index) => (
            <PatientInfoSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RunReportSkeleton;
