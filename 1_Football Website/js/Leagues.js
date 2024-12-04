const apiBaseUrl_league = "https://v3.football.api-sports.io/leagues";

function fetchLeagues() {
  const url = `${apiBaseUrl_league}`;

  fetch(url, {
    method: "GET",
    headers: apiHeaders, 
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
        console.log("Leagues Data => :", data)
      if (data.response && data.response.length > 0) {
        renderLeagues(data.response.slice(0, 50)); 
      } else {
        document.getElementById("match-data-leagues").innerHTML =
          "<p>No Leagues Data found! </p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.getElementById("match-data-leagues").innerHTML =
        "<p>Error loading Leagues data. Please try again later.</p>";
    });
}

function renderLeagues(leagues) {
    const matchDataContainer = document.getElementById("match-data-leagues");
    matchDataContainer.innerHTML = '';
  
    leagues.forEach((league) => {
      const { id, name, logo } = league.league;
      const { name: countryName } = league.country;
      const seasons = league.seasons.map(season => `${season.year} (${season.start} - ${season.end})`).join(", ");
  
      matchDataContainer.innerHTML += `
        <tr>
          <td>${name}</td>
          <td><img src="${logo}" alt="${name} Logo" width="50"></td>
          <td>${countryName || 'N/A'}</td>
          <td>${seasons}</td>
        </tr>
      `;
    });
  }

fetchLeagues();
