// src/components/recommendations/engine/types.ts

import type { User } from 'payload'

export enum DimensionId {
  DOCTOR_CHOICE = 'doctor_choice',
  COST_STRUCTURE = 'cost_structure',
  TRAVEL_NEEDS = 'travel_needs',
  HEALTHCARE_USAGE = 'healthcare_usage',
  PRESCRIPTION_NEEDS = 'prescription_needs',
  ADDITIONAL_BENEFITS = 'additional_benefits',
  MANAGED_CARE = 'managed_care'
}

export enum PlanType {
  MEDICARE_ADVANTAGE = 'Medicare Advantage',
  MEDICARE_SUPPLEMENT = 'Medicare Supplement'
}

export interface DimensionWeight {
  weight: number;
  name: string;
  description: string;
}

export interface QuestionnaireResponse {
  dimensionId: DimensionId;
  rating: number; // 1-5 scale
  comments?: string;
}

export interface ScoreBreakdown {
  dimensionId: DimensionId;
  score: number;
  weight: number;
  contribution: number;
  favoredPlan: PlanType;
}

export interface SpecialConsideration {
  type: 'extreme_preference' | 'travel_consideration' | 'regional_factor';
  description: string;
  impact: string;
}

export interface RecommendationScore {
  planType: PlanType;
  totalScore: number;
  breakdown: ScoreBreakdown[];
  specialConsiderations: SpecialConsideration[];
  confidence: 'high' | 'medium' | 'low';
}

export interface RecommendationResult {
  primaryRecommendation: RecommendationScore;
  alternativeRecommendation?: RecommendationScore;
  metadata: {
    calculatedAt: Date;
    version: string;
    marketRegion?: string;
  };
  user?: User;
}
