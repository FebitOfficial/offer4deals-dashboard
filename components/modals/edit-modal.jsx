import React from "react";
import DownloadJson from "../../app/dashboard/_components/download-json/download-json";
import Modal from "@/components/shared/modal";
import useEditModal from "@/hooks/modals/useEditProductModal";
const EditModal = ({ type, currentProduct, setProducts }) => {
  const { isOpen, onOpen, onClose } = useEditModal();
  return (
    <Modal
      showIcon={true}
      showIconTop={"-12px"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="md:w-[900px] w-screen h-[100vh] md:h-fit overscroll-auto">
        <DownloadJson
          type={type}
          currentProduct={currentProduct}
          setProducts={setProducts}
        />
      </div>
    </Modal>
  );
};

export default EditModal;
