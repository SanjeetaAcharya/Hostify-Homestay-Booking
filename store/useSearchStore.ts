import { create } from 'zustand'

interface SearchState {
  location: string
  checkIn: string
  checkOut: string
  guests: number
  setLocation: (location: string) => void
  setCheckIn: (date: string) => void
  setCheckOut: (date: string) => void
  setGuests: (guests: number) => void
}

export const useSearchStore = create<SearchState>((set) => ({
  location: '',
  checkIn: '',
  checkOut: '',
  guests: 1,
  setLocation: (location) => set({ location }),
  setCheckIn: (checkIn) => set({ checkIn }),
  setCheckOut: (checkOut) => set({ checkOut }),
  setGuests: (guests) => set({ guests }),
}))