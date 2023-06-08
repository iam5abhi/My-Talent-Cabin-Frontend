import React from 'react';
import Main from './main'
import { UserProvider } from './TestHandler/Context';

function App() {
  return (
        <UserProvider>
          <Main />
        </UserProvider>
  );
}

export default App;
