import { PlaylistVideo, UserPlaylist } from "./PlaylistInterfaces";

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

				return response.result.items as UserPlaylist[];
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

				return response.result.items as PlaylistVideo[];
			},
			function (err: any) {
				console.error("Execute error", err);
			}
		);
}
