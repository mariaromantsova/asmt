import React from "react";
import "./Wrapper.scss";

interface WrapperProps {
  children: JSX.Element | JSX.Element[];
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">asmt</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div className="window-body">
        {children}
        <section className="field-row buttons">
          <button>OK</button>
          <button>Cancel</button>
        </section>
      </div>
    </div>
  );
};

export default Wrapper;
