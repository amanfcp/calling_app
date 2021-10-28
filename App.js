import React from 'react';
import { View, StyleSheet, Pressable, Text, NativeModules } from 'react-native';

const { GroupNotification } = NativeModules;

const App = () => {

  const pressHandler = (messageId) => {
    GroupNotification.groupNotification(messageId, `Person ${messageId}`)
  };


  return (
    <View style={styles.root}>
      <Pressable style={styles.button} onPress={pressHandler.bind(this, 1)}>
        <Text>Person 1 </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={pressHandler.bind(this, 2)}>
        <Text>Person 2</Text>
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
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightskyblue',
  },
});

export default App;