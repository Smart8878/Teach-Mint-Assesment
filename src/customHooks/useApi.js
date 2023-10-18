import { useState, useEffect } from 'react';

function useApi(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData(); 

    // Cleanup function if 'endpoint' changes before the previous request finishes
    return () => {
      // Cancel any pending requests or perform cleanup if needed
    };
  }, [endpoint]);

  return { data, loading, error };
}

export default useApi;
