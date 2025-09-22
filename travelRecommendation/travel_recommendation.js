document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('searchForm');
    const dialog = document.getElementById('resultDialog');
    const dialogContent = document.getElementById('dialogContent');
    const closeBtn = document.getElementById('closeDialogBtn');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // prevent default form submission
  
      const query = form.query.value.trim();
      if (query) {
        fetch('travel_recommendation_api.json') 
                           .then(response => response.json())
                .then(data => {
                    console.log('Fetched data:', data);

                    let results = [];

                    data.countries.forEach(country => {
                        console.log('Processing country:', country.name);
                        if (country.name.toLowerCase().includes(query)) {
                            results.push(`<h4>${country.name}</h4>`);
                            country.cities.forEach(city => {
                                results.push(`<p><strong>${city.name}</strong>: ${city.description}</p><img src="${city.imageUrl}" alt="${city.name}" style="width:100px;height:auto;">`);
                            });
                        } else {
                            country.cities.forEach(city => {
                                if (city.name.toLowerCase().includes(query)) {
                                    results.push(`<h4>${country.name}</h4>`);
                                    results.push(`<p><strong>${city.name}</strong>: ${city.description}</p><img src="${city.imageUrl}" alt="${city.name}" style="width:100px;height:auto;">`);
                                }
                            });
                        }
                    });

                    data.temples.forEach(temple => {
                        console.log('Processing temple:', temple.name);
                        if (temple.name.toLowerCase().includes(query)) {
                            results.push(`<h4>Temple: ${temple.name}</h4>`);
                            results.push(`<p>${temple.description}</p><img src="${temple.imageUrl}" alt="${temple.name}" style="width:100px;height:auto;">`);
                        }
                    });

                    data.beaches.forEach(beach => {
                        console.log('Processing beach:', beach.name);
                        if (beach.name.toLowerCase().includes(query)) {
                            results.push(`<h4>Beach: ${beach.name}</h4>`);
                            results.push(`<p>${beach.description}</p><img src="${beach.imageUrl}" alt="${beach.name}" style="width:100px;height:auto;">`);
                        }
                    });

                    console.log('Search results:', results);
                    if (results.length > 0) {
                        dialogContent.innerHTML = `<h3>Search Results:</h3>${results.join('')}`;
                    } else {
                        dialogContent.textContent = `No results found for: "${query}"`;
                    }
                    dialog.showModal();
                })
                .catch(error => {
                    console.error('Error fetching data:', error); // Debugging: Log any errors
                    dialogContent.textContent = `Error fetching data: ${error.message}`;
                    dialog.showModal();
                });
        }
    });

closeBtn.addEventListener('click', function () {
    dialog.close();
});
});
  