/* eslint-disable */

"use client";

import { useState, useRef, useEffect } from "react";
import SearchForm from "@/components/search-form";
import { StudentInfo, StudentSearchData } from "@/lib/types";
import { StudentInfoCard } from "@/components/student-info-card";


export default function SearchPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [searchResult, setSearchResult] = useState<StudentInfo | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchResult && cardRef.current) {
      cardRef.current.focus();
    }
  }, [searchResult]);

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
          if(response.status === 404) {
            
          }
          const errorData = await response.json()
          setError(errorData.detail || 'An error occurred while searching')
          return
        }
  
        const student = await response.json();
        setSearchResult(student);
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
    <div className="flex-1 bg-[#fafdf7] p-10 overflow-y-auto">
      <div className="max-w-2xl mx-auto my-0">
        <div className="mb-8">
          <h1 className="font-['Georgia',serif] text-2xl md:text-3xl text-[#1c2b22] font-normal m-0 mb-2">Student Status</h1>
          <p className="font-[sans-serif] text-sm text-[#6b7c72] m-0">
            Provide student's matric number along with program details to verify enrollment.
          </p>
        </div>

        {!searchResult ? (
          <SearchForm 
            onSubmit={handleSearch} 
            loading={loading} 
            error={error} 
          />
        ): (
          <StudentInfoCard
            ref={cardRef}
            student={searchResult}
            onNewSearch={handleNewSearch}
          />
        )}
      </div>
    </div>
  );
}
