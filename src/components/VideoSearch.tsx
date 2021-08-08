import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	numShortFormatter,
	timeDifference,
	YTDurationToSeconds,
} from "./helperFunctions";
import APIKEY from "./key";
import { VideoData } from "./videoResult";
import "./videoSearch.scss";

type YoutubeApiSearchVsVideo = string | { videoId: string };
export interface HasSearchInfo {
	id: YoutubeApiSearchVsVideo;
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
}

interface VideoSearchProps {
	videoData: HasSearchInfo;
}

interface ViewAndDuration {
	views: string;
	duration: string;
}

function VideoSearch({ videoData }: VideoSearchProps) {
	let videoId =
		typeof videoData.id === "string" ? videoData.id : videoData.id.videoId;
	const [viewsAndDuration, setViewsAndDuration] =
		useState<ViewAndDuration | null>(null);
	useEffect(() => {
		console.log(
			`%c Fetching for duration and views, videoid -> ${videoId}`,
			"color: HotPink"
		);
		fetch(
			`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${APIKEY}&part=snippet,contentDetails,statistics,status`
		)
			.then((x) => x.json())
			.then((r) => r.items[0])
			.then((videoJSON: VideoData) => {
				let neededData = {
					views: videoJSON.statistics.viewCount,
					duration: videoJSON.contentDetails.duration,
				};
				setViewsAndDuration(neededData);
			});
	}, [videoId]);
	return (

		<div className='containerForShadow' >
			<div className="searchMainContainer">
				<div className="photoOuterContainer">
					<div className="thumbnailContainer">
						<Link to={`/video/${videoId}`}>
							<img
								src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
								alt=""
							/>
						</Link>
						<div className="videoDuration">
							{viewsAndDuration === null
								? "⌛"
								: YTDurationToSeconds(
										viewsAndDuration.duration
								  )}
						</div>
					</div>
				</div>
				<div className="videoInformationContainer">
					<div className="videoTopBar">
						<div>
							<h3 className="videoTitle">
								{videoData.snippet.title}
							</h3>
						</div>
						<div className="videoInfoBelowTitle">
							<div>
								{viewsAndDuration === null
									? "⌛"
									: numShortFormatter(
											viewsAndDuration.views
									  ) + " views"}
							</div>
							<div>{videoData.snippet.channelTitle}</div>

							<div>
								{timeDifference(videoData.snippet.publishedAt)}
							</div>
						</div>
					</div>
					<div className="videoDescription">
						<p>{videoData.snippet.description}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VideoSearch;
