#include <emscripten.h>
#include <stdio.h>
#include <emscripten/bind.h>
#include <cstddef>
#include <array>
#include <vector>
#include <cstdlib>
#include <regex>
#include <string>
#include <algorithm>
#include <Eigen/Core>
#include <Eigen/Eigen>
#include <dlib/string.h>
#include <Eigen/Dense>
#include <math.h> 
#include <experimental/string_view>
// em++ -std=c++17 --bind -L lib/dlib/build/dlib/libdlib.so -I lib/dlib Util.cpp -o ../WASM/dlib.js -s EXTRA_EXPORTED_RUNTIME_METHODS=['addOnPostRun'] -s WASM=1 -s ALLOW_MEMORY_GROWTH=1
#include <iostream>
#include <dlib/matrix.h>
#include "Emscripten_Matrix.hpp"
using namespace dlib;
using namespace std;
//em++ -std=c++17 --bind -L lib/dlib/build/dlib/libdlib.so -I lib/dlib Util.cpp  -L lib/eigen/libeigen_blas.so -I lib/eigen -o ../WASM/dlib2.js -s EXTRA_EXPORTED_RUNTIME_METHODS=['addOnPostRun'] -s WASM=1 -s ALLOW_MEMORY_GROWTH=1
//em++ -std=c++17 --bind -L lib/dlib/build/dlib/libdlib.so -I lib/dlib Util.cpp  -L lib/eigen/libeigen_blas.so -I lib/eigen -o ../WASM/dlib2.js -s MODULARIZE=1 -s EXTRA_EXPORTED_RUNTIME_METHODS=['addOnPostRun'] -s WASM=1 -s ALLOW_MEMORY_GROWTH=1


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
    int length = 0;
    int current = 0;
    int col = 0;
    int row = 0;
    bool colCheck = false;
    for (size_t i = 0; i < len; ++i)
    {
        if (data[i] == 44)
        {
            std::vector<int> datavec;
            datavec.insert(datavec.end(), &data[current], &data[i]);
            current = i + 1;
        }
        if (data[i] == '\n')
        {
            if (col < i && !colCheck)
            {
                col++;
            }
            else
            {
                colCheck = true;
            };
            row++;
        }
        length++;
    }
}

emscripten::val readDataFrame(const emscripten::val &dataObject)
{

    emscripten::val constructor = dataObject["constructor"];
    emscripten::val object = emscripten::val::global("Object");
    if (emscripten::val::global("Array") == constructor)
    {
        const unsigned int length = dataObject["length"].as<unsigned int>();
        print(length);
        const unsigned int length_of_i = (dataObject[0])["length"].as<unsigned int>();
        return dataObject;
    };
    printf("object");
    return emscripten::val::null();
}

template <typename T>
Em_matrix::matrix<T> Float64Array_to_matrix(const emscripten::val &addr, const int row, const int col)
{
    dlib::matrix<T> matrix_instance(row, col);
    for (int rowNum = 0; rowNum < row; rowNum++)
    {
        for (int colNum = 0; colNum < col; colNum++)
        {
            matrix_instance(rowNum, colNum) = addr[rowNum * col + colNum].as<T>();
        }
    }
    Em_matrix::matrix<T> mat(matrix_instance);
    return mat;
}

template <typename T>
Eigen::Matrix<T, Eigen::Dynamic, Eigen::Dynamic> copyToVector(const emscripten::val &arr, const int row, const int col)
{
    unsigned int length = arr["length"].as<unsigned int>();
    std::vector<T> vec(length);
    emscripten::val memory = emscripten::val::module_property("buffer");
    emscripten::val memoryView = emscripten::val::global("Float64Array").new_(memory, reinterpret_cast<std::uintptr_t>(vec.data()), length);
    memoryView.call<void>("set", arr);
    Eigen::Map<Eigen::Matrix<double, Eigen::Dynamic, Eigen::Dynamic, Eigen::RowMajor>> M(vec.data(), row, col);
    print(M)
    return M;
}

typedef std::pair<int, double> argsort_pair;

bool argsort_comp(const argsort_pair &left, const argsort_pair &right)
{
    return left.second < right.second;
}

template <typename T>
Eigen::MatrixXd argsort(const Eigen::MatrixBase<T> &x, const Eigen::MatrixXd &y)
{
    Eigen::VectorXi indices(x.size());
    std::vector<argsort_pair> data(x.size());
    for (int i = 0; i < x.size(); i++)
    {
        data[i].first = i;
        data[i].second = x(i);
    }
    std::sort(data.begin(), data.end(), argsort_comp);
    Eigen::MatrixXd sorted(y.rows(), y.cols());
    for (int i = 0; i < data.size(); i++)
    {   
        sorted.row(i) = y.row(data[i].first);
    }
    return sorted;
}


template <typename T>
Eigen::Matrix<T, Eigen::Dynamic, Eigen::Dynamic> copyToArray(const int &addr, const int length, const int row, const int col)
{
    T *data = reinterpret_cast<T *>(addr);
    Eigen::Map<Eigen::Matrix<T, Eigen::Dynamic, Eigen::Dynamic, Eigen::RowMajor>> M(data, row, col);
    print(M)
    return M;
}

template <typename T>
dlib::matrix<T> egien_to_matirx(Eigen::Matrix<T, Eigen::Dynamic, Eigen::Dynamic> eigen){
     dlib::matrix<T> mat= dlib::mat(eigen);
     print(eigen.block(0,0, eigen.rows(), eigen.cols()-1))
    return mat;
}

void accessNumjs(Emscripten::val &arr){
    
}

void Float64_Cast_to_matrix(const emscripten::val &arr, int length, int row, int col)
{
    dlib::matrix<double> matrix_instance(row, col);
    for (int rowNum = 0; rowNum < row; rowNum++)
    {
        for (int colNum = 0; colNum < col; colNum++)
        {
            matrix_instance(rowNum, colNum) = arr[rowNum * col + colNum].as<double>();
        }
    }
}

EMSCRIPTEN_BINDINGS(what_is_this_name_for)
{
    emscripten::function("dataFrame", &readDataFrame);
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
    emscripten::function("float64", &Float64_Cast_to_matrix);
    emscripten::function("copytovec", &copyToVector<double>);
    emscripten::function("copytoarray", &copyToArray<double>);


      emscripten::function("eigentodlibmat", &egien_to_matirx<double>);
    emscripten::class_<Eigen::Matrix<double, Eigen::Dynamic, Eigen::Dynamic>>("eigen");
    emscripten::class_<dlib::matrix<double>>("dlibMat");


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
