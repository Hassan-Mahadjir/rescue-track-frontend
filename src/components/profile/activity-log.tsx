"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, UserCheck } from "lucide-react"

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

// Mock activity data
const activities = [
  {
    id: 1,
    type: "login",
    description: "Successful login",
    timestamp: "2025-05-12T14:32:10.234Z",
    status: "success",
  },
  {
    id: 2,
    type: "profile_update",
    description: "Profile information updated",
    timestamp: "2025-05-10T09:15:22.234Z",
    status: "success",
  },
  {
    id: 3,
    type: "password_change",
    description: "Password changed",
    timestamp: "2025-05-05T16:45:30.234Z",
    status: "success",
  },
  {
    id: 4,
    type: "login_attempt",
    description: "Failed login attempt",
    timestamp: "2025-05-01T11:22:45.234Z",
    status: "failed",
  },
  {
    id: 5,
    type: "account_created",
    description: "Account created",
    timestamp: "2025-04-23T09:33:24.234Z",
    status: "success",
  },
]

interface ActivityLogProps {
  profile: UserProfile
}

export const ActivityLog = ({ profile }: ActivityLogProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
        <CardDescription>History of your account activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex">
              <div className="mr-4 flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  {activity.type === "login" || activity.type === "login_attempt" ? (
                    <UserCheck className="h-5 w-5 text-blue-500" />
                  ) : activity.type === "account_created" ? (
                    <UserCheck className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-orange-500" />
                  )}
                </div>
                <div className="h-full w-px bg-gray-200" />
              </div>
              <div className="pb-8">
                <div className="flex items-center">
                  <div className="font-medium">{activity.description}</div>
                  <Badge className={`ml-2 ${activity.status === "success" ? "bg-green-500" : "bg-red-500"}`}>
                    {activity.status === "success" ? "Success" : "Failed"}
                  </Badge>
                </div>
                <div className="mt-1 flex text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CalendarDays className="mr-1 h-3 w-3" />
                    {formatDate(activity.timestamp)}
                  </div>
                  <div className="mx-2">•</div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {formatTime(activity.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <UserCheck className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div>
              <div className="font-medium">Account Created</div>
              <div className="mt-1 flex text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CalendarDays className="mr-1 h-3 w-3" />
                  {formatDate(profile.createdAt)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
