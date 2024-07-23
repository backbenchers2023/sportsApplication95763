import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class CustomTextForm extends StatefulWidget {
  final Function? validator;
  final TextEditingController? controller;
  final TextInputType? keyboardType;
  final bool? obsecureText;
  final int? maxLines;
  final int? errorMaxLines;
  final VoidCallback? onTap;
  final bool? readOnly;
  final Widget? suffixIcon;
  final String? hint;
  final bool? enabled;
  final Color? fillColor;
  final Widget? prefixIcon;
  final TextStyle? textStyle;

  const CustomTextForm({
    this.validator,
    this.controller,
    this.keyboardType,
    this.obsecureText,
    this.maxLines,
    this.errorMaxLines,
    this.onTap,
    this.readOnly,
    this.suffixIcon,
    this.prefixIcon,
    this.hint,
    this.enabled,
    this.fillColor,
    this.textStyle,
  });

  @override
  State<CustomTextForm> createState() => _CustomTextFormState();
}

class _CustomTextFormState extends State<CustomTextForm> {
  @override
  Widget build(BuildContext context) {
    return TextFormField(
      onTap: widget.onTap,
      readOnly: widget.readOnly ?? false,
      maxLines: widget.maxLines ?? 1,
      enabled: widget.enabled ?? true,
      validator: (String? value) => widget.validator!(value),
      controller: widget.controller,
      keyboardType: widget.keyboardType ?? TextInputType.text,
      obscureText: widget.obsecureText ?? false,
      style: widget.textStyle ?? const TextStyle(color: Colors.white),
      decoration: InputDecoration(
          hintText: widget.hint ?? '',
          prefixIcon: widget.prefixIcon,
          suffixIcon: widget.suffixIcon,
          fillColor: widget.fillColor ?? Colors.white,
          filled: true,
          focusedBorder: inputBorder(Colors.green, 1.0),
          enabledBorder: inputBorder(Colors.blue, 1.0),
          errorBorder: inputBorder(Colors.red, 1.0),
          border: inputBorder(Colors.black, 1.0),
          errorMaxLines: widget.errorMaxLines ?? 1,
          contentPadding: const EdgeInsets.only(left: 10.0, right: 10.0),
          errorStyle: const TextStyle(color: Colors.red)),
    );
  }

  InputBorder inputBorder(Color borderColor, double width) {
    return OutlineInputBorder(
      borderRadius: BorderRadius.circular(10.0),
      borderSide: BorderSide(color: borderColor, width: width),
    );
  }
}
