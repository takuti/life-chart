import React, { useState, useEffect } from 'react';
import { json } from 'd3';

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json('./data/life.json', (data) => {
      console.log(data);
    }).then(setData);
  }, []);

  return data;
};
