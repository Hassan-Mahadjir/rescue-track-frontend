"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RunReportItem } from "@/types/report.type";
import { useRunReports } from "@/services/api/reports";

export default function PcrReportStep1() {
  const { runReportsData, isPending } = useRunReports();
  const data = runReportsData;
  const { setValue, watch, control } = useFormContext();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<RunReportItem[]>([]);

  const selectedRunReportId = watch("runReportId");

  useEffect(() => {
    if (!data) return;
    setResults(data);
  }, [data]);

  useEffect(() => {
    if (!data) return;

    const filtered = data.filter((report) => {
      const searchLower = search.toLowerCase();
      const patientName =
        `${report.patient.firstName} ${report.patient.lastName}`.toLowerCase();
      const nationalId = report.patient.nationalID?.toLowerCase() || "";
      const reportId = report.id.toString();

      return (
        patientName.includes(searchLower) ||
        nationalId.includes(searchLower) ||
        reportId.includes(searchLower)
      );
    });
    setResults(filtered);
  }, [search, data]);

  if (isPending) {
    return <div>Loading run reports...</div>;
  }

  if (!data) {
    return <div>No run report data available</div>;
  }

  return (
    <div className="space-y-4">
      <div className="w-full max-w-3xl mx-auto px-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by patient name, national ID, or report ID"
          className="pl-3 pr-3 py-2 h-10 w-full"
        />
      </div>

      <div className="space-y-2">
        <FormField
          control={control}
          name="runReportId"
          render={() => (
            <FormItem>
              <FormControl>
                <ScrollArea className="h-[300px] md:h-[400px] lg:h-[500px] rounded-md border">
                  <div className="p-4 space-y-4">
                    {results.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        No run reports found
                      </div>
                    ) : (
                      results.map((report) => (
                        <div
                          key={report.id}
                          className={clsx(
                            "cursor-pointer border rounded-lg transition-colors hover:shadow-md",
                            selectedRunReportId === report.id
                              ? "border-gray-900"
                              : "hover:border-gray-400"
                          )}
                          onClick={() =>
                            setValue("runReportId", report.id, {
                              shouldValidate: true,
                            })
                          }
                        >
                          <div className="p-3">
                            <h3 className="font-semibold text-base">
                              #{report.id} – {report.patient.firstName}{" "}
                              {report.patient.lastName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {report.category} | {report.priority}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Caller: {report.caller}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
