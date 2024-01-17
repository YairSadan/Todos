'use client';
import React, { useEffect } from 'react';

export default function TodosPage() {
  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch(`http://localhost:5160/api/todos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${sessionStorage.getItem('jwt')}`,
        },
      });
      const data = await res.json();
      console.log(data);
    };
    getTodos();
  }, []);

  return <div>TodosPage</div>;
}
