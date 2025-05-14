import axios from 'axios';

const url = 'https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League';

axios.get(url)
  .then(response => {
    const teams = response.data.teams;
    teams.forEach(team => {
      console.log(team.strTeam);
    });
  })
  .catch(error => {
    console.error('Error fetching teams:', error);
  });
