import React, {
	useState,
	useEffect,
	useContext,
	useMemo,
	useCallback,
	useReducer,
	useRef,
	createContext,
} from 'react'
import './App.css'

// Context API
const AppContext = createContext()

// Reducer function
const reducer = (state, action) => {
	switch (action.type) {
		case 'increment':
			return { count: state.count + 1 }
		case 'decrement':
			return { count: state.count - 1 }
		default:
			return state
	}
}

const ChildComponent = () => {
	const { theme, toggleTheme } = useContext(AppContext)
	return (
		<div className={`child-component ${theme}`}>
			<p>Current Theme: {theme}</p>
			<button onClick={toggleTheme}>Toggle Theme</button>
		</div>
	)
}

const App = () => {
	// useState
	const [counter, setCounter] = useState(0)

	// useEffect
	useEffect(() => {
		console.log('Counter updated:', counter)
	}, [counter])

	// useReducer
	const [state, dispatch] = useReducer(reducer, { count: 0 })

	// useRef
	const inputRef = useRef(null)

	// useMemo
	const squaredCounter = useMemo(() => counter * counter, [counter])

	// useCallback
	const increment = useCallback(() => setCounter(prev => prev + 1), [])

	// Fetch API Data on Button Click
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const fetchData = () => {
		setLoading(true)
		fetch('https://jsonplaceholder.typicode.com/users?_limit=5')
			.then(res => res.json())
			.then(data => {
				setData(data)
				setLoading(false)
			})
	}

	// Context API state
	const [theme, setTheme] = useState('light')
	const toggleTheme = () =>
		setTheme(prev => (prev === 'light' ? 'dark' : 'light'))

	return (
		<AppContext.Provider value={{ theme, toggleTheme }}>
			<div className={`app-container ${theme}`}>
				<h1>React Hooks Demo</h1>
				<p>Counter: {counter}</p>
				<button onClick={increment}>Increment</button>
				<p>Squared Counter: {squaredCounter}</p>
				<p>Reducer Count: {state.count}</p>
				<button onClick={() => dispatch({ type: 'increment' })}>+</button>
				<button onClick={() => dispatch({ type: 'decrement' })}>-</button>
				<input ref={inputRef} placeholder='Type something...' />
				<button onClick={() => inputRef.current.focus()}>Focus Input</button>
				<button onClick={fetchData}>Fetch API Data</button>
				{loading ? (
					<p>Loading...</p>
				) : (
					<div className='data-container'>
						{data.map(user => (
							<div key={user.id} className='data-block'>
								<h3>Name: {user.name}</h3>
								<p>Username: {user.username}</p>
								<p>Email: {user.email}</p>
								<p>Phone: {user.phone}</p>
								<p>Website: {user.website}</p>
							</div>
						))}
					</div>
				)}
				<ChildComponent />
			</div>
		</AppContext.Provider>
	)
}

export default App
