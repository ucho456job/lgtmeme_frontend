import { Dispatch, SetStateAction } from "react";
import { cva } from "@@/styled-system/css";

type Props = {
  css?: string;
  tabs: {
    id: string;
    label: string;
  }[];
  activeTabId: string;
  setActiveTabId: Dispatch<SetStateAction<string>>;
};

const Tabs = ({ css, tabs, activeTabId, setActiveTabId }: Props) => {
  const handleClickTab = (id: string) => {
    setActiveTabId(id);
  };
  return (
    <div className={css}>
      <div className={tabsRecipe()}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={tabRecipe({ active: tab.id === activeTabId })}
            onClick={() => handleClickTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
};

const tabsRecipe = cva({
  base: { display: "flex", width: "100%", boxShadow: "lg" },
});

const tabRecipe = cva({
  base: {
    flex: 1,
    padding: "3",
    cursor: "pointer",
    bgColor: "WHITE",
    color: "BLACK",
    textAlign: "center",
    borderBottom: "orange",
    borderBottomColor: "blue",
    opacity: "0.8",
  },
  variants: {
    active: {
      true: {
        fontWeight: "bold",
        borderBottom: "2px solid",
        borderBottomColor: "BLACK",
        opacity: "1",
      },
    },
  },
});

export default Tabs;
