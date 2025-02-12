// src/components/recommendations/engine/validation.ts

import {
    QuestionnaireResponse,
    DimensionId,
    DimensionWeight
  } from './types';

  interface ValidationError {
    field: string;
    message: string;
    code?: string;
  }

  // Validation constants
  const REQUIRED_DIMENSIONS = [
    DimensionId.DOCTOR_CHOICE,
    DimensionId.COST_STRUCTURE,
    DimensionId.TRAVEL_NEEDS,
    DimensionId.HEALTHCARE_USAGE,
    DimensionId.PRESCRIPTION_NEEDS,
    DimensionId.ADDITIONAL_BENEFITS,
    DimensionId.MANAGED_CARE
  ];

  const RATING_RANGE = {
    MIN: 1,
    MAX: 5
  };

  /**
   * Validates questionnaire responses before scoring
   */
  export function validateResponses(responses: QuestionnaireResponse[]): ValidationError[] {
    const errors: ValidationError[] = [];

    // Check if responses exist
    if (!responses || responses.length === 0) {
      errors.push({
        field: 'responses',
        message: 'No questionnaire responses provided',
        code: 'MISSING_RESPONSES'
      });
      return errors;
    }

    // Check for duplicate dimensions
    const dimensionCounts = new Map<DimensionId, number>();
    responses.forEach(response => {
      const count = dimensionCounts.get(response.dimensionId) || 0;
      dimensionCounts.set(response.dimensionId, count + 1);
    });

    dimensionCounts.forEach((count, dimension) => {
      if (count > 1) {
        errors.push({
          field: 'dimensions',
          message: `Duplicate responses found for dimension: ${dimension}`,
          code: 'DUPLICATE_DIMENSION'
        });
      }
    });

    // Check for missing required dimensions
    const providedDimensions = new Set(responses.map(r => r.dimensionId));
    REQUIRED_DIMENSIONS.forEach(dimension => {
      if (!providedDimensions.has(dimension)) {
        errors.push({
          field: 'dimensions',
          message: `Missing required dimension: ${dimension}`,
          code: 'MISSING_DIMENSION'
        });
      }
    });

    // Validate individual responses
    responses.forEach((response, index) => {
      // Validate dimensionId
      if (!Object.values(DimensionId).includes(response.dimensionId)) {
        errors.push({
          field: `responses[${index}].dimensionId`,
          message: `Invalid dimension ID: ${response.dimensionId}`,
          code: 'INVALID_DIMENSION'
        });
      }

      // Validate rating
      if (!Number.isInteger(response.rating)) {
        errors.push({
          field: `responses[${index}].rating`,
          message: `Rating must be an integer: ${response.rating}`,
          code: 'INVALID_RATING_TYPE'
        });
      } else if (
        response.rating < RATING_RANGE.MIN ||
        response.rating > RATING_RANGE.MAX
      ) {
        errors.push({
          field: `responses[${index}].rating`,
          message: `Rating must be between ${RATING_RANGE.MIN} and ${RATING_RANGE.MAX}: ${response.rating}`,
          code: 'INVALID_RATING_RANGE'
        });
      }

      // Validate comments (if provided)
      if (response.comments && typeof response.comments !== 'string') {
        errors.push({
          field: `responses[${index}].comments`,
          message: 'Comments must be a string',
          code: 'INVALID_COMMENTS'
        });
      }
    });

    return errors;
  }

  /**
   * Sanitizes a single response
   */
  export function sanitizeResponse(response: QuestionnaireResponse): QuestionnaireResponse {
    return {
      dimensionId: response.dimensionId,
      rating: Math.max(
        RATING_RANGE.MIN,
        Math.min(RATING_RANGE.MAX, Math.round(response.rating))
      ),
      comments: response.comments?.trim() || undefined
    };
  }

  /**
   * Validates and sanitizes responses for scoring
   */
  export function prepareResponsesForScoring(
    responses: QuestionnaireResponse[]
  ): QuestionnaireResponse[] | null {
    const errors = validateResponses(responses);

    if (errors.length > 0) {
      console.error('Validation errors:', errors);
      return null;
    }

    return responses.map(sanitizeResponse);
  }

  /**
   * Validates recommendation confidence thresholds
   */
  export function validateConfidenceThresholds(
    totalScore: number,
    scoreDifference: number
  ): ValidationError[] {
    const errors: ValidationError[] = [];

    // Check if total score is within valid range
    if (totalScore < 0 || totalScore > 100) {
      errors.push({
        field: 'totalScore',
        message: `Total score must be between 0 and 100: ${totalScore}`,
        code: 'INVALID_TOTAL_SCORE'
      });
    }

    // Check if score difference indicates clear preference
    if (Math.abs(scoreDifference) < 10) {
      errors.push({
        field: 'scoreDifference',
        message: 'Score difference may not indicate strong preference',
        code: 'LOW_SCORE_DIFFERENCE'
      });
    }

    return errors;
  }

  /**
   * Checks if responses are valid for scoring
   */
  export function isValidForScoring(responses: QuestionnaireResponse[]): boolean {
    const errors = validateResponses(responses);
    return errors.length === 0;
  }
