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

const ITEMS_PER_PAGE = 15;
export default function Incidents() {
  const { incidents } = useIncidentStore();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(incidents.length / ITEMS_PER_PAGE);

  // Get current incidents
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
    <div className="flex flex-col gap-4 items-end">
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
          {currentIncidents.map((incident) => (
            <IncidentRow key={incident.id} incident={incident} />
          ))}
        </TableBody>
      </Table>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <button disabled={currentPage === 1}>
                <PaginationPrevious onClick={handlePrevious} />
              </button>
            </PaginationItem>

            <PaginationItem>
              <button disabled={currentPage === totalPages}>
                <PaginationNext onClick={handleNext} />
              </button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
