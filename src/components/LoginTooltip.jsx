import React from 'react';

const LoginTooltip = ({ showTooltip }) => {
  return (
    <div
      id="login-tooltip"
      style={{
        opacity: showTooltip ? 1 : 0,
        transition: 'opacity 0.2s ease-in',
      }}
      className="z-10 text-white bg-red-600 absolute left-10 -translate-y-2 rounded px-2 py-1 pointer-events-none"
    >
      Please Login to Save Media
    </div>
  );
};

export default LoginTooltip;
