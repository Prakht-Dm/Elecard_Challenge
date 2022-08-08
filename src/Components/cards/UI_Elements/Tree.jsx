import { convertDataForRender } from "../../../helpers/utils";
import { CARD_LIST } from "../../../API/list_loading";

export function TreeBranch({ treeFilters, setTreeFilters, setImageInfo }) {
  const categoriesList = Array.from([...CARD_LIST.categories]);
  // eslint-disable-next-line
  const tree = categoriesList.map((item) => {
    // eslint-disable-next-line
    const leaf = CARD_LIST.list.map((leafInfo, index) => {
      if (leafInfo.category === item)
        return (
          <SingleLeaf
            key={index}
            cardInfo={leafInfo}
            treeFilters={treeFilters}
            setTreeFilters={setTreeFilters}
            setImageInfo={setImageInfo}
          />
        );
    });
    if (treeFilters.has("root"))
      return (
        <>
          <div
            key={item}
            onClick={() => {
              if (treeFilters.has(item)) {
                const currentSet = new Set([...treeFilters]);
                currentSet.delete(item);
                setTreeFilters(new Set([...currentSet]));
                return;
              }
              setTreeFilters(new Set([...treeFilters.add(item)]));
            }}
          >
            {item}{" "}
          </div>
          <div className="category_list">
            <ul>{leaf}</ul>
          </div>
        </>
      );
  });

  return (
    <div className="tree_list">
      <div
        onClick={() => {
          if (treeFilters.has("root")) {
            const currentSet = new Set([...treeFilters]);
            currentSet.delete("root");
            setTreeFilters(new Set([...currentSet]));
            return;
          }
          setTreeFilters(new Set([...treeFilters.add("root")]));
        }}
      >
        Root
      </div>
      {tree}
    </div>
  );
}

function SingleLeaf({ cardInfo, treeFilters, setImageInfo }) {
  const cardData = convertDataForRender(cardInfo);

  let currentClass = "tree_list";

  if (treeFilters.has(cardInfo.category))
    return (
      <li className={currentClass}>
        <img
          src={cardData.imgAdress}
          alt={cardInfo.category}
          onClick={() =>
            setImageInfo({
              adress: cardData.imgAdress,
              style: "fullScreenImage",
            })
          }
        ></img>
        <p>{cardData.imageName}</p>
        <p>{cardData.sizeInfo}</p>
        <p> {cardData.dateInfo}</p>
      </li>
    );
}
