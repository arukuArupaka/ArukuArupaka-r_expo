export type Condition =
  | "BRAND_NEW" //新品、未使用
  | "LIKE_NEW" //未使用に近い
  | "GOOD" //目立った傷や汚れなし
  | "FAIR" //やや傷や汚れあり
  | "POOR" //傷や汚れあり
  | "BAD"; //全体的に状態が悪い

export type Department =
//授業の分類に使うので、教養科目なども含まれる
  | "すべて"
  | "教養科目"
  | "法学部"
  | "産業社会学部"
  | "国際関係学部"
  | "文学部"
  | "経営学部"
  | "政策科学部"
  | "総合心理学部"
  | "グローバル教養学部"
  | "映像学部"
  | "情報理工学部"
  | "理工学部"
  | "経済学部"
  | "スポーツ健康科学部"
  | "食マネージメント学部"
  | "生命科学部"
  | "薬学部";

  export type DepartmentDb =
  | "All"
  | "LiberalArts"
  | "Law"
  | "SocialSciences"
  | "InternationalRelations"
  | "Literature"
  | "Business"
  | "PolicyScience"
  | "Psychology"
  | "GlobalLiberalArts"
  | "Film"
  | "InformationScience"
  | "ScienceAndTechnology"
  | "Economics"
  | "SportsHealthScience"
  | "FoodManagement"
  | "LifeSciences"
  | "Pharmacy";

  export const departmentTranslations: Record<Department, DepartmentDb> = {
    "すべて": "All",
    "教養科目": "LiberalArts",
    "法学部": "Law",
    "産業社会学部": "SocialSciences",
    "国際関係学部": "InternationalRelations",
    "文学部": "Literature",
    "経営学部": "Business",
    "政策科学部": "PolicyScience",
    "総合心理学部": "Psychology",
    "グローバル教養学部": "GlobalLiberalArts",
    "映像学部": "Film",
    "情報理工学部": "InformationScience",
    "理工学部": "ScienceAndTechnology",
    "経済学部": "Economics",
    "スポーツ健康科学部": "SportsHealthScience",
    "食マネージメント学部": "FoodManagement",
    "生命科学部": "LifeSciences",
    "薬学部": "Pharmacy"
  };

export interface TextBookData {
  //Firebaseの商品情報の型、フロント側ではこの型で商品情報を扱っている
  id: string;
  buyAt?: Date;
  buyUser?: string;
  condition: Condition;
  createdAt: Date;
  department: Department;
  description?: string;
  images: string[];
  price: string;
  productName: string;
  userID: string;
}

export interface TextBookDataPostDB {
  //Post用の
  documentId: string;
  purchasedAt?: Date;
  purchasedUserId?: string;
  condition: Condition;
  department: DepartmentDb;
  description?: string;
  imageUrl: string[];
  price: number;
  name: string;
  firebaseUserId: string;
}

export interface TextBookDataDB extends TextBookDataPostDB {
  //DB側の商品情報の型と同じもの
  id: number;
  createdAt: Date;
}
