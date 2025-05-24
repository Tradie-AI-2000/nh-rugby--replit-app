import { Brain, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAIAnalysis } from "@/hooks/use-ai-analysis";
import type { Player } from "@shared/schema";

interface AISummaryProps {
  playerId: string;
  player?: Player;
}

export default function AISummary({ playerId, player }: AISummaryProps) {
  const { data: aiAnalysis, isLoading, error } = useAIAnalysis(playerId, player);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Brain className="text-nh-blue mr-2 h-5 w-5" />
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (error || !aiAnalysis) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-nh-navy flex items-center">
            <Brain className="text-nh-blue mr-2 h-5 w-5" />
            AI Performance Summary
          </h3>
          <Badge variant="outline" className="text-purple-700 border-purple-200">
            <Sparkles className="h-3 w-3 mr-1" />
            Powered by Gemini AI
          </Badge>
        </div>
        <div className="text-center py-8">
          <p className="text-slate-500">AI analysis unavailable. {error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-nh-navy flex items-center">
          <Brain className="text-nh-blue mr-2 h-5 w-5" />
          AI Performance Summary
        </h3>
        <Badge variant="outline" className="text-purple-700 border-purple-200">
          <Sparkles className="h-3 w-3 mr-1" />
          Powered by Gemini AI
        </Badge>
      </div>
      
      <div className="prose prose-slate max-w-none">
        <p className="text-slate-700 leading-relaxed mb-4">
          {aiAnalysis.summary}
        </p>
        
        {aiAnalysis.strengths.length > 0 && (
          <div className="mb-4">
            <strong className="text-nh-blue">Key Strengths:</strong>{" "}
            {aiAnalysis.strengths.join(", ")}
          </div>
        )}
        
        {aiAnalysis.developmentAreas.length > 0 && (
          <div>
            <strong className="text-amber-600">Development Areas:</strong>{" "}
            {aiAnalysis.developmentAreas.join(", ")}
          </div>
        )}
      </div>
      
      {aiAnalysis.confidenceScore && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Analysis Confidence</span>
            <span className="font-medium">{Math.round(aiAnalysis.confidenceScore * 100)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
