import dearDiaryLogo from './assets/dear-diary-shadow-logo.png'
import './App.css'
import { Scheduler } from './pages/scheduler/scheduler'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <a href="https://github.com/gina-kong/dear-diary" target="_blank">
          <img src={dearDiaryLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Dear Diary...</h1>
      <Scheduler />
    </DndProvider>
  )
}

export default App
