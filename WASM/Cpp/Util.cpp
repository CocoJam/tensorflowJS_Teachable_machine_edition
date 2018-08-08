
#include <emscripten.h>
#include <stdio.h>
#include <emscripten/bind.h>
#include <cstddef>
#include <array>
#include <vector>
#include <cstdlib>
// em++ -std=c++17 --bind -L lib/dlib/build/dlib/libdlib.so -I lib/dlib Util.cpp -o ../WASM/dlib.js -s EXTRA_EXPORTED_RUNTIME_METHODS=['addOnPostRun'] -s WASM=1 -s ALLOW_MEMORY_GROWTH=1
#include <iostream>
#include <dlib/matrix.h>
#include "Emscripten_Matrix.hpp"
using namespace dlib;
using namespace std;

double type_check(const emscripten::val &element)
{

    emscripten::val constructor = element["constructor"];
    if (constructor == emscripten::val::global("Float64Array"))
    {
        // matrix<double> mat = vec_to_mat<double>(element, 10,1);
        // mat_inverse(mat);
        // mat_row(mat)

        return 0.0;
    }
    else if (constructor == emscripten::val::global("Number"))
    {
        return 0.0;
    }

    return 0.0;
}

EMSCRIPTEN_BINDINGS(what_is_this_name_for)
{
    emscripten::function("type_check", &type_check);
    emscripten::class_<Em_matrix::matrix<double>>("matrix")
        .constructor<emscripten::val, int, int>()
        .constructor<int, int>()
        .function("set_matrix", &Em_matrix::matrix<double>::set_matrix)
        .function("set_size", &Em_matrix::matrix<double>::set_size)
        .function("loc", &Em_matrix::matrix<double>::operator())
        // .function("add", &Em_matrix::matrix<double>::operator+)
        .function("formJSObject", &Em_matrix::matrix<double>::formJSObject)
        .function("veiw", &Em_matrix::matrix<double>::view)
        // .function("add", &Em_matrix::matrix<double>::add)
        .function("nr", &Em_matrix::matrix<double>::nr)
        .function("nc", &Em_matrix::matrix<double>::nc);
    // .function("get_val", &Em_matrix::matrix<double>::get_val);

    emscripten::class_<dlib::matrix<double>>("Matrix")
        .constructor<int, int>();
    //     .function("nr", &dlib::matrix<double>::nr);
    // emscripten::class_<Em_matrix::ExtendedMatrix<double>, emscripten::base<dlib::matrix<double>>>("ExMatrix")
    //     .constructor<int, int>()
    //      .function("nr", &Em_matrix::ExtendedMatrix<double>::nr);
}
