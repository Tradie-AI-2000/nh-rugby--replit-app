import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "./lib/queryClient";
import PlayerDashboard from "@/pages/player-dashboard";
import VideoDemo from "@/pages/video-demo";
import FeaturesDemo from "@/pages/features-demo";
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
      <Route path="/player-dashboard" component={PlayerDashboard} />
      <Route path="/team-dashboard" component={TeamDashboard} />
      <Route path="/gps-management" component={GPSManagement} />
      <Route path="/player/:playerId" component={PlayerDashboard} />
      <Route path="/" component={MainDashboard} />
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
