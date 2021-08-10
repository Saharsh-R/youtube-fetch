import SearchBar from "./components/searchBar";
import VideoGrid from "./components/VideoGrid";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import VideoResult from "./components/videoResult";
import { useState } from "react";
import PlaylistGrid from "./LoggedInComponents/PlaylistGrid";
import PlaylistVideosDisplay from "./LoggedInComponents/PlaylistVideosDisplay";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<>
			<Router>
				<SearchBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
				<Switch>
					<Route exact path="/">
						<p style={{ textAlign: "center" }}>This is your home page!</p>
						{/* below line run only when user is logged in */}
						{isLoggedIn ? <PlaylistGrid /> : <p>Log in to see your playlists here!</p> } 
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
					<Route
						path={"/playlist/:playlistId"}
						render={({ match }) => {
							if (isLoggedIn) {
								return <PlaylistVideosDisplay playlistId={match.params.playlistId} />;
							} else{
								return <p>You need to log in to see this.</p>
							}
						}}
					/>
					<Route path={"/popular"} render={() => <VideoGrid search={true} />} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
