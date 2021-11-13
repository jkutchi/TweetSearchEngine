import SearchForm from '../SearchForm/SearchForm';
import Title from '../Title/Title';
import "./App.css";

function App() {
  return (
    <div className="flex-center position-ref full-height">
        <div className="title">
          <Title/>
        </div>
        <SearchForm />
      </div>
  );
}

export default App;
