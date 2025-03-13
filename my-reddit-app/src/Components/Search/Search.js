import React, { useState } from "react";
import { FaSearch} from 'react-icons/fa';  
import './Search.css';




const Search = ( { onSearch } ) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    }

    return (
        <div className="searchBar-container">
            <form className='searchBar' onSubmit={handleSubmit}>
                    <input 
                        type='text'
                        placeholder='Search...'
                        className='searchInput'
                        value={query}
                        onChange={handleInputChange}    
                    />
                    <button className='searchButton' type='submit'>
                        <FaSearch className='icon search-icon'/>
                    </button>
                </form>
        </div>
    );
};

export default Search;