const apiBaseUrl = "https://v3.football.api-sports.io/fixtures";
const apiKey = "37bb3145b48ae66eda7e828cde4ced27";//3bf83a86b9d57d2ae0ce347c6ce78bef
const apiHeaders = {
  "x-apisports-key": apiKey,
};

function fetchFixtures() {
  const date = new Date().toISOString().split("T")[0];
  const url = `${apiBaseUrl}?date=${date}`;

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
      console.log("Fixtures Data => :", data);
      const matchDataContainer = document.getElementById("match-data");
      if (data.response && data.response.length > 0) {
        renderFixture(data.response.slice(0, 80));
      } else {
        matchDataContainer.innerHTML = "<p>No fixtures found for the specified date.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);      
    });
}

function renderFixture(fixtures) {
  const matchDataContainer = document.getElementById("match-data");
  matchDataContainer.innerHTML = ''; 

  const fixtureContent = fixtures
    .filter(fixture => {
      const homeScore = fixture.goals?.home !== null ? fixture.goals.home : "-";
      const awayScore = fixture.goals?.away !== null ? fixture.goals.away : "-";
      return homeScore !== "-" || awayScore !== "-";
    })
    .map((fixture) => {
      const homeTeam = fixture.teams.home;
      const awayTeam = fixture.teams.away;
      const scorehomefulltime = fixture.score?.fulltime?.home ?? "-";
      const scorehomehalftime = fixture.score?.halftime?.home ?? "-";
      const scoreawayfulltime = fixture.score?.fulltime?.away ?? "-";
      const scoreawayhalftime = fixture.score?.halftime?.away ?? "-";
      const homeScore = fixture.goals?.home !== null ? fixture.goals.home : "-";
      const awayScore = fixture.goals?.away !== null ? fixture.goals.away : "-";
      const matchResult = homeScore !== "-" && awayScore !== "-"
        ? homeScore > awayScore
          ? "(win)"
          : homeScore < awayScore
            ? "(loss)"
            : "(draw)"
        : "";

      return `
        <div class="row">
          <div class="col-lg-12">
            <div class="d-flex team-vs">
              <span class="score">${homeScore}-${awayScore}</span>
              <div class="team-1 w-50">
                <div class="team-details w-100 text-center">
                  <img src="${homeTeam.logo}" alt="${homeTeam.name} Logo" class="img-fluid">
                  <h3>${homeTeam.name} <span>${homeScore > awayScore ? matchResult : ""}</span></h3>
                  <ul class="list-unstyled">
                    <li>FullTime: ${scorehomefulltime}</li>
                    <li>HalfTime: ${scorehomehalftime}</li>
                  </ul>
                </div>
              </div>
              <div class="team-2 w-50">
                <div class="team-details w-100 text-center">
                  <img src="${awayTeam.logo}" alt="${awayTeam.name} Logo" class="img-fluid">
                  <h3>${awayTeam.name} <span>${homeScore < awayScore ? matchResult : ""}</span></h3>
                  <ul class="list-unstyled">
                    <li>FullTime: ${scoreawayfulltime}</li>
                    <li>HalfTime: ${scoreawayhalftime}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br/>
      `;
    }).join("");

  matchDataContainer.innerHTML = fixtureContent;
}

fetchFixtures();
