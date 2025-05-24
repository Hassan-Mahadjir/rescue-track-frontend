"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { VitalSign as VitalSignType } from "@/types/report.type"

interface EditVitalSignDialogProps {
  vitalSign: VitalSignType
  pcrId: number
}

interface TreatmentForm {
  name: string
  dosage: number
  giveAt: string
  route: string
  result: string
  unit: string
  category: string
}

export default function EditVitalSignDialog({ vitalSign, pcrId }: EditVitalSignDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // Vital Signs Form State
  const [vitalSignForm, setVitalSignForm] = useState({
    time: new Date(vitalSign.time).toISOString().slice(0, 16),
    T: vitalSign.T,
    BP: vitalSign.BP,
    pulse: vitalSign.pulse,
    resp: vitalSign.resp,
    spO2: vitalSign.spO2,
  })

  // Treatments Form State
  const [treatments, setTreatments] = useState<TreatmentForm[]>(
    vitalSign.treatments?.map((t) => ({
      name: t.name,
      dosage: t.dosage,
      giveAt: t.givenAt ? new Date(t.givenAt).toISOString().slice(0, 16) : "",
      route: t.route,
      result: t.result,
      unit: t.unit.abbreviation,
      category: t.category,
    })) || [],
  )

  const addTreatment = () => {
    setTreatments([
      ...treatments,
      {
        name: "",
        dosage: 0,
        giveAt: "",
        route: "",
        result: "",
        unit: "mg",
        category: "antibiotic",
      },
    ])
  }

  const removeTreatment = (index: number) => {
    setTreatments(treatments.filter((_, i) => i !== index))
  }

  const updateTreatment = (index: number, field: keyof TreatmentForm, value: string | number) => {
    const updated = [...treatments]
    updated[index] = { ...updated[index], [field]: value }
    setTreatments(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        time: vitalSignForm.time.replace("T", " ") + ":00",
        T: vitalSignForm.T,
        BP: vitalSignForm.BP,
        pulse: vitalSignForm.pulse,
        resp: vitalSignForm.resp,
        spO2: vitalSignForm.spO2,
        treatments: treatments.map((t) => ({
          name: t.name,
          dosage: t.dosage,
          giveAt: t.giveAt ? t.giveAt.replace("T", " ") + ":00" : null,
          route: t.route,
          result: t.result,
          unit: t.unit,
          category: t.category,
        })),
      }

      // Replace with your actual API call
      console.log("Updating vital sign:", payload)

      setOpen(false)
    } catch (error) {
      console.error("Error updating vital sign:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-main font-semibold">Update Info</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Vital Signs</DialogTitle>
          <DialogDescription>Update the vital signs and treatments for this record.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vital Signs Section */}
          <Card className="bg-gray-100">
            <CardHeader className="py-3">
              <CardTitle className="text-lg font-semibold">Vital Signs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="datetime-local"
                    value={vitalSignForm.time}
                    onChange={(e) => setVitalSignForm({ ...vitalSignForm, time: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="temperature">Temperature (°C)</Label>
                  <Input
                    id="temperature"
                    value={vitalSignForm.T}
                    onChange={(e) => setVitalSignForm({ ...vitalSignForm, T: e.target.value })}
                    placeholder="36.5"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bp">Blood Pressure</Label>
                  <Input
                    id="bp"
                    value={vitalSignForm.BP}
                    onChange={(e) => setVitalSignForm({ ...vitalSignForm, BP: e.target.value })}
                    placeholder="120/80"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pulse">Pulse</Label>
                  <Input
                    id="pulse"
                    value={vitalSignForm.pulse}
                    onChange={(e) => setVitalSignForm({ ...vitalSignForm, pulse: e.target.value })}
                    placeholder="72"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="resp">Respiration</Label>
                  <Input
                    id="resp"
                    value={vitalSignForm.resp}
                    onChange={(e) => setVitalSignForm({ ...vitalSignForm, resp: e.target.value })}
                    placeholder="16"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="spo2">SpO₂</Label>
                  <Input
                    id="spo2"
                    value={vitalSignForm.spO2}
                    onChange={(e) => setVitalSignForm({ ...vitalSignForm, spO2: e.target.value })}
                    placeholder="98%"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Treatments Section */}
          <Card className="bg-gray-100">
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Treatments</CardTitle>
                <Button type="button" onClick={addTreatment} variant="outline" size="sm">
                  Add Treatment
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {treatments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No treatments added. Click "Add Treatment" to get started.</p>
                </div>
              ) : (
                treatments.map((treatment, index) => (
                  <Card key={index} className="bg-white">
                    <CardHeader className="py-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Treatment {index + 1}</CardTitle>
                        <Button type="button" variant="outline" size="sm" onClick={() => removeTreatment(index)}>
                          Remove
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Treatment Name</Label>
                          <Input
                            value={treatment.name}
                            onChange={(e) => updateTreatment(index, "name", e.target.value)}
                            placeholder="e.g., Aspirin"
                            required
                          />
                        </div>
                        <div>
                          <Label>Category</Label>
                          <Select
                            value={treatment.category}
                            onValueChange={(value) => updateTreatment(index, "category", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="antibiotic">Antibiotic</SelectItem>
                              <SelectItem value="analgesic">Analgesic</SelectItem>
                              <SelectItem value="antihistamine">Antihistamine</SelectItem>
                              <SelectItem value="bronchodilator">Bronchodilator</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label>Dosage</Label>
                          <Input
                            type="number"
                            value={treatment.dosage}
                            onChange={(e) => updateTreatment(index, "dosage", Number(e.target.value))}
                            placeholder="100"
                            required
                          />
                        </div>
                        <div>
                          <Label>Unit</Label>
                          <Select
                            value={treatment.unit}
                            onValueChange={(value) => updateTreatment(index, "unit", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mg">mg</SelectItem>
                              <SelectItem value="ml">ml</SelectItem>
                              <SelectItem value="g">g</SelectItem>
                              <SelectItem value="mcg">mcg</SelectItem>
                              <SelectItem value="units">units</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Route</Label>
                          <Input
                            value={treatment.route}
                            onChange={(e) => updateTreatment(index, "route", e.target.value)}
                            placeholder="e.g., IV, PO, IM"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Given At</Label>
                          <Input
                            type="datetime-local"
                            value={treatment.giveAt}
                            onChange={(e) => updateTreatment(index, "giveAt", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Result</Label>
                          <Input
                            value={treatment.result}
                            onChange={(e) => updateTreatment(index, "result", e.target.value)}
                            placeholder="e.g., effective, no change"
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Vital Signs"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
