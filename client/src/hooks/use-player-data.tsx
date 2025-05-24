import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import type { Player } from "@shared/schema";

export function usePlayerData(playerId: string) {
  return useQuery({
    queryKey: ['/api/players', playerId],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: !!playerId,
    staleTime: 30 * 1000, // 30 seconds
    retry: 2
  });
}
