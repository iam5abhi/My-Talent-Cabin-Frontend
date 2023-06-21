import React, { useContext } from 'react';
import Modal from './modal/Modal';
import { ModalContext } from './modal/ModalContext';

const CustomModal = ({ modalType, modalTitle, modalName, children }) => {
    const { isModalOpen, handleOpenModal, handleCloseModal } = useContext(ModalContext);
    const modalOpen = isModalOpen(modalName);
  
    const handleOpenCustomModal = () => {
      // Additional logic specific to the custom modal
      // ...
      handleOpenModal(modalName);
    };
  
    return (
      <div>
        <button onClick={handleOpenCustomModal}>Open {modalType} Modal</button>
        <Modal isOpen={modalOpen} onClose={() => handleCloseModal(modalName)}>
          <h2 className="text-xl text-center font-semibold">{modalTitle}</h2>
          {children}
        </Modal>
      </div>
    );
  };

export default CustomModal;
