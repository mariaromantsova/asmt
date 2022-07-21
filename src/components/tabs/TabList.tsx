import React from "react";

interface TabListProps {
  children: JSX.Element | JSX.Element[];
}

const TabList: React.FC<TabListProps> = ({ children }) => {
  return (
    <menu role="tablist" aria-label="Tabs">
      {children}
    </menu>
  );
};

export default TabList;
