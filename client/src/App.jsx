import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-zinc-900 h-screen w-full '>
        <h1 className='text-white'>Leaning management system project</h1>
        <Button variant='outline'>Click me</Button>
      </div>
    </>
  )
}

export default App
