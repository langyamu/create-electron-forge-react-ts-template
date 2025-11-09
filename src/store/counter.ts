import { create } from 'zustand';
import { useImmer } from 'use-immer';

type CounterState = {
  count: number;
  inc: () => void;
  dec: () => void;
  reset: () => void;
};

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
  dec: () => set((s) => ({ count: s.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// Example local state with use-immer
export function useLocalUser() {
  return useImmer({ name: 'Alice', age: 18 });
}
