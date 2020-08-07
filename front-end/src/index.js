const baseUrl = "http://localhost:3000/teams/"
const teamUrl = baseUrl+"/${team.id}"
const teamDropDown = document.getElementById("teamSelect")
const teamDiv = document.getElementById("roster")

function getTeams() {
  fetch(baseUrl)
  .then(response => response.json())
  .then(teamsList => {
    let teamSelects = ""
    teamsList.forEach(team => {
      teamSelects += `<option value="${team.id}">${team.to_s}</option>`
    })
    document.getElementById("teamSelect").innerHTML += teamSelects
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {teamSelects});
  })
}

function getRoster(teamSelected) {
  fetch(baseUrl + teamSelected)
  .then(response => response.json())
  .then(roster => {
    rosterList = ""
    renderRoster(roster)
})

function renderRoster(roster) {
  roster.athletes.forEach(athlete => {
    rosterList += `
        <tr id="${athlete.id}" class="athlete-details">
          <td>${athlete.number}</td>
          <td class="athlete-name" data-athlete=${athlete.id}>${athlete.firstname} ${athlete.lastname}</td>
          <td>${athlete.year}</td>
          <td>${athlete.city}, ${athlete.state}</td>
        </tr>
    `
  })
  teamDiv.innerHTML = `
    <table id="athleteList">
      <thead>
        <tr>
          <th>Number</th>
          <th>Name</th>
          <th>Year</th>
          <th>Home town</th>
        </tr>
      </thead>
      <tbody>
        ${rosterList}
      </tbody>
    </table>
  `
  }
}

function makeAthleteCard(athlete) {
  const athleteRow = document.getElementById(athlete.id)
  let athleteCard = document.createElement('div')
  athleteCard.innerHTML = athleteCardHtml(athlete)
  return athleteRow.appendChild(athleteCard)
}

function getPlayerCard(e) {
  let athleteSelected = e.target.dataset.athlete
  fetch("http://localhost:3000/athletes/" + athleteSelected)
  .then(response => response.json())
  .then(athlete => {
    return makeAthleteCard(athlete)
  })
}

document.addEventListener("DOMContentLoaded", () => {
  getTeams()
  teamDropDown.addEventListener("change", (e) => {
    let teamSelected = e.target.value
    getRoster(teamSelected)
  })
})

function createNote(e) {
  e.preventDefault()
  let addNoteField = document.createElement('div')
  addNoteField.innerHTML = `
    <textarea id="new-comment" placeholder="note goes here"><textarea>
  `
}

teamDiv.addEventListener("click", (e) => {
  if (e.target.className == "athlete-name")
    getPlayerCard(e)
    let noteField = document.getElementById("add-note")
    noteField.addEventListener("click", createNote(e))
})

let athleteCardHtml = ((athlete) => {
  let fullname = `${athlete.number} | ${athlete.year} | ${athlete.firstname} ${athlete.lastname}`
  let hometownInfo = `${athlete.city}, ${athlete.state}<br>
                   ${athlete.high_school}`
  let general = `<p>IG handle: @${athlete.ig_handle}</p>
               <p>Birthday: ${athlete.birthdate}</p>
               <p>${athlete.height}, ${athlete.weight} lbs</p>
               `
  return `
    <div class="card">
      <div class="background">
          <img class="background-img" src="" alt="">
      </div>
      <div class="content">
        <div class="profile">
            <img class="profile-img" src="${athlete.image_url}" alt="">
        </div>
        <div class="header">
            <h2 class="name">${fullname}</h2>
            <p class='location'>${hometownInfo}</p>
        </div>
        <div class="info">
            <p class="description">${athlete.biography}</p>
        </div>
        <div class="labels">
          <div class="label">
              <p>Comments:</p>
              <div class="comments">
                <ul>
                  <li>or two, whatever</li>
                  <li>no, make it three</li>
                </ul>
                <p>
                  <button id="add-note">Click to Add a Note</button>
                </p>
              </div>
          </div>
          <div class="label">
              <p>General Info:</p>
              <div class="generalinfo">${general}
              </div>
          </div>
        </div>
      </div>

    </div>
  `
})


//   team_id, :firstname, :lastname, :birthdate,
//                  :number, :year, :height, :weight, :city, :state, :high_school,
//                  :ig_handle, :biography, :image_url)
//
//   const ProfileCard = (() => {
//     const profile = document.querySelector('.image_url');
//     const name = document.querySelector('.name');
//     const location = document.querySelector('.location');
//     const description = document.querySelector('.description');
//     const comments = document.querySelector('.comments');
//     const generalinfo = document.querySelector('.generalinfo');
//
//     return {
//         setData: function(athlete) {
//             let fullname = `${athlete.number} | ${athlete.year} | ${athlete.firstname} ${athlete.lastname}`;
//             let origin = `${athlete.city}, ${athlete.state}
//                           <div>${athlete.high_school}</div>`;
            // let general = `${athlete.ig_handle}
            //               <div>${athlete.birthdate}</div>
            //               <div>${athlete.height}, ${athlete.weight} lbs</div>
            //               `;
//
//             profile.src = athlete.picture.large;
//             name.textContent = fullname;
//             location.innerHTML = origin;
//             description.textContent = `${athlete.biography}`;
//             comments.textContent = athlete.comments;
//             generalinfo.innerHTML = general;
//         }
//     }
// })();

// fetch('https://randomuser.me/api/?results=1')
// .then((resp) => resp.json())
// .then((athlete) => {
//     ProfileCard.setData(athlete.results[0]);
// });
