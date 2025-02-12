// components/recommendations/display/types.ts
import { RecommendationResult } from '../engine/types'

export interface RecommendationDisplayProps {
  recommendation: RecommendationResult
  onAdjustPreferences?: () => void
}
