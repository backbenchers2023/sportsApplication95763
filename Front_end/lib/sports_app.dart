import 'package:flutter/material.dart';
import 'pages/teamdetails/ui/start_match.dart'; // Import your Start Match page
// import 'go_live.dart'; // Import your Go Live page
// import 'looking_for.dart'; // Import your Looking For page
// import 'leaderboard.dart'; // Import your Leaderboard page
// import 'news.dart'; // Import your News page
import 'pages/tournament/ui/tournament.dart'; // Import your Tournament page

// Main widget of the application
class MyApp extends StatelessWidget {
  final appTitle = 'SportsApp';

  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: appTitle,
      debugShowCheckedModeBanner: false, // Set this property to false
      home: SportsApp(title: appTitle),
    );
  }
}

// Stateful widget to manage state for the bottom navigation bar
class SportsApp extends StatefulWidget {
  final String title;

  const SportsApp({Key? key, required this.title}) : super(key: key);

  @override
  _SportsAppState createState() => _SportsAppState();
}

class _SportsAppState extends State<SportsApp> {
  // Index of the currently selected bottom navigation bar item
  int _selectedIndex = 0;

  // List of widgets to display based on the selected index
  static const List<Widget> _widgetOptions = <Widget>[
    Text('Home'),
    Text('Football'),
    Text('Kabbadi'),
    Text('Volleyball'),
  ];

  // Method to handle bottom navigation bar item taps
  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        backgroundColor: Colors.blue,
      ),
      body: Center(
        // Display the widget corresponding to the selected index
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      // Side navigation drawer
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            const UserAccountsDrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
              accountName: Text(
                "User Login Name",
                style: TextStyle(fontSize: 18),
              ),
              accountEmail: Text("userloginemail@gmail.com"),
              currentAccountPicture: CircleAvatar(
                backgroundColor: Colors.white,
                child: Text(
                  "U",
                  style: TextStyle(fontSize: 30.0, color: Colors.blue),
                ),
              ),
            ),
            // Drawer menu items with relevant icons and navigation logic
            _createDrawerItem(
                icon: Icons.sports_tennis,
                text: 'Start Match',
                onTap: () => _navigateTo(context, StartMatchPage())),
            // _createDrawerItem(
            //     icon: Icons.live_tv,
            //     text: 'Go Live',
            //     onTap: () => _navigateTo(context, GoLivePage())),
            // _createDrawerItem(
            //     icon: Icons.search,
            //     text: 'Looking For',
            //     onTap: () => _navigateTo(context, LookingForPage())),
            // _createDrawerItem(
            //     icon: Icons.leaderboard,
            //     text: 'Leaderboard',
            //     onTap: () => _navigateTo(context, LeaderboardPage())),
            // _createDrawerItem(
            //     icon: Icons.article,
            //     text: 'News',
            // onTap: () => _navigateTo(context, NewsPage())),
            _createDrawerItem(
                icon: Icons.emoji_events,
                text: 'Tournament',
                onTap: () =>
                    _navigateTo(context, TournamentForm())), // Updated icon
            _createDrawerItem(
                icon: Icons.logout,
                text: 'LogOut',
                onTap: () {
                  // Handle logout logic here
                  Navigator.pop(context); // Close the drawer on item tap
                }),
          ],
        ),
      ),
      // Bottom navigation bar with four items
      bottomNavigationBar: Theme(
        data: Theme.of(context).copyWith(
          canvasColor: Colors.blue, // Set the background color here
        ),
        child: BottomNavigationBar(
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Icon(Icons.home),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.sports_soccer),
              label: 'Football',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.sports_kabaddi),
              label: 'Hockey',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.sports_volleyball),
              label: 'Volleyball',
            ),
          ],
          currentIndex: _selectedIndex,
          selectedItemColor: Color.fromARGB(255, 6, 19, 30),
          onTap: _onItemTapped,
        ),
      ),
    );
  }

  // Helper method to create drawer items with navigation logic
  ListTile _createDrawerItem(
      {required IconData icon,
      required String text,
      required Function() onTap}) {
    return ListTile(
      leading: Icon(icon),
      title: Text(text),
      onTap: () {
        Navigator.pop(context); // Close the drawer on item tap
        onTap();
      },
    );
  }

  // Helper method to navigate to a new page
  void _navigateTo(BuildContext context, Widget page) {
    Navigator.push(context, MaterialPageRoute(builder: (context) => page));
  }
}
    