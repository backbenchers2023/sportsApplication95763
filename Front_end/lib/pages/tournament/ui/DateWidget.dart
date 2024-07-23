import 'package:flutter/material.dart';
import 'package:live_sr/pages/tournament/ui/FormFieldWidget.dart';

class DatePickerWidget extends StatelessWidget {
  final TextEditingController controller;
  final String labelText;

  DatePickerWidget({required this.controller, required this.labelText});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 40, // Adjust height as needed
      child: TextFormField(
        controller: controller,
        readOnly: true,
        decoration: InputDecoration(
          labelText: labelText,
          border: OutlineInputBorder(),
          contentPadding: EdgeInsets.symmetric(horizontal: 12),
        ),
        onTap: () async {
          DateTime? pickedDate = await showDatePicker(
            context: context,
            initialDate: DateTime.now(),
            firstDate: DateTime(2000),
            lastDate: DateTime(2101),
          );
          if (pickedDate != null) {
            controller.text = "${pickedDate.toLocal()}".split(' ')[0];
          }
        },
      ),
    );
  }
}
