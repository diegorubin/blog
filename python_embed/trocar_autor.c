#include <stdio.h>
#include <python2.7/Python.h>

int main(){

    PyObject *main_module, *dict;
    PyObject *trocar_autor, *resultado;

    char expressao[200];
    char substituto[200];
    char entrada[200];
    char saida[200];

    char *c_resultado;

    
    FILE *python;

    printf("Digite o nome da variavel\n");
    scanf("%200[^\n]%*c",expressao);

    printf("Digite o nome do valor\n");
    scanf("%200[^\n]%*c",substituto);

    printf("Arquivo de entrada\n");
    scanf("%200[^\n]%*c",entrada);

    printf("Arquivo de saida\n");
    scanf("%200[^\n]%*c",saida);

    Py_Initialize();
    main_module = PyImport_AddModule("__main__");
    dict = PyModule_GetDict(main_module);
   
    python = fopen("trocar_autor.py", "r");
    PyRun_SimpleFile(python, "trocar_autor.py");


    trocar_autor = PyDict_GetItemString(dict, "trocar");
    resultado = PyObject_CallFunction(trocar_autor,"ssss",entrada,saida,expressao,substituto);
    
    c_resultado = PyString_AsString(resultado);

    Py_Finalize();

    printf("--Texto Formatado--\n");
    printf("%s\n",c_resultado);

    return 0;
}
