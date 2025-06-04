import { useQuery } from "@tanstack/react-query";
import type { Player } from "@shared/schema";

export function usePlayerData(playerId: string) {
  return useQuery<Player>({
    queryKey: [`/api/players/${playerId}`],
    enabled: !!playerId,
  });
}