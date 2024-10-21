import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url: string, config?: RequestInit) {
  const response = await fetch(url, config);

  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || response.statusText);
  }
  return resData;
}
export function useHttp<T>(url: string, config: RequestInit, initialData: T) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<T>(initialData);

  const sendRequest = useCallback(
    async function sendRequest() {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, config);
        setData(resData);
      } catch (error) {
        const err = error as Error;
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url, config],
  );

  useEffect(() => {
    if (config && (config.method === "GET" || !config.method)) sendRequest();
  }, [sendRequest, config]);

  return { data, isLoading, error, sendRequest };
}
