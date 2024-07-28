import 'package:flutter/material.dart';
import 'package:live_sr/sports_app.dart';
import 'pages/Score_Card/Ui_Design/livescore.dart';
import 'helpers/app_data.dart';

void main() {
  runApp(SportsApps());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Tournament App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        fontFamily: URBANIST_FONT_FAMILY,
      ),
      home: const SportsApp(
        title: 'Sports',
      ),
    );
  }
}
