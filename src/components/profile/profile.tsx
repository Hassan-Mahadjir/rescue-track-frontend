"use client"
import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Edit, Package, Phone, User } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { EditProfileDialog } from "./edit-profile-dialog"

interface UserProfile {
  id: number
  firstName: string
  middleName: string | null
  lastName: string
  address: string | null
  phone: string
  avatar: string | null
  gender: string | null
  nationality: string | null
  dateofBirth: string | null
  createdAt: string
  updatedAt: string
  user: {
    id: number
    email: string
    role: string
    createdAt: string
    isVerified: boolean
  }
}

interface ProfileProps {
  profile: UserProfile
  onSave: (updatedProfile: UserProfile) => void
}

export const Profile = ({ profile, onSave }: ProfileProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-2">
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your personal details and contact information</CardDescription>
        </div>
        <Button variant="outline" size="icon" onClick={() => setIsEditing(true)}>
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit Profile</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex gap-4">
            <h3 className="font-medium text-lg">{profile.firstName}</h3>
            {profile.middleName && <h3 className="font-medium text-lg">{profile.middleName}</h3>}
            <h3 className="font-medium text-lg">{profile.lastName}</h3>
          </div>
          <p className="text-muted-foreground">{profile.user.email}</p>
        </div>
        <Separator />
        <div className="grid gap-3">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Phone: {profile.phone}</span>
          </div>
          {profile.address && (
            <div className="flex items-start gap-2">
              <Package className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="text-sm">
                <div>Address: {profile.address}</div>
              </div>
            </div>
          )}
          {profile.gender && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Gender: {profile.gender}</span>
            </div>
          )}
          {profile.nationality && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Nationality: {profile.nationality}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Member since {formatDate(profile.createdAt)}</span>
          </div>
        </div>
      </CardContent>

      <EditProfileDialog profile={profile} isOpen={isEditing} onOpenChange={setIsEditing} onSave={onSave} />
    </Card>
  )
}
