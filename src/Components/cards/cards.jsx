import format from "date-fns/format";
import {CARD_LIST} from '../../API/list_loading';

export function Cards({filters, currentCardList, setCurrentCardList}){
    if (!CARD_LIST.list)
    return(  
      <div className = "loader">Loading...</div> 
    )
    if ( (filters.SORT_KIND.cards))
    return(
      <div className="card_list"> 
        <CardList 
        filters = {filters}
        currentCardList = {currentCardList}
        setCurrentCardList = {setCurrentCardList}
        />
      </div>
    )
      


    return (
      <div className="card_list"> 
      <TreeBranch/>
      </div>
    )
  }
  
  function TreeBranch(){
      const categoriesList = Array.from([...CARD_LIST.categories]);

      const tree = categoriesList.map(item=>{
        const leaf = CARD_LIST.list.map((leafInfo, index)=>{
          if (leafInfo.category === item) return(
          <SingleLeaf 
          key = {index}
          cardInfo = {leafInfo}
          />)
          })
        return(
        <div>{item} 
        <ul onClick={(event)=>event.stopPropagation()}>{leaf} 
          </ul>
      </div>
       )})

    return (
    <div className="tree_list"
    onClick={(event)=> {
      event.target.firstElementChild.style.display = 
      (event.target.firstElementChild.style.display == "block")? "none": "block";
    }}>
      <div>
        Root
     <div className="li_group">
        {tree}
        </div> 
      </div>
      </div>
    )
  }


  function SingleLeaf({cardInfo}){

    const imageName = cardInfo.image.split("/")[1];
    const imgAdress = `http://contest.elecard.ru/frontend_data/${cardInfo.image}`;
    const dateInfo = `${format(cardInfo.timestamp, "dd.MMM.yyyy")} `
    const sizeInfo =  `${Math.trunc(cardInfo.filesize/100)/10} Кбайт`;
    let currentClass = 'tree_list';
  // вынести в отдельную функцию   
    return(
      <li className={currentClass}>
        
        <img src={imgAdress} alt={cardInfo.category}></img>  
        <p>{imageName}</p>
        <p>{sizeInfo}</p>
        <p> {dateInfo}</p>   
        {/* {cardInfo.image.split("/")[0]}       */}
       
        </li>  
    )
  }

  const displayChild = (event)=> {
    event.target.firstElementChild.style.display = ("block")? "none": "block";
  }



  function CardList({filters, currentCardList,setCurrentCardList}){
    const cardList = Array.from(currentCardList).map((item, index)=>{
      if (index >= filters.firstCardNumber && index <= filters.firstCardNumber+20)
        return (<SingleCard 
            key = {index}
            index = {index}
            cardInfo = {item}
            currentCardList = {currentCardList}
            setCurrentCardList = {setCurrentCardList}
            />
        )
    })
    return cardList
  }

  function SingleCard({cardInfo,  index, currentCardList, setCurrentCardList }){

    const imageName = cardInfo.image.split("/")[1];
    const imgAdress = `http://contest.elecard.ru/frontend_data/${cardInfo.image}`;
    const dateInfo = `${format(cardInfo.timestamp, "dd.MMM.yyyy")} `
    const sizeInfo =  `${Math.trunc(cardInfo.filesize/100)/10} Кбайт`;
    let currentClass = 'card_content';
  // вынести в отдельную функцию   
    return(
        <div className={currentClass}> 
        <img src={imgAdress} alt={cardInfo.category}></img>
        <button onClick={(event)=>{
           const temporarySet = localStorage.getItem('Deleted_cards')+" "+imageName;  
           localStorage.setItem('Deleted_cards', temporarySet);
          console.log(localStorage.getItem('Deleted_cards'));
          event.target.parentElement.className = 'card_content deleted_card';
          setTimeout(()=>{setCurrentCardList(currentCardList
            .filter((item, ArrIndex) => (ArrIndex !== index)));
            event.target.parentElement.className = 'card_content';}, 500);

          }}>X</button>  
        <p>{imageName}</p>
        <p>{sizeInfo}</p>
        <p> {dateInfo}</p>   
        {/* {cardInfo.image.split("/")[0]}       */}
        </div>
    )
  }