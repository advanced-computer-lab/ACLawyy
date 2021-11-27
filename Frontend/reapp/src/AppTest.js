import NavBar from "./components/NavBar/NavBar";
import BlockTextFields from "./components/BlockTextFields/BlockTextFields";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import "./AppTest.css";
function AppTest() {
  const [block, setBlock] = useState(0);
  const handleRemoveBlock = () => {
    setBlock(0);
  };
  const handleSearchBlock = () => {
    setBlock(1);
  };
  const handleCreateBlock = () => {
    setBlock(2);
  };

  return (
    <div>
      <div>
        <NavBar type="0" />
      </div>
      <div className="buttondiv">
        <Button variant="contained" onClick={handleSearchBlock} size="large">
          Search
        </Button>
        <div className="spacer"></div>
        <Button variant="contained" onClick={handleCreateBlock} size="large">
          Create
        </Button>
      </div>
      <div>
        <BlockTextFields type={block} blockRemover={handleRemoveBlock} />
      </div>
    </div>
  );
}

export default AppTest;
