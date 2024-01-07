
UNIT Stream;

INTERFACE

TYPE 
  TCursor = RECORD
    index     : Integer;
    col, line : Integer;
  END;

  TTokenType = (
                TokenTypeString,
                TokenTypeNumber,
                TokenTypeName,
                TokenTypeInvalid
               );

  TToken = RECORD
    _type       : TTokenType;
    content     : String;
    start, _end : TCursor;
  END;

  TStreamDesc = RECORD
    str    : STRING;
    cursor : TCursor
  END;

  TStream = ^TStreamDesc;

PROCEDURE ResetCursor(VAR c: TCursor);

PROCEDURE ResetToken(VAR t: TToken);

PROCEDURE NewStream(VAR s: TStream; inputStr: STRING);
FUNCTION  StreamCurChar(s: TStream): Char;
FUNCTION  StreamNextChar(s: TStream): Char;
PROCEDURE DisposeStream(VAR s: TStream);
PROCEDURE AdvanceStream(s: TStream; amount: Integer);
OVERLOAD;
PROCEDURE AdvanceStream(s: TStream);
OVERLOAD;
PROCEDURE ReadStreamNextName(s: TStream; VAR name: TToken);
PROCEDURE ReadStreamNextString(s: TStream; VAR _string: TToken);
PROCEDURE ReadStreamNextNumber(s: TStream; VAR number: TToken);
PROCEDURE ReadStreamNextToken(s: TStream; VAR token: TToken);

IMPLEMENTATION

USES Character, SysUtils;

PROCEDURE ResetCursor(VAR c: TCursor);
BEGIN
  c.index := 1;
  c.col   := 1;
  c.line  := 1;
END;

PROCEDURE ResetToken(VAR t: TToken);
BEGIN
  t._type   := TokenTypeInvalid;
  t.content := '';
  ResetCursor(t.start);
  ResetCursor(t._end);
END;

PROCEDURE NewStream(VAR s: TStream; inputStr: STRING);
BEGIN
  New(s);
  s^.str := inputStr;
  ResetCursor(s^.cursor);
END;

FUNCTION StreamCurChar(s: TStream): Char;
BEGIN
  IF s^.cursor.index > Length(s^.str) THEN
    StreamCurChar := Char(0)
  ELSE
    StreamCurChar := s^.str[s^.cursor.index];
END;

FUNCTION StreamNextChar(s: TStream): Char;
BEGIN
  IF (s^.cursor.index+1) > Length(s^.str) THEN
    StreamNextChar := Char(0)
  ELSE
    StreamNextChar := s^.str[s^.cursor.index+1];
END;

PROCEDURE DisposeStream(VAR s: TStream);
BEGIN
  Dispose(s);
END;

PROCEDURE AdvanceStream(s: TStream; amount: Integer);
OVERLOAD;
BEGIN
  WHILE (amount > 0) AND (s^.cursor.index <= Length(s^.str)) DO
    BEGIN
      IF StreamCurChar(s) = LineEnding THEN
        BEGIN
          s^.cursor.col := 1;
          Inc(s^.cursor.line);
        END
      ELSE
        Inc(s^.cursor.col);

      Inc(s^.cursor.index);
      Dec(amount);
    END;
END;

PROCEDURE AdvanceStream(s: TStream);
OVERLOAD;
BEGIN
  AdvanceStream(s, 1);
END;

PROCEDURE ReadStreamNextName(s: TStream; VAR name: TToken);
VAR 
  start, oldCursor : TCursor;
  ch               : Char;
BEGIN
  ResetToken(name);

  oldCursor := s^.cursor;

  WHILE IsWhiteSpace(StreamCurChar(s)) DO
    AdvanceStream(s);

  start := s^.cursor;
  ch    := StreamCurChar(s);

  IF NOT ((ch = '''') OR IsDigit(ch) OR (ch = Char(0))) THEN
    BEGIN
      REPEAT
        AdvanceStream(s);
        ch := StreamCurChar(s);
      UNTIL IsWhiteSpace(ch) OR (ch = Char(0));

      name._type   := TokenTypeName;
      name.content := Copy(s^.str, start.index, s^.cursor.
                      index - start.index);
      name.start   := start;
      name._end    := s^.cursor;
    END
  ELSE
    s^.cursor := oldCursor;
END;

PROCEDURE ReadStreamNextString(s: TStream; VAR _string: TToken);

PROCEDURE UnquoteString(VAR _string: TToken);
VAR 
  i, j       : Integer;
  ch, prevCh : Char;
BEGIN
  j      := 1;
  prevCh := Char(0);

  FOR i := 1 TO Length(_string.content) DO
    BEGIN
      ch := _string.content[i];

      IF NOT ((ch = '''') AND (prevCh = '''')) THEN
        BEGIN
          _string.content[j] := ch;
          Inc(j);
        END;

      prevCh := ch;
    END;

  SetLength(_string.content, j-1);
END;

VAR 
  start, oldCursor : TCursor;
  ch               : Char;
BEGIN
  ResetToken(_string);

  oldCursor := s^.cursor;

  WHILE IsWhiteSpace(StreamCurChar(s)) DO
    AdvanceStream(s);

  start := s^.cursor;
  ch    := StreamCurChar(s);

  IF ch = '''' THEN
    BEGIN
      REPEAT
        AdvanceStream(s);
        ch := StreamCurChar(s);
        IF (ch = '''') AND (StreamNextChar(s) = '''') THEN
          BEGIN
            AdvanceStream(s, 2);
            ch := StreamCurChar(s);
          END
      UNTIL (ch = '''') OR (ch = Char(0));

      IF ch = '''' THEN
        BEGIN
          AdvanceStream(s);

          _string._type   := TokenTypeString;
          _string.content := Copy(s^.str, start.index + 1, s^.cursor.index -
                             start.index - 2);
          _string.start   := start;
          _string._end    := s^.cursor;

          UnquoteString(_string);
        END
      ELSE
        s^.cursor := oldCursor;
    END
  ELSE
    s^.cursor := oldCursor;
END;

PROCEDURE ReadStreamNextNumber(s: TStream; VAR number:
                               TToken);
VAR 
  start, eStart, oldCursor : TCursor;
  done, foundDot           : Boolean;
  ch                       : Char;
BEGIN
  ResetToken(number);

  done      := False;
  foundDot  := False;
  oldCursor := s^.cursor;

  WHILE IsWhiteSpace(StreamCurChar(s)) DO
    AdvanceStream(s);

  start := s^.cursor;
  ch    := StreamCurChar(s);

  IF (ch = '-') OR (ch = '+') THEN
    BEGIN
      AdvanceStream(s);
      ch := StreamCurChar(s);
    END;

  IF IsDigit(ch) THEN
    BEGIN
      REPEAT
        AdvanceStream(s);
        ch := StreamCurChar(s);

        IF (ch = '.') AND NOT foundDot THEN
          foundDot := True
        ELSE
          IF NOT IsDigit(ch) THEN
            done := True;
      UNTIL done;

      IF (ch = 'e') OR (ch = 'E') THEN
        BEGIN
          eStart := s^.cursor;

          AdvanceStream(s);
          ch := StreamCurChar(s);

          IF (ch = '+') OR (ch = '-') THEN
            BEGIN
              AdvanceStream(s);
              ch := StreamCurChar(s);
            END;

          IF isDigit(ch) THEN
            BEGIN
              REPEAT
                AdvanceStream(s);
                ch := StreamCurChar(s);
              UNTIL NOT IsDigit(ch)
            END
          ELSE
            s^.cursor := eStart;
        END;

      number._type   := TokenTypeNumber;
      number.content := Copy(s^.str, start.index, s^.cursor.index - start.index)
      ;
      number.start   := start;
      number._end    := s^.cursor;
    END
  ELSE
    s^.cursor := oldCursor;
END;

PROCEDURE ReadStreamNextToken(s: TStream; VAR token: TToken);
BEGIN
  ReadStreamNextName(s, token);
  IF token._type = TokenTypeInvalid THEN
    ReadStreamNextNumber(s, token);
  IF token._type = TokenTypeInvalid THEN
    ReadStreamNextString(s, token);
END;

END.
