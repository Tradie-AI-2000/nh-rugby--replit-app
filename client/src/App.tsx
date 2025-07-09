import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "./lib/queryClient";
import PlayerDashboard from "@/pages/player-dashboard";
import ExperimentalPlayerProfile from "@/pages/experimental-player-profile";
import PlayersOverview from "@/pages/players-overview";
import EnhancedPlayerProfile from "@/pages/enhanced-player-profile";
import MoneyBallPlayers from "@/pages/moneyball-players";
import VideoDemo from "@/pages/video-demo";
import FeaturesDemo from "@/pages/features-demo";
import TeamCohesionDashboard from "@/pages/team-cohesion-dashboard";
import TeamCohesionAnalytics from "@/pages/team-cohesion-analytics";
import AnalyticsOverview from "@/pages/analytics-overview";
import PerformanceAnalytics from "@/pages/performance-analytics";
import FitnessAnalytics from "@/pages/fitness-analytics";
import DataManagement from "@/pages/data-management";
import DataIntegration from "@/pages/data-integration";
import CSVUpload from "@/pages/csv-upload";
import MainDashboard from "@/pages/main-dashboard";
import TeamDashboard from "@/pages/team-dashboard";
import GPSManagement from "@/pages/gps-management";
import MatchPerformance from "@/pages/match-performance-fixed";
import MedicalHub from "@/pages/medical-hub";
import DataIntegrityDemo from "@/pages/data-integrity-demo";
import GameDayAnalysis from "@/pages/game-day-analysis";
import DataTemplatesHub from "@/pages/data-templates-hub";
import DataSchemaViewer from "@/pages/data-schema-viewer";
import TryAnalysisWrapper from "@/pages/try-analysis-simplified";
import MatchFixtures from "@/pages/match-fixtures";
import MatchList from "@/pages/match-list";
import SquadBuilder from "@/pages/squad-builder";
import WorkRateReport from "@/pages/work-rate-report";
import DatabaseAdmin from "@/pages/database-admin";
import RoleSelection from "@/pages/role-selection";
import StrengthConditioning from "@/pages/strength-conditioning";
import WebSocketTestPage from "@/pages/websocket-test";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/features" component={FeaturesDemo} />
      <Route path="/data-management" component={DataManagement} />
      <Route path="/data-integration" component={DataIntegration} />
      <Route path="/csv-upload" component={CSVUpload} />
      <Route path="/video-demo" component={VideoDemo} />
      <Route path="/players" component={PlayersOverview} />
      <Route path="/player/:playerId" component={EnhancedPlayerProfile} />
      <Route path="/legacy/player/:playerId" component={PlayerDashboard} />
      {/* Team Routes */}
      <Route path="/team/overview" component={TeamDashboard} />
      <Route path="/team" component={TeamDashboard} />
      <Route path="/team-cohesion" component={TeamCohesionAnalytics} />
      <Route path="/squad-builder" component={SquadBuilder} />
      
      {/* Analytics Routes */}
      <Route path="/analytics/match-list/match-performance/:matchId/try-analysis" component={TryAnalysisWrapper} />
      <Route path="/analytics/match-list/match-performance/:matchId" component={MatchPerformance} />
      <Route path="/analytics/match-list" component={MatchList} />
      <Route path="/analytics" component={AnalyticsOverview} />
      
      {/* Legacy Routes for backwards compatibility */}
      <Route path="/performance-analytics" component={PerformanceAnalytics} />
      <Route path="/fitness-analytics" component={FitnessAnalytics} />
      <Route path="/gps-management" component={GPSManagement} />
      <Route path="/match-fixtures" component={MatchFixtures} />
      <Route path="/match-list" component={MatchList} />
      <Route path="/match-performance" component={MatchPerformance} />
      <Route path="/match-performance/:matchId" component={MatchPerformance} />
      <Route path="/match-performance/:matchId/try-analysis" component={TryAnalysisWrapper} />
      <Route path="/medical" component={MedicalHub} />
      <Route path="/medical-hub" component={MedicalHub} />
      <Route path="/data-integrity" component={DataIntegrityDemo} />
      <Route path="/data-templates" component={DataTemplatesHub} />
      <Route path="/data-schema" component={DataSchemaViewer} />
      <Route path="/try-analysis" component={TryAnalysisWrapper} />
      <Route path="/analytics/work-rate-report" component={WorkRateReport} />
      <Route path="/work-rate-report" component={WorkRateReport} />
      <Route path="/database-admin" component={DatabaseAdmin} />
      <Route path="/game-day/:id" component={GameDayAnalysis} />
      <Route path="/role-selection" component={RoleSelection} />
      <Route path="/experimental/player/:playerId" component={ExperimentalPlayerProfile} />
      <Route path="/moneyball" component={MoneyBallPlayers} />
      <Route path="/dashboard" component={MainDashboard} />
      <Route path="/strength-conditioning" component={StrengthConditioning} />
      <Route path="/websocket-test" component={WebSocketTestPage} />
      <Route path="/" component={RoleSelection} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
