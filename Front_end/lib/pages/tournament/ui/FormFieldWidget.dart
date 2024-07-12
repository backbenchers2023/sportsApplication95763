import 'package:flutter/material.dart';

class FormFieldWidget extends StatelessWidget {
  final TextEditingController controller;
  final String labelText;
  final String? hintText;
  final bool readOnly;
  final VoidCallback? onTap;
  final TextInputType keyboardType;
  final String? Function(String?)? validator;

  FormFieldWidget({
    required this.controller,
    required this.labelText,
    this.hintText,
    this.readOnly = false,
    this.onTap,
    this.keyboardType = TextInputType.text,
    this.validator,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      decoration: InputDecoration(
        labelText: labelText,
        hintText: hintText,
        border: OutlineInputBorder(),
      ),
      readOnly: readOnly,
      onTap: onTap,
      keyboardType: keyboardType,
      validator: validator,
    );
  }
}
