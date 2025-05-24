import { useQuery } from "@tanstack/react-query";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@shared/firebase";
import type { Player } from "@shared/schema";
import { useEffect, useState } from "react";

export function usePlayerData(playerId: string) {
  const [player, setPlayer] = useState<Player | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!playerId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    // For demo purposes, we'll use static data
    // In production, this would be a Firebase listener
    const loadPlayerData = () => {
      try {
        // Static player data for demonstration
        const staticPlayers: Record<string, Player> = {
          "james-mitchell": {
            id: "james-mitchell",
            personalDetails: {
              firstName: "James",
              lastName: "Mitchell",
              dateOfBirth: "2001-03-15",
              email: "james.mitchell@northharbour.rugby",
              phone: "+64 21 123 4567",
              address: "123 Rugby Street, Auckland",
              emergencyContact: {
                name: "Sarah Mitchell",
                relationship: "Mother",
                phone: "+64 21 765 4321"
              }
            },
            rugbyProfile: {
              jerseyNumber: 7,
              primaryPosition: "Flanker",
              secondaryPositions: ["Number 8", "Lock"],
              playingLevel: "Professional",
              yearsInTeam: 3,
              previousClubs: ["Auckland Grammar", "Auckland U19"]
            },
            physicalAttributes: [
              {
                date: "2024-01-15",
                weight: 103,
                bodyFat: 9.0,
                leanMass: 93.7,
                height: 188
              },
              {
                date: "2024-02-15",
                weight: 104,
                bodyFat: 8.5,
                leanMass: 95.2,
                height: 188
              },
              {
                date: "2024-03-15",
                weight: 105,
                bodyFat: 8.2,
                leanMass: 96.4,
                height: 188
              }
            ],
            testResults: [
              {
                date: "2024-03-10",
                testType: "bench_press",
                value: 130,
                unit: "kg"
              },
              {
                date: "2024-03-10",
                testType: "squat",
                value: 185,
                unit: "kg"
              },
              {
                date: "2024-03-10",
                testType: "sprint_40m",
                value: 5.1,
                unit: "s"
              },
              {
                date: "2024-03-10",
                testType: "yo_yo",
                value: 18.2,
                unit: "level"
              },
              {
                date: "2024-03-10",
                testType: "vo2_max",
                value: 58.2,
                unit: "ml/kg/min"
              }
            ],
            skills: {
              ballHandling: 8,
              passing: 7,
              kicking: 6,
              lineoutThrowing: 5,
              scrummaging: 7,
              rucking: 9,
              defense: 8,
              communication: 7
            },
            gameStats: [
              {
                season: "2023",
                matchesPlayed: 12,
                minutesPlayed: 1058,
                tries: 4,
                tackles: 128,
                lineoutWins: 32,
                turnovers: 18,
                penalties: 8
              },
              {
                season: "2024",
                matchesPlayed: 14,
                minutesPlayed: 1247,
                tries: 6,
                tackles: 142,
                lineoutWins: 38,
                turnovers: 23,
                penalties: 6
              }
            ],
            injuries: [],
            reports: [
              {
                id: "r1",
                type: "coach",
                title: "Performance Review - March 2024",
                content: "Excellent progress in lineout work...",
                author: "Coach Thompson",
                date: "2024-03-15",
                lastUpdated: "2024-03-15"
              },
              {
                id: "r2",
                type: "medical",
                title: "Medical Clearance",
                content: "Cleared for full contact...",
                author: "Dr. Smith",
                date: "2024-03-08",
                lastUpdated: "2024-03-08"
              }
            ],
            activities: [
              {
                id: "a1",
                date: "2024-03-20",
                type: "test",
                description: "Physical Test Completed",
                details: "Strength & conditioning assessment"
              },
              {
                id: "a2",
                date: "2024-03-18",
                type: "match",
                description: "Match Performance",
                details: "75 minutes vs Auckland"
              },
              {
                id: "a3",
                date: "2024-03-15",
                type: "meeting",
                description: "Coach Review",
                details: "Performance feedback session"
              }
            ],
            status: {
              fitness: "available",
              medical: "cleared"
            },
            aiRating: {
              overall: 87,
              physicality: 92,
              skillset: 85,
              gameImpact: 89,
              potential: 84,
              lastUpdated: "2024-03-20"
            }
          }
        };

        const playerData = staticPlayers[playerId];
        
        if (playerData) {
          setPlayer(playerData);
        } else {
          throw new Error("Player not found");
        }
        
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    // Simulate loading delay
    const timeout = setTimeout(loadPlayerData, 500);

    return () => clearTimeout(timeout);
  }, [playerId]);

  const refetch = () => {
    setIsLoading(true);
    setError(null);
    // Trigger re-fetch logic here
    setTimeout(() => setIsLoading(false), 500);
  };

  return {
    data: player,
    isLoading,
    error,
    refetch
  };
}
