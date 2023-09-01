import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import axios from 'axios';
import OfferItem from './Components/OfferItem';

const App = () => {
  const [data, setData] = useState([])

  const fetchOffers = () => {
    axios.get('https://www.kattabozor.uz/hh/test/api/v1/offers')
      .then((res) => setData(res.data.offers))
  }

  useEffect(() => {
    fetchOffers()
  }, [])

  return (
    <div>
      <Navbar />
      <div className='container my-3'>
        <div className='row'>
          {
            data.map((item) => (
              <OfferItem item={item} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
