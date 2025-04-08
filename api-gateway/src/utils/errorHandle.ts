import {HttpErrors} from '@loopback/rest';

export function handleError(error: any, customMessage: string): string {
  if (error.response) {
    if (error.response.status === 404) {
      throw new HttpErrors.NotFound(
        error.response.data.message || customMessage,
      );
    }
    if (error.response.status === 500) {
      throw new HttpErrors.InternalServerError(
        error.response.data.message || customMessage,
      );
    }
    console.error(`API Response Error:`, error.response.data);
    return `${customMessage}: ${error.response.data.message || error.response.data}`;
  } else if (error.request) {
    console.error('No response received:', error.request);
    return `${customMessage}: No response from the server. Please try again later.`;
  } else {
    console.error('Request Error:', error.message);
    return `${customMessage}: Unexpected error occurred: ${error.message}`;
  }
}
