import NavBar from "./components/NavBar/NavBar";
import BlockTextFields from "./components/BlockTextFields/BlockTextFields";
import Button from "@mui/material/Button";
import React, { useState } from "react";
function AppTest() {
  const [block, setBlock] = useState(0);

  return (
    <div>
      <div>
        <NavBar type="0" />
      </div>
      <div>
        <Button variant="contained" onClick={() => setBlock(1)}>
          Search
        </Button>
        <Button variant="contained" onClick={() => setBlock(2)}>
          Create
        </Button>
      </div>
      <div>
        <BlockTextFields type={block} />
      </div>
    </div>
  );
}

export default AppTest;
