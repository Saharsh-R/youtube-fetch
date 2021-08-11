import { useEffect, useState } from "react";
import { APIKEY } from "../googleAuth/key";
import VideoSearch from "./VideoSearch";
import "./styling/videoGrid.scss";
import { VideoData } from "./videoResult";
import { getVideoDetailsWithoutClientLoad } from "./helperFunctions";

interface VideoProps {
	search: string | true;
}

function VideoGrid({ search }: VideoProps) {
	const [data, setData] = useState<VideoData[]>([]);
	useEffect(() => {
		if (search !== "") {
			console.log(`%c Fetching for videoGrid, search -> ${search}`, "color: tomato");
			fetch(
				`https://www.googleapis.com/youtube/v3/${search === true ? "videos" : "search"}?key=${APIKEY}&type=video&${
					search === true ? "chart=mostPopular" : `q=${search}`
				}&part=snippet&maxResults=20`
			)
				.then((r) => r.json())
				.then((response) => {
					if (response.items) {
						return response.items.map((x: { id: { videoId: any } }) => (typeof x.id === "string" ? x.id : x.id.videoId));
					}
				})
				.then((videoIdArray) => videoIdArray.join(","))
				.then((id) => getVideoDetailsWithoutClientLoad(id).then(setData))
				// .then((id) => getVideoDetails(id).then(setData))
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
						Showing search results for - <strong>{decodeURI(search)}</strong>
					</p>
				)}
			</div>
			<div className="videoResultGrid">
				{data.map((x) => {
					return <VideoSearch key={x.id} videoData={x} />;
				})}
			</div>
		</div>
	);
}

export default VideoGrid;
