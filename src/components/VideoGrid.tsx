import { useEffect, useState } from "react";
import APIKEY from "./key";
import VideoSearch, { HasSearchInfo } from "./VideoSearch";
import "./videoGrid.scss";

interface VideoProps {
	search: string | true;
}

function VideoGrid({ search }: VideoProps) {
	const [data, setData] = useState<HasSearchInfo[] | []>([]);
	useEffect(() => {
		if (search !== "") {
			console.log(`%c Fetching for videoGrid, search -> ${search}`, "color: tomato");
			fetch(
				`https://www.googleapis.com/youtube/v3/${
					search === true ? "videos" : "search"
				}?key=${APIKEY}&type=video&${
					search === true ? "chart=mostPopular" : `q=${search}`
				}&part=snippet&maxResults=3`
			)
				.then((r) => r.json())
				.then((response) => {
					if (response.items) {
						setData(response.items);
					}
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, [search]);

	if (data.length === 0) {
		return <></>;
	}

	return (
		<div className="videoGridResultWhole">
			<div className="resultDescription">
				{search === true ? (
					<p> Here are the most popular videos. </p>
				) : (
					<p>
						Showing search results for -{" "}
						<strong>{decodeURI(search)}</strong>
					</p>
				)}
			</div>
			<div className="videoResultGrid">
				{data.map((x) => {
					let videoId = typeof x.id === 'string' ? x.id : x.id.videoId
					return <VideoSearch key={ videoId} videoData={x} />
				})}
			</div>
		</div>
	);
}

export default VideoGrid;
