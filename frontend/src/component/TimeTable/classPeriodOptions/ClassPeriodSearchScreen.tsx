import { FC, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ClassPeriod } from "../types/class-period";
import { useTimeTable } from "../TimeTableContext";
import ClassPeriodOptionsBody from "./ClassPeriodOptionsBody";
import SetClassPeriodModal from "../common/SetClassPeriodModal";

type Props = {
  onClose: () => void;
  classPeriodOptions: ClassPeriod[];
};

const ClassPeriodSearchScreen: FC<Props> = ({
  onClose,
  classPeriodOptions,
}) => {
  const { userClassPeriodDatas } = useTimeTable();
  const [searchWord, setSearchWord] = useState<string>("");
  const [selectedData, setSelectedData] = useState<ClassPeriod | null>(null);
  const [isModalShow, setIsModalShow] = useState(false);
  const [searchResults, setSearchResults] = useState<ClassPeriod[]>([]);
  const textInputRef = useRef<TextInput>(null); // TextInputの参照を作成

  useEffect(() => {
    // コンポーネントがマウントされた時にフォーカスを当てる
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []); // 空の依存配列でコンポーネントマウント時のみ実行

  function convertObjectToStrings(obj: ClassPeriod): { [key: string]: string } {
    const result: { [key: string]: string } = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = String(obj[key]); // 値を文字列に変換
      }
    }

    return result;
  }

  function containsSearchWord(obj: ClassPeriod, searchWord: string): boolean {
    const stringifiedObj = convertObjectToStrings(obj);

    for (const key in stringifiedObj) {
      if (key === "num") {
        // numの場合は、指定された検索ワードで始まるかどうかを確認
        if (stringifiedObj[key].startsWith(searchWord)) {
          return true;
        }
      } else if (key === "className") {
        // nameの場合は、検索ワードが含まれているかを確認
        if (stringifiedObj[key].includes(searchWord)) {
          return true;
        }
      }
    }

    return false; // どのプロパティにも検索ワードが含まれていなければ false
  }

  const openModal = (data?: ClassPeriod) => {
    setSelectedData(data);
    setIsModalShow(true);
  };

  useEffect(() => {
    if (searchWord) {
      setSearchResults(() => {
        const result = classPeriodOptions.filter((el: ClassPeriod) => {
          return containsSearchWord(el, searchWord); // true/false を返す必要がある
        });
        return result;
      });
    }
    if (!searchWord) {
      setSearchResults([]);
    }
  }, [searchWord]);

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
                onChangeText={(text) => {
                  setSearchWord(text);
                }}
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
      <ClassPeriodOptionsBody
        classPeriodOptions={searchResults}
        onPress={openModal}
      />
      <SetClassPeriodModal
        from={"classPeriodOptions"}
        isShow={isModalShow}
        onClose={() => setIsModalShow(false)}
        data={selectedData}
      />
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
