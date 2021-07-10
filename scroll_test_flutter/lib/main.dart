import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Scroll Test',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: ScrollTestPage(),
    );
  }
}

class ScrollTestPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final List<String> entries =
        List.generate(1000, (index) => index.toString());

    return Scaffold(
      appBar: AppBar(
        title: Text('Scroll Test Flutter'),
        backgroundColor: const Color(0xffff5666),
      ),
      body: ListView.builder(
          padding: const EdgeInsets.all(10),
          itemCount: entries.length,
          itemBuilder: (BuildContext context, int index) {
            return Container(
              height: 50,
              margin: EdgeInsets.only(bottom: 10),
              color:
                  Color.fromRGBO(238, 100 - index ~/ 10, index ~/ 10 * 2, 0.4),
              child: Stack(
                fit: StackFit.expand,
                children: [
                  Opacity(
                    opacity: 0.4,
                    child: FittedBox(
                      fit: BoxFit.fitWidth,
                      clipBehavior: Clip.antiAlias,
                      child: Image.network(
                          'https://image.freepik.com/free-vector/pattern-geometric-line-circle-abstract-seamless-blue-line_60284-53.jpg'),
                    ),
                  ),
                  Center(
                    child: Text(
                      'Entry ${entries[index]}',
                      style: TextStyle(
                          color: Colors.white, fontWeight: FontWeight.bold),
                    ),
                  ),
                ],
              ),
            );
          }),
    );
  }
}
