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
              <p className="self-center px-7 py-3 mt-4 font-semibold rounded-md bg-violet-400 text-gray-900" >Sorry, you lose!</p>
            ) : (
              <p className="self-center px-7 py-3 mt-4 font-semibold rounded-md bg-violet-400 text-gray-900" >Congratulations! You win!</p>
            )}
            <button
              onClick={() => {
                setOpenM(false);
                fetchNumber();
                setWin(null);
              }}
              className="self-center px-8 py-3 mt-4 font-semibold rounded-md bg-violet-400 text-gray-900"
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
