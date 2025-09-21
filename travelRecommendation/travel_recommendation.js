function resetForm() {
            document.getElementById('searchForm').reset();
            document.getElementById('results').innerHTML = ''; 
        }



async function search(event) {
            event.preventDefault(); // Prevent form submission
            const query = event.target.query.value.toLowerCase();
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; // Clear previous results

            try {
                const response = await fetch('file.json'); // Fetch the JSON data
                const data = await response.json();

                // Filter results based on the query
                const results = data.filter(item => item.destination.toLowerCase().includes(query));

                // Display results
                if (results.length > 0) {
                    results.forEach(item => {
                        const div = document.createElement('div');
                        div.textContent = `Destination: ${item.destination}, Description: ${item.description}`;
                        resultsDiv.appendChild(div);
                    });
                } else {
                    resultsDiv.textContent = 'No results found.';
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                resultsDiv.textContent = 'Error fetching data.';
            }
}

        