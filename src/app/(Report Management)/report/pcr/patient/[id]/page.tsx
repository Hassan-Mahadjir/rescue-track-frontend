"use client";
import React from "react";
import { useParams } from "next/navigation";
import PersonalInfoDialog from "@/components/report/PersonalInfoDialog";

const EditPatientDetails = () => {
  const params = useParams();
  const patientID = params.id;
  return (
    <div className="mx-5 my-2 space-y-6">
      <PersonalInfoDialog id={patientID ? +patientID : 0} />
    </div>
  );
};

export default EditPatientDetails;
