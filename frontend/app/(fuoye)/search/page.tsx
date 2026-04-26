/* eslint-disable */

"use client";

import { COLORS, } from "@/lib/constants";

import { useState } from "react";
import SearchForm from "@/components/search-form";
import { StudentInfo, StudentSearchData } from "@/lib/types";
import { StudentInfoCard } from "@/components/student-info-card";


export default function SearchPage() {
  const [searched, setSearched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [searchResult, setSearchResult] = useState<StudentInfo | null>(null)

  const handleSearch = async (data: StudentSearchData) => {
      setLoading(true)
      setError(null);
      setSearchResult(null);
  
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      try {
        const response = await fetch(`${apiUrl}/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
  
        if (!response.ok) {
          const errorData = await response.json()
          setError(errorData.error || 'An error occurred while searching')
          return
        }
  
        const student = await response.json()
        setSearchResult(student)
      } catch (err) {
        setError('Failed to connect to the server. Please try again.')
        console.error('Search error:', err)
      } finally {
        setLoading(false)
      }
    }

    const handleNewSearch = () => {
      setError(null);
      setSearchResult(null);
    }

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

        <SearchForm onSubmit={handleSearch} loading={loading} error={error} />

        {searchResult && (
          <StudentInfoCard
            student={searchResult}
            onNewSearch={handleNewSearch}
          />
        )}
      </div>
      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
