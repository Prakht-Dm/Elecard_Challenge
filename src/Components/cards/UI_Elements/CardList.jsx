import { convertDataForRender } from "../../../helpers/utils";

export function CardList({ filters, currentCardList, setCurrentCardList }) {
  // eslint-disable-next-line
  const cardList = Array.from(currentCardList).map((item, index) => {
    if (
      index >= filters.firstCardNumber &&
      index < filters.firstCardNumber + 20
    )
      return (
        <SingleCard
          key={index}
          index={index}
          cardInfo={item}
          currentCardList={currentCardList}
          setCurrentCardList={setCurrentCardList}
        />
      );
  });
  return cardList;
}

function SingleCard({ cardInfo, index, currentCardList, setCurrentCardList }) {
  const cardData = convertDataForRender(cardInfo);
  let currentClass = "card_content";

  return (
    <div className={currentClass}>
      <img src={cardData.imgAdress} alt={cardInfo.category}></img>
      <button
        onClick={(event) => {
          const temporarySet =
            localStorage.getItem("Deleted_cards") + " " + cardData.imageName;
          localStorage.setItem("Deleted_cards", temporarySet);
          event.target.parentElement.className = "card_content deleted_card";
          setTimeout(() => {
            setCurrentCardList(
              currentCardList.filter((item, ArrIndex) => ArrIndex !== index)
            );
            event.target.parentElement.className = "card_content";
          }, 500);
        }}
      >
        X
      </button>
      <p>{cardData.imageName}</p>
      <p>{cardData.sizeInfo}</p>
      <p> {cardData.dateInfo}</p>
    </div>
  );
}
