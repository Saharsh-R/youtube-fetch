import { useEffect, useState } from "react";
import { APIKEY, CLIENTID } from "./key";
import { loadGoogleScript } from "../loadGoogleScript";
import "./googleLogin.scss";
import googleImage from "./googleLoginButton.svg";
declare global {
	interface Window {
		onGoogleScriptLoad: any;
		gapi: any;
	}
}

export interface HasLoginDetails {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function GoogleSSO({ isLoggedIn, setIsLoggedIn }: HasLoginDetails) {
	const [auth, setAuth] = useState<any | null>(null);
	const [googleUser, setGoogleUser] = useState<any | null>(null);

	function loadClient() {
		window.gapi.client.setApiKey(APIKEY);
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
					// console.log(initUser.getBasicProfile())
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
	}, [setIsLoggedIn]); //it will never change. So do we need to include it here?

	// const handleSignInChange = (val: boolean) => {
	// 	//used for debugging.
	// 	console.log("Login status Changed to", val);
	// 	setIsLoggedIn(val);
	// };

	// const handleUserChange = (user: any) => {
	// 	console.log("user changed", user);
	// 	setGoogleUser(user);
	// };

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

	const handleLogout = () => {
		auth.signOut();
	};

	// const showLoginStatus = () => {
	// 	console.log("Signed in -> ", auth.isSignedIn.get());

	// 	if (isLoggedIn) {
	// 		console.log(googleUser.getBasicProfile().getName());
	// 		console.log(googleUser.getBasicProfile().getEmail());
	// 	}
	// 	// console.log(window.gapi.auth2.getAuthInstance());
	// };

	const handleLoginStatusChange = () => {
		if (isLoggedIn) {
			handleLogout();
		} else {
			handleLogin();
		}
	};

	return (
		<div className="mainLoginContainer" onClick={handleLoginStatusChange}>
			{isLoggedIn ? (
				<>
					<img className="imgLogin" src={googleUser.getBasicProfile().getImageUrl()} alt="" />
					<div className="loginLogoutText" style={{ color: "red" }}>
						Logout
					</div>
				</>
			) : (
				<>
					<img className="imgLogin" src={googleImage} alt="" />
					<div className="loginLogoutText">Login</div>
				</>
			)}
		</div>
	);
}

export default GoogleSSO;
