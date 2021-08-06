import { useEffect, useState } from "react";
import VideoSearch, { HasSearchInfo } from "./VideoSearch";

interface VideoProps {
	search: string;
}



function VideoGrid({ search }: VideoProps) {
	const [data, setData] = useState<HasSearchInfo[] | []>([]);
	let apikey = "AIzaSyAElABuu8vnfABl4eKiIF6YX0xwNPnN1Os";
	useEffect(() => {
		if (search !== "") {
			fetch(
				`https://www.googleapis.com/youtube/v3/search?key=${apikey}&type=video&q=${encodeURI(
					search
				)}&part=snippet&maxResults=1`
			)
				.then((r) => r.json())
				.then((response ) => setData(response.items));
		}
	}, [apikey, search]); //apikey will never change. just to remove the warning, it has been put here.
	return (
		<>
			<h2>VideoGrid</h2>
			<p>Showing search results for - <strong>{decodeURI(search)}</strong></p>
            {data.map(x => <VideoSearch key = {x.id.videoId} videoData = {x}/>)}
		</>
	);
}

export default VideoGrid;
