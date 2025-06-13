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

  // Live player positioning data for heat map
  const livePlayerPositions = [
    { id: 1, name: "Prop", x: 25, y: 45, intensity: 85, jersey: 1, recent_actions: ["Scrum", "Ruck"] },
    { id: 2, name: "Hooker", x: 30, y: 45, intensity: 92, jersey: 2, recent_actions: ["Lineout", "Ruck", "Tackle"] },
    { id: 3, name: "Prop", x: 35, y: 45, intensity: 78, jersey: 3, recent_actions: ["Scrum", "Maul"] },
    { id: 4, name: "Lock", x: 28, y: 35, intensity: 65, jersey: 4, recent_actions: ["Lineout", "Ruck"] },
    { id: 5, name: "Lock", x: 32, y: 35, intensity: 71, jersey: 5, recent_actions: ["Lineout", "Tackle"] },
    { id: 6, name: "Blindside", x: 40, y: 40, intensity: 88, jersey: 6, recent_actions: ["Tackle", "Ruck", "Carry"] },
    { id: 7, name: "Openside", x: 45, y: 50, intensity: 95, jersey: 7, recent_actions: ["Tackle", "Turnover", "Ruck"] },
    { id: 8, name: "8th Man", x: 35, y: 55, intensity: 82, jersey: 8, recent_actions: ["Carry", "Ruck", "Tackle"] },
    { id: 9, name: "Scrum Half", x: 50, y: 45, intensity: 76, jersey: 9, recent_actions: ["Pass", "Kick", "Ruck"] },
    { id: 10, name: "Fly Half", x: 55, y: 45, intensity: 69, jersey: 10, recent_actions: ["Pass", "Kick", "Tackle"] },
    { id: 11, name: "Left Wing", x: 65, y: 20, intensity: 58, jersey: 11, recent_actions: ["Run", "Tackle"] },
    { id: 12, name: "Inside Centre", x: 60, y: 40, intensity: 74, jersey: 12, recent_actions: ["Pass", "Tackle", "Carry"] },
    { id: 13, name: "Outside Centre", x: 65, y: 50, intensity: 73, jersey: 13, recent_actions: ["Pass", "Tackle", "Run"] },
    { id: 14, name: "Right Wing", x: 70, y: 70, intensity: 61, jersey: 14, recent_actions: ["Run", "Catch"] },
    { id: 15, name: "Full Back", x: 75, y: 45, intensity: 55, jersey: 15, recent_actions: ["Catch", "Kick", "Run"] }
  ];

  // Heat zones based on player activity
  const heatZones = [
    { x: 30, y: 45, radius: 15, intensity: 90, label: "Ruck Area" },
    { x: 50, y: 45, radius: 12, intensity: 75, label: "Breakdown" },
    { x: 25, y: 30, radius: 8, intensity: 85, label: "Lineout" },
    { x: 60, y: 45, radius: 10, intensity: 65, label: "Midfield" }
  ];

  // Enhanced AI-powered heat map data for coaching roles
  const heatMapData = {
    lineoutAnalysis: {
      oppositionThrows: [
        { position: "5m", success: 85, attempts: 12, pattern: "Quick throw to front" },
        { position: "15m", success: 92, attempts: 8, pattern: "Middle pod targeting" },
        { position: "22m", success: 67, attempts: 9, pattern: "Back pod variation" },
        { position: "Halfway", success: 78, attempts: 5, pattern: "Long throw specialist" }
      ],
      aiInsights: [
        "Opposition favors 15m lineouts (92% success) - prepare counter-maul defense",
        "Weak at 22m throws (67%) - apply pressure on their lineout caller",
        "Quick throws at 5m line increasing - position defenders wider"
      ]
    },
    kickingPatterns: {
      oppositionKicking: [
        { zone: "Left Wing", frequency: 23, success: 78, avgDistance: 35 },
        { zone: "Center Field", frequency: 45, success: 84, avgDistance: 42 },
        { zone: "Right Wing", frequency: 32, success: 71, avgDistance: 38 },
        { zone: "In-Goal", frequency: 12, success: 89, avgDistance: 28 }
      ],
      aiRecommendations: [
        "Center field kicks most frequent (45) - position fullback centrally",
        "Right wing kicks weakest (71%) - pressure kicker from that side",
        "In-goal kicks very successful (89%) - improve chase lines"
      ]
    },
    attackPatterns: {
      oppositionPhases: [
        { phase: "1-2", frequency: 34, successRate: 67, gainLine: 72 },
        { phase: "3-5", frequency: 28, successRate: 82, gainLine: 85 },
        { phase: "6-8", frequency: 19, successRate: 71, gainLine: 69 },
        { phase: "9+", frequency: 12, successRate: 58, gainLine: 45 }
      ],
      weaknesses: [
        "Struggle in phases 9+ (58% success) - force extended phases",
        "Lower gain line success in phase 1-2 (72%) - aggressive line speed",
        "Peak efficiency in phases 3-5 - disrupt early ball presentation"
      ]
    },
    defensivePatterns: {
      lineSpeed: [
        { minute: 0, speed: 8.2, accuracy: 89 },
        { minute: 10, speed: 7.8, accuracy: 87 },
        { minute: 20, speed: 7.5, accuracy: 84 },
        { minute: 30, speed: 7.9, accuracy: 86 },
        { minute: 40, speed: 7.3, accuracy: 82 }
      ],
      aiAlerts: [
        "Line speed dropping after 20min mark - consider fresh legs",
        "Accuracy declining in middle third - reinforce system calls",
        "Right edge defense showing gaps - shift defensive pattern"
      ]
    }
  };

  const setPlayAnalysis = {
    scrumStats: {
      own: { won: 8, lost: 1, penalties: 2, pushover: 1 },
      opposition: { won: 6, lost: 3, penalties: 4, pushover: 0 },
      aiInsights: [
        "Dominant scrum platform (89% success) - use for attacking launchpad",
        "Opposition struggling with penalties (4) - target hooker accuracy",
        "Pushover threat established - maintain front row intensity"
      ]
    },
    lineoutStats: {
      own: { won: 12, lost: 2, stolen: 1, quickThrow: 3 },
      opposition: { won: 9, lost: 4, stolen: 2, quickThrow: 1 },
      aiInsights: [
        "Strong lineout platform (86% success) - vary throwing patterns",
        "Successfully disrupting opposition (31% success rate) - maintain pressure",
        "Quick throw opportunities increasing - alert wingers to position"
      ]
    }
  };

  const tacticalliveData = {
    forwardsCoach: {
      scrumDominance: 78,
      lineoutSuccess: 86,
      maulEffectiveness: 72,
      packCohesion: 84,
      alerts: [
        "Scrum dominance declining - check front row fatigue",
        "Lineout timing perfect - maintain current caller rhythm",
        "Maul defense vulnerable on opposition - target their lineout"
      ]
    },
    backsCoach: {
      passingAccuracy: 89,
      kickingSuccess: 76,
      linebreaks: 7,
      offloadSuccess: 64,
      alerts: [
        "Passing accuracy excellent - continue wide attack pattern",
        "Kicking game needs work - 76% success below target",
        "Offload game creating opportunities - encourage support play"
      ]
    },
    defensiveCoach: {
      lineSpeed: 7.6,
      tackleSuccess: 87,
      turnoversBon: 4,
      missedTackles: 8,
      alerts: [
        "Line speed optimal for pressure - maintain current system",
        "Tackle success strong - continue aggressive approach",
        "Turnover rate good - reward breakdown efforts"
      ]
    }
  };

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
          {/* Defensive Coach Role Focus */}
          <Card className="border-2 border-purple-500 bg-purple-50">
            <CardContent className="p-4 text-center">
              <Target className="mx-auto mb-2 text-purple-600" size={24} />
              <div className="font-bold text-sm">Defence Coach Analytics</div>
              <div className="text-xs text-gray-600">Line Speed & Structure Analysis</div>
            </CardContent>
          </Card>

          {/* Live Defensive Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-red-600" />
                  Live Defensive Line Speed
                </CardTitle>
                <div className="text-sm text-gray-600">Real-time tracking with AI alerts</div>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={heatMapData.defensivePatterns.lineSpeed}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="minute" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="speed" stroke="#DC2626" strokeWidth={2} />
                      <Line type="monotone" dataKey="accuracy" stroke="#059669" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 space-y-2">
                  {heatMapData.defensivePatterns.aiAlerts.map((alert, index) => (
                    <div key={index} className="p-2 bg-amber-50 rounded border-l-4 border-amber-400">
                      <div className="text-sm text-amber-800">⚠️ {alert}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Defence Coach Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-600" />
                  AI Defence Insights
                </CardTitle>
                <div className="text-sm text-gray-600">Real-time tactical recommendations</div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-red-50 rounded">
                      <div className="text-2xl font-bold text-red-600">{tacticalliveData.defensiveCoach.tackleSuccess}%</div>
                      <div className="text-xs text-gray-600">Tackle Success</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded">
                      <div className="text-2xl font-bold text-purple-600">{tacticalliveData.defensiveCoach.turnoversBon}</div>
                      <div className="text-xs text-gray-600">Turnovers Won</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {tacticalliveData.defensiveCoach.alerts.map((alert, index) => (
                      <div key={index} className="text-sm p-2 bg-purple-50 rounded border-l-4 border-purple-400">
                        {alert}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Opposition Attack Phase Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-purple-600" />
                Opposition Attack Phase Patterns
              </CardTitle>
              <div className="text-sm text-gray-600">AI Analysis: Phase Play Effectiveness</div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Phase Play Success Rates</h4>
                  <div className="space-y-3">
                    {heatMapData.attackPatterns.oppositionPhases.map((phase, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="font-medium">Phases {phase.phase}</div>
                          <div className="text-xs text-gray-600">{phase.frequency} attempts</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-bold">{phase.successRate}%</div>
                            <div className="text-xs text-gray-500">Success</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{phase.gainLine}%</div>
                            <div className="text-xs text-gray-500">Gain Line</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Defensive Opportunities</h4>
                  <div className="space-y-2">
                    {heatMapData.attackPatterns.weaknesses.map((weakness, index) => (
                      <div key={index} className="p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                        <div className="text-sm text-red-800">{weakness}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Set Piece Defence Analysis */}
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
              <div className="text-sm text-gray-600">Real-time player tracking with activity intensity</div>
            </CardHeader>
            <CardContent>
              <div className="relative bg-green-200 rounded-lg p-8 min-h-[500px]">
                <div className="absolute inset-4 border-4 border-white rounded bg-green-100">
                  {/* Rugby field representation */}
                  <div className="w-full h-full relative overflow-hidden">
                    {/* Field markings */}
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-white"></div>
                    <div className="absolute top-1/4 left-0 right-0 h-px bg-white opacity-70"></div>
                    <div className="absolute top-3/4 left-0 right-0 h-px bg-white opacity-70"></div>
                    <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white opacity-50"></div>
                    <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white opacity-50"></div>
                    
                    {/* Heat zones (background) */}
                    {heatZones.map((zone, index) => (
                      <div
                        key={index}
                        className="absolute rounded-full opacity-30"
                        style={{
                          left: `${zone.x}%`,
                          top: `${zone.y}%`,
                          width: `${zone.radius * 2}px`,
                          height: `${zone.radius * 2}px`,
                          backgroundColor: zone.intensity >= 85 ? '#ef4444' : zone.intensity >= 70 ? '#f59e0b' : '#10b981',
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap">
                          {zone.label}
                        </div>
                      </div>
                    ))}
                    
                    {/* Player positions with intensity */}
                    {livePlayerPositions.map((player) => (
                      <div
                        key={player.id}
                        className="absolute group cursor-pointer"
                        style={{
                          left: `${player.x}%`,
                          top: `${player.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <div 
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-lg ${
                            player.intensity >= 85 ? 'bg-red-500' :
                            player.intensity >= 70 ? 'bg-yellow-500' : 
                            player.intensity >= 55 ? 'bg-orange-500' : 'bg-green-500'
                          }`}
                        >
                          {player.jersey}
                        </div>
                        
                        {/* Player tooltip */}
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-90 text-white p-2 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          <div className="font-bold">{player.name} ({player.jersey})</div>
                          <div>Intensity: {player.intensity}%</div>
                          <div>Recent: {player.recent_actions.slice(0, 2).join(', ')}</div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Field labels */}
                    <div className="absolute top-2 left-2 text-xs font-bold text-gray-700">North Harbour Try Line</div>
                    <div className="absolute bottom-2 right-2 text-xs font-bold text-gray-700">Opposition Try Line</div>
                    <div className="absolute top-1/2 left-2 transform -translate-y-1/2 text-xs font-bold text-gray-700 rotate-90">Halfway</div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span>High Activity (85%+)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span>Medium Activity (70-84%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <span>Moderate Activity (55-69%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span>Low Activity (Below 55%)</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Most Active Players</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {livePlayerPositions
                        .sort((a, b) => b.intensity - a.intensity)
                        .slice(0, 5)
                        .map((player, index) => (
                        <div key={player.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-nh-red text-white rounded-full flex items-center justify-center text-xs font-bold">
                              {player.jersey}
                            </div>
                            <div>
                              <div className="font-medium">{player.name}</div>
                              <div className="text-xs text-gray-600">{player.recent_actions[0]}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{player.intensity}%</div>
                            <div className="text-xs text-gray-500">Activity</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Heat Zone Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {heatZones.map((zone, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full ${
                              zone.intensity >= 85 ? 'bg-red-500' : 
                              zone.intensity >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}></div>
                            <div>
                              <div className="font-medium">{zone.label}</div>
                              <div className="text-xs text-gray-600">High contact area</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{zone.intensity}%</div>
                            <div className="text-xs text-gray-500">Intensity</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
              </div>
            </CardContent>
          </Card>

          {/* Live Defensive Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-red-600" />
                  Live Defensive Line Speed
                </CardTitle>
                <div className="text-sm text-gray-600">Real-time tracking with AI alerts</div>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={heatMapData.defensivePatterns.lineSpeed}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="minute" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="speed" stroke="#DC2626" strokeWidth={2} />
                      <Line type="monotone" dataKey="accuracy" stroke="#059669" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 space-y-2">
                  {heatMapData.defensivePatterns.aiAlerts.map((alert, index) => (
                    <div key={index} className="p-2 bg-amber-50 rounded border-l-4 border-amber-400">
                      <div className="text-sm text-amber-800">⚠️ {alert}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Role-Specific Coaching Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-indigo-600" />
                  AI Coaching Insights
                </CardTitle>
                <div className="text-sm text-gray-600">Role-specific tactical recommendations</div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="forwards" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="forwards">Forwards</TabsTrigger>
                    <TabsTrigger value="backs">Backs</TabsTrigger>
                    <TabsTrigger value="defence">Defence</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="forwards" className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <div className="text-2xl font-bold text-blue-600">{tacticalliveData.forwardsCoach.scrumDominance}%</div>
                        <div className="text-xs text-gray-600">Scrum Dominance</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded">
                        <div className="text-2xl font-bold text-green-600">{tacticalliveData.forwardsCoach.lineoutSuccess}%</div>
                        <div className="text-xs text-gray-600">Lineout Success</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {tacticalliveData.forwardsCoach.alerts.map((alert, index) => (
                        <div key={index} className="text-sm p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                          {alert}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="backs" className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded">
                        <div className="text-2xl font-bold text-green-600">{tacticalliveData.backsCoach.passingAccuracy}%</div>
                        <div className="text-xs text-gray-600">Passing Accuracy</div>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded">
                        <div className="text-2xl font-bold text-yellow-600">{tacticalliveData.backsCoach.linebreaks}</div>
                        <div className="text-xs text-gray-600">Line Breaks</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {tacticalliveData.backsCoach.alerts.map((alert, index) => (
                        <div key={index} className="text-sm p-2 bg-green-50 rounded border-l-4 border-green-400">
                          {alert}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="defence" className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-red-50 rounded">
                        <div className="text-2xl font-bold text-red-600">{tacticalliveData.defensiveCoach.tackleSuccess}%</div>
                        <div className="text-xs text-gray-600">Tackle Success</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded">
                        <div className="text-2xl font-bold text-purple-600">{tacticalliveData.defensiveCoach.turnoversBon}</div>
                        <div className="text-xs text-gray-600">Turnovers Won</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {tacticalliveData.defensiveCoach.alerts.map((alert, index) => (
                        <div key={index} className="text-sm p-2 bg-purple-50 rounded border-l-4 border-purple-400">
                          {alert}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Set Piece Analysis Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  Set Piece Performance
                </CardTitle>
                <div className="text-sm text-gray-600">Live scrum and lineout analysis</div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Scrum Analysis</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-3 rounded">
                        <div className="text-sm text-gray-600">North Harbour</div>
                        <div className="text-lg font-bold text-green-600">
                          {setPlayAnalysis.scrumStats.own.won}/{setPlayAnalysis.scrumStats.own.won + setPlayAnalysis.scrumStats.own.lost}
                        </div>
                        <div className="text-xs text-gray-500">Won/Total</div>
                      </div>
                      <div className="bg-red-50 p-3 rounded">
                        <div className="text-sm text-gray-600">Opposition</div>
                        <div className="text-lg font-bold text-red-600">
                          {setPlayAnalysis.scrumStats.opposition.won}/{setPlayAnalysis.scrumStats.opposition.won + setPlayAnalysis.scrumStats.opposition.lost}
                        </div>
                        <div className="text-xs text-gray-500">Won/Total</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Lineout Analysis</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded">
                        <div className="text-sm text-gray-600">North Harbour</div>
                        <div className="text-lg font-bold text-blue-600">
                          {setPlayAnalysis.lineoutStats.own.won}/{setPlayAnalysis.lineoutStats.own.won + setPlayAnalysis.lineoutStats.own.lost}
                        </div>
                        <div className="text-xs text-gray-500">Won/Total</div>
                      </div>
                      <div className="bg-orange-50 p-3 rounded">
                        <div className="text-sm text-gray-600">Opposition</div>
                        <div className="text-lg font-bold text-orange-600">
                          {setPlayAnalysis.lineoutStats.opposition.won}/{setPlayAnalysis.lineoutStats.opposition.won + setPlayAnalysis.lineoutStats.opposition.lost}
                        </div>
                        <div className="text-xs text-gray-500">Won/Total</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">🧠 AI Insights</h4>
                    {setPlayAnalysis.scrumStats.aiInsights.map((insight, index) => (
                      <div key={index} className="text-sm p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                        {insight}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Opposition Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-orange-600" />
                  Opposition Trend Analysis
                </CardTitle>
                <div className="text-sm text-gray-600">AI pattern recognition</div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 text-red-800">🚨 Critical Patterns</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-red-50 rounded border-l-4 border-red-400">
                        <div className="font-medium text-sm">Lineout Vulnerability</div>
                        <div className="text-xs text-gray-600">22m throws success rate dropped to 67% - increase pressure</div>
                      </div>
                      <div className="p-3 bg-amber-50 rounded border-l-4 border-amber-400">
                        <div className="font-medium text-sm">Kicking Predictability</div>
                        <div className="text-xs text-gray-600">89% of kicks targeting center field - adjust back 3 positioning</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-green-800">✅ Tactical Opportunities</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                        <div className="font-medium text-sm">Scrum Dominance</div>
                        <div className="text-xs text-gray-600">Use scrum platform for attacking opportunities</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                        <div className="font-medium text-sm">Phase Play Weakness</div>
                        <div className="text-xs text-gray-600">Force extended phases - opposition struggles after phase 8</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}