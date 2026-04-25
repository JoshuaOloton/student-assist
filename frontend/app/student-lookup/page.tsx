'use client'

import { useState } from 'react'
import Link from 'next/link'
import { StudentSearchForm, type StudentSearchData } from '@/components/student-search-form'
import { StudentInfoCard, type StudentInfo } from '@/components/student-info-card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, GraduationCap } from 'lucide-react'

export default function StudentLookupPage() {
  const [searchResult, setSearchResult] = useState<StudentInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (data: StudentSearchData) => {
    setLoading(true)
    setError(null)
    setSearchResult(null)

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
    setSearchResult(null)
    setError(null)
  }

  return (
    <div className="min-h-dvh bg-background">
      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 border">
        {!searchResult ? (
          <div className="space-y-6">
            <div className="rounded-lg border border-border/40 bg-accent/5 p-6 sm:p-8">
              <h2 className="mb-2 text-lg font-semibold text-foreground">Enter Your Details</h2>
              <p className="text-sm text-muted-foreground">
                Provide your matric number along with your program details to verify your enrollment.
              </p>
            </div>

            <StudentSearchForm
              onSubmit={handleSearch}
              loading={loading}
              error={error}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-lg border border-border/40 bg-accent/5 p-4 sm:p-6">
              <p className="text-sm text-muted-foreground">
                ✓ Student found! Here&apos;s the information in our system.
              </p>
            </div>

            <StudentInfoCard
              student={searchResult}
              onNewSearch={handleNewSearch}
            />
          </div>
        )}
      </main>
    </div>
  )
}
