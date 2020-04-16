import React from 'react';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';

export default function DSM() {
  //Blank placeholder component for the DSM Index
  return (
    <body>
      <Navbar />
      <div className="landing-content">
        <Searchbar className="searchbar-home" />
        <br />
        <h1>Diagnostic Criteria and Codes</h1>
        <ul className="disorder-category" style={{ listStyleType: "none" }}>
          <li><a href="/">Neurodevelopmental Disorders</a></li>
          <li><a href="/stuff">Schizophrenia Spectrum and Other Psychotic Disorders</a></li>
          <li><a href="/contact">Bipolar and Related Disorders</a></li>
          <li><a href="/">Depressive Disorders</a></li>
          <li><a href="/stuff">Anxiety Disorders</a></li>
          <li><a href="/contact">Obsessive-Compulsive and Related Disorders</a></li>
          <li><a href="/">Trauma- and Stressor-Related Disorders</a></li>
          <li><a href="/stuff">Dissociative Disorders</a></li>
          <li><a href="/contact">Somatic Symptom and Related Disorders</a></li>
          <li><a href="/">Feeding and Eating Disorders</a></li>
          <li><a href="/stuff">Elimination Disorders</a></li>
          <li><a href="/contact">Sleep-Wake Disorders</a></li>
          <li><a href="/">Sexual Dysfunctions</a></li>
          <li><a href="/stuff">Gender Dysphoria</a></li>
          <li><a href="/contact">Disruptive, Impulse-Control, and Conduct Disorders</a></li>
          <li><a href="/">Substance-Related and Addictive Disorders</a></li>
          <li><a href="/stuff">Neurocognitive Disorders</a></li>
          <li><a href="/contact">Personality Disorders</a></li>
          <li><a href="/">Paraphilic Disorders</a></li>
          <li><a href="/stuff">Other Mental Disorders and Additional Codes</a></li>
          <li><a href="/contact">Medication-Induced Movement Disorders and Other Adverse Effects of Medication</a></li>
          <li><a href="/">Other Conditions That May Be a Focus of Clinical Attention</a></li>
        </ul>
      </div>
    </body>
  );
}
