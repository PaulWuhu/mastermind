import React from "react";
type props = {
  win: boolean | null;
  setWin: React.Dispatch<React.SetStateAction<boolean | null>>;
  openM: boolean;
  setOpenM: React.Dispatch<React.SetStateAction<boolean>>;
  fetchNumber: () => Promise<void>;
};

const Result = ({ win, setWin, openM, setOpenM, fetchNumber }: props) => {
  return (
    <>
      {openM && (
        <div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {win === false ? (
              <div className="self-center text-center text-4xl px-7 py-3 mt-4 font-semibold rounded-md min-w-[300px] min-h-[100px] bg-violet-400 text-gray-900 mx-5">
                Sorry!
                <br />
                You lose!
              </div>
            ) : (
              <div className="self-center text-center text-4xl px-7 py-3 mt-4 font-semibold rounded-md min-w-[300px] min-h-[100px] bg-violet-400 text-gray-900 mx-5">
                Congratulations! 
                <br />
                You win!
              </div>
            )}
            <button
              onClick={() => {
                setOpenM(false);
                fetchNumber();
                setWin(null);
              }}
              className="self-center px-8 py-3 mt-4 text-2xl font-semibold rounded-md  min-h-[100px] min-w-[300px] bg-violet-400 text-gray-900"
            >
              Start a New game
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Result;
