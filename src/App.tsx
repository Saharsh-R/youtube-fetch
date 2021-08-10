import React, { useEffect, useState } from "react";

import SearchBar from "./components/searchBar";
import VideoGrid from "./components/VideoGrid";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import VideoResult from "./components/videoResult";
// import GoogleLoginContainer from "./components/googleLogin";
import { loadGoogleScript } from "./loadGoogleScript";
declare global {
	interface Window {
		onGoogleScriptLoad: any;
		gapi: any;
	}
}

let googleClientId = "978011831169-psr0f5pbtpkcolhv1k4u453i47gmk7fk.apps.googleusercontent.com";
function App() {
	// const [gapi, setGapi] = useState();

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [imageUrl, setImageUrl] = useState();
	const [auth, setAuth] = useState<any>();

	useEffect(() => {
		// Window.gapi is available at this point
		window.onGoogleScriptLoad = () => {
			// (Ref. 1)

			//   const _gapi = window.gapi; // (Ref. 2)
			//   setGapi(_gapi);

			window.gapi.load("client:auth2", function () {
				window.gapi.auth2.init({ client_id: googleClientId }).then(() => {
					showLoginStatus();
					if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
						loadClient();
					}
				});
				// renderSigninButton(window.gapi); // (Ref. 6)
			});
		};

		// Ensure everything is set before loading the script
		loadGoogleScript(); // (Ref. 9)
	}, []);

	const handleLogin = () => {
		window.gapi.auth2
			.getAuthInstance()
			.signIn({ scope: "https://www.googleapis.com/auth/youtube" })
			.then(
				function () {
					console.log("Sign-in successful");
					setAuth(window.gapi.auth2.getAuthInstance());
					loadClient();
				},
				function (err: any) {
					console.error("Error signing in", err);
				}
			);
	};
	function loadClient() {
		return window.gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest").then(
			function () {
				console.log("GAPI client loaded for API");
			},
			function (err: any) {
				console.error("Error loading GAPI client for API", err);
			}
		);
	}
	const getPlaylists = () => {
		return window.gapi.client.youtube.playlists
			.list({
				part: ["snippet,contentDetails"],
				maxResults: 25,
				mine: true,
			})
			.then(
				function (response: any) {
					// Handle the results here (response.result has the parsed body).
					console.log(
						"Response",
						response.result.items.map((x: { id: any }) => x.id)
					);
				},
				function (err: any) {
					console.error("Execute error", err);
				}
			);
	};

	const getPlaylistVideos = () => {
		return window.gapi.client.youtube.playlistItems
			.list({
				part: ["snippet,contentDetails"],
				playlistId: "PL46AkwzLr8OkYzhPgICovKqtFzNcH4ohx",
			})
			.then(
				function (response: any) {
					// Handle the results here (response.result has the parsed body).
					console.log(response.result.items);
					console.log(
						"Response",
						response.result.items.map((x: { snippet: { title: any; resourceId: { videoId: any } } }) => ({
							title: x.snippet.title,
							videoId: x.snippet.resourceId.videoId,
						}))
					);
				},
				function (err: any) {
					console.error("Execute error", err);
				}
			);
	};

	const handleLogout = () => {
		window.gapi.auth2.getAuthInstance().signOut();
	};
	const showLoginStatus = () => {
		console.log("Signed in -> ", window.gapi.auth2.getAuthInstance().isSignedIn.get());
		console.log(window.gapi.auth2.getAuthInstance());
	};

	return (
		<>
			<Router>
				<SearchBar />
				<Switch>
					<Route exact path="/">
						<p style={{ textAlign: "center" }}>This is your home page!</p>
						<button onClick={handleLogin}>Sign in</button>
						<button onClick={loadClient}>Load Client</button>
						<button onClick={getPlaylists}>Get playlists</button>
						<button onClick={handleLogout}>Logout</button>
						<button onClick={showLoginStatus}>Show auth status</button>
						<button onClick={getPlaylistVideos}>Get videos</button>
						{/* <GoogleLoginContainer /> */}
					</Route>

					<Route
						path={"/search/:searchId"}
						render={({ match }) => {
							return <VideoGrid search={match.params.searchId} />;
							// return (
							// 	<p>
							// 		Save it to prevent data quota limit being
							// 		reached - {match.params.searchId}
							// 	</p>
							// );
						}}
					/>
					<Route
						path={"/video/:videoId"}
						render={({ match }) => {
							return <VideoResult videoId={match.params.videoId} />;
						}}
					/>
					<Route path={"/popular"} render={() => <VideoGrid search={true} />} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
