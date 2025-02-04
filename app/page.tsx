"use client";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { validateForm } from "./utils/validationRules";

// フォームで扱うデータの型を定義
type FormValues = {
  memberName: string;
  waterUsage: string;
};

export default function WaterUsageForm() {
  // useForm フックでフォーム管理に必要な関数・状態を取得
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormValues>();


  const onSubmit = (data: FormValues) => {
    
    // 入力規則
    const isValid = validateForm(data.memberName, data.waterUsage);

    if (!isValid) {
      // 例：memberName と waterUsage に手動でエラーを設定
      setError("memberName", {
        type: "manual",
        message: "組合員名にエラーがあります"
      });
      setError("waterUsage", {
        type: "manual",
        message: "水道使用量にエラーがあります"
      });
      return;
    }

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
            {...register("memberName", { required: "組合員名は必須です" })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="組合員名を入力"
          />
          {errors.memberName && (
            <p className="text-red-500">{errors.memberName.message}</p>
          )}
        </div>

        {/* 水道使用量 */}
        <div>
          <label className="block text-gray-700">水道使用量 (m³):</label>
          <input
            type="number"
            {...register("waterUsage", { required: "使用量は必須です" })}
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
