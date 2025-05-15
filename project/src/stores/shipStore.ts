import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Ship } from '../types';
import { mockShips } from '../data/mockData';
import { v4 as uuidv4 } from 'uuid';
import { useNotificationStore } from './notificationStore';

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
    (set, get) => ({
      ships: getInitialShips(),
      addShip: (shipData) => {
        const newShip: Ship = {
          ...shipData,
          id: uuidv4(),
        };
        set((state) => ({ ships: [newShip, ...state.ships] }));

        // Create notification for new ship
        useNotificationStore.getState().addNotification({
          title: 'New Ship Added',
          message: `${shipData.name} has been added to the fleet`,
          type: 'info',
          relatedId: newShip.id
        });
      },
      updateShip: (id, updates) => {
        const currentShip = get().ships.find(ship => ship.id === id);
        set((state) => ({
          ships: state.ships.map((ship) =>
            ship.id === id ? { ...ship, ...updates } : ship
          ),
        }));

        // Create notification for ship update
        if (currentShip) {
          useNotificationStore.getState().addNotification({
            title: 'Ship Updated',
            message: `${currentShip.name} information has been updated`,
            type: 'info',
            relatedId: id
          });
        }
      },
      deleteShip: (id) => {
        const shipToDelete = get().ships.find(ship => ship.id === id);
        set((state) => ({
          ships: state.ships.filter((ship) => ship.id !== id),
        }));

        // Create notification for ship deletion
        if (shipToDelete) {
          useNotificationStore.getState().addNotification({
            title: 'Ship Removed',
            message: `${shipToDelete.name} has been removed from the fleet`,
            type: 'urgent',
            relatedId: id
          });
        }
      },
      setShips: (ships) => set({ ships }),
    }),
    {
      name: 'ship-storage', // unique name for localStorage
    }
  )
);