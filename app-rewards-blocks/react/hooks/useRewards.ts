import { useEffect, useState } from "react";

async function getRewards(payload?: { id: string, quantity: number, price: number, name: string }[]) {
  const response = await fetch('/_v/rewards', {
    headers: { 'content-type': 'application/json' },
        method: "POST",
    body: JSON.stringify(payload ?? [])
  });

  return response.json()
}

async function getForm() {
  const response = await fetch('/_v/getForm', {
    headers: { 'content-type': 'application/json' },
    method: "GET"
  });

  return response.json()
}

async function postForm(data : any,submissionKey: string) {
  console.log("data",data)
  const response = await fetch('/_v/postForm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: data,
      submissionKey: submissionKey
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}


export function usePostForm() {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const post = (data: any, submissionKey: string) => {
    setLoading(true);
    postForm(data, submissionKey)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  };
  return { data, loading, error, post };
}

export function useForm() {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getForm()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])
  return { data, loading, error };
}

export function useRewards(payload?: { id: string, quantity: number, price: number, name: string }[]) {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getRewards(payload)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error };
}
