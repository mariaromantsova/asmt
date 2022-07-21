import React from "react";

interface TabProps {
  title: string;
  id: string;
  selected?: boolean;
  onClick: (id: string) => void;
}

const Tab: React.FC<TabProps> = ({ title, id, selected = false, onClick }) => {
  return (
    <button role="tab" aria-selected={selected} aria-controls={id} onClick={() => onClick(id)}>
      {title}
    </button>
  );
};

export default Tab;
