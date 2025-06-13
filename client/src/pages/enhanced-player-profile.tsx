import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlayerValueScorecard from "@/components/player-value-scorecard";
import AdvancedMetrics from "@/components/advanced-metrics";
import { 
  moneyBallPlayersData, 
  convertToPlayerValueMetrics,
  type MoneyBallPlayer 
} from "@/data/moneyBallPlayers";
import { type PlayerValueMetrics } from "@/lib/playerValueCalculation";
import { 
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Ruler,
  Weight,
  Activity,
  Award,
  Users,
  MessageSquare,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react";

interface Player {
  id: string;
  personalDetails: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    address: string;
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
    };
  };
  rugbyProfile: {
    jerseyNumber: number;
    primaryPosition: string;
    secondaryPositions: string[];
    playingLevel: string;
    yearsInTeam: number;
  };
  physicalAttributes: Array<{
    date: string;
    weight: number;
    height: number;
    bodyFat: number;
    leanMass: number;
  }>;
  gameStats: Array<{
    season: string;
    matchesPlayed: number;
    minutesPlayed: number;
    tries: number;
    tackles: number;
    penalties: number;
  }>;
  skills: {
    ballHandling: number;
    passing: number;
    kicking: number;
    defense: number;
    communication: number;
  };
  status: {
    fitness: string;
    medical: string;
  };
  aiRating?: {
    overall: number;
    potential: number;
  };
}

export default function EnhancedPlayerProfile() {
  const [, params] = useRoute("/player/:playerId");
  const playerId = params?.playerId;

  const { data: player, isLoading } = useQuery<Player>({
    queryKey: [`/api/players/${playerId}`],
    enabled: !!playerId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nh-red mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading player profile...</p>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Player Not Found</h2>
          <p className="text-gray-600 mb-4">The requested player profile could not be found.</p>
          <Link href="/players">
            <Button className="bg-nh-red hover:bg-nh-red-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Players
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const latestPhysical = player.physicalAttributes?.[player.physicalAttributes.length - 1];
  const latestGameStats = player.gameStats?.[player.gameStats.length - 1];
  
  // Calculate age
  const age = Math.floor((new Date().getTime() - new Date(player.personalDetails.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800 border-green-200";
      case "injured": return "bg-red-100 text-red-800 border-red-200";
      case "recovering": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available": return <CheckCircle className="w-4 h-4" />;
      case "injured": return <AlertTriangle className="w-4 h-4" />;
      case "recovering": return <Clock className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  // Convert to Player Value metrics if this player has MoneyBall data
  const moneyBallPlayer = moneyBallPlayersData.find(p => 
    p.name.toLowerCase().includes(player.personalDetails.firstName.toLowerCase()) ||
    p.name.toLowerCase().includes(player.personalDetails.lastName.toLowerCase())
  );

  let playerValueMetrics: PlayerValueMetrics | null = null;
  if (moneyBallPlayer) {
    playerValueMetrics = convertToPlayerValueMetrics(moneyBallPlayer);
  } else {
    // Create basic metrics from existing player data
    playerValueMetrics = {
      position: player.rugbyProfile.primaryPosition,
      secondaryPosition: player.rugbyProfile.secondaryPositions?.[0],
      weight: latestPhysical?.weight || 100,
      contractValue: 85000, // Sample value
      
      // Performance Metrics
      minutesPlayed: latestGameStats?.minutesPlayed || 500,
      gamesPlayed: latestGameStats?.matchesPlayed || 10,
      totalContributions: 300,
      positiveContributions: 250,
      negativeContributions: 50,
      xFactorContributions: 20,
      penaltyCount: latestGameStats?.penalties || 5,
      
      // Physical Metrics
      sprintTime10m: 1.85,
      totalCarries: 60,
      dominantCarryPercent: 8.5,
      tackleCompletionPercent: 85.0,
      breakdownSuccessPercent: 90.0,
      
      // Cohesion Factors
      attendanceScore: 9.0,
      scScore: 8.5,
      medicalScore: 9.5,
      personalityScore: 8.8
    };
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/players">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Players
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {player.personalDetails.firstName} {player.personalDetails.lastName}
                </h1>
                <p className="text-gray-600">#{player.rugbyProfile.jerseyNumber} • {player.rugbyProfile.primaryPosition}</p>
              </div>
            </div>
            <Badge className={`flex items-center gap-2 ${getStatusColor(player.status.fitness)}`}>
              {getStatusIcon(player.status.fitness)}
              {player.status.fitness}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:border-transparent data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:text-nh-red data-[state=inactive]:border-2 data-[state=inactive]:border-nh-red data-[state=inactive]:hover:border-nh-red-600 font-semibold py-3 px-6 rounded-md transition-all duration-200"
            >
              Player Profile
            </TabsTrigger>
            <TabsTrigger 
              value="value-analysis" 
              className="data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:border-transparent data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:text-nh-red data-[state=inactive]:border-2 data-[state=inactive]:border-nh-red data-[state=inactive]:hover:border-nh-red-600 font-semibold py-3 px-6 rounded-md transition-all duration-200"
            >
              Player Value Analysis
            </TabsTrigger>
            <TabsTrigger 
              value="advanced-metrics" 
              className="data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:border-transparent data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:text-nh-red data-[state=inactive]:border-2 data-[state=inactive]:border-nh-red data-[state=inactive]:hover:border-nh-red-600 font-semibold py-3 px-6 rounded-md transition-all duration-200"
            >
              Advanced Metrics
            </TabsTrigger>
          </TabsList>

          {/* Player Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal Information Card */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture */}
                  <div className="text-center">
                    <Avatar className="w-32 h-32 mx-auto mb-4">
                      <AvatarImage 
                        src={player.personalDetails?.profileImageUrl || `/api/players/${player.id}/avatar`} 
                        alt={`${player.personalDetails.firstName} ${player.personalDetails.lastName}`} 
                      />
                      <AvatarFallback className="bg-nh-red text-white text-2xl font-bold">
                        {player.personalDetails.firstName[0]}{player.personalDetails.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold">{player.personalDetails.firstName} {player.personalDetails.lastName}</h3>
                    <p className="text-gray-600">#{player.rugbyProfile.jerseyNumber}</p>
                  </div>

                  {/* Basic Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">Age: {age} years</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{player.personalDetails.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{player.rugbyProfile.playingLevel}</span>
                    </div>
                  </div>

                  {/* Contact Actions */}
                  <div className="space-y-2">
                    <Button className="w-full bg-nh-red hover:bg-nh-red-600" size="sm">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Player
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Player
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Physical & Performance Stats */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Physical & Performance Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {/* Physical Stats */}
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Ruler className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{latestPhysical?.height || 'N/A'}</div>
                      <div className="text-sm text-gray-600">Height (cm)</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Weight className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{latestPhysical?.weight || 'N/A'}</div>
                      <div className="text-sm text-gray-600">Weight (kg)</div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Activity className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{latestPhysical?.bodyFat || 'N/A'}</div>
                      <div className="text-sm text-gray-600">Body Fat (%)</div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Award className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{player.aiRating?.overall || 'N/A'}</div>
                      <div className="text-sm text-gray-600">AI Rating</div>
                    </div>
                  </div>

                  {/* Skills Breakdown */}
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-4">Skills Assessment</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(player.skills).map(([skill, rating]) => (
                        <div key={skill} className="flex items-center justify-between">
                          <span className="text-sm font-medium capitalize">{skill.replace(/([A-Z])/g, ' $1')}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-nh-red h-2 rounded-full" 
                                style={{ width: `${(rating / 10) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-bold w-8">{rating}/10</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Performance */}
                  {latestGameStats && (
                    <div className="mt-8">
                      <h4 className="text-lg font-semibold mb-4">Recent Performance ({latestGameStats.season})</h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="text-center">
                          <div className="text-xl font-bold text-gray-900">{latestGameStats.matchesPlayed}</div>
                          <div className="text-xs text-gray-600">Matches</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-gray-900">{latestGameStats.minutesPlayed}</div>
                          <div className="text-xs text-gray-600">Minutes</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-gray-900">{latestGameStats.tries}</div>
                          <div className="text-xs text-gray-600">Tries</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-gray-900">{latestGameStats.tackles}</div>
                          <div className="text-xs text-gray-600">Tackles</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-gray-900">{latestGameStats.penalties}</div>
                          <div className="text-xs text-gray-600">Penalties</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Player Value Analysis Tab */}
          <TabsContent value="value-analysis" className="space-y-6">
            {playerValueMetrics && (
              <div>
                <div className="mb-6 text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Player Value Analysis</h2>
                  <p className="text-gray-600">
                    Comprehensive assessment combining performance metrics, cohesion impact, and market value
                  </p>
                </div>
                <PlayerValueScorecard metrics={playerValueMetrics} />
              </div>
            )}
          </TabsContent>

          {/* Advanced Metrics Tab */}
          <TabsContent value="advanced-metrics" className="space-y-6">
            <AdvancedMetrics playerId={playerId} player={player} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}