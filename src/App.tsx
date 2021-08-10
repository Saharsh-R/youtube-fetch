import SearchBar from "./components/searchBar";
import VideoGrid from "./components/VideoGrid";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import VideoResult from "./components/videoResult";
import GoogleSSO from "./GoogleSSO";

function App() {
	return (
		<>
			<Router>
				<SearchBar />
				<Switch>
					<Route exact path="/">
						<p style={{ textAlign: "center" }}>This is your home page!</p>
						<GoogleSSO />
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
