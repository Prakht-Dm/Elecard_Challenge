import format from "date-fns/format";
import { AMOUNT_OF_CARDS } from "../storage/consts";

const filters = localStorage.getItem("Deleted_cards");

export function createCurrentList(
  list,
  loadingInterval,
  currentCardList,
  setCurrentCardList
) {
  if (currentCardList) clearInterval(loadingInterval);
  if (list && !currentCardList) {
    setCurrentCardList([...list]);
    clearInterval(loadingInterval);
    if (!filters) {
      return;
    }
    const arrFilters = new Set(filters.split(" "));
    let currentList = list.filter((item) => {
      const imageName = item.image.split("/")[1];
      return !arrFilters.has(imageName);
    });
    setCurrentCardList([...currentList]);
  }
}

export function convertDataForRender(cardInfo) {
  return {
    imageName: cardInfo.image.split("/")[1],
    imgAdress: `http://contest.elecard.ru/frontend_data/${cardInfo.image}`,
    dateInfo: `${format(cardInfo.timestamp, "dd.MMM.yyyy")} `,
    sizeInfo: `${Math.trunc(cardInfo.filesize / 100) / 10} Кбайт`,
  };
}

export function nextPage(filters, setFilters, currentCardList) {
  if (
    filters.SORT_KIND.cards &&
    filters.firstCardNumber < currentCardList.length - AMOUNT_OF_CARDS
  ) {
    setFilters({
      ...filters,
      ...{ firstCardNumber: filters.firstCardNumber + 20 },
    });
  }
}
export function previouPage(filters, setFilters) {
  if (filters.SORT_KIND.cards && filters.firstCardNumber >= AMOUNT_OF_CARDS) {
    setFilters({
      ...filters,
      ...{ firstCardNumber: filters.firstCardNumber - AMOUNT_OF_CARDS },
    });
  }
}

export function sortArray({ filters, currentCardList, setCurrentCardList }) {
  let newArray = [...currentCardList];

  if (filters.SORT_TYPES.category) {
    if (filters.SORT_DIRECTION.up) {
      setCurrentCardList(newArray.sort(sortUpTitle).sort(sortUpCaregory));
      return;
    }
    setCurrentCardList(newArray.sort(sortDownTitle).sort(sortDownCaregory));
  }

  if (filters.SORT_TYPES.date) {
    if (filters.SORT_DIRECTION.up) {
      setCurrentCardList(newArray.sort(sortUpDate));
      return;
    }
    setCurrentCardList(newArray.sort(sortDownDate));
  }

  if (filters.SORT_TYPES.title) {
    if (filters.SORT_DIRECTION.up) {
      setCurrentCardList(newArray.sort(sortUpTitle));
      return;
    }
    setCurrentCardList(newArray.sort(sortDownTitle));
  }

  if (filters.SORT_TYPES.size) {
    if (filters.SORT_DIRECTION.up) {
      setCurrentCardList(newArray.sort(sortUpSize));
      return;
    }
    setCurrentCardList(newArray.sort(sortDownSize));
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
