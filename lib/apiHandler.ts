import { NextResponse } from 'next/server';

/**
 * Wraps an API route handler so that any thrown error (including MongoDB
 * connection failures) returns a clean JSON error response instead of
 * crashing the Next.js server process.
 */
export function withErrorHandling<T extends (...args: any[]) => Promise<NextResponse>>(
  handler: T
): T {
  return (async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (err: any) {
      console.error('[API ERROR]', err?.message || err);

      const isDbError =
        err?.name === 'MongooseServerSelectionError' ||
        err?.message?.includes('MONGODB_URI') ||
        err?.message?.includes('buffering timed out') ||
        err?.name === 'MongoNetworkError';

      return NextResponse.json(
        {
          error: isDbError
            ? 'Database temporarily unavailable. Please try again shortly.'
            : 'Something went wrong. Please try again.',
          detail: err?.message || String(err),
        },
        { status: isDbError ? 503 : 500 }
      );
    }
  }) as T;
}
