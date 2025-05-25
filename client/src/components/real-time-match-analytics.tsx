import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Zap, 
  AlertTriangle, 
  Users, 
  Target, 
  TrendingDown, 
  TrendingUp,
  Clock,
  MapPin,
  Play,
  Pause,
  RotateCcw,
  Brain,
  Shield,
  Swords,
  Eye
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";

interface RealTimeMatchAnalyticsProps {
  matchId: string;
  isLive?: boolean;
}

export default function RealTimeMatchAnalytics({ matchId, isLive = true }: RealTimeMatchAnalyticsProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(isLive);

  // Simulate real-time updates
  useEffect(() => {
    if (isPlaying && isLive) {
      const interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, isLive]);

  // Sample real-time player data with fatigue monitoring
  const realTimePlayerData = [
    {
      id: "james-mitchell",
      name: "James Mitchell",
      position: "Hooker",
      jersey: 2,
      currentSpeed: 18.5,
      avgSpeed: 22.3,
      topSpeed: 28.1,
      fatigueLevel: 72,
      heartRate: 168,
      maxHeartRate: 185,
      distance: 4.2,
      sprints: 12,
      explosiveness: 68, // AI-calculated drop from baseline
      riskLevel: "medium",
      lastSprint: 45 // seconds ago
    },
    {
      id: "david-carter",
      name: "David Carter",
      position: "Fly Half",
      jersey: 10,
      currentSpeed: 22.1,
      avgSpeed: 24.8,
      topSpeed: 31.2,
      fatigueLevel: 45,
      heartRate: 155,
      maxHeartRate: 180,
      distance: 5.8,
      sprints: 18,
      explosiveness: 89,
      riskLevel: "low",
      lastSprint: 12
    },
    {
      id: "mike-thompson",
      name: "Mike Thompson",
      position: "Openside Flanker",
      jersey: 7,
      currentSpeed: 16.2,
      avgSpeed: 19.8,
      topSpeed: 26.5,
      fatigueLevel: 85,
      heartRate: 178,
      maxHeartRate: 190,
      distance: 6.1,
      sprints: 22,
      explosiveness: 52, // Significant drop - AI alert
      riskLevel: "high",
      lastSprint: 78
    }
  ];

  // AI Tactical Analysis Data
  const tacticalAnalysis = {
    defence: {
      lineoutDefence: {
        successRate: 73,
        weaknesses: [
          "Back of lineout vulnerable - 3 successful mauls against us",
          "Slow defensive line speed off #2 lineout",
          "Opportunity: Target their #4 - poor lifting technique"
        ],
        recommendations: [
          "Increase pressure on their #2 thrower",
          "Contest back-of-lineout ball aggressively",
          "Target short lineout throws to exploit lifting"
        ]
      },
      scrumDefence: {
        patterns: [
          "Opposition favors blind-side attack (68% of scrums)",
          "Weak defensive organization within 5m of ruck",
          "Opportunity: Intercept passes to #12 - consistent pattern"
        ],
        weaknesses: [
          "Slow ruck defense - average 2.3s to set line",
          "Winger comes in too early on crash ball"
        ]
      }
    },
    attack: {
      lineoutTrends: {
        opponentPatterns: [
          "75% possession to #4 on own 22m line",
          "Quick throw successful 4/5 times when available",
          "Maul defense weak on short side"
        ],
        opportunities: [
          "Target middle of lineout - weak jumper",
          "Quick throw opportunities when ball goes to touch",
          "Steal opportunity at 15m+ lineouts"
        ]
      },
      attackPatterns: {
        fromScrum: [
          "Blind side runner 8/12 attempts - predictable",
          "Fly-half kicks 60% of possession on own half",
          "Success rate drops to 23% after 3+ rucks"
        ],
        fromKick: [
          "Chase pattern leaves midfield gap",
          "Box kick contest won 7/11 times",
          "Counter-attack space on left wing"
        ]
      },
      tacticalKicking: {
        analysis: [
          "Kicking game targets our #15 - 73% of kicks",
          "Poor chase on kicks over 40m",
          "Opportunity: Short kicks behind wingers"
        ]
      }
    }
  };

  // Fatigue progression data
  const fatigueData = [
    { time: 0, avg: 0, peak: 0 },
    { time: 10, avg: 15, peak: 25 },
    { time: 20, avg: 28, peak: 45 },
    { time: 30, avg: 42, peak: 62 },
    { time: 40, avg: 58, peak: 78 },
    { time: 50, avg: 68, peak: 85 },
    { time: 60, avg: 72, peak: 88 },
    { time: 70, avg: 75, peak: 90 }
  ];

  const getFatigueColor = (level: number) => {
    if (level < 50) return "text-green-600";
    if (level < 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Match Header */}
      <div className="bg-nh-red text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Real-Time Match Analytics</h1>
            <p className="text-lg opacity-90">North Harbour vs Auckland Blues</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{formatTime(currentTime)}</div>
            <div className="flex items-center gap-2 mt-2">
              {isLive && (
                <Badge className="bg-red-500 text-white animate-pulse">
                  LIVE
                </Badge>
              )}
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => setCurrentTime(0)}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="fatigue" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-2 rounded-lg border border-gray-200 gap-1">
          <TabsTrigger 
            value="fatigue"
            className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
          >
            <Activity className="h-4 w-4 mr-2" />
            Fatigue Monitor
          </TabsTrigger>
          <TabsTrigger 
            value="defence"
            className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
          >
            <Shield className="h-4 w-4 mr-2" />
            AI Defence Analysis
          </TabsTrigger>
          <TabsTrigger 
            value="attack"
            className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
          >
            <Swords className="h-4 w-4 mr-2" />
            AI Attack Analysis
          </TabsTrigger>
          <TabsTrigger 
            value="heatmap"
            className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
          >
            <MapPin className="h-4 w-4 mr-2" />
            Live Heat Map
          </TabsTrigger>
        </TabsList>

        {/* Real-Time Fatigue Monitoring */}
        <TabsContent value="fatigue" className="space-y-6">
          {/* Fatigue Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Team Avg Fatigue</p>
                    <p className="text-3xl font-bold text-nh-navy">68%</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-full">
                    <Activity className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">High Risk Players</p>
                    <p className="text-3xl font-bold text-red-600">1</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Explosiveness Drop</p>
                    <p className="text-3xl font-bold text-orange-600">-22%</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-full">
                    <TrendingDown className="h-6 w-6 text-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fatigue Progression Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-nh-red" />
                Team Fatigue Progression
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={fatigueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" label={{ value: 'Time (min)', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Fatigue %', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="avg" stackId="1" stroke="#971d32" fill="#971d32" fillOpacity={0.6} name="Team Average" />
                  <Area type="monotone" dataKey="peak" stackId="2" stroke="#dc2626" fill="#dc2626" fillOpacity={0.4} name="Peak Player" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Individual Player Monitoring */}
          <Card>
            <CardHeader>
              <CardTitle>Individual Player Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {realTimePlayerData.map((player) => (
                  <div key={player.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-nh-red rounded-full flex items-center justify-center text-white font-bold">
                          {player.jersey}
                        </div>
                        <div>
                          <h4 className="font-medium">{player.name}</h4>
                          <p className="text-sm text-slate-600">{player.position}</p>
                        </div>
                      </div>
                      <Badge className={getRiskColor(player.riskLevel)}>
                        {player.riskLevel.toUpperCase()} RISK
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-slate-600">Fatigue Level</p>
                        <div className="flex items-center gap-2">
                          <p className={`text-xl font-bold ${getFatigueColor(player.fatigueLevel)}`}>
                            {player.fatigueLevel}%
                          </p>
                          <Progress value={player.fatigueLevel} className="w-16" />
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-slate-600">Current Speed</p>
                        <p className="text-xl font-bold">{player.currentSpeed} km/h</p>
                        <p className="text-xs text-slate-500">Avg: {player.avgSpeed}</p>
                      </div>

                      <div>
                        <p className="text-sm text-slate-600">Explosiveness</p>
                        <div className="flex items-center gap-1">
                          <p className={`text-xl font-bold ${player.explosiveness < 60 ? 'text-red-600' : 'text-green-600'}`}>
                            {player.explosiveness}%
                          </p>
                          {player.explosiveness < 60 && <TrendingDown className="h-4 w-4 text-red-500" />}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-slate-600">Heart Rate</p>
                        <p className="text-xl font-bold">{player.heartRate} bpm</p>
                        <p className="text-xs text-slate-500">Max: {player.maxHeartRate}</p>
                      </div>
                    </div>

                    {player.riskLevel === "high" && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-red-800">AI Alert: High Fatigue Risk</p>
                            <p className="text-sm text-red-700">
                              Significant drop in explosiveness (-48% from baseline). Consider substitution in next 5 minutes.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Defence Analysis */}
        <TabsContent value="defence" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-nh-red" />
                  Lineout Defence Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Success Rate</span>
                  <span className="text-2xl font-bold text-nh-red">{tacticalAnalysis.defence.lineoutDefence.successRate}%</span>
                </div>

                <div>
                  <h4 className="font-medium text-red-800 mb-2">⚠️ Identified Weaknesses</h4>
                  <ul className="space-y-2">
                    {tacticalAnalysis.defence.lineoutDefence.weaknesses.map((weakness, index) => (
                      <li key={index} className="text-sm p-2 bg-red-50 rounded border-l-4 border-red-400">
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-green-800 mb-2">💡 AI Recommendations</h4>
                  <ul className="space-y-2">
                    {tacticalAnalysis.defence.lineoutDefence.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm p-2 bg-green-50 rounded border-l-4 border-green-400">
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-nh-red" />
                  Scrum Defence Patterns
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">📊 Opposition Patterns</h4>
                  <ul className="space-y-2">
                    {tacticalAnalysis.defence.scrumDefence.patterns.map((pattern, index) => (
                      <li key={index} className="text-sm p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                        {pattern}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-red-800 mb-2">🎯 Defensive Gaps</h4>
                  <ul className="space-y-2">
                    {tacticalAnalysis.defence.scrumDefence.weaknesses.map((weakness, index) => (
                      <li key={index} className="text-sm p-2 bg-red-50 rounded border-l-4 border-red-400">
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Attack Analysis */}
        <TabsContent value="attack" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-nh-red" />
                  Opposition Lineout Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">📈 Patterns Identified</h4>
                  <ul className="space-y-2">
                    {tacticalAnalysis.attack.lineoutTrends.opponentPatterns.map((pattern, index) => (
                      <li key={index} className="text-sm p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                        {pattern}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-green-800 mb-2">🎯 Attack Opportunities</h4>
                  <ul className="space-y-2">
                    {tacticalAnalysis.attack.lineoutTrends.opportunities.map((opp, index) => (
                      <li key={index} className="text-sm p-2 bg-green-50 rounded border-l-4 border-green-400">
                        {opp}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Swords className="h-5 w-5 mr-2 text-nh-red" />
                  Tactical Kicking Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-purple-800 mb-2">🥾 Kicking Intelligence</h4>
                  <ul className="space-y-2">
                    {tacticalAnalysis.attack.tacticalKicking.analysis.map((insight, index) => (
                      <li key={index} className="text-sm p-2 bg-purple-50 rounded border-l-4 border-purple-400">
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-orange-800 mb-2">⚡ Attack Patterns from Set Piece</h4>
                  <ul className="space-y-2">
                    {tacticalAnalysis.attack.attackPatterns.fromScrum.map((pattern, index) => (
                      <li key={index} className="text-sm p-2 bg-orange-50 rounded border-l-4 border-orange-400">
                        {pattern}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Live Heat Map */}
        <TabsContent value="heatmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-nh-red" />
                Live Player Positioning Heat Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-green-100 rounded-lg p-8 min-h-96">
                <div className="absolute inset-4 border-2 border-white rounded">
                  {/* Rugby field representation */}
                  <div className="w-full h-full relative">
                    {/* Field markings */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-white"></div>
                    <div className="absolute top-1/4 left-0 right-0 h-px bg-white opacity-50"></div>
                    <div className="absolute top-3/4 left-0 right-0 h-px bg-white opacity-50"></div>
                    
                    {/* Player positions with heat intensity */}
                    <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-red-500 rounded-full opacity-80 transform -translate-x-1/2 -translate-y-1/2">
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white">2</span>
                    </div>
                    <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-yellow-500 rounded-full opacity-80 transform -translate-x-1/2 -translate-y-1/2">
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white">10</span>
                    </div>
                    <div className="absolute top-2/3 left-1/3 w-4 h-4 bg-orange-500 rounded-full opacity-80 transform -translate-x-1/2 -translate-y-1/2">
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white">7</span>
                    </div>
                    
                    {/* Heat zones */}
                    <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-red-300 rounded-full opacity-30"></div>
                    <div className="absolute top-1/2 left-2/3 w-20 h-20 bg-yellow-300 rounded-full opacity-30"></div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span>High Activity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span>Medium Activity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span>Low Activity</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}