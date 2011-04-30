/*
 *   arquivo: program.c
 *   */

#include <stdio.h>
#include "fatorial.h"

int main(){

  unsigned long int valor;

  printf("Digite um valor:\n");
  scanf("%lu", &valor);

  printf("O fatorial de %lu é %lu\n",valor,fatorial(valor));

  return 0;
}

