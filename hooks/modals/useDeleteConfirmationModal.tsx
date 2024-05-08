import { create } from "zustand";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setIsOpen: () => void;
}

const useDeleteConfirmationModal = create<DeleteConfirmationModalProps>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  })
);

export default useDeleteConfirmationModal;
