// hooks/useRecommendation.ts
import { useState, useEffect } from 'react'
import { RecommendationResult } from '@/components/recommendations/engine/types'

export function useRecommendation() {
  const [data, setData] = useState<RecommendationResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRecommendation() {
      console.log('[useRecommendation] Starting fetchRecommendation')

      try {
        const urlParams = new URLSearchParams(window.location.search)
        const submissionId = urlParams.get('id')
        console.log(`[useRecommendation] submissionId: ${submissionId}`)

        if (!submissionId) {
          console.error('[useRecommendation] Error: No submission ID provided')
          setError('No submission ID provided')
          setLoading(false)
          return
        }

        const response = await fetch(`/api/recommendations/calculate?id=${submissionId}`, {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log(`[useRecommendation] Fetch response status: ${response.status}`);

        // const data = await response.json().catch(err => {
        //   console.error(`[useRecommendation] Error parsing response as JSON:`, err);
        //   return null;
        // });

        // console.log(`[useRecommendation] Fetch response body:`, data);

        if (!response.ok) {
          const errorText = await response.text()
          console.error('[useRecommendation] Fetch failed with response:', errorText)
          throw new Error(`Failed to fetch recommendation: ${errorText}`)
        }

        const result = await response.json()
        console.log('[useRecommendation] Successfully fetched recommendation:', result)

        setData(result)
      } catch (err) {
        console.error('[useRecommendation] Error fetching recommendation:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
        console.log('[useRecommendation] FetchRecommendation process completed')
      }
    }

    fetchRecommendation()
  }, [])

  return { data, loading, error }
}
