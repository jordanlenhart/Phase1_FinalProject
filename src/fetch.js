// JUST NAMING VARIABLES FOR EASE, TABLE AND DIALOG
const table = document.getElementById('table');
const teamAPI = 'https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League'

const modal = document.getElementById('teamModal');
const closeBtn = document.querySelector('.close');
const teamNameTitle = document.getElementById('teamNameTitle');
const stadiumName = document.getElementById('stadiumName');
const yearFormed = document.getElementById('yearFormed');
const teamDescription = document.getElementById('teamDescription')


// CLOSE AND OPEN THE DIALOG
closeBtn.onclick = () => {
  modal.style.display = 'none';
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
};

// FILLING THE TABLE WITH IMAGES AND NAMES OF THE TEAMS FROM THE API
async function loadTeams() {
  try {
    const response = await fetch(teamAPI);
    
    // IF THE FETCH DOES NOT WORK, THEN IT WILL THROW THE ERROR
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // PARSE JSON FROM API AND CREATE ARRAY WITH LL 20 TEAMS
    const data = await response.json();
    const teams = data.teams.slice(0, 20);

    // FOR EACH TEAM, WE WILL...
    teams.forEach(team => {

      //  CREATE A DIV
      const cell = document.createElement('div');
      cell.className = 'cell';

      // DISPLAY THE LOGO
      const img = document.createElement('img');
      img.src = team.strBadge;
      img.alt = team.strTeam;

      // DISPLAY TEAM NAME
      const teamName = document.createElement('h3')
      teamName.textContent = team.strTeam;

      // COMBINE ALL CHILD ELEMENTS TO FORM EACH CELL FOR EACH TEAM
      cell.appendChild(img);
      cell.appendChild(teamName);
      table.appendChild(cell);

      // ON CLICK EVENT TO OPEN DIALOG INFO
      cell.addEventListener('click', () => {

        // GENERAL TEAM INFO
        teamNameTitle.textContent = team.strTeam;
        stadiumName.textContent = `Stadium: ${team.strStadium}`;
        yearFormed.textContent = `Year Formed: ${team.intFormedYear}`
        teamDescription.textContent = `${team.strDescriptionEN}`
        modal.style.display = 'block';

        // TEAM SOCIAL A TAG URLS
        // Set social media links
        document.getElementById('teamWebsite').href = team.strWebsite ? `https://${team.strWebsite}` : '#';
        document.getElementById('teamTwitter').href = team.strTwitter ? `https://${team.strTwitter}` : '#';
        document.getElementById('teamInstagram').href = team.strInstagram ? `https://${team.strInstagram}` : '#';
        document.getElementById('teamYoutube').href = team.strYoutube ? `https://${team.strYoutube}` : '#';

        
        // FANART BACKGROUND
        const fanartUrl = team.strFanart1;
        const modalContent = document.querySelector('.modal-content');

        if (fanartUrl) {
          modalContent.style.backgroundImage = `url(${fanartUrl})`;
          modalContent.style.backgroundSize = 'cover';
          modalContent.style.backgroundPosition = 'center';
          modalContent.style.backgroundRepeat = 'no-repeat';
          modalContent.style.color = 'white'; // Ensure contrast
        } else {
          // Optional: Reset to default background if no fanart
          modalContent.style.backgroundImage = '';
        }
            });
            

    });
  } catch (error) {
    // CATCH AND SHOW ERROR IF FETCH DOES NOT WORK
    console.error('Error fetching teams:', error);
  }
}

loadTeams();
