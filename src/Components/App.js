import '../css/App.css';
import {CARD_LIST} from '../API/list_loading';
import {DEFAULT_FILTERS} from '../storage/consts'
import {useState, useEffect} from 'react';
import {createCurrentList} from '../helpers/utils';
import {Filters} from './filters/filters';
import {Cards} from './cards/cards';

function App() {
  const [currentCardList, setCurrentCardList] = useState('');
  const [fiters, setFilters] = useState({...DEFAULT_FILTERS});

    useEffect(() => {
      const loadingInterval = setInterval(()=> createCurrentList(CARD_LIST.list, 
        loadingInterval, currentCardList, setCurrentCardList), 0);
    }, []);

  return (
   
<main className="main-container">
  <header className="main-header"><p
  onClick={()=>{console.log({currentCardList})}}>Elecard Challenge</p>  
  {/* удалить логирование */}
  </header>
  <div className="main-content">
  <div>
    <Filters
       currentCardList = {currentCardList}
       setCurrentCardList = {setCurrentCardList}/>
  </div>
    <Cards
    list = {CARD_LIST.list}
    currentCardList = {currentCardList}
    setCurrentCardList = {setCurrentCardList}
    />
    

  </div>
  <footer className="main-footer">FOOTER</footer>
</main>

  );
}

export default App;





