"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { type Incident } from "@/incidents";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useIncidentStore } from "@/stores/incident-store";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Process the incident data to group by date and severity
const processIncidentData = (incidents: Incident[]) => {
  const dateMap: Record<string, { low: number; medium: number; high: number }> =
    {};

  incidents.forEach((incident) => {
    const date = new Date(incident.reported_at).toISOString().split("T")[0];
    if (!dateMap[date]) {
      dateMap[date] = { low: 0, medium: 0, high: 0 };
    }

    switch (incident.severity.toLowerCase()) {
      case "low":
        dateMap[date].low += 1;
        break;
      case "medium":
        dateMap[date].medium += 1;
        break;
      case "high":
        dateMap[date].high += 1;
        break;
    }
  });

  return Object.entries(dateMap).map(([date, counts]) => ({
    date,
    ...counts,
  }));
};

const chartConfig = {
  incidents: {
    label: "AI Incidents",
  },
  low: {
    label: "Low",
    color: "oklch(0.606 0.25 292.717)",
  },
  medium: {
    label: "Medium",
    color: "oklch(0.606 0.25 292.717)",
  },
  high: {
    label: "High",
    color: "oklch(0.606 0.25 292.717)",
  },
} satisfies ChartConfig;

export function IncidentGraph() {
  const { allIncidents } = useIncidentStore();
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("medium");

  const chartData = processIncidentData(allIncidents).sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });

  const totals = React.useMemo(
    () => ({
      low: chartData.reduce((sum, day) => sum + day.low, 0),
      medium: chartData.reduce((sum, day) => sum + day.medium, 0),
      high: chartData.reduce((sum, day) => sum + day.high, 0),
    }),
    [chartData]
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-4 py-2 sm:px-6 sm:py-4">
          <CardTitle className="flex items-center gap-1">
            AI Incident Severity Trends <TrendingUp className="size-4" />
          </CardTitle>
          <CardDescription>
            Reported incidents categorized by severity level
          </CardDescription>
        </div>
        <div className="flex">
          {(["low", "medium", "high"] as const).map((severity) => (
            <button
              key={severity}
              data-active={activeChart === severity}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveChart(severity)}
            >
              <div className="flex items-center gap-1">
                <div
                  className={cn(
                    "size-2 rounded-full",
                    severity === "high"
                      ? "bg-red-400"
                      : severity === "medium"
                      ? "bg-yellow-400"
                      : "bg-green-400"
                  )}
                />
                <span className="text-xs text-muted-foreground">
                  {chartConfig[severity].label}
                </span>
              </div>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {totals[severity].toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[150px] sm:h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="incidents"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar
              dataKey={activeChart}
              fill={`var(--color-${activeChart})`}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
