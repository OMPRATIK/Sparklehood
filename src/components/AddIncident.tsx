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
import { Alert, AlertDescription } from "./ui/alert";
import { toast } from "sonner";

const initData: Omit<Incident, "id" | "reported_at"> = {
  title: "",
  description: "",
  severity: "Medium",
};

export default function AddIncident() {
  const [formData, setFormData] = useState(initData);
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { addIncident } = useIncidentStore();

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      setSubmitError("Please fill in all required fields");
      return;
    }

    addIncident({
      ...formData,
      id: Date.now(),
      reported_at: new Date().toISOString(),
    });
    setFormData(initData);
    toast.success("Incident added successfully", {
      description: "The incident has been added to the list.",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSeverityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, severity: value as Severity }));
  };

  return (
    <Card className="py-4 sm:py-6">
      <CardHeader>
        <CardTitle>Report new incidents</CardTitle>
        <CardDescription>Add real incident on AI</CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <form onSubmit={handleSubmit} id="incident-form" className="space-y-4">
          {submitError && (
            <Alert variant="destructive">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-4">
            <div className="flex flex-col space-y-2 flex-grow">
              <Label className="flex gap-0" htmlFor="title">
                Title <span className="text-primary">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <Label className="flex gap-0" htmlFor="severity">
                Severity
                <span className="text-primary">*</span>
              </Label>
              <Select
                value={formData.severity}
                onValueChange={handleSeverityChange}
              >
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

          <div className="flex flex-col space-y-2">
            <Label className="flex gap-0" htmlFor="description">
              Description<span className="text-primary">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit" form="incident-form">
          <Plus /> Report new incident
        </Button>
      </CardFooter>
    </Card>
  );
}
