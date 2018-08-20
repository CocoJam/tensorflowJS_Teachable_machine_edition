#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <iostream>

#include <Eigen/Dense>
// em++ -std=c++17 --bind -L lib/dlib/build/dlib/libdlib.so -I lib/dlib boot.cpp  -L lib/eigen/libeigen_blas.so -I lib/eigen -o ../WASM/boot.html -s EXTRA_EXPORTED_RUNTIME_METHODS=['addOnPostRun'] -s WASM=1 -s ALLOW_MEMORY_GROWTH=1


using namespace Eigen;
int main()
{
  MatrixXd m(2,2);
  m(0,0) = 3;
  m(1,0) = 2.5;
  m(0,1) = -1;
  m(1,1) = m(1,0) + m(0,1);
  std::cout << "Here is the matrix m:\n" << m << std::endl;
  VectorXd v(2);
  v(0) = 4;
  v(1) = v(0) - 1;
  std::cout << "Here is the vector v:\n" << v << std::endl;
}