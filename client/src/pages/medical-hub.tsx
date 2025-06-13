import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import logoPath from "@assets/menulogo_wo.png";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Activity, 
  Users, 
  FileText,
  Shield,
  AlertTriangle,
  ArrowLeft,
  Settings,
  Bell,
  Heart,
  Stethoscope,
  ClipboardList,
  UserCheck,
  MessageSquare,
  Clock,
  Target,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Plus,
  BarChart3,
  Phone,
  Mail,
  MessageCircle,
  Dumbbell,
  Timer,
  CalendarPlus,
  Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Comprehensive medical data for all squad players
const squadMedicalStatus = [
  {
    id: "penaia_cakobau",
    name: "Penaia Cakobau",
    position: "Hooker",
    status: "available",
    photoUrl: "/api/players/penaia_cakobau/avatar",
    rtpPhase: null,
    primaryInjury: null,
    etr: null,
    lastAssessment: "2024-06-10",
    wellnessScore: 8.2,
    injuryHistory: [
      { date: "2023-08-15", injury: "Thumb Ligament Strain", severity: "Minor", daysMissed: 7 },
      { date: "2023-04-22", injury: "Concussion", severity: "Moderate", daysMissed: 14 }
    ],
    currentLoad: { acute: 385, chronic: 412, ratio: 0.93 },
    screeningResults: {
      fms: 16,
      shoulderFlexibility: "Normal",
      ankleStability: "Good",
      lastScreening: "2024-01-15"
    }
  },
  {
    id: "tane_edmed", 
    name: "Tane Edmed",
    position: "First-Five",
    status: "available",
    photoUrl: "/api/players/tane_edmed/avatar",
    rtpPhase: null,
    primaryInjury: null,
    etr: null,
    lastAssessment: "2024-06-12",
    wellnessScore: 9.1,
    injuryHistory: [
      { date: "2024-02-18", injury: "Hip Flexor Strain", severity: "Minor", daysMissed: 5 },
      { date: "2023-11-30", injury: "Ankle Sprain Grade 1", severity: "Minor", daysMissed: 10 }
    ],
    currentLoad: { acute: 342, chronic: 358, ratio: 0.95 },
    screeningResults: {
      fms: 18,
      shoulderFlexibility: "Excellent",
      ankleStability: "Excellent",
      lastScreening: "2024-01-15"
    }
  },
  {
    id: "mark_telea",
    name: "Mark Tele'a",
    position: "Wing",
    status: "modified",
    photoUrl: "/api/players/mark_telea/avatar",
    rtpPhase: "Phase 3: Running Progression",
    primaryInjury: "Right Hamstring Strain Grade 1",
    etr: "5-7 days",
    lastAssessment: "2024-06-13",
    wellnessScore: 6.8,
    injuryHistory: [
      { date: "2024-06-08", injury: "Right Hamstring Strain Grade 1", severity: "Minor", daysMissed: 7 },
      { date: "2023-09-12", injury: "Left Calf Strain", severity: "Minor", daysMissed: 12 },
      { date: "2023-03-07", injury: "Shoulder Subluxation", severity: "Moderate", daysMissed: 21 }
    ],
    currentLoad: { acute: 287, chronic: 398, ratio: 0.72 },
    screeningResults: {
      fms: 15,
      shoulderFlexibility: "Good", 
      ankleStability: "Normal",
      lastScreening: "2024-01-15"
    }
  },
  {
    id: "bryn_gordon",
    name: "Bryn Gordon", 
    position: "Hooker",
    status: "available",
    photoUrl: "/api/players/bryn_gordon/avatar",
    rtpPhase: null,
    primaryInjury: null,
    etr: null,
    lastAssessment: "2024-06-11",
    wellnessScore: 7.9,
    injuryHistory: [
      { date: "2024-01-25", injury: "Rib Contusion", severity: "Minor", daysMissed: 3 },
      { date: "2023-07-14", injury: "Wrist Sprain", severity: "Minor", daysMissed: 8 }
    ],
    currentLoad: { acute: 445, chronic: 421, ratio: 1.06 },
    screeningResults: {
      fms: 14,
      shoulderFlexibility: "Normal",
      ankleStability: "Good",
      lastScreening: "2024-01-15"
    }
  },
  {
    id: "cam_christie",
    name: "Cam Christie",
    position: "Lock", 
    status: "unavailable",
    photoUrl: "/api/players/cam_christie/avatar",
    rtpPhase: "Phase 1: Pain Control & Range of Motion",
    primaryInjury: "Left Shoulder AC Joint Sprain Grade 2",
    etr: "3-4 weeks",
    lastAssessment: "2024-06-13",
    wellnessScore: 5.2,
    injuryHistory: [
      { date: "2024-06-05", injury: "Left Shoulder AC Joint Sprain Grade 2", severity: "Moderate", daysMissed: 21 },
      { date: "2023-10-03", injury: "Lower Back Strain", severity: "Minor", daysMissed: 9 },
      { date: "2023-05-18", injury: "Knee MCL Strain Grade 1", severity: "Minor", daysMissed: 14 }
    ],
    currentLoad: { acute: 156, chronic: 389, ratio: 0.40 },
    screeningResults: {
      fms: 13,
      shoulderFlexibility: "Limited (L)",
      ankleStability: "Good",
      lastScreening: "2024-01-15"
    }
  }
];

const atRiskPlayers = [
  {
    name: "Bryn Gordon",
    position: "Hooker",
    riskFactor: "ACWR 1.06 - Elevated workload",
    riskLevel: "moderate",
    details: "Recent increase in training load above optimal range"
  },
  {
    name: "Mark Tele'a", 
    position: "Wing",
    riskFactor: "Recent hamstring injury",
    riskLevel: "high",
    details: "History of posterior chain injuries, monitor load progression"
  },
  {
    name: "Cam Christie",
    position: "Lock", 
    riskFactor: "Poor wellness scores (5.2/10)",
    riskLevel: "high",
    details: "Current injury affecting sleep and recovery metrics"
  }
];

// Comprehensive medical data for Tane Edmed
const taneEdmedMedicalData = {
  personalInfo: {
    id: "tane_edmed",
    name: "Tane Edmed",
    position: "First-Five",
    dateOfBirth: "2000-04-29",
    age: 24,
    height: "180cm",
    weight: "85kg",
    emergencyContact: {
      name: "Sarah Edmed",
      relationship: "Mother",
      phone: "555-777-8888"
    }
  },
  currentStatus: {
    fitness: "Available",
    medical: "Cleared",
    lastAssessment: "2024-06-12",
    nextReview: "2024-06-26"
  },
  wellnessTracking: {
    currentScore: 9.1,
    trends: [
      { date: "2024-06-13", score: 9.1, sleep: 8.5, fatigue: 2, mood: 9, stress: 2 },
      { date: "2024-06-12", score: 8.8, sleep: 8.2, fatigue: 3, mood: 8, stress: 3 },
      { date: "2024-06-11", score: 9.2, sleep: 9.0, fatigue: 1, mood: 9, stress: 2 },
      { date: "2024-06-10", score: 8.9, sleep: 8.0, fatigue: 2, mood: 9, stress: 2 },
      { date: "2024-06-09", score: 9.0, sleep: 8.5, fatigue: 2, mood: 8, stress: 3 }
    ]
  },
  trainingLoad: {
    acute: 342,
    chronic: 358,
    ratio: 0.95,
    weeklyLoads: [
      { week: "Week 1", load: 385, rpe: 6.2 },
      { week: "Week 2", load: 420, rpe: 6.8 },
      { week: "Week 3", load: 398, rpe: 6.5 },
      { week: "Week 4", load: 342, rpe: 5.9 }
    ]
  },
  injuryHistory: [
    {
      id: "injury_001",
      date: "2024-02-18",
      injury: "Right Hip Flexor Strain Grade 1",
      mechanism: "Sharp change of direction during training",
      bodyPart: "Hip/Groin",
      severity: "Minor",
      daysMissed: 5,
      returnDate: "2024-02-23",
      treatments: [
        { date: "2024-02-18", type: "Initial Assessment", therapist: "Dr. Smith", notes: "Acute onset, grade 1 strain" },
        { date: "2024-02-20", type: "Manual Therapy", therapist: "Physio Jones", notes: "Soft tissue work, ROM exercises" },
        { date: "2024-02-22", type: "Exercise Therapy", therapist: "Physio Jones", notes: "Progressive loading protocol" }
      ]
    },
    {
      id: "injury_002", 
      date: "2023-11-30",
      injury: "Left Ankle Sprain Grade 1",
      mechanism: "Landed awkwardly in tackle",
      bodyPart: "Ankle",
      severity: "Minor",
      daysMissed: 10,
      returnDate: "2023-12-10",
      treatments: [
        { date: "2023-11-30", type: "Initial Assessment", therapist: "Dr. Smith", notes: "ATFL involvement, minimal swelling" },
        { date: "2023-12-02", type: "Manual Therapy", therapist: "Physio Wilson", notes: "Joint mobilization, proprioception work" },
        { date: "2023-12-05", type: "Exercise Therapy", therapist: "Physio Wilson", notes: "Balance and strength progression" }
      ]
    }
  ],
  screeningResults: {
    fms: 18,
    lastScreening: "2024-01-15",
    results: {
      deepSquat: 3,
      hurdleStep: 3,
      inlineLunge: 3,
      shoulderMobility: 3,
      activeStraightLeg: 2,
      trunkStability: 3,
      rotaryStability: 2
    },
    recommendations: [
      "Continue hamstring flexibility work",
      "Maintain excellent movement patterns",
      "Monitor rotary stability during high load periods"
    ]
  },
  medicalHistory: {
    allergies: ["None known"],
    medications: ["None"],
    pastSurgeries: ["None"],
    familyHistory: ["No significant rugby-related injuries in family"],
    bloodType: "O+"
  },
  rehabProgram: {
    currentPhase: "Maintenance",
    exercises: [
      {
        category: "Mobility",
        exercises: [
          { name: "Hip Flexor Stretch", sets: 3, duration: "30s each", frequency: "Daily" },
          { name: "Thoracic Spine Rotation", sets: 2, reps: 10, frequency: "Daily" },
          { name: "Ankle Circles", sets: 2, reps: 15, frequency: "Pre-training" }
        ]
      },
      {
        category: "Strength",
        exercises: [
          { name: "Single Leg Hip Thrust", sets: 3, reps: 12, frequency: "3x/week" },
          { name: "Copenhagen Plank", sets: 2, duration: "20s each", frequency: "3x/week" },
          { name: "Calf Raises", sets: 3, reps: 15, frequency: "Daily" }
        ]
      },
      {
        category: "Performance",
        exercises: [
          { name: "Plyometric Step-ups", sets: 3, reps: 8, frequency: "2x/week" },
          { name: "Lateral Bounds", sets: 3, reps: 6, frequency: "2x/week" },
          { name: "Sprint Mechanics", sets: 4, distance: "20m", frequency: "2x/week" }
        ]
      }
    ]
  }
};

// Treatment log entries
const treatmentEntries = [
  {
    id: "treatment_001",
    playerId: "tane_edmed",
    date: "2024-06-12",
    type: "Preventive Treatment",
    therapist: "Sarah Wilson",
    duration: 30,
    notes: {
      subjective: "Player reports excellent recovery, no pain or stiffness",
      objective: "Full ROM hip flexors, no palpable tension. Excellent movement quality",
      assessment: "Maintenance phase progressing well",
      plan: "Continue current exercise program, monitor load progression"
    }
  },
  {
    id: "treatment_002", 
    playerId: "mark_telea",
    date: "2024-06-13",
    type: "Acute Treatment",
    therapist: "Mike Johnson",
    duration: 45,
    notes: {
      subjective: "Mild hamstring tightness following yesterday's training",
      objective: "Grade 1 strain right biceps femoris, minimal swelling",
      assessment: "Early intervention preventing progression",
      plan: "Manual therapy, modified training load for 3-5 days"
    }
  }
];

// Appointment calendar data
const appointments = [
  {
    id: "appt_001",
    playerId: "tane_edmed",
    playerName: "Tane Edmed",
    date: "2024-06-15",
    time: "09:00",
    type: "Routine Check-up",
    staff: "Dr. Smith",
    status: "scheduled",
    notes: "Hip flexor follow-up assessment"
  },
  {
    id: "appt_002",
    playerId: "cam_christie", 
    playerName: "Cam Christie",
    date: "2024-06-17",
    time: "14:30",
    type: "Specialist Review",
    staff: "Dr. Rodriguez",
    status: "scheduled",
    notes: "Orthopaedic review for shoulder AC joint"
  },
  {
    id: "appt_003",
    playerId: "mark_telea",
    playerName: "Mark Tele'a", 
    date: "2024-06-14",
    time: "11:00",
    type: "Treatment Session",
    staff: "Physio Wilson",
    status: "completed",
    attendanceStatus: "attended",
    notes: "Hamstring progression session"
  },
  {
    id: "appt_004",
    playerId: "bryn_gordon",
    playerName: "Bryn Gordon",
    date: "2024-06-13", 
    time: "16:00",
    type: "Load Assessment",
    staff: "Exercise Physiologist",
    status: "completed",
    attendanceStatus: "missed",
    notes: "No-show for ACWR review - affects player value score"
  }
];

const upcomingMilestones = [
  {
    date: "2024-06-15",
    player: "Mark Tele'a",
    milestone: "Return to contact training",
    type: "rtp",
    priority: "high"
  },
  {
    date: "2024-06-17",
    player: "Cam Christie", 
    milestone: "Orthopaedic specialist review",
    type: "appointment",
    priority: "high"
  },
  {
    date: "2024-06-18",
    player: "Bryn Gordon",
    milestone: "Load monitoring assessment",
    type: "assessment",
    priority: "moderate"
  },
  {
    date: "2024-06-20",
    player: "Mark Tele'a",
    milestone: "Projected game availability",
    type: "availability",
    priority: "high"
  },
  {
    date: "2024-06-22",
    player: "Tane Edmed",
    milestone: "Hip flexor follow-up",
    type: "assessment",
    priority: "low"
  },
  {
    date: "2024-06-28",
    player: "Cam Christie",
    milestone: "Phase 2 RTP criteria review",
    type: "rtp",
    priority: "high"
  }
];

export default function MedicalHub() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [showTreatmentDialog, setShowTreatmentDialog] = useState(false);
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);
  const [treatmentForm, setTreatmentForm] = useState({
    playerId: "",
    type: "",
    subjective: "",
    objective: "",
    assessment: "",
    plan: ""
  });
  const [appointmentForm, setAppointmentForm] = useState({
    playerId: "",
    date: "",
    time: "",
    type: "",
    staff: "",
    notes: ""
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "border-green-500 bg-green-50";
      case "modified": return "border-amber-500 bg-amber-50";
      case "unavailable": return "border-red-500 bg-red-50";
      default: return "border-gray-300 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "modified": return <AlertCircle className="h-4 w-4 text-amber-600" />;
      case "unavailable": return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Eye className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "high": return "text-red-600 bg-red-100";
      case "moderate": return "text-amber-600 bg-amber-100";
      case "low": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Medical Hub Header */}
      <div className="bg-blue-700 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/role-selection">
                <Button variant="ghost" size="sm" className="text-white hover:bg-blue-800">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Roles
                </Button>
              </Link>
              <img 
                src={logoPath} 
                alt="North Harbour Rugby" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold flex items-center">
                  <Stethoscope className="mr-3" size={28} />
                  Medical Intelligence Hub
                </h1>
                <p className="text-blue-100">Player Health & Performance Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-800">
                <Bell size={16} className="mr-2" />
                Alerts
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-800">
                <Settings size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-gray-100 p-2 rounded-lg border border-gray-200 gap-1">
            <TabsTrigger 
              value="dashboard"
              className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
            >
              <Activity className="mr-2 h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="player-record"
              className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
            >
              <FileText className="mr-2 h-4 w-4" />
              Player Record
            </TabsTrigger>
            <TabsTrigger 
              value="injury-log"
              className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              Injury & Treatment
            </TabsTrigger>
            <TabsTrigger 
              value="rtp-planner"
              className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
            >
              <Target className="mr-2 h-4 w-4" />
              RTP Planner
            </TabsTrigger>
            <TabsTrigger 
              value="communication"
              className="py-3 px-4 rounded-md font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md data-[state=active]:bg-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 border-0"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Communication
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Medical Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Squad Availability Board */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Squad Availability Board
                  </CardTitle>
                  <CardDescription>
                    Click on any player card to view their detailed medical record
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {squadMedicalStatus.map((player) => (
                      <div
                        key={player.id}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${getStatusColor(player.status)}`}
                        onClick={() => {
                          setSelectedPlayer(player.id);
                          setActiveTab("player-record");
                        }}
                      >
                        <div className="text-center space-y-2">
                          <div className="w-10 h-10 mx-auto bg-gray-300 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium text-xs">{player.name}</div>
                            <div className="text-xs text-gray-600">{player.position}</div>
                          </div>
                          <div className="flex items-center justify-center space-x-1">
                            {getStatusIcon(player.status)}
                            <span className="text-xs font-medium">
                              {player.status === "available" && "Available"}
                              {player.status === "modified" && "Modified"}
                              {player.status === "unavailable" && "Unavailable"}
                            </span>
                          </div>
                          
                          {/* Medical Details */}
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Wellness:</span>
                              <span className={`font-medium ${
                                player.wellnessScore >= 8 ? "text-green-600" :
                                player.wellnessScore >= 6 ? "text-amber-600" : "text-red-600"
                              }`}>
                                {player.wellnessScore.toFixed(1)}/10
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">ACWR:</span>
                              <span className={`font-medium ${
                                player.currentLoad.ratio <= 1.3 && player.currentLoad.ratio >= 0.8 ? "text-green-600" :
                                player.currentLoad.ratio > 1.3 ? "text-red-600" : "text-amber-600"
                              }`}>
                                {player.currentLoad.ratio.toFixed(2)}
                              </span>
                            </div>
                            <div className="text-gray-500 text-xs">
                              Last: {new Date(player.lastAssessment).toLocaleDateString()}
                            </div>
                          </div>

                          {player.rtpPhase && (
                            <div className="text-xs text-amber-700 bg-amber-100 px-2 py-1 rounded">
                              {player.rtpPhase}
                            </div>
                          )}
                          {player.etr && (
                            <div className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded">
                              ETR: {player.etr}
                            </div>
                          )}
                          {player.primaryInjury && (
                            <div className="text-xs text-red-700 bg-red-50 px-2 py-1 rounded">
                              {player.primaryInjury}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* At Risk Players & Milestones */}
              <div className="space-y-6">
                {/* At Risk Players */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-amber-700">
                      <AlertTriangle className="mr-2 h-5 w-5" />
                      At Risk Players
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {atRiskPlayers.map((player, index) => (
                        <div key={index} className={`p-3 rounded-lg border transition-all hover:shadow-md ${
                          player.riskLevel === "high" ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"
                        }`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-sm">{player.name}</div>
                              <div className="text-xs text-gray-600">{player.position}</div>
                            </div>
                            <Badge className={`text-xs ${getRiskLevelColor(player.riskLevel)}`}>
                              {player.riskLevel}
                            </Badge>
                          </div>
                          <div className={`text-xs mt-1 font-medium ${
                            player.riskLevel === "high" ? "text-red-700" : "text-amber-700"
                          }`}>
                            {player.riskFactor}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {player.details}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Milestones */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      Upcoming Milestones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingMilestones.map((milestone, index) => (
                        <div key={index} className={`p-3 rounded-lg border transition-all hover:shadow-md ${
                          milestone.priority === "high" ? "bg-red-50 border-red-200" :
                          milestone.priority === "moderate" ? "bg-amber-50 border-amber-200" :
                          "bg-blue-50 border-blue-200"
                        }`}>
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <div className="font-medium text-sm">{milestone.player}</div>
                                <Badge className={`text-xs ${
                                  milestone.priority === "high" ? "bg-red-100 text-red-800" :
                                  milestone.priority === "moderate" ? "bg-amber-100 text-amber-800" :
                                  "bg-blue-100 text-blue-800"
                                }`}>
                                  {milestone.priority}
                                </Badge>
                              </div>
                              <div className={`text-xs mt-1 ${
                                milestone.priority === "high" ? "text-red-700" :
                                milestone.priority === "moderate" ? "text-amber-700" :
                                "text-blue-600"
                              }`}>
                                {milestone.milestone}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-gray-600">
                                {new Date(milestone.date).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-gray-500 capitalize">
                                {milestone.type}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Squad Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="mx-auto mb-3 text-green-600" size={32} />
                  <div className="text-2xl font-bold text-gray-900">
                    {squadMedicalStatus.filter(p => p.status === "available").length}
                  </div>
                  <div className="text-sm text-gray-600">Available Players</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <AlertCircle className="mx-auto mb-3 text-amber-600" size={32} />
                  <div className="text-2xl font-bold text-gray-900">
                    {squadMedicalStatus.filter(p => p.status === "modified").length}
                  </div>
                  <div className="text-sm text-gray-600">Modified Training</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <XCircle className="mx-auto mb-3 text-red-600" size={32} />
                  <div className="text-2xl font-bold text-gray-900">
                    {squadMedicalStatus.filter(p => p.status === "unavailable").length}
                  </div>
                  <div className="text-sm text-gray-600">Unavailable</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="mx-auto mb-3 text-amber-600" size={32} />
                  <div className="text-2xl font-bold text-gray-900">{atRiskPlayers.length}</div>
                  <div className="text-sm text-gray-600">At Risk Players</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 2: Player Medical Record */}
          <TabsContent value="player-record" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-gray-500">
                  {selectedPlayer ? (
                    <div>
                      <UserCheck size={48} className="mx-auto mb-4 text-blue-600" />
                      <h3 className="text-lg font-semibold mb-2">Player Medical Record</h3>
                      <p>Detailed medical record for {squadMedicalStatus.find(p => p.id === selectedPlayer)?.name} will be displayed here.</p>
                      <p className="text-sm mt-2">This will include injury history, screening results, wellness data, and training loads.</p>
                    </div>
                  ) : (
                    <div>
                      <UserCheck size={48} className="mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-semibold mb-2">Select a Player</h3>
                      <p>Click on a player from the Dashboard to view their detailed medical record.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Injury & Treatment Log */}
          <TabsContent value="injury-log" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="mr-2 h-5 w-5" />
                    Log New Injury
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-500 py-8">
                    <ClipboardList size={48} className="mx-auto mb-4 text-blue-600" />
                    <p>Multi-step injury logging form will be implemented here.</p>
                    <p className="text-sm mt-2">Includes player selection, mechanism, body part, diagnosis, and ETR.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Log Treatment Note
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-500 py-8">
                    <FileText size={48} className="mx-auto mb-4 text-green-600" />
                    <p>S.O.A.P. format treatment logging form will be implemented here.</p>
                    <p className="text-sm mt-2">Subjective, Objective, Assessment, Plan format for treatment notes.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 4: RTP Planner */}
          <TabsContent value="rtp-planner" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Return-to-Play Planner
                </CardTitle>
                <CardDescription>
                  Manage rehabilitation phases and load progression for injured players
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-500 py-8">
                  <Target size={48} className="mx-auto mb-4 text-blue-600" />
                  <p>Phased RTP timeline, load management charts, and criteria checklists will be implemented here.</p>
                  <p className="text-sm mt-2">Includes 5-phase progression with objective criteria for advancement.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 5: Communication Hub */}
          <TabsContent value="communication" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Create Coach Update
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-500 py-8">
                    <MessageSquare size={48} className="mx-auto mb-4 text-blue-600" />
                    <p>Simple form to send player availability updates to coaching staff.</p>
                    <p className="text-sm mt-2">Clear status categories and concise coach notes.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Update Feed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-500 py-8">
                    <Clock size={48} className="mx-auto mb-4 text-green-600" />
                    <p>Chronological log of all communications sent to coaching staff.</p>
                    <p className="text-sm mt-2">Provides audit trail of medical communications.</p>
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