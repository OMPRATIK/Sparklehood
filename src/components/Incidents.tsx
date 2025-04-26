import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import IncidentRow from "./IncidentRow";
import { useIncidentStore } from "@/stores/incident-store";
import { useState } from "react";

const ITEMS_PER_PAGE = 10;
export default function Incidents() {
  const { incidents } = useIncidentStore();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(incidents.length / ITEMS_PER_PAGE);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentIncidents = incidents.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {currentIncidents.length === 0 && (
        <div className="flex items-center justify-center h-20">
          No records found
        </div>
      )}
      {currentIncidents.length > 0 && (
        <Table>
          <TableHeader className="opacity-80">
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Reported At</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentIncidents.map((incident, idx) => (
              <IncidentRow
                key={incident.id}
                incident={incident}
                index={ITEMS_PER_PAGE * (currentPage - 1) + idx}
              />
            ))}
          </TableBody>
        </Table>
      )}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, incidents.length)} of {incidents.length}{" "}
            incidents
          </p>
        </div>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <button
                  disabled={currentPage === 1}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaginationPrevious onClick={handlePrevious} />
                </button>
              </PaginationItem>

              <PaginationItem>
                <button
                  disabled={currentPage === totalPages}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaginationNext onClick={handleNext} />
                </button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
