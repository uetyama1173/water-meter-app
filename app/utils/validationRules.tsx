

/**
 * フォームの入力値を検証する関数
 * @param {string} memberName  - 組合員
 * @param {string} waterUsage  - 水道使用量
 * @returns {{ formIsValid: boolean, errors: { memberName: string, waterUsage: string } }}
 */
export const validateForm = (memberName: string, waterUsage: string) => {
    let formIsValid = true;
    const errors = { memberName: "", waterUsage: "" };

    // 組合員名のバリデーション
    if (memberName.trim() === "" || memberName.trim().length > 8) {
        errors.memberName = "組合員名は8文字以下で入力してください";
        formIsValid = false;
    }

    // 水道使用量のバリデーション
    const usageNumber = Number(waterUsage);
    if (waterUsage === "" || isNaN(usageNumber) || usageNumber <= 0) {
        errors.waterUsage = "正しい水道使用量を入力してください";
        formIsValid = false;
    }

    return { formIsValid, errors };
};
