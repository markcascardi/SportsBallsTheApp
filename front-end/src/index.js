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
          <td class="athlete-name">
            <a data-athlete="${athlete.id}" class="modal-trigger" href="#modal${athlete.id}">${athlete.firstname} ${athlete.lastname}</a>
          </td>
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

function getPlayerCard(e) {
  console.log(e.target.dataset.athlete)
  let athleteSelected = e.target.dataset.athlete
  fetch("http://localhost:3000/athletes/" + athleteSelected)
  .then(response => response.json())
  .then(athlete => {
    console.log(athlete)
     makeAthleteCard(athlete)
     let modal = document.getElementById(`modal${athlete.id}`);
     let instance = M.Modal.init(modal, {athlete});
     instance.open()
  })
}

function makeAthleteCard(athlete) {
  let athleteCard = document.createElement('div')
  athleteCard.innerHTML = athleteCardHtml(athlete)
  document.body.appendChild(athleteCard)
  return null
}

document.addEventListener("DOMContentLoaded", () => {
  getTeams()
  teamDropDown.addEventListener("change", (e) => {
    let teamSelected = e.target.value
    getRoster(teamSelected)
  })
})

function createComment(e) {
  let athleteId = parseInt(e.target.id.split("-")[1])
  let addCommentField = document.getElementById(`comments-${athleteId}`)
  addCommentField.innerHTML = generateCommentsForm(athleteId)
  document.addEventListener("submit", () => {
    event.preventDefault()
    let newCommentText = document.getElementById("text-input").value
    return fetch(`http://localhost:3000/athletes/${athleteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        comments: newCommentText
      })
    }).then(function(response){
      return response.json()
    }).then(athlete => {
      addCommentField.innerHTML = `
        <p id="comments-${athlete.id}" class="comments-" data-athlete="${athlete}">
          ${athlete.comments}
        </p>
      `
    })
  })
}

function generateCommentsForm(athleteId) {
  return `
    <form class="edit-comments-form" data-athlete=${athleteId}>
      <input type="textarea" id="text-input" name="name" value="${athleteId.commments}">
      <br/>
      <input id=edit-athlete type="submit" value="Update Comments">
    </form>
  `
}

document.addEventListener("click", (e) => {
  console.log(e.target.className)
  if (e.target.className === "modal-trigger") {
    getPlayerCard(e)
  }
  else if (e.target.className === "comments-") {
    createComment(e)
  }
})

let athleteCardHtml = ((athlete) => {
  let fullname = `${athlete.number} | ${athlete.year} | ${athlete.firstname} ${athlete.lastname}`
  let hometownInfo = `${athlete.city}, ${athlete.state}<br>
                   ${athlete.high_school}`
  let general = `<p>IG handle: @${athlete.ig_handle}</p>
               <p>Birthday: ${athlete.birthdate}</p>
               <p>${athlete.height}, ${athlete.weight} lbs</p>
               `
  let comments = (athlete.comments == null) ? "Click to add a comment!" : athlete.comments

  return `
    <!-- Modal Structure -->
    <div id="modal${athlete.id}" class="modal modal-fixed-footer">
      <div class="modal-content">
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
            <div class="labels">
              <div class="label">
                <p>Comments:</p>
                <div class="comments" id="comments">
                  <p id="comments-${athlete.id}" class="comments-" data-athlete="${athlete}">
                    ${comments}
                  </p>
                </div>
              </div>
              <div class="label">
                <p>General Info:</p>
                <div class="generalinfo">${general}
                </div>
              </div>
            </div>
            <div class="info">
              <p class="description">${athlete.biography} ivaivbibvbvoioiejifoewici.lksnclkdsnc
              Hi my name i s wat my name is who my name is wicka wicka shteve shtady.

              skdnlskenvklenvklfnrweklwklfj;ldlqkwdqwdwqoefjlkenkdne
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">close</a>
      </div>
    </div>
  `
})

  // <div class="card">
  //   <div class="background">
  //       <img class="background-img" src="" alt="">
  //   </div>
  //   <div class="content">
  //     <div class="profile">
  //         <img class="profile-img" src="${athlete.image_url}" alt="">
  //     </div>
  //     <div class="header">
  //         <h2 class="name">${fullname}</h2>
  //         <p class='location'>${hometownInfo}</p>
  //     </div>
  //     <div class="info">
  //         <p class="description">${athlete.biography}</p>
  //     </div>
  //     <div class="labels">
  //       <div class="label">
  //           <p>Comments:</p>
  //           <div class="comments">
  //             <ul>
  //               <li>or two, whatever</li>
  //               <li>no, make it three</li>
  //             </ul>
  //             <p>
  //               <button id="add-note">Click to Add a Note</button>
  //             </p>
  //           </div>
  //       </div>
  //       <div class="label">
  //           <p>General Info:</p>
  //           <div class="generalinfo">${general}
  //           </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>

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
