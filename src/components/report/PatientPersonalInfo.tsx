"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import PersonalInfoDialog from "./PersonalInfoDialog";
import { PCR } from "@/types/patients.type";

interface PatientPersonalInfoProps {
  patient: PCR;
}

const PatientPersonalInfo: React.FC<PatientPersonalInfoProps> = ({
  patient,
}) => {
  const profile = patient.patient;

  // Helper function to calculate age accurately
  const calculateAge = (dateString: string): number => {
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Format date to readable format (e.g., "May 17, 1999")
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-4 flex flex-col md:flex-row justify-center md:items-start gap-6">
      {/* Patient Info Section */}
      <div className="flex flex-col md:items-start gap-4 md:pr-4 w-full md:w-auto">
        <h2 className="text-lg font-bold text-gray-800">PATIENT INFORMATION</h2>
        <div className="flex flex-row">
          <Image
            src={patient.initiatedBy.profile.avatar || "/report/sample.jpg"}
            width={80}
            height={80}
            alt="profile Picture"
            className="w-20 h-20 rounded-md object-cover"
          />
          <div className="flex flex-col ml-4">
            <h2 className="text-lg text-gray-800">
              {profile.firstName} {patient.patient.lastName}
            </h2>
            <p className="text-gray-600 text-sm">
              <strong>Age:</strong> {calculateAge(profile.dateofBirth)}
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Phone:</strong> {profile.phone}
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Email:</strong> {profile.email}
            </p>
          </div>
        </div>
      </div>

      {/* Patient Details Section */}
      <div className="grid grid-cols-4 grid-rows-3 gap-4 px-4 text-gray-700 w-full xmd:flex-1 md:border-l">
        {[
          { label: "Identify Number", value: profile.id },
          { label: "Date of Birth", value: formatDate(profile.dateofBirth) },
          { label: "Nationality", value: profile.nationality },
          { label: "Address", value: "addres not found in db" },
          { label: "Sex", value: profile.gender },
          { label: "Height", value: `${profile.height} CM` },
          { label: "Weight", value: `${profile.weight} KG` },
          { label: "Blood Type", value: "not found under patient" },
        ].map((item, index) => (
          <div key={index} className={index >= 4 ? "row-start-2" : ""}>
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="font-semibold text-xs sm:text-base">{item.value}</p>
          </div>
        ))}

        {/* Update Button */}
        <div className="col-start-2 xmd:col-start-4 row-start-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-main font-semibold">Update Info</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Modify Patient Information</DialogTitle>
                <DialogDescription>
                  Update and manage patient details, ensure that all records are
                  accurate and up-to-date.
                </DialogDescription>
              </DialogHeader>
              <PersonalInfoDialog id={profile.id ? Number(profile.id) : 0} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default PatientPersonalInfo;
