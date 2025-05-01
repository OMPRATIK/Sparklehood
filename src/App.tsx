import { Heart } from "lucide-react";
import AddIncident from "./components/AddIncident";
import Incidents from "./components/Incidents";
import InputAndFilter from "./components/InputAndFilter";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/sonner";
import { useIncidentStore } from "./stores/incident-store";

import { IncidentGraph } from "./components/IncidentGraph";

function App() {
  const { incidents } = useIncidentStore();
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-[999] bg-background ">
        <Navbar />
      </header>
      <main className="flex-grow mt-20 mb-20">
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-3xl sm:text-5xl font-semibold text-primary">
            Humanchain
          </h1>
          <p className="mb-4 text-muted-foreground text-sm">
            Track and report AI safety issues. Flag unexpected behaviors,
            biases, or risks in AI systems you use. Your reports help build
            safer AI for everyone.
          </p>
          <div className="mb-12 sm:mb-18">
            <IncidentGraph />
          </div>
          {/* <IncidentSeverityChart /> */}
          <div className="mb-4 flex flex-col sm:flex-row justify-between">
            <div className="mb-4">
              <h2 className="text-xl ">All incidents ({incidents.length})</h2>
              <p className="text-muted-foreground">
                All the incidents based on search and filters.
              </p>
            </div>
            <AddIncident />
          </div>
          <div className="mb-8">
            <InputAndFilter />
          </div>
          <Incidents />
        </div>
      </main>
      <footer className="flex items-center justify-center p-4">
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          Made with <Heart className="size-4 text-primary" /> by{" "}
          <a
            href="https://ompratik.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline hover:text-blue-600 transition-colors"
          >
            Pratik
          </a>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}

export default App;
