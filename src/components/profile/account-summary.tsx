"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, UserCog } from "lucide-react"

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

interface AccountSummaryProps {
  profile: UserProfile
}

export const AccountSummary = ({ profile }: AccountSummaryProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getAccountAge = (createdAt: string) => {
    const created = new Date(createdAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - created.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 30) {
      return `${diffDays} days`
    } else if (diffDays < 365) {
      return `${Math.floor(diffDays / 30)} months`
    } else {
      return `${Math.floor(diffDays / 365)} years`
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Summary</CardTitle>
        <CardDescription>Overview of your account status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-3">
            <div className="text-sm font-medium text-muted-foreground">Account Status</div>
            <div className="mt-1 flex items-center">
              {profile.user.isVerified ? (
                <Badge className="bg-green-500">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              ) : (
                <Badge variant="destructive">Unverified</Badge>
              )}
            </div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-sm font-medium text-muted-foreground">Account Type</div>
            <div className="mt-1 flex items-center">
              <Badge className="bg-blue-500">
                <UserCog className="h-3 w-3 mr-1" />
                {profile.user.role}
              </Badge>
            </div>
          </div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground mb-2">Account Information</div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="text-sm">Creation Date</div>
              <div className="text-sm font-medium">{formatDate(profile.user.createdAt)}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm">Account Age</div>
              <div className="text-sm font-medium">{getAccountAge(profile.user.createdAt)}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm">Last Updated</div>
              <div className="text-sm font-medium">{formatDate(profile.updatedAt)}</div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href="#security">Security Settings</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
