async function _aiChoice(): Promise<number> {
  return Math.floor(Math.random() * Math.floor(3));
}
/*
0: draw
1: lose
2: win
 */
export async function _judgePoint(user_choice: number) {
  return _aiChoice().then((ai_choice: number) => {
    return (user_choice - ai_choice + 3) % 3;
  });
}
