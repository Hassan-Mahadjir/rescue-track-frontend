import PatientPersonalInfo from "@/components/report/PatientPersonalInfo";
import React from "react";

const PatientDetails = async ({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) => {
  const patientId = (await params).patientId;

  const patientData = {
    fullName: "Mahamat Hassan Mahadjir Hassan",
    age: 24,
    phone: "+90 533 867 28 35",
    email: "hm.mahadjir@gmail.com",
    profileImage: "/report/sample.jpg",
    identifyNumber: "20910394",
    dateOfBirth: "17-05-2000",
    nationality: "Chad",
    address: "Northern Cyprus",
    sex: "Male",
    height: 189,
    weight: 74,
    bloodType: "- O",
  };

  return (
    <div className="mx-5 my-2">
      {/*Patient personal information */}
      <div>
        <PatientPersonalInfo patient={patientData} />
      </div>

      {/* Incident details */}
      <div></div>
    </div>
  );
};

export default PatientDetails;
