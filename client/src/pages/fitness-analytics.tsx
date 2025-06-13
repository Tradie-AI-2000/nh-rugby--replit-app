import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Activity, Heart, Target } from "lucide-react";
import nhLogo from "@assets/menulogo_wo.png";

export default function FitnessAnalytics() {
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
              <h1 className="text-3xl font-bold">Fitness & Conditioning Analytics</h1>
              <p className="text-nh-red-200">Player fitness levels and conditioning metrics</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Average Fitness Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600">89%</div>
              <p className="text-sm text-gray-600">+5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Training Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">94%</div>
              <p className="text-sm text-gray-600">Consistent participation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Recovery Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600">92%</div>
              <p className="text-sm text-gray-600">Optimal recovery metrics</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Fitness Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Complete fitness analytics dashboard with individual player conditioning scores,
              training load management, recovery tracking, and fitness progression analysis.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}