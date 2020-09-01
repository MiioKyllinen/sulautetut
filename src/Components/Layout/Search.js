import React, { useState } from 'react';
//import React from 'react';

function Search({onFilter}) {
    const initSearch = {title:''}
    const [addSearch, setSearch] = useState(initSearch);

    const handleFilter = (e) => {
        setSearch({[e.target.name]: e.target.value});
        onFilter(e.target.value)
    }
    
    return (
        <form style={{display: 'flex'}}>
            <input
                type="text"
                name="title"
                style={{flex:'10', padding: '5px'}}
                placeholder="Hae"
                value={addSearch.title}
                onChange={handleFilter}
            />
        </form>
    )
}


export default Search;