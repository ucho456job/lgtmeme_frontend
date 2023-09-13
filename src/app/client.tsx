"use client";

import { useState } from "react";
import Tabs from "@/components/atoms/Tabs";
import ImageCard from "@/components/molecules/ImageCard";

const Client = () => {
  const tabs = [
    { id: "timeLine", label: "Time line" },
    { id: "popular", label: "Popular" },
    { id: "favorite", label: "Favorite" },
  ];
  const [activeTabId, setActiveTabId] = useState("timeLine");

  const sampleImage = {
    id: 1,
    title: "Square",
    url: "https://placehold.jp/300x300.png",
    width: 300,
    height: 300,
  };
  return (
    <>
      <Tabs tabs={tabs} activeTabId={activeTabId} setActiveTabId={setActiveTabId} />
      <br />
      <ImageCard image={sampleImage} />
    </>
  );
};

export default Client;
