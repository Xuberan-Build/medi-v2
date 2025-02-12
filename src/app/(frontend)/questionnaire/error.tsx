///Users/Worker/plan-it/medi-planit/src/app/(frontend)/questionnaire/error.tsx
'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Optionally log to error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[400px] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-lg">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900">
            Something went wrong!
          </h2>
          <p className="text-gray-600">
            We're sorry, but we encountered an error while loading the questionnaire.
            Please try again or contact support if the problem persists.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-[#005EB8] text-white rounded-lg hover:bg-[#004C93] transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 border border-[#005EB8] text-[#005EB8] rounded-lg hover:bg-gray-50 transition-colors"
          >
            Return home
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left">
            <p className="text-sm text-gray-700 font-mono">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
