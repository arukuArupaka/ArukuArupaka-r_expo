import React, { useCallback } from "react";
import InputField from "./InputField";
import { supabase } from "../../lib/supabase";

type Props = {
  label: string;
  table: string; // 例: 'users'
  column: string; // 例: 'name'
  userId: string | null; // eq 条件用
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  keyboardType?: React.ComponentProps<typeof InputField>["keyboardType"];
  returnKeyType?: React.ComponentProps<typeof InputField>["returnKeyType"];
  normalize?: (v: string) => string; // 前処理（trim やフォーマット）
};

const SupabaseInputField: React.FC<Props> = ({
  label,
  table,
  column,
  userId,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  returnKeyType,
  normalize,
}) => {
  const onSave = useCallback(async () => {
    try {
      if (!userId) return;
      const v = (normalize ? normalize(value) : value).trim();
      const { error } = await supabase
        .from(table)
        .update({ [column]: v } as any)
        .eq("id", userId);
      if (error) {
        console.error(`${label} の保存に失敗:`, error.message || error);
      }
    } catch (e) {
      console.error(`${label} の保存中に予期せぬエラー:`, e);
    }
  }, [userId, value, table, column, normalize, label]);

  return (
    <InputField
      label={label}
      value={value}
      onChangeText={onChangeText}
      onSave={onSave}
      placeholder={placeholder}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
    />
  );
};

export default SupabaseInputField;
