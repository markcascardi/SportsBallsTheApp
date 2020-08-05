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
  })
}

function getRoster(teamSelected) {
  fetch(baseUrl + teamSelected)
  .then(response => response.json())
  .then(roster => {
    rosterList = ""
    roster.athletes.forEach(athlete => {
      rosterList += `
        <div id="${athlete.id}">
          <p>
            #${athlete.number} | ${athlete.firstname} ${athlete.lastname} | ${athlete.city}, ${athlete.state}
          </p>
        </div>
      `
    })
    teamDiv.innerHTML = rosterList
  })
}

document.addEventListener("DOMContentLoaded", () => {
  getTeams()
})

teamDropDown.addEventListener("change", (e) => {
  let teamSelected = e.target.value
  getRoster(teamSelected)
})
