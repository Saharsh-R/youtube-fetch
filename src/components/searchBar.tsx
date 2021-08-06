import { useState } from "react";
import { Redirect } from "react-router-dom";

interface SearchProps {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
}

function SearchBar({ search, setSearch }: SearchProps) {
	const [input, setInput] = useState("");
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSearch(encodeURIComponent(input));
		setInput("");
	};
    // what???? How is this working????
	return (
		<>
            <Redirect push to={`/search/${search}`}/> 
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button type="submit">🔍</button>
			</form>
		</>
	);
}

export default SearchBar;
