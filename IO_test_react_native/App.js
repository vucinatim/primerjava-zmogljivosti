import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function App() {

  var count = 0;

  const onPress = () => {
    count += 1;
    try {
      // create a path
      var path = FileSystem.documentDirectory + '/test.txt'

      // start the timer
      var startTimeWrite = new Date()

      // write the file
      FileSystem.writeAsStringAsync(path, 'Prof. Matjaž B. Jurič je najboljši mentor :)')
        .then(() => {
          var endTimeWrite = new Date()
          var differenceWrite = endTimeWrite - startTimeWrite;
          console.log(count + ' Write: ' + differenceWrite);
        })
        .catch(error => {
          console.error(error);
        });

      // start the timer
      var startTimeRead = new Date()

      // read the file
      FileSystem.readAsStringAsync(path)
        .then((str) => {
          var endTimeRead = new Date()
          var differenceRead = endTimeRead - startTimeRead;
          console.log(count + ' Read: ', differenceRead);
        })
        .catch(error => {
          console.error(error);
        });
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Testiranje Zmogljivosti IO</Text>
      <StatusBar style="auto" />
      <Button title="Click Me" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
