import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import Image from "next/image";

const DoctorList = () => {
  const doctorData = [
    {
      id: 1,
      profile:
        "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Hassan Mahadjir",
      specialization: "Heart Specialist",
      status: "Available",
    },
    {
      id: 2,
      profile:
        "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Nour Barakat",
      specialization: "Clinical Genetics",
      status: "Available",
    },
    {
      id: 3,
      profile:
        "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Irem Meydanli",
      specialization: "Neurology",
      status: "Absent",
    },
    {
      id: 4,
      profile:
        "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Irem Meydanli",
      specialization: "Neurology",
      status: "Absent",
    },
  ];

  return (
    <div className="border rounded-xl px-2 pt-2 pb-4">
      <p className="text-xs mb-2 whitespace-nowrap xmd:text-lg">Doctor List</p>
      <ScrollArea className="h-3/4">
        {doctorData.map((doctor) => (
          <div key={doctor.id}>
            <div className="flex items-center justify-between mx-1">
              <div className="flex items-center gap-3">
                {/* Profile image */}
                <Image
                  src={doctor.profile}
                  alt="profile"
                  className="w-12 h-12 rounded-full object-cover border border-gray-300 shadow-md hidden xmd:block"
                  width={50}
                  height={50}
                />
                {/* Name and Specialization */}
                <div className="text-xs xmd:text-sm">
                  <p className="font-medium">{doctor.name}</p>
                  <p className="hidden xmd:block">{doctor.specialization}</p>
                </div>
              </div>
              {/* Status */}
              <p className="text-xs xmd:text-sm hidden sm:block">
                {doctor.status}
              </p>
            </div>
            <hr className="border-dashed border-gray-400 my-3 " />
          </div>
        ))}
      </ScrollArea>

      <Button className="w-full">See all</Button>
    </div>
  );
};

export default DoctorList;
