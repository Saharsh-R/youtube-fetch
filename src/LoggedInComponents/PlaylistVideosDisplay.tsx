import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlaylistVideos } from "./LoggedInHelperFunctions";

interface HasPlaylistId {
	playlistId: string;
}
function PlaylistVideosDisplay({ playlistId }: HasPlaylistId) {
	const [videoItems, setVideoItems] = useState<any>([]);

	useEffect(() => {
		getPlaylistVideos(playlistId).then((x: any) => setVideoItems(x));
	}, []);

	return (
		<div style={{ padding: "40px" }}>
			<h2>Videos in the playlist of id {playlistId}</h2>
			<ul>
				{videoItems.map((x: any) => (
					<li key={x.videoId}>
                        <h4>{x.title}</h4>
						<Link to={`/video/${x.videoId}`}>
							<img src={`https://img.youtube.com/vi/${x.videoId}/mqdefault.jpg`} alt="" />
						</Link>
					</li>
				))}
			</ul>
			{/* {JSON.stringify(playlistsIdArray, null, 2)} */}
		</div>
	);
}
export default PlaylistVideosDisplay;
