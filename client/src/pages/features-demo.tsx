import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdvancedMetrics from "@/components/advanced-metrics";
import InjuryTracking from "@/components/injury-tracking";
import TrainingPrograms from "@/components/training-programs";
import PlayerComparison from "@/components/player-comparison";
import TeamCommunication from "@/components/team-communication";
import VideoAnalysisComponent from "@/components/video-analysis";

// Sample comprehensive player data for demonstration
const samplePlayer = {
  id: "james-mitchell",
  personalDetails: {
    firstName: "James",
    lastName: "Mitchell",
    dateOfBirth: "1995-03-15",
    email: "james.mitchell@northharbour.rugby",
    phone: "+64 21 555 0123",
    address: "123 Rugby Lane, Auckland, New Zealand",
    emergencyContact: {
      name: "Sarah Mitchell",
      relationship: "Wife",
      phone: "+64 21 555 0124"
    }
  },
  rugbyProfile: {
    primaryPosition: "Hooker",
    secondaryPositions: ["Lock"],
    playingLevel: "Semi-Professional",
    experience: "8 years",
    jerseyNumber: 2,
    preferredFoot: "Right",
    height: 185,
    weight: 105
  },
  skills: {
    ballHandling: 85,
    passing: 89,
    kicking: 72,
    lineoutThrowing: 92,
    scrummaging: 88,
    rucking: 86,
    defense: 91,
    communication: 94
  }
};

export default function FeaturesDemo() {
  const [activeFeature, setActiveFeature] = useState("overview");

  const features = [
    {
      id: "metrics",
      title: "Advanced Performance Metrics",
      description: "Real-time analytics with GPS tracking, heart rate monitoring, and rugby-specific metrics",
      highlights: ["Distance tracking", "Speed analysis", "Heat maps", "Performance trends"]
    },
    {
      id: "injury",
      title: "Injury Tracking & Medical Management",
      description: "Comprehensive injury monitoring with treatment plans and recovery tracking",
      highlights: ["Injury history", "Treatment plans", "Recovery progress", "Prevention strategies"]
    },
    {
      id: "training",
      title: "Training Program Planning",
      description: "Personalized training schedules with progress tracking and exercise management",
      highlights: ["Custom programs", "Weekly schedules", "Progress tracking", "Exercise library"]
    },
    {
      id: "comparison",
      title: "Player Comparison & Benchmarking",
      description: "Compare performance against teammates and industry standards",
      highlights: ["Peer comparison", "Position benchmarks", "Trend analysis", "Performance rankings"]
    },
    {
      id: "communication",
      title: "Team Communication Hub",
      description: "Centralized messaging system for team announcements and coordination",
      highlights: ["Team messages", "Announcements", "Priority alerts", "File sharing"]
    },
    {
      id: "video",
      title: "Video Analysis & Highlight Reels",
      description: "Professional video analysis tools with highlight compilation and performance insights",
      highlights: ["Match highlights", "Skill analysis", "Key moments", "Coach feedback"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* North Harbour Rugby Header */}
      <div className="bg-nh-red text-white px-6 py-4 mb-8">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <img 
            src="/attached_assets/menulogo_wo.png" 
            alt="North Harbour Rugby"
            className="h-16 w-auto"
          />
          <div>
            <h1 className="text-3xl font-bold">North Harbour Rugby Performance Hub</h1>
            <p className="text-lg opacity-90">Advanced Player Analytics & Performance Management</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Content Header */}
        <div className="mb-8">
          <p className="text-xl text-slate-600 mb-6">
            Complete Player Performance Analytics Platform
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-nh-blue">8</div>
                <div className="text-sm text-slate-600">Advanced Features</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-nh-navy">100%</div>
                <div className="text-sm text-slate-600">Mobile Responsive</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600">Pro</div>
                <div className="text-sm text-slate-600">Rugby Analytics</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs value={activeFeature} onValueChange={setActiveFeature} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="injury">Medical</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="comparison">Compare</TabsTrigger>
            <TabsTrigger value="communication">Messages</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Platform Features Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature) => (
                    <Card 
                      key={feature.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setActiveFeature(feature.id)}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg text-nh-navy">{feature.title}</CardTitle>
                        <p className="text-slate-600 text-sm">{feature.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Key Features:</h4>
                          <div className="flex flex-wrap gap-2">
                            {feature.highlights.map((highlight, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technology Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="font-bold text-nh-blue">React + TypeScript</div>
                    <div className="text-sm text-slate-600">Frontend</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="font-bold text-green-600">PostgreSQL</div>
                    <div className="text-sm text-slate-600">Database</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="font-bold text-purple-600">Express.js</div>
                    <div className="text-sm text-slate-600">Backend</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="font-bold text-orange-600">Gemini AI</div>
                    <div className="text-sm text-slate-600">Analytics</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics">
            <AdvancedMetrics playerId="james-mitchell" player={samplePlayer as any} />
          </TabsContent>

          <TabsContent value="injury">
            <InjuryTracking playerId="james-mitchell" player={samplePlayer as any} />
          </TabsContent>

          <TabsContent value="training">
            <TrainingPrograms playerId="james-mitchell" player={samplePlayer as any} />
          </TabsContent>

          <TabsContent value="comparison">
            <PlayerComparison playerId="james-mitchell" player={samplePlayer as any} />
          </TabsContent>

          <TabsContent value="communication">
            <TeamCommunication playerId="james-mitchell" player={samplePlayer as any} />
          </TabsContent>

          <TabsContent value="video">
            <VideoAnalysisComponent playerId="james-mitchell" player={samplePlayer as any} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}