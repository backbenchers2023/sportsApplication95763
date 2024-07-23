import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:live_sr/pages/tournament/model/tournament_modal.dart';
import 'package:live_sr/pages/tournament/ui/DateWidget.dart';
import 'package:live_sr/pages/tournament/ui/ImagePickerRow.dart';
import '../../../Reusable Widget/custom_textfield.dart';

class TournamentForm extends StatefulWidget {
  @override
  _TournamentFormState createState() => _TournamentFormState();
}

class _TournamentFormState extends State<TournamentForm> {
  final _formKey = GlobalKey<FormState>();

  TextEditingController tournamentNameController = TextEditingController();
  TextEditingController cityController = TextEditingController();
  TextEditingController groundController = TextEditingController();
  TextEditingController organizerNameController = TextEditingController();
  TextEditingController phoneNumberController = TextEditingController();
  TextEditingController entryFeesController = TextEditingController();
  TextEditingController lastEntryController = TextEditingController();
  TextEditingController startDateController = TextEditingController();
  TextEditingController endDateController = TextEditingController();
  TextEditingController category1Controller = TextEditingController();
  TextEditingController category2Controller = TextEditingController();
  TextEditingController matchTypeController = TextEditingController();

  XFile? _poster;
  XFile? _logo;
  String _pitchType = 'mud';

  Future<void> _pickPoster() async {
    final ImagePicker _picker = ImagePicker();
    final XFile? image = await _picker.pickImage(source: ImageSource.gallery);
    setState(() {
      _poster = image;
    });
  }

  Future<void> _pickLogo() async {
    final ImagePicker _picker = ImagePicker();
    final XFile? image = await _picker.pickImage(source: ImageSource.gallery);
    setState(() {
      _logo = image;
    });
  }

  TournamentModal _tournament = TournamentModal(
    tournamentName: '',
    city: '',
    ground: '',
    organizerName: '',
    phoneNumber: '',
    entryFees: '',
    lastEntry: '',
    startDate: '',
    endDate: '',
    category1: '',
    category2: '',
    matchType: '',
    pitchType: 'mud',
  );

  void _updateTournamentData() {
    _tournament = TournamentModal(
      tournamentName: tournamentNameController.text,
      city: cityController.text,
      ground: groundController.text,
      organizerName: organizerNameController.text,
      phoneNumber: phoneNumberController.text,
      entryFees: entryFeesController.text,
      lastEntry: lastEntryController.text,
      startDate: startDateController.text,
      endDate: endDateController.text,
      category1: category1Controller.text,
      category2: category2Controller.text,
      matchType: matchTypeController.text,
      pitchType: _pitchType,
      posterPath: _poster?.path,
      logoPath: _logo?.path,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Create Tournament"),
        backgroundColor: Colors.blue,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: <Widget>[
              const Text("Upload Logo"),
              const ImagePickerRow(),
              const SizedBox(height: 20),
              CustomTextForm(
                controller: tournamentNameController,
                hint: "Tournament Name*",
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Please enter the tournament name';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 20),
              CustomTextForm(
                controller: cityController,
                hint: "City*",
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Please enter the city';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 20),
              CustomTextForm(
                controller: groundController,
                hint: "Ground*",
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Please enter the ground';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 20),
              CustomTextForm(
                controller: organizerNameController,
                hint: "Organizer Name*",
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Please enter the organizer name';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 20),
              CustomTextForm(
                controller: phoneNumberController,
                hint: "Phone Number*",
                keyboardType: TextInputType.phone,
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Please enter the phone number';
                  }
                  if (!RegExp(r'^\d+$').hasMatch(value)) {
                    return 'Please enter a valid phone number';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 20),
              CustomTextForm(
                controller: entryFeesController,
                hint: "Entry Fees*",
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Please enter the entry fees';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 20),
              DatePickerWidget(
                  controller: lastEntryController, labelText: "Last Entry*"),
              const SizedBox(height: 20),
              DatePickerWidget(
                  controller: startDateController, labelText: "Start Date*"),
              const SizedBox(height: 20),
              DatePickerWidget(
                  controller: endDateController, labelText: "End Date*"),
              const SizedBox(height: 20),
              CustomTextForm(
                  controller: category1Controller, hint: "Category "),
              const SizedBox(height: 20),
              CustomTextForm(
                controller: matchTypeController,
                hint: "Match Type*",
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Please enter the match type';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 20),
              const Text('Pitch Type*'),
              DropdownButton<String>(
                value: _pitchType,
                items: <String>['mud', 'green', 'mat']
                    .map<DropdownMenuItem<String>>((String value) {
                  return DropdownMenuItem<String>(
                    value: value,
                    child: Text(value),
                  );
                }).toList(),
                onChanged: (String? newValue) {
                  setState(() {
                    _pitchType = newValue!;
                  });
                },
              ),
              const SizedBox(height: 20),
              const Text("Upload Poster"),
              ImagePickerRow(),
              const SizedBox(height: 20),
              Center(
                child: ElevatedButton(
                  onPressed: () {
                    if (_formKey.currentState!.validate()) {
                      _updateTournamentData();
                      String tournamentJson = tournamentToJson(_tournament);
                      // You can now save `tournamentJson` to a file or send it to a server
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Processing Data')),
                      );
                    }
                  },
                  child: const Text("Submit"),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
