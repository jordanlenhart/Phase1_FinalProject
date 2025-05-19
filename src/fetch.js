// JUST NAMING VARIABLES FOR EASE
// TABLE
const table = document.getElementById('table');
const teamAPI = 'https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League'

// SEARCH BAR INPUT
const searchInput = document.querySelector('.searchTerm');
const clearButton = document.querySelector('.clearButton');

// DIALOG/MODAL AND ITS INFO
const modal = document.getElementById('teamModal');
const closeBtn = document.querySelector('.close');
const teamNameTitle = document.getElementById('teamNameTitle');
const stadiumName = document.getElementById('stadiumName');
const yearFormed = document.getElementById('yearFormed');
const teamDescription = document.getElementById('teamDescription')

// CLOSE THE DIALOG BY CLICKING...
// CLOSEBTN
closeBtn.onclick = () => {
  modal.style.display = 'none';
};

// OR ANYWHERE ELSE IN THE WINDOW
window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
};


// CREATING ARRAY FOR ALL TEAMS TO BE LISTED, USING LET BC THE ARRAY IS SUBJECT TO CHANGE
let allTeams = [];

// ASYNC FUNCTION THAT FETCHES FROM TEAM API
async function loadTeams() {
  try {
    const response = await fetch(teamAPI);
    
    // IF THE FETCH DOES NOT WORK, THEN IT WILL THROW THE ERROR
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // FILLING THE TABLE WITH IMAGES AND NAMES OF THE TEAMS FROM THE API
    const data = await response.json();
    allTeams = data.teams.slice(0, 20);
    // RENDERING TEAMS BASED ON SEARCH INPUT
    renderTeams(allTeams);
  } catch (error) {
    // CATCH AND SHOW ERROR IF FETCH DOES NOT WORK
    console.error('Error fetching teams:', error);
  }
}

// RENDERING TEAMS BASED ON THE INPUT OF SEARCH BAR
function renderTeams(teams) {
  // CLEAR TABLE
  table.innerHTML = '';

  // FOR EACH TEAM IN THE ALLTEAMS ARRAY, CREATE...
  teams.forEach(team => {

    // DIV/CELL CONTAINER
    const cell = document.createElement('div');
    cell.className = 'cell';

    // IMAGE OF TEAM BADGE INSIDE OF DIV
    const img = document.createElement('img');
    img.src = team.strBadge;
    img.alt = team.strTeam;

    //  TEAM NAME BELOW THE BADGE
    const teamName = document.createElement('h3');
    teamName.textContent = team.strTeam;

    // COMBINE ALL ELEMENTS INTO THE CELL, COMBINE CELLS TO TABLE
    cell.appendChild(img);
    cell.appendChild(teamName);
    table.appendChild(cell);

    // LISTENING FOR CLICK ON EACH CELL TO OPEN DIALOG
    cell.addEventListener('click', () => {

      // DIALOG CONTENT WILL BE FILLED BASED ON API CHARACTERISTICS
      // GENERAL INFO
      teamNameTitle.textContent = team.strTeam;
      stadiumName.textContent = `Stadium: ${team.strStadium}`;
      yearFormed.textContent = `Year Formed: ${team.intFormedYear}`;
      teamDescription.textContent = `${team.strDescriptionEN}`;
      modal.style.display = 'block';

      // TEAM SOCIAL ICONS
      document.getElementById('teamWebsite').href = team.strWebsite ? `https://${team.strWebsite}` : '#';
      document.getElementById('teamTwitter').href = team.strTwitter ? `https://${team.strTwitter}` : '#';
      document.getElementById('teamInstagram').href = team.strInstagram ? `https://${team.strInstagram}` : '#';
      document.getElementById('teamYoutube').href = team.strYoutube ? `https://${team.strYoutube}` : '#';

      // BACKGROUND OF THE DIALOG USING FANART
      const fanartUrl = team.strFanart1;
      const modalContent = document.querySelector('.modal-content');

      // IF FANART IS FETCHED, ADD STYLING
      if (fanartUrl) {
        modalContent.style.backgroundImage = `url(${fanartUrl})`;
        modalContent.style.backgroundSize = 'cover';
        modalContent.style.backgroundPosition = 'center';
        modalContent.style.backgroundRepeat = 'no-repeat';
        modalContent.style.color = 'white';
      } else { //IF NOT FETCHED THEN GO BACK TO DEFAULT STYLING
        modalContent.style.backgroundImage = '';
        modalContent.style.color = '';
      }
    });
  });
}

// EVENT LISTENER FOR SEARCH INPUT
searchInput.addEventListener('input', (e) => {
  // CHANGE ALL SEARCH INPUT VALUES TO LOWERCASE
  const searchValue = e.target.value.toLowerCase();

  // SHOW CLEAR BTN IF INPUT HAS TEXT
  clearButton.style.display = searchValue ? 'inline' : 'none';

  // ONLY DISPLAY TEAMS THAT MEET THE CRITERIA FROM INPUT
  const filtered = allTeams.filter(team =>
    team.strTeam.toLowerCase().includes(searchValue)
  );

  // RUN THE RENDER FUNCTION WITH FILTERED TEAMS
  renderTeams(filtered);
});

// CLEAR SEARCH BAR ON CLICK
clearButton.addEventListener('click', () => {
  searchInput.value = '';
  clearButton.style.display = 'none';
  renderTeams(allTeams);
  searchInput.focus();
});

// START PAGE BY RUNNING THE ASYNC FUNCTION, AWAITING INPUT VIA CLICK OR SEARCH BAR
loadTeams();