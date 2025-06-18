import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Trophy, Clock, ArrowLeft, Home, Target } from "lucide-react";
import logoPath from "@assets/menulogo_wo.png";

// Sample season matches data
const seasonMatches = [
  {
    id: "nh_vs_auckland_2024",
    round: "Round 1",
    homeTeam: "North Harbour",
    awayTeam: "Auckland",
    date: "Saturday 1 June 2024",
    time: "2:35 PM",
    venue: "North Harbour Stadium",
    status: "completed" as const,
    result: { homeScore: 32, awayScore: 24, outcome: "win" as const },
    competition: "NPC"
  },
  {
    id: "canterbury_vs_nh_2024",
    round: "Round 2", 
    homeTeam: "Canterbury",
    awayTeam: "North Harbour",
    date: "Friday 7 June 2024",
    time: "7:05 PM",
    venue: "Orangetheory Stadium",
    status: "completed" as const,
    result: { homeScore: 18, awayScore: 25, outcome: "loss" as const },
    competition: "NPC"
  },
  {
    id: "nh_vs_otago_2024",
    round: "Round 3",
    homeTeam: "North Harbour",
    awayTeam: "Otago",
    date: "Saturday 15 June 2024",
    time: "2:35 PM",
    venue: "North Harbour Stadium",
    status: "completed" as const,
    result: { homeScore: 41, awayScore: 17, outcome: "win" as const },
    competition: "NPC"
  },
  {
    id: "tasman_vs_nh_2024",
    round: "Round 4",
    homeTeam: "Tasman",
    awayTeam: "North Harbour",
    date: "Saturday 22 June 2024",
    time: "4:35 PM",
    venue: "Trafalgar Park",
    status: "completed" as const,
    result: { homeScore: 31, awayScore: 28, outcome: "loss" as const },
    competition: "NPC"
  },
  {
    id: "nh_vs_wellington_2024",
    round: "Round 5",
    homeTeam: "North Harbour",
    awayTeam: "Wellington",
    date: "Saturday 29 June 2024",
    time: "2:35 PM",
    venue: "North Harbour Stadium",
    status: "upcoming" as const,
    competition: "NPC"
  },
  {
    id: "waikato_vs_nh_2024",
    round: "Round 6",
    homeTeam: "Waikato",
    awayTeam: "North Harbour",
    date: "Saturday 6 July 2024",
    time: "7:05 PM",
    venue: "FMG Stadium Waikato",
    status: "upcoming" as const,
    competition: "NPC"
  }
];

export default function MatchList() {
  const [selectedSeason, setSelectedSeason] = useState("2024");

  const getMatchResult = (match: typeof seasonMatches[0]) => {
    if (match.status !== "completed" || !match.result) return null;
    
    const isNorthHarbourHome = match.homeTeam === "North Harbour";
    const northHarbourScore = isNorthHarbourHome ? match.result.homeScore : match.result.awayScore;
    const opponentScore = isNorthHarbourHome ? match.result.awayScore : match.result.homeScore;
    
    return {
      northHarbourScore,
      opponentScore,
      outcome: match.result.outcome
    };
  };

  const getOpponent = (match: typeof seasonMatches[0]) => {
    return match.homeTeam === "North Harbour" ? match.awayTeam : match.homeTeam;
  };

  const MatchCard = ({ match }: { match: typeof seasonMatches[0] }) => {
    const result = getMatchResult(match);
    const opponent = getOpponent(match);
    const isHome = match.homeTeam === "North Harbour";

    return (
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
        <Link href={`/match-performance/${match.id}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {match.round}
              </Badge>
              {match.status === "completed" && result && (
                <Badge 
                  variant={result.outcome === "win" ? "default" : "destructive"}
                  className={result.outcome === "win" 
                    ? "bg-green-100 text-green-800 hover:bg-green-200" 
                    : "bg-red-100 text-red-800 hover:bg-red-200"
                  }
                >
                  {result.outcome === "win" ? "WIN" : "LOSS"}
                </Badge>
              )}
            </div>
            
            <CardTitle className="text-lg">
              <div className="flex items-center gap-2">
                <span className="font-bold text-nh-red">North Harbour</span>
                <span className="text-gray-400">vs</span>
                <span>{opponent}</span>
                {isHome && <Badge variant="outline" className="text-xs ml-2">Home</Badge>}
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              {match.date}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              {match.time}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              {match.venue}
              {!isHome && <Badge variant="outline" className="text-xs">Away</Badge>}
            </div>
            
            {match.status === "completed" && result && (
              <div className="pt-2 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {result.northHarbourScore} - {result.opponentScore}
                  </div>
                  <div className="text-sm text-gray-600">Final Score</div>
                </div>
              </div>
            )}
            
            <div className="pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full group-hover:bg-red-50 group-hover:border-red-200"
              >
                <Target className="h-4 w-4 mr-2" />
                View Match Analytics
              </Button>
            </div>
          </CardContent>
        </Link>
      </Card>
    );
  };

  const completedMatches = seasonMatches.filter(m => m.status === "completed");
  const upcomingMatches = seasonMatches.filter(m => m.status === "upcoming");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-nh-red text-white p-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/analytics">
                <Button variant="ghost" className="text-white hover:bg-nh-red-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Analytics
                </Button>
              </Link>
              <img src={logoPath} alt="North Harbour Rugby" className="h-10 w-10" />
              <div>
                <h1 className="text-2xl font-bold">Match Performance Analytics</h1>
                <div className="flex items-center gap-2 text-sm text-nh-red-200">
                  <Link href="/team" className="hover:text-white">Coaching Portal</Link>
                  <span>›</span>
                  <Link href="/analytics" className="hover:text-white">Analytics</Link>
                  <span>›</span>
                  <span className="text-white">Match Performance</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/team">
                <Button variant="outline" className="text-nh-red bg-white hover:bg-gray-100">
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-6">
        {/* Season Header */}
        <Card className="bg-gradient-to-r from-red-800 to-red-900 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">2024 NPC Season</h1>
                <p className="text-lg opacity-90">
                  Select a match to view detailed performance analytics and try analysis
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{completedMatches.filter(m => {
                  const result = getMatchResult(m);
                  return result?.outcome === "win";
                }).length}W - {completedMatches.filter(m => {
                  const result = getMatchResult(m);
                  return result?.outcome === "loss";
                }).length}L</div>
                <div className="text-sm opacity-80">Season Record</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Match Lists */}
        <Tabs defaultValue="completed" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Completed Matches ({completedMatches.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming Fixtures ({upcomingMatches.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="completed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}