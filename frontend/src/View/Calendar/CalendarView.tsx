import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { CalendarList } from "react-native-calendars";

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [events, setEvents] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [loading, setLoading] = useState(true);

  const calendarTheme = {
    monthTextColor: "#000",
    textMonthFontWeight: "bold",
    calendarBackground: "transparent",
    arrowColor: "#0000ff",
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "https://firestore.googleapis.com/v1/projects/sa-kurukarennda/databases/(default)/documents/events"
      );
      const json = await response.json();
      const formattedEvents = json.documents.map((doc) => ({
        id: doc.name.split("/").pop(),
        name: doc.fields.name.stringValue,
        details: doc.fields.details.stringValue,
        date: doc.fields.dateTime.stringValue.split("T")[0], // 日付のみ取得
      }));

      setEvents(formattedEvents);
      createMarkedDates(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const createMarkedDates = (events) => {
    const dates = {};
    events.forEach((event) => {
      if (!dates[event.date]) {
        dates[event.date] = { marked: true, dotColor: "red" };
      }
    });
    setMarkedDates(dates);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const getEventsForSelectedDate = () =>
    events.filter((event) => event.date === selectedDate);

  const renderEventItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventName}>{item.name}</Text>
      <Text style={styles.eventDetails}>{item.details}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <CalendarList
      // style={{backgroundColor:"blue"}}
        horizontal
        hideArrows
        pagingEnabled
        monthFormat=""
        markingType="custom"
        theme={{
          'stylesheet.calendar.main': {
          container: {
            padding: 0,
            margin: 0,
          },
          // monthView: {
          //   flex: 1,
          //   height: '100%',
          //   justifyContent: 'space-around'
          // },
          week: {
            // backgroundColor:"blue",
            // width:"100%",
            // flex: 1,
            marginVertical: 0,
            flexDirection: 'row',
            // justifyContent: 'space-around'
          },
          dayContainer: {
            borderColor: '#f5f5f5',
            borderWidth: 1,
            flex:1,
          },
        },
        'stylesheet.calendar.day.basic': {
          base: {
            padding: 0,
            margin: 0,
            height: 80,
          },
        },}}

        onMonthChange={(month) => console.log("month changed", month)}
        
        markedDates={{
          ...markedDates,
          [selectedDate]: { selected: true, selectedColor: "blue" },
        }}
        dayComponent={({ date }) => (
          <TouchableOpacity
          onPress={() => setSelectedDate(date.dateString)}
            style={{ height: 100, width: "100%",padding:0,margin:0 }}
          >
            <Text style={{ textAlign: "center" }}>{date.day}</Text>
            {events
              .filter((event) => event.date === date.dateString)
              .map((event) => (
                <Text>{event.name}ssss</Text>
              ))}
          </TouchableOpacity>
        )}
      />
      <View style={styles.eventContainer}>
        {selectedDate ? (
          <FlatList
            data={getEventsForSelectedDate()}
            keyExtractor={(item) => item.id}
            renderItem={renderEventItem}
            ListEmptyComponent={
              <Text style={styles.noEventsText}>イベントがありません</Text>
            }
          />
        ) : (
          <Text style={styles.noDateSelectedText}>
            日付を選択してください
            {JSON.stringify(events)}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventContainer: {
    flex: 1,
    // marginTop: 20,
    // paddingHorizontal: 10,
  },
  eventItem: {
    // marginBottom: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  eventName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventDetails: {
    marginTop: 5,
    fontSize: 14,
    color: "#555",
  },
  noEventsText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  noDateSelectedText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});

export default CalendarView;
