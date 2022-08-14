import { CARD_LIST } from "../../../API/list_loading";
import { AMOUNT_OF_CARDS } from "../../../storage/consts";
import { previouPage, nextPage } from "../../../helpers/utils";

export function SortCardsBlock({
  filters,
  setFilters,
  currentCardList,
  setCurrentCardList,
}) {
  const classFilters = filters.SORT_KIND.cards
    ? "sort_block"
    : "sort_block not_available";
  return (
    <div className={classFilters}>
      <button
        className="clear_filters"
        onClick={() => {
          if (filters.SORT_KIND.tree) return;

          localStorage.removeItem("Deleted_cards");
          setCurrentCardList([...CARD_LIST.list]);
          setFilters({ ...filters });
        }}
      >
        Вернуть карточки
      </button>

      <p>Тип сортировки:</p>

      <label>
        <input
          type="radio"
          checked={filters.SORT_TYPES.category}
          onChange={() => {
            if (filters.SORT_KIND.tree) return;
            setFilters({
              ...filters,
              ...{
                SORT_TYPES: {
                  category: true,
                  date: false,
                  title: false,
                  size: false,
                },
              },
            });
          }}
        />
        {` По категории`}
      </label>

      <label>
        <input
          type="radio"
          onChange={() => {
            if (filters.SORT_KIND.tree) return;
            setFilters({
              ...filters,
              ...{
                SORT_TYPES: {
                  category: false,
                  date: true,
                  title: false,
                  size: false,
                },
              },
            });
          }}
          checked={filters.SORT_TYPES.date}
        />
        {` По дате`}
      </label>

      <label>
        <input
          type="radio"
          onChange={() => {
            if (filters.SORT_KIND.tree) return;
            setFilters({
              ...filters,
              ...{
                SORT_TYPES: {
                  category: false,
                  date: false,
                  title: true,
                  size: false,
                },
              },
            });
          }}
          checked={filters.SORT_TYPES.title}
        />
        {` По названию`}
      </label>

      <label>
        <input
          type="radio"
          onChange={() => {
            if (filters.SORT_KIND.tree) return;
            setFilters({
              ...filters,
              ...{
                SORT_TYPES: {
                  category: false,
                  date: false,
                  title: false,
                  size: true,
                },
              },
            });
          }}
          checked={filters.SORT_TYPES.size}
        />
        {` По размеру`}
      </label>

      <div className="sort_direction">
        <p>Направление сортировки</p>

        <label>
          <input
            type="radio"
            onChange={() => {
              if (filters.SORT_KIND.tree) return;
              setFilters({
                ...filters,
                ...{
                  SORT_DIRECTION: {
                    up: true,
                    down: false,
                  },
                },
              });
            }}
            checked={filters.SORT_DIRECTION.up}
          />
          {` По возрастанию`}
        </label>

        <label>
          <input
            type="radio"
            onChange={() => {
              if (filters.SORT_KIND.tree) return;
              setFilters({
                ...filters,
                ...{
                  SORT_DIRECTION: {
                    up: false,
                    down: true,
                  },
                },
              });
            }}
            checked={filters.SORT_DIRECTION.down}
          />
          {` По убыванию`}
        </label>
      </div>

      <div className="navigation">
        <button
          onClick={() => {
            previouPage(filters, setFilters, currentCardList);
          }}
        >
          Назад
        </button>
        <button
          onClick={() => {
            nextPage(filters, setFilters, currentCardList);
          }}
        >
          Вперед
        </button>
        <p>
          {filters.firstCardNumber / AMOUNT_OF_CARDS + 1} из{" "}
          {Math.ceil(currentCardList.length / AMOUNT_OF_CARDS)}
        </p>
      </div>
    </div>
  );
}
