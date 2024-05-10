import { create } from "zustand";

interface EditModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setIsOpen: () => void;
}

const useEditModal = create<EditModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useEditModal;
