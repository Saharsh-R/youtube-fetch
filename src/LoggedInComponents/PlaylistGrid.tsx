import { useEffect, useState } from "react";
import { getPlaylists } from "./LoggedInHelperFunctions";
import { useHistory } from "react-router-dom";
import { UserPlaylist } from "./PlaylistInterfaces";
import './playListGrid.scss'

function PlaylistGrid() {
	const [playlistsIdArray, setPlaylistsIdArray] = useState<UserPlaylist[]>([]);
	let history = useHistory();
	useEffect(() => {
		getPlaylists()
			.then((x: any) => {
				if (x !== null) {
					setPlaylistsIdArray(x);
				}
			})
			.catch((e: any) => console.log(e));
	}, []);

	const handlePlaylistRedirect = (playListId: string) => {
		history.push(`/playlist/${playListId}`);
	};

	return (
		<div className="playListGridResultWhole">
			<div>
				<h1 > <span style ={{textDecoration: 'underline'}}>Playlists</span>  - </h1>
			</div>
			
			<div className="playListGrid">
				{playlistsIdArray.map((x) => {
					return (
						<div key = {x.id} className = 'playListGridItem' >
							<div className = 'youTubeImageContainer'>
								<img src={x.snippet.thumbnails.high.url} alt="" className = 'youTubeImage' onClick={() => handlePlaylistRedirect(x.id)}/>
							</div>
							<div>
								<h2 className = 'playListGridTitle'>{x.snippet.title}</h2>
							</div>
							<div className = 'playListGridCount'>This playlist has <strong>{x.contentDetails.itemCount} vidoes</strong></div>
							<hr />
							<p className = 'playListGridDescription'>{x.snippet.description}</p>
						</div>
					);
				})}

				{/* {data.map((x) => {
					return <VideoSearch key={x.id} videoData={x} />;
				})} */}
			</div>
		</div>
	);
	// 	return (

	// 		<div style={{ padding: "40px" }}>
	// 			<h1>List of playlists of the user</h1>
	// 			<ul>
	// 				{playlistsIdArray.map((x) => (
	// 					<li key={x.id}>
	// 						<button style={{ padding: "50px" }} onClick={() => handlePlaylistRedirect(x.id)}>
	// 							{" "}
	// 							{x.snippet.title}
	// 						</button>
	// 						<p>
	// 							Description - <strong>{x.snippet.description}</strong>{" "}
	// 						</p>
	// 					</li>
	// 				))}
	// 			</ul>
	// 			{/* {JSON.stringify(playlistsIdArray, null, 2)} */}
	// 		</div>
	// 	);
}
export default PlaylistGrid;
