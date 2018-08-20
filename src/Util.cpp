#include <emscripten.h>
#include <stdio.h>
#include <emscripten/bind.h>
#include <cstddef>
#include <array>
#include <vector>
#include <cstdlib>
#include <regex>
#include <string>
#include <dlib/string.h>
#include <experimental/string_view>
// em++ -std=c++17 --bind -L lib/dlib/build/dlib/libdlib.so -I lib/dlib Util.cpp -o ../WASM/dlib.js -s EXTRA_EXPORTED_RUNTIME_METHODS=['addOnPostRun'] MODULARIZE=1  -s WASM=1 -s ALLOW_MEMORY_GROWTH=1
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

// const std::string_view SV(std::string str){

// };

std::vector<std::string_view> splitSV(std::string_view strv, std::string_view delims = " ")
{
    std::vector<std::string_view> output;
    size_t first = 0;
    // std::string_view strv = str;
    while (first < strv.size())
    {
        const auto second = strv.find_first_of(delims, first);

        if (first != second)
            output.emplace_back(strv.substr(first, second - first));

        if (second == std::string_view::npos)
            break;

        first = second + 1;
    }
    return output;
}

std::vector<std::string> split(const std::string input, const std::regex re)
{
    sregex_token_iterator it(input.begin(), input.end(), re, -1);
    sregex_token_iterator reg_end;
    std::vector<std::string> vec;
    for (; it != reg_end; ++it)
    {
        vec.push_back(it->str());
    }
    return vec;
}

void String_CSV_parse(string str)
{
    std::string_view strv = str;
    std::vector<std::string_view> vec = splitSV(strv, "\n");
    for (int i = 0; i < vec.size(); i++)
    {
        std::vector<std::string_view> vec2 = splitSV(vec.at(i), "\t");
    };
    // print(str);
}

//Uint8_arry reader??
void readFile(const int &addr, const size_t &len)
{
    uint8_t *data = reinterpret_cast<uint8_t *>(addr);
     std::string str= std::string((char *)data);
    // return str;
    // print( typeid(data[0]));
}

// //Uint8_arry reader??
// void readFile(const int &addr, const int &len)
// {
//     uint8_t *data = reinterpret_cast<uint8_t *>(addr);
//    std::string str= std::string((char *)data);
//     // print(str.length());
//     std::vector<string> vec;
//      vec = dlib::split(str,"\n|,");
//     // for (size_t i = 0; i < vec.size();i++){
//     //     print(vec.at(i));
//     // }

//     // std::memcpy(charray.data(), data, len);
//     // std::string full_text= malloc(len);
//     // strcpy(full_text, data );
//     // for (size_t i = 0; i < len; ++i)
//     // {
//     //     if (data[i] == 44)
//     //     {
//     //         // print(data[i-1]);
//     //         // print(data[i]);
//     //         // print(data[i+1]);
//     //     }
//     //     if (data[i] == '\n')
//     //     {
//     //         // print(data[i-1]);
//     //         // print(data[i-1]);
//     //         // print(data[i+1]);
//     //     }

//     // }
//     // print(full_text);
//     // free(full_text);
// }

void readFileFloat(const int &addr, const size_t &len)
{
    float *data = reinterpret_cast<float *>(addr);
    for (size_t i = 0; i < len; ++i)
    {
        if (data[i] == 44)
        {
        }
        if (data[i] == '\n')
        {
        }
    }
}

EMSCRIPTEN_BINDINGS(what_is_this_name_for)
{
    emscripten::function("identity_matrix", &Em_matrix::identity_matrix<double>);
    emscripten::function("ones_matrix", &Em_matrix::ones_matrix<double>);
    emscripten::function("randm", &Em_matrix::randm<double>);
    emscripten::function("pointwise_multiply", &Em_matrix::pointwise_multiply<double>, emscripten::allow_raw_pointers());
    emscripten::function("trans", &Em_matrix::trans<double>, emscripten::allow_raw_pointers());
    emscripten::function("round", &Em_matrix::round<double>, emscripten::allow_raw_pointers());
    emscripten::function("ceil", &Em_matrix::ceil<double>, emscripten::allow_raw_pointers());
    emscripten::function("floor", &Em_matrix::floor<double>, emscripten::allow_raw_pointers());
    emscripten::function("diag", &Em_matrix::diag<double>, emscripten::allow_raw_pointers());
    emscripten::function("String_CSV_parse", &String_CSV_parse);
    emscripten::function("readFile", &readFile);
    // emscripten::function("readFileFloat", &readFileFloat);
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
        .function("multiplies", &Em_matrix::matrix<double>::multiplies)
        .function("nr", &Em_matrix::matrix<double>::nr)
        .function("nc", &Em_matrix::matrix<double>::nc)
        .function("inv", &Em_matrix::matrix<double>::inv);
}
