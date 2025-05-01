import { create } from "zustand";
import { type Incident, mockIncidents } from "@/incidents";

type IncidentState = {
  allIncidents: Incident[];
  incidents: Incident[];

  setIncidents: (incidents: Incident[]) => void;
  resetIncidents: () => void;
  addIncident: (incident: Incident) => void;
  page: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
};

export const useIncidentStore = create<IncidentState>((set) => ({
  allIncidents: mockIncidents,
  incidents: mockIncidents,
  page: 1,

  setPage: (page: number) => set({ page }),
  nextPage: () => {
    set((state) => ({ page: state.page + 1 }));
  },
  previousPage: () => {
    set((state) => ({ page: state.page - 1 }));
  },
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
