
#include <emscripten.h>
#include <stdio.h>
#include <emscripten/bind.h>
#include <cstddef>
#include <array>
#include <vector>
#include <cstdlib>
// em++ -std=c++17 --bind -L lib/dlib/build/dlib/libdlib.so -I lib/dlib test.cpp -o ../WASM/test1.html -s EXTRA_EXPORTED_RUNTIME_METHODS=['addOnPostRun'] -s WASM=1 -s ALLOW_MEMORY_GROWTH=1
#include <iostream>
#include <dlib/matrix.h>
#include <regex>
using namespace dlib;
using namespace std;

int main(){
    matrix<double ,2,2> m1;
    m1=  1.0,2.0,3.0,4.0;
    m1=m1+1;

    matrix<double> A, B, C, D, E;
    
    // MATLAB: A = eye(3)
    A = identity_matrix<double>(3);
std::cout<<A <<std::endl;
    // MATLAB: B = ones(3,4)
    B = ones_matrix<double>(3,4);
std::cout<<B <<std::endl;
    // MATLAB: B = rand(3,4)
    // B = randm(3,4);

    // MATLAB: C = 1.4*A
    C = 1.4*A;
std::cout<<C <<std::endl;
    // MATLAB: D = A.*C
    D = pointwise_multiply(A,C);
std::cout<< D<<std::endl;
    // MATLAB: E = A * B
    E = A*B;
    std::cout<< E <<std::endl;
    svd(E,A,B,C);
    std::cout<<A <<std::endl;
    std::cout<<B <<std::endl;
    std::cout<<C <<std::endl;
    // std::cout<< inv(m1) <<std::endl;
    return 0;
}