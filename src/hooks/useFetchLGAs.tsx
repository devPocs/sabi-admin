import { useQuery } from "@tanstack/react-query";
import { vendorApi } from "@services/api";
import { LGA } from "@interface/ILGA";

/**
 * Custom hook to fetch and manage LGAs
 * @returns Query result with LGAs data
 *
 *
 */

export const useLGAs = () => {
  return useQuery({
    queryKey: ["lgas"],
    queryFn: async () => {
      const response = await vendorApi.fetchLGAs();

      if (response && response.data) {
        const formattedLGAs = response.data.data.pageItems.map((lga: LGA) => ({
          name: lga.name || lga,
          value: lga.id || lga,
        }));

        return [{ name: "All LGAs", value: "all-lgas" }, ...formattedLGAs];
      }

      return [{ name: "All LGAs", value: "all-lgas" }];
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: 2,
  });
};

export default useLGAs;
