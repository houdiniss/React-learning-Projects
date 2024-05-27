import { useEffect , useState } from "react";

export function useFetch(fetchFunction , initialValue) {
  const [fetchedData, setFetchedData] = useState(initialValue);
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();


  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFunction();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch user places.' });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFunction]);


  return {
    fetchedData,
    isFetching,
    setFetchedData,
    error
  }
};