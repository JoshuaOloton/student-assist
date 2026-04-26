/* eslint-disable */

"use client";

import { COLORS, DEPARTMENTS, LEVELS } from "@/lib/constants";
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export interface StudentSearchData {
  matricnum: string
  department: string
  level: string
}

export default function SearchPage() {
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<StudentSearchData>({
    matricnum: '',
    department: '',
    level: '',
  });

  const [touched, setTouched] = useState({
    matricnum: false,
    department: false,
    level: false,
  })

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

  const isFormComplete = Object.values(formData).every((val) => val !== '')

  return (
    <div
      style={{
        flex: 1,
        background: COLORS.cream,
        padding: "2.5rem",
        overflowY: "auto",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              fontFamily: "'Georgia',serif",
              fontSize: "2rem",
              color: COLORS.charcoal,
              fontWeight: "normal",
              margin: "0 0 0.5rem",
            }}
          >
            Student Status
          </h1>
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: 14,
              color: COLORS.muted,
              margin: 0,
            }}
          >
            Provide your matric number along with your program details to verify
            your enrollment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 mb-6 rounded-2xl border border-[#d1e7d9]">
          <div className="grid gap-6 sm:grid-cols-2 mb-8">
            {/* Matric Number */}
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="matric" className="font-bold">Matric Number</FieldLabel>
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
              <FieldLabel htmlFor="program" className="font-bold">Program Name</FieldLabel>
              <FieldDescription>Select your program</FieldDescription>
              <Select value={formData.department} onValueChange={(value) => handleChange('department', value)}>
                <SelectTrigger id="program" disabled={loading} className="mt-2">
                  <SelectValue placeholder="Choose program" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((program) => (
                    <SelectItem key={program} value={program}>
                      {program}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          
            {/* Level */}
            <Field>
              <FieldLabel htmlFor="level" className="font-bold">Level</FieldLabel>
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

        {searched &&
          (result ? (
            <div
              style={{
                background: "white",
                borderRadius: 16,
                border: `1.5px solid ${COLORS.emerald}`,
                padding: "1.5rem 2rem",
                animation: "fadeIn 0.3s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: COLORS.forest,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: 18,
                    fontFamily: "sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {result.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: COLORS.charcoal,
                      margin: "0 0 3px",
                    }}
                  >
                    {result.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "sans-serif",
                      fontSize: 13,
                      color: COLORS.muted,
                      margin: 0,
                    }}
                  >
                    {formData.matricnum}
                  </p>
                </div>
                <div
                  style={{
                    marginLeft: "auto",
                    background: COLORS.softGreen,
                    color: COLORS.forest,
                    borderRadius: 20,
                    padding: "4px 14px",
                    fontSize: 12,
                    fontFamily: "sans-serif",
                    fontWeight: 600,
                    border: `1px solid ${COLORS.sage}`,
                  }}
                >
                  ● {result.status}
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  gap: 12,
                }}
              >
                {[
                  ["Department", result.dept],
                  ["Level", result.level],
                  ["CGPA", result.gpa],
                  ["Fees", result.fees],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    style={{
                      background: COLORS.softGreen,
                      borderRadius: 10,
                      padding: "12px 14px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "sans-serif",
                        fontSize: 11,
                        color: COLORS.muted,
                        margin: "0 0 4px",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontFamily: "sans-serif",
                        fontSize: 14,
                        fontWeight: 600,
                        color: val === "Owing" ? "#dc2626" : COLORS.charcoal,
                        margin: 0,
                      }}
                    >
                      {val}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: 12,
                padding: "1.5rem 2rem",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 24 }}>⚠</span>
              <div>
                <p
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#dc2626",
                    margin: "0 0 4px",
                  }}
                >
                  Student Not Found
                </p>
                <p
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 13,
                    color: "#b91c1c",
                    margin: 0,
                  }}
                >
                  No record found for <strong>{formData.matricnum}</strong>. Verify your
                  matric number and try again.
                </p>
              </div>
            </div>
          ))}
      </div>
      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
