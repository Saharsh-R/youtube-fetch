export interface UserPlaylist {
	kind: string; //"youtube#playlist"
	id: string; //PL46AkwzLr8OkYzhPgICovKqtFzNcH4ohx
	snippet: {
		publishedAt: string; // "2013-10-18T14:55:24Z";
		channelId: string; //"UCkplrPgJz05SKAICk4CPVvA"
		title: string; //"sso"
		description: string; //"Videos which helped in understanding google sso"
		thumbnails: {
			default: {
				url: string;
			},
			high: {
				url: string;
			}
		};
		channelTitle: string; //saharsh rathi
	};
	contentDetails: {
		itemCount: number; //number of videos in the playlist
	};
}

export interface PlaylistVideo {
	kind: string; //"youtube#playlistItem";
	etag: string; //"tkHeUqlpcHzDWDpa0x6nq2eGc_k";
	id: string; //"UExCQ0YyREFDNkZGQjU3NERFLkE2OTA3QzIwNEI3RjYxMDE";
	snippet: {
		publishedAt: string; // "2013-10-18T14:55:24Z";
		channelId: string; //"UCvceBgMIpKb4zK1ss-Sh90w";
		title: string; //"Andrew Willis, Skatepark Engineer";
		description: string; // "Andrew Willis built a skatepark in East London using reclaimed materials left over from the Olympic Games, creating a lasting legacy for the local community of Hackney Wick.";
		thumbnails: {
			default: {
				url: string; //"https://i.ytimg.com/vi/GvgqDSnpRQM/default.jpg";
			};
		};
		channelTitle: string; //"Google Search Stories";
		playlistId: string; //"PLBCF2DAC6FFB574DE";
		position: number; //0;
		resourceId: {
			kind: string; //"youtube#video";
			videoId: string; // "GvgqDSnpRQM";
		};
		videoOwnerChannelTitle: string; //"Google Search Stories";
		videoOwnerChannelId: string; //"UCvceBgMIpKb4zK1ss-Sh90w";
	};
	contentDetails: {
		videoId: string; //"GvgqDSnpRQM";
		videoPublishedAt: string; //"2013-10-18T07:03:29Z";
	};
}
