import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class TeamDetailsDialog extends StatefulWidget {
  final String team;

  const TeamDetailsDialog({required this.team});

  @override
  _TeamDetailsDialogState createState() => _TeamDetailsDialogState();
}

class _TeamDetailsDialogState extends State<TeamDetailsDialog> {
  final _formKey = GlobalKey<FormState>();
  String _teamName = '';
  int _numPlayers = 5;
  XFile? _teamLogo;
  final List<TextEditingController> _playerControllers = [];

  final ImagePicker _picker = ImagePicker();

  @override
  void initState() {
    super.initState();
    _initializePlayerControllers();
  }

  void _initializePlayerControllers() {
    _playerControllers.clear();
    for (int i = 0; i < _numPlayers; i++) {
      _playerControllers.add(TextEditingController());
    }
  }

  @override
  void dispose() {
    for (var controller in _playerControllers) {
      controller.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text('Enter Details for ${widget.team}'),
      content: Form(
        key: _formKey,
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              GestureDetector(
                onTap: () async {
                  final pickedFile =
                      await _picker.pickImage(source: ImageSource.gallery);
                  setState(() {
                    _teamLogo = pickedFile;
                  });
                },
                child: _teamLogo == null
                    ? CircleAvatar(
                        radius: 40,
                        child: Icon(Icons.add_a_photo),
                      )
                    : CircleAvatar(
                        radius: 40,
                        backgroundImage: FileImage(File(_teamLogo!.path)),
                      ),
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Team Name'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a team name';
                  }
                  return null;
                },
                onSaved: (value) {
                  _teamName = value!;
                },
              ),
              DropdownButtonFormField<int>(
                value: _numPlayers,
                decoration: InputDecoration(labelText: 'Number of Players'),
                items: [5, 7, 11].map((int value) {
                  return DropdownMenuItem<int>(
                    value: value,
                    child: Text(value.toString()),
                  );
                }).toList(),
                onChanged: (value) {
                  setState(() {
                    _numPlayers = value!;
                    _initializePlayerControllers();
                  });
                },
              ),
              ..._playerControllers.map((controller) {
                int index = _playerControllers.indexOf(controller) + 1;
                return TextFormField(
                  controller: controller,
                  decoration: InputDecoration(labelText: 'Player $index Name'),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter a name for Player $index';
                    }
                    return null;
                  },
                );
              }).toList(),
            ],
          ),
        ),
      ),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: Text('Cancel'),
        ),
        ElevatedButton(
          onPressed: () {
            if (_formKey.currentState!.validate()) {
              _formKey.currentState!.save();
              List<String> playerNames =
                  _playerControllers.map((c) => c.text).toList();
              Navigator.of(context).pop({
                'teamName': _teamName,
                'numPlayers': _numPlayers,
                'teamLogo': _teamLogo?.path,
                'players': playerNames,
              });
            }
          },
          child: Text('Submit'),
        ),
      ],
    );
  }
}
