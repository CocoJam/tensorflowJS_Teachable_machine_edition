#include <emscripten.h>
#include <stdio.h>
#include <emscripten/bind.h>
#include <dlib/matrix.h>
#include <functional>
#include <stdexcept>
#include <string>
#include <type_traits>
#include <typeinfo>
#include <regex>

#define print(x)                 \
    std::cout << x << std::endl; \
    printf("");

//em++ -std=c++17 --bind -L lib/dlib/build/dlib/libdlib.so -I lib/dlib Matrix.cpp -o ../WASM/dlib.js -s EXTRA_EXPORTED_RUNTIME_METHODS=['addOnPostRun'] -s WASM=1 -s ALLOW_MEMORY_GROWTH=1
// em++ -std=c++17 --bind -L lib/dlib/build/dlib/libdlib.so -I lib/dlib Matrix.cpp -o dlib.js -s EXTRA_EXPORTED_RUNTIME_METHODS=['addOnPostRun'] -s WASM=1 -s ALLOW_MEMORY_GROWTH=1
// using emscripten;
namespace Em_matrix
{
template <typename T>
class matrix
{
  public:
    matrix(const dlib::matrix<T> mat)
    {
        this->mat = mat;
    }

    matrix(const emscripten::val &vec, int row, int col)
    {
        this->mat = emscripten_val_to_mat(vec, row, col);
    }
    matrix(int row, int col)
    {
    }
    void set_matrix(const emscripten::val &vec, int row, int col)
    {
        // set_size(row, col);
        this->mat = emscripten_val_to_mat(vec, nr(), nc());
    }
    void set_matrix(dlib::matrix<T> mat)
    {
        // set_size(row, col);
        this->mat = mat;
    }
    void set_size(int row, int col)
    {
        this->mat.set_size(row, col);
    }
    T operator()(int row, int col)
    {
        return this->mat(row, col);
    }
    int nr()
    {
        return this->mat.nr();
    }
    int nc()
    {
        return this->mat.nc();
    }
    void inv()
    {
        this->set_matrix(dlib::inv(this->mat));
    }
    void view()
    {
        print(this->mat);
    }
    // // template <typename N>
    bool size_check(Em_matrix::matrix<T> m1)
    {
        return this->mat.nr() == m1.get_mat().nr() && this->mat.nc() == m1.get_mat().nc();
    }
    std::string size_tostring(Em_matrix::matrix<T> *m1)
    {
        return "(" + std::to_string((*m1).get_mat().nr()) + ", " + std::to_string((*m1).get_mat().nc()) + ")";
    }

    // Em_matrix::matrix<T> Bifunctional_funtor(const emscripten::val &m1,
    //                                          std::function<Em_matrix::matrix<T>(Em_matrix::matrix<T> *)> func1,
    //                                          std::function<Em_matrix::matrix<T>(T)> func2)
    // {
    //     if (m1.hasOwnProperty("$$"))
    //     {
    //         Em_matrix::matrix<T> *matrix_ptr;
    //         Em_matrix::matrix<T> matrix = m1.as<Em_matrix::matrix<T>>();
    //         matrix_ptr = &matrix;
    //         return func1(matrix_ptr);
    //     }
    //     else
    //     {
    //         T matrix_ptr = m1.as<T>();
    //         return func2(matrix_ptr);
    //     }
    // }

    Em_matrix::matrix<T> add_matrix(Em_matrix::matrix<T> *m1)
    {
        print("matrix element add");
        Em_matrix::matrix<T> m2 = this->operation<Em_matrix::matrix<T>, dlib::matrix<T>>(m1, std::plus<dlib::matrix<T>>());
        return m2;
    }
    Em_matrix::matrix<T> add_scalar(T scalar)
    {
        print("scalar element add");
        dlib::matrix<T> rm;
        rm = this->mat + scalar;
        Em_matrix::matrix<T> m2(rm);
        return m2;
    }

    Em_matrix::matrix<T> add(const emscripten::val &m1)
    {
        if (m1.hasOwnProperty("$$"))
        {
            Em_matrix::matrix<T> *matrix_ptr;
            Em_matrix::matrix<T> matrix = m1.as<Em_matrix::matrix<T>>();
            matrix_ptr = &matrix;
            return this->add_matrix(matrix_ptr);
        }
        else
        {
            T matrix_ptr = m1.as<T>();
            return this->add_scalar(matrix_ptr);
        }
    }

    // //overloaded bugs it matches emscripten::val first other than pointers.
    // Em_matrix::matrix<T> add(const emscripten::val &m1)
    // {
    //     print("emscripten element add");
    //     return Bifunctional_funtor(m1, &matrix::add_matrix, &matrix::add_scalar);
    // }

    Em_matrix::matrix<T> minus_matrix(Em_matrix::matrix<T> *m1)
    {
        Em_matrix::matrix<T> m2 = this->operation<Em_matrix::matrix<T>, dlib::matrix<T>>(m1, std::minus<dlib::matrix<T>>());
        return m2;
    }

    Em_matrix::matrix<T> minus_scalar(T scalar)
    {
        dlib::matrix<T> rm;
        rm = this->mat - scalar;
        Em_matrix::matrix<T> m2(rm);
        return m2;
    }

    // Em_matrix::matrix<T> minus(const emscripten::val &m1)
    // {
    //     return Bifunctional_funtor(m1, &Em_matrix::matrix<T>::minus_matrix, &Em_matrix::matrix<T>::minus_scalar);
    // }

    Em_matrix::matrix<T> minus(const emscripten::val &m1)
    {
        if (m1.hasOwnProperty("$$"))
        {
            Em_matrix::matrix<T> *matrix_ptr;
            Em_matrix::matrix<T> matrix = m1.as<Em_matrix::matrix<T>>();
            matrix_ptr = &matrix;
            return this->minus_matrix(matrix_ptr);
        }
        else
        {
            T matrix_ptr = m1.as<T>();
            return this->minus_scalar(matrix_ptr);
        }
    }

    Em_matrix::matrix<T> divides_matrix(Em_matrix::matrix<T> *m1)
    {
        Em_matrix::matrix<T> m2 = this->operation<Em_matrix::matrix<T>, dlib::matrix<T>>(m1, std::divides<dlib::matrix<T>>());
        return m2;
    }

    Em_matrix::matrix<T> divides_scalar(T scalar)
    {
        dlib::matrix<T> rm;
        rm = this->mat / scalar;
        Em_matrix::matrix<T> m2(rm);
        return m2;
    }

    // Em_matrix::matrix<T> divides(const emscripten::val &m1)
    // {
    //     return Bifunctional_funtor(m1, &Em_matrix::matrix<T>::divides_matrix, &Em_matrix::matrix<T>::divides_scalar);
    // }

    Em_matrix::matrix<T> divides(const emscripten::val &m1)
    {
        if (m1.hasOwnProperty("$$"))
        {
            Em_matrix::matrix<T> *matrix_ptr;
            Em_matrix::matrix<T> matrix = m1.as<Em_matrix::matrix<T>>();
            matrix_ptr = &matrix;
            return this->divides_matrix(matrix_ptr);
        }
        else
        {
            T matrix_ptr = m1.as<T>();
            return this->divides_scalar(matrix_ptr);
        }
    }

    Em_matrix::matrix<T> multiplies_matrix(Em_matrix::matrix<T> *m1)
    {
        Em_matrix::matrix<T> m2 = this->operation<Em_matrix::matrix<T>, dlib::matrix<T>>(m1, std::multiplies<dlib::matrix<T>>());
        return m2;
    }

    Em_matrix::matrix<T> multiplies_scalar(T scalar)
    {
        dlib::matrix<T> rm;
        rm = this->mat * scalar;
        Em_matrix::matrix<T> m2(rm);
        return m2;
    }

    // Em_matrix::matrix<T> multiplies(const emscripten::val &m1)
    // {
    //     return Bifunctional_funtor(m1, &Em_matrix::matrix<T>::multiplies_matrix, &Em_matrix::matrix<T>::multiplies_scalar);
    // }

    Em_matrix::matrix<T> multiplies(const emscripten::val &m1)
    {
        if (m1.hasOwnProperty("$$"))
        {
            Em_matrix::matrix<T> *matrix_ptr;
            Em_matrix::matrix<T> matrix = m1.as<Em_matrix::matrix<T>>();
            matrix_ptr = &matrix;
            return this->multiplies_matrix(matrix_ptr);
        }
        else
        {
            T matrix_ptr = m1.as<T>();
            return this->multiplies_scalar(matrix_ptr);
        }
    }

    //Not functioning maybe needed some buffer exchange method.
    emscripten::val formJSObject()
    {
        emscripten::val object = emscripten::val::object();
        // emscripten::val memory = emscripten::val::module_property("buffer");
        emscripten::val array = emscripten::val::global("Float64Array").new_(this->vec.size());
        emscripten::val memory = emscripten::val::module_property("buffer");
        emscripten::val memoryView = emscripten::val::global("Float64Array").new_(memory, reinterpret_cast<std::uintptr_t>(this->vec.data()), this->vec.size());
        memoryView.call<void>("set", array, this->vec);
        // std::cout<< arra<< std::endl;
        // printf("");
        object.set("array", array);
        return object;
    }
    dlib::matrix<T> &get_mat()
    {
        return this->mat;
    }


Em_matrix::matrix<T> identity_matrix(int num)
{   
    this->set_mat(dlib::identity_matrix<T>(num));
}


Em_matrix::matrix<T> ones_matrix(const int row, const int col)
{
    this->set_mat(dlib::ones_matrix<T>(row, col));
}


Em_matrix::matrix<T> randm(int row, int col)
{
    this->set_mat(dlib::randm(row, col));
}


Em_matrix::matrix<T> pointwise_multiply(Em_matrix::matrix<T> *m2)
{
    this->set_mat(dlib::pointwise_multiply(this->mat,(*m2).get_mat()));
}

Em_matrix::matrix<T> trans()
{
    this->set_mat(dlib::trans(this->mat));
}

Em_matrix::matrix<T> round()
{
    this->set_mat(dlib::round(this->mat));
}

Em_matrix::matrix<T> ceil()
{
    this->set_mat(dlib::ceil(this->mat));
}

Em_matrix::matrix<T> floor()
{
    this->set_mat(dlib::floor(this->mat));
}

Em_matrix::matrix<T> diag()
{
    this->set_mat(dlib::diag(this->mat));
}

  private:
    dlib::matrix<T> mat;
    std::vector<T> vec;
    dlib::matrix<T> emscripten_val_to_mat(const emscripten::val &arr, const int row, const int col)
    {

        this->vec = emscripten_val_to_vec(arr, row, col);
        dlib::matrix<T> matrix_instance(row, col);
        for (int rowNum = 0; rowNum < row; rowNum++)
        {
            for (int colNum = 0; colNum < col; colNum++)
            {
                matrix_instance(rowNum, colNum) = vec.at(rowNum * col + colNum);
            }
        }
        return matrix_instance;
    }
    std::vector<T> emscripten_val_to_vec(const emscripten::val &arr, const int row, const int col)
    {
        unsigned int length = arr["length"].as<unsigned int>();
        std::vector<T> vec(length);
        emscripten::val memory = emscripten::val::module_property("buffer");
        emscripten::val memoryView = emscripten::val::global("Float64Array").new_(memory, reinterpret_cast<std::uintptr_t>(vec.data()), length);
        memoryView.call<void>("set", arr);
        return vec;
    }

    void set_mat(dlib::matrix<T> mat)
    {
        this->mat = mat;
    }

    template <typename N, typename K>
    Em_matrix::matrix<T> operation(N *m1, std::function<dlib::matrix<T>(dlib::matrix<T>, K)> oper)
    {
        dlib::matrix<T> rm;
        if (std::is_same_v<N, Em_matrix::matrix<T>>)
        {
            if (size_check(*m1))
            {
                print(this->mat);
                rm = oper(this->mat, (*m1).get_mat());
                goto endoperation;
            }
            throw std::runtime_error("size mismatch execptions: A matrix shape: " + size_tostring(this) + " , B matrix shape: " + size_tostring(m1));
        }
        else
        {
            if (std::is_same_v<K, T>)
            {
                print("scalar Matrix");
                // rm = oper(this->mat, (*m1));
                goto endoperation;
            }
            else
            {
                throw std::runtime_error(typeid(N).name());
            }
        }
    endoperation:
        Em_matrix::matrix<T> m2(rm);
        return m2;
    }
    template <typename N>
    Em_matrix::matrix<T> scala_operation(const emscripten::val &m1, std::function<dlib::matrix<T>(dlib::matrix<T>, N)> oper)
    {
        dlib::matrix<T> rm;
        print("scalar emscripten")
            T scala = m1.as<T>();
        rm = oper(this->mat, scala);
        Em_matrix::matrix<T> m2(rm);
        return m2;
    }
};

template <typename T>
Em_matrix::matrix<T> identity_matrix(int num)
{
    return Em_matrix::matrix<T>(dlib::identity_matrix<T>(num));
}

template <typename T>
Em_matrix::matrix<T> ones_matrix(const int row, const int col)
{
    return Em_matrix::matrix<T>(dlib::ones_matrix<T>(row, col));
}

template <typename T>
Em_matrix::matrix<T> randm(int row, int col)
{
    return Em_matrix::matrix<T>(dlib::randm(row, col));
}

template <typename T>
Em_matrix::matrix<T> pointwise_multiply(Em_matrix::matrix<T> *m1, Em_matrix::matrix<T> *m2)
{
    return Em_matrix::matrix<T>(dlib::pointwise_multiply((*m1).get_mat(), (*m2).get_mat()));
}
template <typename T>
Em_matrix::matrix<T> trans(Em_matrix::matrix<T> *m1)
{
    return Em_matrix::matrix<T>(dlib::trans((*m1).get_mat()));
}
template <typename T>
Em_matrix::matrix<T> round(Em_matrix::matrix<T> *m1)
{
    return Em_matrix::matrix<T>(dlib::round((*m1).get_mat()));
}
template <typename T>
Em_matrix::matrix<T> ceil(Em_matrix::matrix<T> *m1)
{
    return Em_matrix::matrix<T>(dlib::ceil((*m1).get_mat()));
}
template <typename T>
Em_matrix::matrix<T> floor(Em_matrix::matrix<T> *m1)
{
    return Em_matrix::matrix<T>(dlib::floor((*m1).get_mat()));
}
template <typename T>
Em_matrix::matrix<T> diag(Em_matrix::matrix<T> *m1)
{
    return Em_matrix::matrix<T>(dlib::diag((*m1).get_mat()));
}
//Something is wrong
// template <typename T>
// Em_matrix::matrix<T> rowm(Em_matrix::matrix<T> *m1)
// {
//     return Em_matrix::matrix<T>(rowm((*m1).get_mat()));
// }
// template <typename T>
// Em_matrix::matrix<T> range(Em_matrix::matrix<T> *m1)
// {
//     return Em_matrix::matrix<T>(dlib::range());
// }

}; 
