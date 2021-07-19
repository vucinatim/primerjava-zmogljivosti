import 'dart:io';

import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key}) : super(key: key);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int count = 0;

  Future<void> onPress() async {
    count += 1;
    try {
      String dir = (await getApplicationDocumentsDirectory()).path;
      File file = File('$dir/test.txt');

      // start the timer
      var startTimeWrite = DateTime.now();

      // write the file
      await (file)
          .writeAsString('Prof. Matjaž B. Jurič je najboljši mentor :)')
          .whenComplete(() {
        DateTime endTimeWrite = DateTime.now();
        Duration differenceWrite = endTimeWrite.difference(startTimeWrite);
        print('$count Write: ${differenceWrite.inMilliseconds}');
      });

      // start the timer
      var startTimeRead = DateTime.now();

      // read the file
      await (file).readAsString().whenComplete(() {
        DateTime endTimeRead = DateTime.now();
        Duration differenceRead = endTimeRead.difference(startTimeRead);
        print('$count Read: ${differenceRead.inMilliseconds}');
      });
    } on FileSystemException {
      print('FileSystemException');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          Center(
            child: Text('Testiranje Zmogljivosti IO'),
          ),
          TextButton(
            onPressed: onPress,
            child: Text('Click Me'),
          )
        ],
      ),
    );
  }
}
