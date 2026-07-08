import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PropertyState {
  likedProperties: number[]
  toggleLike: (id: number) => void
  isLiked: (id: number) => boolean
}

export const usePropertyStore = create<PropertyState>()(
  persist(
    (set, get) => ({
      likedProperties: [],
      toggleLike: (id) =>
        set((state) => ({
          likedProperties: state.likedProperties.includes(id)
            ? state.likedProperties.filter((pId) => pId !== id)
            : [...state.likedProperties, id],
        })),
      isLiked: (id) => get().likedProperties.includes(id),
    }),
    {
      name: 'liked-properties',
    }
  )
)