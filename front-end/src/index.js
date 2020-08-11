const baseUrl = "http://localhost:3000/teams/"
const teamUrl = baseUrl+"/${team.id}"
const teamDropDown = document.getElementById("teamSelect")
const teamDiv = document.getElementById("roster")
const teamAdapter = new TeamAdapter("http://localhost:3000/teams/")

function getTeams () {
  teamAdapter.fetchTeams()
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
  teamAdapter.fetchTeam(teamSelected)
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

function getAthleteCard(e) {
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

function updateAthlete(e) {
  console.log(e.target[0].id.split("-")[1])
  let athleteId = parseInt(e.target[0].id.split("-")[1])
  let newIg_handle = document.getElementById(`ig_handle-${athleteId}`).value
  let newBirthdate = document.getElementById(`birthdate-${athleteId}`).value
  let newHeight = document.getElementById(`height-${athleteId}`).value
  let newWeight = document.getElementById(`weight-${athleteId}`).value
  let newComment = document.getElementById(`comments-${athleteId}`).value
  let submitButtonDiv = document.getElementById(`edit-athlete-button-div-${athleteId}`)

  return fetch(`http://localhost:3000/athletes/${athleteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      ig_handle: newIg_handle,
      birthdate: newBirthdate,
      height: newHeight,
      weight: newWeight,
      comments: newComment
    })
  }).then(function(response){
    return response.json()
  }).then(athlete => {
    console.log(athlete)
    submitButtonDiv.innerHTML = ``
  })
}

document.addEventListener("DOMContentLoaded", () => {
  getTeams()
  teamDropDown.addEventListener("change", (e) => {
    let teamSelected = e.target.value
    getRoster(teamSelected)
  })
})

document.addEventListener("submit", (event) => {
  event.preventDefault()
  console.log(event.target)
  updateAthlete(event)
})


function updateGeneralInfo(e) {
  let athleteId = parseInt(e.target.id.split("-")[1])
  let addUpdateFields = Array.from(document.getElementsByClassName('generalinfo'))[0]
  addUpdateFields.innerHTML = generateGeneralForm(athleteId)
}

document.addEventListener("click", (e) => {
  if (e.target.className === "modal-trigger") {
    getAthleteCard(e)
  }
  else if (e.target.type === "text") {
    console.log(e.target.id)
    let athleteId = parseInt(e.target.id.split("-")[1])
    let buttonDiv = document.getElementById(`edit-athlete-button-div-${athleteId}`)
    buttonDiv.innerHTML = `
      <input class="waves-effect waves-blue btn-flat" id="edit-athlete-button" type="submit" value="Update Athlete Info">
    `
  }
})

let athleteCardHtml = ((athlete) => {
  let fullname = `${athlete.number} | ${athlete.year} | ${athlete.firstname} ${athlete.lastname}`
  let hometownInfo = `${athlete.city}, ${athlete.state}`
  let general = `<p class="generalinfo-details" id="ig_handle-${athlete.id}">IG handle: @${athlete.ig_handle}</p>
                 <p class="generalinfo-details" id="birthdate-${athlete.id}">Birthday: ${athlete.birthdate}</p>
                 <p class="generalinfo-details" id="height-${athlete.id}">${athlete.height}</p>
                 <p class="generalinfo-details" id="weight-${athlete.id}">${athlete.weight} lbs</p>
               `
  let comments = (athlete.comments == null) ? "Click to add a comment!" : athlete.comments

  return `
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
            <div class="row compact">
              <div class="col s6 offset-s2">
                <h2 class="name">${fullname}</h2>
                <p class='location'>${hometownInfo}</p>
                <p class='location'>${athlete.high_school}</p>
              </div>
            </div>
            <form class="col s12" id="form-${athlete.id}">
              <div class="row compact">
                <div class="col s6">
                  IG Handle:
                  <div class="input-field inline">
                    <input id="ig_handle-${athlete.id}" type="text" class="validate" data-athlete="${athlete}" value="${athlete.ig_handle}" style="margin-top:-4px">
                  </div>
                </div>
                <div class="col s6">
                  Birthday
                  <div class="input-field inline">
                    <input id="birthdate-${athlete.id}" type="text" class="validate" data-athlete="${athlete}" value="${athlete.birthdate}" style="margin-top:-4px">
                  </div>
                </div>
              </div>
              <div class="row compact">
                <div class="col s6">
                  Height:
                  <div class="input-field inline">
                    <input id="height-${athlete.id}" type="text" class="validate" data-athlete="${athlete}" value="${athlete.height}" style="margin-top:-4px">
                  </div>
                </div>
                <div class="col s6">
                  Weight
                  <div class="input-field inline">
                    <input id="weight-${athlete.id}" type="text" class="validate" data-athlete="${athlete}" value="${athlete.weight} lbs" style="margin-top:-4px">
                  </div>
                </div>
              </div>
              <div class="row compact">
                <div class="input-field col s12">
                Notes:
                  <input id="comments-${athlete.id}" type="text" class="validate" data-athlete="${athlete}" value="${athlete.comments}">
                </div>
              </div>
              <div id="edit-athlete-button-div-${athlete.id}">
            </form>
          </div>
          <div class="info">
          Bio:
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
//                  :birthdate, :biography, :image_url)
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
// function updateIgHandle(e) {
//   let athleteId = parseInt(e.target.id.split("-")[1])
//   let addIgFields = Array.from(document.getElementsByClassName('ig_handle'))[0]
//   addIgFields.innerHTML = generateIgForm(athleteId)
// }

// function generateIgForm(athleteId) {
//   // let oldValue = Array.from(document.getElementsByClassName('ig_handle'))[0].innerText.split(": ")[1]
//   return `
//     <form class="edit-ig_handle-form" data-athlete=${athleteId}>
//       <input type="textarea" id="text-input" name="ig_handle" value="${oldValue}">
//       <br/>
//       <input id="edit-comments" type="submit" value="Update IG handle">
//     </form>
//   `
// }

// function generateGeneralForm(athleteId) {
//   return `
//     <form class="edit-comments-form" data-athlete=${athleteId}>
//       <input type="textarea" id="text-input" name="ig_handle" value="${athleteId.ig_handle}">
//       <br/>
//       <input type="textarea" id="text-input" name="birthdate" value="${athleteId.birthdate}">
//       <br/>
//       <input type="textarea" id="text-input" name="height" value="${athleteId.height}">
//       <br/>
//       <input type="textarea" id="text-input" name="weight" value="${athleteId.weight}">
//       <br/>
//       <input id="edit-athlete" type="submit" value="Update Athlete Info">
//     </form>
//   `
// }

// function generateAthleteForm(athleteId) {
//   return `
//     <form class="edit-comments-form" data-athlete=${athleteId}>
//       <input type="textarea" id="text-input" name="name" value="${athleteId.comments}">
//       <br/>
//       <input id="edit-comments" type="submit" value="Update Comments">
//     </form>
//   `
// }
