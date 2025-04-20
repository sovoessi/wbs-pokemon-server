import { useEffect, useState } from "react";
import { getRandomPokemons, userWins } from "../utils/gameplay";
import axios from "axios";

const BattlePage = () => {
	const [userPokemons, setUserPokemons] = useState([getRandomPokemons()]);
	const [opponentPokemons, setOpponentPokemons] = useState([
		getRandomPokemons(),
	]);
	const [userScore, setUserScore] = useState(0);
	const [opponentScore, setOpponentScore] = useState(0);

	const fetchUserPokemons = async () => {
		const pokemons = await getRandomPokemons();
		setUserPokemons(pokemons);
	};
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
		fetchUserPokemons();
		fetchOpponentPokemons();
	};

	const saveScore = async () => {
		console.log("Score saved:", { userScore, opponentScore });
		// Add logic to save the score, e.g., send it to a server or store it locally
		// take user id from token
		const token = localStorage.getItem("token");
		const userId = token.split(".")[1];
		const decodedToken = JSON.parse(atob(userId));
		const userIdFromToken = decodedToken.id;
		console.log(userIdFromToken);
		// save score to database
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}api/leaderboard`,
				{
					userId: userIdFromToken,
					score: userScore,
				}
			);
			console.log(res.data);
		} catch (error) {
			console.error("Error saving score:", error);
		}
		// reset scores
		setUserScore(0);
		setOpponentScore(0);
		fetchUserPokemons();
		fetchOpponentPokemons();
	};

	// fetch user and opponent pokemons when component mounts
	useEffect(() => {
		fetchUserPokemons();
		fetchOpponentPokemons();
	}, []);

	return (
		<>
			<h1 className='text-3xl font-bold underline'>Battle</h1>
			<div className='flex justify-between m-2'>
				<div className='w-1/2'>
					<h2>My Pokemons</h2>
					{userPokemons.map((pokemon, index) => (
						<div key={index}>
							<p>{pokemon.name}</p>
							<p>Type: {pokemon.type}</p>
							<p>Power: {pokemon.power}</p>
							<img
								src={pokemon.image}
								alt={pokemon.name}
								className='w-full h-80 object-cover mt-5 rounded-lg shadow-md'
							/>
						</div>
					))}
					{userScore ? <h2>User Score: {userScore}</h2> : ""}
					{userScore ? "" : <h2>Click Fight to see your score</h2>}
				</div>
				<div className='w-1/2'>
					<h2>Computer</h2>
					{opponentPokemons.map((pokemon, index) => (
						<div key={index}>
							<p>{pokemon.name}</p>
							<p>Type: {pokemon.type}</p>
							<p>Power: {pokemon.power}</p>
							<img
								src={pokemon.image}
								alt={pokemon.name}
								className='w-full h-80 object-cover mt-5 rounded-lg shadow-md'
							/>
						</div>
					))}
				</div>
			</div>

			{opponentScore ? <h2>Opponent Score: {opponentScore}</h2> : ""}

			{userScore ? (
				<button
					onClick={saveScore}
					className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
				>
					Save Score
				</button>
			) : (
				""
			)}
			<button
				onClick={fightMode}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				Fight
			</button>
		</>
	);
};

export default BattlePage;
