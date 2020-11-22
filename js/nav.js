document.addEventListener('DOMContentLoaded', (_) => {
  const elems = document.querySelectorAll('.sidenav');

  let page = window.location.hash.substr(1);
  if (page === '') {
    page = 'home';
  }

  M.Sidenav.init(elems);

  loadNav();
  loadPage(page);

  function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status !== 200) {
          return;
        }
        // Load list every menu
        document.querySelectorAll('.topnav, .sidenav').forEach((elm) => {
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event Listener untuk setiap tautan menu
        document.querySelectorAll('.sidenav a, .topnav a').forEach((elm) => {
          elm.addEventListener('click', (event) => {
            let sidenav = document.querySelector('.sidenav');
            M.Sidenav.getInstance(sidenav).close();

            // Load Page yang di panggil
            page = event.target.getAttribute('href').substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhttp.open('GET', 'nav.html', true);
    xhttp.send();
  }

  function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        const content = document.querySelector('#body-content');
        if (this.status === 200) {
          if (page === 'teams') {
            getTeams();
          } else if (page === 'events') {
            getKelasemen();
          } else if (page === 'detailTeam') {
            getTeamsById();
          } else if (page === 'ListPlayers') {
            PlayersById();
          } else if (page === 'saved') {
            getSavedFav();
          }
          content.innerHTML = xhttp.responseText;
        } else if (this.status === 404) {
          content.innerHTML = '<p>Page is Not Found</p>';
        } else {
          content.innerHTML = "<p>Ups....Page is Can't access</p>";
        }
      }
    };
    xhttp.open('GET', `pages/${page}.html`, true);
    xhttp.send();
  }
});
