export function timeDifference(previous: string) {
	let current = new Date();
	let prevDate = new Date(previous);
	var msPerMinute = 60 * 1000;
	var msPerHour = msPerMinute * 60;
	var msPerDay = msPerHour * 24;
	var msPerMonth = msPerDay * 30;
	var msPerYear = msPerDay * 365;

	var elapsed = current.valueOf() - prevDate.valueOf();

	if (elapsed < msPerMinute) {
		let z = Math.round(elapsed / 1000);
		return z + ` second${z === 1 ? "" : "s"} ago`;
	} else if (elapsed < msPerHour) {
		let z = Math.round(elapsed / msPerMinute);
		return z + ` minute${z === 1 ? "" : "s"} ago`;
	} else if (elapsed < msPerDay) {
		let z = Math.round(elapsed / msPerHour);
		return z + ` hour${z === 1 ? "" : "s"} ago`;
	} else if (elapsed < msPerMonth) {
		let z = Math.round(elapsed / msPerDay);
		return z + ` day${z === 1 ? "" : "s"} ago`;
	} else if (elapsed < msPerYear) {
		let z = Math.round(elapsed / msPerMonth);
		return z + ` month${z === 1 ? "" : "s"} ago`;
	} else {
		let z = Math.round(elapsed / msPerYear);
		return z + ` year${z === 1 ? "" : "s"} ago`;
	}
}

export function YTDurationToSeconds(duration: string) {
	var matching = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
	if (matching) {
		let match = matching.slice(1).map(function (x) {
			if (x != null) {
				return x.replace(/\D/, "");
			}
			return "";
		});
		var hours = parseInt(match![0]) || 0;
		var minutes = parseInt(match![1]) || 0;
		var seconds = parseInt(match![2]) || 0;

		let totalseconds = hours * 3600 + minutes * 60 + seconds;
		let hhmmss = new Date(totalseconds * 1000).toISOString().substr(11, 8);
		if (hhmmss.substr(0, 2) === "00") {
			let mmss = hhmmss.substr(3);
			return mmss[0] === "0" ? mmss.substr(1) : mmss;
		}
		return hhmmss[0] === "0" ? hhmmss.substr(1) : hhmmss;
	}
}

export function unSignedNumberWithCommas(x: string) {
	return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function convertToDateString(x: string) {
	return new Date(x).toDateString();
}

export function numShortFormatter(numString : string) {
	let num = parseInt(numString)
    let l = ['', 'K', 'M', 'B', 'T']
    for (let i = 0; i < 5; i ++){
        if (num < 1000){
            return Math.floor(num) + l[i]
        }
        num /= 1000
    }
    return num.toFixed(0) + 'T'
}