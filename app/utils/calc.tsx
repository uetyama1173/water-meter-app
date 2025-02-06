// 複数の値を持つオブジェクト型を定義
type PriceDetails = {
  usageMonthly: number;
  PriceMonthly: number;
  total: number;
};


export const calculateTotalPrice = (usage: number): PriceDetails => {

  let total = 0;
  const usageMonthly = Math.round(usage / 12); //月平均使用量

  // 1か月分の水道料金を算出
  for (let i = 1; i <= usageMonthly; i++) {
    if (i <= 20) {
      total = 800;
    } else if (i <= 40) {
      total = 800 + 45 * (i - 20);
    } else {
      total = 800 + 45 * 20 + 40 * (i - 40);
    }
  }

  // 管理費用を加算し月額費用を算出
  const PriceMonthly = total + 1000;

  // 年間費用
  total = PriceMonthly * 12;

  return { usageMonthly, PriceMonthly, total };
};


