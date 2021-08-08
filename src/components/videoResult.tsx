import { useEffect, useState } from "react";
import {
	convertToDateString,
	timeDifference,
	unSignedNumberWithCommas,
} from "./helperFunctions";
import APIKEY from "./key";
import "./videoResult.scss";

interface VideoUrl {
	videoId: string;
}

export interface VideoData {
	id: string;
	snippet: {
		publishedAt: string;
		title: string;
		description: string;
		thumbnails: {
			default: {
				url: string;
			};
			high: {
				url: string;
			};
		};
		channelTitle: string;
	};
	statistics: {
		viewCount: string;
		likeCount: string;
		dislikeCount: string;
	};
	contentDetails: {
		duration: string;
	};
}

function VideoResult({ videoId }: VideoUrl) {
	const [data, setData] = useState<VideoData | null>(null);

	useEffect(() => {
		console.log(`%c Fetching for player, videoid -> ${videoId}`, "color: MediumSpringGreen");
		fetch(
			`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${APIKEY}&part=snippet,contentDetails,statistics,status`
		)
			.then((x) => x.json())
			.then((r) => setData(r.items[0]));
	}, [videoId]);
	if (data == null) {
		return <p>Loading</p>;
	} else {
		return (
			<div className="fullVideoPlay">
				<div className="videoContainer">
					<iframe
						title={data.snippet.title}
						className="videoPlayer"
						src={`https://www.youtube.com/embed/${videoId}`}
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				</div>
				<div className="infoBelowPlayer">
					<div className="infoTitle">
						<h2>{data.snippet.title}</h2>
					</div>
					<div className="statsBar">
						<div>
							<div>
								👁️{" "}
								{unSignedNumberWithCommas(
									data.statistics.viewCount
								)}{" "}
								views
							</div>
							<div>
								🗓️{" "}
								{convertToDateString(data.snippet.publishedAt)}
							</div>
						</div>
						<div>
							<div>
								👍{"  "}
								{unSignedNumberWithCommas(
									data.statistics.likeCount
								)}
							</div>
							<div>
								👎{"  "}
								{unSignedNumberWithCommas(
									data.statistics.dislikeCount
								)}
							</div>
						</div>
					</div>
					<div className="channelInfo">
						<div>
							<strong>{data.snippet.channelTitle}</strong>{" "}
							uploaded this video{" "}
							<strong>
								{timeDifference(data.snippet.publishedAt)}
							</strong>
						</div>
						<hr />
					</div>
					<div className="videoDescriptionPlayer">
						<p>{data.snippet.description}</p>
					</div>
				</div>
			</div>
		);
	}
}

export default VideoResult;
