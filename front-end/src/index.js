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
          <tr id="${athlete.id}">
            <td>${athlete.number}</td>
            <td>${athlete.firstname} ${athlete.lastname}</td>
            <td>${athlete.city}</td>
            <td>${athlete.state}</td>
          </tr>
      `
    })
    teamDiv.innerHTML = `
      <table text-align="left">
        <tr>
          <th>Number</th>
          <th>Name</th>
          <th>Home town</th>
          <th>Home state</th>
        </tr>
        ${rosterList}
      </table>
    `
  })
}

document.addEventListener("DOMContentLoaded", () => {
  getTeams()
})

teamDropDown.addEventListener("change", (e) => {
  let teamSelected = e.target.value
  getRoster(teamSelected)
})
