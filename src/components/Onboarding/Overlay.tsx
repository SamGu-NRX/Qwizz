"use client";
import { useState, useEffect } from 'react';
import styles from './Overlay.module.css';

interface OverlayProps {
  onClose: () => void;
  onSave: (selectedLanguages: string[]) => void;
}

const Overlay: React.FC<OverlayProps> = ({ onClose, onSave }) => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((lang) => lang !== language)
        : [...prev, language]
    );
  };

  const handleSave = () => {
    localStorage.setItem('knownLanguages', JSON.stringify(selectedLanguages));
    onSave(selectedLanguages);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <h2>Which of the following languages do you know?</h2>
        <div className={styles.options}>
          {['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#'].map((lang) => (
            <button
              key={lang}
              onClick={() => toggleLanguage(lang)}
              className={`${styles.optionButton} ${selectedLanguages.includes(lang) ? styles.selected : ''}`}
            >
              {lang}
            </button>
          ))}
        </div>
        <button className={styles.continueButton} onClick={handleSave}>Continue</button>
      </div>
    </div>
  );
};

export default Overlay;
