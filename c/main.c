
#include <stdio.h>
#include <stdlib.h>
#include "uci.h"

int test(int message, void *payload) {
  printf("Message: %d\n", message);
  return 0;
}

int main(int argc, char **argv) {
  uci_init();
  uci_createtype(&(struct uci_type) { .name = "example", .msghandler = test });
  uci_test();
  system("pause");
  return 0;
}