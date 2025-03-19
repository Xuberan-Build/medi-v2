// components/recommendations/display/RecommendationDisplay.tsx

import React from 'react'
import { RecommendationDisplayProps } from './types'
import PrimaryCard from '../cards/PrimaryCard'
import AlternativeCard from '../cards/AlternativeCard'
import { ScoreBreakdown, SpecialConsideration } from '../engine/types'

export const RecommendationDisplay: React.FC<RecommendationDisplayProps> = ({
  recommendation,
  onAdjustPreferences
}) => {
  const { primaryRecommendation, alternativeRecommendation, metadata } = recommendation

  const renderConfidenceLabel = (confidence: 'high' | 'medium' | 'low') => {
    const styles = {
      high: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-red-100 text-red-800'
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${styles[confidence]}`}>
        {confidence.charAt(0).toUpperCase() + confidence.slice(1)} Confidence
      </span>
    )
  }

  const renderSpecialConsiderations = (considerations: SpecialConsideration[]) => {
    if (considerations.length === 0) return null

    return (
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Special Considerations</h4>
        <ul className="space-y-2">
          {considerations.map((consideration, index) => (
            <li key={index} className="text-sm text-blue-700">
              <span className="font-medium">{consideration.description}</span>: {consideration.impact}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const renderScoreBreakdown = (breakdown: ScoreBreakdown[]) => (
    <div className="mt-6">
      <h4 className="text-sm font-medium text-gray-900 mb-3">Score Breakdown</h4>
      <div className="space-y-2">
        {breakdown.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {item.dimensionId}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(item.contribution)} points
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(item.contribution / (item.weight * 100)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Medicare Plan Recommendation</h2>
        <p className="text-gray-600">
          Based on your responses on {new Date(metadata.calculatedAt).toLocaleDateString()}
        </p>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Primary Recommendation
            </h3>
            {renderConfidenceLabel(primaryRecommendation.confidence)}
          </div>

          <PrimaryCard recommendation={primaryRecommendation} />
          {renderScoreBreakdown(primaryRecommendation.breakdown)}
          {renderSpecialConsiderations(primaryRecommendation.specialConsiderations)}
        </div>
      </div>

      {alternativeRecommendation && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Alternative to Consider
            </h3>
            <AlternativeCard
              recommendation={alternativeRecommendation}
              primaryPlanType={primaryRecommendation.planType}
            />
          </div>
        </div>
      )}

      <div className="flex justify-center mt-8">
        <button
          onClick={onAdjustPreferences}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Adjust Your Preferences
        </button>
      </div>

      {metadata.marketRegion && (
        <p className="text-sm text-gray-500 text-center mt-4">
          Recommendation based on {metadata.marketRegion} market conditions
        </p>
      )}
    </div>
  )
}

export default RecommendationDisplay
