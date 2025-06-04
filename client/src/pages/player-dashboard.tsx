import { useState } from "react";
import { useParams } from "wouter";
import { Bell, RotateCcw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlayerSelector from "@/components/player-selector";
import PlayerOverview from "@/components/player-overview";
import AISummary from "@/components/ai-summary";
import PhysicalPerformance from "@/components/physical-performance";
import GameStatistics from "@/components/game-statistics";
import RecentActivity from "@/components/recent-activity";
import ReportsAccess from "@/components/reports-access";
import VideoAnalysisComponent from "@/components/video-analysis";
import GPSTracking from "@/components/gps-tracking";
import { usePlayerData } from "@/hooks/use-player-data";

export default function PlayerDashboard() {
  const { playerId: routePlayerId } = useParams();
  const [selectedPlayerId, setSelectedPlayerId] = useState(routePlayerId || "james-mitchell");
  const { data: player, isLoading, error, refetch } = usePlayerData(selectedPlayerId);

  const handlePlayerChange = (playerId: string) => {
    setSelectedPlayerId(playerId);
  };

  const handleRefresh = () => {
    refetch();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error Loading Player Data</h1>
          <p className="text-slate-600 mb-4">{error.message}</p>
          <Button onClick={handleRefresh}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-nh-blue rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🏉</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-nh-navy">North Harbour Rugby</h1>
                <p className="text-sm text-slate-600">Player Performance Hub</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="w-8 h-8 bg-nh-blue rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Player Selector */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex-1">
                <PlayerSelector 
                  selectedPlayerId={selectedPlayerId} 
                  onPlayerChange={handlePlayerChange}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleRefresh} disabled={isLoading}>
                  <RotateCcw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh Data
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Player Overview Sidebar */}
          <div className="lg:col-span-1">
            <PlayerOverview playerId={selectedPlayerId} player={player} isLoading={isLoading} />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* AI Summary */}
            <AISummary playerId={selectedPlayerId} player={player} />

            {/* Tabbed Content */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <Tabs defaultValue="physical" className="w-full">
                <div className="border-b border-slate-200">
                  <TabsList className="bg-transparent h-auto p-0 w-full justify-start">
                    <div className="flex space-x-8 px-6">
                      <TabsTrigger 
                        value="physical" 
                        className="py-4 px-1 border-b-2 border-transparent data-[state=active]:border-nh-blue data-[state=active]:text-nh-blue bg-transparent"
                      >
                        Physical Performance
                      </TabsTrigger>
                      <TabsTrigger 
                        value="skills" 
                        className="py-4 px-1 border-b-2 border-transparent data-[state=active]:border-nh-blue data-[state=active]:text-nh-blue bg-transparent"
                      >
                        Skills & Development
                      </TabsTrigger>
                      <TabsTrigger 
                        value="health" 
                        className="py-4 px-1 border-b-2 border-transparent data-[state=active]:border-nh-blue data-[state=active]:text-nh-blue bg-transparent"
                      >
                        Health & Wellbeing
                      </TabsTrigger>
                      <TabsTrigger 
                        value="game" 
                        className="py-4 px-1 border-b-2 border-transparent data-[state=active]:border-nh-blue data-[state=active]:text-nh-blue bg-transparent"
                      >
                        Game Statistics
                      </TabsTrigger>
                      <TabsTrigger 
                        value="reports" 
                        className="py-4 px-1 border-b-2 border-transparent data-[state=active]:border-nh-blue data-[state=active]:text-nh-blue bg-transparent"
                      >
                        Reports
                      </TabsTrigger>
                      <TabsTrigger 
                        value="video" 
                        className="py-4 px-1 border-b-2 border-transparent data-[state=active]:border-nh-blue data-[state=active]:text-nh-blue bg-transparent"
                      >
                        Video Analysis
                      </TabsTrigger>
                      <TabsTrigger 
                        value="gps" 
                        className="py-4 px-1 border-b-2 border-transparent data-[state=active]:border-nh-blue data-[state=active]:text-nh-blue bg-transparent"
                      >
                        GPS Tracking
                      </TabsTrigger>
                    </div>
                  </TabsList>
                </div>

                <TabsContent value="physical" className="p-6">
                  <PhysicalPerformance playerId={selectedPlayerId} player={player} />
                </TabsContent>

                <TabsContent value="skills" className="p-6">
                  <div className="text-center py-12">
                    <p className="text-slate-500">Skills & Development content coming soon...</p>
                  </div>
                </TabsContent>

                <TabsContent value="health" className="p-6">
                  <div className="text-center py-12">
                    <p className="text-slate-500">Health & Wellbeing content coming soon...</p>
                  </div>
                </TabsContent>

                <TabsContent value="game" className="p-6">
                  <GameStatistics playerId={selectedPlayerId} player={player} />
                </TabsContent>

                <TabsContent value="reports" className="p-6">
                  <ReportsAccess playerId={selectedPlayerId} player={player} />
                </TabsContent>

                <TabsContent value="video" className="p-6">
                  <VideoAnalysisComponent playerId={selectedPlayerId} player={player} />
                </TabsContent>

                <TabsContent value="gps" className="p-6">
                  <GPSTracking 
                    playerId={selectedPlayerId} 
                    playerName={player?.personalDetails?.firstName && player?.personalDetails?.lastName 
                      ? `${player.personalDetails.firstName} ${player.personalDetails.lastName}` 
                      : 'Player'
                    } 
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Activity and Reports */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentActivity playerId={selectedPlayerId} player={player} />
              <ReportsAccess playerId={selectedPlayerId} player={player} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4">
        <div className="flex justify-around">
          <button className="flex flex-col items-center space-y-1 text-nh-blue">
            <span>📊</span>
            <span className="text-xs">Performance</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-slate-400">
            <span>❤️</span>
            <span className="text-xs">Health</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-slate-400">
            <span>🏆</span>
            <span className="text-xs">Games</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-slate-400">
            <span>📄</span>
            <span className="text-xs">Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
}
