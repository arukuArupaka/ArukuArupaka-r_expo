import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const FooterChatFooter = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>ここにフッターの内容を書きます</Text>
      {/* フッター内に他のコンポーネントやアイコンなどを追加可能 */}
    </View>
  );
};

export const FooterChat = () => {
  return (
    <SafeAreaView style={styles.container}>
      {<Text></Text>}
      <FooterChatFooter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // SafeAreaView全体を使う
  },
  footer: {
    position: 'absolute', // 画面の下部に配置
    bottom: 0, // 下から0の位置
    width: '100%', // 幅は画面全体に
    backgroundColor: 'blue', // フッターの背景色
    alignItems: 'center', // 子要素を中央揃え
    padding: 10, // 余白
  },
  footerText: {
    // フッターテキストのスタイル
    fontSize: 16,
  },
});
