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

// double type_check(const emscripten::val &element)
// {

//     emscripten::val constructor = element["constructor"];
//     if (constructor == emscripten::val::global("Float64Array"))
//     {
//         // matrix<double> mat = vec_to_mat<double>(element, 10,1);
//         // mat_inverse(mat);
//         // mat_row(mat)

//         return 0.0;
//     }
//     else if (constructor == emscripten::val::global("Number"))
//     {
//         return 0.0;
//     }

//     return 0.0;
// }

void String_parse(string str){
    print(str);
}

EMSCRIPTEN_BINDINGS(what_is_this_name_for)
{
    emscripten::function("identity_matrix", &Em_matrix::identity_matrix<double>);
    emscripten::function("ones_matrix", &Em_matrix::ones_matrix<double>);
    emscripten::function("randm", &Em_matrix::randm<double>);
    emscripten::function("pointwise_multiply", &Em_matrix::pointwise_multiply<double>, emscripten::allow_raw_pointers());
    emscripten::function("trans", &Em_matrix::trans<double>,emscripten::allow_raw_pointers());
    emscripten::function("round", &Em_matrix::round<double>,emscripten::allow_raw_pointers());
    emscripten::function("ceil", &Em_matrix::ceil<double>,emscripten::allow_raw_pointers());
    emscripten::function("floor", &Em_matrix::floor<double>,emscripten::allow_raw_pointers());
    emscripten::function("diag", &Em_matrix::diag<double>,emscripten::allow_raw_pointers());
    emscripten::function("string_parse", &String_parse);

    emscripten::class_<Em_matrix::matrix<double>>("matrix")
        .constructor<emscripten::val, int, int>()
        .constructor<int, int>()
        .function("set_matrix", emscripten::select_overload<void(const emscripten::val &, int, int)>(&Em_matrix::matrix<double>::set_matrix))
        .function("set_matrix", emscripten::select_overload<void(dlib::matrix<double>)>(&Em_matrix::matrix<double>::set_matrix))
        .function("set_size", &Em_matrix::matrix<double>::set_size)
        .function("loc", &Em_matrix::matrix<double>::operator())
        .function("formJSObject", &Em_matrix::matrix<double>::formJSObject)
        .function("veiw", &Em_matrix::matrix<double>::view)
        .function("add", &Em_matrix::matrix<double>::add)
        .function("minus", &Em_matrix::matrix<double>::minus)
        .function("divides", &Em_matrix::matrix<double>::divides)
        .function("multiplies", &Em_matrix::matrix<double>::multiplies )
        .function("nr", &Em_matrix::matrix<double>::nr)
        .function("nc", &Em_matrix::matrix<double>::nc)
        .function("inv", &Em_matrix::matrix<double>::inv);

}
