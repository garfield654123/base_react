// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

//建立api router 當打入/api 回傳hello from server 
//每次更新server都必須重啟
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});