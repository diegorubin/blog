#include<stdio.h>
#include<stdlib.h>
#include<dlfcn.h>

int main(int argc, char **argv)
{
  void *handle;
  unsigned long int (*fatorial)(unsigned long int);
  unsigned long int  valor;
  char *error;

  handle = dlopen("libfatorial.so",RTLD_LAZY);
  if(!handle)
  {
    fprintf(stderr, "%s\n", dlerror());
    exit(1);
  }

  fatorial  = dlsym(handle, "fatorial");
  if((error = dlerror()) != NULL)
  {
    fprintf(stderr,"%s\n", error);
    exit(1);
  }

  printf("Digite um valor:\n");
  scanf("%lu", &valor);

  printf("O fatorial de %lu é %lu\n",valor,(*fatorial)(valor));

  dlclose(handle);
  return 0;
}
