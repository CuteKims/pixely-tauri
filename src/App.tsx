import { useEffect, useState } from 'react'
import bgimage from 'E:/CodenamePixely/PixelyTypescript/Pixely/assets/wallpaper8.jpg'
import Titlebar from './components/titlebar';
import AppLauncher from './components/apps/launcher';

function App() {
    const [windowSize, setWindowSize] = useState({height: window.innerHeight, width: window.innerWidth});
    const handleResize = () => {
        setWindowSize({height: window.innerHeight, width: window.innerWidth})
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    });
    return (
        <div id='app-body' style={{width: '100%', height: windowSize.height, overflow: 'hidden'}}>
            <Titlebar />
            <Background />
            <AppLauncher />
        </div>
    )
}



function Background() {
    return (
        <img src={bgimage} style={{height: '100%', width: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: -1}}/>
    )
}

export default App;
