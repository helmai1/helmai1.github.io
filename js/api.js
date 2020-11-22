const baseUrl = 'https://api.football-data.org/v2/teams/';
const TokenAPI = '9e382dd963634153aba0e9c2ae69c793';
const Events = 'https://api.football-data.org/v2/competitions/2021/standings';

function status(response) {
  if (response.status !== 200) {
    console.log(`Error: ${response.status}`);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(err) {
  console.log(`Error: ${err}`);
}

function getTeams() {
  if ('caches' in window) {
    caches.match(baseUrl).then((response) => {
      if (response) {
        response.json().then((data) => {
          let TeamHTML = '';
          data.teams.forEach((team) => {
            TeamHTML += `
                        <ul class="collection">
                            <li class="collection-item avatar"> 
                                <img src="${team.crestUrl}" alt="${team.name}" class="circle">
                                <span class="title">${team.name}</span>
                                <a href="./pages/detailTeam.html?id=${team.id}" class="secondary-content">See More</a>
                            </li>
                        </ul>`;
          });
          document.getElementById('teams').innerHTML = TeamHTML;
        });
      }
    });
  }

  fetch(baseUrl, {
    method: 'GET',
    headers: {
      'X-Auth-Token': TokenAPI,
    },
  })
    .then(status)
    .then(json)
    .then((data) => {
      let teamsHTML = '';

      data.teams.forEach(function (team) {
        teamsHTML += `
                <ul class="collection">
                    <li class="collection-item avatar"> 
                        <img src="${team.crestUrl}" alt="${team.name}" class="circle">
                        <span class="title">${team.name}</span>
                        <a href="./pages/detailTeam.html?id=${team.id}" class="secondary-content">See More</a>
                    </li>
                </ul>`;
      });
      document.getElementById('teams').innerHTML = teamsHTML;
    });
  //.catch(error);
}

function getTeamsById() {
  return new Promise(function (resolve, reject) {
    const urlParams = new URLSearchParams(window.location.search);
    const idParams = urlParams.get('id');

    if ('caches' in window) {
      caches.match(`${baseUrl}${idParams}`).then((response) => {
        if (response) {
          response.json().then((data) => {
            let detailTeamsHTML = `
                        <div class="col s12 m7">
                            <h2 class="header white-text">${data.name}</h2>
                            <div class="card horizontal #e0e0e0 grey lighten-2">
                                <div class="card-image">
                                    <img src="${data.crestUrl}">
                                </div>
                                <div class="card-stacked">
                                    <div class="card-content">
                                        <h5><i class="material-icons">contacts</i> More Info</h5>
                                        <div>
                                            <ul>
                                                <li>Alamat: ${data.address}</li>
                                                <li>Phone Number: ${data.phone}</li>
                                                <li>Email: ${data.email}</li>
                                                <li><a href="${data.website}" target="_blank">Website</a></li>
                                            </ul>
                                        </div>
    
                                        <a class="btn-floating pulse" href="./ListPlayers.html?id=${data.id}"><i class="material-icons">supervised_user_circle</i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
            document.getElementById('detailTeams').innerHTML = detailTeamsHTML;
            resolve(data);
          });
        }
      });
    }

    fetch(`${baseUrl}${idParams}`, {
      method: 'GET',
      headers: {
        'X-Auth-Token': TokenAPI,
      },
    })
      .then(status)
      .then(json)
      .then((data) => {
        console.log(data);
        let detailTeamsHTML = `
                <div class="col s12 m7">
                    <div class="card horizontal #e0e0e0 grey lighten-2">
                        <div class="card-image">
                            <img src="${data.crestUrl}">
                        </div>
                        <div class="card-stacked">
                            <div class="card-content">
                                <h5> ${data.name}</h5>
                                <div>
                                    <ul>
                                        <li>Alamat: ${data.address}</li>
                                        <li>Phone Number: ${data.phone}</li>
                                        <li>Email: ${data.email}</li>
                                        <li><a href="${data.website}" target="_blank">Website</a></li>
                                    </ul>
                                </div>
                                <a class="waves-effect waves-light btn-large" href="./ListPlayers.html?id=${data.id}">Info Pemain</a>        
                            </div>
                        </div>
                    </div>
                </div>
                `;
        document.getElementById('detailTeams').innerHTML = detailTeamsHTML;
        resolve(data);
      });
    //.catch(error)
  });
}

function PlayersById() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParams = urlParams.get('id');

  if ('caches' in window) {
    caches.match(`${baseUrl}${idParams}`).then((response) => {
      if (response) {
        response.json().then((players) => {
          let ListPlayers = '';

          players.squad.forEach((player) => {
            ListPlayers += `
                                    <tr>
                                        <td>${player.name}</td>
                                        <td>${player.nationality}</td>
                                        <td>${player.position}</td>
                                        <td>${player.countryOfBirth}</td>
                                        <td>${player.role}</td>
                                    </tr>`;
            document.getElementById('players').innerHTML = ListPlayers;
          });
          document.getElementById('players').innerHTML = ListPlayers;
        });
      }
    });
  }

  fetch(`${baseUrl}${idParams}`, {
    method: 'GET',
    headers: {
      'X-Auth-Token': TokenAPI,
    },
  })
    .then(status)
    .then(json)
    .then((data) => {
      let ListPlayers = '';

      data.squad.forEach((player) => {
        ListPlayers += `
                        <tr>
                            <td>${player.name}</td>
                            <td>${player.nationality}</td>
                            <td>${player.position}</td>
                            <td>${player.countryOfBirth}</td>
                            <td>${player.role}</td>
                        </tr>`;
      });
      document.getElementById('players').innerHTML = ListPlayers;
    });
}

function getKelasemen() {
  if ('caches' in window) {
    caches.match(Events).then((response) => {
      if (response) {
        response.json().then((data) => {
          let Kelasemen = '';
          data.standings[0].table.forEach((data) => {
            Kelasemen += `
                        <tr>
                            <td>${data.position}</td>
                            <td><img src="${data.team.crestUrl}" alt="${data.team.name}" height="20" class="circle"></td>
                            <td>${data.team.name}</td>
                            <td>${data.playedGames}</td>
                            <td>${data.won}</td>
                            <td>${data.lost}</td>
                            <td>${data.points}</td>
                        </tr>`;
          });
          document.getElementById('Kelasemen').innerHTML = Kelasemen;
        });
      }
    });
  }

  fetch(Events, {
    method: 'GET',
    headers: {
      'X-Auth-Token': TokenAPI,
    },
  })
    .then(status)
    .then(json)
    .then((data) => {
      let Kelasemen = '';
      data.standings[0].table.forEach((data) => {
        Kelasemen += `
                <tr>
                    <td>${data.position}</td>
                    <td><img src="${data.team.crestUrl}" alt="${data.team.name}" height="20" class="circle"></td>
                    <td>${data.team.name}</td>
                    <td>${data.playedGames}</td>
                    <td>${data.won}</td>
                    <td>${data.lost}</td>
                    <td>${data.points}</td>
                </tr>
                    `;
      });
      document.getElementById('Kelasemen').innerHTML = Kelasemen;
    });
  //.catch(error);
}

function getSavedFav() {
  getAll().then(function (teams) {
    console.log(teams);

    var TeamHTML = '';
    teams.forEach(function (team) {
      TeamHTML += `
            <ul class="collection">
                <li class="collection-item avatar"> 
                    <img src="${team.crestUrl}" alt="${team.name}" class="circle">
                    <span class="title">${team.name}</span>
                    <a href="./pages/detailTeamSaved.html?id=${team.id}" class="secondary-content">See More</a>
                  </a>
                </li>
            </ul>`;
    });
    document.getElementById('fav').innerHTML = TeamHTML;
  });
}

function getSavedFavById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParams = urlParams.get('id');

  getById(idParams).then(function (team) {
    let TeamHTML = `
        <div class="col s12 m7">
            <h2 class="header white-text">${team.name}</h2>
            <div class="card horizontal #e0e0e0 grey lighten-2">
                <div class="card-image">
                    <img src="${team.crestUrl}">
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                        <h5><i class="material-icons">contacts</i> More Info</h5>
                        <div>
                            <ul>
                                <li>Alamat: ${team.address}</li>
                                <li>Phone Number: ${team.phone}</li>
                                <li>Email: ${team.email}</li>
                                <li><a href="${team.website}" target="_blank">Website</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    document.getElementById('detailTeams').innerHTML = TeamHTML;
  });
}
