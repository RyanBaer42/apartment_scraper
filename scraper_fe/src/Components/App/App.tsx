import { useEffect, useState } from 'react';
import fetchData from '../../ApiCall';
import Listings from '../Listings/Listings';
import Pagination from '../Pagination/Pagination';
import data from '../../data.json'
import './App.css';

interface Listing {
  listing_id: number;
  title: string;
  image_url: string;
}

function App() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [listingsPerPage] = useState(10);

  useEffect(() => {
    fetchData()
      .then(data => {
          setListings(data);
          setLoading(false);
      })
      .catch(error => {
          console.log(error);
          setLoading(false);
      });
    // setListings(data)
    // setLoading(false)
  }, []);

  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='App'>
      <div className='title-container'>
        <h1 className='website-title'>Apartment Scraper</h1>
      </div>
      <Listings listings={currentListings} loading={loading}/>
      <Pagination 
        listingsPerPage={listingsPerPage} 
        totalListings={listings.length} 
        paginate={paginate}/>
    </div>
  );
}

export default App;