"use client";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { FormType } from "./types/types"


export default function WaterUsageForm() {
  // useForm フックでフォーム管理に必要な関数・状態を取得
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormType>();


  const onSubmit = (data: FormType) => {
    // localStorage にデータを保存する例
    const storedData = JSON.parse(localStorage.getItem("waterData") || "[]");
    const newData = [...storedData, data];
    localStorage.setItem("waterData", JSON.stringify(newData));

    // ページ遷移（ここでは redirect を使用）
    redirect("/results");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">水道使用量入力フォーム</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* 組合員名 */}
        <div>
          <label className="block text-gray-700">組合員名:</label>
          <input
            type="text"
            // register 関数を用いて "memberName" フィールドを登録。必須チェックのルールを指定
            {...register("memberName", {
              required: "組合員名は必須です",
              minLength: { value: 2, message: "2文字以上で入力してください" },
              maxLength: { value: 8, message: "8文字以内で入力してください" },
            })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="組合員名を入力"
          />
          {errors.memberName && (
            <p className="text-red-500">{errors.memberName.message}</p>
          )}
        </div>

        {/* 水道使用量 */}
        <div>
          <label className="block text-gray-700">年間の水道使用量 (m³):</label>
          <input
            type="number"
            {...register("waterUsage", {
              required: "使用量は必須です",
              min: { value: 0, message: "0以上の値を入力してください" },
            })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="使用量を入力"
          />
          {errors.waterUsage && (
            <p className="text-red-500">{errors.waterUsage.message}</p>
          )}
        </div>

        {/* 送信ボタン */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          送信
        </button>
      </form>
    </div>
  );
}
