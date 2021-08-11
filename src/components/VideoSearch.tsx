import { Link } from "react-router-dom";
import { numShortFormatter, timeDifference, YTDurationToSeconds } from "./helperFunctions";
import { VideoData } from "./videoResult";
import "./styling/videoSearch.scss";

interface VideoSearchProps {
	videoData: VideoData;
}

function VideoSearch({ videoData }: VideoSearchProps) {
	return (
		<div className="containerForShadow">
			<div className="searchMainContainer">
				<div className="photoOuterContainer">
					<div className="thumbnailContainer">
						<Link to={`/video/${videoData.id}`}>
							<img src={`https://img.youtube.com/vi/${videoData.id}/mqdefault.jpg`} alt="" />
						</Link>
						<div className="videoDuration">{YTDurationToSeconds(videoData.contentDetails.duration)}</div>
					</div>
				</div>
				<div className="videoInformationContainer">
					<div className="videoTopBar">
						<div>
							<h3 className="videoTitle">{videoData.snippet.title}</h3>
						</div>
						<div className="videoInfoBelowTitle">
							<div>{numShortFormatter(videoData.statistics.viewCount) + " views"}</div>
							<div>{videoData.snippet.channelTitle}</div>

							<div>{timeDifference(videoData.snippet.publishedAt)}</div>
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
