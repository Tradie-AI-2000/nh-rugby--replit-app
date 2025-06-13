import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ScatterChart,
  Scatter,
  Legend
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Activity, 
  Brain,
  Clock,
  Trophy,
  AlertTriangle,
  CheckCircle,
  Building2,
  UserPlus
} from "lucide-react";

// Sample TWI and cohesion data based on the instructions
const cohesionData = {
  teamWorkIndex: 21.19,
  experienceDifferential: -87,
  avgSigningAge: 26.44,
  competitionAverage: 28.5,
  strategy: "Buy (Externally reliant)",
  ageDifferential: 1.00,
  internalTenure: {
    "0_years": 14,
    "1_year": 13,
    "2_years": 2,
    "3_years": 5
  },
  inSeasonPerformance: [
    { game: 1, cohesionStrength: 72, cohesionWeakness: 8, result: "Win", opponent: "Auckland", score: "24-17" },
    { game: 2, cohesionStrength: 68, cohesionWeakness: 12, result: "Loss", opponent: "Canterbury", score: "15-28" },
    { game: 3, cohesionStrength: 85, cohesionWeakness: 5, result: "Win", opponent: "Wellington", score: "31-19" },
    { game: 4, cohesionStrength: 79, cohesionWeakness: 7, result: "Win", opponent: "Otago", score: "22-16" },
    { game: 5, cohesionStrength: 65, cohesionWeakness: 15, result: "Loss", opponent: "Tasman", score: "18-25" },
    { game: 6, cohesionStrength: 88, cohesionWeakness: 3, result: "Win", opponent: "Manawatu", score: "35-12" },
    { game: 7, cohesionStrength: 74, cohesionWeakness: 9, result: "Win", opponent: "Southland", score: "27-20" },
    { game: 8, cohesionStrength: 81, cohesionWeakness: 6, result: "Win", opponent: "Bay of Plenty", score: "29-14" }
  ]
};

const positionalUnits = {
  "tight_5": {
    name: "Tight 5",
    players: [
      { number: 1, name: "A. Moli", position: "Prop", connections: ["2", "3", "4", "5"] },
      { number: 2, name: "K. Manu", position: "Hooker", connections: ["1", "3", "4", "5"] },
      { number: 3, name: "M. Ala'alatoa", position: "Prop", connections: ["1", "2", "4", "5"] },
      { number: 4, name: "P. Tuipulotu", position: "Lock", connections: ["1", "2", "3", "5"] },
      { number: 5, name: "T. Darry", position: "Lock", connections: ["1", "2", "3", "4"] }
    ],
    metrics: {
      scrumWinPercent: 78,
      lineoutSuccessPercent: 85,
      maulMetres: 142
    }
  },
  "attack_spine": {
    name: "Attack Spine (8-9-10-12-15)",
    players: [
      { number: 8, name: "H. Stowers", position: "Number 8", connections: ["9", "10", "12", "15"] },
      { number: 9, name: "S. Nock", position: "Scrum-half", connections: ["8", "10", "12", "15"] },
      { number: 10, name: "T. Edmed", position: "Fly-half", connections: ["8", "9", "12", "15"] },
      { number: 12, name: "R. Ranger", position: "Centre", connections: ["8", "9", "10", "15"] },
      { number: 15, name: "Z. Sullivan", position: "Fullback", connections: ["8", "9", "10", "12"] }
    ],
    metrics: {
      lineBreaks: 18,
      tryAssists: 12,
      metersGained: 1847
    }
  },
  "midfield_defence": {
    name: "Mid-Field Defence (12-13)",
    players: [
      { number: 12, name: "R. Ranger", position: "Centre", connections: ["13"] },
      { number: 13, name: "R. Tupai", position: "Centre", connections: ["12"] }
    ],
    metrics: {
      tackleSuccessPercent: 92,
      missedTackles: 8,
      turnoversWon: 15
    }
  },
  "back_3": {
    name: "Back 3",
    players: [
      { number: 11, name: "M. Telea", position: "Wing", connections: ["14", "15"] },
      { number: 14, name: "K. Banks", position: "Wing", connections: ["11", "15"] },
      { number: 15, name: "Z. Sullivan", position: "Fullback", connections: ["11", "14"] }
    ],
    metrics: {
      metersGained: 892,
      lineBreaks: 8,
      tries: 7
    }
  }
};

interface TWIGaugeProps {
  value: number;
  competitionAverage: number;
}

const TWIGauge = ({ value, competitionAverage }: TWIGaugeProps) => {
  const getColor = (val: number) => {
    if (val < 20) return "#EF4444"; // Red
    if (val < 30) return "#F59E0B"; // Amber
    return "#10B981"; // Green
  };

  const needleAngle = (value / 50) * 180; // 0-50% scale mapped to 180 degrees
  const compAngle = (competitionAverage / 50) * 180;

  return (
    <Card className="col-span-2">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold">Team Work Index (TWI)</CardTitle>
        <p className="text-sm text-gray-600">
          Long-term philosophy indicator and predictor of sustainable success
        </p>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-64 h-32 mb-4">
          {/* Gauge background */}
          <svg viewBox="0 0 200 100" className="w-full h-full">
            {/* Background arc */}
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="12"
            />
            {/* Colored sections */}
            <path
              d="M 20 80 A 80 80 0 0 0 100 20"
              fill="none"
              stroke="#EF4444"
              strokeWidth="12"
              strokeDasharray="0,20"
            />
            <path
              d="M 100 20 A 80 80 0 0 0 140 35"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="12"
            />
            <path
              d="M 140 35 A 80 80 0 0 0 180 80"
              fill="none"
              stroke="#10B981"
              strokeWidth="12"
            />
            
            {/* Main needle */}
            <line
              x1="100"
              y1="80"
              x2={100 + 60 * Math.cos((needleAngle - 90) * Math.PI / 180)}
              y2={80 + 60 * Math.sin((needleAngle - 90) * Math.PI / 180)}
              stroke={getColor(value)}
              strokeWidth="4"
              strokeLinecap="round"
            />
            
            {/* Competition average needle */}
            <line
              x1="100"
              y1="80"
              x2={100 + 50 * Math.cos((compAngle - 90) * Math.PI / 180)}
              y2={80 + 50 * Math.sin((compAngle - 90) * Math.PI / 180)}
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            
            {/* Center dot */}
            <circle cx="100" cy="80" r="6" fill={getColor(value)} />
          </svg>
        </div>
        
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold" style={{ color: getColor(value) }}>
            {value}%
          </div>
          <div className="text-sm text-gray-500">
            Competition Avg: {competitionAverage}%
          </div>
          <Badge variant={value < 20 ? "destructive" : value < 30 ? "default" : "secondary"}>
            {value < 20 ? "Needs Development" : value < 30 ? "Developing" : "Strong Foundation"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

interface BuildVsBuyVisualizerProps {
  experienceDifferential: number;
}

const BuildVsBuyVisualizer = ({ experienceDifferential }: BuildVsBuyVisualizerProps) => {
  const maxValue = 200;
  const position = ((experienceDifferential + maxValue) / (2 * maxValue)) * 100;
  const isBuyFocused = experienceDifferential < 0;
  
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Build vs Buy Strategy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative h-12 bg-gradient-to-r from-blue-500 via-gray-300 to-green-500 rounded-full">
          <div 
            className="absolute top-1 h-10 w-10 bg-white border-4 border-gray-800 rounded-full flex items-center justify-center shadow-lg transition-all duration-500"
            style={{ left: `calc(${position}% - 20px)` }}
          >
            {isBuyFocused ? <UserPlus className="h-5 w-5" /> : <Building2 className="h-5 w-5" />}
          </div>
        </div>
        
        <div className="flex justify-between text-sm font-medium">
          <span className="text-blue-600">Buy (External)</span>
          <span className="text-green-600">Build (Internal)</span>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-center">
            <strong>Current Strategy:</strong> {isBuyFocused ? "Externally Reliant" : "Internally Developed"}
          </p>
          <p className="text-xs text-gray-600 text-center mt-1">
            Experience Differential: {experienceDifferential > 0 ? "+" : ""}{experienceDifferential}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

interface CohesionScatterPlotProps {
  data: typeof cohesionData.inSeasonPerformance;
}

const CohesionScatterPlot = ({ data }: CohesionScatterPlotProps) => {
  const getResultColor = (result: string) => {
    switch (result) {
      case "Win": return "#10B981";
      case "Loss": return "#EF4444";
      case "Draw": return "#F59E0B";
      default: return "#6B7280";
    }
  };

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          In-Season Cohesion Performance
        </CardTitle>
        <p className="text-sm text-gray-600">
          Analyze match performance across cohesion strength vs weakness dimensions
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              dataKey="cohesionWeakness" 
              name="Cohesion Weakness"
              label={{ value: 'Cohesion Weakness (Gaps)', position: 'insideBottom', offset: -10 }}
            />
            <YAxis 
              type="number" 
              dataKey="cohesionStrength" 
              name="Cohesion Strength"
              label={{ value: 'Cohesion Strength', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={(value, name, props) => [
                `${props.payload.opponent}: ${props.payload.score}`,
                props.payload.result
              ]}
            />
            <Scatter 
              data={data} 
              fill="#8884d8"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getResultColor(entry.result)} />
              ))}
            </Scatter>
            
            {/* Quadrant lines */}
            <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#9CA3AF" strokeDasharray="5,5" />
            <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#9CA3AF" strokeDasharray="5,5" />
          </ScatterChart>
        </ResponsiveContainer>
        
        <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
          <div className="text-center p-2 bg-red-50 rounded">
            <strong>Poor Performance</strong><br />Low Strength / High Weakness
          </div>
          <div className="text-center p-2 bg-green-50 rounded">
            <strong>Optimal Zone</strong><br />High Strength / Low Weakness
          </div>
          <div className="text-center p-2 bg-yellow-50 rounded">
            <strong>Solid but Limited</strong><br />Low Strength / Low Weakness
          </div>
          <div className="text-center p-2 bg-orange-50 rounded">
            <strong>Inconsistent</strong><br />High Strength / High Weakness
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface PositionalUnitViewProps {
  selectedUnit: string;
  units: typeof positionalUnits;
}

const PositionalUnitView = ({ selectedUnit, units }: PositionalUnitViewProps) => {
  const unit = units[selectedUnit as keyof typeof units];
  
  if (!unit) return null;

  const getConnectionStrength = (player1: string, player2: string) => {
    // Simulate connection strength based on playing time together
    const hash = player1.charCodeAt(0) + player2.charCodeAt(0);
    return (hash % 3) + 1; // 1-3 strength
  };

  const getConnectionColor = (strength: number) => {
    switch (strength) {
      case 1: return "#EF4444"; // Weak
      case 2: return "#F59E0B"; // Moderate  
      case 3: return "#10B981"; // Strong
      default: return "#6B7280";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{unit.name} Cohesion Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Connection Diagram */}
            <div className="space-y-4">
              <h3 className="font-semibold">Player Connections</h3>
              <div className="relative h-64 bg-green-50 rounded-lg p-4">
                <svg viewBox="0 0 300 200" className="w-full h-full">
                  {/* Draw connections first */}
                  {unit.players.map((player, i) => 
                    player.connections.map((connId, j) => {
                      const connPlayer = unit.players.find(p => p.number.toString() === connId);
                      if (!connPlayer) return null;
                      
                      const connIndex = unit.players.findIndex(p => p.number.toString() === connId);
                      if (connIndex <= i) return null; // Avoid duplicate lines
                      
                      const x1 = 60 + (i % 3) * 90;
                      const y1 = 60 + Math.floor(i / 3) * 80;
                      const x2 = 60 + (connIndex % 3) * 90;
                      const y2 = 60 + Math.floor(connIndex / 3) * 80;
                      
                      const strength = getConnectionStrength(player.name, connPlayer.name);
                      
                      return (
                        <line
                          key={`${i}-${j}`}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={getConnectionColor(strength)}
                          strokeWidth={strength + 1}
                        />
                      );
                    })
                  )}
                  
                  {/* Draw player circles */}
                  {unit.players.map((player, i) => {
                    const x = 60 + (i % 3) * 90;
                    const y = 60 + Math.floor(i / 3) * 80;
                    
                    return (
                      <g key={i}>
                        <circle
                          cx={x}
                          cy={y}
                          r="20"
                          fill="#8B2635"
                          stroke="#fff"
                          strokeWidth="2"
                        />
                        <text
                          x={x}
                          y={y + 5}
                          textAnchor="middle"
                          fill="white"
                          fontSize="14"
                          fontWeight="bold"
                        >
                          {player.number}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
              
              <div className="space-y-2">
                {unit.players.map((player) => (
                  <div key={player.number} className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {player.number}
                    </div>
                    <span className="font-medium">{player.name}</span>
                    <span className="text-gray-500">({player.position})</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Unit Performance Metrics */}
            <div className="space-y-4">
              <h3 className="font-semibold">Unit Performance</h3>
              <div className="space-y-3">
                {Object.entries(unit.metrics).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-medium">{value}{typeof value === 'number' && value <= 100 ? '%' : ''}</span>
                    </div>
                    {typeof value === 'number' && value <= 100 && (
                      <Progress value={value} className="h-2" />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Connection Legend</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-red-500"></div>
                    <span>Weak/New Combination</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-yellow-500"></div>
                    <span>Moderate Relationship</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-green-500"></div>
                    <span>Strong/Proven Combination</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface AIRecommendationProps {
  cohesionData: typeof cohesionData;
}

const AIRecommendationPanel = ({ cohesionData }: AIRecommendationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<string>("recruitment");

  const prompts = {
    recruitment: "Based on our current TWI and 'buy-focused' strategy, analyze our recruitment approach. What specific player profiles should we target to improve long-term cohesion while addressing immediate performance needs?",
    selection: "Looking at our positional unit cohesion and in-season performance, which player combinations give us the highest probability of success for our next match? Highlight combinations with the strongest existing relationships.",
    strategy: "Given our negative Experience Differential and high average signing age, provide a 3-point strategic plan for the next two seasons to shift towards a 'Build' model. What specific actions should we take in recruitment and academy development?"
  };

  const generateRecommendation = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/gemini/cohesion-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cohesionData,
          prompt: prompts[selectedPrompt as keyof typeof prompts],
          analysisType: selectedPrompt
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate recommendation");
      }

      const result = await response.json();
      setRecommendation(result.analysis);
    } catch (error) {
      console.error("Error generating AI recommendation:", error);
      setRecommendation(`**AI COACHING RECOMMENDATION - ${selectedPrompt.toUpperCase()}**

**CURRENT SITUATION ANALYSIS:**
• TWI: ${cohesionData.teamWorkIndex}% (Competition Avg: ${cohesionData.competitionAverage}%)
• Strategy: ${cohesionData.strategy}
• Experience Differential: ${cohesionData.experienceDifferential}
• Average Signing Age: ${cohesionData.avgSigningAge} years

**STRATEGIC RECOMMENDATIONS:**
1. **Immediate Actions**: Focus on building stronger unit cohesion within existing squad
2. **Medium-term Planning**: Target younger talent with development potential (22-24 age range)
3. **Long-term Vision**: Establish clear pathways from academy to first team

**KEY INSIGHTS:**
• Current reliance on external experience creates integration challenges
• Need to balance immediate performance requirements with long-term cohesion building
• Opportunity to improve TWI through strategic recruitment and retention policies

*Note: Enable GEMINI_API_KEY for advanced AI analysis and personalized coaching recommendations.*`);
    }
    
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Coaching Recommendations
        </CardTitle>
        <p className="text-sm text-gray-600">
          Strategic insights based on cohesion analytics and performance data
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Analysis Focus</label>
          <Select value={selectedPrompt} onValueChange={setSelectedPrompt}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recruitment">Recruitment Strategy</SelectItem>
              <SelectItem value="selection">Team Selection</SelectItem>
              <SelectItem value="strategy">Long-term Planning</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={generateRecommendation}
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-700"
        >
          {isLoading ? "Analyzing..." : "Get AI Recommendation"}
        </Button>
        
        {recommendation && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap text-sm font-mono">
              {recommendation}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function TeamCohesionAnalytics() {
  const [selectedUnit, setSelectedUnit] = useState("tight_5");

  const tenureData = Object.entries(cohesionData.internalTenure).map(([years, count]) => ({
    years: years.replace('_', ' ').replace('years', 'yrs'),
    count
  }));

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Cohesion Analytics</h1>
          <p className="text-gray-600">Strategic analysis of team cohesion and long-term development</p>
        </div>
        <Badge className="bg-red-600 text-white">
          North Harbour Rugby
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Squad Cohesion</TabsTrigger>
          <TabsTrigger value="units">Positional Units</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Main TWI and Strategy Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* TWI Gauge */}
            <TWIGauge 
              value={cohesionData.teamWorkIndex} 
              competitionAverage={cohesionData.competitionAverage}
            />
            
            {/* Build vs Buy Visualizer */}
            <BuildVsBuyVisualizer 
              experienceDifferential={cohesionData.experienceDifferential}
            />
          </div>

          {/* Key TWI Driver Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Age Differential</p>
                    <p className="text-2xl font-bold">{cohesionData.ageDifferential}</p>
                    <p className="text-xs text-gray-500 mt-1">Average time together</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Signing Age</p>
                    <p className="text-2xl font-bold">{cohesionData.avgSigningAge}</p>
                    <p className="text-xs text-gray-500 mt-1">Years old</p>
                  </div>
                  <UserPlus className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-600">Internal Tenure</p>
                  <ResponsiveContainer width="100%" height={80}>
                    <BarChart data={tenureData}>
                      <Bar dataKey="count" fill="#8B2635" />
                      <XAxis dataKey="years" tick={{ fontSize: 10 }} />
                      <Tooltip />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* In-Season Cohesion Performance */}
          <CohesionScatterPlot data={cohesionData.inSeasonPerformance} />
        </TabsContent>

        <TabsContent value="units" className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Positional Unit Analysis</h2>
            <Select value={selectedUnit} onValueChange={setSelectedUnit}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(positionalUnits).map(([key, unit]) => (
                  <SelectItem key={key} value={key}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <PositionalUnitView selectedUnit={selectedUnit} units={positionalUnits} />
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <AIRecommendationPanel cohesionData={cohesionData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}