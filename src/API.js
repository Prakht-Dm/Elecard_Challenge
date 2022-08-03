import axios from 'axios';

export const SERVER_URL = 'http://contest.elecard.ru/frontend_data/';
export const JSON_LIST_URL = `${SERVER_URL}catalog.json`;

// export const JSON_LIST = loadJsonAndResponse(JSON_LIST_URL);
// export const CARD_LIST = [];
// export async function loadJsonAndResponse(url) {
//     try{
//     const response = await fetch(url);
//     return await response;
//     }
//     catch(err){
//       console.log(err);
//     }    
//   }

export const CARD_LIST = {
    list: undefined,
};
function getcardList() {
axios ({
    method: 'get',
    url:JSON_LIST_URL
})
    .then((response)=>{CARD_LIST.list = response.data})
    .catch((error)=>{
        console.log(error);
        setTimeout(getcardList, 5000)
    }); 
}
getcardList();