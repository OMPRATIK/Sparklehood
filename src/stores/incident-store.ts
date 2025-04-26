import { create } from "zustand";
import { type Incident, mockIncidents } from "@/incidents";

type IncidentState = {
  allIncidents: Incident[];
  incidents: Incident[];
  setIncidents: (incidents: Incident[]) => void;
  resetIncidents: () => void;
  addIncident: (incident: Incident) => void;
};

export const useIncidentStore = create<IncidentState>((set) => ({
  allIncidents: mockIncidents,
  incidents: mockIncidents,
  setIncidents: (incidents: Incident[]) => set({ incidents }),
  resetIncidents: () =>
    set((state) => ({
      incidents: state.allIncidents,
    })),
  addIncident: (incident: Incident) =>
    set((state) => ({
      allIncidents: [...state.allIncidents, incident],
      incidents: [...state.incidents, incident],
    })),
}));
