import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Satellite, 
  Download, 
  Upload, 
  Calendar, 
  Users, 
  TrendingUp, 
  Activity,
  MapPin,
  Zap,
  Clock,
  Settings,
  AlertCircle,
  CheckCircle,
  Play,
  Pause
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function GPSManagement() {
  const [syncStartDate, setSyncStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [syncEndDate, setSyncEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [apiKey, setApiKey] = useState("");
  const [teamId, setTeamId] = useState("");
  const { toast } = useToast();

  const { data: teamSummary, isLoading: summaryLoading } = useQuery({
    queryKey: ['/api/gps/team/summary'],
  });

  const { data: players, isLoading: playersLoading } = useQuery({
    queryKey: ['/api/players'],
  });

  const syncMutation = useMutation({
    mutationFn: async (data: { startDate: string; endDate: string; apiKey: string; teamId: string }) => {
      return await apiRequest('/api/gps/sync', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: (data) => {
      toast({
        title: "GPS Data Synchronized",
        description: `Successfully imported ${data.sessionCount} GPS sessions from StatSports`,
      });
    },
    onError: (error) => {
      toast({
        title: "Sync Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSync = () => {
    if (!apiKey || !teamId) {
      toast({
        title: "Missing Credentials",
        description: "Please provide StatSports API key and team ID",
        variant: "destructive",
      });
      return;
    }

    syncMutation.mutate({
      startDate: syncStartDate,
      endDate: syncEndDate,
      apiKey,
      teamId,
    });
  };

  const formatDistance = (meters: number) => {
    return (meters / 1000).toFixed(2) + ' km';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-nh-navy">GPS Management</h1>
              <p className="text-gray-600 mt-2">
                StatSports GPS data integration and analytics for North Harbour Rugby
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Satellite className="w-6 h-6 text-nh-blue" />
              <span className="text-sm font-medium">StatSports Integration</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sync">Data Sync</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Team Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Active Players</p>
                      <p className="text-2xl font-bold">{players?.length || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Activity className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Sessions</p>
                      <p className="text-2xl font-bold">{teamSummary?.totalSessions || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <MapPin className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Distance</p>
                      <p className="text-2xl font-bold">
                        {teamSummary?.totalDistance ? formatDistance(teamSummary.totalDistance) : '0 km'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Avg Player Load</p>
                      <p className="text-2xl font-bold">
                        {teamSummary?.averagePlayerLoad?.toFixed(0) || 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Status Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>GPS Data Integration</span>
                    <Badge variant="secondary">Ready</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>StatSports API</span>
                    <Badge variant="outline">Awaiting Credentials</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Database Storage</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Real-time Tracking</span>
                    <Badge variant="outline">Available</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Satellite className="w-5 h-5 text-blue-500" />
                    GPS Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Players with GPS Units</span>
                        <span className="text-sm font-medium">42/42</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Data Quality</span>
                        <span className="text-sm font-medium">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Signal Strength</span>
                        <span className="text-sm font-medium">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sync" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  StatSports Data Synchronization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="apiKey">StatSports API Key</Label>
                      <Input
                        id="apiKey"
                        type="password"
                        placeholder="Enter your StatSports API key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="teamId">Team ID</Label>
                      <Input
                        id="teamId"
                        placeholder="Enter your North Harbour Rugby team ID"
                        value={teamId}
                        onChange={(e) => setTeamId(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={syncStartDate}
                        onChange={(e) => setSyncStartDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={syncEndDate}
                        onChange={(e) => setSyncEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Sync GPS Data</h3>
                    <p className="text-sm text-gray-600">
                      Import GPS sessions and player tracking data from StatSports
                    </p>
                  </div>
                  <Button 
                    onClick={handleSync} 
                    disabled={syncMutation.isPending || !apiKey || !teamId}
                    className="bg-nh-red hover:bg-nh-red/90"
                  >
                    {syncMutation.isPending ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Syncing...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Sync Data
                      </>
                    )}
                  </Button>
                </div>

                {!apiKey || !teamId ? (
                  <div className="flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <p className="text-sm text-yellow-800">
                      StatSports API credentials required for data synchronization
                    </p>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            {/* Sync History */}
            <Card>
              <CardHeader>
                <CardTitle>Sync History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Manual Setup Complete</p>
                        <p className="text-sm text-gray-600">Sample GPS data loaded for testing</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">Just now</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent GPS Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Play className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Training Session - Penaia Cakobau</h3>
                        <p className="text-sm text-gray-600">June 15, 2024 • 2.5 hours • 8.42 km</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Player Load: 850</p>
                      <p className="text-sm text-gray-600">Quality: 94%</p>
                    </div>
                  </div>

                  <div className="text-center py-8 text-gray-500">
                    <Satellite className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Connect StatSports API to view live GPS sessions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Average Session Distance</span>
                      <span className="font-semibold">8.42 km</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Peak Speed Recorded</span>
                      <span className="font-semibold">28.5 km/h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Total Player Load</span>
                      <span className="font-semibold">850</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sprint Count Average</span>
                      <span className="font-semibold">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Position Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Forwards</span>
                      <div className="flex items-center gap-2">
                        <Progress value={75} className="w-20 h-2" />
                        <span className="text-sm">75%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Backs</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-20 h-2" />
                        <span className="text-sm">85%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Front Row</span>
                      <div className="flex items-center gap-2">
                        <Progress value={70} className="w-20 h-2" />
                        <span className="text-sm">70%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Movement Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Movement Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Walking</p>
                    <p className="text-2xl font-bold text-blue-600">25%</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Jogging</p>
                    <p className="text-2xl font-bold text-green-600">38%</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Running</p>
                    <p className="text-2xl font-bold text-yellow-600">24%</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">High Speed</p>
                    <p className="text-2xl font-bold text-orange-600">9.5%</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Sprinting</p>
                    <p className="text-2xl font-bold text-red-600">3.5%</p>
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