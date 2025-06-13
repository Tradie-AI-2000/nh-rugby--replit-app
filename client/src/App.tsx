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
import AnalyticsOverview from "@/pages/analytics-overview";
import PerformanceAnalytics from "@/pages/performance-analytics";
import FitnessAnalytics from "@/pages/fitness-analytics";
import DataManagement from "@/pages/data-management";
import DataIntegration from "@/pages/data-integration";
import CSVUpload from "@/pages/csv-upload";
import MainDashboard from "@/pages/main-dashboard";
import TeamDashboard from "@/pages/team-dashboard";
import GPSManagement from "@/pages/gps-management";
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
      <Route path="/team-dashboard" component={TeamDashboard} />
      <Route path="/team" component={TeamDashboard} />
      <Route path="/team-cohesion" component={TeamCohesionDashboard} />
      <Route path="/analytics" component={AnalyticsOverview} />
      <Route path="/performance-analytics" component={PerformanceAnalytics} />
      <Route path="/fitness-analytics" component={FitnessAnalytics} />
      <Route path="/gps-management" component={GPSManagement} />
      <Route path="/experimental/player/:playerId" component={ExperimentalPlayerProfile} />
      <Route path="/moneyball" component={MoneyBallPlayers} />
      <Route path="/dashboard" component={MainDashboard} />
      <Route path="/" component={PlayersOverview} />
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
