import axios from "axios";

export const SERVER_URL = "http://contest.elecard.ru/frontend_data/";
export const JSON_LIST_URL = `${SERVER_URL}catalog.json`;
export const CARD_LIST = {
  list: undefined,
  categories: undefined,
};

function getcardListAndCategories() {
  axios({
    method: "get",
    url: JSON_LIST_URL,
  })
    .then((response) => {
      CARD_LIST.list = [
        ...response.data.map((item) => {
          return { ...item, ...{ imageName: item.image.split("/")[1] } };
        }),
      ];
      CARD_LIST.categories = new Set(
        response.data.map((item) => item.category)
      );
    })
    .catch((error) => {
      console.log(error);
      setTimeout(getcardListAndCategories, 5000);
    });
}
getcardListAndCategories();