import React from 'react';
import './App.css';
import {magic} from "./tdrag";

function App() {
    return (
        <div>
            <button onClick={() => magic('dragRoot')}>点击注册移动事件</button>
            <div id="dragRoot">1</div>
        </div>
    );
}

export default App;
