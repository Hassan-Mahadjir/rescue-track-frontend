import { PCRFormContextProider } from "@/components/PCRFormContextProvider";
import PatientPersonalInfo from "@/components/report/PatientPersonalInfo";
import CrewTab from "@/components/report/pcr/CrewTab";
import IncidentTab from "@/components/report/pcr/IncidentTab";
import MedicationTab from "@/components/report/pcr/MedicationTab";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Trash2 } from "lucide-react";
import React from "react";

const Registered = () => {
  const patientData = [
    {
      id: 1,
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
    },
    {
      id: 2,
      fullName: "Mahamat Hassan",
      age: 25,
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
    },
  ];

  return (
    <div className="mx-5 my-2">
      <div className="space-y-4">
        <div className="w-full max-w-3xl mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row items-start md:items-center w-full space-y-3 md:space-y-0 md:space-x-4  shadow-sm p-3">
            <div className="flex w-full space-x-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Search by patient ID"
                  className="pl-3 pr-3 py-2 h-10 w-full"
                />
              </div>
              <Button className="shrink-0 h-10">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
        <Tabs defaultValue="patient_Info" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 border-b rounded-none bg-transparent p-0">
            <TabsTrigger
              value="patient_Info"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none font-medium hover:text-gray-950"
            >
              Patient Information
            </TabsTrigger>
            <TabsTrigger
              value="medication_info"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none font-medium hover:text-gray-950"
            >
              Medication information
            </TabsTrigger>
            <TabsTrigger
              value="crew_Info"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none font-medium hover:text-gray-950"
            >
              Crew Information
            </TabsTrigger>
            <TabsTrigger
              value="medical_history"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none font-medium hover:text-gray-950"
            >
              Medical History
            </TabsTrigger>
          </TabsList>
          <TabsContent value="patient_Info">
            {/*Patient personal information */}
            {patientData.map((pateint) => (
              <div className="mb-4" key={pateint.id}>
                <PatientPersonalInfo patient={pateint} />{" "}
              </div>
            ))}
          </TabsContent>
          <TabsContent value="medication_info">
            <div className="space-y-4">
              <h2 className="text-lg font-medium mb-3">
                Treatment provided during transport
              </h2>
              <Card>
                <div className="space-y-2">
                  <div>
                    <div>
                      <div>
                        #
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select medication" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Paracetamol 500mg">
                              Paracetamol 500mg
                            </SelectItem>
                            <SelectItem value="Ibuprofen 400mg">
                              Ibuprofen 400mg
                            </SelectItem>
                            <SelectItem value="Morphine 10mg">
                              Morphine 10mg
                            </SelectItem>
                            <SelectItem value="Aspirin 300mg">
                              Aspirin 300mg
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <div>
                        #
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Dosage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="500 mg">500 mg</SelectItem>
                            <SelectItem value="1000 mg">1000 mg</SelectItem>
                            <SelectItem value="250 mg">250 mg</SelectItem>
                            <SelectItem value="100 mg">100 mg</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove medication</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="crew_Info">
            <div className="space-y-4">Crew Information</div>
          </TabsContent>
          <TabsContent value="medical_history">
            <div className="space-y-4">Medical History</div>
          </TabsContent>
        </Tabs>
        <div className="flex items-center justify-center space-x-4">
          <Button variant="outline" size="lg" disabled={true}>
            prev
          </Button>
          <Button size="lg" className="bg-main">
            next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Registered;
