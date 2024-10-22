import { ClassPeriod } from "../types/class-period";
import { UserSettingContent } from "../types/user-setting-content";

export class ColorSettingMethods {
  // クラスのプロパティとして `userSettingContent`, `userClassPeriodData`, `classPeriodIndex` を扱う
  userSettingContent: any;
  userClassPeriodData: any;
  classPeriodIndex: number;

  constructor(
    userSettingContent: any,
    userClassPeriodData: any,
    classPeriodIndex: number
  ) {
    this.userSettingContent = userSettingContent;
    this.userClassPeriodData = userClassPeriodData;
    this.classPeriodIndex = classPeriodIndex;
  }

  // プライベートな静的メソッド
  private static classRoomColor(color: string): string {
    switch (color) {
      case "#FFB74D":
        return "#ffcd82";
      case "#4DB6AC":
        return "#82ccc5";
      case "#64B5F6":
        return "#92cbf9";
      case "#AED581":
        return "#c6e2a7";
      case "#BA68C8":
        return "#cf95d8";
      default:
        return "#87ceeb";
    }
  }

  // プライベートな静的メソッド
  private static getColor(
    userSettingContent: UserSettingContent,
    userClassPeriodData: ClassPeriod,
    classPeriodIndex: number,
    defaultColor: string
  ): string {
    const { colorBySubject, colorByUnits } = userSettingContent;
    const classData = userClassPeriodData[classPeriodIndex];

    if (colorBySubject) {
      return classData?.statusColor || "#d3d3d3";
    }
    if (colorByUnits) {
      return classData?.mulColor || "#d3d3d3";
    }
    return classData?.color || defaultColor;
  }

  // プライベートな静的メソッド
  private static textBlackOrWhite(
    userSettingContent: UserSettingContent,
    userClassPeriodData: ClassPeriod,
    classPeriodIndex: number
  ): string {
    const color = this.getColor(
      userSettingContent,
      userClassPeriodData,
      classPeriodIndex,
      "#d3d3d3"
    );
    return color !== "#d3d3d3" ? "white" : "black";
  }

  // パブリックな静的メソッド
  public static classPeriodBackColor(
    place: string,
    userSettingContent: UserSettingContent,
    userClassPeriodData: ClassPeriod,
    classPeriodIndex: number
  ): string {
    switch (place) {
      case "entire":
        return this.getColor(
          userSettingContent,
          userClassPeriodData,
          classPeriodIndex,
          "#d3d3d3"
        );
      case "classRoom":
        return this.classRoomColor(
          this.getColor(
            userSettingContent,
            userClassPeriodData,
            classPeriodIndex,
            "#d3d3d3"
          )
        );
      case "text":
        return this.textBlackOrWhite(
          userSettingContent,
          userClassPeriodData,
          classPeriodIndex
        );
      case "classNumber":
        return this.getColor(
          userSettingContent,
          userClassPeriodData,
          classPeriodIndex,
          "#87ceeb"
        );
      default:
        return "#d3d3d3"; // デフォルトの値を設定
    }
  }
}
