import { QueryClient } from "@tanstack/react-query";

export function generateQueryClient(): QueryClient {
  return new QueryClient();
}

export const queryClient = generateQueryClient();
