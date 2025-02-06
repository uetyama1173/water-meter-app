  // 使用量に応じた料金を計算する関数
export const calculateTotalPrice = (usage: number): number => {

    let total = 0;
    let usageMonthly = 0;

    //　平均使用量に変換する 
    usageMonthly = Math.round(usage/12);

  
   // 1か月分の水道料金を算出
    for (let i = 1; i <= usageMonthly; i++) {
      if (i <= 20) {
        // 1～20m³：各800円
        total = 800;
      } else if (i <= 40) {
        // 21～40m³：各 m³ の料金は 800 + 45×(i-20)
        total = 800 + 45 * (i - 20);
      } else {
        // 41m³以降：各 m³ の料金は 800 + 45×20 + 40×(i-40)
        total = 800 + 45 * 20 + 40 * (i - 40);
      }
    }
    
    // 管理費用を加算し月額費用を算出
    const PriceMonthly = total  + 1000;

    // 年間費用
    total = PriceMonthly*12;

    return total;
  };
