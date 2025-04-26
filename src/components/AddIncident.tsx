import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useState } from "react";
import { type Incident, type Severity } from "@/incidents";
import { useIncidentStore } from "@/stores/incident-store";

export default function AddIncident() {
  const [data, setDat] = useState<Incident | null>(null);
  const { addIncident } = useIncidentStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const title = formData.get("title") as string;
    const severity = formData.get("severity") as Severity;
    const description = formData.get("description") as string;

    if (title && severity && description) {
      addIncident({ title, severity, description } as Incident);
    }
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Add new incidents</CardTitle>
        <CardDescription>Add real incident on AI</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex gap-4">
              <div className="flex flex-col space-y-1.5 flex-grow">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Title" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="severity">Severity</Label>
                <Select>
                  <SelectTrigger id="severity">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Description" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>
          <Plus className="mr-1" /> Add new incident
        </Button>
      </CardFooter>
    </Card>
  );
}
