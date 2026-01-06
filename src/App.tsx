import dearDiaryLogo from './assets/dear-diary-shadow-logo.png'
import './App.css'
import { Scheduler } from './pages/scheduler/scheduler'

function App() {
    return (
        <>
            <div>
                <a
                    href="https://github.com/gina-kong/dear-diary"
                    target="_blank"
                >
                    <img src={dearDiaryLogo} className="logo" alt="Vite logo" />
                </a>
            </div>
            <h1>Dear Diary...</h1>
            <Scheduler />
        </>
    )
}

export default App
