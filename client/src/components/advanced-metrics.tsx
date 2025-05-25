import { useState } from "react";
import { TrendingUp, Activity, Heart, Zap, MapPin, Calendar, Target, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import type { Player } from "@shared/schema";

interface AdvancedMetricsProps {
  playerId: string;
  player?: Player;
}

export default function AdvancedMetrics({ playerId, player }: AdvancedMetricsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("season");

  if (!player) {
    return (
      <div className="text-center py-12">
        <Activity className="h-12 w-12 mx-auto mb-4 text-slate-300" />
        <p className="text-slate-500">No advanced metrics data available</p>
      </div>
    );
  }

  // Sample advanced metrics data
  const performanceData = [
    { date: "2024-01-15", distance: 8.2, topSpeed: 28.5, heartRate: 165, workRate: 8.7 },
    { date: "2024-01-22", distance: 9.1, topSpeed: 29.2, heartRate: 170, workRate: 9.2 },
    { date: "2024-01-29", distance: 7.8, topSpeed: 27.8, heartRate: 162, workRate: 8.4 },
    { date: "2024-02-05", distance: 9.5, topSpeed: 30.1, heartRate: 175, workRate: 9.5 },
    { date: "2024-02-12", distance: 8.9, topSpeed: 29.8, heartRate: 168, workRate: 9.1 },
    { date: "2024-02-19", distance: 10.2, topSpeed: 31.2, heartRate: 172, workRate: 9.8 },
  ];

  const rugbyMetrics = [
    { metric: "Rucks", value: 145, change: "+12%" },
    { metric: "Lineouts", value: 89, change: "+8%" },
    { metric: "Scrums", value: 34, change: "+3%" },
    { metric: "Mauls", value: 28, change: "+15%" },
    { metric: "Turnovers", value: 23, change: "+18%" },
    { metric: "Territory", value: 67, change: "+5%" },
  ];

  const radarData = [
    { subject: 'Speed', A: 88, fullMark: 100 },
    { subject: 'Endurance', A: 92, fullMark: 100 },
    { subject: 'Strength', A: 85, fullMark: 100 },
    { subject: 'Agility', A: 90, fullMark: 100 },
    { subject: 'Skills', A: 87, fullMark: 100 },
    { subject: 'Leadership', A: 94, fullMark: 100 },
  ];

  const heatMapData = [
    { x: 20, y: 15, intensity: 0.8 },
    { x: 25, y: 30, intensity: 0.9 },
    { x: 35, y: 25, intensity: 0.7 },
    { x: 45, y: 20, intensity: 0.95 },
    { x: 50, y: 35, intensity: 0.6 },
    { x: 60, y: 28, intensity: 0.85 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-nh-navy">Advanced Performance Metrics</h2>
          <p className="text-slate-600">Comprehensive performance analytics and insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={selectedPeriod === "game" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("game")}
          >
            Last Game
          </Button>
          <Button
            variant={selectedPeriod === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("month")}
          >
            This Month
          </Button>
          <Button
            variant={selectedPeriod === "season" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("season")}
          >
            Season
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Distance Covered</p>
                <p className="text-2xl font-bold text-nh-navy">9.2km</p>
                <p className="text-xs text-green-600">+8% vs avg</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <Activity className="h-6 w-6 text-nh-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Top Speed</p>
                <p className="text-2xl font-bold text-nh-navy">31.2 km/h</p>
                <p className="text-xs text-green-600">+5% vs avg</p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Avg Heart Rate</p>
                <p className="text-2xl font-bold text-nh-navy">172 bpm</p>
                <p className="text-xs text-amber-600">+2% vs avg</p>
              </div>
              <div className="p-3 bg-red-50 rounded-full">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Work Rate</p>
                <p className="text-2xl font-bold text-nh-navy">9.8/10</p>
                <p className="text-xs text-green-600">+12% vs avg</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-full">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-2 rounded-lg border border-gray-200 gap-1">
          <TabsTrigger 
            value="trends"
            className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
          >
            Performance Trends
          </TabsTrigger>
          <TabsTrigger 
            value="rugby"
            className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
          >
            Rugby Metrics
          </TabsTrigger>
          <TabsTrigger 
            value="radar"
            className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
          >
            Skills Analysis
          </TabsTrigger>
          <TabsTrigger 
            value="heatmap"
            className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
          >
            Position Heat Map
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-nh-blue" />
                  Distance & Speed Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="distance" stroke="#1f2937" strokeWidth={2} name="Distance (km)" />
                    <Line type="monotone" dataKey="topSpeed" stroke="#3b82f6" strokeWidth={2} name="Top Speed (km/h)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Heart Rate & Work Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="heartRate" stackId="1" stroke="#ef4444" fill="#fecaca" name="Heart Rate (bpm)" />
                    <Area type="monotone" dataKey="workRate" stackId="2" stroke="#8b5cf6" fill="#ddd6fe" name="Work Rate (/10)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rugby" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rugby-Specific Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rugbyMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-nh-navy">{metric.metric}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                      </div>
                      <Badge variant={metric.change.startsWith('+') ? 'default' : 'secondary'} className="bg-green-100 text-green-800">
                        {metric.change}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Match Involvement</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={rugbyMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#1f2937" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="radar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-nh-blue" />
                Skills & Attributes Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Performance" dataKey="A" stroke="#1f2937" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                {radarData.map((item, index) => (
                  <div key={index} className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-600">{item.subject}</p>
                    <p className="text-xl font-bold text-nh-navy">{item.A}/100</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-nh-blue" />
                Field Position Heat Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-green-50 rounded-lg p-4" style={{ aspectRatio: '3/2' }}>
                <div className="absolute inset-0 bg-gradient-to-b from-green-100 to-green-200 rounded-lg opacity-50"></div>
                <div className="relative h-full">
                  {/* Rugby field markings */}
                  <div className="absolute inset-0 border-2 border-white rounded-lg"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white transform -translate-x-0.5"></div>
                  <div className="absolute left-0 right-0 top-1/4 h-0.5 bg-white"></div>
                  <div className="absolute left-0 right-0 top-3/4 h-0.5 bg-white"></div>
                  
                  {/* Heat map points */}
                  {heatMapData.map((point, index) => (
                    <div
                      key={index}
                      className="absolute w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        backgroundColor: `rgba(59, 130, 246, ${point.intensity})`,
                        boxShadow: `0 0 ${point.intensity * 20}px rgba(59, 130, 246, ${point.intensity * 0.5})`,
                      }}
                    ></div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-slate-600">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-200 mr-1"></div>
                    <span>Low Activity</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                    <span>High Activity</span>
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