  // 使用量に応じた料金を計算する関数
export const calculateTotalPrice = (usage: number): number => {

    let total = 0;

    // 1m³ごとに料金を足し合わせる
    for (let i = 1; i <= usage; i++) {
      if (i <= 20) {
        // 1～20m³：各800円
        total += 800;
      } else if (i <= 40) {
        // 21～40m³：各 m³ の料金は 800 + 45×(i-20)
        total += 800 + 45 * (i - 20);
      } else {
        // 41m³以降：各 m³ の料金は 800 + 45×20 + 40×(i-40)
        total += 800 + 45 * 20 + 40 * (i - 40);
      }
    }

    return total;
  };