
PROGRAM test;

USES SysUtils;

VAR 
  a: String;
BEGIN
  SetLength(a, 100);
  a[1] := '2';
  Writeln(StrToFloat(a));
END.
