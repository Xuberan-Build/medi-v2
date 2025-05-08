// src/app/(payload)/api/recommendations/calculate/route.ts
import { NextResponse } from 'next/server';
import { calculateScore } from '../utils/calculateScore';
import { validateInput } from '../utils/validateInput';
import type { QuestionnaireResponses, UserPreferences } from '../types';
import { initializePayload } from '@/lib/payload';

export async function GET(req: Request) {
  console.log('[API] Received request for recommendation calculation');

  try {
    const { searchParams } = new URL(req.url);
    const submissionId = searchParams.get('id');
    console.log(`[API] submissionId: ${submissionId}`);

    if (!submissionId) {
      console.error('[API] No submission ID provided');
      return NextResponse.json({ error: 'Submission ID is required' }, { status: 400 });
    }

    // Get payload using our optimized helper
    const payload = await initializePayload();

    if (!payload) {
      console.error('[API] Failed to initialize Payload');
      return NextResponse.json({ error: 'Payload initialization failed' }, { status: 500 });
    }

    // Fetch questionnaire responses with depth for nested data
    const questionnaireResult = await payload.findByID({
      collection: 'Questionnaires',
      id: submissionId,
      depth: 2,
    });
    
    console.log('[API] Fetched questionnaire:', questionnaireResult);

    if (!questionnaireResult?.responses) {
      console.error('[API] Invalid or missing responses in questionnaire');
      return NextResponse.json({ error: 'Invalid questionnaire data' }, { status: 400 });
    }

    // Type assertion for responses - safely convert to expected structure
    const responses = questionnaireResult.responses as unknown as QuestionnaireResponses;

    // Format the responses with proper typing
    const formattedResponses: { userPreferences: UserPreferences } = {
      userPreferences: {
        doctorChoice: { value: Number(responses.doctor_choice) || 0 },
        managedCare: { value: Number(responses.managed_care) || 0 },
        domesticTravel: { value: Number(responses.domestic_travel) || 0 },
        yearlyMaximums: { value: Number(responses.yearly_maximums) || 0 },
        monthlyPremiums: { value: Number(responses.monthly_premiums) || 0 },
        prescriptionPlans: { value: Number(responses.prescription_plans) || 0 },
        dentalVision: { value: Number(responses.dental_vision?.value) || 0 },
      },
    };

    console.log('[API] Formatted responses for scoring:', formattedResponses);

    // Validate input
    try {
      validateInput(formattedResponses.userPreferences);
      console.log('[API] Input validation passed');
    } catch (validationError) {
      console.error('[API] Input validation failed:', validationError);
      return NextResponse.json({ error: 'Invalid user preferences data' }, { status: 400 });
    }

    // Calculate recommendation
    const scoringResults = await calculateScore(formattedResponses.userPreferences);
    console.log('[API] Scoring results:', scoringResults);

    // Fetch user from database or create if needed
    const userData: any = {
      email: responses.email,
      name: responses.name || 'Anonymous',
    };

    let user = null;
    try {
      // Try to find existing user by email
      const existingUsers = await payload.find({
        collection: 'users',
        where: {
          email: { equals: userData.email },
        },
      });

      if (existingUsers.docs.length > 0) {
        user = existingUsers.docs[0];
        console.log('[API] Found existing user:', user.id);
      } else {
        // Create a new user
        user = await payload.create({
          collection: 'users',
          data: userData,
        });
        console.log('[API] Created new user:', user.id);
      }
    } catch (error) {
      console.error('[API] Error handling user:', error);
      return NextResponse.json({ error: 'Failed to process user data' }, { status: 500 });
    }

    // Prepare plans data for recommendation
    // Get segment-matched plans
    const topSegment = scoringResults.segmentMatches[0];
    let planRecommendations: any[] = [];

    if (topSegment) {
      try {
        // Get the segment details to access plan affinities
        const segmentDetails = await payload.findByID({
          collection: 'segments',
          id: topSegment.segment.toString(),
          depth: 2,
        });

        // Use the segment's plan affinities to generate recommendations
        if (
          segmentDetails &&
          segmentDetails.planAffinities &&
          segmentDetails.planAffinities.length > 0
        ) {
          // Sort plan affinities by affinity score
          const sortedAffinities = [...segmentDetails.planAffinities].sort(
            (a, b) => b.affinityScore - a.affinityScore,
          );

          // Create recommendations based on plan affinities
          planRecommendations = sortedAffinities.map((affinity) => ({
            plan: affinity.planType,
            matchScore: affinity.affinityScore,
            isPrimary: sortedAffinities.indexOf(affinity) === 0, // First plan is primary
            reasonsForMatch: affinity.reasonings || [],
          }));
        } else {
          console.log('[API] No plan affinities found for segment');
          // Basic fallback recommendations
          planRecommendations = getDefaultRecommendations(scoringResults.dimensionScores);
        }
      } catch (error) {
        console.error('[API] Error getting segment details:', error);
        // Fallback to basic recommendations
        planRecommendations = getDefaultRecommendations(scoringResults.dimensionScores);
      }
    } else {
      console.log('[API] No segment match found');
      // Fallback to basic recommendations
      planRecommendations = getDefaultRecommendations(scoringResults.dimensionScores);
    }

    // Create recommendation record
    try {
      const recommendation = await payload.create({
        collection: 'recommendations',
        data: {
          user: user.id,
          userPreferences: formattedResponses.userPreferences,
          scoringResults: scoringResults,
          recommendations: planRecommendations,
          status: 'active',
          metadata: {
            createdAt: new Date().toISOString(),
            lastViewed: new Date().toISOString(),
            source: 'Questionnaire',
          },
        },
      });

      console.log('[API] Created recommendation:', recommendation.id);
      return NextResponse.json(recommendation);
    } catch (error) {
      console.error('[API] Error creating recommendation:', error);
      return NextResponse.json(
        {
          error: 'Failed to create recommendation',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('[API] Detailed Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 }
    );
  }
}

// Fallback function to generate basic recommendations when segment data isn't available
function getDefaultRecommendations(dimensionScores: Record<string, number>) {
  // Calculate average score - higher favors Medicare Advantage, lower favors Medicare Supplement
  const totalScore = Object.values(dimensionScores).reduce((sum, score) => sum + score, 0);
  const avgScore = totalScore / Object.values(dimensionScores).length;

  const recommendations = [];

  if (avgScore > 50) {
    // Higher score favors Medicare Advantage
    recommendations.push({
      plan: 'medicareAdvantage',
      matchScore: avgScore,
      isPrimary: true,
      reasonsForMatch: [{ reason: 'Based on your overall preferences' }],
    });

    // Add a secondary recommendation
    recommendations.push({
      plan: 'medicareSupplement',
      matchScore: 100 - avgScore,
      isPrimary: false,
      reasonsForMatch: [{ reason: 'Alternative option to consider' }],
    });
  } else {
    // Lower score favors Medicare Supplement
    recommendations.push({
      plan: 'medicareSupplement',
      matchScore: 100 - avgScore,
      isPrimary: true,
      reasonsForMatch: [{ reason: 'Based on your overall preferences' }],
    });

    // Add a secondary recommendation
    recommendations.push({
      plan: 'medicareAdvantage',
      matchScore: avgScore,
      isPrimary: false,
      reasonsForMatch: [{ reason: 'Alternative option to consider' }],
    });
  }

  return recommendations;
}
