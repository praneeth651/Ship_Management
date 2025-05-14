import { create } from 'zustand';
import { Ship } from '../types';
import { mockShips } from '../data/mockData';

interface ShipStore {
  ships: Ship[];
  addShip: (ship: Ship) => void;
  updateShip: (id: string, updates: Partial<Ship>) => void;
  deleteShip: (id: string) => void;
  setShips: (ships: Ship[]) => void;
}

export const useShipStore = create<ShipStore>((set) => ({
  ships: mockShips,
  addShip: (ship) => set((state) => ({ ships: [ship, ...state.ships] })),
  updateShip: (id, updates) => set((state) => ({
    ships: state.ships.map((ship) =>
      ship.id === id ? { ...ship, ...updates } : ship
    ),
  })),
  deleteShip: (id) => set((state) => ({
    ships: state.ships.filter((ship) => ship.id !== id),
  })),
  setShips: (ships) => set({ ships }),
})); 