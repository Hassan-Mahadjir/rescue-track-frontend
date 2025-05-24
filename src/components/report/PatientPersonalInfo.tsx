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
import { Patient } from "@/types/patients.type";
import { formatDate } from "@/utils/extra";

interface PatientPersonalInfoProps {
  patient: Patient | null;
}

const PatientPersonalInfo: React.FC<PatientPersonalInfoProps> = ({
  patient,
}) => {
  // 1) Guard against null
  if (!patient) {
    return (
      <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded-md">
        No patient information available.
      </div>
    );
  }

  // 2) Safe to use `patient` now
  const patientProfile = patient;

  // Helper to calculate age
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

  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-4 flex flex-col md:flex-row justify-center md:items-start gap-6">
      {/* Patient Info Section */}
      <div className="flex flex-col md:items-start gap-4 md:pr-4 w-full md:w-auto">
        <h2 className="text-lg font-bold text-gray-800">PATIENT INFORMATION</h2>
        <div className="flex flex-row">
          <Image
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            width={80}
            height={100}
            alt="Profile"
            className="w-20 h-24 rounded-md object-cover"
          />
          <div className="flex flex-col ml-4">
            <h2 className="text-lg text-gray-800">
              {patientProfile.firstName || "Unknown"}{" "}
              {patientProfile.lastName || "Unknown"}
            </h2>
            <p className="text-gray-600 text-sm">
              <strong>Age:</strong>{" "}
              {patientProfile.dateofBirth
                ? calculateAge(patientProfile.dateofBirth)
                : "Unknown"}
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Phone:</strong> {patientProfile.phone || "Unknown"}
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Email:</strong> {patientProfile.email || "Unknown"}
            </p>
          </div>
        </div>
      </div>

      {/* Patient Details Section */}
      <div className="grid grid-cols-4 grid-rows-3 gap-4 px-4 text-gray-700 w-full xmd:flex-1 md:border-l">
        {[
          { label: "Identify Number", value: String(patientProfile.id) },
          {
            label: "Date of Birth",
            value: patientProfile.dateofBirth
              ? formatDate(patientProfile.dateofBirth)
              : "Unknown",
          },
          {
            label: "Nationality",
            value: patientProfile.nationality || "Unknown",
          },
          { label: "Address", value: "Unknown" },
          {
            label: "Sex",
            value: patientProfile.gender || "Unknown",
          },
          {
            label: "Height",
            value: patientProfile.height
              ? `${patientProfile.height} cm`
              : "Unknown",
          },
          {
            label: "Weight",
            value: patientProfile.weight
              ? `${patientProfile.weight} kg`
              : "Unknown",
          },
          { label: "Blood Type", value: "Unknown" },
        ].map((item, index) => (
          <div key={index} className={index >= 4 ? "row-start-2" : ""}>
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="font-semibold text-xs sm:text-base">{item.value}</p>
          </div>
        ))}

        {/* Update Button */}
        <div className="col-start-2 xmd:col-start-4 row-start-3">
          <Dialog modal={false}>
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
              <PersonalInfoDialog id={patientProfile.id} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default PatientPersonalInfo;
