import { useState } from "react";
import { CARD_LIST } from "../../API/list_loading";
import { CardList } from "./UI_Elements/CardList.jsx";
import { TreeBranch } from "./UI_Elements/Tree.jsx";

export function Cards({ filters, currentCardList, setCurrentCardList }) {
  const [treeFilters, setTreeFilters] = useState(new Set(["root"]));
  const [imageInfo, setImageInfo] = useState({
    adress: "",
    style: "fullScreenImage hide_image",
  });
  if (!CARD_LIST.list) return <div className="loader">Loading...</div>;
  if (filters.SORT_KIND.cards)
    return (
      <div className="card_list">
        <CardList
          filters={filters}
          currentCardList={currentCardList}
          setCurrentCardList={setCurrentCardList}
        />
      </div>
    );

  return (
    <>
      <div className="card_list">
        <TreeBranch
          treeFilters={treeFilters}
          setTreeFilters={setTreeFilters}
          setImageInfo={setImageInfo}
        />
      </div>
      <div
        className={imageInfo.style}
        onClick={() =>
          setImageInfo({ adress: "", style: "fullScreenImage hide_image" })
        }
      >
        <img
          src={imageInfo.adress}
          alt={imageInfo.adress}
          onClick={(event) => {
            event.stopPropagation();
            const currentStyle =
              imageInfo.style === "fullScreenImage"
                ? "fullScreenImage zoom_in_img"
                : "fullScreenImage";
            setImageInfo({ ...imageInfo, ...{ style: currentStyle } });
          }}
        ></img>
      </div>
    </>
  );
}
