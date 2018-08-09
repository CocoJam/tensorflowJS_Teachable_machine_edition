#include "Matrix.cpp"

#define print(x)                 \
    std::cout << x << std::endl; \
    printf("");
    
template <typename T>
class matrix;
template <typename T>
Em_matrix::matrix<T> identity_matrix(int num);
template <typename T>
Em_matrix::matrix<T> ones_matrix(const int row ,const int col);
template <typename T>
Em_matrix::matrix<T> randm(const int row ,const int col);
template <typename T>
Em_matrix::matrix<T> pointwise_multiply(Em_matrix::matrix<T> m1 ,Em_matrix::matrix<T> m2);
template <typename T>
Em_matrix::matrix<T> trans(Em_matrix::matrix<T> m1 );
template <typename T>
Em_matrix::matrix<T> round(Em_matrix::matrix<T> m1 );
template <typename T>
Em_matrix::matrix<T> ceil(Em_matrix::matrix<T> m1 );
template <typename T>
Em_matrix::matrix<T> floor(Em_matrix::matrix<T> m1 );
template <typename T>
Em_matrix::matrix<T> diag(Em_matrix::matrix<T> m1 );
template <typename T>
Em_matrix::matrix<T> rowm(Em_matrix::matrix<T> m1, int row );