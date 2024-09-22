import { FC, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ClassPeriodOptionsBody from "./ClassPeriodOptionsBody";
import SetClassPeriodModal from "../common/SetClassPeriodModal";
import { ClassDataFetcher } from "../classObject/TimeTableClassObject";
import { ClassPeriod } from "../types/class-period";
import ChoosenWeekOfTheDayAndPeriod from "./ChoosenWeekOfTheDayAndPeriod";
import { SearchBox } from "../../Textbook/SearchBox";

type Props = {
  onClose: () => void;
};

const ClassPeriodSearchScreen: FC<Props> = ({ onClose }) => {
  const [searchWord, setSearchWord] = useState<string>("");
  const textInputRef = useRef<TextInput>(null); // TextInputの参照を作成
  const [classPeriodOptions, setClassPeriodOptions] = useState<
    ClassPeriod[] | string
  >(undefined);
  const weekOfTheDay = 1;
  const period = 1;
  const [isModalShow, setIsModalShow] = useState(false);
  const [isShowSearchScreen, setIsShowSearchScreen] = useState(false);
  const [selectedData, setSelectedData] = useState<ClassPeriod | null>(null); // 選択されたデータのステート

  const classFetcher = new ClassDataFetcher({
    department: "理工学部",
    weekOfTheDay: ClassDataFetcher.convertNumberToWeekOfTheDay(weekOfTheDay),
    period: period,
    season: "秋セメスター",
  });

  const stringWeekOfTheDay =
    ClassDataFetcher.convertNumberToWeekOfTheDay(weekOfTheDay);

  // バックエンドデータベースに非同期で問い合わせる
  const fetchClassPeriodOptions = async () => {
    const data = await classFetcher.fetchClassDatas();
    setClassPeriodOptions(data);
  };

  useEffect(() => {
    fetchClassPeriodOptions();
  }, []);

  const openModal = (data?: ClassPeriod) => {
    setSelectedData(data);
    setIsModalShow(true);
  };

  const switchSearchScreen = (isShow: boolean) => {
    setIsShowSearchScreen(isShow);
  };

  useEffect(() => {
    // コンポーネントがマウントされた時にフォーカスを当てる
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []); // 空の依存配列でコンポーネントマウント時のみ実行

  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
      }}
    >
      <View style={styles.header}>
        <View style={styles.searchBoxContainer}>
          <View style={styles.searchBox}>
            <View style={styles.searchBox2}>
              <FontAwesome
                name="search"
                size={24}
                color="black"
                style={{ marginLeft: 10 }}
              />
              <TextInput
                ref={textInputRef} // TextInputの参照を設定
                onChangeText={(text) => setSearchWord(text)}
                value={searchWord}
                placeholder="検索ワードを入力"
                style={{
                  fontSize: 20,
                  marginLeft: 5,
                  width: "80%",
                  fontWeight: "bold",
                }}
              />
            </View>
            <TouchableOpacity onPress={() => onClose()}>
              <Text style={{ fontWeight: "bold", margin: 10, fontSize: 15 }}>
                キャンセル
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ClassPeriodSearchScreen;

const styles = StyleSheet.create({
  header: {
    height: "20%",
    width: "100%",
    justifyContent: "center",
  },
  searchBoxContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    marginTop: 20,
  },
  searchBox: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: "10%",
  },
  searchBox2: {
    width: "67%",
    height: "35%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
});
