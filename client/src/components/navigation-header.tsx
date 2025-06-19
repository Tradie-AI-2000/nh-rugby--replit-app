import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { ArrowLeft, Home } from "lucide-react";
import logoPath from "@assets/menulogo_wo.png";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface NavigationHeaderProps {
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  badges?: Array<{
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
    className?: string;
  }>;
  showBackButton?: boolean;
  backUrl?: string;
  backLabel?: string;
}

export default function NavigationHeader({
  title,
  description,
  breadcrumbs,
  badges = [],
  showBackButton = true,
  backUrl = "/",
  backLabel = "Back to Portal"
}: NavigationHeaderProps) {
  return (
    <div className="bg-nh-red text-white shadow-lg">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Link href={backUrl}>
                <Button variant="ghost" size="sm" className="text-white hover:bg-nh-red-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {backLabel}
                </Button>
              </Link>
            )}
            <img src={logoPath} alt="North Harbour Rugby" className="h-12 w-auto" />
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              {description && (
                <p className="text-nh-red-200 mt-1">{description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {badges.map((badge, index) => (
              <Badge 
                key={index} 
                variant={badge.variant || "secondary"}
                className={`${badge.className || "bg-white text-nh-red"}`}
              >
                {badge.text}
              </Badge>
            ))}
            <Link href="/">
              <Button variant="outline" size="sm" className="text-nh-red bg-white hover:bg-gray-100">
                <Home className="w-4 h-4 mr-2" />
                Portal
              </Button>
            </Link>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="bg-nh-red-600 rounded-lg p-3">
          <Breadcrumb>
            <BreadcrumbList className="text-white">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                  <BreadcrumbItem>
                    {crumb.href ? (
                      <BreadcrumbLink asChild>
                        <Link href={crumb.href} className="text-nh-red-200 hover:text-white transition-colors">
                          {crumb.label}
                        </Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="text-white font-medium">
                        {crumb.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator className="text-nh-red-300" />
                  )}
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
}