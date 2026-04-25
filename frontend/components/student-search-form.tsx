'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export interface StudentSearchFormProps {
  onSubmit: (data: StudentSearchData) => void
  loading: boolean
  error?: string | null
}

export interface StudentSearchData {
  matricnum: string
  department: string
  level: string
}

const PROGRAM_NAMES = [
  'Computer Science',
  'Engineering',
  'Business Administration',
  'Law',
  'Medicine',
  'Arts & Humanities',
  'Environmental Science',
  'Psychology',
]

const LEVELS = ['100', '200', '300', '400', '500']

export function StudentSearchForm({ onSubmit, loading, error }: StudentSearchFormProps) {
  const [formData, setFormData] = useState<StudentSearchData>({
    matricnum: '',
    department: '',
    level: '',
  })

  const [touched, setTouched] = useState({
    matricnum: false,
    department: false,
    level: false,
  })

  const isFormComplete = Object.values(formData).every((val) => val !== '')
  const hasErrors = Object.keys(touched).some((key) => touched[key as keyof typeof touched] && !formData[key as keyof StudentSearchData])

  const handleChange = (field: keyof StudentSearchData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleBlur = (field: keyof StudentSearchData) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    if (isFormComplete) {
      onSubmit(formData)
    }
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <Card className="w-full border-border bg-card p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="flex items-start gap-3 rounded-lg bg-destructive/10 p-4 text-destructive">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Matric Number */}
          <Field className="sm:col-span-2">
            <FieldLabel htmlFor="matric">Matric Number</FieldLabel>
            <FieldDescription>Enter your student matric number</FieldDescription>
            <Input
              id="matric"
              placeholder="e.g., STU202400123"
              value={formData.matricnum}
              onChange={(e) => handleChange('matricnum', e.target.value)}
              onBlur={() => handleBlur('matricnum')}
              disabled={loading}
              className="mt-2"
            />
          </Field>

          {/* Program Name */}
          <Field>
            <FieldLabel htmlFor="program">Program Name</FieldLabel>
            <FieldDescription>Select your program</FieldDescription>
            <Select value={formData.department} onValueChange={(value) => handleChange('department', value)}>
              <SelectTrigger id="program" disabled={loading} className="mt-2">
                <SelectValue placeholder="Choose program" />
              </SelectTrigger>
              <SelectContent>
                {PROGRAM_NAMES.map((program) => (
                  <SelectItem key={program} value={program}>
                    {program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          
          {/* Level */}
          <Field>
            <FieldLabel htmlFor="level">Level</FieldLabel>
            <FieldDescription>Select your level</FieldDescription>
            <Select value={formData.level} onValueChange={(value) => handleChange('level', value)}>
              <SelectTrigger id="level" disabled={loading} className="mt-2">
                <SelectValue placeholder="Choose level" />
              </SelectTrigger>
              <SelectContent>
                {LEVELS.map((lv, index) => (
                  <SelectItem key={lv} value={String(index + 1)}>
                    {lv}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Button
          type="submit"
          disabled={!isFormComplete || loading}
          className="w-full sm:w-auto"
          size="lg"
        >
          {loading ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Searching...
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Find Student
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}
