import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { pushNotifications } from './src/config';

pushNotifications.configure();

const groupMessage = {
  title: 'group notification title',
  message: 'group notification message',
  subText: 'group notification subtext',
  group: {
    groupName: "Testing group",
    groupId: "50",
  }
}

const simpleNotification = {
  title: 'simple notification title',
  message: 'simple notification message',
  subText: 'simple notification subtext',
}

const App = () => {

  const pressHandler = (_messageId, _notification) => {
    pushNotifications.localNotification(_messageId, _notification);
  };

  return (
    <View style={styles.root}>
      <Pressable style={styles.button} onPress={pressHandler.bind(this, 1, groupMessage)}>
        <Text>Group Message Person 1</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={pressHandler.bind(this, 2, groupMessage)}>
        <Text>Group Message Person 2</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={pressHandler.bind(this, 3, simpleNotification)}>
        <Text>Person 3</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={pressHandler.bind(this, 4, simpleNotification)}>
        <Text>Person 4</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 12,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightskyblue',
  },
});

export default App;
