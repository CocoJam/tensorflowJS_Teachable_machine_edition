
#include <emscripten.h>
#include <stdio.h>
#include <emscripten/bind.h>
#include <cstddef>
#include <array>
#include <vector>
#include <cstdlib>

#include <dlib/bayes_utils.h>
#include <dlib/graph_utils.h>
#include <dlib/graph.h>
#include <dlib/directed_graph.h>
#include <iostream>


using namespace dlib;
using namespace std;


// em++ -std=c++17 -L dlib-19.6/build/dlib/libdlib.so -I dlib-19.6 array.cpp -o dlib.js -s EXTRA_EXPORTED_RUNTIME_METHODS=['addOnPostRun'] -s WASM=1 -s ALLOW_MEMORY_GROWTH=1
// em++ --bind --std=c++11 mandelbrot.cpp -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -o mandelbrot.js -s EXTRA_EXPORTED_RUNTIME_METHODS=['addOnPostRun']
// template<typename T>
// std::vector<T> vecFromJSArray(const emscripten::val &v) {
//         auto l = v["length"].as<unsigned>();

//         std::vector<T> rv;
//         for(unsigned i = 0; i < l; ++i) {
//             rv.push_back(v[i].as<T>());
//         }

//         return rv;
// };
emscripten::val testLength(const emscripten::val &arr)
{
    // unsigned int length = arr[0].as<unsigned int>();
    //  std::vector<double> length = emscripten::val::vecFromJSArray(arr) ;
    emscripten::val newElement = emscripten::val::global("Float64Array").new_(12);
    emscripten::val array1 = emscripten::val::array();
    std::vector<double> dd = emscripten::vecFromJSArray<double>(arr);
    // std::vector<double> rv;
    // for(unsigned i = 0; i < arr["length"].as<unsigned int>(); ++i) {
    //         rv.push_back(arr[i].as<double>());
    //     }

    // double* ptr = reinterpret_cast<double*>( input["ptr"].as<int>() );
    return newElement;
}
emscripten::val testMemoryBuffer(const emscripten::val &arr)
{
    //  unsigned int length = arr["length"].as<unsigned int>();
    // double* ptr = reinterpret_cast<double*>( input["ptr"].as<int>() );
    return emscripten::val::module_property("buffer");
}

emscripten::val typeOf(const emscripten::val &arr)
{
    return arr.emscripten::val::typeOf();
}
EMSCRIPTEN_BINDINGS(what_is_this_name_for)
{
    emscripten::function("testLength", &testLength);
    emscripten::function("typeOf", &typeOf);
    emscripten::function("testMB", &testMemoryBuffer);
}


int main(int argc, char const *argv[])
{
    /* code */
    return 0;
}
