import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';
import { 
  Plus, 
  Download, 
  RotateCcw,
  Target,
  MapPin,
  TrendingUp,
  Brain,
  Eye,
  Clock,
  Activity,
  Zap,
  Edit
} from "lucide-react";

interface Try {
  id: string;
  x: number; // percentage from left (0-100)
  y: number; // percentage from top (0-100)
  type: string;
  team: 'home' | 'away';
  // New analytical metrics
  zone: 'attacking_22' | 'attacking_22m_halfway' | 'defending_22m_halfway' | 'defending_22';
  quarter: 1 | 2 | 3 | 4;
  phase: 'phase_1' | 'phase_2_3' | 'phase_4_6' | 'phase_7_plus';
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

export default function TryAnalysisSimplified() {
  const [tries, setTries] = useState<Try[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<'home' | 'away'>('home');
  const [isPlacingTry, setIsPlacingTry] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  
  // Editing state for try details
  const [editingTry, setEditingTry] = useState<Try | null>(null);
  const [editQuarter, setEditQuarter] = useState<string>("");
  const [editPhase, setEditPhase] = useState<string>("");

  // Chart colors
  const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

  // Function to detect zone based on Y coordinate
  const detectZone = (y: number): 'attacking_22' | 'attacking_22m_halfway' | 'defending_22m_halfway' | 'defending_22' => {
    if (y >= 80) return 'attacking_22'; // Bottom 20% of pitch
    if (y >= 50) return 'attacking_22m_halfway'; // 50-80%
    if (y >= 20) return 'defending_22m_halfway'; // 20-50%
    return 'defending_22'; // Top 20%
  };

  // Calculate analytical metrics
  const zoneData = useMemo(() => {
    const zones = ['attacking_22', 'attacking_22m_halfway', 'defending_22m_halfway', 'defending_22'];
    return zones.map(zone => ({
      name: zone.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      value: tries.filter(t => t.zone === zone).length,
      percentage: tries.length > 0 ? Math.round((tries.filter(t => t.zone === zone).length / tries.length) * 100) : 0
    }));
  }, [tries]);

  const quarterData = useMemo(() => {
    const quarters = [1, 2, 3, 4];
    return quarters.map(quarter => ({
      name: `Q${quarter}`,
      value: tries.filter(t => t.quarter === quarter).length,
      percentage: tries.length > 0 ? Math.round((tries.filter(t => t.quarter === quarter).length / tries.length) * 100) : 0
    }));
  }, [tries]);

  const phaseData = useMemo(() => {
    const phases = ['phase_1', 'phase_2_3', 'phase_4_6', 'phase_7_plus'];
    const phaseLabels = ['Phase 1', 'Phase 2-3', 'Phase 4-6', 'Phase 7+'];
    return phases.map((phase, index) => ({
      name: phaseLabels[index],
      value: tries.filter(t => t.phase === phase).length,
      percentage: tries.length > 0 ? Math.round((tries.filter(t => t.phase === phase).length / tries.length) * 100) : 0
    }));
  }, [tries]);

  const sourceData = useMemo(() => {
    const sources = tryTypes.map(t => t.value);
    return sources.map(source => ({
      name: tryTypes.find(t => t.value === source)?.label || source,
      value: tries.filter(t => t.type === source).length,
      percentage: tries.length > 0 ? Math.round((tries.filter(t => t.type === source).length / tries.length) * 100) : 0
    })).filter(item => item.value > 0);
  }, [tries]);

  const handleMouseMove = (event: React.MouseEvent<SVGElement>) => {
    if (!isPlacingTry) {
      setMousePosition(null);
      return;
    }

    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const svgX = (mouseX / rect.width) * 400;
    const svgY = (mouseY / rect.height) * 600;
    
    setMousePosition({ x: svgX, y: svgY });
  };

  const handlePitchClick = (event: React.MouseEvent<SVGElement>) => {
    if (!isPlacingTry || !selectedType) return;

    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    const svgX = (clickX / rect.width) * 400;
    const svgY = (clickY / rect.height) * 600;
    
    const x = (svgX / 400) * 100;
    const y = (svgY / 600) * 100;

    const detectedZone = detectZone(y);

    const newTry: Try = {
      id: Math.random().toString(36).substr(2, 9),
      x,
      y,
      type: selectedType,
      team: selectedTeam,
      zone: detectedZone,
      quarter: 1, // Default, will be edited
      phase: 'phase_1' // Default, will be edited
    };

    setTries([...tries, newTry]);
    setIsPlacingTry(false);
    setMousePosition(null);
  };

  const handleTryClick = (tryItem: Try, event: React.MouseEvent) => {
    event.stopPropagation();
    setEditingTry(tryItem);
    setEditQuarter(tryItem.quarter.toString());
    setEditPhase(tryItem.phase);
  };

  const saveTryEdit = () => {
    if (!editingTry) return;
    
    const updatedTry = {
      ...editingTry,
      quarter: parseInt(editQuarter) as 1 | 2 | 3 | 4,
      phase: editPhase as 'phase_1' | 'phase_2_3' | 'phase_4_6' | 'phase_7_plus'
    };

    setTries(tries.map(t => t.id === editingTry.id ? updatedTry : t));
    setEditingTry(null);
    setEditQuarter("");
    setEditPhase("");
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

  const exportData = () => {
    const csv = [
      'Team,Try Type,Zone,Quarter,Phase,X Position,Y Position',
      ...tries.map(t => `${t.team},${t.type},${t.zone},${t.quarter},${t.phase},${t.x.toFixed(2)},${t.y.toFixed(2)}`)
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
              Interactive rugby pitch with zone detection and analytical insights
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

        {/* Top Section: Controls and Rugby Pitch */}
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
                        <SelectItem value="home">Us</SelectItem>
                        <SelectItem value="away">Opposition</SelectItem>
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

                  <Button 
                    className="w-full" 
                    onClick={() => setIsPlacingTry(true)}
                    disabled={!selectedType || isPlacingTry}
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
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setMousePosition(null)}
                    style={{ maxHeight: '80vh', display: 'block' }}
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Pitch Background */}
                    <rect width="400" height="600" fill="#4ADE80" />
                    
                    {/* Zone Markings */}
                    {/* Defending 22 (0-20%) */}
                    <rect x="50" y="50" width="300" height="70" fill="rgba(239, 68, 68, 0.1)" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="2" strokeDasharray="5,5" />
                    <text x="200" y="90" textAnchor="middle" fill="rgba(239, 68, 68, 0.8)" fontSize="12" fontWeight="bold">Defending 22</text>
                    
                    {/* Defending 22m-Halfway (20-50%) */}
                    <rect x="50" y="120" width="300" height="180" fill="rgba(251, 146, 60, 0.1)" stroke="rgba(251, 146, 60, 0.3)" strokeWidth="2" strokeDasharray="5,5" />
                    <text x="200" y="210" textAnchor="middle" fill="rgba(251, 146, 60, 0.8)" fontSize="12" fontWeight="bold">Defending 22m-Halfway</text>
                    
                    {/* Attacking 22m-Halfway (50-80%) */}
                    <rect x="50" y="300" width="300" height="180" fill="rgba(34, 197, 94, 0.1)" stroke="rgba(34, 197, 94, 0.3)" strokeWidth="2" strokeDasharray="5,5" />
                    <text x="200" y="390" textAnchor="middle" fill="rgba(34, 197, 94, 0.8)" fontSize="12" fontWeight="bold">Attacking 22m-Halfway</text>
                    
                    {/* Attacking 22 (80-100%) */}
                    <rect x="50" y="480" width="300" height="70" fill="rgba(59, 130, 246, 0.1)" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" strokeDasharray="5,5" />
                    <text x="200" y="520" textAnchor="middle" fill="rgba(59, 130, 246, 0.8)" fontSize="12" fontWeight="bold">Attacking 22</text>
                    
                    {/* Pitch Lines */}
                    <line x1="50" y1="50" x2="50" y2="550" stroke="white" strokeWidth="3" />
                    <line x1="350" y1="50" x2="350" y2="550" stroke="white" strokeWidth="3" />
                    <line x1="50" y1="50" x2="350" y2="50" stroke="white" strokeWidth="3" />
                    <line x1="50" y1="550" x2="350" y2="550" stroke="white" strokeWidth="3" />
                    <line x1="50" y1="300" x2="350" y2="300" stroke="white" strokeWidth="2" />
                    <line x1="50" y1="120" x2="350" y2="120" stroke="white" strokeWidth="2" />
                    <line x1="50" y1="480" x2="350" y2="480" stroke="white" strokeWidth="2" />

                    {/* Mouse crosshair preview */}
                    {isPlacingTry && mousePosition && selectedType && (
                      <g opacity="0.8">
                        <line
                          x1={mousePosition.x - 15}
                          y1={mousePosition.y}
                          x2={mousePosition.x + 15}
                          y2={mousePosition.y}
                          stroke="yellow"
                          strokeWidth="2"
                        />
                        <line
                          x1={mousePosition.x}
                          y1={mousePosition.y - 15}
                          x2={mousePosition.x}
                          y2={mousePosition.y + 15}
                          stroke="yellow"
                          strokeWidth="2"
                        />
                        <circle
                          cx={mousePosition.x}
                          cy={mousePosition.y}
                          r="8"
                          fill={getTryTypeConfig(selectedType).color}
                          stroke={selectedTeam === 'home' ? '#1E40AF' : '#DC2626'}
                          strokeWidth="2"
                          opacity="0.7"
                        />
                        <text
                          x={mousePosition.x}
                          y={mousePosition.y + 2}
                          fill="white"
                          fontSize="10"
                          textAnchor="middle"
                          opacity="0.9"
                        >
                          {getTryTypeConfig(selectedType).icon}
                        </text>
                      </g>
                    )}

                    {/* Try markers */}
                    {tries.map(tryItem => {
                      const config = getTryTypeConfig(tryItem.type);
                      const x = (tryItem.x / 100) * 400;
                      const y = (tryItem.y / 100) * 600;
                      
                      return (
                        <g key={tryItem.id}>
                          <circle
                            cx={x}
                            cy={y}
                            r="10"
                            fill={config.color}
                            stroke={tryItem.team === 'home' ? '#1E40AF' : '#DC2626'}
                            strokeWidth="2"
                            className="cursor-pointer hover:opacity-80"
                            onClick={(e) => handleTryClick(tryItem, e)}
                          />
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
                          <circle
                            cx={x + 12}
                            cy={y - 12}
                            r="6"
                            fill="rgba(0,0,0,0.7)"
                            className="cursor-pointer"
                            onClick={(e) => handleTryClick(tryItem, e)}
                          />
                          <Edit
                            x={x + 9}
                            y={y - 15}
                            width="6"
                            height="6"
                            fill="white"
                            className="pointer-events-none"
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>
                
                <div className="mt-4 text-sm text-gray-600">
                  <p>Click on a try marker to edit Quarter and Phase details. Total tries: {tries.length}</p>
                  {isPlacingTry && (
                    <p className="text-blue-600 font-medium">
                      Click anywhere on the pitch to place a {getTryTypeConfig(selectedType).label} try
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Analytical Metrics Charts */}
        {tries.length > 0 && (
          <div className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Zone Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Tries by Zone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={zoneData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        fontSize={12}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => [value, 'Tries']}
                        labelFormatter={(label) => `Zone: ${label}`}
                      />
                      <Bar dataKey="value" fill={CHART_COLORS[0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Quarter Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Tries by Quarter
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Tooltip 
                        formatter={(value: any, name: any) => [value, 'Tries']}
                      />
                      <Legend />
                      <Pie
                        data={quarterData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percentage }: any) => `${name}: ${percentage}%`}
                      >
                        {quarterData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Phase Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Tries by Phase
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={phaseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => [value, 'Tries']}
                        labelFormatter={(label) => `Phase: ${label}`}
                      />
                      <Bar dataKey="value" fill={CHART_COLORS[1]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Source Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Tries by Source
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Tooltip 
                        formatter={(value: any, name: any) => [value, 'Tries']}
                      />
                      <Legend />
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percentage }: any) => `${name}: ${percentage}%`}
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Edit Try Dialog */}
        {editingTry && (
          <Dialog open={!!editingTry} onOpenChange={() => setEditingTry(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Try Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Quarter</Label>
                  <Select value={editQuarter} onValueChange={setEditQuarter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quarter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Q1 (0-20min)</SelectItem>
                      <SelectItem value="2">Q2 (20-40min)</SelectItem>
                      <SelectItem value="3">Q3 (40-60min)</SelectItem>
                      <SelectItem value="4">Q4 (60-80min)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Phase</Label>
                  <Select value={editPhase} onValueChange={setEditPhase}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select phase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phase_1">Phase 1</SelectItem>
                      <SelectItem value="phase_2_3">Phase 2-3</SelectItem>
                      <SelectItem value="phase_4_6">Phase 4-6</SelectItem>
                      <SelectItem value="phase_7_plus">Phase 7+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button onClick={saveTryEdit} className="flex-1">Save</Button>
                  <Button variant="outline" onClick={() => deleteTry(editingTry.id)} className="flex-1">Delete</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}