#include "Matrix.cpp"

template <typename T>
dlib::matrix<T> vec_to_mat(const emscripten::val &vec,const int row,const int col);
template <typename T>
long mat_to_rowNum(const dlib::matrix<T> mat);

class matrix;
class ExtendedMatrix;