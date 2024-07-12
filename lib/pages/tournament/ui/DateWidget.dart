import 'package:flutter/material.dart';
import 'package:live_sr/pages/tournament/ui/FormFieldWidget.dart';

class DatePickerWidget extends StatelessWidget {
  final TextEditingController controller;
  final String labelText;

  DatePickerWidget({required this.controller, required this.labelText});

  @override
  Widget build(BuildContext context) {
    return FormFieldWidget(
      controller: controller,
      labelText: labelText,
      hintText: "MM/DD/YYYY",
      readOnly: true,
      onTap: () async {
        DateTime? pickedDate = await showDatePicker(
          context: context,
          initialDate: DateTime.now(),
          firstDate: DateTime(2000),
          lastDate: DateTime(2101),
        );
        if (pickedDate != null) {
          controller.text =
              "${pickedDate.month}/${pickedDate.day}/${pickedDate.year}";
        }
      },
      validator: (value) {
        if (value!.isEmpty) {
          return 'Please select a date';
        }
        return null;
      },
    );
  }
}
