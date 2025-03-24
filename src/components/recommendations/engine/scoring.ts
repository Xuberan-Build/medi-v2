// src/components/recommendations/engine/scoring.ts

import {
    DimensionId,
    PlanType,
    QuestionnaireResponse,
    RecommendationResult,
    ScoreBreakdown,
    SpecialConsideration,
    DimensionWeight
  } from './types';

  // Dimension weights and configuration
  const DIMENSION_WEIGHTS: Record<DimensionId, DimensionWeight> = {
    [DimensionId.DOCTOR_CHOICE]: {
      weight: 0.25,
      name: 'Doctor Choice',
      description: 'Preference for keeping current doctors'
    },
    [DimensionId.COST_STRUCTURE]: {
      weight: 0.20,
      name: 'Cost Structure',
      description: 'Premium vs out-of-pocket preference'
    },
    [DimensionId.TRAVEL_NEEDS]: {
      weight: 0.15,
      name: 'Travel Needs',
      description: 'Frequency and importance of travel coverage'
    },
    [DimensionId.HEALTHCARE_USAGE]: {
      weight: 0.15,
      name: 'Healthcare Usage',
      description: 'Frequency of healthcare services usage'
    },
    [DimensionId.PRESCRIPTION_NEEDS]: {
      weight: 0.10,
      name: 'Prescription Needs',
      description: 'Complexity and cost of prescription needs'
    },
    [DimensionId.ADDITIONAL_BENEFITS]: {
      weight: 0.10,
      name: 'Additional Benefits',
      description: 'Interest in extra benefits like dental and vision'
    },
    [DimensionId.MANAGED_CARE]: {
      weight: 0.05,
      name: 'Managed Care Comfort',
      description: 'Comfort with managed care approach'
    }
  };

  /**
   * Calculates score contribution for a single dimension
   */
  function calculateDimensionScore(response: QuestionnaireResponse): ScoreBreakdown {
    const dimension = DIMENSION_WEIGHTS[response.dimensionId];
    let score = 0;
    let favoredPlan = PlanType.MEDICARE_ADVANTAGE;

    switch (response.dimensionId) {
      case DimensionId.DOCTOR_CHOICE:
        if (response.rating === 0) {
          score = 0;
      } else {
          score = (6 - response.rating) * 25; // Invert for Supplement
        }
        favoredPlan = response.rating > 3 ? PlanType.MEDICARE_SUPPLEMENT : PlanType.MEDICARE_ADVANTAGE;
        break;
      case DimensionId.COST_STRUCTURE:
        score = response.rating * 20;
        favoredPlan = response.rating > 3 ? PlanType.MEDICARE_ADVANTAGE : PlanType.MEDICARE_SUPPLEMENT;
        break;
        case DimensionId.TRAVEL_NEEDS:
          if (response.rating === 0) {
              score = 0;
          } else {
              score = (6 - response.rating) * 15; // Invert for Supplement
          }
          favoredPlan = response.rating > 2 ? PlanType.MEDICARE_SUPPLEMENT : PlanType.MEDICARE_ADVANTAGE;
          break;
      
          case DimensionId.HEALTHCARE_USAGE:
            if (response.rating === 0) {
                score = 0;
            } else {
                score = (6 - response.rating) * 15;
            }
            favoredPlan = response.rating > 3 ? PlanType.MEDICARE_SUPPLEMENT : PlanType.MEDICARE_ADVANTAGE;
            break;
        
      case DimensionId.PRESCRIPTION_NEEDS:
        score = response.rating * 10;
        favoredPlan = response.rating > 2 ? PlanType.MEDICARE_ADVANTAGE : PlanType.MEDICARE_SUPPLEMENT;
        break;
      case DimensionId.ADDITIONAL_BENEFITS:
        score = response.rating * 10;
        favoredPlan = response.rating > 2 ? PlanType.MEDICARE_ADVANTAGE : PlanType.MEDICARE_SUPPLEMENT;
        break;
      case DimensionId.MANAGED_CARE:
        score = response.rating * 5;
        favoredPlan = response.rating > 3 ? PlanType.MEDICARE_ADVANTAGE : PlanType.MEDICARE_SUPPLEMENT;
        break;
    }

    return {
      dimensionId: response.dimensionId,
      score,
      weight: dimension.weight,
      contribution: score * dimension.weight,
      favoredPlan
    };
  }

  /**
   * Identifies special considerations based on response patterns
   */
  function identifySpecialConsiderations(
    responses: QuestionnaireResponse[],
    breakdown: ScoreBreakdown[]
  ): SpecialConsideration[] {
    const considerations: SpecialConsideration[] = [];

    // Check for extreme preferences in high-weight dimensions
    const highWeightResponses = responses.filter(r =>
      (r.dimensionId === DimensionId.DOCTOR_CHOICE ||
       r.dimensionId === DimensionId.COST_STRUCTURE) &&
      (r.rating === 1 || r.rating === 5)
    );

    highWeightResponses.forEach(response => {
      considerations.push({
        type: 'extreme_preference',
        description: `Strong preference detected for ${DIMENSION_WEIGHTS[response.dimensionId].name}`,
        impact: `May significantly impact plan satisfaction regardless of other factors`
      });
    });

    // Check travel considerations
    const travelResponse = responses.find(r => r.dimensionId === DimensionId.TRAVEL_NEEDS);
    if (travelResponse && travelResponse.rating >= 4) {
      considerations.push({
        type: 'travel_consideration',
        description: 'High travel needs indicated',
        impact: 'Consider travel-friendly Medicare Advantage plans if other factors favor MA'
      });
    }

    return considerations;
  }

  /**
   * Calculates confidence level based on score distribution
   */
  function calculateConfidence(totalScore: number): 'high' | 'medium' | 'low' {
    const distance = Math.abs(totalScore - 50);
    if (distance > 20) return 'high';
    if (distance > 10) return 'medium';
    return 'low';
  }

  /**
   * Main recommendation calculation function
   */
  export function calculateRecommendation(
    responses: QuestionnaireResponse[],
    marketRegion?: string
  ): RecommendationResult {
    // Calculate scores for each dimension
    const breakdown = responses.map(response => calculateDimensionScore(response));

    // Calculate total score
    const totalScore = breakdown.reduce((sum, dim) => sum + dim.contribution, 0);

    // Identify special considerations
    const specialConsiderations = identifySpecialConsiderations(responses, breakdown);

    // Determine primary plan type based on total score
    const primaryPlanType = totalScore > 50 ?
      PlanType.MEDICARE_ADVANTAGE :
      PlanType.MEDICARE_SUPPLEMENT;

    // Calculate confidence level
    const confidence = calculateConfidence(totalScore);

    const recommendationResult: RecommendationResult = {
      primaryRecommendation: {
        planType: primaryPlanType,
        totalScore,
        breakdown,
        specialConsiderations,
        confidence
      },
      metadata: {
        calculatedAt: new Date(),
        version: '2.0.0',
        marketRegion
      }
    };

    // Add alternative recommendation if confidence is not high
    if (confidence !== 'high') {
      recommendationResult.alternativeRecommendation = {
        planType: primaryPlanType === PlanType.MEDICARE_ADVANTAGE ?
          PlanType.MEDICARE_SUPPLEMENT :
          PlanType.MEDICARE_ADVANTAGE,
        totalScore: 100 - totalScore,
        breakdown: breakdown.map(dim => ({
          ...dim,
          contribution: dim.weight * (100 - dim.score)
        })),
        specialConsiderations,
        confidence: 'low'
      };
    }

    return recommendationResult;
  }
