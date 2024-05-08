import React from "react";
import Modal from "@/components/shared/modal";
import useDeleteConfirmationModal from "@/hooks/modals/useDeleteConfirmationModal";
import { Button } from "@/components/ui/button";

const DeleteConfirmationModal = ({ handleSubmit }) => {
  const { isOpen, onOpen, onClose } = useDeleteConfirmationModal();
  return (
    <Modal
      showIcon={true}
      showIconTop={"-12px"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="p-[20px] flex gap-4 flex-col">
        <div className="flex gap-2 items-center text-gray-700">
          <p className="text-[16px] font-medium">
            Are you sure you want to delete the product
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button
            onClick={handleSubmit}
            size="xsm"
            variant="destructive"
            className="px-2"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
