import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";
import { api, type FavoriteRow } from "../lib/api";

const KEY = ["favorites"] as const;

export function useFavorites() {
  const { isSignedIn } = useAuth();
  return useQuery<FavoriteRow[]>({
    queryKey: KEY,
    queryFn: () => api.listFavorites(),
    enabled: !!isSignedIn,
  });
}

export function useFavoriteToolNames(): Set<string> {
  const { data } = useFavorites();
  return new Set((data ?? []).map((f) => f.toolName));
}

export function useToggleFavorite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      toolName,
      isFav,
    }: {
      toolName: string;
      isFav: boolean;
    }) => {
      if (isFav) await api.removeFavorite(toolName);
      else await api.addFavorite(toolName);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}
