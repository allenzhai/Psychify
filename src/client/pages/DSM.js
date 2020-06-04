import React from 'react';
import { useHistory } from 'react-router-dom';

import '../style/DSM.css';
import useFetch from '../hooks/useFetch';

export default function DSM() {
  // const [isLoading, data, error] = useFetch(endPoint);
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);
  const index = !params.has('letter') ? 'a' : params.get('letter');
  const endPoint = `/api/disorder/${index}`;
  const [isLoading, data, error] = useFetch(endPoint);
  const entries = data || [];

  const loading = isLoading && (<p>Loading</p>);
  const err = error && (<p>{error}</p>);

  const letters = [...'abcdefghijklmnopqrstuvwxyz'];
  const lettterList = (
    <div>
      {
        letters.map(
          (letter) => {
            const link = `/dsm?letter=${letter}`;
            return (
              <a key={letter} className="dsm-index" href={link}>
                {letter}
              </a>
            );
          }
        )
      }
    </div>
  );

  const nameList = (
    <ul className="index-list" style={{ listStyleType: 'none' }}>
      {
        entries.map((entry) => {
          const link = `/results?terms=${entry.name}`;
          return (<li key={entry.id}><a href={link}>{entry.name}</a></li>);
        })
      }
    </ul>
  );

  return (
    <div>
      <div className="index-list-con">
        <h1 className="index-header">Diagnostic Criteria and Codes Index</h1>
        {lettterList}
        <div className="col">
          {loading}
          {err}
          {nameList}
        </div>

      </div>
    </div>
  );
}
