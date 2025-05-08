import { getPayload } from 'payload';
import config from '@/payload.config';

// Cache the payload instance
let cachedPayload: any = null;

export async function initializePayload() {
  if (cachedPayload) {
    return cachedPayload;
  }

  try {
    cachedPayload = await getPayload({
      config,
      // Add options here if needed
    });

    return cachedPayload;
  } catch (error) {
    console.error('Error initializing Payload:', error);
    throw error;
  }
}
