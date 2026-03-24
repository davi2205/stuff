#ifndef _UCI_H_
#define _UCI_H_

struct uci_type {
  const char  *name;
  int          size;
  int        (*msghandler)(int, void*);  
};

struct uci_component;

int                   uci_init();
int                   uci_createtype(const struct uci_type *type);
struct uci_component *uci_create(const char *typename, const char *data);
void                  uci_test();


#endif /* _UCI_H_ */