import {useEffect, useState} from 'react'
import axios from 'axios'
function App() {
	const [outcome, setOutcome] = useState([])
	const CLIENT_ID = "251ae4d1eb8d4445980f57ab288bd078"
	const REDIRECT_URI = "http://localhost:3000"
	const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    	const RESPONSE_TYPE = "token"

	const [token, setToken] = useState("")

    	useEffect(() => {
		const hash = window.location.hash
		let token = window.localStorage.getItem("token")

		if (!token && hash) {
	    	token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

	    	window.location.hash = ""
	    	window.localStorage.setItem("token", token)
		}

		setToken(token)

    	}, [])
	
    	const logout = () => {
		setToken("")
		window.localStorage.removeItem("token")
    	}

	const sendRequest = () => {
		/*
		 * successful connection to server
		const url = "http://localhost:3001/request"
		axios.get(url).then(response => {
			setOutcome(response.data)
		})
		*/
		let accessToken = localStorage.getItem('token');

  		axios.get('https://api.spotify.com/v1/me', {
    		headers: {
      		Authorization: 'Bearer ' + accessToken
    		}}).then(response => {setOutcome(response.data.display_name)})
	
	};
    	return (
	<div className="App">
	    <header className="App-header">
		<h1>Spotify React</h1>
		{!token ?
		    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
			to Spotify</a>
		    : <button onClick={logout}>Logout</button>}
	    </header>
		<p> {token}</p>
		<p> {outcome} </p>
		<button onClick={sendRequest}> Request </button>
	</div>
	);
}


export default App;
