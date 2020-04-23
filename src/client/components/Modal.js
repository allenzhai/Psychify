import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import '../style/Modal.css';

function Portal({ children }) {
  const portalRoot = document.getElementById('portal');
  const el = document.createElement('div');

  useEffect(() => {
    portalRoot.appendChild(el);
    return () => portalRoot.removeChild(el);
  }, []);

  return createPortal(children, el);
}

// eslint-disable-next-line react/prop-types
export default function Modal({ children }) {
  return (
    <Portal>
      <div className="modal-overlay">
        <div className="modal">
          {children}
        </div>
      </div>
    </Portal>
  );
}
