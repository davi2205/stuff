
#include <stdio.h>
#include <stdlib.h>
#include "uci.h"

int test(int message, void *payload) {
  printf("Message: %d\n", message);
  return 0;
}

int main(int argc, char **argv) {
  struct uci_component *comp;
  uci_init();
  uci_createtype(&(struct uci_type) {
    .name = "ucix/button",
    .msghandler = test,
    .size = 23
  });
  comp = uci_create("ucix/button", NULL);
  uci_test();
  return 0;
}