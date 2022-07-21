import React, { useState } from "react";
import { TabContent } from "../../types/types";
import Tab from "./Tab";
import TabList from "./TabList";
import TabPanel from "./TabPanel";
import "./Tabs.scss";

interface TabsProps {
  tabsContent: TabContent[];
}

const Tabs: React.FC<TabsProps> = ({ tabsContent }) => {
  const [selectedTab, setSelectedTab] = useState("0");

  const onTabClick = (id: string) => {
    setSelectedTab(id);
  };

  return (
    <section className="tabs">
      <TabList>
        {tabsContent.map(({ title, id }) => (
          <Tab title={title} selected={selectedTab === id} id={id} onClick={onTabClick} key={id} />
        ))}
      </TabList>
      {tabsContent.map(({ content, id }) => (
        <TabPanel content={content} id={id} hidden={selectedTab !== id} key={id} />
      ))}
    </section>
  );
};

export default Tabs;
