import { ArrowUpDown, ListFilterPlus, Search } from "lucide-react";
import { Input } from "./ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { type Severity } from "@/incidents";
import { useIncidentStore } from "@/stores/incident-store";

export default function InputAndFilter() {
  const [severity, setSeverity] = useState<"All" | Severity>("All");
  const [sort, setSort] = useState<"Newest" | "Oldest">("Newest");
  const [search, setSearch] = useState("");

  const { incidents, setIncidents } = useIncidentStore();

  useEffect(() => {
    let filteredIncidents =
      severity === "All"
        ? incidents
        : incidents.filter((incident) => incident.severity === severity);

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

    console.log(filteredIncidents);
    setIncidents(filteredIncidents);
  }, [incidents, setIncidents, severity, sort, search]);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <div className="relative flex-grow">
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 size-5" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search incidents"
          className="px-10"
        />
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {" "}
              <ListFilterPlus className="mr-1" /> Severity
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setSeverity("All")}>
              <div className="size-3 bg-white rounded-full" />
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSeverity("Low")}>
              {" "}
              <div className="size-3 bg-green-400 rounded-full" />
              Low
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSeverity("Medium")}>
              <div className="size-3 bg-yellow-400 rounded-full" />
              Medium
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSeverity("High")}>
              <div className="size-3 bg-red-400 rounded-full" />
              High
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {" "}
              <ArrowUpDown className="mr-1" /> Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setSort("Newest")}>
              Newest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSort("Oldest")}>
              Oldest
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
