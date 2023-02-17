import React, {useState} from 'react';
import './App.css';
import {magic, IReducer, initReducer} from "./tdrag";

function App() {
    const [reducer, setReducer] = useState<IReducer>(initReducer)
    const build = () => {
        setReducer(magic('dragRoot'))
    }
    const stop = () => {
        //reducer.
        reducer.stopChildren()
    }
    const restart = () => {
        reducer.reStart()
    }
    return (
        <div>
            <button onClick={build}>点击注册移动事件</button>
            <button onClick={stop}>点击停止移动事件</button>
            <button onClick={restart}>恢复可拖拽移动事件</button>
            <div id="dragRoot">1</div>
        </div>
    );
}

export default App;
