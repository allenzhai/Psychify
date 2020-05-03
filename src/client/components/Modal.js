import React from 'react';
import { createPortal } from 'react-dom';

import '../style/Modal.css';

// eslint-disable-next-line react/prop-types
export default function Modal({ children }) {
  const portalRoot = document.getElementById('portal');
  const content = (
    <div className="modal-overlay">
      <div className="modal">
        {children}
      </div>
    </div>
  );

  return createPortal(content, portalRoot);
}
