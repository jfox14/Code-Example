const api = {

  readMessageReasons: () => {
    const apiUrl = getApiUrl('messageReasons')

    const options = {
      method: 'GET',
      credentials: 'same-origin'
    }

    return fetch(apiUrl, options)
    .then((response) => {
      return response.json()
    })
  },

  createNewMessage: (newUserProfileDetails) => {
    const apiUrl = getApiUrl('profiles')
    const payload = newUserProfileDetails

    const options = {
      method: 'POST',
      body: JSON.stringify(newUserProfileDetails),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return fetch(apiUrl, options)
    .then((response) => {
      return response.json()
    })
  }
}

export default api

// private helper
function getApiUrl (path) {
  return 'http://localhost:4001/' + path
}
