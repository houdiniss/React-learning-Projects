import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";


/// FETCH FUNCTION ///
async function sendHttpRequest(url,config) {
  const response = await fetch(url , config);
  const resData = await response.json();

  if(!response.ok) {
    throw new Error(resData.message || 'Something went wrong.');
  }

  return resData;
}



export default function useHttp(url , config , initialData) {
  const [data , setData] = useState(initialData);
  const [isLoading , setIsLoading] = useState(false);
  const [error , setError] = useState();

  function clearData() {
    setData(initialData);
  };


  const sendRequest = useCallback(async function sendRequest(data) {
    setIsLoading(true);
    try{
      const resData = await sendHttpRequest(url,{...config , body: data});
      setData(resData);
    } catch(error) {
      setError(error.message || 'Something went wrong');
    }
    setIsLoading(false);
  } , [url,config]);


  /// USE EFFECT ///
  useEffect(() => {
    if(config && (config.method === 'GET' || !config.method)) {
      sendRequest();
    }
  } , [sendRequest , config]);


  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  }
}