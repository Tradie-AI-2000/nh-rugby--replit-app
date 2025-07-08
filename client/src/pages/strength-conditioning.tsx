import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap, 
  Heart, 
  Target, 
  Users,
  BarChart3,
  LineChart,
  Calendar,
  Download,
  Upload,
  Settings,
  Eye,
  Filter,
  RefreshCw
} from "lucide-react";
import { format, subDays, startOfWeek, endOfWeek } from "date-fns";

// Types
interface Player {
  id: string;
  personalDetails: {
    firstName: string;
    lastName: string;
  };
  rugbyProfile: {
    primaryPosition: string;
    jerseyNumber: number;
  };
  status: {
    fitness: string;
    medical: string;
  };
}

interface WellnessEntry {
  sleepQuality: number;
  muscleSoreness: number;
  fatigueLevel: number;
  stressLevel: number;
  mood: number;
  notes?: string;
}

interface GPSEntry {
  sessionType: string;
  totalDistance: number;
  highSpeedRunning: number;
  hmlDistance: number;
  maxSpeed: number;
  accelerations: number;
  decelerations: number;
  collisions: number;
  ballInPlayMinutes: number;
}

interface LoadTarget {
  weeklyHmlTarget: number;
  dailyHmlTarget: number;
  weeklyPlayerLoadTarget: number;
  weeklyDistanceTarget: number;
  notes?: string;
}

// Main S&C Portal Component
export default function StrengthConditioning() {
  const [selectedView, setSelectedView] = useState("overview");
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [selectedWeek, setSelectedWeek] = useState(format(new Date(), 'yyyy-MM-dd'));

  // Data fetching
  const { data: squadOverview, isLoading: loadingOverview } = useQuery({
    queryKey: ["/api/sc/squad-overview"],
  });

  const { data: readinessView, isLoading: loadingReadiness } = useQuery({
    queryKey: ["/api/sc/daily-readiness"],
  });

  const { data: players } = useQuery({
    queryKey: ["/api/players"],
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Strength & Conditioning Portal</h1>
          <p className="text-gray-600 mt-1">Advanced load management, wellness tracking, and injury prevention</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import GPS
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Data
          </Button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <Tabs value={selectedView} onValueChange={setSelectedView} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Squad Overview</TabsTrigger>
          <TabsTrigger value="readiness">Daily Readiness</TabsTrigger>
          <TabsTrigger value="individual">Individual Deep Dive</TabsTrigger>
          <TabsTrigger value="wellness">Wellness Tracking</TabsTrigger>
          <TabsTrigger value="analytics">Load Analytics</TabsTrigger>
        </TabsList>

        {/* Squad Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <SquadOverviewDashboard data={squadOverview} loading={loadingOverview} />
        </TabsContent>

        {/* Daily Readiness Tab */}
        <TabsContent value="readiness" className="space-y-6">
          <DailyReadinessView data={readinessView} loading={loadingReadiness} />
        </TabsContent>

        {/* Individual Deep Dive Tab */}
        <TabsContent value="individual" className="space-y-6">
          <IndividualDeepDive 
            players={players} 
            selectedPlayer={selectedPlayer} 
            onPlayerSelect={setSelectedPlayer} 
          />
        </TabsContent>

        {/* Wellness Tracking Tab */}
        <TabsContent value="wellness" className="space-y-6">
          <WellnessTracking players={players} />
        </TabsContent>

        {/* Load Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <LoadAnalytics players={players} selectedWeek={selectedWeek} onWeekChange={setSelectedWeek} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Squad Overview Dashboard Component
function SquadOverviewDashboard({ data, loading }: { data: any; loading: boolean }) {
  if (loading) {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </CardContent>
        </Card>
      ))}
    </div>;
  }

  // Mock data for demonstration
  const mockData = {
    totalPlayers: 35,
    availablePlayers: 28,
    averageReadiness: 85.2,
    activeFlags: 4,
    topPerformers: [
      { name: "Jake Miller", position: "Lock", readiness: 94, load: 87 },
      { name: "Tom Wilson", position: "Flanker", readiness: 91, load: 92 },
      { name: "Sam Davis", position: "Centre", readiness: 89, load: 85 }
    ],
    riskPlayers: [
      { name: "Mike Johnson", position: "Prop", risk: "High Load Spike", level: "high" },
      { name: "Chris Brown", position: "Wing", risk: "Wellness Drop", level: "moderate" }
    ],
    weeklyTrends: {
      totalDistance: { current: 125800, previous: 118200, change: 6.4 },
      avgReadiness: { current: 85.2, previous: 82.1, change: 3.8 },
      injuryFlags: { current: 4, previous: 7, change: -42.9 }
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Squad Readiness</p>
                <p className="text-3xl font-bold text-green-600">{mockData.averageReadiness}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+{mockData.weeklyTrends.avgReadiness.change}% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Players</p>
                <p className="text-3xl font-bold text-blue-600">{mockData.availablePlayers}/{mockData.totalPlayers}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <Progress value={(mockData.availablePlayers / mockData.totalPlayers) * 100} className="mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Weekly Distance</p>
                <p className="text-3xl font-bold text-purple-600">{(mockData.weeklyTrends.totalDistance.current / 1000).toFixed(1)}km</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+{mockData.weeklyTrends.totalDistance.change}% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Risk Flags</p>
                <p className="text-3xl font-bold text-orange-600">{mockData.activeFlags}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">{Math.abs(mockData.weeklyTrends.injuryFlags.change)}% reduction</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              Top Performers This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.topPerformers.map((player, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{player.name}</p>
                    <p className="text-sm text-gray-600">{player.position}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Readiness: {player.readiness}%
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        Load: {player.load}%
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Injury Risk Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.riskPlayers.map((player, index) => (
                <Alert key={index} className={`${player.level === 'high' ? 'border-red-200 bg-red-50' : 'border-orange-200 bg-orange-50'}`}>
                  <AlertTriangle className={`w-4 h-4 ${player.level === 'high' ? 'text-red-600' : 'text-orange-600'}`} />
                  <AlertDescription>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{player.name} - {player.position}</p>
                        <p className="text-sm">{player.risk}</p>
                      </div>
                      <Badge variant={player.level === 'high' ? 'destructive' : 'secondary'}>
                        {player.level.toUpperCase()}
                      </Badge>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
              
              {mockData.riskPlayers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
                  <p>No active risk flags - squad looking good!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Daily Readiness View Component
function DailyReadinessView({ data, loading }: { data: any; loading: boolean }) {
  const [filterPosition, setFilterPosition] = useState("all");
  const [sortBy, setSortBy] = useState("readiness");

  // Mock data for demonstration
  const mockPlayers = [
    { id: "1", name: "Jake Miller", position: "Lock", jersey: 5, readiness: 94, targetStatus: "on-target", riskLevel: "none", status: "ready" },
    { id: "2", name: "Tom Wilson", position: "Flanker", jersey: 7, readiness: 91, targetStatus: "approaching", riskLevel: "none", status: "ready" },
    { id: "3", name: "Sam Davis", position: "Centre", jersey: 12, readiness: 89, targetStatus: "on-target", riskLevel: "none", status: "ready" },
    { id: "4", name: "Mike Johnson", position: "Prop", jersey: 1, readiness: 65, targetStatus: "behind", riskLevel: "moderate", status: "moderate-risk" },
    { id: "5", name: "Chris Brown", position: "Wing", jersey: 11, readiness: 72, targetStatus: "monitoring", riskLevel: "low", status: "low-readiness" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "bg-green-100 text-green-800 border-green-200";
      case "low-readiness": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "moderate-risk": return "bg-orange-100 text-orange-800 border-orange-200";
      case "high-risk": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTargetStatusColor = (status: string) => {
    switch (status) {
      case "on-target": return "text-green-600";
      case "approaching": return "text-yellow-600";
      case "behind": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Daily Overview Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Daily Readiness - {format(new Date(), 'EEEE, MMMM do, yyyy')}</CardTitle>
              <p className="text-gray-600 mt-1">Real-time squad availability and training readiness</p>
            </div>
            <div className="flex gap-2">
              <Select value={filterPosition} onValueChange={setFilterPosition}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="forwards">Forwards</SelectItem>
                  <SelectItem value="backs">Backs</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="readiness">Readiness Score</SelectItem>
                  <SelectItem value="name">Player Name</SelectItem>
                  <SelectItem value="risk">Risk Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Squad Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">28</div>
            <p className="text-sm text-gray-600">Ready to Train</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">5</div>
            <p className="text-sm text-gray-600">Monitor Closely</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">2</div>
            <p className="text-sm text-gray-600">Modified Training</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">0</div>
            <p className="text-sm text-gray-600">Rest Required</p>
          </CardContent>
        </Card>
      </div>

      {/* Player Readiness Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Individual Player Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockPlayers.map((player) => (
              <div key={player.id} className={`p-4 rounded-lg border ${getStatusColor(player.status)}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-medium">{player.name}</p>
                    <p className="text-sm opacity-75">#{player.jersey} - {player.position}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {player.riskLevel === "none" ? "Clear" : player.riskLevel}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Readiness</span>
                      <span className="text-sm font-bold">{player.readiness}%</span>
                    </div>
                    <Progress value={player.readiness} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span>Load Target:</span>
                    <span className={getTargetStatusColor(player.targetStatus)}>
                      {player.targetStatus.replace("-", " ")}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Status:</span>
                    <Badge className={`text-xs ${getStatusColor(player.status)}`}>
                      {player.status.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Individual Deep Dive Component
function IndividualDeepDive({ 
  players, 
  selectedPlayer, 
  onPlayerSelect 
}: { 
  players: any; 
  selectedPlayer: string | null; 
  onPlayerSelect: (playerId: string) => void; 
}) {
  const { data: playerAnalytics } = useQuery({
    queryKey: ["/api/sc/player-analytics", selectedPlayer],
    enabled: !!selectedPlayer,
  });

  // Mock detailed player data
  const mockPlayerData = {
    currentReadiness: 87,
    wellnessTrend: "improving",
    loadTrend: "stable",
    targetProgress: { hmlProgress: 92, status: "on-track" },
    riskFlags: [],
    recommendations: [
      { type: "wellness", priority: "medium", message: "Continue current wellness routine" },
      { type: "load", priority: "low", message: "Good load management this week" }
    ],
    weeklyData: {
      wellness: [
        { date: "2024-01-08", sleep: 4, soreness: 2, fatigue: 2, stress: 1, mood: 4, readiness: 86 },
        { date: "2024-01-09", sleep: 4, soreness: 1, fatigue: 1, stress: 1, mood: 5, readiness: 92 },
        { date: "2024-01-10", sleep: 3, soreness: 2, fatigue: 2, stress: 2, mood: 4, readiness: 82 },
        { date: "2024-01-11", sleep: 5, soreness: 1, fatigue: 1, stress: 1, mood: 5, readiness: 95 },
        { date: "2024-01-12", sleep: 4, soreness: 2, fatigue: 2, stress: 1, mood: 4, readiness: 87 },
      ],
      gps: [
        { date: "2024-01-08", session: "Training", distance: 4200, hml: 380, load: 245, hsr: 290 },
        { date: "2024-01-09", session: "Skills", distance: 2100, hml: 150, load: 120, hsr: 80 },
        { date: "2024-01-10", session: "Match", distance: 6800, hml: 580, load: 420, hsr: 450 },
        { date: "2024-01-11", session: "Recovery", distance: 1500, hml: 50, load: 80, hsr: 20 },
        { date: "2024-01-12", session: "Training", distance: 3900, hml: 320, load: 210, hsr: 240 },
      ]
    }
  };

  if (!selectedPlayer) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Eye className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Player</h3>
          <p className="text-gray-600 mb-6">Choose a player from the list below to view detailed analytics</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {players?.map((player: any) => (
              <Button 
                key={player.id}
                variant="outline" 
                className="p-4 h-auto text-left justify-start"
                onClick={() => onPlayerSelect(player.id)}
              >
                <div>
                  <p className="font-medium">
                    {player.personalDetails?.firstName} {player.personalDetails?.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    #{player.rugbyProfile?.jerseyNumber} - {player.rugbyProfile?.primaryPosition}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const selectedPlayerData = players?.find((p: any) => p.id === selectedPlayer);

  return (
    <div className="space-y-6">
      {/* Player Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">
                {selectedPlayerData?.personalDetails?.firstName} {selectedPlayerData?.personalDetails?.lastName}
              </CardTitle>
              <p className="text-gray-600">
                #{selectedPlayerData?.rugbyProfile?.jerseyNumber} - {selectedPlayerData?.rugbyProfile?.primaryPosition}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm" onClick={() => onPlayerSelect("")}>
                Back to List
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Current Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
            <div className="text-2xl font-bold text-red-600">{mockPlayerData.currentReadiness}%</div>
            <p className="text-sm text-gray-600">Current Readiness</p>
            <Badge className="mt-2 bg-green-100 text-green-800">
              {mockPlayerData.wellnessTrend}
            </Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Activity className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold text-blue-600">{mockPlayerData.targetProgress.hmlProgress}%</div>
            <p className="text-sm text-gray-600">Weekly Target</p>
            <Badge className="mt-2 bg-blue-100 text-blue-800">
              {mockPlayerData.targetProgress.status}
            </Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold text-purple-600">Stable</div>
            <p className="text-sm text-gray-600">Load Trend</p>
            <Badge className="mt-2 bg-purple-100 text-purple-800">
              {mockPlayerData.loadTrend}
            </Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-green-600">{mockPlayerData.riskFlags.length}</div>
            <p className="text-sm text-gray-600">Risk Flags</p>
            <Badge className="mt-2 bg-green-100 text-green-800">
              Clear
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wellness Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Wellness Trends (7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPlayerData.weeklyData.wellness.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{format(new Date(day.date), 'EEE, MMM d')}</p>
                    <div className="grid grid-cols-5 gap-1 mt-2">
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Sleep</div>
                        <div className="text-sm font-medium">{day.sleep}/5</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Soreness</div>
                        <div className="text-sm font-medium">{day.soreness}/5</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Fatigue</div>
                        <div className="text-sm font-medium">{day.fatigue}/5</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Stress</div>
                        <div className="text-sm font-medium">{day.stress}/5</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Mood</div>
                        <div className="text-sm font-medium">{day.mood}/5</div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="text-lg font-bold text-blue-600">{day.readiness}%</div>
                    <Progress value={day.readiness} className="w-16 h-2 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* GPS Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              GPS Performance (7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPlayerData.weeklyData.gps.map((session, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">{format(new Date(session.date), 'EEE, MMM d')}</p>
                    <Badge variant="outline">{session.session}</Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-3 text-sm">
                    <div>
                      <div className="text-xs text-gray-500">Distance</div>
                      <div className="font-medium">{(session.distance / 1000).toFixed(1)}km</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">HML</div>
                      <div className="font-medium">{session.hml}m</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Load</div>
                      <div className="font-medium">{session.load}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">HSR</div>
                      <div className="font-medium">{session.hsr}m</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-500" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockPlayerData.recommendations.map((rec, index) => (
              <Alert key={index} className="border-blue-200 bg-blue-50">
                <Target className="w-4 h-4 text-blue-600" />
                <AlertDescription>
                  <div className="flex justify-between items-center">
                    <span>{rec.message}</span>
                    <Badge variant={rec.priority === "high" ? "destructive" : rec.priority === "medium" ? "secondary" : "outline"}>
                      {rec.priority}
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Wellness Tracking Component
function WellnessTracking({ players }: { players: any }) {
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [wellnessEntry, setWellnessEntry] = useState<WellnessEntry>({
    sleepQuality: 3,
    muscleSoreness: 3,
    fatigueLevel: 3,
    stressLevel: 3,
    mood: 3,
    notes: ""
  });

  const queryClient = useQueryClient();

  const submitWellnessMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/sc/wellness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sc/daily-readiness"] });
      // Reset form
      setWellnessEntry({
        sleepQuality: 3,
        muscleSoreness: 3,
        fatigueLevel: 3,
        stressLevel: 3,
        mood: 3,
        notes: ""
      });
    },
  });

  const calculateReadiness = (wellness: WellnessEntry) => {
    const weights = { sleepQuality: 0.3, muscleSoreness: 0.25, fatigueLevel: 0.25, stressLevel: 0.1, mood: 0.1 };
    const score = (
      (wellness.sleepQuality * weights.sleepQuality) +
      ((6 - wellness.muscleSoreness) * weights.muscleSoreness) +
      ((6 - wellness.fatigueLevel) * weights.fatigueLevel) +
      ((6 - wellness.stressLevel) * weights.stressLevel) +
      (wellness.mood * weights.mood)
    ) * 20;
    return Math.round(score);
  };

  const readinessScore = calculateReadiness(wellnessEntry);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Daily Wellness Entry</CardTitle>
          <p className="text-gray-600">Submit daily wellness scores for load management and readiness assessment</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Player Selection */}
          <div>
            <Label htmlFor="player">Select Player</Label>
            <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a player" />
              </SelectTrigger>
              <SelectContent>
                {players?.map((player: any) => (
                  <SelectItem key={player.id} value={player.id}>
                    {player.personalDetails?.firstName} {player.personalDetails?.lastName} - #{player.rugbyProfile?.jerseyNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedPlayer && (
            <>
              {/* Wellness Sliders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sleep Quality */}
                <div className="space-y-3">
                  <Label>Sleep Quality (1-5)</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[wellnessEntry.sleepQuality]}
                      onValueChange={(value) => setWellnessEntry(prev => ({ ...prev, sleepQuality: value[0] }))}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Poor</span>
                      <span>Fair</span>
                      <span>Good</span>
                      <span>Very Good</span>
                      <span>Excellent</span>
                    </div>
                    <p className="text-center font-medium">{wellnessEntry.sleepQuality}/5</p>
                  </div>
                </div>

                {/* Muscle Soreness */}
                <div className="space-y-3">
                  <Label>Muscle Soreness (1-5)</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[wellnessEntry.muscleSoreness]}
                      onValueChange={(value) => setWellnessEntry(prev => ({ ...prev, muscleSoreness: value[0] }))}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>None</span>
                      <span>Mild</span>
                      <span>Moderate</span>
                      <span>High</span>
                      <span>Severe</span>
                    </div>
                    <p className="text-center font-medium">{wellnessEntry.muscleSoreness}/5</p>
                  </div>
                </div>

                {/* Fatigue Level */}
                <div className="space-y-3">
                  <Label>Fatigue Level (1-5)</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[wellnessEntry.fatigueLevel]}
                      onValueChange={(value) => setWellnessEntry(prev => ({ ...prev, fatigueLevel: value[0] }))}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>None</span>
                      <span>Mild</span>
                      <span>Moderate</span>
                      <span>High</span>
                      <span>Extreme</span>
                    </div>
                    <p className="text-center font-medium">{wellnessEntry.fatigueLevel}/5</p>
                  </div>
                </div>

                {/* Stress Level */}
                <div className="space-y-3">
                  <Label>Stress Level (1-5)</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[wellnessEntry.stressLevel]}
                      onValueChange={(value) => setWellnessEntry(prev => ({ ...prev, stressLevel: value[0] }))}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Very Low</span>
                      <span>Low</span>
                      <span>Moderate</span>
                      <span>High</span>
                      <span>Very High</span>
                    </div>
                    <p className="text-center font-medium">{wellnessEntry.stressLevel}/5</p>
                  </div>
                </div>

                {/* Mood */}
                <div className="space-y-3 md:col-span-2">
                  <Label>Mood (1-5)</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[wellnessEntry.mood]}
                      onValueChange={(value) => setWellnessEntry(prev => ({ ...prev, mood: value[0] }))}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Very Poor</span>
                      <span>Poor</span>
                      <span>Neutral</span>
                      <span>Good</span>
                      <span>Excellent</span>
                    </div>
                    <p className="text-center font-medium">{wellnessEntry.mood}/5</p>
                  </div>
                </div>
              </div>

              {/* Calculated Readiness Score */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-blue-900 mb-2">Calculated Readiness Score</h3>
                    <div className="text-4xl font-bold text-blue-600 mb-2">{readinessScore}%</div>
                    <Progress value={readinessScore} className="w-full max-w-xs mx-auto" />
                    <p className="text-sm text-blue-700 mt-2">
                      {readinessScore >= 90 ? "Excellent - Ready for high intensity" :
                       readinessScore >= 80 ? "Good - Normal training load" :
                       readinessScore >= 70 ? "Moderate - Monitor closely" :
                       "Low - Consider modified training"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={wellnessEntry.notes}
                  onChange={(e) => setWellnessEntry(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any additional comments about how you're feeling today..."
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <Button 
                onClick={() => submitWellnessMutation.mutate({
                  playerId: selectedPlayer,
                  date: format(new Date(), 'yyyy-MM-dd'),
                  ...wellnessEntry,
                  readinessScore
                })}
                disabled={submitWellnessMutation.isPending}
                className="w-full"
              >
                {submitWellnessMutation.isPending ? "Submitting..." : "Submit Wellness Entry"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Load Analytics Component
function LoadAnalytics({ 
  players, 
  selectedWeek, 
  onWeekChange 
}: { 
  players: any; 
  selectedWeek: string; 
  onWeekChange: (week: string) => void; 
}) {
  const [selectedMetric, setSelectedMetric] = useState("hml");
  const [viewType, setViewType] = useState("individual");

  // Mock analytics data
  const mockAnalytics = {
    weeklyTargets: {
      totalTargets: 35,
      onTrack: 24,
      behind: 8,
      ahead: 3
    },
    squadTotals: {
      totalDistance: 182500,
      totalHML: 15200,
      totalPlayerLoad: 8750,
      avgReadiness: 84.2
    },
    trendData: [
      { week: "Week 1", distance: 165000, hml: 13800, load: 7200, readiness: 82 },
      { week: "Week 2", distance: 172000, hml: 14200, load: 7800, readiness: 81 },
      { week: "Week 3", distance: 178000, hml: 14800, load: 8200, readiness: 83 },
      { week: "Week 4", distance: 182500, hml: 15200, load: 8750, readiness: 84.2 }
    ],
    playerData: [
      { id: "1", name: "Jake Miller", position: "Lock", targetAchievement: 95, loadTrend: "stable", risk: "low" },
      { id: "2", name: "Tom Wilson", position: "Flanker", targetAchievement: 88, loadTrend: "increasing", risk: "moderate" },
      { id: "3", name: "Sam Davis", position: "Centre", targetAchievement: 103, loadTrend: "stable", risk: "low" }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Load Analytics & Target Tracking</CardTitle>
              <p className="text-gray-600">Advanced analytics for training load management and target achievement</p>
            </div>
            <div className="flex gap-2">
              <Input
                type="date"
                value={selectedWeek}
                onChange={(e) => onWeekChange(e.target.value)}
                className="w-40"
              />
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hml">HML Distance</SelectItem>
                  <SelectItem value="distance">Total Distance</SelectItem>
                  <SelectItem value="load">Player Load</SelectItem>
                  <SelectItem value="readiness">Readiness</SelectItem>
                </SelectContent>
              </Select>
              <Select value={viewType} onValueChange={setViewType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="positional">By Position</SelectItem>
                  <SelectItem value="squad">Squad Totals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Target Achievement Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-green-600">{mockAnalytics.weeklyTargets.onTrack}</div>
            <p className="text-sm text-gray-600">On Track</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold text-blue-600">{mockAnalytics.weeklyTargets.ahead}</div>
            <p className="text-sm text-gray-600">Ahead of Target</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingDown className="w-8 h-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold text-orange-600">{mockAnalytics.weeklyTargets.behind}</div>
            <p className="text-sm text-gray-600">Behind Target</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold text-purple-600">{mockAnalytics.weeklyTargets.totalTargets}</div>
            <p className="text-sm text-gray-600">Total Players</p>
          </CardContent>
        </Card>
      </div>

      {/* Individual Player Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="w-5 h-5" />
            Individual Load Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAnalytics.playerData.map((player) => (
              <div key={player.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{player.name}</p>
                  <p className="text-sm text-gray-600">{player.position}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Target Achievement</p>
                    <div className="flex items-center gap-2">
                      <Progress value={player.targetAchievement} className="w-20" />
                      <span className="text-sm font-medium">{player.targetAchievement}%</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Load Trend</p>
                    <Badge variant={player.loadTrend === "stable" ? "secondary" : "outline"}>
                      {player.loadTrend}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Risk Level</p>
                    <Badge variant={player.risk === "low" ? "secondary" : player.risk === "moderate" ? "destructive" : "outline"}>
                      {player.risk}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Squad Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            4-Week Squad Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockAnalytics.trendData.map((week, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900 mb-3">{week.week}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Distance:</span>
                    <span className="font-medium">{(week.distance / 1000).toFixed(0)}km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>HML:</span>
                    <span className="font-medium">{week.hml}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Load:</span>
                    <span className="font-medium">{week.load}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Readiness:</span>
                    <span className="font-medium">{week.readiness}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper component for Trophy icon (not in lucide-react)
function Trophy({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M4 1a1 1 0 000 2h1v2H2a1 1 0 00-1 1v4a5 5 0 004.63 4.98 8.977 8.977 0 003.37 2.02v1H7a1 1 0 100 2h6a1 1 0 100-2h-2v-1a8.977 8.977 0 003.37-2.02A5 5 0 0019 10V6a1 1 0 00-1-1h-3V3h1a1 1 0 100-2H4zM7 5h6v8.5a7 7 0 01-6 0V5zm-2 4a3 3 0 01-2-2.83V7h2v2zm12-2.83A3 3 0 0115 9V7h2v-.83z" />
    </svg>
  );
}