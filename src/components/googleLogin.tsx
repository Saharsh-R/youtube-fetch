import { useState } from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from "react-google-login";

function ifResponseOkay(response: GoogleLoginResponse | GoogleLoginResponseOffline): response is GoogleLoginResponse {
	return (response as GoogleLoginResponse).accessToken !== undefined;
}

let clientId = "978011831169-psr0f5pbtpkcolhv1k4u453i47gmk7fk.apps.googleusercontent.com"
function GoogleLoginContainer() {
	const [data, setData] = useState<GoogleLoginResponse | null>(null);

	const handleSuccess = (r : any ) => {
		let response : GoogleLoginResponse = r
		console.log(response)
		// let aToken = response.accessToken
		setData(response)

	}


	const handleLogout = () => {
		setData(null)
		console.log('LOGOUT')
	}

	return (
		<div>
			<GoogleLogin
				clientId={clientId}
				buttonText="Login"
				onSuccess={handleSuccess}
				isSignedIn={true}
				cookiePolicy={"single_host_origin"}
			/>
			<pre>{data !== null ? JSON.stringify(data, null, 2) :  ''}</pre>
			<GoogleLogout
				clientId={clientId}
				buttonText="Logout"
				onLogoutSuccess={handleLogout}
			></GoogleLogout>

		</div>
	);
}

export default GoogleLoginContainer;
