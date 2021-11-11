import SearchBar from '../SearchBar/SearchBar';
import Title from '../Title/Title';
import "./App.css";

function App() {
  return (
    <div className="flex-center position-ref full-height">
        <div className="title">
          <Title/>
        </div>
        <SearchBar />
      </div>
  );
}

export default App;
