import React from 'react';
import { UserAuth } from '../context/AuthContext';

export const handleTooltipShow = (setShowTooltip) => {
  setShowTooltip(true);
};

export const handleTooltipHide = (setShowTooltip) => {
  setTimeout(() => {
    setShowTooltip(false);
  }, 100);
};

export const LoginTooltip = ({ showTooltip }) => {
  const { user } = UserAuth();
  return (
    <div
      id="login-tooltip"
      style={{
        // visibility: (showTooltip && !user) ? 'visible' : 'hidden',
        opacity: (showTooltip && !user) ? 1 : 0,
        // zIndex: (showTooltip && !user) ? 50 : -1,
        transition: 'opacity 0.2s ease-in',
      }}
      className="z-20 text-white bg-red-600 absolute left-7 -top-0 rounded px-2 py-1 pointer-events-none"
    >
      Please Login to Save Media
    </div>
  );
};
