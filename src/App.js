import React from 'react';
import Main from './main'
import { ModalProvider } from './TestHandler/modal/ModalContext';

function App() {
  return (
        <ModalProvider>
          <Main />
        </ModalProvider>
  );
}

export default App;
