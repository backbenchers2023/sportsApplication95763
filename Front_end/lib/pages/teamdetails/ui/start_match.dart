import 'package:flutter/material.dart';
import 'package:live_sr/pages/teamdetails/ui/team_details_dialog.dart';

class StartMatchPage extends StatefulWidget {
  @override
  _StartMatchPageState createState() => _StartMatchPageState();
}

class _StartMatchPageState extends State<StartMatchPage> {
  Map<String, dynamic> team1Details = {};
  Map<String, dynamic> team2Details = {};

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Start Match'),
        backgroundColor: Colors.blue,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                TeamCircle(
                  onTap: () async {
                    final details = await _showTeamDialog(context, 'Team 1');
                    if (details != null) {
                      setState(() {
                        team1Details = details;
                      });
                    }
                  },
                ),
                const SizedBox(width: 50),
                TeamCircle(
                  onTap: () async {
                    final details = await _showTeamDialog(context, 'Team 2');
                    if (details != null) {
                      setState(() {
                        team2Details = details;
                      });
                    }
                  },
                ),
              ],
            ),
            const SizedBox(height: 50),
            ElevatedButton(
              onPressed: () {
                // Handle start match logic here
                print('Team 1 Details: $team1Details');
                print('Team 2 Details: $team2Details');
              },
              child: const Text('Start Match'),
            ),
          ],
        ),
      ),
    );
  }

  Future<Map<String, dynamic>?> _showTeamDialog(
      BuildContext context, String team) {
    return showDialog<Map<String, dynamic>>(
      context: context,
      builder: (BuildContext context) {
        return TeamDetailsDialog(team: team);
      },
    );
  }
}

class TeamCircle extends StatelessWidget {
  final VoidCallback onTap;

  const TeamCircle({
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        width: 100,
        height: 100,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: Border.all(color: Colors.black, width: 2),
        ),
        child: const Center(
          child: Icon(Icons.add),
        ),
      ),
    );
  }
}
