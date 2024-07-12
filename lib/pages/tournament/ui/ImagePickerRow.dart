import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

class ImagePickerRow extends StatelessWidget {
  final String buttonText;
  final XFile? image;
  final Future<void> Function() pickImage;

  ImagePickerRow(
      {required this.buttonText, required this.image, required this.pickImage});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        ElevatedButton(
          onPressed: pickImage,
          child: Text(buttonText),
        ),
        const SizedBox(width: 20),
        image == null
            ? const Text("No Image Selected")
            : Image.file(
                File(image!.path),
                height: 100,
                width: 100,
              ),
      ],
    );
  }
}
