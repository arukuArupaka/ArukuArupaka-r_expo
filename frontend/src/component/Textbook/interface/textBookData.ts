export type Campus =
  | "衣笠キャンパス"
  | "びわこ・くさつキャンパス(BKC)"
  | "大阪いばらきキャンパス"

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
  imageUrls: string[];
  price: number;
  name: string;
  firebaseUserId: string;
}

export interface TextBookDataDB extends TextBookDataPostDB {
  //DB側の商品情報の型と同じもの
  id: number;
  createdAt: Date;
}


export const convertTextBookData = (data: TextBookData): TextBookDataPostDB => {
  if(!data.buyAt||!data.buyUser){
    return{
      documentId: data.id,
      condition: data.condition, //商品の状態
      department: translateDepartment(data.department), //学部
      description: data.description, //商品の説明
      imageUrls: data.images, //商品の画像のURL
      price: Number(data.price), //商品の価格
      name: data.productName, //商品
      firebaseUserId: data.id,
    };
  }
  return {
    documentId: data.id,
    purchasedAt: data.buyAt, //購入した日時
    purchasedUserId: data.buyUser, //購入したユーザーのid
    condition: data.condition, //商品の状態
    department: translateDepartment(data.department), //学部
    description: data.description, //商品の説明
    imageUrls: data.images, //商品の画像のURL
    price: Number(data.price), //商品の価格
    name: data.productName, //商品
    firebaseUserId: data.id,
  };
};


export const translateCondition = (data: any): Condition => {
  const newdata:Condition =  data === "新品、未使用"? "BRAND_NEW":
         data === "未使用に近い"? "LIKE_NEW":
         data === "目立った傷や汚れなし"? "GOOD":
         data === "やや傷や汚れあり"? "FAIR":
         data === "傷や汚れあり"? "POOR": "BAD"
  return newdata;
};

export const checkImageFalsy = (urls:string[]) => {
  const newUrls= urls.filter((url)=>url != null);
  return newUrls.length!==0? newUrls:["nourl"]
}

const translateDepartment = (department: Department): DepartmentDb =>{
  return departmentTranslations[department] || null; // マッピングがない場合はnull
}
