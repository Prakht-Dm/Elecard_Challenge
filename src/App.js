import './App.css';
import {CARD_LIST} from './API';
import {useState} from 'react'

function App() {
  const [cardList, setCardList] = useState();
  function isContentLoaded(){
    if (CARD_LIST.list) {
      setCardList(CARD_LIST);
      clearInterval(loadingInterval);
  }
}
  let loadingInterval = setInterval(()=> isContentLoaded(), 100);
  return (
   
<main className="main-container">
  <header className="main-header"><p
  onClick={()=>{console.log({cardList})}}>Elecard Challenge</p>
  </header>
  <div className="main-content">
  <div>
    <Filters/>
  </div>
    <Cards/>


  </div>
  <footer className="main-footer">FOOTER</footer>
</main>

  );
}

export default App;

function Cards(){
  if (CARD_LIST.list === undefined)
  return(

    <div className = "loader">Loading...</div>

  )
  return(
    <div className="card_list">

      <div className='card_content'> 
      <img src='http://contest.elecard.ru/frontend_data/animals/animals-2939726__480.jpg' alt="avatar"></img>
      <p>Date size</p>
      <button>X</button>    
      </div>
     
      <div className='card_content'> 
      <img src='http://contest.elecard.ru/frontend_data/animals/animals-2939726__480.jpg' alt="avatar"></img>
      <p>Date size</p>
      <button>X</button>    
      </div>
     
      <div className='card_content'> 
      <img src='http://contest.elecard.ru/frontend_data/animals/animals-2939726__480.jpg' alt="avatar"></img>
      <p>Date size</p>
      <button>X</button>    
      </div>
     
      <div className='card_content'> 
      <img src='http://contest.elecard.ru/frontend_data/animals/animals-2939726__480.jpg' alt="avatar"></img>
      <p>Date size</p>
      <button>X</button>    
      </div>
     
      <div className='card_content'> 
      <img src='http://contest.elecard.ru/frontend_data/animals/animals-2939726__480.jpg' alt="avatar"></img>
      <p>Date size</p>
      <button>X</button>    
      </div> 
    </div>
  )
}


export function Filters(){
 return(
  <div className = "filters">
<button className = "clear_filters">Вернуть карточки</button> 
<p>Тип сортировки:</p>
<label
    onChange={()=>{}}>
      <input type="radio" defaultChecked/>
           {` По категории`}
    </label>
    <label
    onChange={()=>{}}>
      <input type="radio"/>
           {` По дате`}
    </label>
    <label
    onChange={()=>{}}>
      <input type="radio"/>
           {` По названию`}
    </label>
    <label
    onChange={()=>{}}>
      <input type="radio"/>
           {` По размеру`}
    </label>

<p>Вид:</p>

<label
    onChange={()=>{}}>
      <input type="radio" defaultChecked/>
           {` Карточки`}
    </label>
    <label
    onChange={()=>{}}>
      <input type="radio"/>
           {` Список`}
    </label>

    <div className = "navigation"> 
<button>Назад</button>
<button>Вперед</button>
<p>1 из 100</p></div>
</div>

 )
  }
  function uncheck()
{
 var uncheck=document.getElementsByTagName('input');
 for(var i=0;i<uncheck.length;i++)
 {
  if(uncheck[i].type=='checkbox')
  {
   uncheck[i].checked=false;
  }
 }
}