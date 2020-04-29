import React from 'react';
import Navbar from '../components/Navbar';
import Searchbar from '../components/Searchbar';

import '../style/DSM.css';

export default function DSM() {
  // Blank placeholder component for the DSM Index
  return (
    <body>
      <div className="landing-content">
        <Searchbar className="searchbar-home" />
      </div>
      <div className="index-list-con">
        <h1 className="index-header">Diagnostic Criteria and Codes Index</h1>
        <div className="col">
          <ul className="index-list" style={{ listStyleType: 'none' }}>
            <li><a href="/">Anxiety Disorders</a></li>
            <li><a href="/">Bipolar and Related Disorders</a></li>
            <li><a href="/">Depressive Disorders</a></li>
            <li><a href="/">Disruptive, Impulse-Control, and Conduct Disorders</a></li>
            <li><a href="/">Dissociative Disorders</a></li>
            <li><a href="/">Elimination Disorders</a></li>
            <li><a href="/">Feeding and Eating Disorders</a></li>
            <li><a href="/">Gender Dysphoria</a></li>
            <li><a href="/">Medication-Induced Movement Disorders and Other Adverse Effects of Medication</a></li>
            <li><a href="/">Neurocognitive Disorders</a></li>
            <li><a href="/">Neurodevelopmental Disorders</a></li>
          </ul>
        </div>
        <div className="col">
          <ul className="index-list" style={{ listStyleType: 'none' }}>
            <li><a href="/">Obsessive-Compulsive and Related Disorders</a></li>
            <li><a href="/">Other Conditions That May Be a Focus of Clinical Attention</a></li>
            <li><a href="/">Other Mental Disorders and Additional Codes</a></li>
            <li><a href="/">Paraphilic Disorders</a></li>
            <li><a href="/">Personality Disorders</a></li>
            <li><a href="/">Schizophrenia Spectrum and Other Psychotic Disorders</a></li>
            <li><a href="/">Sexual Dysfunctions</a></li>
            <li><a href="/">Sleep-Wake Disorders</a></li>
            <li><a href="/">Somatic Symptom and Related Disorders</a></li>
            <li><a href="/">Substance-Related and Addictive Disorders</a></li>
            <li><a href="/">Trauma- and Stressor-Related Disorders</a></li>
          </ul>
        </div>
      </div>
    </body>
  );
}
