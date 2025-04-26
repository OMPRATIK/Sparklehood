"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockIncidents } from "@/incidents"; // Import your incidents data

const chartConfig = {
  total: {
    label: "Total Incidents",
  },
  High: {
    label: "High Severity",
    color: "hsl(var(--chart-1))",
  },
  Medium: {
    label: "Medium Severity",
    color: "hsl(var(--chart-2))",
  },
  Low: {
    label: "Low Severity",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

// Process incident data into monthly format
function processIncidentData(
  incidents: typeof mockIncidents,
  timeRange: string
) {
  const monthlyData: Record<
    string,
    { High: number; Medium: number; Low: number; date: string }
  > = {};

  // Calculate date ranges based on timeRange
  const endDate = new Date();
  const startDate = new Date();

  if (timeRange === "7d") {
    startDate.setDate(startDate.getDate() - 7);
  } else if (timeRange === "30d") {
    startDate.setDate(startDate.getDate() - 30);
  } else {
    // "90d" or default
    startDate.setDate(startDate.getDate() - 90);
  }

  // Initialize monthly buckets
  const current = new Date(startDate);
  while (current <= endDate) {
    const monthYear = `${current.getFullYear()}-${String(
      current.getMonth() + 1
    ).padStart(2, "0")}`;
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { High: 0, Medium: 0, Low: 0, date: monthYear };
    }
    current.setMonth(current.getMonth() + 1);
  }

  // Count incidents by severity per month
  incidents.forEach((incident) => {
    const incidentDate = new Date(incident.reported_at);
    if (incidentDate >= startDate && incidentDate <= endDate) {
      const monthYear = `${incidentDate.getFullYear()}-${String(
        incidentDate.getMonth() + 1
      ).padStart(2, "0")}`;
      if (monthlyData[monthYear]) {
        monthlyData[monthYear][incident.severity]++;
      }
    }
  });

  // Convert to array and sort chronologically
  return Object.values(monthlyData).sort((a, b) =>
    a.date.localeCompare(b.date)
  );
}

export function IncidentSeverityChart() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const chartData = processIncidentData(mockIncidents, timeRange);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>AI Safety Incidents by Severity</CardTitle>
          <CardDescription>
            Trend of reported incidents categorized by severity level
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillHigh" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMedium" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-2))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-2))"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillLow" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-3))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-3))"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const [year, month] = value.split("-");
                return new Date(
                  parseInt(year),
                  parseInt(month) - 1
                ).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                });
              }}
            />
            <YAxis tickLine={false} axisLine={false} width={30} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const [year, month] = value.split("-");
                    return new Date(
                      parseInt(year),
                      parseInt(month) - 1
                    ).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="High"
              type="natural"
              fill="url(#fillHigh)"
              stroke="hsl(var(--chart-1))"
              stackId="1"
            />
            <Area
              dataKey="Medium"
              type="natural"
              fill="url(#fillMedium)"
              stroke="hsl(var(--chart-2))"
              stackId="1"
            />
            <Area
              dataKey="Low"
              type="natural"
              fill="url(#fillLow)"
              stroke="hsl(var(--chart-3))"
              stackId="1"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
