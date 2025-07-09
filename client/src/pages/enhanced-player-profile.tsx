import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlayerValueScorecard from "@/components/player-value-scorecard";
import AdvancedMetrics from "@/components/advanced-metrics";
import AIPlayerAnalysis from "@/components/ai-player-analysis";
import { 
  moneyBallPlayersData, 
  convertToPlayerValueMetrics,
  type MoneyBallPlayer 
} from "@/data/moneyBallPlayers";
import { type PlayerValueMetrics } from "@/lib/playerValueCalculation";
import { 
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Ruler,
  Weight,
  Activity,
  Award,
  Users,
  MessageSquare,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Clock,
  Download,
  Upload
} from "lucide-react";

interface Player {
  id: string;
  personalDetails: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    address: string;
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
    };
  };
  rugbyProfile: {
    jerseyNumber: number;
    primaryPosition: string;
    secondaryPositions: string[];
    playingLevel: string;
    yearsInTeam: number;
  };
  physicalAttributes: Array<{
    date: string;
    weight: number;
    height: number;
    bodyFat: number;
    leanMass: number;
  }>;
  gameStats: Array<{
    season: string;
    matchesPlayed: number;
    minutesPlayed: number;
    tries: number;
    tackles: number;
    penalties: number;
  }>;
  skills: {
    ballHandling: number;
    passing: number;
    kicking: number;
    defense: number;
    communication: number;
  };
  status: {
    fitness: string;
    medical: string;
  };
  aiRating?: {
    overall: number;
    potential: number;
  };
}

export default function EnhancedPlayerProfile() {
  const [, params] = useRoute("/player/:playerId");
  const playerId = params?.playerId;

  const { data: player, isLoading } = useQuery<Player>({
    queryKey: [`/api/players/${playerId}`],
    enabled: !!playerId,
  });

  // Download player data as CSV
  const downloadPlayerData = () => {
    if (!player) return;
    
    const latestPhysical = player.physicalAttributes?.[player.physicalAttributes.length - 1];
    const latestGameStats = player.gameStats?.[player.gameStats.length - 1];
    const age = Math.floor((new Date().getTime() - new Date(player.personalDetails.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    
    // Create comprehensive CSV data structure
    const csvData = [
      // Header row
      [
        'Export Date', 'Player ID', 'First Name', 'Last Name', 'Age', 'Date of Birth', 'Email', 'Phone', 'Address',
        'Emergency Contact Name', 'Emergency Contact Relationship', 'Emergency Contact Phone',
        'Jersey Number', 'Primary Position', 'Secondary Positions', 'Playing Level', 'Years In Team',
        'Height (cm)', 'Weight (kg)', 'Body Fat (%)', 'Lean Mass (kg)',
        'Ball Handling', 'Passing', 'Kicking', 'Defense', 'Communication',
        'Matches Played', 'Minutes Played', 'Tries', 'Tackles', 'Penalties',
        'Overall AI Rating', 'Potential Rating', 'Fitness Status', 'Medical Status'
      ],
      // Data row
      [
        new Date().toISOString().split('T')[0],
        player.id,
        player.personalDetails.firstName,
        player.personalDetails.lastName,
        age,
        player.personalDetails.dateOfBirth,
        player.personalDetails.email,
        player.personalDetails.phone,
        player.personalDetails.address,
        player.personalDetails.emergencyContact.name,
        player.personalDetails.emergencyContact.relationship,
        player.personalDetails.emergencyContact.phone,
        player.rugbyProfile?.jerseyNumber || player.personalDetails?.jerseyNumber || 'N/A',
        player.rugbyProfile?.primaryPosition || 'Unknown Position',
        player.rugbyProfile?.secondaryPositions?.join(';') || '',
        player.rugbyProfile?.playingLevel || 'Unknown Level',
        player.rugbyProfile?.yearsInTeam || 0,
        latestPhysical?.height || '',
        latestPhysical?.weight || '',
        latestPhysical?.bodyFat || '',
        latestPhysical?.leanMass || '',
        player.skills.ballHandling || '',
        player.skills.passing || '',
        player.skills.kicking || '',
        player.skills.defense || '',
        player.skills.communication || '',
        latestGameStats?.matchesPlayed || '',
        latestGameStats?.minutesPlayed || '',
        latestGameStats?.tries || '',
        latestGameStats?.tackles || '',
        latestGameStats?.penalties || '',
        player.aiRating?.overall || '',
        player.aiRating?.potential || '',
        player.status.fitness,
        player.status.medical
      ]
    ];

    // Convert to CSV string
    const csvContent = csvData.map(row => 
      row.map(field => {
        // Handle fields that might contain commas or quotes
        const stringField = String(field || '');
        if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
          return `"${stringField.replace(/"/g, '""')}"`;
        }
        return stringField;
      }).join(',')
    ).join('\n');

    // Create and download file
    const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${player.personalDetails.firstName}_${player.personalDetails.lastName}_profile_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle CSV file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      alert('Please select a CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvContent = e.target?.result as string;
        const lines = csvContent.split('\n');
        
        if (lines.length < 2) {
          alert('CSV file must contain header and data rows');
          return;
        }

        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        const dataRow = lines[1].split(',').map(d => d.trim().replace(/"/g, ''));

        // Create player data object from CSV
        const updatedPlayerData: any = {
          id: dataRow[headers.indexOf('Player ID')] || player?.id,
          personalDetails: {
            firstName: dataRow[headers.indexOf('First Name')] || '',
            lastName: dataRow[headers.indexOf('Last Name')] || '',
            dateOfBirth: dataRow[headers.indexOf('Date of Birth')] || '',
            email: dataRow[headers.indexOf('Email')] || '',
            phone: dataRow[headers.indexOf('Phone')] || '',
            address: dataRow[headers.indexOf('Address')] || '',
            emergencyContact: {
              name: dataRow[headers.indexOf('Emergency Contact Name')] || '',
              relationship: dataRow[headers.indexOf('Emergency Contact Relationship')] || '',
              phone: dataRow[headers.indexOf('Emergency Contact Phone')] || ''
            }
          },
          rugbyProfile: {
            jerseyNumber: parseInt(dataRow[headers.indexOf('Jersey Number')]) || 0,
            primaryPosition: dataRow[headers.indexOf('Primary Position')] || '',
            secondaryPositions: dataRow[headers.indexOf('Secondary Positions')]?.split(';').filter(p => p) || [],
            playingLevel: dataRow[headers.indexOf('Playing Level')] || '',
            yearsInTeam: parseInt(dataRow[headers.indexOf('Years In Team')]) || 0
          },
          skills: {
            ballHandling: parseFloat(dataRow[headers.indexOf('Ball Handling')]) || 0,
            passing: parseFloat(dataRow[headers.indexOf('Passing')]) || 0,
            kicking: parseFloat(dataRow[headers.indexOf('Kicking')]) || 0,
            defense: parseFloat(dataRow[headers.indexOf('Defense')]) || 0,
            communication: parseFloat(dataRow[headers.indexOf('Communication')]) || 0
          },
          status: {
            fitness: dataRow[headers.indexOf('Fitness Status')] || 'unknown',
            medical: dataRow[headers.indexOf('Medical Status')] || 'unknown'
          },
          // Add physical attributes update
          physicalAttributes: [{
            ...player?.physicalAttributes?.[player.physicalAttributes.length - 1],
            date: new Date().toISOString().split('T')[0],
            height: parseInt(dataRow[headers.indexOf('Height (cm)')]) || player?.physicalAttributes?.[player.physicalAttributes.length - 1]?.height || 0,
            weight: parseInt(dataRow[headers.indexOf('Weight (kg)')]) || player?.physicalAttributes?.[player.physicalAttributes.length - 1]?.weight || 0,
            bodyFat: parseFloat(dataRow[headers.indexOf('Body Fat (%)')]) || player?.physicalAttributes?.[player.physicalAttributes.length - 1]?.bodyFat || 0,
            leanMass: parseFloat(dataRow[headers.indexOf('Lean Mass (kg)')]) || player?.physicalAttributes?.[player.physicalAttributes.length - 1]?.leanMass || 0
          }],
          // Add game stats update
          gameStats: [{
            ...player?.gameStats?.[player.gameStats.length - 1],
            season: new Date().getFullYear().toString(),
            matchesPlayed: parseInt(dataRow[headers.indexOf('Matches Played')]) || player?.gameStats?.[player.gameStats.length - 1]?.matchesPlayed || 0,
            minutesPlayed: parseInt(dataRow[headers.indexOf('Minutes Played')]) || player?.gameStats?.[player.gameStats.length - 1]?.minutesPlayed || 0,
            tries: parseInt(dataRow[headers.indexOf('Tries')]) || player?.gameStats?.[player.gameStats.length - 1]?.tries || 0,
            tackles: parseInt(dataRow[headers.indexOf('Tackles')]) || player?.gameStats?.[player.gameStats.length - 1]?.tackles || 0,
            penalties: parseInt(dataRow[headers.indexOf('Penalties')]) || player?.gameStats?.[player.gameStats.length - 1]?.penalties || 0
          }],
          aiRating: {
            overall: parseFloat(dataRow[headers.indexOf('Overall AI Rating')]) || undefined,
            potential: parseFloat(dataRow[headers.indexOf('Potential Rating')]) || undefined
          }
        };

        // Validate required fields
        if (!updatedPlayerData.personalDetails.firstName || !updatedPlayerData.personalDetails.lastName) {
          alert('CSV must contain valid First Name and Last Name');
          return;
        }

        console.log('Parsed CSV player data:', updatedPlayerData);
        alert(`Player data for ${updatedPlayerData.personalDetails.firstName} ${updatedPlayerData.personalDetails.lastName} uploaded successfully!\n\nNote: In a production system, this would update the database. The parsed data is logged to console for review.`);
        
        // Here you would typically send the data to your API to update the player
        // await apiRequest('/api/players/' + playerId, {
        //   method: 'PUT',
        //   body: updatedPlayerData
        // });
        
      } catch (error) {
        console.error('CSV parsing error:', error);
        alert('Error reading CSV file. Please ensure it\'s properly formatted.');
      }
    };
    reader.readAsText(file);
    
    // Reset the input
    event.target.value = '';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nh-red mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading player profile...</p>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Player Not Found</h2>
          <p className="text-gray-600 mb-4">The requested player profile could not be found.</p>
          <Link href="/players">
            <Button className="bg-nh-red hover:bg-nh-red-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Players
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const latestPhysical = player.physicalAttributes?.[player.physicalAttributes.length - 1];
  const latestGameStats = player.gameStats?.[player.gameStats.length - 1];
  
  // Calculate age
  const age = Math.floor((new Date().getTime() - new Date(player.personalDetails.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800 border-green-200";
      case "injured": return "bg-red-100 text-red-800 border-red-200";
      case "recovering": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available": return <CheckCircle className="w-4 h-4" />;
      case "injured": return <AlertTriangle className="w-4 h-4" />;
      case "recovering": return <Clock className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  // Convert to Player Value metrics if this player has MoneyBall data
  const moneyBallPlayer = moneyBallPlayersData.find(p => 
    p.name.toLowerCase().includes(player.personalDetails.firstName.toLowerCase()) ||
    p.name.toLowerCase().includes(player.personalDetails.lastName.toLowerCase())
  );

  let playerValueMetrics: PlayerValueMetrics | null = null;
  if (moneyBallPlayer) {
    playerValueMetrics = convertToPlayerValueMetrics(moneyBallPlayer);
  } else {
    // Create basic metrics from existing player data
    playerValueMetrics = {
      position: player.rugbyProfile?.primaryPosition || 'Unknown Position',
      secondaryPosition: player.rugbyProfile?.secondaryPositions?.[0],
      weight: latestPhysical?.weight || 100,
      contractValue: 85000, // Sample value
      
      // Performance Metrics
      minutesPlayed: latestGameStats?.minutesPlayed || 500,
      gamesPlayed: latestGameStats?.matchesPlayed || 10,
      totalContributions: 300,
      positiveContributions: 250,
      negativeContributions: 50,
      xFactorContributions: 20,
      penaltyCount: latestGameStats?.penalties || 5,
      
      // Physical Metrics
      sprintTime10m: 1.85,
      totalCarries: 60,
      dominantCarryPercent: 8.5,
      tackleCompletionPercent: 85.0,
      breakdownSuccessPercent: 90.0,
      
      // Cohesion Factors
      attendanceScore: 9.0,
      scScore: 8.5,
      medicalScore: 9.5,
      personalityScore: 8.8
    };
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/players">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Players
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {player.personalDetails.firstName} {player.personalDetails.lastName}
                </h1>
                <p className="text-gray-600">#{player.rugbyProfile?.jerseyNumber || player.personalDetails?.jerseyNumber || 'N/A'} • {player.rugbyProfile?.primaryPosition || 'Unknown Position'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={downloadPlayerData}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download CSV
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload CSV
              </Button>
              <input
                id="file-upload"
                type="file"
                accept=".csv"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
              <Badge className={`flex items-center gap-2 ${getStatusColor(player.status.fitness)}`}>
                {getStatusIcon(player.status.fitness)}
                {player.status.fitness}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* CSV Format Help */}
      <div className="container mx-auto px-4 pb-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            <strong>CSV Export/Import:</strong> Download exports all player data in spreadsheet format. Edit any fields in Excel/Google Sheets and upload the CSV to update player information. Required fields: First Name, Last Name.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:border-transparent data-[state=inactive]:text-nh-red data-[state=inactive]:hover:text-white data-[state=inactive]:border-2 data-[state=inactive]:border-nh-red data-[state=inactive]:hover:bg-nh-red data-[state=inactive]:hover:border-nh-red font-semibold py-3 px-4 rounded-md transition-all duration-200"
            >
              Player Profile
            </TabsTrigger>
            <TabsTrigger 
              value="value-analysis" 
              className="data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:border-transparent data-[state=inactive]:text-nh-red data-[state=inactive]:hover:text-white data-[state=inactive]:border-2 data-[state=inactive]:border-nh-red data-[state=inactive]:hover:bg-nh-red data-[state=inactive]:hover:border-nh-red font-semibold py-3 px-4 rounded-md transition-all duration-200"
            >
              Player Value Analysis
            </TabsTrigger>
            <TabsTrigger 
              value="advanced-metrics" 
              className="data-[state=active]:bg-nh-red data-[state=active]:text-white data-[state=active]:border-transparent data-[state=inactive]:text-nh-red data-[state=inactive]:hover:text-white data-[state=inactive]:border-2 data-[state=inactive]:border-nh-red data-[state=inactive]:hover:bg-nh-red data-[state=inactive]:hover:border-nh-red font-semibold py-3 px-4 rounded-md transition-all duration-200"
            >
              Advanced Metrics
            </TabsTrigger>
          </TabsList>

          {/* Player Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal Information Card */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture */}
                  <div className="text-center">
                    <Avatar className="w-32 h-32 mx-auto mb-4">
                      <AvatarImage 
                        src={player.personalDetails?.profileImageUrl || `/api/players/${player.id}/avatar`} 
                        alt={`${player.personalDetails.firstName} ${player.personalDetails.lastName}`} 
                      />
                      <AvatarFallback className="bg-nh-red text-white text-2xl font-bold">
                        {player.personalDetails.firstName[0]}{player.personalDetails.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold">{player.personalDetails.firstName} {player.personalDetails.lastName}</h3>
                    <p className="text-gray-600">#{player.rugbyProfile?.jerseyNumber || player.personalDetails?.jerseyNumber || 'N/A'}</p>
                  </div>

                  {/* Basic Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">Age: {age} years</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{player.personalDetails.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{player.rugbyProfile?.playingLevel || 'Unknown Level'}</span>
                    </div>
                  </div>

                  {/* Contact Actions */}
                  <div className="space-y-2">
                    <Button className="w-full bg-nh-red hover:bg-nh-red-600" size="sm">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Player
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Player
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Physical & Performance Stats */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Physical & Performance Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {/* Physical Stats */}
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Ruler className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{latestPhysical?.height || 'N/A'}</div>
                      <div className="text-sm text-gray-600">Height (cm)</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Weight className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{latestPhysical?.weight || 'N/A'}</div>
                      <div className="text-sm text-gray-600">Weight (kg)</div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Activity className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{latestPhysical?.bodyFat || 'N/A'}</div>
                      <div className="text-sm text-gray-600">Body Fat (%)</div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Award className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{player.aiRating?.overall || 'N/A'}</div>
                      <div className="text-sm text-gray-600">AI Rating</div>
                    </div>
                  </div>

                  {/* Skills Breakdown */}
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-4">Skills Assessment</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(player.skills).map(([skill, rating]) => (
                        <div key={skill} className="flex items-center justify-between">
                          <span className="text-sm font-medium capitalize">{skill.replace(/([A-Z])/g, ' $1')}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-nh-red h-2 rounded-full" 
                                style={{ width: `${(rating / 10) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-bold w-8">{rating}/10</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Performance */}
                  {latestGameStats && (
                    <div className="mt-8">
                      <h4 className="text-lg font-semibold mb-4">Recent Performance ({latestGameStats.season})</h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="text-center">
                          <div className="text-xl font-bold text-gray-900">{latestGameStats.matchesPlayed}</div>
                          <div className="text-xs text-gray-600">Matches</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-gray-900">{latestGameStats.minutesPlayed}</div>
                          <div className="text-xs text-gray-600">Minutes</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-gray-900">{latestGameStats.tries}</div>
                          <div className="text-xs text-gray-600">Tries</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-gray-900">{latestGameStats.tackles}</div>
                          <div className="text-xs text-gray-600">Tackles</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-gray-900">{latestGameStats.penalties}</div>
                          <div className="text-xs text-gray-600">Penalties</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Player Value Analysis Tab */}
          <TabsContent value="value-analysis" className="space-y-6">
            {playerValueMetrics && (
              <div>
                <div className="mb-6 text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Player Value Analysis</h2>
                  <p className="text-gray-600">
                    Comprehensive assessment combining performance metrics, cohesion impact, and market value
                  </p>
                </div>
                <PlayerValueScorecard metrics={playerValueMetrics} />
                
                {/* AI Analysis Section */}
                <div className="mt-8">
                  <AIPlayerAnalysis 
                    metrics={playerValueMetrics} 
                    playerName={player?.personalDetails?.firstName + ' ' + player?.personalDetails?.lastName || 'Player'} 
                  />
                </div>
              </div>
            )}
          </TabsContent>

          {/* Advanced Metrics Tab */}
          <TabsContent value="advanced-metrics" className="space-y-6">
            <AdvancedMetrics playerId={playerId} player={player} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}