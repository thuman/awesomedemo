import React, { useState, useRef } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

const App = () => {
  const viewRef = useRef(null);
  const [viewPosition, setViewPosition] = useState({ x: 0, y: 0 });
  let timer = null

  const onScroll = () => {
    console.log('onScroll')
    if (viewRef && viewRef.current) {
      try {
        viewRef.current.measureInWindow(function (x, y, width, height) {
          console.log({x, y, width, height})
          setViewPosition({ x: x, y: y });
        });
      } catch (error) {
        console.error('Error measuring the view:', error);
      }
    }
  };
  
  return (
    <ScrollView onScroll={onScroll}>
      <View style={styles.container}>
        <Text style={styles.text}>Scroll the screen</Text>
        <View ref={viewRef} style={styles.measuredView}>
          <Text style={styles.text}>This is the view to be measured x:{viewPosition.x} y:{viewPosition.y} </Text>
        </View>
        <View style={styles.bottom}></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bottom: {
    height: 700,
    width: 100,
    backgroundColor: 'red'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    margin: 20,
  },
  measuredView: {
    width: 200,
    height: 200,
    backgroundColor: 'lightblue',
    margin: 20,
  },
});

export default App;