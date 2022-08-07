const filters = localStorage.getItem('Deleted_cards');

export function createCurrentList(list, loadingInterval, currentCardList, setCurrentCardList){   
  console.log('effect') ;
  if (currentCardList) clearInterval(loadingInterval);  
 if (list && !currentCardList) {     
     setCurrentCardList([...list]);
     clearInterval(loadingInterval);
     if (!filters) {
      // localStorage.setItem('Deleted_cards', "");  
      return
    }
    const arrFilters = new Set(filters
    .split(" "));
    let currentList = list.filter(item=>{
      const imageName = item.image.split("/")[1];
       return (!arrFilters.has(imageName))    
    })
;
    console.log(arrFilters, filters);
    setCurrentCardList([...currentList]);

 }
}

