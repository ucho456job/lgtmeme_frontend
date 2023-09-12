"use client";

import { useState } from "react";
import Tabs from "@/components/atoms/Tabs";

const Client = () => {
  const tabs = [
    { id: "timeLine", label: "Time line" },
    { id: "popular", label: "Popular" },
    { id: "favorite", label: "Favorite" },
  ];
  const [activeTabId, setActiveTabId] = useState("timeLine");
  return (
    <>
      <Tabs tabs={tabs} activeTabId={activeTabId} setActiveTabId={setActiveTabId} />
    </>
  );
};

export default Client;
