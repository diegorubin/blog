#include <python2.7/Python.h>
int main(){

    Py_Initialize();
    PyRun_SimpleString("print 'teste'");
    Py_Finalize();

    return 0;
}
