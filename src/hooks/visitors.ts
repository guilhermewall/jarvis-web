import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  checkoutVisitor,
  createVisitor,
  fetchActiveVisitors,
} from "@/services/visitors";
import { QUERY_KEY } from "@/constants/react-query";

export const useActiveVisitors = (p: { roomId?: string; search?: string }) =>
  useQuery({
    queryKey: [QUERY_KEY.VISITORS, "active", p],
    queryFn: () => fetchActiveVisitors(p),
    placeholderData: keepPreviousData,
  });

export const useCreateVisitor = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createVisitor,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.VISITORS, "active"] });
      qc.invalidateQueries({ queryKey: [QUERY_KEY.ROOMS] });
    },
  });
};

export const useCheckoutVisitor = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => checkoutVisitor(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.VISITORS, "active"] });
      qc.invalidateQueries({ queryKey: [QUERY_KEY.ROOMS] });
    },
  });
};
