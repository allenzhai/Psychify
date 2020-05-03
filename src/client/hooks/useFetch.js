import { useState, useEffect } from 'react';

export default function useFetch(url, options) {
  const [isloading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    console.log(url);
    fetch(url, options).then(res => res.json())
      .then((serverResult) => {
        setIsLoading(false);
        setData(serverResult);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [url, options]);

  return [isloading, data, error];
}
