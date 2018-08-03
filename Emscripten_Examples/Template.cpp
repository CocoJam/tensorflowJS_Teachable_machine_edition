#include "dlib/matrix.h"
#include <stdio.h>
#include <iostream>
#include <emscripten/bind.h>
#include <cstddef>
#include <cstdlib>


uint8_t *buffer = nullptr;

emscripten::val matrixCal(emscripten::val x){
    // EM_ASM(console.log('hello ' + UTF8ToString($0)), x);
    // std::cout<< x <<std::endl;
     dlib::matrix<double,3,1> y;
     dlib::matrix<double> M(3,3);
    buffer = (uint8_t *)malloc(sizeof(double));
    M = 54.2,  7.4,  12.1,
        1,     2,    3,
        5.9,   0.05, 1;

    y = 3.5,  
        1.2,    
        7.8;
    // dlib::matrix<double> x = inv(M)*y;
    buffer[0] = M(0,0);
    return x;}

EMSCRIPTEN_BINDINGS(hello)
{
	emscripten::function("matrixCal", &matrixCal);
}