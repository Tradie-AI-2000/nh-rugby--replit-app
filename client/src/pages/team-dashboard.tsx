import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import logoPath from "@assets/menulogo_wo.png";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import RealTimeMatchAnalytics from "@/components/real-time-match-analytics";
import PositionGroupedSquadBuilder from "@/components/position-grouped-squad-builder";
import { 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Users, 
  Activity, 
  Clock,
  TrendingUp,
  TrendingDown,
  Shield,
  Target,
  Zap,
  ArrowLeft,
  Settings,
  Bell,
  FileText,
  UserCheck,
  Trophy,
  Heart,
  AlertTriangle,
  DollarSign,
  Home
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
                <div className="flex items-center gap-2 text-sm text-nh-red-200">
                  <Link href="/" className="hover:text-white">Home</Link>
                  <span>›</span>
                  <span className="text-white">Coaching Portal</span>
                </div>
                <p className="text-red-100 text-sm mt-1">Squad Analytics & Operations</p>
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
          <TabsList className="grid w-full grid-cols-7 mb-8 bg-gray-100 p-2 rounded-lg border border-gray-200 gap-1">
            <TabsTrigger 
              value="overview"
              className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="analytics"
              className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="players"
              className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
            >
              Players
            </TabsTrigger>
            <TabsTrigger 
              value="live-match"
              className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
            >
              🔥 Live Match
            </TabsTrigger>
            <TabsTrigger 
              value="schedule"
              className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger 
              value="squad"
              className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
            >
              Squad
            </TabsTrigger>
            <TabsTrigger 
              value="communications"
              className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
            >
              Communications
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

            {/* Recent Match Analytics for Coaching Staff */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-nh-red" />
                  Latest Match Analytics
                </CardTitle>
                <CardDescription>Quick access to recent match performance data for coaching analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Link href="/match-list">
                    <Card className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-green-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-sm">vs Auckland</h4>
                            <p className="text-xs text-gray-600">June 1, 2024 • NPC</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800 text-xs">Win</Badge>
                        </div>
                        <div className="text-lg font-bold text-green-600 mb-2">32-24</div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <div className="font-medium">43%</div>
                            <div className="text-gray-600">Possession</div>
                          </div>
                          <div>
                            <div className="font-medium">49%</div>
                            <div className="text-gray-600">Territory</div>
                          </div>
                          <div>
                            <div className="font-medium">86%</div>
                            <div className="text-gray-600">Tackles</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-sm">vs Canterbury</h4>
                          <p className="text-xs text-gray-600">May 25, 2024 • NPC</p>
                        </div>
                        <Badge className="bg-red-100 text-red-800 text-xs">Loss</Badge>
                      </div>
                      <div className="text-lg font-bold text-red-600 mb-2">18-31</div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <div className="font-medium">38%</div>
                          <div className="text-gray-600">Possession</div>
                        </div>
                        <div>
                          <div className="font-medium">42%</div>
                          <div className="text-gray-600">Territory</div>
                        </div>
                        <div>
                          <div className="font-medium">82%</div>
                          <div className="text-gray-600">Tackles</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-sm">vs Otago</h4>
                          <p className="text-xs text-gray-600">May 18, 2024 • NPC</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 text-xs">Win</Badge>
                      </div>
                      <div className="text-lg font-bold text-green-600 mb-2">28-21</div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <div className="font-medium">51%</div>
                          <div className="text-gray-600">Possession</div>
                        </div>
                        <div>
                          <div className="font-medium">55%</div>
                          <div className="text-gray-600">Territory</div>
                        </div>
                        <div>
                          <div className="font-medium">88%</div>
                          <div className="text-gray-600">Tackles</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Link href="/analytics/match-list">
                  <Button className="w-full bg-nh-red hover:bg-nh-red-600 text-white">
                    <Trophy className="h-4 w-4 mr-2" />
                    View Comprehensive Match Analytics
                  </Button>
                </Link>
              </CardContent>
            </Card>

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

          {/* Players Tab */}
          <TabsContent value="players" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Player Search and Filters */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Player Filters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Position</label>
                      <select className="w-full mt-1 p-2 border rounded-md">
                        <option>All Positions</option>
                        <option>Front Row</option>
                        <option>Second Row</option>
                        <option>Back Row</option>
                        <option>Half Back</option>
                        <option>Centre</option>
                        <option>Back Three</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <select className="w-full mt-1 p-2 border rounded-md">
                        <option>All Players</option>
                        <option>Available</option>
                        <option>Injured</option>
                        <option>Modified Training</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Player Roster */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="mr-2 h-5 w-5" />
                      Squad Roster
                    </CardTitle>
                    <CardDescription>
                      Click on any player to view their detailed profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { id: "tane_edmed", name: "Tane Edmed", position: "First-Five", number: 10, status: "available", value: 8.7 },
                        { id: "jimmy_maher", name: "Jimmy Maher", position: "Lock", number: 4, status: "available", value: 8.5 },
                        { id: "mark_telea", name: "Mark Tele'a", position: "Wing", number: 11, status: "modified", value: 8.3 },
                        { id: "cam_christie", name: "Cam Christie", position: "Lock", number: 5, status: "injured", value: 7.9 },
                        { id: "bryn_gordon", name: "Bryn Gordon", position: "Hooker", number: 2, status: "available", value: 8.1 },
                        { id: "aidan_ross", name: "Aidan Ross", position: "Prop", number: 3, status: "available", value: 7.8 },
                        { id: "ethan_roots", name: "Ethan Roots", position: "No.8", number: 8, status: "available", value: 8.4 },
                        { id: "tom_robinson", name: "Tom Robinson", position: "Flanker", number: 7, status: "available", value: 8.0 },
                        { id: "sam_darry", name: "Sam Darry", position: "Second Row", number: 19, status: "available", value: 7.7 },
                        { id: "riley_hohepa", name: "Riley Hohepa", position: "Scrum-Half", number: 9, status: "available", value: 8.2 },
                        { id: "david_havili", name: "David Havili", position: "Centre", number: 12, status: "available", value: 8.6 },
                        { id: "connor_garden_bachop", name: "Connor Garden-Bachop", position: "Fullback", number: 15, status: "available", value: 8.1 }
                      ].map((player) => (
                        <Link key={player.id} href={`/player/${player.id}`}>
                          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-300">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="font-bold text-blue-600">#{player.number}</span>
                                  </div>
                                  <div>
                                    <div className="font-medium text-sm">{player.name}</div>
                                    <div className="text-xs text-gray-600">{player.position}</div>
                                  </div>
                                </div>
                                <Badge 
                                  className={
                                    player.status === 'available' ? 'bg-green-100 text-green-800' :
                                    player.status === 'modified' ? 'bg-amber-100 text-amber-800' :
                                    'bg-red-100 text-red-800'
                                  }
                                >
                                  {player.status === 'available' && 'Available'}
                                  {player.status === 'modified' && 'Modified'}
                                  {player.status === 'injured' && 'Injured'}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-500">Player Value:</span>
                                <span className="font-bold text-blue-600">{player.value}/10</span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
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
            <PositionGroupedSquadBuilder />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="space-y-6">
              {/* Analytics Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    id: "cohesion",
                    title: "Team Cohesion Analytics",
                    description: "GAIN LINE Analytics framework tracking team understanding and working relationships",
                    primaryMetric: { value: "24.1%", label: "Team Work Index", trend: "up", trendValue: "+2.9%" },
                    secondaryMetrics: [
                      { label: "In-Season Cohesion", value: 512, color: "text-blue-600" },
                      { label: "Zero Gaps", value: 17, color: "text-red-600" },
                      { label: "Squad Stability", value: "2.3", color: "text-orange-600" }
                    ],
                    status: "warning",
                    icon: <Users className="w-6 h-6" />,
                    route: "/team-cohesion"
                  },
                  {
                    id: "performance",
                    title: "Match Performance Analytics",
                    description: "Comprehensive match statistics, win rates, and performance trends analysis",
                    primaryMetric: { value: "67%", label: "Win Rate", trend: "up", trendValue: "+12%" },
                    secondaryMetrics: [
                      { label: "Points For", value: 385, color: "text-green-600" },
                      { label: "Points Against", value: 298, color: "text-red-600" },
                      { label: "Point Differential", value: "+87", color: "text-green-600" }
                    ],
                    status: "good",
                    icon: <Trophy className="w-6 h-6" />,
                    route: "/analytics/match-list"
                  },
                  {
                    id: "work-rate",
                    title: "Work Rate Report",
                    description: "OPTA match data integration with GPS analysis for comprehensive player work rate insights",
                    primaryMetric: { value: "8.4km", label: "Avg Work Rate", trend: "up", trendValue: "+0.3km" },
                    secondaryMetrics: [
                      { label: "High Intensity", value: "24%", color: "text-red-600" },
                      { label: "Sprint Distance", value: "485m", color: "text-purple-600" },
                      { label: "Work Efficiency", value: "87%", color: "text-green-600" }
                    ],
                    status: "good",
                    icon: <BarChart3 className="w-6 h-6" />,
                    route: "/work-rate-report"
                  },
                  {
                    id: "fitness",
                    title: "Fitness & Conditioning",
                    description: "Player fitness levels, training loads, and physical conditioning metrics",
                    primaryMetric: { value: "89%", label: "Average Fitness Score", trend: "up", trendValue: "+5%" },
                    secondaryMetrics: [
                      { label: "Training Attendance", value: "94%", color: "text-blue-600" },
                      { label: "Load Management", value: "Optimal", color: "text-green-600" },
                      { label: "Recovery Rate", value: "92%", color: "text-green-600" }
                    ],
                    status: "good",
                    icon: <Activity className="w-6 h-6" />,
                    route: "/fitness-analytics"
                  },
                  {
                    id: "injury",
                    title: "Injury Prevention & Medical",
                    description: "Injury tracking, risk assessment, and medical monitoring dashboard",
                    primaryMetric: { value: "6.4%", label: "Injury Rate", trend: "down", trendValue: "-1.2%" },
                    secondaryMetrics: [
                      { label: "Players Available", value: "42/45", color: "text-green-600" },
                      { label: "High Risk", value: 3, color: "text-orange-600" },
                      { label: "Recovery Time", value: "12 days", color: "text-blue-600" }
                    ],
                    status: "warning",
                    icon: <Heart className="w-6 h-6" />,
                    route: "/medical-analytics"
                  },
                  {
                    id: "gps",
                    title: "GPS & Movement Analytics",
                    description: "StatSports GPS data analysis including distance, speed, and workload metrics",
                    primaryMetric: { value: "8.2km", label: "Avg Distance/Session", trend: "stable", trendValue: "±0.3km" },
                    secondaryMetrics: [
                      { label: "Max Speed", value: "32.4 km/h", color: "text-purple-600" },
                      { label: "Player Load", value: "485", color: "text-blue-600" },
                      { label: "Sprint Count", value: "23", color: "text-green-600" }
                    ],
                    status: "good",
                    icon: <Zap className="w-6 h-6" />,
                    route: "/gps-analytics"
                  },
                  {
                    id: "moneyball",
                    title: "Player Value Analysis",
                    description: "Comprehensive player value assessment using WEI, cohesion metrics, and performance analytics",
                    primaryMetric: { value: "$290k", label: "Total Contract Value", trend: "up", trendValue: "+15%" },
                    secondaryMetrics: [
                      { label: "Avg Work Efficiency", value: "85.4%", color: "text-green-600" },
                      { label: "Players Analyzed", value: 3, color: "text-blue-600" },
                      { label: "Cohesion Score", value: "9.2/10", color: "text-purple-600" }
                    ],
                    status: "good",
                    icon: <DollarSign className="w-6 h-6" />,
                    route: "/moneyball"
                  },
                  {
                    id: "tactical",
                    title: "Tactical Analysis",
                    description: "Game strategy analysis, formation effectiveness, and tactical insights",
                    primaryMetric: { value: "78%", label: "Set Piece Success", trend: "up", trendValue: "+8%" },
                    secondaryMetrics: [
                      { label: "Lineout Success", value: "85%", color: "text-green-600" },
                      { label: "Scrum Success", value: "92%", color: "text-green-600" },
                      { label: "Turnover Rate", value: "14%", color: "text-orange-600" }
                    ],
                    status: "good",
                    icon: <Target className="w-6 h-6" />,
                    route: "/tactical-analytics"
                  }
                ].map((card) => (
                  <Link key={card.id} href={card.route}>
                    <Card className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 ${
                      card.status === "good" ? "border-green-200 bg-green-50" :
                      card.status === "warning" ? "border-orange-200 bg-orange-50" :
                      card.status === "critical" ? "border-red-200 bg-red-50" : "border-gray-200 bg-white"
                    }`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {card.icon}
                            <CardTitle className="text-sm font-semibold">{card.title}</CardTitle>
                          </div>
                          <Badge className={
                            card.status === "good" ? "bg-green-100 text-green-800" :
                            card.status === "warning" ? "bg-orange-100 text-orange-800" :
                            card.status === "critical" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
                          }>
                            {card.status === "good" ? "Healthy" :
                             card.status === "warning" ? "Monitor" :
                             card.status === "critical" ? "Attention" : "Neutral"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-xs text-gray-600 leading-relaxed">{card.description}</p>
                        
                        {/* Primary Metric */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold">{card.primaryMetric.value}</span>
                            <div className="flex items-center gap-1">
                              {card.primaryMetric.trend === "up" ? <TrendingUp className="w-4 h-4 text-green-600" /> :
                               card.primaryMetric.trend === "down" ? <TrendingDown className="w-4 h-4 text-red-600" /> :
                               <BarChart3 className="w-4 h-4 text-gray-600" />}
                              <span className="text-xs font-medium">{card.primaryMetric.trendValue}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{card.primaryMetric.label}</p>
                        </div>

                        {/* Secondary Metrics */}
                        <div className="space-y-2 pt-2 border-t border-gray-200">
                          {card.secondaryMetrics.map((metric, index) => (
                            <div key={index} className="flex justify-between text-xs">
                              <span className="text-gray-600">{metric.label}</span>
                              <span className={`font-medium ${metric.color || 'text-gray-900'}`}>
                                {metric.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Action Button */}
                        <Button 
                          className="w-full mt-4 bg-nh-red hover:bg-nh-red-600 text-white"
                          size="sm"
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Quick Stats Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">7</div>
                    <p className="text-sm text-blue-800">Active Analytics Modules</p>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">5</div>
                    <p className="text-sm text-green-800">Metrics Improving</p>
                  </CardContent>
                </Card>
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">1</div>
                    <p className="text-sm text-orange-800">Areas to Monitor</p>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">45</div>
                    <p className="text-sm text-purple-800">Players Tracked</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}