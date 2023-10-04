# base_react
base react project with node.js backend and Frontend
搜尋
    搜尋1,300+ 教程
freeCodeCamp.org
論壇 捐款
學習程式設計— 3,000 小時免費課程

2022年2月18日
/
#REACT
如何使用Node 後端建立React 應用程式：完整指南
luojiyin
luojiyin
如何使用Node 後端建立React 應用程式：完整指南
原文：How to Create a React App with a Node Backend: The Complete Guide，作者：Reed Barger

React 前端與Node 後端相配合，對於你想創建的任何應用程式來說都是一個堅如磐石的組合。

本指南旨在幫助你用React 盡可能輕鬆地建立一個全端專案。讓我們看看如何使用React 和Node 從頭開始建立一個完整的項目，並將其部署到網路上。

想創建和部署你自己的React 和Node 應用程式嗎？看看我的課程系列，它告訴你如何創建你自己的全端React 項目，例如這個項目。

你需要的工具
確保Node 和NPM 已經安裝在你的電腦上。你可以在這個網站下載這兩樣東西nodejs.org（NPM 包含在你安裝的Node 中，不需要另外安裝)。
使用你選擇的程式碼編輯器。我正在使用並且個人推薦使用VSCode。你可以在這個網站下載VSCode：code.visualstudio.com。
確保你的電腦上安裝了Git。這對於用Heroku 部署我們的應用程式是必要的。你可以在這個網站上下載：git-scm.com。
一個在heroku.com的帳號。我們將使用Heroku 將應用程式完全免費地發佈到網路上。
第一步：建立你的Node（Express）後端
首先為你的專案建立一個資料夾，命名為react-node-app（範例名稱）。

然後，將該資料夾拖入你的程式碼編輯器。

為了創建我們的Node 項目，在你的終端機執行以下命令：

npm init -y
這將創建一個package.json 文件，使我們能夠追蹤所有的應用程式腳本，並管理我們的Node 應用程式所需的任何依賴。

我們的伺服器程式碼將放在一個同名的資料夾中：server。讓我們來建立這個資料夾。

在這個資料夾中，我們將放置一個文件，從這個文件中執行服務。index.js。

我們將使用Express 建立一個簡單的Web 伺服器，如果環境變數PORT沒有給定值，則運行在3001 連接埠（Heroku 將在我們部署應用程式時設定這個值）。

// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
然後在我們的終端機安裝Express 作為一個依賴項來使用它。

npm i express
之後，我們將在package.json 中建立一個腳本，當我們使用npm start運行它時，將啟動我們的Web 服務。

// server/package.json

...
"scripts": {
  "start": "node server/index.js"
},
...
最後，我們可以透過在終端機上運行npm start 來運行應用程序，我們應該看到它正在3001 連接埠上運行。

npm start

> node server/index.js

Server listening on 3001
程式碼片段 1

第二步：建立一個API
我們想把我們的Node 和Express 伺服器當作一個API，這樣它就可以給React 應用程式提供數據，改變這些數據，或做一些其他只有服務才能做的操作。

在這個例子中，我們將簡單地給React 應用程式發送一個JSON 物件中的"Hello from server!"訊息。

下面的程式碼為路由/api建立了一個endpoint。

如果我們的React 應用程式向該路由發出一個GET 請求，我們就會用JSON 資料回應（使用res，代表回應）。

// server/index.js
...

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
注意：請確保將其放在app.listen函數之前。

由於我們已經對Node 程式碼進行了修改，我們需要重新啟動伺服器。

要做到這一點，請在終端機上按Command/Ctrl+C 結束你的啟動腳本，然後再次執行npm start重新啟動它。

為了測試這一點，我們可以簡單地在瀏覽器中訪問http://localhost:3001/api，看看我們獲得的資訊。

程式碼片段 2

第三步：建立React 前端
在創建了後端之後，讓我們轉到前端。

開啟另一個終端標籤，使用create-react-app 建立一個新的React 項目，名稱為client。

npx create-react-app client
之後，我們將擁有一個安裝了所有依賴項的React 應用程式。

我們要做的唯一改變是在package.json 檔案中新增一個名為proxy的屬性（client資料夾下的package.json 檔案）。

這將允許我們向Node 伺服器發出請求，而不必在每次向它發出網路請求時提供它所運行的原點（http://localhost:3001）。

// client/package.json

...
"proxy": "http://localhost:3001",
...
然後我們可以透過執行它的啟動腳本來啟動React 應用，這和我們的Node 伺服器一樣。首先確保cd進入新建立的client資料夾。

之後，會在localhost:3000上啟動（其實啟動兩個Node 的進程，一個是React 開發使用，一個是Express 開發使用）。

cd client
npm start

Compiled successfully!

You can now view client in the browser.

Local:            http://localhost:3000
程式碼片段 3

第四步：從React 向Node 發出HTTP 請求
現在我們有了一個工作的React 應用，我們想用它來與我們的API 互動。

讓我們看看如何從我們之前創建的/apiendpoint 獲取數據。

要做到這一點，我們可以前往src資料夾中的App.js元件，使用useEffect進行HTTP 請求。

我們將使用Fetch API 向後端發出一個簡單的GET 請求，然後將我們的資料以JSON 格式傳回。

一旦我們得到了傳回的數據，我們將得到訊息屬性（抓取從伺服器發送的問候語），然後把它放在一個叫做的data狀態變數中。

這將使我們能夠在頁面中顯示該訊息，如果我們有的話。我們在JSX 中使用一個條件，如果資料還沒有，就顯示文字Loading...。

// client/src/App.js

import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;
程式碼片段 5

用Heroku 將你的應用程式部署到網路上
最後，讓我們把應用程式部署到網路上。

首先，在我們的client資料夾中，確保刪除由create-react-app 自動初始化的Git repo（rm -rf .git,.git是隱藏資料夾，不能直接看到）。

這對部署我們的應用程式至關重要，因為我們要在專案的根資料夾（react-node-app）中建立Git repo，而不是在client中。

cd client
rm -rf .git
當我們部署時，Node 後端和React 前端都將在同一個網域（即mycoolapp.herokuapp.com）提供服務。

我們看到請求是如何被Node API 處理的，所以我們需要寫一些程式碼，當我們的React 應用程式被使用者請求時（例如，當我們進入應用程式的主頁時）顯示React 應用程式。

我們可以在server/index.js中加入以下程式碼來完成這個工作。

// server/index.js
const path = require('path');
const express = require('express');

...

// 让 Node 为我们创建的 React 应用提供文件
app.use(express.static(path.resolve(__dirname, '../client/build')));

// 处理对/api 的 GET 请求
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// 所有之前未被处理的 GET 请求将返回我们的 React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
這段程式碼將首先允許Node 使用express.static函數來存取我們建立的React 專案的靜態檔案。

如果有一個GET 請求進來，而這個請求沒有被我們的/api路由處理後，我們的伺服器將會用React 應用程式來回應。

這段程式碼允許我們的React 和Node 應用程式一起部署在同一個網域。

然後我們可以告訴Node App 如何做，在我們的伺服器package.json 檔案中加入一個build腳本，為生產建立我們的React 應用程式。

// server/package.json

...
"scripts": {
    "start": "node server/index.js",
    "build": "cd client && npm install && npm run build"
  },
...
我還建議提供一個名為engines的字段，在這裡你要指定你用來建立專案的Node 版本。這將用於部署。

你可以透過運行node -v來獲得你的Node 版本，你可以把結果放在engines中（例如14.15.4）。

// server/package.json

"engines": {
  "node": "your-node-version"
}
在這之後，我們準備好使用Heroku 進行部署，所以請確保你在Heroku.com有一個帳戶。

當你登入並查看你的儀表板（dashboard），你將選擇新建（New）>建立新的應用程式（Create New App），並提供一個唯一的應用程式名稱。

sudo npm i -g heroku
當安裝完畢，你將透過CLI 使用heroku login指令登入Heroku。

heroku login

Press any key to login to Heroku
登入後，只需在"Deploy "標籤中為我們建立的應用程式遵循部署說明。

以下四個指令將為我們的專案初始化一個新的Git repo，將我們的檔案新增到其中，提交它們，並為Heroku 添加一個Git 遠端。

git init
heroku git:remote -a insert-your-app-name-here
git add .
git commit -am "Deploy app to Heroku"
然後，最後一步是透過推送我們剛剛新增的Heroku Git 遠端位址（heroku git:remote -a insert-your-app-name-here），來發布我們的應用程式。

git push heroku master
恭喜！我們的全端式React 和Node 應用程式已經上線。🎉

程式碼片段 5

當你想要對你的應用程式進行修改時（並進行部署），你只需要用Git 來添加你的檔案（git add），提交它們（git commit），然後推送到我們的Heroku 遠端（git push） 。

git add .
git commit -m "my commit message"
git push heroku master
想用React 創建像YouTube、Instagram 和Twitter 這樣的真實世界的應用程式嗎？以上就是方法。
在每個月的月底，我將發布一個獨家課程，準確地告訴你如何復現從頭到尾用React 創建一個完整的應用程式。

想在下一個課程出現時得到通知嗎？在這裡加入等候名單。

luojiyin
luojiyin
閱讀更多文章。

在freeCodeCamp 免費學習程式設計。freeCodeCamp 的開源課程已幫助40,000 多人獲得開發者工作。開始學習

freeCodeCamp 是捐贈者支持的501(c)(3) 條款下具有免稅資格的慈善組織（稅號：82-0779546）。

我们的使命：帮助人们免费学习编程。我们通过创建成千上万的视频、文章和交互式编程课程——所有内容向公众免费开放——来实现这一目标。学员在世界各地自发成立数千个 freeCodeCamp 学习小组。

所有给 freeCodeCamp 的捐款都将用于我们的教育项目，购买服务器和其他服务，以及聘用员工。
