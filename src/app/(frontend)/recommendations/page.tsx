// app/recommendations/page.tsx
'use client'

import React from 'react'
import { RecommendationDisplay } from '@/components/recommendations/display/RecommendationDisplay'
import { useRecommendation } from '@/hooks/useRecommendation'

export default function RecommendationsPage() {
  const { data, loading, error } = useRecommendation()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!data) return <div>No recommendation found</div>

  return <RecommendationDisplay recommendation={data} />
}
