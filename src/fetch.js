const table = document.getElementById('table');

async function loadTeams() {
  try {
    const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League');
    
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
    });
  } catch (error) {
    console.error('Error fetching teams:', error);
  }
}

loadTeams();

