"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WaterUsageResults() {
  const [waterData, setWaterData] = useState<{ memberName: string; waterUsage: string; totalPrice: number }[]>([]);
  const router = useRouter();
  const pricePerM3 = 800; // ✅ 1m³ = 800円

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("waterData") || "[]");

    if (storedData.length > 0) {
      // ✅ 料金を計算してデータに追加
      const updatedData = storedData.map((data: { memberName: string; waterUsage: string }) => ({
        ...data,
        totalPrice: Number(data.waterUsage) * pricePerM3, // 料金計算
      }));

      setWaterData(updatedData);
      setTimeout(() => {
        localStorage.removeItem("waterData");
      }, 100);
    } else {
      router.push("/");
    }
  }, []);

  // ✅ 合計金額を計算
  const totalAmount = waterData.reduce((sum, data) => sum + data.totalPrice, 0);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">水道使用量 & 料金一覧</h2>

      {waterData.length === 0 ? (
        <p className="text-gray-500">データがありません。</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">組合員名</th>
                <th className="border p-2">水道使用量 (m³)</th>
                <th className="border p-2">料金 (円)</th> {/* ✅ 料金列を追加 */}
              </tr>
            </thead>
            <tbody>
              {waterData.map((data, index) => (
                <tr key={index}>
                  <td className="border p-2">{data.memberName}</td>
                  <td className="border p-2">{data.waterUsage} m³</td>
                  <td className="border p-2">{data.totalPrice.toLocaleString()} 円</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✅ 合計金額を表示 */}
          <div className="mt-4 text-right font-bold text-lg">
            合計金額: {totalAmount.toLocaleString()} 円
          </div>
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
