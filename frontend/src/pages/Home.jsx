import {useEffect, useState } from "react";
import axios from "axios";

const APIURL = import.meta.env.VITE_API_URL;

function Home() {

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try{
        const response = await axios.get(`${APIURL}api/leaderboard`);
        console.log(response.data);
        setResults(response.data);
        setLoading(false);
        console.log(response.data);
        }catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      }
    fetchData();
  }, []);
  

  return (
		<>
			<h1 className='text-3xl font-bold underline text-center mb-6'>
				Leaderboard
			</h1>
			{loading ? (
				<p className='text-center text-gray-500'>Loading...</p>
			) : (
				<div className='overflow-x-auto'>
					<table className='table-auto w-full border-collapse border border-gray-300 shadow-lg'>
						<thead className='bg-gray-100'>
							<tr>
								<th className='border border-gray-300 px-4 py-2 text-left'>
									Rank
								</th>
								<th className='border border-gray-300 px-4 py-2 text-left'>
									Date
								</th>
								<th className='border border-gray-300 px-4 py-2 text-left'>
									User
								</th>
								<th className='border border-gray-300 px-4 py-2 text-left'>
									Score
								</th>
							</tr>
						</thead>
						<tbody>
							{results.map((result, index) => (
								<tr
									key={index}
									className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
								>
									<td className='border border-gray-300 px-4 py-2'>
										{index + 1}
									</td>
									<td className='border border-gray-300 px-4 py-2'>
										{result.createdAt
                      .slice(0, 10)
                      .replace(/-/g, "/")}
									</td>
									<td className='border border-gray-300 px-4 py-2'>
										{result.userId.username}
									</td>
									<td className='border border-gray-300 px-4 py-2'>
										{result.score}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}

export default Home;
