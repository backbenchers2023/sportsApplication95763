import 'package:flutter/material.dart';
import 'package:live_sr/sports_app.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Tournament App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SportsApp(
        title: 'Sports',
      ),
    );
  }
}
