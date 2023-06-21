import React, { createContext, useState } from 'react';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modalStates, setModalStates] = useState({});

  const handleOpenModal = (modalName) => {
    setModalStates((prevState) => ({
      ...prevState,
      [modalName]: true
    }));
  };

  const handleCloseModal = (modalName) => {
    setModalStates((prevState) => ({
      ...prevState,
      [modalName]: false
    }));
  };

  const isModalOpen = (modalName) => {
    return modalStates[modalName] || false;
  };

  const modalContextValue = {
    handleOpenModal,
    handleCloseModal,
    isModalOpen
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  );
};


export { ModalContext, ModalProvider };