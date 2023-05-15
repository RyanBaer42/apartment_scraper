import React from "react"
import './Pagination.css'

interface Props {
    listingsPerPage: number,
    totalListings: number,
    paginate: (pageNumber: number) => void
}


const Pagination = ({listingsPerPage, totalListings, paginate}: Props) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalListings / listingsPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <div key={number} className="page-item">
                        <a onClick={() => paginate(number)} href="!#" className="page-link">
                            {number}
                        </a>
                    </div>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination