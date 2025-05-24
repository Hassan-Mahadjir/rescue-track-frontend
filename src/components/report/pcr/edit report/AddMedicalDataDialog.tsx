"use client";

import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddMedicalDataDialogProps {
  pcrId: number;
  type: string;
}

export default function AddMedicalDataDialog({
  pcrId,
  type,
}: AddMedicalDataDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const getFieldConfig = () => {
    switch (type) {
      case "trauma":
        return [
          { name: "name", label: "Trauma Name", type: "text", required: true },
        ];
      case "injury-mechanism":
        return [
          {
            name: "mechanism",
            label: "Mechanism",
            type: "text",
            required: true,
          },
          {
            name: "height",
            label: "Height (optional)",
            type: "number",
            required: false,
          },
        ];
      case "pupil":
        return [
          {
            name: "PHSY",
            label: "PHSY Assessment",
            type: "text",
            required: true,
          },
        ];
      case "skin":
        return [
          {
            name: "skin_status",
            label: "Skin Status",
            type: "select",
            required: true,
            options: [
              "Normal",
              "Clear",
              "Pale",
              "Flushed",
              "Cyanotic",
              "Jaundiced",
            ],
          },
        ];
      case "respiratory":
        return [
          {
            name: "RESP",
            label: "Respiratory Observation",
            type: "text",
            required: true,
          },
        ];
      case "therapy":
        return [
          { name: "therapy", label: "Therapy", type: "text", required: true },
        ];
      case "circumstance":
        return [
          {
            name: "circumstance",
            label: "Circumstance",
            type: "text",
            required: true,
          },
        ];
      default:
        return [];
    }
  };

  const fields = getFieldConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace with your actual API call
      console.log(`Adding ${type}:`, formData);

      // Example API call:
      // await addMedicalData(pcrId, type, formData);

      setOpen(false);
      setFormData({});
    } catch (error) {
      console.error(`Error adding ${type}:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-main font-semibold" size="sm">
          Add {type.charAt(0).toUpperCase() + type.slice(1)}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Add {type.charAt(0).toUpperCase() + type.slice(1)}
          </DialogTitle>
          <DialogDescription>
            Add a new {type} entry to the patient record.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              {field.type === "select" ? (
                <Select
                  value={formData[field.name] || ""}
                  onValueChange={(value) =>
                    setFormData({ ...formData, [field.name]: value })
                  }
                  required={field.required}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={`Select ${field.label.toLowerCase()}`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {/* {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))} */}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={field.name}
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [field.name]:
                        field.type === "number"
                          ? Number(e.target.value)
                          : e.target.value,
                    })
                  }
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  required={field.required}
                />
              )}
            </div>
          ))}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
