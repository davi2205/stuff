
PROGRAM Main;

USES Stream;

VAR 
  s    : TStream;
  t    : TToken;
  done : Boolean;
BEGIN
  NewStream(s, '   : my-word 232 ''test' + LineEnding +
            'estr ''''aaaaa'''' '' + - ! >base64 ;');

  done := False;

  REPEAT
    ReadStreamNextToken(s, t);

    CASE t._type OF 
      TokenTypeString:  Writeln('String: ''', t.content,
                                '''');
      TokenTypeNumber:  Writeln('Number: ''', t.content,
                                '''');
      TokenTypeName:    Writeln('Name: ''', t.content, '''');
      TokenTypeInvalid: done := True;
    END;
  UNTIL done;
END.
