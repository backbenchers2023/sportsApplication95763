import 'dart:convert';

class TournamentModal {
  String tournamentName;
  String city;
  String ground;
  String organizerName;
  String phoneNumber;
  String entryFees;
  String lastEntry;
  String startDate;
  String endDate;
  String category1;
  String category2;
  String matchType;
  String pitchType;
  String? posterPath;
  String? logoPath;

  TournamentModal({
    required this.tournamentName,
    required this.city,
    required this.ground,
    required this.organizerName,
    required this.phoneNumber,
    required this.entryFees,
    required this.lastEntry,
    required this.startDate,
    required this.endDate,
    required this.category1,
    required this.category2,
    required this.matchType,
    required this.pitchType,
    this.posterPath,
    this.logoPath,
  });

  factory TournamentModal.fromJson(Map<String, dynamic> json) {
    return TournamentModal(
      tournamentName: json['tournamentName'],
      city: json['city'],
      ground: json['ground'],
      organizerName: json['organizerName'],
      phoneNumber: json['phoneNumber'],
      entryFees: json['entryFees'],
      lastEntry: json['lastEntry'],
      startDate: json['startDate'],
      endDate: json['endDate'],
      category1: json['category1'],
      category2: json['category2'],
      matchType: json['matchType'],
      pitchType: json['pitchType'],
      posterPath: json['posterPath'],
      logoPath: json['logoPath'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'tournamentName': tournamentName,
      'city': city,
      'ground': ground,
      'organizerName': organizerName,
      'phoneNumber': phoneNumber,
      'entryFees': entryFees,
      'lastEntry': lastEntry,
      'startDate': startDate,
      'endDate': endDate,
      'category1': category1,
      'category2': category2,
      'matchType': matchType,
      'pitchType': pitchType,
      'posterPath': posterPath,
      'logoPath': logoPath,
    };
  }
}

// Example usage:
// Convert a Tournament object to JSON string
String tournamentToJson(TournamentModal data) => json.encode(data.toJson());

// Convert JSON string to Tournament object
TournamentModal tournamentFromJson(String str) =>
    TournamentModal.fromJson(json.decode(str));
