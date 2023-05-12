import { useEffect, useState } from 'react';
import fetchData from '../../ApiCall';
import './App.css';

interface Listing {
  id: number;
  name: string;
  image_url: string;
  // add more properties here if necessary
}

function App() {
  const [listings, setListings] = useState<Listing[] | []>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)

  useEffect(() => {
    fetchData()
      .then(data => {
        setListings(data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div>Loading</div>
    )
  } else {
    const allListings = listings.map((listing: Listing) => {
      return (
        <img src={listing.image_url}/>
      )
    })
    return (
      <div>{allListings}</div>
    )
  }
}

export default App;
