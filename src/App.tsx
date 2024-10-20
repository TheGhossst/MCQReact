import { Game } from './components/Game'

export function App(){
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">MCQ Game</h1>
      <Game />
    </div>
  )
}