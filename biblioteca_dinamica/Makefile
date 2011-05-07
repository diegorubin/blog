
lib:
	gcc -g -fPIC -shared -Wl,-soname,libfatorial.so fatorial.c -o libfatorial.so

load:
	gcc -g -o program_load program_load.c -ldl

program:
	gcc program.c -o program -L`pwd` -lfatorial

clean:
	rm -rf  libfatorial.so* *.o program_load program
