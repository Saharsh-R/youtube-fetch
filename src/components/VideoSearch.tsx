import { Link } from "react-router-dom";
import { timeDifference } from "./helperFunctions";
import "./videoSearch.scss";
export interface HasSearchInfo {
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
}

interface VideoSearchProps {
	videoData: HasSearchInfo;
}
function VideoSearch({ videoData }: VideoSearchProps) {
	return (
		<div className="searchMainContainer">
			<div className = 'photoOuterContainer'>
				<div className="thumbnailContainer">
					<Link to={`/video/${videoData.id}`}>
						<img
							src={`https://img.youtube.com/vi/${videoData.id}/mqdefault.jpg`}
							alt=""
						/>
					</Link>
					<div className="videoDuration">1:24:42</div>
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
						<div>1M views</div>
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
	);
}

export default VideoSearch;
