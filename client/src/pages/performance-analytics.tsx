import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Trophy, Target, TrendingUp } from "lucide-react";
import nhLogo from "@assets/menulogo_wo.png";

export default function PerformanceAnalytics() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-nh-red text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/analytics">
              <Button variant="ghost" className="text-white hover:bg-nh-red-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Analytics
              </Button>
            </Link>
            <img src={nhLogo} alt="North Harbour Rugby" className="h-12 w-12" />
            <div>
              <h1 className="text-3xl font-bold">Match Performance Analytics</h1>
              <p className="text-nh-red-200">Comprehensive match statistics and performance trends</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Win Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600">67%</div>
              <p className="text-sm text-gray-600">8 wins, 3 losses, 1 draw</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Points For
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">385</div>
              <p className="text-sm text-gray-600">32.1 average per match</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Point Differential
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600">+87</div>
              <p className="text-sm text-gray-600">Points For - Points Against</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Performance Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Full performance analytics dashboard will be implemented here with detailed match statistics,
              performance trends, player contributions, and tactical analysis.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}