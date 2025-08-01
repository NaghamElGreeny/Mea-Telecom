import { loyaltyService } from "@/services/ClientApiHandler";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface Transaction {
  id: number;
  title: string;
  status: "come_in" | "come_out";
  image: string;
  points: number;
  created_at: string;
}


interface LoyaltyState {
  id: number | null;
  points: number;
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
   usePoints: boolean;
  setUsePoints: (value: boolean) => void;
  fetchLoyality: () => Promise<void>;
}

export const useLoyalityStore = create<LoyaltyState>()(
  persist(
    (set) => ({
      id: null,
      points: 0,
      transactions: [],
      loading: false,
      error: null,
 usePoints: false,
  setUsePoints: (value) => set({ usePoints: value }),
      fetchLoyality: async () => {
  try {
    set({ loading: true, error: null });

    const res = await loyaltyService.getLoyality() as { status: string; data?: LoyaltyState };

    if (res.status !== "success" || !res.data) {
      throw new Error("Failed to fetch loyalty");
    }

    console.log("loyalty data:", res.data);

    const data = res.data;

    set({
      id: data.id,
      points: data.points,
      transactions: data.transactions,
      loading: false,
    });
  } catch (error) {
    console.error("loyalty error:", error);
    set({
      error: error.message || "Unknown error",
      loading: false,
    });
  }
}
,
    }),
    {
      name: "points-storage", 
    }
  )
);
