import { useEffect, useState } from "react";
import { CLIENTID } from "./components/key";
import { loadGoogleScript } from "./loadGoogleScript";

declare global {
	interface Window {
		onGoogleScriptLoad: any;
		gapi: any;
	}
}

function GoogleSSO() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [auth, setAuth] = useState<any | null>(null);
	const [googleUser, setGoogleUser] = useState<any | null>(null);

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

	// https://developers.google.com/identity/sign-in/web/listeners -> usage examples
	// https://developers.google.com/identity/sign-in/web/reference#googleauthcurrentuserget -> documentation
	useEffect(() => {
		// Window.gapi is available at this point
		window.onGoogleScriptLoad = () => {
			window.gapi.load("client:auth2", function () {
				window.gapi.auth2.init({ client_id: CLIENTID }).then(() => {
					let initauth = window.gapi.auth2.getAuthInstance();

					initauth.isSignedIn.listen(setIsLoggedIn);
					initauth.currentUser.listen(setGoogleUser);
					let initLoginStatus = initauth.isSignedIn.get();

					let initUser = initauth.currentUser.get();
					setGoogleUser(initUser);

					setAuth(initauth);
					loadClient().then(() => {
						setIsLoggedIn(initLoginStatus); //moved to here to ensure user makes an api call only after the libraries are loaded.
					});
				});
			});
		};

		// Ensure everything is set before loading the script
		loadGoogleScript(); // (Ref. 9)
	}, []);

	const handleSignInChange = (val: boolean) => {
		console.log("Login status Changed to", val);
		setIsLoggedIn(val);
	};
	const handleUserChange = (user: any) => {
		console.log("user changed", user);
		setGoogleUser(user);
	};

	const handleLogin = () => {
		auth.signIn({ scope: "https://www.googleapis.com/auth/youtube" }).then(
			function () {
				console.log("Sign-in successful");
			},
			function (err: any) {
				console.error("Error signing in", err);
			}
		);
	};

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
		auth.signOut();
	};
	const showLoginStatus = () => {
		console.log("Signed in -> ", auth.isSignedIn.get());

		if (isLoggedIn) {
			console.log(googleUser.getBasicProfile().getName());
			console.log(googleUser.getBasicProfile().getEmail());
		}
		// console.log(window.gapi.auth2.getAuthInstance());
	};

	return (
		<div>
			<p>User Logged in - {isLoggedIn.toString()}</p>

			<button onClick={handleLogin}>Sign in</button>
			{/* <button onClick={loadClient}>Load Client</button> */}
			<button onClick={getPlaylists}>Get playlists</button>
			<button onClick={handleLogout}>Logout</button>
			<button onClick={showLoginStatus}>Show auth status</button>
			<button onClick={getPlaylistVideos}>Get videos</button>
		</div>
	);
}

export default GoogleSSO;
