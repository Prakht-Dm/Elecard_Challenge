import { useEffect } from 'react';
import {CARD_LIST} from '../../API/list_loading';
import {DEFAULT_FILTERS, AMOUNT_OF_CARDS} from '../../storage/consts'

export function Filters({filters, setFilters, currentCardList, setCurrentCardList}){

  useEffect(()=>{
    sortArray({filters, currentCardList, setCurrentCardList});
    setFilters ({...filters, ...{firstCardNumber: 0}});
}, [filters.SORT_TYPES, filters.SORT_DIRECTION]);

useEffect(()=>{
if (filters.firstCardNumber/AMOUNT_OF_CARDS+1 > 1 &&
filters.firstCardNumber/AMOUNT_OF_CARDS+1 > Math.ceil(currentCardList.length/AMOUNT_OF_CARDS)
) {
  setFilters ({...filters, ...{firstCardNumber: filters.firstCardNumber - AMOUNT_OF_CARDS}}); 
}
}, [currentCardList]);


    return(
     <div className = "filters">

   <p>Вид:</p>
   <label
       >
         <input type="radio" 
         onChange={()=>{setFilters({...filters,  ...{SORT_KIND:{cards: true, tree: false,}}}) 
         console.log({filters})}}
         checked = {filters.SORT_KIND.cards}/>
              {` Карточки`}
       </label>
       <label
       >
         <input type="radio"
         onChange={()=>{setFilters({...filters,  ...{SORT_KIND:{cards: false, tree: true,}}})}}
         checked = {filters.SORT_KIND.tree}/>
              {`Дерево`}
       </label>
     <SortCardsBlock
         filters = {filters}
         setFilters = {setFilters}
        currentCardList = {currentCardList}
        setCurrentCardList = {setCurrentCardList}/>
   </div>
    )
     }
   
   
   function SortCardsBlock({filters, setFilters, currentCardList, setCurrentCardList}){
    const classFilters = (filters.SORT_KIND.cards) ? 'sort_block' : 'sort_block not_available';
     return(
       <div className={classFilters} onClick={()=>console.log(CARD_LIST.categories)}>
        <button className = "clear_filters"
        onClick={()=>{if (filters.SORT_KIND.tree) return 
          localStorage.removeItem('Deleted_cards');
        setCurrentCardList([...CARD_LIST.list]);
        setFilters ({...DEFAULT_FILTERS})
        }
        }>Вернуть карточки</button>
{/* 
вынесты в отдельную функцию
 */}

       <p>Тип сортировки:</p>



       <label>
             <input type="radio"
             checked = {filters.SORT_TYPES.category}
             onChange={()=>{
              if (filters.SORT_KIND.tree) return
              setFilters({...filters,  ...{SORT_TYPES:{
              category: true,
              date: false,
              title: false,
              size: false,
          }}})
          }}/>
                  {` По категории`}
           </label>

           {/* <InputLine
           filter={filters.SORT_TYPES.category}
           setFilters = {setFilters}
           changingFilter={{SORT_TYPES:{
            category: true,
            date: false,
            title: false,
            size: false,
        }}}
         text = {` По категории`}/> */}


           <label>
             <input type="radio"
              onChange={()=>{
                if (filters.SORT_KIND.tree) return
                setFilters({...filters,  ...{SORT_TYPES:{
                category: false,
                date: true,
                title: false,
                size: false,
            }}});
            }}
             checked = {filters.SORT_TYPES.date}/>
                  {` По дате`}
           </label>



           <label>
             <input type="radio"
              onChange={()=>{
                if (filters.SORT_KIND.tree) return
                setFilters({...filters,  ...{SORT_TYPES:{
                category: false,
                date: false,
                title: true,
                size: false,
            }}})
            }}
             checked = {filters.SORT_TYPES.title}/>
                  {` По названию`}
           </label>



           <label>
             <input type="radio"
              onChange={()=>{
                if (filters.SORT_KIND.tree) return
                setFilters({...filters,  ...{SORT_TYPES:{
                          category: false,
                          date: false,
                          title: false,
                          size: true,
                      }}})
                      }}
                      checked = {filters.SORT_TYPES.size}/>
                  {` По размеру`}
           </label>
       
       <div className='sort_direction'>
         <p>Направление сортировки</p>


       <label>
             <input type="radio"
              onChange={()=>{
                if (filters.SORT_KIND.tree) return
                setFilters({...filters,  ...{SORT_DIRECTION:{
                up: true,
                down: false,
            }}})}}
            checked = {filters.SORT_DIRECTION.up}/>
                  {` По возрастанию`}
           </label>



           <label>
             <input type="radio"
             onChange={()=>{
              if (filters.SORT_KIND.tree) return
              setFilters({...filters,  ...{SORT_DIRECTION:{
              up: false,
              down: true,
          }}})}}
          checked = {filters.SORT_DIRECTION.down}/>
                  {` По убыванию`}
           </label>

       </div>
       
           <div className = "navigation"> 
       <button onClick={()=>{previouPage(filters, setFilters, currentCardList)}}>Назад</button>
       <button onClick={()=>{nextPage(filters, setFilters, currentCardList)}}>Вперед</button>
       <p>{filters.firstCardNumber/AMOUNT_OF_CARDS+1} из {Math.ceil(currentCardList.length/AMOUNT_OF_CARDS)}</p></div>
       </div>
     )
   }

   function nextPage(filters, setFilters, currentCardList){
    if (filters.SORT_KIND.cards && (filters.firstCardNumber  < currentCardList.length - AMOUNT_OF_CARDS)) {
      setFilters ({...filters, ...{firstCardNumber: filters.firstCardNumber+20}}); 
    }
  }
  function  previouPage(filters, setFilters, currentCardList){
    if (filters.SORT_KIND.cards && (filters.firstCardNumber  >= AMOUNT_OF_CARDS)) {
      setFilters ({... filters, ...{firstCardNumber: filters.firstCardNumber- AMOUNT_OF_CARDS}}); 
    }
  }




   function sortArray({filters, currentCardList, setCurrentCardList}){
     
    let newArray = [...currentCardList]; 
    
    if (filters.SORT_TYPES.category){
      if (filters.SORT_DIRECTION.up) {
        setCurrentCardList(newArray.sort(sortUpTitle).sort(sortUpCaregory))
        return
      }
      setCurrentCardList(newArray.sort(sortDownTitle).sort(sortDownCaregory))
    }
    
    if (filters.SORT_TYPES.date){
      if (filters.SORT_DIRECTION.up) {
        setCurrentCardList(newArray.sort(sortUpDate))
        return
      }
      setCurrentCardList(newArray.sort(sortDownDate))
    }

    if (filters.SORT_TYPES.title) {
      if (filters.SORT_DIRECTION.up) {
        setCurrentCardList(newArray.sort(sortUpTitle))
        return
      }
      setCurrentCardList(newArray.sort(sortDownTitle))  
    }
    
    if (filters.SORT_TYPES.size) {
      if (filters.SORT_DIRECTION.up) {
        setCurrentCardList(newArray.sort(sortUpSize))
        return
      }
      setCurrentCardList(newArray.sort(sortDownSize))
        
    }
    




  }
  function sortDownCaregory(a, b) {
    if (a.category > b.category) return -1;
    if (a.category === b.category) return 0;
    if (a.category < b.category) return 1;
  }
 function sortUpCaregory(a, b) {
    if (a.category > b.category) return 1;
    if (a.category === b.category) return 0;
    if (a.category < b.category) return -1;
  }

  function sortDownDate(a, b) {
    if (a.timestamp > b.timestamp) return -1;
    if (a.timestamp === b.timestamp) return 0;
    if (a.timestamp < b.timestamp) return 1;
  }
 function sortUpDate(a, b) {
    if (a.timestamp > b.timestamp) return 1;
    if (a.timestamp === b.timestamp) return 0;
    if (a.timestamp < b.timestamp) return -1;
  }
  function sortDownTitle(a, b) {
    if (a.imageName > b.imageName) return -1;
    if (a.imageName === b.imageName) return 0;
    if (a.imageName < b.imageName) return 1;
  }
 function sortUpTitle(a, b) {
    if (a.imageName > b.imageName) return 1;
    if (a.imageName === b.imageName) return 0;
    if (a.imageName < b.imageName) return -1;
  }

  function sortDownSize(a, b) {
    if (a.filesize > b.filesize) return -1;
    if (a.filesize === b.filesize) return 0;
    if (a.filesize < b.filesize) return 1;
  }
 function sortUpSize(a, b) {
    if (a.filesize > b.filesize) return 1;
    if (a.filesize === b.filesize) return 0;
    if (a.filesize < b.filesize) return -1;
  }







  //  function InputLine({filter, setFilters, changingFilter text}){
  //   return(


  //     <label>
  //     <input type="radio"
  //     checked = {filter}
  //     onChange={()=>{setFilters({})}}/>
  //          {text}
  //   </label>


  //   )
  //  }


