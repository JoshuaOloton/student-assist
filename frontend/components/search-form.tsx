/* eslint-disable */

"use client";

import { DEPARTMENTS, LEVELS } from "@/lib/constants";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { StudentSearchData } from "@/lib/types";



interface SearchFormProps {
  onSubmit: (data: StudentSearchData) => void;
  loading: boolean;
  error?: string | null;
}

const SearchForm = ({ onSubmit, loading, error }: SearchFormProps) => {

  const [formData, setFormData] = useState<StudentSearchData>({
    matricnum: "",
    department: "",
    level: "",
  });

  const [touched, setTouched] = useState({
    matricnum: false,
    department: false,
    level: false,
  });
  
  const handleChange = (field: keyof StudentSearchData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof StudentSearchData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isFormComplete = Object.values(formData).every((val) => val !== "");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (isFormComplete) {
      onSubmit(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 mb-6 rounded-2xl border border-[#d1e7d9]"
    >
      <div className="grid gap-6 sm:grid-cols-2 mb-8">
        {error && (
          <div className="flex items-start gap-3 rounded-lg bg-destructive/10 p-4 text-destructive">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}
        {/* Matric Number */}
        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="matric" className="font-bold">
            Matric Number
          </FieldLabel>
          <FieldDescription>Enter your student matric number</FieldDescription>
          <Input
            id="matric"
            placeholder="e.g., FTP/CSC/25/0126121"
            value={formData.matricnum}
            onChange={(e) => handleChange("matricnum", e.target.value)}
            onBlur={() => handleBlur("matricnum")}
            disabled={loading}
            className="mt-2"
          />
        </Field>
        {/* Program Name */}
        <Field>
          <FieldLabel htmlFor="program" className="font-bold">
            Program Name
          </FieldLabel>
          <FieldDescription>Select your program</FieldDescription>
          <Select
            value={formData.department}
            onValueChange={(value) => handleChange("department", value)}
          >
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
          <FieldLabel htmlFor="level" className="font-bold">
            Level
          </FieldLabel>
          <FieldDescription>Select your level</FieldDescription>
          <Select
            value={formData.level}
            onValueChange={(value) => handleChange("level", value)}
          >
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
  );
};

export default SearchForm;
