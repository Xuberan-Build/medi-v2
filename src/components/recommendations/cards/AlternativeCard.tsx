// components/recommendations/cards/AlternativeCard.tsx

import React from 'react'
import { RecommendationScore, PlanType, DimensionId } from '../engine/types'

interface AlternativeCardProps {
  recommendation: RecommendationScore
  primaryPlanType: PlanType
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

type DifferenceKey =
  | `${PlanType.MEDICARE_ADVANTAGE}_${PlanType.MEDICARE_ADVANTAGE}`
  | `${PlanType.MEDICARE_ADVANTAGE}_${PlanType.MEDICARE_SUPPLEMENT}`
  | `${PlanType.MEDICARE_SUPPLEMENT}_${PlanType.MEDICARE_ADVANTAGE}`
  | `${PlanType.MEDICARE_SUPPLEMENT}_${PlanType.MEDICARE_SUPPLEMENT}`;

const keyDifferences: Partial<Record<DifferenceKey, string[]>> = {
  [`${PlanType.MEDICARE_ADVANTAGE}_${PlanType.MEDICARE_SUPPLEMENT}`]: [
    'Lower monthly premiums but network restrictions',
    'Additional benefits included but less provider flexibility',
    'Integrated drug coverage but may have higher out-of-pocket costs'
  ],
  [`${PlanType.MEDICARE_SUPPLEMENT}_${PlanType.MEDICARE_ADVANTAGE}`]: [
    'More predictable costs but higher monthly premiums',
    'Any Medicare provider but separate drug plan needed',
    'No network restrictions but fewer extra benefits'
  ]
}

const AlternativeCard: React.FC<AlternativeCardProps> = ({
  recommendation,
  primaryPlanType
}) => {
  const { planType, totalScore, breakdown, specialConsiderations } = recommendation

  // Find dimensions where alternative plan scores higher
  const advantageDimensions = breakdown
    .filter(dim => dim.favoredPlan === planType)
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, 2)

  const differenceKey = `${planType}_${primaryPlanType}` as DifferenceKey;

  return (
    <div className="space-y-6">
      {/* Plan Type and Score */}
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{planType}</h4>
          <p className="text-sm text-gray-500">Alternative Option</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-600">
            {Math.round(totalScore)}%
          </div>
          <p className="text-sm text-gray-500">Match Score</p>
        </div>
      </div>

      {/* Stronger Dimensions */}
      {advantageDimensions.length > 0 && (
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-3">
            Stronger in These Areas
          </h5>
          <div className="space-y-3">
            {advantageDimensions.map((dimension, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {DimensionLabels[dimension.dimensionId]}
                </span>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                    <div
                      className="h-2 bg-gray-600 rounded-full"
                      style={{ width: `${(dimension.contribution / (dimension.weight * 100)) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {Math.round(dimension.contribution)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Differences */}
      <div>
        <h5 className="text-sm font-medium text-gray-700 mb-3">
          Key Differences from {primaryPlanType}
        </h5>
        <ul className="space-y-2">
          {keyDifferences[differenceKey]?.map((difference, index) => (
            <li key={index} className="flex items-start text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 mt-0.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {difference}
            </li>
          ))}
        </ul>
      </div>

      {/* Considerations */}
      {specialConsiderations.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-md">
          <h5 className="text-sm font-medium text-gray-700 mb-2">
            Consider This Option If:
          </h5>
          <ul className="space-y-2">
            {specialConsiderations.map((consideration, index) => (
              <li key={index} className="text-sm text-gray-600">
                {consideration.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default AlternativeCard
