/* THOUGHT: INTERVAL COUNT
 * CAN BE CALCULATED BY Foreach
 * over summary
 */

const calculateIntervals = (
  prepare: number,
  rest: number,
  cooldown: number,
  cycles: number,
  sets: number
): number => {
  let total = 1;
  if (rest > 0) total++;
  total = total * cycles;
  if (cycles > 1 && rest > 0) total--;
  total *= sets;
  total += sets - 1;

  if (prepare > 0) total++;
  if (cooldown > 0) total++;

  return total;
};
/***/
export default calculateIntervals;
