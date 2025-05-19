// JUST NAMING VARIABLES FOR EASE
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
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const teams = data.teams.slice(0, 20);

    teams.forEach(team => {
      const cell = document.createElement('div');
      cell.className = 'cell';

      const img = document.createElement('img');
      img.src = team.strBadge;
      img.alt = team.strTeam;

      const teamName = document.createElement('h3')
      teamName.textContent = team.strTeam;


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
    console.error('Error fetching teams:', error);
  }
}

loadTeams();
