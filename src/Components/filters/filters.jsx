import {CARD_LIST} from '../../API/list_loading';
export function Filters( {currentCardList, setCurrentCardList}){
    return(
     <div className = "filters">

   <p>Вид:</p>
   <label
       onChange={()=>{}}>
         <input type="radio" defaultChecked/>
              {` Карточки`}
       </label>
       <label
       onChange={()=>{}}>
         <input type="radio"/>
              {`Дерево`}
       </label>
     <SortCardsBlock
        currentCardList = {currentCardList}
        setCurrentCardList = {setCurrentCardList}/>
   </div>
    )
     }
   
   
   function SortCardsBlock({currentCardList, setCurrentCardList}){
     return(
       <div className='sort_block not_available' onClick={()=>alert("lol")}>
        <button className = "clear_filters"
        onClick={()=>{localStorage.removeItem('Deleted_cards');
        setCurrentCardList([...CARD_LIST.list]);}
        }>Вернуть карточки</button>
{/* 
вынесты в отдельную функцию
 */}

       <p>Тип сортировки:</p>
       <label
           >
             <input type="radio" value = '1'
             checked={"1" === '1' ? true : false}
             onChange={()=>{}}/>
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
       
       <div className='sort_direction'>
         <p>Направление сортировки</p>
       <label
           onChange={()=>{}}>
             <input type="radio" defaultChecked/>
                  {` По возрастанию`}
           </label>
           <label
           onChange={()=>{}}>
             <input type="radio"/>
                  {` По убыванию`}
           </label>
       </div>
       
           <div className = "navigation"> 
       <button>Назад</button>
       <button>Вперед</button>
       <p>1 из 100</p></div>
       </div>
     )
   }