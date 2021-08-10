import SearchBar from "./components/searchBar";
import VideoGrid from "./components/VideoGrid";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import VideoResult from "./components/videoResult";
import GoogleSSO from "./googleAuth/GoogleSSO";
import { useState } from "react";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<>
			<Router>
				<SearchBar />
				<Switch>
					<Route exact path="/">
						<p style={{ textAlign: "center" }}>This is your home page!</p>
						<GoogleSSO isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn}/>
					</Route>
					<Route
						path={"/search/:searchId"}
						render={({ match }) => {
							return <VideoGrid search={match.params.searchId} />;
							// return <p style={{ textAlign: "center" }}>Search stopped. Save quota for - {match.params.searchId}</p>;
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
