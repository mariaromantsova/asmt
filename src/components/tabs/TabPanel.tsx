import React from "react";

interface TabPanelProps {
  content: JSX.Element;
  id: string;
  hidden?: boolean;
}

const TabPanel: React.FC<TabPanelProps> = ({ content, id, hidden = true }) => {
  return (
    <article role="tabpanel" id={id} hidden={hidden}>
      {content}
    </article>
  );
};

export default TabPanel;
