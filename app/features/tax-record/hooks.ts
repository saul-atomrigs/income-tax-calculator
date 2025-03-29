import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import type { TaxRecord } from "~/remotes";

export function useSaveTaxRecord() {
  return useMutation({
    mutationKey: ["saveTaxRecord"],
    mutationFn: async (record: Omit<TaxRecord, "recordId">) => {
      const response = await axios.post("/api/save-tax-record", record);
      return response.data;
    },
  });
}

export function useGetTaxRecords() {
  return useSuspenseQuery({
    queryKey: ["taxRecords"],
    queryFn: async () => {
      const response = await axios.get("/api/tax-records");
      return response.data;
    },
  });
}
