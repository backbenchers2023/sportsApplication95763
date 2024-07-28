import 'package:flutter/material.dart';
import '../../../helpers/app_data.dart';

class SportsApps extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
        fontFamily: 'URBANIST_FONT_FAMILY',
      ),
      home: ScorecardPage(),
    );
  }
}

class ScorecardPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Score card"),
        backgroundColor: Color.fromARGB(255, 185, 232, 230),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _buildTeamInfo('MR Strickers', 'assets/Images/img1.jfif'),
                Text(
                  '3',
                  style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
                ),
                Column(
                  children: [
                    Icon(Icons.sports_soccer, size: 30),
                     Text(
                      'LIVE',
                      style: TextStyle(color: Colors.red, fontSize: 12 , fontWeight: FontWeight.w600),
                    ),
                  ],
                ),
                Text(
                  '2',
                  style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
                ),
                _buildTeamInfo('SVFC', 'assets/Images/img2.jpg'),
              ],
            ),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Naveen Kumar'),
                    Text('Suriya'),
                    Text('Hari'),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text('Anguraj'),
                    Text('Dhayalan'),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTeamInfo(String teamName, String imagePath) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        ClipOval(
          child: Container(
            width: 65,
            height: 70,
           decoration: BoxDecoration(
              shape: BoxShape.circle,
            ),
            child: Image.asset(
              imagePath,
              fit: BoxFit.fitWidth,
            ),
          ),
        ),
        Flexible(
          child: Text(
            teamName,
            style: const TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.bold,
              letterSpacing: 1,
            ),
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ],
    );
  }
}
