"use client";

import { useEffect, useState } from "react";
import { clientApiData } from "@/lib/api-client";

export function useApiList<T>(path: string, fallback: T[] = []) {
  const [data, setData] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientApiData<T[]>(path)
      .then((items) => {
        if (items) setData(items);
      })
      .finally(() => setLoading(false));
  }, [path]);

  return { data, loading };
}
