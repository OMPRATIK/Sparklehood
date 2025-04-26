import { create } from "zustand";
import { type Incident, mockIncidents } from "@/incidents";

type IncidentState = {
  incidents: Incident[];
  setIncidents: (incidents: Incident[]) => void;
  addIncident: (incident: Incident) => void;
};

export const useIncidentStore = create<IncidentState>((set) => ({
  incidents: mockIncidents,
  setIncidents: (incidents: Incident[]) => set({ incidents }),
  addIncident: (incident: Incident) =>
    set((state) => ({ incidents: [...state.incidents, incident] })),
}));
