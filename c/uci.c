
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "uci.h"

struct uci_typenode {
  struct uci_type type;
  struct uci_typenode *next;
};

struct uci_component {
  struct  uci_type *type;
  char    data[];
};

static struct uci_typenode *firsttypenode;

static struct uci_type *typebyname(const char *name) {
  struct uci_typenode *node;
  for (node = firsttypenode; node; node = node->next) {
    if (strcmp(node->type.name, name) == 0) {
      return &node->type;
    }
  }
  return NULL;
}

static int typeexists(const struct uci_type *type) {
  return typebyname(type->name) != NULL;
}

int uci_init() {
  firsttypenode = NULL;
  return 0;
}

int uci_createtype(const struct uci_type *type) {
  struct uci_typenode *node;
  if (typeexists(type)) {
    return 0;
  }
  node = malloc(sizeof(struct uci_typenode));
  if (!node) {
    return 0;
  }
  memcpy(&node->type, type, sizeof(struct uci_type));
  node->next = firsttypenode;
  firsttypenode = node;
  return 1;
}

struct uci_component *uci_create(const char *typename, const char *data) {
  struct uci_type *type;
  struct uci_component *comp;
  type = typebyname(typename);
  if (!type) {
    return NULL;
  }
  comp = calloc(1, sizeof(struct uci_component) + type->size);
  if (!comp) {
    return NULL;
  }
  comp->type = type;
  return comp;
}

void uci_test() {
  struct uci_typenode *node;
  for (node = firsttypenode; node; node = node->next) {
    node->type.msghandler(42, NULL);
  }
}