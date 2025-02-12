// components/recommendations/cards/PrimaryCard.tsx

import React from 'react'
import { RecommendationScore, DimensionId } from '../engine/types'

interface PrimaryCardProps {
  recommendation: RecommendationScore
}

const DimensionLabels: Record<DimensionId, string> = {
  [DimensionId.DOCTOR_CHOICE]: 'Doctor Choice',
  [DimensionId.COST_STRUCTURE]: 'Cost Structure',
  [DimensionId.TRAVEL_NEEDS]: 'Travel Coverage',
  [DimensionId.HEALTHCARE_USAGE]: 'Healthcare Usage',
  [DimensionId.PRESCRIPTION_NEEDS]: 'Prescription Needs',
  [DimensionId.ADDITIONAL_BENEFITS]: 'Additional Benefits',
  [DimensionId.MANAGED_CARE]: 'Managed Care'
}

const PrimaryCard: React.FC<PrimaryCardProps> = ({ recommendation }) => {
  const { planType, totalScore, breakdown, specialConsiderations } = recommendation

  // Get top contributing factors (highest scoring dimensions)
  const topFactors = [...breakdown]
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Plan Type and Score */}
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{planType}</h4>
          <p className="text-sm text-gray-500">Primary Recommendation</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">
            {Math.round(totalScore)}%
          </div>
          <p className="text-sm text-gray-500">Match Score</p>
        </div>
      </div>

      {/* Key Factors */}
      <div>
        <h5 className="text-sm font-medium text-gray-700 mb-3">
          Top Factors for This Recommendation
        </h5>
        <div className="space-y-3">
          {topFactors.map((factor, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {DimensionLabels[factor.dimensionId]}
              </span>
              <div className="flex items-center">
                <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: `${(factor.contribution / (factor.weight * 100)) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {Math.round(factor.contribution)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Benefits */}
      <div>
        <h5 className="text-sm font-medium text-gray-700 mb-3">Key Benefits</h5>
        <ul className="space-y-2">
          {planType === 'Medicare Advantage' ? (
            <>
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                All-in-one coverage including prescription drugs
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Additional benefits like dental and vision
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Lower monthly premiums
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Freedom to choose any Medicare provider
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Predictable out-of-pocket costs
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Nationwide coverage
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Special Considerations */}
      {specialConsiderations.length > 0 && (
        <div className="bg-yellow-50 p-4 rounded-md">
          <h5 className="text-sm font-medium text-yellow-800 mb-2">
            Important Considerations
          </h5>
          <ul className="space-y-2">
            {specialConsiderations.map((consideration, index) => (
              <li key={index} className="text-sm text-yellow-700">
                {consideration.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default PrimaryCard
