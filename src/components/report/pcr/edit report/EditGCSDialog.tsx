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

interface GCS {
  id: number
  E: number
  V: number
  M: number
  total: number
}

interface EditGCSDialogProps {
  gcs: GCS | null
  pcrId: number
}

export default function EditGCSDialog({ gcs, pcrId }: EditGCSDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    E: gcs?.E || 0,
    V: gcs?.V || 0,
    M: gcs?.M || 0,
  })

  const total = formData.E + formData.V + formData.M

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...formData,
        total,
      }

      // Replace with your actual API call
      console.log("Updating GCS:", payload)

      // Example API call:
      // if (gcs) {
      //   await updateGCS(gcs.id, payload);
      // } else {
      //   await createGCS(pcrId, payload);
      // }

      setOpen(false)
    } catch (error) {
      console.error("Error updating GCS:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-main font-semibold" size="sm">
          {gcs ? "Update GCS" : "Add GCS"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{gcs ? "Edit" : "Add"} Glasgow Coma Scale</DialogTitle>
          <DialogDescription>
            Update the Glasgow Coma Scale assessment. Total score is calculated automatically.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="E">Eye Response (E)</Label>
            <Input
              id="E"
              type="number"
              min="1"
              max="4"
              value={formData.E}
              onChange={(e) => setFormData({ ...formData, E: Number(e.target.value) })}
              placeholder="1-4"
              required
            />
          </div>

          <div>
            <Label htmlFor="V">Verbal Response (V)</Label>
            <Input
              id="V"
              type="number"
              min="1"
              max="5"
              value={formData.V}
              onChange={(e) => setFormData({ ...formData, V: Number(e.target.value) })}
              placeholder="1-5"
              required
            />
          </div>

          <div>
            <Label htmlFor="M">Motor Response (M)</Label>
            <Input
              id="M"
              type="number"
              min="1"
              max="6"
              value={formData.M}
              onChange={(e) => setFormData({ ...formData, M: Number(e.target.value) })}
              placeholder="1-6"
              required
            />
          </div>

          <div className="p-3 bg-gray-100 rounded-lg">
            <Label>Total Score</Label>
            <p className="text-lg font-semibold">{total}</p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
