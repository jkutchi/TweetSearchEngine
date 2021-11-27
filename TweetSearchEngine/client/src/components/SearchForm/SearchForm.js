import { Component, useState } from "react";
import Autocomplete from "react-autocomplete";
import "./SearchForm.css";
import axios from 'axios';

function SearchForm() {

    const host = window.location.hostname;
    const port = 5000;
    var [suggestions, setSuggestions] = useState([]);
    var [query, setQuery] = useState('');

    function handleTweetSearch(e) {
        setQuery(e.currentTarget.value);
        axios.get(`http://${host}:${port}/search/${query}`).then((res) => {
            setSuggestions(res.data);
        });
    };

    const inputStyle = { 
      padding: '15px',
      fontSize: '18px',
      border: '1px solid gray',
      float: 'left',
      width: '69%',
      background: '#f1f1f1',
      borderRadius: '25px',
      marginRight: '15px',
    }

    return (
        <form className="search" action="" method="get">
            <Autocomplete 
              items={suggestions}
              wrapperStyle={{style: inputStyle}}
              inputProps={{style: inputStyle}}
              onChange={handleTweetSearch}
              value={query}
              getItemValue={item => item._source.text}
              renderItem={(item, isHighlighted) =>
                <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                  {item._source.text}
                </div>
              }
              onSelect={query => setQuery(query)}
            />
            
            <button
                type="submit"
            >
                <i className="fa fa-search"></i>
            </button>
        </form>
    )
}

export default SearchForm;