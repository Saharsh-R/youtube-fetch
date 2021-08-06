import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/searchBar";
import VideoGrid from "./components/VideoGrid";

function App() {
	const [search, setSearch] = useState("");
	return (
		<>
			<h1>Youtube</h1>
			<SearchBar search={search} setSearch={setSearch} />
			<VideoGrid search={search} />
		</>
	);
}

export default App;
