import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@shared/firebase";
import type { PlayerSummary } from "@shared/types";

interface PlayerSelectorProps {
  selectedPlayerId: string;
  onPlayerChange: (playerId: string) => void;
}

export default function PlayerSelector({ selectedPlayerId, onPlayerChange }: PlayerSelectorProps) {
  const [players, setPlayers] = useState<PlayerSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        // In a real app, this would fetch from Firebase
        // For now, we'll use static data
        const staticPlayers: PlayerSummary[] = [
          { id: "james-mitchell", name: "James Mitchell", position: "Flanker", jerseyNumber: 7, status: "available" },
          { id: "tom-wilson", name: "Tom Wilson", position: "Fly Half", jerseyNumber: 10, status: "available" },
          { id: "mike-stevens", name: "Mike Stevens", position: "Prop", jerseyNumber: 3, status: "injured" },
          { id: "alex-brown", name: "Alex Brown", position: "Centre", jerseyNumber: 12, status: "available" },
        ];
        
        setPlayers(staticPlayers);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div>
      <Label className="block text-sm font-medium text-slate-700 mb-2">
        Select Player
      </Label>
      <Select value={selectedPlayerId} onValueChange={onPlayerChange} disabled={loading}>
        <SelectTrigger className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2">
          <SelectValue placeholder={loading ? "Loading players..." : "Select a player"} />
        </SelectTrigger>
        <SelectContent>
          {players.map((player) => (
            <SelectItem key={player.id} value={player.id}>
              <div className="flex items-center space-x-2">
                <span>{player.name} - {player.position}</span>
                <span className="text-xs text-slate-500">#{player.jerseyNumber}</span>
                {player.status !== 'available' && (
                  <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                    {player.status}
                  </span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
