"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useStaff } from "@/services/api/staff";

const DoctorList = () => {
  const { StaffData } = useStaff();
  if (!StaffData) return null;

  return (
    <div className="border rounded-xl px-2 pt-2 pb-4 flex flex-col">
      <p className="text-xs mb-2 whitespace-nowrap xmd:text-lg">Staff List</p>
      {StaffData.map((doctor) => (
        <div key={doctor.id}>
          <div className="flex items-center justify-between mx-1">
            <div className="flex items-center gap-3">
              {/* Profile image */}
              <Image
                src={
                  doctor.profile.avatar ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="profile"
                className="w-12 h-12 rounded-full object-cover border border-gray-300 shadow-md hidden xmd:block"
                width={50}
                height={50}
              />
              {/* Name and Specialization */}
              <div className="text-xs xmd:text-sm">
                <p className="font-medium">
                  {doctor.profile.firstName} {doctor.profile.lastName}
                </p>
                <p className="hidden xmd:block">{doctor.role}</p>
              </div>
            </div>
            {/* Status */}
            <p className="text-xs xmd:text-sm hidden sm:block">
              {doctor.isVerified ? "Available" : "Absent"}
            </p>
          </div>
          <hr className="border-dashed border-gray-400 my-3 " />
        </div>
      ))}

      <div className="mt-auto pt-2">
        <Button className="w-full">See all</Button>
      </div>
    </div>
  );
};

export default DoctorList;
