import React from 'react';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationUrl: string | null;
  applicationEmail: string | null;
}

export function ApplyModal({ isOpen, onClose, applicationUrl, applicationEmail }: ApplyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">¿Cómo aplicar?</h2>
        <div className="mb-4">
          <p className="mb-2">
            <strong>URL de aplicación:</strong> {applicationUrl || "No provisto"}
          </p>
          <p>
            <strong>Email de aplicación:</strong> {applicationEmail || "No provisto"}
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}