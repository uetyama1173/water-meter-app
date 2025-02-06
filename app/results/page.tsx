"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { calculateTotalPrice } from "../utils/calc"

export default function WaterUsageResults() {
  const [waterData, setWaterData] = useState<{
    memberName: string; waterUsage: string; usageMonthly: number; PriceMonthly: number;
    total: number;
  }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("waterData") || "[]"); // 使用量を取得している

    if (storedData.length > 0) {

      const updatedData = storedData.map((data: { memberName: string; waterUsage: string }) => {
        const usage = Number(data.waterUsage); // 数値に変換
        const { usageMonthly, PriceMonthly, total } = calculateTotalPrice(usage);
        return {
          ...data,
          usageMonthly,  // 月平均使用量
          PriceMonthly,  // 1か月当たりの料金
          total,   // 年間料金
        };
      });

      setWaterData(updatedData);
      setTimeout(() => {
        localStorage.removeItem("waterData");
      }, 100);
    } else {
      router.push("/");
    }
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">水道使用量 & 料金一覧</h2>

      {waterData.length === 0 ? (
        <p className="text-gray-500">データがありません。</p>
      ) : (
        <>
          {waterData.map((data, index) => (
            <table
              key={index}
              className="w-full border-collapse border border-gray-300 mb-4"
            >
              <tbody>
                <tr>
                  <th className="border p-2 text-left">組合員名</th>
                  <td className="border p-2 font-bold">{data.memberName}</td>
                </tr>
                <tr>
                  <th className="border p-2 text-left">年間使用量 (m³)</th>
                  <td className="border p-2">{data.waterUsage} m³</td>
                </tr>
                <tr>
                  <th className="border p-2 text-left">月平均使用量 (m³)</th>
                  <td className="border p-2">{data.usageMonthly} m³</td>
                </tr>
                <tr>
                  <th className="border p-2 text-left">１か月当りの水道料金 (円)</th>
                  <td className="border p-2">{data.PriceMonthly} 円</td>
                </tr>
                <tr>
                  <th className="border p-2 text-left">年間料金 (円)</th>
                  <td className="border p-2">{data.total} 円</td>
                </tr>
              </tbody>
            </table>
          ))}
        </>
      )}

      <button
        onClick={() => router.push("/")}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        戻る
      </button>
    </div>
  );
}
