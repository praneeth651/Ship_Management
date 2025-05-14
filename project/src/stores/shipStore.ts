import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Ship } from '../types';
import { mockShips } from '../data/mockData';
import { v4 as uuidv4 } from 'uuid';

interface ShipStore {
  ships: Ship[];
  addShip: (shipData: Omit<Ship, 'id'>) => void;
  updateShip: (id: string, updates: Partial<Ship>) => void;
  deleteShip: (id: string) => void;
  setShips: (ships: Ship[]) => void;
}

// Get ships from localStorage or use mockShips as initial data
const getInitialShips = (): Ship[] => {
  const storedShips = localStorage.getItem('ships');
  return storedShips ? JSON.parse(storedShips) : mockShips;
};

export const useShipStore = create<ShipStore>()(
  persist(
    (set) => ({
      ships: getInitialShips(),
      addShip: (shipData) => {
        const newShip: Ship = {
          ...shipData,
          id: uuidv4(),
        };
        set((state) => ({ ships: [newShip, ...state.ships] }));
      },
      updateShip: (id, updates) => set((state) => ({
        ships: state.ships.map((ship) =>
          ship.id === id ? { ...ship, ...updates } : ship
        ),
      })),
      deleteShip: (id) => set((state) => ({
        ships: state.ships.filter((ship) => ship.id !== id),
      })),
      setShips: (ships) => set({ ships }),
    }),
    {
      name: 'ship-storage', // unique name for localStorage
    }
  )
);