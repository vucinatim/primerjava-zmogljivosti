import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, Image } from 'react-native';

const APP_BAR_HEIGHT = 60 + StatusBar.currentHeight;

export default function App() {

  const entries = Array.from(Array(1000).keys())

  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: APP_BAR_HEIGHT,
        backgroundColor: '#208ec9',
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 10,
      }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Scroll Test React Native</Text>
      </View>
      <FlatList
        style={{ padding: 10 }}
        data={entries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          var green = 100 - (index / 10);
          var blue = (index / 10) * 2;
          return <View
            style={{
              height: 50,
              width: '100%',
              marginBottom: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: `rgba(238, ${green}, ${blue}, 0.4)`,
            }} >
            <View style={styles.stack}>
              <Image style={{
                height: '100%',
                opacity: 0.4,
              }} source={{ uri: 'https://image.freepik.com/free-vector/pattern-geometric-line-circle-abstract-seamless-blue-line_60284-53.jpg' }} />
              <Text style={{
                fontWeight: 'bold',
                color: 'white',
                position: 'absolute',
                alignSelf: 'center',
                textAlignVertical: 'center',
                height: '100%',
              }}>{'Entry ' + item}</Text>
            </View>
          </View>
        }
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stack: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
});
