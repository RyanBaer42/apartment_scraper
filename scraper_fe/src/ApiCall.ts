const fetchData = () => {
    return fetch(`http://localhost:3001/listings`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(`${response.status}`);
            }
        })
        .catch(error => {
            throw new Error(`: ${error.message}`);
        });
}

export default fetchData