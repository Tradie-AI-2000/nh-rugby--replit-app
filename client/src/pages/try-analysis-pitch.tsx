import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Download, 
  Upload, 
  Trash2, 
  RotateCcw,
  Target,
  Trophy,
  MapPin,
  FileSpreadsheet
} from "lucide-react";

interface Try {
  id: string;
  x: number; // percentage from left (0-100)
  y: number; // percentage from top (0-100)
  type: string;
  area: string;
  team: 'home' | 'away';
  minute?: number;
  player?: string;
}

const tryTypes = [
  { value: "50m_restart_retained", label: "50m Restart Retained", color: "#10B981", icon: "●" },
  { value: "free_kick", label: "Free Kick", color: "#059669", icon: "●" },
  { value: "kick_return", label: "Kick Return", color: "#F59E0B", icon: "●" },
  { value: "lineout", label: "Lineout", color: "#DC2626", icon: "♦" },
  { value: "lineout_steal", label: "Lineout Steal", color: "#B91C1C", icon: "♦" },
  { value: "scrum", label: "Scrum", color: "#1E40AF", icon: "▲" },
  { value: "tap_penalty", label: "Tap Penalty", color: "#7C2D12", icon: "■" },
  { value: "turnover_won", label: "Turnover Won", color: "#BE185D", icon: "●" }
];

const fieldAreas = [
  "Own try line",
  "Own 5m",
  "Own 22m",
  "Own half",
  "Halfway line",
  "Attacking half",
  "Attacking 22m",
  "Attacking 5m",
  "Attacking try line"
];

export default function TryAnalysisPitch() {
  const [tries, setTries] = useState<Try[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<'home' | 'away'>('home');
  const [isPlacingTry, setIsPlacingTry] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const handlePitchClick = (event: React.MouseEvent<SVGElement>) => {
    if (!isPlacingTry || !selectedType || !selectedArea) return;

    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    const newTry: Try = {
      id: Math.random().toString(36).substr(2, 9),
      x,
      y,
      type: selectedType,
      area: selectedArea,
      team: selectedTeam
    };

    setTries([...tries, newTry]);
    setIsPlacingTry(false);
  };

  const deleteTry = (id: string) => {
    setTries(tries.filter(t => t.id !== id));
  };

  const clearAll = () => {
    setTries([]);
  };

  const getTryTypeConfig = (type: string) => {
    return tryTypes.find(t => t.value === type) || tryTypes[0];
  };

  const getTeamStats = (team: 'home' | 'away') => {
    return tries.filter(t => t.team === team);
  };

  const getTypeStats = () => {
    const stats: Record<string, number> = {};
    tries.forEach(t => {
      stats[t.type] = (stats[t.type] || 0) + 1;
    });
    return stats;
  };

  const exportData = () => {
    const csv = [
      'Team,Try Type,Field Area,X Position,Y Position',
      ...tries.map(t => `${t.team},${t.type},${t.area},${t.x.toFixed(2)},${t.y.toFixed(2)}`)
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'try-analysis.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Try Analysis Pitch</h1>
            <p className="text-gray-600 mt-2">
              Interactive rugby pitch visualization for analyzing try origins and scoring patterns
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{tries.length} tries plotted</Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowControls(!showControls)}
            >
              {showControls ? 'Hide' : 'Show'} Controls
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Controls Panel */}
          {showControls && (
            <div className="xl:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add Try
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Team</Label>
                    <Select value={selectedTeam} onValueChange={(value: 'home' | 'away') => setSelectedTeam(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Home Team</SelectItem>
                        <SelectItem value="away">Away Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Try Type</Label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select try type" />
                      </SelectTrigger>
                      <SelectContent>
                        {tryTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <span style={{ color: type.color }}>{type.icon}</span>
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Field Area</Label>
                    <Select value={selectedArea} onValueChange={setSelectedArea}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select field area" />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldAreas.map(area => (
                          <SelectItem key={area} value={area}>
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => setIsPlacingTry(true)}
                    disabled={!selectedType || !selectedArea || isPlacingTry}
                  >
                    {isPlacingTry ? 'Click on pitch to place' : 'Place Try on Pitch'}
                  </Button>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={clearAll} className="flex-1">
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Clear All
                    </Button>
                    <Button variant="outline" size="sm" onClick={exportData} className="flex-1">
                      <Download className="h-4 w-4 mr-1" />
                      Export CSV
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Legend */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Try Types Legend</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {tryTypes.map(type => (
                    <div key={type.value} className="flex items-center gap-2 text-sm">
                      <span style={{ color: type.color, fontSize: '16px' }}>{type.icon}</span>
                      <span>{type.label}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="p-2 bg-blue-50 rounded">
                      <div className="font-medium text-blue-800">Home</div>
                      <div className="text-blue-600">{getTeamStats('home').length} tries</div>
                    </div>
                    <div className="p-2 bg-red-50 rounded">
                      <div className="font-medium text-red-800">Away</div>
                      <div className="text-red-600">{getTeamStats('away').length} tries</div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    {Object.entries(getTypeStats()).map(([type, count]) => (
                      <div key={type} className="flex justify-between text-xs">
                        <span>{getTryTypeConfig(type).label}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Rugby Pitch */}
          <div className={showControls ? "xl:col-span-3" : "xl:col-span-4"}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Rugby Pitch - Try Origins
                  {isPlacingTry && (
                    <Badge variant="secondary" className="ml-auto">
                      Click to place {getTryTypeConfig(selectedType).label}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-green-600 rounded-lg overflow-hidden">
                  <svg
                    viewBox="0 0 400 600"
                    className={`w-full h-auto ${isPlacingTry ? 'cursor-crosshair' : 'cursor-default'}`}
                    onClick={handlePitchClick}
                    style={{ maxHeight: '80vh' }}
                  >
                    {/* Pitch Background */}
                    <rect width="400" height="600" fill="#4ADE80" />
                    
                    {/* Pitch Lines */}
                    {/* Sidelines */}
                    <line x1="50" y1="50" x2="50" y2="550" stroke="white" strokeWidth="2" />
                    <line x1="350" y1="50" x2="350" y2="550" stroke="white" strokeWidth="2" />
                    
                    {/* Try lines */}
                    <line x1="50" y1="50" x2="350" y2="50" stroke="white" strokeWidth="3" />
                    <line x1="50" y1="550" x2="350" y2="550" stroke="white" strokeWidth="3" />
                    
                    {/* 5m lines */}
                    <line x1="50" y1="80" x2="350" y2="80" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="50" y1="520" x2="350" y2="520" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
                    
                    {/* 22m lines */}
                    <line x1="50" y1="182" x2="350" y2="182" stroke="white" strokeWidth="2" />
                    <line x1="50" y1="418" x2="350" y2="418" stroke="white" strokeWidth="2" />
                    
                    {/* Halfway line */}
                    <line x1="50" y1="300" x2="350" y2="300" stroke="white" strokeWidth="2" />
                    
                    {/* 10m lines from halfway */}
                    <line x1="50" y1="240" x2="350" y2="240" stroke="white" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="50" y1="360" x2="350" y2="360" stroke="white" strokeWidth="1" strokeDasharray="3,3" />
                    
                    {/* Goal posts */}
                    <rect x="195" y="45" width="10" height="15" fill="white" />
                    <rect x="195" y="540" width="10" height="15" fill="white" />
                    
                    {/* In-goal areas */}
                    <rect x="50" y="30" width="300" height="20" fill="none" stroke="white" strokeWidth="1" />
                    <rect x="50" y="550" width="300" height="20" fill="none" stroke="white" strokeWidth="1" />
                    
                    {/* Centre circle */}
                    <circle cx="200" cy="300" r="10" fill="none" stroke="white" strokeWidth="1" />
                    
                    {/* Field markings labels */}
                    <text x="30" y="55" fill="white" fontSize="10" textAnchor="middle">TL</text>
                    <text x="30" y="85" fill="white" fontSize="8" textAnchor="middle">5m</text>
                    <text x="30" y="187" fill="white" fontSize="8" textAnchor="middle">22m</text>
                    <text x="30" y="305" fill="white" fontSize="8" textAnchor="middle">50m</text>
                    <text x="30" y="423" fill="white" fontSize="8" textAnchor="middle">22m</text>
                    <text x="30" y="525" fill="white" fontSize="8" textAnchor="middle">5m</text>
                    <text x="30" y="555" fill="white" fontSize="10" textAnchor="middle">TL</text>

                    {/* Try markers */}
                    {tries.map(tryItem => {
                      const config = getTryTypeConfig(tryItem.type);
                      const x = (tryItem.x / 100) * 400;
                      const y = (tryItem.y / 100) * 600;
                      
                      return (
                        <g key={tryItem.id}>
                          {/* Try marker */}
                          <circle
                            cx={x}
                            cy={y}
                            r="8"
                            fill={config.color}
                            stroke={tryItem.team === 'home' ? '#1E40AF' : '#DC2626'}
                            strokeWidth="2"
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteTry(tryItem.id);
                            }}
                          />
                          {/* Try type icon */}
                          <text
                            x={x}
                            y={y + 2}
                            fill="white"
                            fontSize="10"
                            textAnchor="middle"
                            className="pointer-events-none"
                          >
                            {config.icon}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
                
                <div className="mt-4 text-sm text-gray-600">
                  <p>Click on a try marker to delete it. Total tries: {tries.length}</p>
                  {isPlacingTry && (
                    <p className="text-blue-600 font-medium">
                      Click anywhere on the pitch to place a {getTryTypeConfig(selectedType).label} try
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Try List */}
            {tries.length > 0 && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Try Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {tries.map(tryItem => {
                      const config = getTryTypeConfig(tryItem.type);
                      return (
                        <div key={tryItem.id} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-3">
                            <span style={{ color: config.color, fontSize: '16px' }}>{config.icon}</span>
                            <div>
                              <div className="font-medium text-sm">{config.label}</div>
                              <div className="text-xs text-gray-500">
                                {tryItem.area} • {tryItem.team === 'home' ? 'Home' : 'Away'} team
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteTry(tryItem.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}