import 'package:loglet/core/tag.dart';

class LogLet {
  final String id;
  final Tag tag;
  final DateTime createdAt;
  final DateTime lastUpdatedAt;

  LogLet({
    required this.id,
    required this.tag,
    required this.createdAt,
    required this.lastUpdatedAt,
  });
}
