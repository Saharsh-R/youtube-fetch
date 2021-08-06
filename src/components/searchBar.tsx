import { useState } from "react";
import { Link , useHistory} from "react-router-dom";
import  "./searchBar.scss";



function SearchBar() {
    let history = useHistory()
	const [input, setInput] = useState("");
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// setSearch(encodeURIComponent(input));
		setInput("");
        history.push(`/search/${encodeURIComponent(input)}`)
	};
	// what???? How is this working????
	return (
		<div className="searchBar">
			{/* <Redirect push to={`/search/${search}`} /> */}
			<Link to={`/`}  className = 'hoverHeading' style= {{color:"red"}}>
                <h1 className = 'heading'>YouTube</h1>
			</Link>
            <Link to={`/popular`}  className = 'hoverHeading' style= {{color:"black"}}>
                <h1 className = 'heading' style = {{color: 'red'}}>Trending</h1>
			</Link>
			<div className ='inputBarDiv'>
				<form onSubmit={handleSubmit} className = 'formInput'>
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<button type="submit">🔍</button>

				</form>
			</div>
		</div>
	);
}

export default SearchBar;
