import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlaylistVideos } from "./LoggedInHelperFunctions";
import { PlaylistVideo } from "./PlaylistInterfaces";

interface HasPlaylistId {
	playlistId: string;
}

function PlaylistVideosDisplay({ playlistId }: HasPlaylistId) {
	const [videoItems, setVideoItems] = useState<PlaylistVideo[]>([]);

	useEffect(() => {
		getPlaylistVideos(playlistId)
			.then((x: any) => {
				if (x !== null) {
					setVideoItems(x);
				}
			})
			.catch((e: any) => console.log(e));
	}, [playlistId]);

	return (
		<div style={{ padding: "40px" }}>
			<h2>Videos in the playlist of id {playlistId}</h2>
			<ul>
				{videoItems.map((x) => (
					<li key={x.id}>
						<h4>{x.snippet.title}</h4>
						<Link to={`/video/${x.snippet.resourceId.videoId}`}>
							<img src={`https://img.youtube.com/vi/${x.snippet.resourceId.videoId}/mqdefault.jpg`} alt="" />
						</Link>
					</li>
				))}
			</ul>
			{/* {JSON.stringify(playlistsIdArray, null, 2)} */}
		</div>
	);
}
export default PlaylistVideosDisplay;
