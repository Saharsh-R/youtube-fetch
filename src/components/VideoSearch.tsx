import { Link } from "react-router-dom";

export interface HasSearchInfo {
	id: {
		videoId: string;
	};
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
		<>
			<Link to={`/video/${videoData.id.videoId}`}>
				<img src={videoData.snippet.thumbnails.high.url} alt="" />
			
			<h2>{videoData.snippet.title}</h2>
            </Link>
			<p>{videoData.snippet.description}</p>
			<h4>{videoData.snippet.channelTitle}</h4>
		</>
	);
}

export default VideoSearch;
