import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, Image } from 'react-native';

const APP_BAR_HEIGHT = 60 + StatusBar.currentHeight;

export default function App() {

  let [frameTimeState, setFrameTimeState] = useState({
    fps: 0,
    // better use performance.now()
    // but some static generators like gatsby
    // might have problems with that
    lastStamp: Date.now(),
    framesCount: 0
  });

  useEffect(() => {
    // NOTE: timeout is here
    // cuz requestAnimationFrame is deferred
    // and to prevent setStates on unmounted
    let timeout = null;

    requestAnimationFrame(() => timeout = setTimeout(() => {

      const currentStamp = Date.now();
      const shouldSetState = currentStamp - frameTimeState.lastStamp > 1000;

      const newFramesCount = frameTimeState.framesCount + 1;

      if (shouldSetState) {
        setFrameTimeState({
          fps: frameTimeState.framesCount,
          lastStamp: currentStamp,
          framesCount: 0,
        });
      } else {
        setFrameTimeState({
          ...frameTimeState,
          framesCount: newFramesCount,
        });
      }
    }, 0));
    return () => timeout && clearTimeout(timeout);
  }, [frameTimeState])

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
        <Text>{frameTimeState.fps} fps</Text>
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
