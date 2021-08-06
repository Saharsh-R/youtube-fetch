import { useEffect, useState } from "react";

interface VideoUrl {
	videoId: string;
}

interface VideoData {
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
	};
	statistics: {
		viewCount: string;
	};
	contentDetails: {
		duration: string;
	};
}

function VideoResult({ videoId }: VideoUrl) {
	const [data, setData] = useState<VideoData | null>(null);
	let apikey = "AIzaSyAElABuu8vnfABl4eKiIF6YX0xwNPnN1Os";

	useEffect(() => {
		fetch(
			`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apikey}&part=snippet,contentDetails,statistics,status`
		)
			.then((x) => x.json())
			.then((r) => setData(r.items[0]));
	}, [apikey, videoId]);
	if (data === null) {
		return <p>Loading</p>;
	} else {
		console.log(data);
		return (
			<div>
				<iframe
					title={data.snippet.title}
					id="video"
					src={`https://www.youtube.com/embed/${videoId}`}
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
                <h2>{data.snippet.title}</h2>
				<p>{data.snippet.description}</p>
			</div>
		);
	}
}

export default VideoResult;
