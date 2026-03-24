import 'package:flutter/foundation.dart';
import 'package:loglet/core/tag.dart';
import '../models/log_let.dart';

class LogLetsProvider extends ChangeNotifier {
  final List<LogLet> _entries = [];
  List<LogLet> get entries => List.unmodifiable(_entries);

  void addLogLet({required Tag tag}) {
    _entries.add(
      LogLet(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        tag: tag,
        createdAt: DateTime.now(),
        lastUpdatedAt: DateTime.now(),
      ),
    );
  }
}
