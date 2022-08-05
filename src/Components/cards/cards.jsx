import format from "date-fns/format";

export function Cards({list, currentCardList, setCurrentCardList}){
    console.log(list===currentCardList);
    console.log(currentCardList);
    if (list === undefined)
    return(
  
      <div className = "loader">Loading...</div>
  
    )
    return(
      <div className="card_list">
  
        <CardList currentCardList = {currentCardList}
        setCurrentCardList = {setCurrentCardList}
        />
     

      </div>
    )
  }
  

  function CardList({currentCardList,setCurrentCardList}){
    const cardList = Array.from(currentCardList).map((item, index)=>{
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
        <p>{dateInfo}</p>      
        </div>
    )
  }