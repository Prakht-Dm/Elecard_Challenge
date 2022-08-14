import { useEffect } from "react";
import { SortCardsBlock } from "./UI_Elements/sortCardBlock";
import { AMOUNT_OF_CARDS } from "../../storage/consts";
import { sortArray } from "../../helpers/utils";

export function Filters({
  filters,
  setFilters,
  currentCardList,
  setCurrentCardList,
}) {
  useEffect(() => {
    sortArray({ filters, currentCardList, setCurrentCardList });
    // eslint-disable-next-line
  }, [filters]);

  useEffect(() => {
    if (
      filters.firstCardNumber / AMOUNT_OF_CARDS + 1 > 1 &&
      filters.firstCardNumber / AMOUNT_OF_CARDS + 1 >
        Math.ceil(currentCardList.length / AMOUNT_OF_CARDS)
    ) {
      setFilters({
        ...filters,
        ...{ firstCardNumber: filters.firstCardNumber - AMOUNT_OF_CARDS },
      });
    }
    // eslint-disable-next-line
  }, [currentCardList]);

  return (
    <div className="filters">
      <p>Вид:</p>
      <label>
        <input
          type="radio"
          onChange={() => {
            setFilters({
              ...filters,
              ...{ SORT_KIND: { cards: true, tree: false } },
            });
          }}
          checked={filters.SORT_KIND.cards}
        />
        {` Карточки`}
      </label>
      <label>
        <input
          type="radio"
          onChange={() => {
            setFilters({
              ...filters,
              ...{ SORT_KIND: { cards: false, tree: true } },
            });
          }}
          checked={filters.SORT_KIND.tree}
        />
        {`Дерево`}
      </label>
      <SortCardsBlock
        filters={filters}
        setFilters={setFilters}
        currentCardList={currentCardList}
        setCurrentCardList={setCurrentCardList}
      />
    </div>
  );
}
