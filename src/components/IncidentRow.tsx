import { format } from "date-fns";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { type Incident } from "@/incidents";
import { cn } from "@/lib/utils";
import { Description } from "@radix-ui/react-dialog";

export default function IncidentRow({
  incident,
  index,
}: {
  incident: Incident;
  index: number;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow className="cursor-pointer">
          <TableCell className="font-medium">{index + 1}.</TableCell>
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
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <DialogTitle>
              <div className="text-lg sm:text-xl text-primary font-semibold">
                {incident.title}
              </div>
            </DialogTitle>
            <div className="flex items-center gap-1">
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
            </div>
          </div>
          <div className="mb-4 flex justify-between items-center">
            <div> {format(new Date(incident.reported_at), "MMM dd, yyyy")}</div>
            <div className="flex items-center gap-1"></div>
          </div>
          <p>Description</p>
          <Description className="text-muted-foreground">
            {incident.description}
          </Description>
        </div>
      </DialogContent>
    </Dialog>
  );
}
