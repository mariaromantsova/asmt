import Tabs from "./components/tabs/Tabs";
import { tabsContent } from "./components/constants";
import Wrapper from "./components/wrapper/Wrapper";
import "xp.css/dist/98.css";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Wrapper>
        <Tabs tabsContent={tabsContent} />
      </Wrapper>
    </div>
  );
}

export default App;
