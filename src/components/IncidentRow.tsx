import { format } from "date-fns";
import { TableCell, TableRow } from "@/components/ui/table";

import { type Incident } from "@/incidents";
import { cn } from "@/lib/utils";

export default function IncidentRow({ incident }: { incident: Incident }) {
  return (
    <TableRow className="cursor-pointer">
      <TableCell className="font-medium">{incident.id}.</TableCell>
      <TableCell className="font-medium">{incident.title}</TableCell>
      <TableCell className="flex items-center gap-1">
        <div
          className={cn(
            "size-2 rounded-full",
            incident.severity === "High"
              ? "bg-red-400"
              : incident.severity === "Medium"
              ? "bg-yellow-400"
              : "bg-green-400"
          )}
        />
        <span className="text-xs">{incident.severity}</span>
      </TableCell>
      <TableCell>
        {format(new Date(incident.reported_at), "MMM dd, yyyy")}
      </TableCell>
    </TableRow>
  );
}
