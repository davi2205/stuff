import 'package:flutter/foundation.dart';
import '../models/log_entry.dart';

class LogEntriesProvider extends ChangeNotifier {
  final List<LogEntry> _entries = [];
  List<LogEntry> get entries => List.unmodifiable(_entries);

  void addEntry(String title) {
    _entries.add(
      LogEntry(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        title: title,
        createdAt: DateTime.now(),
      ),
    );
    notifyListeners();
  }
}
