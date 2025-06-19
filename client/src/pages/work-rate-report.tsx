import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import logoPath from "@assets/menulogo_wo.png";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  Activity,
  Target,
  Zap,
  Clock,
  TrendingUp,
  Users,
  Heart,
  MapPin,
  Timer,
  BarChart3,
  Shield,
  Gauge,
  AlertTriangle,
  CheckCircle,
  Trophy
} from "lucide-react";

// Sample match data based on the OPTA report
const matchData = {
  match: "Bunnings NPC - North Harbour vs Hawke's Bay",
  date: "Sunday, 11 August 2024",
  venue: "North Harbour Stadium",
  finalScore: "NH 32 - 41 HB",
  possession: { nh: 43, hb: 57 },
  territory: { nh: 49, hb: 51 },
  ballInPlay: "36:28"
};

// Integrated work rate data combining OPTA stats with GPS metrics
const playerWorkRateData = [
  {
    id: "kalolo_tuiloma",
    name: "Kalolo Tuiloma",
    position: "Hooker",
    jerseyNumber: 2,
    minutesPlayed: 48,
    optaStats: {
      lineoutSuccess: "7/7 (100%)",
      tackleSuccess: "11/11 (100%)",
      carries: 5,
      metresCarried: 11,
      turnoversWon: 1
    },
    gpsMetrics: {
      totalDistance: 4500,
      distancePerMinute: 93.8,
      highSpeedRunning: 150,
      highMetabolicLoad: 650,
      accelerations: 35,
      dynamicStressLoad: 550,
      timeInRedZone: 18,
      maxSpeed: 28.5
    },
    workRateAnalysis: "High HMLD relative to HSR confirms work in explosive bursts around scrum and breakdown. Perfect tackle stats and lineout performance show efficiency under pressure."
  },
  {
    id: "karl_ruzich",
    name: "Karl Ruzich",
    position: "Openside Flanker",
    jerseyNumber: 7,
    minutesPlayed: 80,
    optaStats: {
      tackles: 22,
      tackleSuccess: "22/24 (92%)",
      carries: 10,
      metresCarried: 79,
      tries: 1,
      cleanBreaks: 1,
      passes: 6
    },
    gpsMetrics: {
      totalDistance: 7200,
      distancePerMinute: 90.0,
      highSpeedRunning: 750,
      highMetabolicLoad: 1100,
      accelerations: 45,
      dynamicStressLoad: 780,
      timeInRedZone: 35,
      maxSpeed: 32.1
    },
    workRateAnalysis: "Team-leading tackles correlate with exceptional DSL and Red Zone time. High HSR and HMLD show dual capability in covering ground and contest involvement."
  },
  {
    id: "shaun_stevenson",
    name: "Shaun Stevenson",
    position: "Fullback",
    jerseyNumber: 15,
    minutesPlayed: 80,
    optaStats: {
      metresCarried: 187,
      tries: 1,
      cleanBreaks: 4,
      defendersBeaten: 10,
      tackleSuccess: "5/5 (100%)",
      kicks: 8
    },
    gpsMetrics: {
      totalDistance: 8100,
      distancePerMinute: 101.3,
      highSpeedRunning: 1200,
      highMetabolicLoad: 950,
      accelerations: 38,
      dynamicStressLoad: 720,
      timeInRedZone: 30,
      maxSpeed: 35.5,
      sprints: 30
    },
    workRateAnalysis: "Exceptional distance per minute and massive HSR reflect backfield coverage and counter-attack involvement. Max speed achieved during clean breaks shows game-changing pace."
  },
  {
    id: "tane_edmed",
    name: "Tane Edmed",
    position: "Fly Half",
    jerseyNumber: 10,
    minutesPlayed: 66,
    optaStats: {
      conversions: "2/2 (100%)",
      penaltyGoals: "1/1 (100%)",
      passes: 28,
      tackles: 8,
      tackleSuccess: "8/10 (80%)",
      kicks: 12
    },
    gpsMetrics: {
      totalDistance: 5800,
      distancePerMinute: 87.9,
      highSpeedRunning: 480,
      highMetabolicLoad: 820,
      accelerations: 32,
      dynamicStressLoad: 610,
      timeInRedZone: 22,
      maxSpeed: 29.8
    },
    workRateAnalysis: "High HMLD indicates involvement in structured play and defensive line positioning. Perfect goal kicking under pressure despite significant physical load."
  },
  {
    id: "felix_kalapu",
    name: "Felix Kalapu",
    position: "Lock",
    jerseyNumber: 5,
    minutesPlayed: 18,
    optaStats: {
      lineoutWins: 3,
      tackles: 6,
      tackleSuccess: "6/7 (86%)",
      carries: 3,
      metresCarried: 8
    },
    gpsMetrics: {
      totalDistance: 1650,
      distancePerMinute: 91.7,
      highSpeedRunning: 85,
      highMetabolicLoad: 290,
      accelerations: 12,
      dynamicStressLoad: 195,
      timeInRedZone: 8,
      maxSpeed: 26.4
    },
    workRateAnalysis: "Strong distance per minute despite limited playing time. High tackle success rate and lineout involvement show impact in key moments."
  }
];

const teamWorkRateMetrics = {
  totalDistance: 31250,
  averageDistancePerMinute: 92.8,
  totalHighSpeedRunning: 2665,
  totalAccelerations: 162,
  averageDynamicStressLoad: 571,
  averageTimeInRedZone: 22.6
};

export default function WorkRateReport() {
  const [selectedPlayer, setSelectedPlayer] = useState(playerWorkRateData[0]);
  const [activeTab, setActiveTab] = useState("overview");

  const getWorkRateGrade = (dsl: number) => {
    if (dsl >= 700) return { grade: "A+", color: "bg-green-500", description: "Elite" };
    if (dsl >= 600) return { grade: "A", color: "bg-green-400", description: "Excellent" };
    if (dsl >= 500) return { grade: "B", color: "bg-yellow-400", description: "Good" };
    if (dsl >= 400) return { grade: "C", color: "bg-orange-400", description: "Average" };
    return { grade: "D", color: "bg-red-400", description: "Below Average" };
  };

  const getEfficiencyRating = (optaContributions: number, dsl: number) => {
    const efficiency = (optaContributions / dsl) * 1000;
    if (efficiency >= 15) return { rating: "Very High", color: "text-green-600" };
    if (efficiency >= 12) return { rating: "High", color: "text-green-500" };
    if (efficiency >= 9) return { rating: "Moderate", color: "text-yellow-600" };
    if (efficiency >= 6) return { rating: "Low", color: "text-orange-600" };
    return { rating: "Very Low", color: "text-red-600" };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-nh-red text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/analytics">
                <Button variant="ghost" size="sm" className="text-white hover:bg-red-700">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Analytics
                </Button>
              </Link>
              <img 
                src={logoPath} 
                alt="North Harbour Rugby" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold">Work Rate Report</h1>
                <div className="flex items-center gap-2 text-sm text-nh-red-200">
                  <Link href="/" className="hover:text-white">Home</Link>
                  <span>›</span>
                  <Link href="/analytics" className="hover:text-white">Analytics</Link>
                  <span>›</span>
                  <span className="text-white">Work Rate Report</span>
                </div>
                <p className="text-red-100 text-sm mt-1">Integrated OPTA & GPS Analysis</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-red-100">{matchData.match}</div>
              <div className="text-xs text-red-200">{matchData.date} • {matchData.venue}</div>
              <Badge className="mt-1 bg-red-700 text-white">{matchData.finalScore}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Match Overview</TabsTrigger>
            <TabsTrigger value="individual">Individual Analysis</TabsTrigger>
            <TabsTrigger value="team">Team Metrics</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Match Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Trophy className="mx-auto mb-3 text-nh-red" size={32} />
                  <div className="text-2xl font-bold text-gray-900">{matchData.finalScore}</div>
                  <div className="text-sm text-gray-600">Final Score</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Timer className="mx-auto mb-3 text-blue-600" size={32} />
                  <div className="text-2xl font-bold text-gray-900">{matchData.ballInPlay}</div>
                  <div className="text-sm text-gray-600">Ball in Play</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Activity className="mx-auto mb-3 text-green-600" size={32} />
                  <div className="text-2xl font-bold text-gray-900">{matchData.possession.nh}%</div>
                  <div className="text-sm text-gray-600">NH Possession</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <MapPin className="mx-auto mb-3 text-purple-600" size={32} />
                  <div className="text-2xl font-bold text-gray-900">{matchData.territory.nh}%</div>
                  <div className="text-sm text-gray-600">NH Territory</div>
                </CardContent>
              </Card>
            </div>

            {/* Key Performance Indicators Definition */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-nh-red" />
                  Integrated Work Rate KPIs
                </CardTitle>
                <CardDescription>
                  Combining OPTA match events with GPS tracking data for comprehensive performance analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">OPTA Match Events</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-nh-red rounded-full"></div>
                        <span>Carries, Tackles, Metres</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-nh-red rounded-full"></div>
                        <span>Clean Breaks, Defenders Beaten</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-nh-red rounded-full"></div>
                        <span>Set Piece Success Rates</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">GPS Tracking Metrics</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Total Distance & Distance/Min</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>High Speed Running (above 20km/h)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>High Metabolic Load Distance</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">Integrated Analysis</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Dynamic Stress Load (DSL)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Time in Red Zone (&gt;85% HR)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Work Rate Efficiency Rating</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performers Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-nh-red" />
                  Match Work Rate Leaders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-gray-800">Highest Dynamic Stress Load</h4>
                    <div className="space-y-2">
                      {playerWorkRateData
                        .sort((a, b) => b.gpsMetrics.dynamicStressLoad - a.gpsMetrics.dynamicStressLoad)
                        .slice(0, 3)
                        .map((player, index) => (
                          <div key={player.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">#{player.jerseyNumber}</Badge>
                              <span className="text-sm font-medium">{player.name}</span>
                            </div>
                            <span className="text-sm font-bold text-nh-red">{player.gpsMetrics.dynamicStressLoad}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3 text-gray-800">Most Distance Covered</h4>
                    <div className="space-y-2">
                      {playerWorkRateData
                        .sort((a, b) => b.gpsMetrics.totalDistance - a.gpsMetrics.totalDistance)
                        .slice(0, 3)
                        .map((player, index) => (
                          <div key={player.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">#{player.jerseyNumber}</Badge>
                              <span className="text-sm font-medium">{player.name}</span>
                            </div>
                            <span className="text-sm font-bold text-blue-600">{player.gpsMetrics.totalDistance}m</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 text-gray-800">Highest Work Rate Intensity</h4>
                    <div className="space-y-2">
                      {playerWorkRateData
                        .sort((a, b) => b.gpsMetrics.distancePerMinute - a.gpsMetrics.distancePerMinute)
                        .slice(0, 3)
                        .map((player, index) => (
                          <div key={player.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">#{player.jerseyNumber}</Badge>
                              <span className="text-sm font-medium">{player.name}</span>
                            </div>
                            <span className="text-sm font-bold text-green-600">{player.gpsMetrics.distancePerMinute} m/min</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="individual" className="space-y-6">
            {/* Player Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Player for Detailed Analysis</CardTitle>
                <CardDescription>Choose a player to view their integrated work rate report</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {playerWorkRateData.map((player) => {
                    const workRateGrade = getWorkRateGrade(player.gpsMetrics.dynamicStressLoad);
                    return (
                      <Card 
                        key={player.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedPlayer.id === player.id ? 'ring-2 ring-nh-red bg-red-50' : ''
                        }`}
                        onClick={() => setSelectedPlayer(player)}
                      >
                        <CardContent className="p-4 text-center">
                          <Badge className="mb-2" variant="outline">#{player.jerseyNumber}</Badge>
                          <div className="font-semibold text-sm">{player.name}</div>
                          <div className="text-xs text-gray-600 mb-2">{player.position}</div>
                          <div className={`inline-flex px-2 py-1 rounded text-xs text-white ${workRateGrade.color}`}>
                            {workRateGrade.grade}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Selected Player Analysis */}
            {selectedPlayer && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Player Overview */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>#{selectedPlayer.jerseyNumber} {selectedPlayer.name}</span>
                      <Badge variant="outline">{selectedPlayer.position}</Badge>
                    </CardTitle>
                    <CardDescription>{selectedPlayer.minutesPlayed} minutes played</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className={`inline-flex px-4 py-2 rounded-lg text-white ${getWorkRateGrade(selectedPlayer.gpsMetrics.dynamicStressLoad).color}`}>
                        <span className="text-2xl font-bold">{getWorkRateGrade(selectedPlayer.gpsMetrics.dynamicStressLoad).grade}</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {getWorkRateGrade(selectedPlayer.gpsMetrics.dynamicStressLoad).description} Work Rate
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Dynamic Stress Load</span>
                        <span className="font-bold">{selectedPlayer.gpsMetrics.dynamicStressLoad}</span>
                      </div>
                      <Progress value={(selectedPlayer.gpsMetrics.dynamicStressLoad / 800) * 100} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Distance/Minute</span>
                        <span className="font-bold">{selectedPlayer.gpsMetrics.distancePerMinute} m/min</span>
                      </div>
                      <Progress value={(selectedPlayer.gpsMetrics.distancePerMinute / 110) * 100} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Time in Red Zone</span>
                        <span className="font-bold">{selectedPlayer.gpsMetrics.timeInRedZone} min</span>
                      </div>
                      <Progress value={(selectedPlayer.gpsMetrics.timeInRedZone / selectedPlayer.minutesPlayed) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* OPTA Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-nh-red" />
                      OPTA Match Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(selectedPlayer.optaStats).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* GPS Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-600" />
                      GPS Tracking Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total Distance</span>
                        <span className="font-medium">{selectedPlayer.gpsMetrics.totalDistance}m</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">High Speed Running</span>
                        <span className="font-medium">{selectedPlayer.gpsMetrics.highSpeedRunning}m</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">High Metabolic Load</span>
                        <span className="font-medium">{selectedPlayer.gpsMetrics.highMetabolicLoad}m</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Accelerations</span>
                        <span className="font-medium">{selectedPlayer.gpsMetrics.accelerations}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Max Speed</span>
                        <span className="font-medium">{selectedPlayer.gpsMetrics.maxSpeed} km/h</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Work Rate Analysis */}
            {selectedPlayer && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    Integrated Work Rate Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <p className="text-gray-800 leading-relaxed">
                      {selectedPlayer.workRateAnalysis}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            {/* Team Work Rate Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Activity className="mx-auto mb-3 text-nh-red" size={32} />
                  <div className="text-2xl font-bold text-gray-900">{teamWorkRateMetrics.totalDistance}m</div>
                  <div className="text-sm text-gray-600">Total Team Distance</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Gauge className="mx-auto mb-3 text-blue-600" size={32} />
                  <div className="text-2xl font-bold text-gray-900">{teamWorkRateMetrics.averageDistancePerMinute}</div>
                  <div className="text-sm text-gray-600">Avg Distance/Min</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="mx-auto mb-3 text-red-600" size={32} />
                  <div className="text-2xl font-bold text-gray-900">{teamWorkRateMetrics.averageTimeInRedZone}</div>
                  <div className="text-sm text-gray-600">Avg Red Zone Time (min)</div>
                </CardContent>
              </Card>
            </div>

            {/* Positional Comparisons */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-nh-red" />
                  Positional Work Rate Comparison
                </CardTitle>
                <CardDescription>Average metrics by position group</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Forwards vs Backs */}
                  <div>
                    <h4 className="font-medium mb-4">Forwards vs Backs Work Rate Profiles</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h5 className="font-medium text-gray-800">Forwards (Avg)</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Distance/Min:</span>
                            <span className="font-medium">91.2 m/min</span>
                          </div>
                          <div className="flex justify-between">
                            <span>HMLD Ratio:</span>
                            <span className="font-medium">High (65%)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>HSR Ratio:</span>
                            <span className="font-medium">Low (35%)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Avg DSL:</span>
                            <span className="font-medium">485</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h5 className="font-medium text-gray-800">Backs (Avg)</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Distance/Min:</span>
                            <span className="font-medium">94.6 m/min</span>
                          </div>
                          <div className="flex justify-between">
                            <span>HMLD Ratio:</span>
                            <span className="font-medium">Moderate (45%)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>HSR Ratio:</span>
                            <span className="font-medium">High (55%)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Avg DSL:</span>
                            <span className="font-medium">665</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Efficiency Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  Team Work Rate Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">162</div>
                    <div className="text-sm text-gray-600">Total Accelerations</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">2,665m</div>
                    <div className="text-sm text-gray-600">Team HSR Distance</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">571</div>
                    <div className="text-sm text-gray-600">Avg DSL</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">22.6</div>
                    <div className="text-sm text-gray-600">Avg Red Zone (min)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            {/* AI-Generated Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  Performance Insights & Recommendations
                </CardTitle>
                <CardDescription>AI-generated analysis based on integrated work rate data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded">
                    <h4 className="font-semibold text-amber-900 mb-2">High Load Alert</h4>
                    <p className="text-amber-800 text-sm">
                      Karl Ruzich (780 DSL) and Shaun Stevenson (720 DSL) showed exceptional work rates but may require additional recovery protocols. Monitor training load carefully this week.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                    <h4 className="font-semibold text-blue-900 mb-2">Tactical Insight</h4>
                    <p className="text-blue-800 text-sm">
                      High HMLD distances in forwards indicate effective work in tight spaces, but low HSR suggests missed opportunities in transition play. Consider breakdown exit strategies.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
                    <h4 className="font-semibold text-green-900 mb-2">Positive Pattern</h4>
                    <p className="text-green-800 text-sm">
                      Tane Edmed's perfect goal kicking despite significant physical load (610 DSL) demonstrates excellent composure under pressure. This skill-execution under fatigue is exemplary.
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded">
                    <h4 className="font-semibold text-purple-900 mb-2">Recovery Recommendation</h4>
                    <p className="text-purple-800 text-sm">
                      Players with more than 30 minutes in Red Zone (Ruzich, Stevenson) should prioritize hydration, sleep quality, and potentially modified training loads for 48-72 hours post-match.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Action Items for Coaching Staff
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-nh-red rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Review Breakdown Exit Strategy</h4>
                      <p className="text-sm text-gray-600">Forward pack showing high HMLD but low HSR - opportunity to improve transition speed</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-nh-red rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Monitor High-Load Players</h4>
                      <p className="text-sm text-gray-600">Implement recovery protocols for Ruzich and Stevenson following exceptional work rates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-nh-red rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Leverage Stevenson's Pace</h4>
                      <p className="text-sm text-gray-600">Max speed of 35.5 km/h should be utilized in structured counter-attack patterns</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-nh-red rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Set Piece Efficiency</h4>
                      <p className="text-sm text-gray-600">Continue building on Tuiloma's perfect lineout performance and tackle efficiency</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}