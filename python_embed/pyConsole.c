#include <stdio.h>
#include <python2.7/Python.h>

int main(){

    char command[200]; 

    Py_Initialize();
    for(;;){
        printf("-> ");
        scanf("%200[^\n]%*c",command);
        PyRun_SimpleString(command);
    }
    Py_Finalize();

    return 0;
}
