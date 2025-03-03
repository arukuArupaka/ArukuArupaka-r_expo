import { productName } from "expo-device";
import { yahooAuctionClientId, yahooAuctionEndPoint } from "../../../env";
export interface SourceBookData {
    index: number;
    name: string;
    description: string;
    headLine: string;
    url: string;
    inStock: boolean;
    code: string;
    condition: string;
    imageId: string;
    image: {
      small: string;
      medium: string;
    };
    review: {
      count: number;
      url: string;
      rate: number;
    };
    affiliateRate: number;
    price: number;
    premiumPrice: number;
    premiumPriceStatus: boolean;
    priceLabel: {
      taxable: boolean;
      defaultPrice: number;
      discountedPrice: number | null;
      fixedPrice: number | null;
      premiumPrice: number | null;
    };
    point: {
      amount: number;
      times: number;
      bonusAmount: number;
      bonusTimes: number;
    };
    shipping: {
      code: number;
      name: string;
    };
    genreCategory: {
      id: number;
      name: string;
      depth: number;
    };
    parentGenreCategories: {
      id: number;
      depth: number;
      name: string;
    }[];
    janCode: string;
    seller: {
      sellerId: string;
      name: string;
      url: string;
      isBestSeller: boolean;
      review: {
        rate: number;
        count: number;
      };
    };
  }

  type yahooProductItem = {
    id: string;
    condition: string;
    description: string | null;
    images: string;
    shopUrl: string;
    price: string;
    productName: string;
    storeType: string;
  };
  
  export function convertToTextBookData(data: SourceBookData[]):yahooProductItem[] {
    const result = data.map((item) => ({
      id: item.code || "", // IDを商品コードから取得
      condition: item.condition || "unknown", // 商品の状態
      description: item.description || null, // 説明
      images: item.image?.medium || "", // 画像URL
      shopUrl: item.url || "", // 商品ページのURL
      price: item.price?.toString() || "", // 価格
      productName: item.name || "", // 商品名
      storeType: "yahoo", // ヤフーショッピングであることを示す
    }));
    return result;
  }
  
  

export const yahooAuctionSearch = async (query: string):Promise<yahooProductItem[]> => {
    try{
        const url = `${yahooAuctionEndPoint}?appid=${yahooAuctionClientId}&query=${query}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return convertToTextBookData(data.hits);
    }catch(e){
        console.error(e);
    }
}