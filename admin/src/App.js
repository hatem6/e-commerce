import React, { useState } from 'react';
/* eslint-disable */
import { Home } from './pages';
import LoginModal from './components/LoginModal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div> 
      <Home />
      {isModalOpen && <LoginModal onClose={closeModal} />}
    </div>
  );
};

export default App;
