import { useEffect, useState } from 'react'
import type { Question } from '../payload-types'

export const useQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions')
        const data = await response.json()

        // Sort by order field
        const sortedQuestions = data.docs.sort((a: Question, b: Question) =>
          a.order - b.order
        )
        setQuestions(sortedQuestions)
      } catch (err) {
        console.log(err)
        setError('Failed to fetch questions')
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  return { questions, loading, error }
}
