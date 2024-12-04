const apiBaseUrl_Player = "https://v3.football.api-sports.io/players/profiles";

function fetchPlayers() {
  const url = `${apiBaseUrl_Player}`;

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
        console.log("Players Data => :", data)
      if (data.response && data.response.length > 0) {
        renderPlayerProfiles(data.response.slice(0, 80)); 
      } else {
        document.getElementById("match-data-Players").innerHTML =
          "<p>No Players Data found! </p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.getElementById("match-data-Players").innerHTML =
        "<p>Error loading Players data. Please try again later.</p>";
    });
}

function renderPlayerProfiles(players) {
    const matchDataContainer = document.getElementById("match-data-Players");
    matchDataContainer.innerHTML = '';
  
    players.forEach(({ player }) => {
      const {
        name,
        age,
        birth,
        nationality,
        number,
        position,
        photo,
      } = player;
      if (!name || !age) return;
      matchDataContainer.innerHTML += `
        <tr>
          <td><img src="${photo}" alt="${name} Photo" width="50"></td>
          <td>${name || "N/A"}</td>
          <td>${age || "N/A"}</td>
          <td>${birth?.date || "N/A"}</td>
          <td>${birth?.place || "N/A"}</td>
          <td>${birth?.country || "N/A"}</td>
          <td>${nationality || "N/A"}</td>
          <td>${number || "N/A"}</td>
          <td>${position || "N/A"}</td>
        </tr>
      `;
    });
  }
  
fetchPlayers();
