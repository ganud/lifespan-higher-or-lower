import "./App.css";
import animals from "../animals.json";
import { useEffect, useState } from "react";
import { sample } from "lodash-es";
function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [resetCount, setResetCount] = useState(0); // Updates dependency useEffect
  const [defenderAnimal, setDefenderAnimal] = useState<Animal | null>(null);
  const [challengerAnimal, setChallengerAnimal] = useState<Animal | null>(null);
  const [loserAnimal, setLoserAnimal] = useState<Animal | null>({}); // Save the "losing" animal before the game resets.
  interface Animal {
    name: string;
    lifespan: number;
  }

  function updateScore() {
    setScore((score) => score + 1);
    if (score >= highScore) {
      setHighScore(score + 1);
    }
  }

  // Take in a "higher" or "lower" decision
  // If the decision wins, return true else return false.
  function checkWin(playedHigh: boolean) {
    if (playedHigh) {
      return challengerAnimal!.lifespan >= defenderAnimal!.lifespan;
    } else {
      return challengerAnimal!.lifespan <= defenderAnimal!.lifespan;
    }
  }

  // Register a round. Reset on fail, increase the score on success.
  function playTurn(playedHigh: boolean) {
    if (checkWin(playedHigh) == false) {
      // On lose, reset game and show summary
      setLoserAnimal(challengerAnimal);
      document.getElementById("game_summary").showModal();
      setScore(0);
      setResetCount(resetCount + 1);
    } else {
      updateScore();
      setDefenderAnimal(challengerAnimal);
      setChallengerAnimal(sample(animals) ?? null);
    }
  }

  // On new game, set defender and challenger.
  useEffect(() => {
    setDefenderAnimal(sample(animals) ?? null);
    setChallengerAnimal(sample(animals) ?? null);
  }, [resetCount]);

  // The page should not render until useEffect has finished running.
  if (!defenderAnimal || !challengerAnimal) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-[url(https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]  bg-cover bg-center shadow-[inset_0_0_0_1000px_rgba(0,0,0,0.7)]">
        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white transform -translate-x-1/2"></div>
        <div className="flex grow w-screen">
          {/* Left container */}
          <div
            className="flex-3 flex justify-center items-center bg-cover bg-center shadow-[inset_0_0_0_1000px_rgba(0,0,0,0.7)]"
            style={{
              backgroundImage: `url(${defenderAnimal.image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-2xl font-extrabold">{defenderAnimal.name}</h1>
              <p>has a lifespan of</p>
              <h1 className="text-4xl font-extrabold">
                {defenderAnimal.lifespan}
              </h1>
              <p>years</p>
            </div>
          </div>
          {/* Right container containing the challenger*/}
          <div
            className="flex-3 flex justify-center items-center bg-cover bg-center shadow-[inset_0_0_0_1000px_rgba(0,0,0,0.7)]"
            style={{
              backgroundImage: `url(${challengerAnimal.image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-2xl font-extrabold">
                {challengerAnimal.name}
              </h1>
              <p>has</p>
              <button
                className="btn btn-xl"
                onClick={() => {
                  playTurn(true);
                }}
              >
                Higher
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.47 10.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 12.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M11.47 4.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 6.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                className="btn btn-xl"
                onClick={() => {
                  playTurn(false);
                }}
              >
                Lower
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.47 13.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 0 0-1.06-1.06L12 11.69 5.03 4.72a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M11.47 19.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 1 0-1.06-1.06L12 17.69l-6.97-6.97a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <p>lifespan than {defenderAnimal.name}</p>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="flex p-4 text-4xl shadow-[inset_0_0_0_1000px_rgba(0,0,0,0.7)]">
          Score: {score}
        </div>
      </div>
      {/* Modal that pops up on game end */}
      <dialog id="game_summary" className="modal">
        <div className="modal-box">
          <h1 className="font-bold text-center text-4xl">Game summary</h1>
          <p className="text-center">
            You lost on {loserAnimal!.name}, which has a lifespan of{" "}
            {loserAnimal!.lifespan} years.
          </p>
          <p className="text-2xl text-center">Your score: {score}</p>
          <p className="text-2xl text-center">
            Your highest score: {highScore}
          </p>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Play Again</button>
          </form>
        </div>
      </dialog>
      {/* Absolute centered VS button */}
      <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl inline-flex h-30 w-30 items-center justify-center rounded-full bg-gray-50 text-black drop-shadow-sm transition-colors duration-150 hover:bg-gray-200 font-bold">
        VS
      </button>
    </>
  );
}

export default App;
