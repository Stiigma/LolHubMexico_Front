// src/components/LogModal.tsx

import React, { useEffect, useRef } from 'react';
import type { GeminiAnalysis } from '../types/gemini-analysis';
import type { Team } from '@/feactures/teams/types/Team'; // Adjust path
import Log from './Log';// Adjust path to your Log component

interface LogModalProps {
  isOpen: boolean;
  onClose: () => void;
  geminiAnalysis: GeminiAnalysis | null;
  team1?: Team | null;
  team2?: Team | null;
  puuidToSummonerNameMap?: { [key: string]: string };
}

const LogModal: React.FC<LogModalProps> = ({
  isOpen,
  onClose,
  geminiAnalysis,
  team1,
  team2,
  puuidToSummonerNameMap,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 overflow-y-auto">
      <div
        ref={modalRef}
        className="relative bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
        >
          &times;
        </button>

        <div className="p-6">
          <Log
            geminiAnalysis={geminiAnalysis}
            team1={team1}
            team2={team2}
            puuidToSummonerNameMap={puuidToSummonerNameMap}
          />
        </div>
      </div>
    </div>
  );
};

export default LogModal;