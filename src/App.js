import "./App.css";
import SineWaveChart from "./SineWaveChart";

function App() {
	return (
		<div className="App">
			<h1>Wave Equation Simulator in React</h1>
			<h2>Physics project by Matei Crainiceanu</h2>
			Equation: <code>x = A sin(wt + f)</code>
			<SineWaveChart />
		</div>
	);
}

export default App;
