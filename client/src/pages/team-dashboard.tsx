import { useState } from "react";
import { Link } from "wouter";
import logoPath from "@assets/menulogo_wo.png";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import RealTimeMatchAnalytics from "@/components/real-time-match-analytics";
import { 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Users, 
  Activity, 
  Clock,
  TrendingUp,
  Shield,
  Target,
  Zap,
  ArrowLeft,
  Settings,
  Bell,
  FileText,
  UserCheck
} from "lucide-react";

export default function TeamDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample team schedule data
  const weeklySchedule = [
    { day: "Monday", time: "6:00 AM", activity: "Strength Training", location: "Gym A", attendees: 32 },
    { day: "Tuesday", time: "5:30 PM", activity: "Skills Training", location: "Field 1", attendees: 28 },
    { day: "Wednesday", time: "6:00 AM", activity: "Conditioning", location: "Track", attendees: 35 },
    { day: "Thursday", time: "5:30 PM", activity: "Team Practice", location: "Field 1", attendees: 40 },
    { day: "Friday", time: "Rest Day", activity: "Recovery Session", location: "Pool", attendees: 15 },
    { day: "Saturday", time: "2:00 PM", activity: "Match Day", location: "QBE Stadium", attendees: 47 },
    { day: "Sunday", time: "Rest Day", activity: "Optional Recovery", location: "Various", attendees: 12 }
  ];

  const squadRotation = [
    { position: "Front Row", starters: ["J. Mitchell", "A. Thompson", "M. Davis"], bench: ["K. Wilson", "L. Brown"] },
    { position: "Second Row", starters: ["S. Clarke", "R. Anderson"], bench: ["T. White", "C. Johnson"] },
    { position: "Back Row", starters: ["D. Taylor", "N. Evans", "P. Roberts"], bench: ["J. Lee", "M. Garcia"] },
    { position: "Half Backs", starters: ["A. Martinez", "C. Wilson"], bench: ["B. Moore", "L. Jackson"] },
    { position: "Centres", starters: ["K. Thompson", "R. Davis"], bench: ["S. Miller", "A. Clark"] },
    { position: "Back Three", starters: ["M. Johnson", "L. Williams", "T. Brown"], bench: ["D. Jones", "K. Taylor"] }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* North Harbour Rugby Header */}
      <div className="bg-nh-red text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-red-700">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Main
                </Button>
              </Link>
              <img 
                src={logoPath} 
                alt="North Harbour Rugby" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold">Team Management Portal</h1>
                <p className="text-red-100">Squad Analytics & Operations</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-red-700">
                <Bell size={16} className="mr-2" />
                Notifications
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-red-700">
                <Settings size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 bg-gray-100 p-2 rounded-lg border border-gray-200 gap-1">
            <TabsTrigger 
              value="overview"
              className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="schedule"
              className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger 
              value="live-match"
              className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
            >
              🔥 Live Match
            </TabsTrigger>
            <TabsTrigger 
              value="communications"
              className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
            >
              Communications
            </TabsTrigger>
            <TabsTrigger 
              value="squad"
              className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
            >
              Squad
            </TabsTrigger>
            <TabsTrigger 
              value="analytics"
              className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="mx-auto mb-3 text-blue-600" size={32} />
                  <div className="text-2xl font-bold text-gray-900">47</div>
                  <div className="text-sm text-gray-600">Squad Size</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Activity className="mx-auto mb-3 text-green-600" size={32} />
                  <div className="text-2xl font-bold text-gray-900">89%</div>
                  <div className="text-sm text-gray-600">Avg Fitness</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="mx-auto mb-3 text-purple-600" size={32} />
                  <div className="text-2xl font-bold text-gray-900">3</div>
                  <div className="text-sm text-gray-600">Current Injuries</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Target className="mx-auto mb-3 text-orange-600" size={32} />
                  <div className="text-2xl font-bold text-gray-900">8-4</div>
                  <div className="text-sm text-gray-600">Season Record</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar size={20} />
                    <span>This Week's Schedule</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {weeklySchedule.slice(0, 4).map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{session.day} - {session.activity}</div>
                          <div className="text-sm text-gray-600">{session.time} at {session.location}</div>
                        </div>
                        <Badge variant="secondary">{session.attendees} players</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell size={20} />
                    <span>Recent Team Updates</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium">Match Report Available</div>
                        <div className="text-sm text-gray-600">vs Blues - detailed analysis ready</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium">Training Session Completed</div>
                        <div className="text-sm text-gray-600">40/47 players attended</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium">Squad Changes</div>
                        <div className="text-sm text-gray-600">2 players returned from injury</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar size={24} />
                    <span>Weekly Training Schedule</span>
                  </div>
                  <Button className="bg-nh-red hover:bg-red-700">
                    <Settings size={16} className="mr-2" />
                    Edit Schedule
                  </Button>
                </CardTitle>
                <CardDescription>
                  Manage training sessions, match schedules, and team activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {weeklySchedule.map((session, index) => (
                    <Card key={index} className="border-l-4 border-l-nh-red">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="text-center min-w-[80px]">
                              <div className="font-bold text-lg">{session.day}</div>
                              <div className="text-sm text-gray-600">{session.time}</div>
                            </div>
                            <div>
                              <div className="font-semibold text-lg">{session.activity}</div>
                              <div className="text-gray-600">{session.location}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge 
                              variant={session.attendees > 35 ? "default" : "secondary"}
                              className={session.attendees > 35 ? "bg-green-600" : ""}
                            >
                              {session.attendees} players
                            </Badge>
                            <div className="text-sm text-gray-500 mt-1">
                              {Math.round((session.attendees / 47) * 100)}% attendance
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="live-match" className="space-y-6">
            <RealTimeMatchAnalytics matchId="nh-vs-crusaders-2024" isLive={true} />
          </TabsContent>

          <TabsContent value="communications" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare size={20} />
                    <span>Slack Integration</span>
                  </CardTitle>
                  <CardDescription>
                    Connect with your coaching team through Slack
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-green-800">Connected to Slack</span>
                    </div>
                    <div className="text-sm text-green-700">
                      #north-harbour-coaching channel active
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium">Recent Messages</div>
                      <div className="text-sm text-gray-600 mt-1">
                        "Training intensity looking great today! 💪" - Jimmy Maher
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium">Match Analysis</div>
                      <div className="text-sm text-gray-600 mt-1">
                        "Lineout stats uploaded to performance hub" - Nick Marquet
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <MessageSquare size={16} className="mr-2" />
                    Open Slack Channel
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell size={20} />
                    <span>Team Announcements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 bg-blue-50 border-l-4 border-l-blue-500 rounded-lg">
                      <div className="font-medium text-blue-800">Match Day Reminder</div>
                      <div className="text-sm text-blue-700 mt-1">
                        Saturday 2:00 PM vs Crusaders at QBE Stadium
                      </div>
                      <div className="text-xs text-blue-600 mt-2">Posted 2 hours ago</div>
                    </div>
                    
                    <div className="p-4 bg-purple-50 border-l-4 border-l-purple-500 rounded-lg">
                      <div className="font-medium text-purple-800">Nutrition Workshop</div>
                      <div className="text-sm text-purple-700 mt-1">
                        Optional session Tuesday 4:00 PM with team nutritionist
                      </div>
                      <div className="text-xs text-purple-600 mt-2">Posted 1 day ago</div>
                    </div>

                    <div className="p-4 bg-green-50 border-l-4 border-l-green-500 rounded-lg">
                      <div className="font-medium text-green-800">Recovery Session</div>
                      <div className="text-sm text-green-700 mt-1">
                        Pool recovery available Sunday 10:00 AM
                      </div>
                      <div className="text-xs text-green-600 mt-2">Posted 2 days ago</div>
                    </div>
                  </div>

                  <Button className="w-full bg-nh-red hover:bg-red-700">
                    <Bell size={16} className="mr-2" />
                    Create Announcement
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="squad" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users size={24} />
                  <span>Squad Rotation & Lineup</span>
                </CardTitle>
                <CardDescription>
                  Manage starting lineups and squad rotation for optimal performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {squadRotation.map((position, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="font-semibold text-lg mb-3 text-nh-red">{position.position}</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="font-medium mb-2 text-green-700">Starting XV</div>
                          <div className="space-y-1">
                            {position.starters.map((player, playerIndex) => (
                              <div key={playerIndex} className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                                <UserCheck size={16} className="text-green-600" />
                                <span>{player}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium mb-2 text-blue-700">Bench</div>
                          <div className="space-y-1">
                            {position.bench.map((player, playerIndex) => (
                              <div key={playerIndex} className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                                <Users size={16} className="text-blue-600" />
                                <span>{player}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 size={20} />
                    <span>Team Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Average Fitness Score</span>
                      <span className="text-2xl font-bold text-green-600">89%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Training Attendance</span>
                      <span className="text-2xl font-bold text-blue-600">94%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Injury Rate</span>
                      <span className="text-2xl font-bold text-orange-600">6.4%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Match Win Rate</span>
                      <span className="text-2xl font-bold text-purple-600">67%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp size={20} />
                    <span>Performance Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                      <div className="font-medium text-green-800">Fitness Improving</div>
                      <div className="text-sm text-green-700">+5% from last month</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
                      <div className="font-medium text-blue-800">Attendance Stable</div>
                      <div className="text-sm text-blue-700">Consistent 94% rate</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-l-orange-500">
                      <div className="font-medium text-orange-800">Monitor Injuries</div>
                      <div className="text-sm text-orange-700">Slight increase this week</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}