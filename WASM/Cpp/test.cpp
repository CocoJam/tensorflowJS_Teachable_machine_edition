
#include <emscripten.h>
#include <stdio.h>
#include <emscripten/bind.h>
#include <cstddef>
#include <array>
#include <vector>
#include <cstdlib>
// em++ -std=c++17 --bind -L lib/dlib/build/dlib/libdlib.so -I lib/dlib test.cpp -o ../WASM/test.html -s EXTRA_EXPORTED_RUNTIME_METHODS=['addOnPostRun'] -s WASM=1 -s ALLOW_MEMORY_GROWTH=1
#include <iostream>
#include <dlib/matrix.h>
using namespace dlib;
using namespace std;

int main(){
    matrix<double ,2,2> m1;
    m1=  1.0,2.0,3.0,4.0;
    m1=m1+1;
    std::cout<< m1 <<std::endl;
    std::cout<< inv(m1) <<std::endl;
    return 0;
}