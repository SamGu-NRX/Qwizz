"use client";
import { useState } from 'react';
import Overlay from './Overlay';

const ClientOverlay = () => {
  const [showOverlay, setShowOverlay] = useState(true);

  const handleOverlayClose = () => {
    setShowOverlay(false);
  };

  const handleOverlaySave = (selectedLanguages: string[]) => {
    console.log('Selected languages:', selectedLanguages);
    setShowOverlay(false);
  };

  if (!showOverlay) return null;

  return <Overlay onClose={handleOverlayClose} onSave={handleOverlaySave} />;
};

export default ClientOverlay;