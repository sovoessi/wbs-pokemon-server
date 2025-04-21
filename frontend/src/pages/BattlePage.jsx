import { useEffect, useState } from "react";
import { getRandomPokemons, userWins } from "../utils/gameplay";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Updated import

const BattlePage = () => {
	const [userPokemons, setUserPokemons] = useState([localStorage.getItem("caughtPokemons") || []]);
	const [opponentPokemons, setOpponentPokemons] = useState([
		getRandomPokemons(),
	]);
	const [userScore, setUserScore] = useState(0);
	const [opponentScore, setOpponentScore] = useState(0);

	const navigate = useNavigate(); // Initialize navigate

	const fetchUserPokemons = () => {
		const caughtPokemons = JSON.parse(localStorage.getItem("caughtPokemons"));
		if (caughtPokemons) {
			setUserPokemons(caughtPokemons);
		} else {
			alert("No caught pokemons found. Please catch some pokemons first.");
			navigate("/card"); // Redirect to the card page if no caught pokemons
		}
	}

	useEffect (() => {
		fetchUserPokemons();
		fetchOpponentPokemons();
	}, [navigate]);

	const fetchOpponentPokemons = async () => {
		const pokemons = await getRandomPokemons();
		setOpponentPokemons(pokemons);
	};

	const fightMode = () => {
		// for each pokemon in userPokemons
		// compare with each pokemon in opponentPokemons
		// if user pokemon wins, increment userScore
		// if opponent pokemon wins, increment opponentScore
		// if equal, do nothing
		userPokemons.forEach((userPokemon, index) => {
			const opponentPokemon = opponentPokemons[index];
			if (userWins(userPokemon, opponentPokemon)) {
				setUserScore((prevScore) => prevScore + 1);
			} else {
				setOpponentScore((prevScore) => prevScore + 1);
			}
		});
		// reset userPokemons and opponentPokemons
		fetchOpponentPokemons();
		fetchUserPokemons();
	};

	const saveScore = async () => {
		// take user id from token
		const token = localStorage.getItem("token");
		const userId = token.split(".")[1];
		const decodedToken = JSON.parse(atob(userId));
		const userIdFromToken = decodedToken.id;
		// save score to database
		try {
			await axios.post(`${import.meta.env.VITE_API_URL}api/leaderboard`, {
				userId: userIdFromToken,
				score: userScore,
			});
			navigate("/");
		} catch (error) {
			console.error("Error saving score:", error);
		}
		// reset scores
		setUserScore(0);
		setOpponentScore(0);
		fetchOpponentPokemons();
		fetchUserPokemons();
	};


	return (
		<>
			<h1 className='text-3xl font-bold underline text-center mb-6'>Battle</h1>
			<div className='grid grid-cols-3 gap-4 m-4'>
				{/* User Pokémons */}
				<div className='bg-white p-4 rounded-lg shadow-md'>
					<h2 className='text-xl font-bold mb-4 text-center'>My Pokémons</h2>
					{userPokemons.map((pokemon, index) => (
						<div
							key={index}
							className='mb-6'
						>
							<p className='font-semibold'>{pokemon.name}</p>
							<p>Type: {pokemon.type}</p>
							<p>Power: {pokemon.power}</p>
							<img
								src={pokemon.image}
								alt={pokemon.name}
								className='w-full h-40 object-cover mt-3 rounded-lg shadow-md'
							/>
						</div>
					))}
				</div>

				{/* Battle Actions */}
				<div className='bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center justify-center'>
					<h2 className='text-xl font-bold mb-4 text-center'>Battle Actions</h2>
					{userScore || opponentScore ? (
						<div className='mb-4'>
							<h2 className='text-lg font-bold text-green-600'>
								User Score: {userScore}
							</h2>
							<h2 className='text-lg font-bold text-red-600'>
								Opponent Score: {opponentScore}
							</h2>
						</div>
					) : null}
					<button
						onClick={fightMode}
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4'
					>
						Fight
					</button>
					{userScore ? (
						<button
							onClick={saveScore}
							className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
						>
							Save Score
						</button>
					) : null}
				</div>

				{/* Opponent Pokémons */}
				<div className='bg-white p-4 rounded-lg shadow-md'>
					<h2 className='text-xl font-bold mb-4 text-center'>
						Opponent Pokemons
					</h2>
					{opponentPokemons.map((pokemon, index) => (
						<div
							key={index}
							className='mb-6'
						>
							<p className='font-semibold'>{pokemon.name}</p>
							<p>Type: {pokemon.type}</p>
							<p>Power: {pokemon.power}</p>
							<img
								src={pokemon.image}
								alt={pokemon.name}
								className='w-full h-40 object-cover mt-3 rounded-lg shadow-md'
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default BattlePage;
