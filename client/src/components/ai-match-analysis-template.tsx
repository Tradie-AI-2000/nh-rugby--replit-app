import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Send, 
  Mail, 
  MessageSquare, 
  Phone,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Star,
  Zap
} from "lucide-react";

interface MatchAnalysisTemplateProps {
  playerId: string;
  playerName: string;
}

export default function AIMatchAnalysisTemplate({ playerId, playerName }: MatchAnalysisTemplateProps) {
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [analysisData, setAnalysisData] = useState({
    matchDate: "",
    opponent: "",
    matchResult: "",
    playerPosition: "",
    minutesPlayed: "",
    performanceRating: ""
  });
  
  const [generatedAnalysis, setGeneratedAnalysis] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<string>("email");

  // Position-specific analysis templates
  const positionTemplates = {
    "Front Row": {
      keyMetrics: ["Scrummaging", "Lineout throwing/hooking", "Rucking", "Ball handling", "Mobility"],
      focusAreas: ["Set piece accuracy", "Contact efficiency", "Breakdown work", "Support play"]
    },
    "Second Row": {
      keyMetrics: ["Lineout jumping", "Scrummaging", "Rucking", "Carrying", "Tackling"],
      focusAreas: ["Lineout leadership", "Work rate", "Physical presence", "Ball skills"]
    },
    "Back Row": {
      keyMetrics: ["Tackles made", "Carries", "Turnovers", "Lineout work", "Breakdown arrival"],
      focusAreas: ["Breakdown efficiency", "Link play", "Defensive reads", "Attack lines"]
    },
    "Half Back": {
      keyMetrics: ["Pass accuracy", "Box kicks", "Rucks cleared", "Territory gained", "Decision making"],
      focusAreas: ["Game management", "Kicking accuracy", "Quick ball", "Communication"]
    },
    "Fly Half": {
      keyMetrics: ["Pass accuracy", "Kicks from hand", "Goal kicking", "Tackles", "Line breaks"],
      focusAreas: ["Game control", "Tactical kicking", "Attacking vision", "Defensive positioning"]
    },
    "Centre": {
      keyMetrics: ["Tackles", "Carries", "Line breaks", "Offloads", "Turnovers"],
      focusAreas: ["Defensive alignment", "Attack timing", "Ball distribution", "Support play"]
    },
    "Back Three": {
      keyMetrics: ["Meters gained", "Clean catches", "Kicks returned", "Tackles", "Line breaks"],
      focusAreas: ["Positional play", "Finishing", "Counter attack", "Aerial skills"]
    }
  };

  const generateAIAnalysis = async () => {
    setIsGenerating(true);
    
    // Simulate AI analysis generation - in real implementation, this would call an AI service
    setTimeout(() => {
      const template = positionTemplates[selectedPosition as keyof typeof positionTemplates];
      
      const mockAnalysis = {
        overallPerformance: {
          rating: analysisData.performanceRating,
          summary: `Strong performance in the ${analysisData.minutesPlayed} minutes against ${analysisData.opponent}. Showed excellent work rate and commitment throughout.`,
          highlights: [
            "Excellent breakdown work - won 3 turnovers",
            "Strong carrying in tight spaces - 8 carries for 32m",
            "Solid defensive effort - 12/13 tackles made"
          ],
          areasForImprovement: [
            "Lineout timing - 2 missed jumps in first half",
            "Ball handling under pressure - 1 knock-on",
            "Support play positioning"
          ]
        },
        positionSpecific: {
          metrics: template?.keyMetrics.map(metric => ({
            area: metric,
            performance: Math.floor(Math.random() * 3) + 3, // 3-5 rating
            feedback: `Good execution of ${metric.toLowerCase()} throughout the match.`
          })) || [],
          recommendations: template?.focusAreas.map(area => ({
            focus: area,
            priority: Math.random() > 0.5 ? "High" : "Medium",
            actionSteps: [
              `Extra training session focused on ${area.toLowerCase()}`,
              `Video analysis review of key moments`,
              `1-on-1 coaching session this week`
            ]
          })) || []
        },
        weeklyPlan: {
          day1: "Skills focused - ball handling and passing accuracy",
          day2: "Contact work - breakdown and tackling technique", 
          day3: "Position specific - lineout practice and timing",
          day4: "Game situation drills - decision making under pressure",
          day5: "Recovery and video analysis session"
        },
        coachNotes: `${playerName} showed great commitment and physicality in this match. The main focus for this week should be on technical accuracy, particularly in set piece situations. Continue building confidence in attack and maintain the strong defensive mindset shown.`
      };
      
      setGeneratedAnalysis(mockAnalysis);
      setIsGenerating(false);
    }, 2000);
  };

  const sendAnalysis = () => {
    // In real implementation, this would send via the selected channel
    alert(`Analysis sent to ${playerName} via ${selectedChannel}!`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="text-purple-600" size={24} />
            <span>AI Match Analysis Generator</span>
          </CardTitle>
          <CardDescription>
            Generate personalized match analysis and training recommendations for {playerName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!generatedAnalysis && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Match Date</label>
                  <Input 
                    type="date" 
                    value={analysisData.matchDate}
                    onChange={(e) => setAnalysisData({...analysisData, matchDate: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Opponent</label>
                  <Input 
                    placeholder="e.g., Auckland Blues"
                    value={analysisData.opponent}
                    onChange={(e) => setAnalysisData({...analysisData, opponent: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Match Result</label>
                  <Input 
                    placeholder="e.g., 28-21 Win"
                    value={analysisData.matchResult}
                    onChange={(e) => setAnalysisData({...analysisData, matchResult: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Position Played</label>
                  <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(positionTemplates).map(position => (
                        <SelectItem key={position} value={position}>{position}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Minutes Played</label>
                  <Input 
                    placeholder="e.g., 80"
                    value={analysisData.minutesPlayed}
                    onChange={(e) => setAnalysisData({...analysisData, minutesPlayed: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Performance Rating (1-5)</label>
                  <Select value={analysisData.performanceRating} onValueChange={(value) => setAnalysisData({...analysisData, performanceRating: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 - Outstanding</SelectItem>
                      <SelectItem value="4">4 - Very Good</SelectItem>
                      <SelectItem value="3">3 - Good</SelectItem>
                      <SelectItem value="2">2 - Below Average</SelectItem>
                      <SelectItem value="1">1 - Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          
          {!generatedAnalysis && (
            <Button 
              onClick={generateAIAnalysis} 
              disabled={!selectedPosition || isGenerating}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isGenerating ? (
                <>
                  <Brain className="animate-spin mr-2" size={16} />
                  Generating AI Analysis...
                </>
              ) : (
                <>
                  <Brain className="mr-2" size={16} />
                  Generate Match Analysis
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      {generatedAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Match Analysis Report</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                AI Generated
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="position">Position Focus</TabsTrigger>
                <TabsTrigger value="plan">Weekly Plan</TabsTrigger>
                <TabsTrigger value="send">Send Report</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="text-center p-4">
                    <Star className="mx-auto mb-2 text-yellow-500" size={24} />
                    <div className="text-2xl font-bold">{generatedAnalysis.overallPerformance.rating}/5</div>
                    <div className="text-sm text-gray-600">Overall Rating</div>
                  </Card>
                  <Card className="text-center p-4">
                    <CheckCircle className="mx-auto mb-2 text-green-500" size={24} />
                    <div className="text-2xl font-bold">{generatedAnalysis.overallPerformance.highlights.length}</div>
                    <div className="text-sm text-gray-600">Key Highlights</div>
                  </Card>
                  <Card className="text-center p-4">
                    <Target className="mx-auto mb-2 text-blue-500" size={24} />
                    <div className="text-2xl font-bold">{generatedAnalysis.overallPerformance.areasForImprovement.length}</div>
                    <div className="text-sm text-gray-600">Focus Areas</div>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Match Highlights</h4>
                    <ul className="space-y-1">
                      {generatedAnalysis.overallPerformance.highlights.map((highlight: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="text-green-500" size={16} />
                          <span className="text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">Areas for Improvement</h4>
                    <ul className="space-y-1">
                      {generatedAnalysis.overallPerformance.areasForImprovement.map((area: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <AlertCircle className="text-orange-500" size={16} />
                          <span className="text-sm">{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="position" className="space-y-4">
                <h4 className="font-semibold text-blue-700 mb-4">{selectedPosition} Specific Analysis</h4>
                
                <div className="space-y-4">
                  {generatedAnalysis.positionSpecific.metrics.map((metric: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{metric.area}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < metric.performance ? "text-yellow-500 fill-current" : "text-gray-300"} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{metric.feedback}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h5 className="font-semibold text-purple-700 mb-3">Training Recommendations</h5>
                  <div className="space-y-3">
                    {generatedAnalysis.positionSpecific.recommendations.map((rec: any, index: number) => (
                      <Card key={index} className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{rec.focus}</span>
                          <Badge variant={rec.priority === "High" ? "destructive" : "secondary"}>
                            {rec.priority} Priority
                          </Badge>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {rec.actionSteps.map((step: string, stepIndex: number) => (
                            <li key={stepIndex} className="flex items-center space-x-2">
                              <Zap className="text-blue-500" size={12} />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="plan" className="space-y-4">
                <h4 className="font-semibold text-blue-700 mb-4">Recommended Weekly Training Plan</h4>
                
                <div className="space-y-3">
                  {Object.entries(generatedAnalysis.weeklyPlan).map(([day, activity]) => (
                    <Card key={day} className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-nh-red text-white rounded-full flex items-center justify-center font-bold">
                          {day.replace('day', 'D')}
                        </div>
                        <div>
                          <div className="font-medium capitalize">{day.replace('day', 'Day ')}</div>
                          <div className="text-sm text-gray-600">{activity}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <h5 className="font-semibold text-blue-800 mb-2">Coach Notes</h5>
                  <p className="text-sm text-blue-700">{generatedAnalysis.coachNotes}</p>
                </Card>
              </TabsContent>
              
              <TabsContent value="send" className="space-y-4">
                <h4 className="font-semibold text-blue-700 mb-4">Send Analysis Report</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Communication Channel</label>
                    <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">
                          <div className="flex items-center space-x-2">
                            <Mail size={16} />
                            <span>Email</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="slack">
                          <div className="flex items-center space-x-2">
                            <MessageSquare size={16} />
                            <span>Slack Message</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="whatsapp">
                          <div className="flex items-center space-x-2">
                            <Phone size={16} />
                            <span>WhatsApp</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Additional Message (Optional)</label>
                    <Textarea 
                      placeholder="Add any personal notes or encouragement..."
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button onClick={sendAnalysis} className="flex-1 bg-green-600 hover:bg-green-700">
                      <Send className="mr-2" size={16} />
                      Send Analysis Report
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setGeneratedAnalysis(null)}
                      className="flex-1"
                    >
                      Generate New Analysis
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}