import "../css/App.css";
import { CARD_LIST } from "../API/list_loading";
import { DEFAULT_FILTERS } from "../storage/consts";
import { useState, useEffect } from "react";
import { createCurrentList } from "../helpers/utils";
import { Filters } from "./filters/filters";
import { Cards } from "./cards/cards";

function App() {
  const [currentCardList, setCurrentCardList] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  useEffect(() => {
    const loadingInterval = setInterval(
      () =>
        createCurrentList(
          CARD_LIST.list,
          loadingInterval,
          currentCardList,
          setCurrentCardList
        ),
      0
    );
  }, []);

  return (
    <main className="main-container">
      <header className="main-header">
        <p>
          Elecard Challenge
        </p>
      </header>
      <div className="main-content">
        <div>
          <Filters
            filters={filters}
            setFilters={setFilters}
            currentCardList={currentCardList}
            setCurrentCardList={setCurrentCardList}
          />
        </div>
        <Cards
          filters={filters}
          currentCardList={currentCardList}
          setCurrentCardList={setCurrentCardList}
        />
      </div>
      <footer className="main-footer">FOOTER</footer>
    </main>
  );
}

export default App;