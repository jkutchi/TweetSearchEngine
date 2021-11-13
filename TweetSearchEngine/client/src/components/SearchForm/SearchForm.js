import "./SearchForm.css";

function SearchForm() {
    return (
        <form className="search" action="" method="get">
            <input
                type="text"
                id="search"
                placeholder="Search tweets"
                name="search"
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