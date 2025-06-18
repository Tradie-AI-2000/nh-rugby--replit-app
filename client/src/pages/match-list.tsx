import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import logoPath from "@assets/menulogo_wo.png";

// Match fixtures data with stats matching the image format
const matchFixtures = [
  {
    id: "nh_vs_auckland_2024",
    opponent: "Auckland",
    date: "June 1, 2024",
    competition: "NPC",
    score: "32-24",
    result: "Win",
    stats: {
      possession: "43%",
      territory: "49%", 
      tackles: "86%"
    }
  },
  {
    id: "canterbury_vs_nh_2024",
    opponent: "Canterbury", 
    date: "May 25, 2024",
    competition: "NPC",
    score: "18-31",
    result: "Loss",
    stats: {
      possession: "38%",
      territory: "42%",
      tackles: "82%"
    }
  },
  {
    id: "nh_vs_otago_2024",
    opponent: "Otago",
    date: "May 18, 2024", 
    competition: "NPC",
    score: "28-21",
    result: "Win",
    stats: {
      possession: "51%",
      territory: "55%",
      tackles: "88%"
    }
  },
  {
    id: "nh_vs_wellington_2024",
    opponent: "Wellington",
    date: "May 11, 2024",
    competition: "NPC", 
    score: "35-17",
    result: "Win",
    stats: {
      possession: "58%",
      territory: "61%",
      tackles: "91%"
    }
  },
  {
    id: "tasman_vs_nh_2024",
    opponent: "Tasman",
    date: "May 4, 2024",
    competition: "NPC",
    score: "22-29", 
    result: "Loss",
    stats: {
      possession: "45%",
      territory: "47%",
      tackles: "79%"
    }
  },
  {
    id: "nh_vs_hawkes_bay_2024",
    opponent: "Hawke's Bay",
    date: "April 27, 2024",
    competition: "NPC",
    score: "41-19",
    result: "Win", 
    stats: {
      possession: "62%",
      territory: "65%",
      tackles: "93%"
    }
  }
];

export default function MatchList() {
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
                  <Link href="/team/overview" className="hover:text-white">Coaching Portal</Link>
                  <span>›</span>
                  <Link href="/analytics" className="hover:text-white">Analytics</Link>
                  <span>›</span>
                  <span className="text-white">Match Fixtures</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/team/overview">
                <Button variant="outline" className="text-nh-red bg-white hover:bg-gray-100">
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* Season Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">2024 NPC Season Fixtures</h1>
          <p className="text-lg text-gray-600">
            Select a match to view detailed performance analytics and try analysis
          </p>
        </div>

        {/* Match Fixtures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchFixtures.map((match) => (
            <Link key={match.id} href={`/analytics/match-list/match-performance/${match.id}`}>
              <Card className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 ${
                match.result === "Win" 
                  ? "border-green-200 bg-green-50 hover:border-green-300" 
                  : "border-red-200 bg-red-50 hover:border-red-300"
              }`}>
                <CardContent className="p-4">
                  {/* Header with opponent and result */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      vs {match.opponent}
                    </h3>
                    <Badge 
                      variant={match.result === "Win" ? "default" : "destructive"}
                      className={match.result === "Win" 
                        ? "bg-green-600 hover:bg-green-700 text-white font-semibold" 
                        : "bg-red-600 hover:bg-red-700 text-white font-semibold"
                      }
                    >
                      {match.result}
                    </Badge>
                  </div>

                  {/* Date and competition */}
                  <div className="text-sm text-gray-600 mb-4">
                    {match.date} • {match.competition}
                  </div>

                  {/* Score */}
                  <div className={`text-3xl font-bold mb-4 ${
                    match.result === "Win" ? "text-green-600" : "text-red-600"
                  }`}>
                    {match.score}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-gray-900">
                        {match.stats.possession}
                      </div>
                      <div className="text-xs text-gray-600">Possession</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">
                        {match.stats.territory}
                      </div>
                      <div className="text-xs text-gray-600">Territory</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">
                        {match.stats.tackles}
                      </div>
                      <div className="text-xs text-gray-600">Tackles</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Season Summary */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2">
                {matchFixtures.filter(m => m.result === "Win").length}
              </div>
              <div className="text-lg">Wins</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2">
                {matchFixtures.filter(m => m.result === "Loss").length}
              </div>
              <div className="text-lg">Losses</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2">
                {Math.round((matchFixtures.filter(m => m.result === "Win").length / matchFixtures.length) * 100)}%
              </div>
              <div className="text-lg">Win Rate</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}