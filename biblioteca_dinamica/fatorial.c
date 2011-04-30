/*
 *   arquivo: fatorial.c
 *   */

unsigned long int fatorial(unsigned long int valor)
{
  unsigned long total = 1;
  int i;
  for(i=valor;i>=2;i--)
    total *= i;

  return total;
}

