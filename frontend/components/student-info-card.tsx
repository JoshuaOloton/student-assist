'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { CheckCircle2, Calendar, BookOpen, ArrowRight } from 'lucide-react'
import { StudentInfo } from '@/lib/types'


interface StudentInfoCardProps {
  student: StudentInfo
  onNewSearch: () => void
}

export function StudentInfoCard({ student, onNewSearch }: StudentInfoCardProps) {
  const fullName = `${student.surname} ${student.firstname}`

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      active: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
      inactive: 'bg-amber-500/10 text-amber-600 border-amber-200',
      suspended: 'bg-red-500/10 text-red-600 border-red-200',
      graduated: 'bg-blue-500/10 text-blue-600 border-blue-200',
    }
    return statusMap[status.toLowerCase()] || 'bg-gray-500/10 text-gray-600'
  }

  const getInitials = (name: string) => {
    console.log('Generating initials for name:', name);
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  const enrollmentDate = new Date(student.enrollment_date)
  const formattedDate = enrollmentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="space-y-6">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className="border-border bg-linear-to-br from-card to-card/50 p-6">
          {/* Header with Status */}
          <div className="mb-6 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {getInitials(fullName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{fullName}</h2>
                <p className="text-sm text-muted-foreground">{student.matricnum}</p>
              </div>
            </div>
            <Badge className={`${getStatusColor(student.status)} border`}>
              <CheckCircle2 className="mr-1 h-3 w-3" />
              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
            </Badge>
          </div>

          {/* Info Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Email */}
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email
              </p>
              <p className="break-all text-sm font-medium text-foreground">{student.email}</p>
            </div>

            {/* Program */}
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <BookOpen className="h-3 w-3" />
                Program
              </div>
              <p className="text-sm font-medium text-foreground">{student.department}</p>
            </div>

            {/* Level */}
            <div className="rounded-lg bg-muted/50 p-4 sm:col-span-2">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Level
              </p>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                  {student.level}
                </span>
                <span className="text-sm font-medium text-foreground">Level {student.level}</span>
              </div>
            </div>

            {/* Enrollment Date */}
            <div className="rounded-lg bg-muted/50 p-4 sm:col-span-2">
              <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Calendar className="h-3 w-3" />
                Enrollment Date
              </div>
              <p className="text-sm font-medium text-foreground">{formattedDate}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Button */}
      <Button
        onClick={onNewSearch}
        variant="outline"
        className="w-full sm:w-auto"
        size="lg"
      >
        <ArrowRight className="mr-2 h-4 w-4" />
        Search Another Student
      </Button>
    </div>
  )
}
