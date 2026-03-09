class Tag {
  final String content;

  Tag(this.content) {
    if (content.length > 20) {
      throw ArgumentError('Tag content cannot exceed 20 characters');
    }
  }
}
