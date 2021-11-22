import "./SearchForm.css";

function SearchForm() {
    var handleTweetSearch = (e) => {
        const searchTerm = e.currentTarget.value;
    }
    
    return (
        <form className="search" action="" method="get">
            <input
                type="text"
                id="search"
                placeholder="Search tweets"
                name="search"
                onChange={handleTweetSearch}
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