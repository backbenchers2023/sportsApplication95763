// ignore_for_file: prefer_const_constructors, library_private_types_in_public_api

import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class ImagePickerRow extends StatefulWidget {
  const ImagePickerRow({Key? key}) : super(key: key);

  @override
  _ImagePickerRowState createState() => _ImagePickerRowState();
}

class _ImagePickerRowState extends State<ImagePickerRow> {
  File? _imageFile;
  String? _imageUrl;

  Future<void> _pickImage() async {
    final ImagePicker picker = ImagePicker();
    final XFile? pickedImage =
        await picker.pickImage(source: ImageSource.gallery);

    if (pickedImage != null) {
      setState(() {
        if (kIsWeb) {
          _imageUrl = pickedImage.path;
        } else {
          _imageFile = File(pickedImage.path);
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ElevatedButton(
          onPressed: _pickImage,
          child: Text('Pick Image'),
        ),
        SizedBox(height: 10),
        if (kIsWeb)
          _imageUrl != null
              ? ClipRRect(
                  borderRadius: BorderRadius.circular(
                      10.0), // Adjust the radius as needed
                  child: SizedBox(
                    width: 50.0,
                    height: 50.0,
                    child: Image.network(
                      _imageUrl!,
                      fit: BoxFit.cover,
                    ),
                  ),
                )
              : Text('No image selected.')
        else
          _imageFile != null
              ? ClipRRect(
                  borderRadius: BorderRadius.circular(
                      10.0), // Adjust the radius as needed
                  child: SizedBox(
                    width: 30.0,
                    height: 30.0,
                    child: Image.file(
                      _imageFile!,
                      fit: BoxFit.cover,
                    ),
                  ),
                )
              : Text('No image selected.'),
      ],
    );
  }
}
