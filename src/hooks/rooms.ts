import { useQuery } from "@tanstack/react-query";
import { fetchRooms } from "@/services/rooms";
import { QUERY_KEY } from "@/constants/react-query";

export const useRooms = () =>
  useQuery({
    queryKey: [QUERY_KEY.ROOMS],
    queryFn: fetchRooms,
    staleTime: 10_000,
  });
