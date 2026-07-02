import { AsyncLocalStorage } from 'async_hooks';

export type RequestContextType = {
  requestId: string;
};

export const requestContext = new AsyncLocalStorage<RequestContextType>();

// Helper to read requestId anywhere
export function getRequestId(): string | undefined {
  return requestContext.getStore()?.requestId;
}
