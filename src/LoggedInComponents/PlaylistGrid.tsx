import { useEffect, useState } from "react";
import { getPlaylists } from "./LoggedInHelperFunctions";
import { useHistory } from "react-router-dom";

function PlaylistGrid() {
	const [playlistsIdArray, setPlaylistsIdArray] = useState<any>([]);
	let history = useHistory();
	useEffect(() => {
		getPlaylists()
			.then((x: any) => {
				if (x) {
					setPlaylistsIdArray(x);
				}
			})
			.catch((e: any) => console.log(e));
	}, []);

	const handlePlaylistRedirect = (playListId: string) => {
		console.log(playListId);
		history.push(`/playlist/${playListId}`);
	};
	console.log("render", playlistsIdArray);
	return (
		<div style={{ padding: "40px" }}>
			<h1>List of playlists of the user</h1>
			<ul>
				{playlistsIdArray.map((x: any) => (
					<li key={x.id}>
						<button style={{ padding: "50px" }} onClick={() => handlePlaylistRedirect(x.id)}>
							{" "}
							{x.title}
						</button>
						<p>
							Description - <strong>{x.description}</strong>{" "}
						</p>
					</li>
				))}
			</ul>
			{/* {JSON.stringify(playlistsIdArray, null, 2)} */}
		</div>
	);
}
export default PlaylistGrid;
