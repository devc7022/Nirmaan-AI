'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HardHat } from 'lucide-react';
import { ContractorQueryForm } from '../contractor/ContractorQueryForm';

interface ContractorQueryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContractorQueryModal: React.FC<ContractorQueryModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/90 sticky top-0 z-10 backdrop-blur-md">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
                <HardHat className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2 font-sans">
                  Contractor Support & Requirement Form
                </h3>
                <p className="text-xs text-zinc-400">
                  Request skilled manpower, materials, or equipment support from BumbleBrick AI
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              aria-label="Close form"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
            <ContractorQueryForm onSuccess={() => {}} />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
