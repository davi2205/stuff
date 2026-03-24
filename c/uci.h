#ifndef _UCI_H_
#define _UCI_H_

struct uci_type {
  const char  *name;
  int        (*msghandler)(int, void*);  
};

int   uci_init();
int   uci_createtype(const struct uci_type *type);
void  uci_test();


#endif /* _UCI_H_ */