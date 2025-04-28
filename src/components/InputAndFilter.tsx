import { ArrowUpDown, ListFilterPlus, Search } from "lucide-react";
import { Input } from "./ui/input";

import { type Severity } from "@/incidents";
import { useIncidentStore } from "@/stores/incident-store";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { useEffect, useState } from "react";

export default function InputAndFilter() {
  const [severity, setSeverity] = useState<"All" | Severity>("All");
  const [sort, setSort] = useState<"Newest" | "Oldest">("Newest");
  const [search, setSearch] = useState("");

  const { allIncidents, setIncidents } = useIncidentStore();

  useEffect(() => {
    let filteredIncidents =
      severity === "All"
        ? allIncidents
        : allIncidents.filter((incident) => incident.severity === severity);

    if (search) {
      filteredIncidents = filteredIncidents.filter((incident) =>
        incident.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    filteredIncidents.sort((a, b) => {
      const dateA = new Date(a.reported_at).getTime();
      const dateB = new Date(b.reported_at).getTime();
      return sort === "Newest" ? dateB - dateA : dateA - dateB;
    });

    setIncidents(filteredIncidents);
  }, [allIncidents, severity, sort, search, setIncidents]);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
      <div className="space-y-2 flex-grow">
        <Label htmlFor="search">Search for incidents</Label>
        <div className="relative ">
          <Search className="absolute top-1/2 translate-y-[-50%] left-3 size-5" />
          <Input
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search incidents"
            className="px-10"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="space-y-2">
          <Label htmlFor="severity-filter">
            <ListFilterPlus className="size-4" /> Severity
          </Label>
          <Select
            value={severity}
            onValueChange={(value) => setSeverity(value as Severity | "All")}
          >
            <SelectTrigger id="severity-filter">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="All">
                <div className="size-3 bg-gray-400 rounded-full" />
                All
              </SelectItem>
              <SelectItem value="Low">
                <div className="size-3 bg-green-400 rounded-full" />
                Low
              </SelectItem>
              <SelectItem value="Medium">
                <div className="size-3 bg-yellow-400 rounded-full" />
                Medium
              </SelectItem>
              <SelectItem value="High">
                <div className="size-3 bg-red-400 rounded-full" />
                High
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>
            <ArrowUpDown className="size-4" /> Sort
          </Label>
          <Select
            value={sort}
            onValueChange={(value) => setSort(value as "Newest" | "Oldest")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Newest">Newest</SelectItem>
              <SelectItem value="Oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
