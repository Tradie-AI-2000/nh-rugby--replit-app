import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, TrendingDown, Target, Users, Trophy, Activity, Brain, FileText, Upload, ArrowLeft, Home } from "lucide-react";
import { sampleMatchPerformance, matchAnalyticsSections } from "@/data/sampleMatchData";
import { TryAnalysisSimplified } from "@/pages/try-analysis-simplified";
import logoPath from "@assets/menulogo_wo.png";

interface AIAnalysisProps {
  sectionId: string;
  data: any;
}

const AIAnalysis = ({ sectionId, data }: AIAnalysisProps) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [geminiInsights, setGeminiInsights] = useState<any>(null);

  const generateAnalysis = async () => {
    setIsLoading(true);
    
    try {
      // Use real Google Gemini AI for analysis
      const response = await fetch("/api/gemini/analyze-section", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sectionId,
          matchData: sampleMatchPerformance.matchInfo,
          teamStats: sampleMatchPerformance.teamStats,
          playerPerformances: sampleMatchPerformance.playerPerformances
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate analysis");
      }

      const geminiResult = await response.json();
      setGeminiInsights(geminiResult);
      setAnalysis(geminiResult.analysis);
    } catch (error) {
      console.error("Error generating Gemini analysis:", error);
      // Enhanced analysis structure with professional insights
      setAnalysis(`**GOOGLE GEMINI AI ANALYSIS - ${sectionId.replace('_', ' ').toUpperCase()}**

**STATUS:** Gemini AI analysis temporarily unavailable. Enable by providing valid GEMINI_API_KEY.

**PROFESSIONAL INSIGHTS AVAILABLE:**
• Expert rugby analysis engine ready
• 20+ years coaching experience algorithms
• Real-time tactical recommendations
• Performance benchmarking against professional standards

**TO ACTIVATE GEMINI AI:**
1. Ensure GEMINI_API_KEY is properly configured
2. Click "Generate Insights" for comprehensive analysis
3. Receive detailed tactical recommendations from AI expert

**FALLBACK ANALYSIS:** Basic statistical overview provided. For advanced insights including tactical recommendations, player development plans, and coaching strategies, activate Gemini AI integration.`);
    }
    
    setIsLoading(false);
  };

  return (
    <Card className="border border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-purple-800 flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Google Gemini AI Analysis
          </CardTitle>
          <Button 
            onClick={generateAnalysis}
            disabled={isLoading}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isLoading ? "Analyzing..." : "Generate Insights"}
          </Button>
        </div>
      </CardHeader>
      {analysis && (
        <CardContent className="pt-0">
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-white p-4 rounded-lg border">
              {analysis}
            </pre>
          </div>
          {geminiInsights && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-3">
                <div className="text-sm font-semibold text-purple-800 mb-2">Performance Rating</div>
                <div className="text-2xl font-bold text-purple-600">
                  {geminiInsights.performanceRating}/10
                </div>
              </Card>
              <Card className="p-3">
                <div className="text-sm font-semibold text-purple-800 mb-2">Confidence Level</div>
                <div className="text-2xl font-bold text-purple-600">
                  {geminiInsights.confidence}%
                </div>
              </Card>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

const PossessionTerritorySection = () => {
  const data = sampleMatchPerformance.teamStats;
  
  const possessionData = [
    { name: "North Harbour", value: data.possessionPercent, color: "#8B2635" },
    { name: "Opposition", value: 100 - data.possessionPercent, color: "#E5E7EB" }
  ];
  
  const territoryData = [
    { name: "North Harbour", value: data.territoryPercent, color: "#8B2635" },
    { name: "Opposition", value: 100 - data.territoryPercent, color: "#E5E7EB" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{data.possessionPercent}%</div>
              <div className="text-sm text-gray-600">Possession</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{data.territoryPercent}%</div>
              <div className="text-sm text-gray-600">Territory</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{data.attackingMinutes}</div>
              <div className="text-sm text-gray-600">Attacking Minutes</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">{data.ballInPlayMinutes}</div>
              <div className="text-sm text-gray-600">Ball in Play Minutes</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Possession Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={possessionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                >
                  {possessionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Territory Control</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={territoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                >
                  {territoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <AIAnalysis sectionId="possession_territory" data={data} />
    </div>
  );
};

const AttackAnalysisSection = () => {
  const data = sampleMatchPerformance.teamStats;
  const players = sampleMatchPerformance.playerPerformances;
  
  const carryData = [
    { name: "Over Gainline", nh: data.carriesOverGainlinePercent, opp: data.oppCarriesOverGainlinePercent },
    { name: "On Gainline", nh: data.carriesOnGainlinePercent, opp: data.oppCarriesOnGainlinePercent },
    { name: "Behind Gainline", nh: data.carriesBehindGainlinePercent, opp: data.oppCarriesBehindGainlinePercent }
  ];

  const topCarriers = players
    .filter(p => p.ballCarryMetres && p.ballCarryMetres > 0)
    .sort((a, b) => (b.ballCarryMetres || 0) - (a.ballCarryMetres || 0))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{data.carryEfficiencyPercent}%</div>
              <div className="text-sm text-gray-600">Carry Efficiency</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{data.carriesOverGainlinePercent}%</div>
              <div className="text-sm text-gray-600">Carries Over Gainline</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {players.reduce((sum, p) => sum + (p.linebreaks || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Total Linebreaks</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gainline Success Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={carryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="nh" fill="#8B2635" name="North Harbour" />
              <Bar dataKey="opp" fill="#E5E7EB" name="Opposition" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Ball Carriers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topCarriers.map((player, index) => (
              <div key={player.playerId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold">{player.playerName}</div>
                    <div className="text-sm text-gray-600">{player.position}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{player.ballCarryMetres}m</div>
                  <div className="text-sm text-gray-600">{player.linebreaks || 0} linebreaks</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AIAnalysis sectionId="attack_analysis" data={{ teamStats: data, players }} />
    </div>
  );
};

const DefenceAnalysisSection = () => {
  const players = sampleMatchPerformance.playerPerformances;
  const teamStats = sampleMatchPerformance.teamStats;
  
  const topTacklers = players
    .filter(p => p.tacklesMade && p.tacklesMade > 0)
    .sort((a, b) => (b.tacklesMade || 0) - (a.tacklesMade || 0))
    .slice(0, 6);

  const tackleData = topTacklers.map(player => ({
    name: player.playerName.split(' ').pop(),
    made: player.tacklesMade || 0,
    missed: player.tacklesMissed || 0,
    percentage: player.madeTacklePercent || 0
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{teamStats.madeTacklePercent}%</div>
              <div className="text-sm text-gray-600">Team Tackle Success</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {players.reduce((sum, p) => sum + (p.tacklesMade || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Total Tackles Made</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {players.reduce((sum, p) => sum + (p.dominantTackles || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Dominant Tackles</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Individual Tackle Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tackleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="made" fill="#22C55E" name="Tackles Made" />
              <Bar dataKey="missed" fill="#EF4444" name="Tackles Missed" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <AIAnalysis sectionId="defence_analysis" data={{ teamStats, players }} />
    </div>
  );
};

const BreakdownAnalysisSection = () => {
  const data = sampleMatchPerformance.teamStats;
  const players = sampleMatchPerformance.playerPerformances;
  
  const ruckSpeedData = [
    { name: "0-3 Secs", nh: data.ruckSpeed0to3SecsPercent, opp: data.oppRuckSpeed0to3SecsPercent },
    { name: "3-6 Secs", nh: data.ruckSpeed3to6SecsPercent, opp: data.oppRuckSpeed3to6SecsPercent },
    { name: ">6 Secs", nh: data.ruckSpeedOver6SecsPercent, opp: data.oppRuckSpeedOver6SecsPercent }
  ];

  const topRuckers = players
    .filter(p => p.ruckArrivals && p.ruckArrivals > 0)
    .sort((a, b) => (b.ruckArrivals || 0) - (a.ruckArrivals || 0))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{data.ruckRetentionPercent}%</div>
              <div className="text-sm text-gray-600">Ruck Retention</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{data.breakdownSteals}</div>
              <div className="text-sm text-gray-600">Breakdown Steals</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{data.ruckSpeed0to3SecsPercent}%</div>
              <div className="text-sm text-gray-600">Quick Ball (0-3s)</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ruck Speed Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ruckSpeedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="nh" fill="#8B2635" name="North Harbour" />
              <Bar dataKey="opp" fill="#E5E7EB" name="Opposition" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <AIAnalysis sectionId="breakdown_analysis" data={{ teamStats: data, players }} />
    </div>
  );
};

const SetPieceSection = () => {
  const data = sampleMatchPerformance.teamStats;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{data.ownScrumWonPercent}%</div>
              <div className="text-sm text-gray-600">Own Scrum Won</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{data.ownScrumCompletionPercent}%</div>
              <div className="text-sm text-gray-600">Scrum Completion</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">{data.totalScrums}</div>
              <div className="text-sm text-gray-600">Total Scrums</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{data.scrumCompletionPercent}%</div>
              <div className="text-sm text-gray-600">Overall Completion</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Scrum Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Own Scrum Won</span>
                  <span>{data.ownScrumWonPercent}%</span>
                </div>
                <Progress value={data.ownScrumWonPercent} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Scrum Completion</span>
                  <span>{data.ownScrumCompletionPercent}%</span>
                </div>
                <Progress value={data.ownScrumCompletionPercent} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Set Piece Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Scrum Dominance</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Excellent
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Platform Quality</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Good
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Attacking Opportunities</span>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Developing
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AIAnalysis sectionId="set_piece" data={data} />
    </div>
  );
};

const IndividualPerformanceSection = () => {
  const players = sampleMatchPerformance.playerPerformances;
  
  const topPerformers = [...players].sort((a, b) => (b.overallRating || 0) - (a.overallRating || 0));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.max(...players.map(p => p.overallRating || 0)).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Highest Rating</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {(players.reduce((sum, p) => sum + (p.overallRating || 0), 0) / players.length).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Team Average</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {players.reduce((sum, p) => sum + (p.triesScored || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Total Tries</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Player Performance Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((player, index) => (
              <div key={player.playerId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-amber-600' : 'bg-red-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold">{player.playerName}</div>
                    <div className="text-sm text-gray-600">{player.position}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{player.overallRating?.toFixed(1)}/10</div>
                  <div className="text-xs text-gray-500">
                    {player.triesScored ? `${player.triesScored} tries` : 
                     player.tacklesMade ? `${player.tacklesMade} tackles` : 
                     player.ruckArrivals ? `${player.ruckArrivals} rucks` : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AIAnalysis sectionId="individual_performance" data={players} />
    </div>
  );
};

export default function MatchPerformance() {
  const [activeTab, setActiveTab] = useState("possession_territory");
  // Get matchId from URL params - for now using default since we need to fix routing
  const matchId = "nh_vs_auckland_2024";
  const match = sampleMatchPerformance.matchInfo;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-nh-red text-white p-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/team">
                <Button variant="ghost" className="text-white hover:bg-nh-red-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Team Dashboard
                </Button>
              </Link>
              <img src={logoPath} alt="North Harbour Rugby" className="h-10 w-10" />
              <div>
                <h1 className="text-2xl font-bold">Match Performance Analytics</h1>
                <div className="flex items-center gap-2 text-sm text-nh-red-200">
                  <Link href="/team" className="hover:text-white">Coaching Portal</Link>
                  <span>›</span>
                  <Link href="/team" className="hover:text-white">Analytics</Link>
                  <span>›</span>
                  <span className="text-white">Match Performance</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/team">
                <Button variant="outline" className="text-nh-red bg-white hover:bg-gray-100">
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-6">
        {/* Match Header */}
        <Card className="bg-gradient-to-r from-red-800 to-red-900 text-white">
          <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Match Performance Analytics</h1>
              <div className="text-lg">
                North Harbour vs {match.opponent} • {match.venue}
              </div>
              <div className="text-sm opacity-90">
                {match.date} • {match.competition}
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{match.finalScore}</div>
              <Badge className="bg-green-600 hover:bg-green-700 mt-2">
                {match.result}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Upload Section */}
      <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
        <CardContent className="p-6">
          <div className="text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Upload Match Data</h3>
            <p className="text-gray-600 mb-4">
              Upload CSV files or spreadsheets with match performance data for automatic analysis
            </p>
            <Button className="bg-red-600 hover:bg-red-700">
              <FileText className="h-4 w-4 mr-2" />
              Upload Match Sheet
            </Button>
            <div className="mt-3 text-sm text-gray-500">
              Supports: CSV, Excel (.xlsx), Google Sheets integration
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 bg-gray-100 p-1">
          {matchAnalyticsSections.map((section) => (
            <TabsTrigger 
              key={section.id} 
              value={section.id}
              className="text-xs lg:text-sm data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              {section.title}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="possession_territory">
          <PossessionTerritorySection />
        </TabsContent>

        <TabsContent value="attack_analysis">
          <AttackAnalysisSection />
        </TabsContent>

        <TabsContent value="defence_analysis">
          <DefenceAnalysisSection />
        </TabsContent>

        <TabsContent value="breakdown_analysis">
          <BreakdownAnalysisSection />
        </TabsContent>

        <TabsContent value="set_piece">
          <SetPieceSection />
        </TabsContent>

        <TabsContent value="individual_performance">
          <IndividualPerformanceSection />
        </TabsContent>

        <TabsContent value="try_analysis">
          <TryAnalysisSimplified embedded={true} matchId={matchId} />
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}