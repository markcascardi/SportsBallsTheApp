class TeamAdapter {
  constructor(url){
    this.baseUrl = url
  }

  fetchTeams() {
    return fetch(this.baseUrl)
      .then(response => response.json())
  }


  fetchTeam(teamSelected) {
    return fetch(`${this.baseUrl}/${teamSelected}`)
      .then(response => response.json())
    }
  }
