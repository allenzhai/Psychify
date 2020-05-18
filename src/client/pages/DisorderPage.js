import React from 'react';
import { useLocation } from 'react-router-dom';

import '../style/DSM.css';

export default function DisorderPage() {
  const location = useLocation();
  console.log(location.data);
  const {
    name, category, description, sub_category, diagnostic_criteria
  } = location.data;

  return (
    <div>
      <div className="modal-header">
        <h3 className="disorder-title-modal">{name}</h3>
        <p className="disorder-category-modal">{category}</p>
        <p className="disorder-sub-category-modal">{sub_category}</p>
      </div>
      <div className="modal-body">
        <h3 className="disorder-section-header">Diagnostic Criteria</h3>
        <p className="disorder-diagnostic-criteria">{diagnostic_criteria}</p>
        <h3 className="disorder-section-header">Diagnostic Features</h3>
        <p className="disorder-description">{description}</p>
      </div>
    </div>
  );
}
