export function getPlaylists() {
	return window.gapi.client.youtube.playlists
		.list({
			part: ["snippet,contentDetails"],
			maxResults: 25,
			mine: true,
		})
		.then(
			function (response: any) {
				// Handle the results here (response.result has the parsed body).

				return response.result.items.map((x: { id: any; snippet: { title: any; description: any } }) => ({
					id: x.id,
					title: x.snippet.title,
					description: x.snippet.description,
				}));
			},
			function (err: any) {
				console.error("Execute error", err);
			}
		);
}

export function getPlaylistVideos(playlistId: string) {
	return window.gapi.client.youtube.playlistItems
		.list({
			part: ["snippet,contentDetails"],
			playlistId,
		})
		.then(
			function (response: any) {
				// Handle the results here (response.result has the parsed body).

				return response.result.items.map((x: { snippet: { title: any; resourceId: { videoId: any } } }) => ({
					title: x.snippet.title,
					videoId: x.snippet.resourceId.videoId,
				}));
			},
			function (err: any) {
				console.error("Execute error", err);
			}
		);
}

// export const a = 'd'
