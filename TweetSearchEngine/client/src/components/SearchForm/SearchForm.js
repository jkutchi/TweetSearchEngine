import { useEffect, useState } from "react";
import Autocomplete from "react-autocomplete";
import "./SearchForm.css";
import axios from 'axios';
import { useLocation } from "react-router";

function SearchForm() {

    const host = window.location.hostname;
    const port1 = 3000;
    const port2 = 5000;
    var [suggestions, setSuggestions] = useState([]);
    var [query, setQuery] = useState('');

    const search = useLocation().search;

    function handleTweetSuggestions(e) {
      setQuery(e.currentTarget.value);
      if (e.currentTarget.value === "") {
        setSuggestions([]);
      } else {
        axios.get(`http://${host}:${port2}/search/${e.currentTarget.value}`).then((res) => {
            setSuggestions(res.data);
        });
    }
    }

    function onEnterKeyPressed(e) {
      console.log("test")
      if (e.key === "Enter") {
        goToResults();
      }
    }

    useEffect(() => {
      const tempQuery = new URLSearchParams(search).get('q');
      if (tempQuery != null || tempQuery != '')
      {
        setQuery(tempQuery);
      }
    }, []);

    function goToResults() {
      window.location.href = `http://${host}:${port1}/results/?page=1&q=${query}`;
    }

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
        <form className="search" method="get">
            <Autocomplete 
              items={suggestions}
              wrapperStyle={{style: inputStyle}}
              inputProps={{style: inputStyle}}
              onChange={handleTweetSuggestions}
              value={query}
              getItemValue={item => item._source.text}
              renderItem={(item, isHighlighted) =>
                <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                  {item._source.text}
                </div>
              }
              onSelect={query => setQuery(query)}
              onKeyPress={onEnterKeyPressed}
            />
            
            <button
                type="button"
                onClick={goToResults}
            >
                <i className="fa fa-search"></i>
            </button>
        </form>
    )
}

export default SearchForm;