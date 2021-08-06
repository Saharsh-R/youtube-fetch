import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/searchBar";
import VideoGrid from "./components/VideoGrid";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import VideoResult from "./components/videoResult";
function App() {
	const [search, setSearch] = useState("");

	return (
		<>
			<Router>
				<Link to={`/`}>
					<h1>Youtube</h1>
				</Link>
				<SearchBar search={search} setSearch={setSearch} />
				<Switch>
					<Route
						path={"/search/:searchId"}
						render={({ match }) => {
							return <VideoGrid search={match.params.searchId} />;
						}}
					/>
					<Route
						path={"/video/:videoId"}
						render={({ match }) => {
							return (
								<VideoResult videoId={match.params.videoId} />
							);
						}}
					/>
				</Switch>
			</Router>
		</>
	);
}

export default App;
