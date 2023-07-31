export type HomeProps = {
    setView: React.Dispatch<React.SetStateAction<string>>
}


export type SummaryType = {
  set?: number;
  cycle?: number;
  prepare?: number;
  work?: number;
  rest?: number;
  restBetweenSets?: number;
  cooldown?: number;
};

