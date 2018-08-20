#include <Eigen/Dense>
#include <algorithm>
#include <math.h>
#include <tuple>
typedef std::pair<int, double> argsort_pair;
template <typename T>
class Node
{
  public:
    Eigen::Map<Eigen::Matrix<T, Eigen::Dynamic, Eigen::Dynamic, Eigen::RowMajor>> points;
    Node<T> left;
    Node<T> right;
    Node() {}
    Node(Node<T> left, Node<T> right, Eigen::MatrixXd points) {}
    Node<T> makeNode(Eigen::MatrixXd points, const int depth)
    {
        Node currentNode();
        Eigen::MatrixXd left_block;
        Eigen::MatrixXd right_block;

        if (points.rows() < 1)
        {
            return NULL;
        }
        else if (points.rows() < 2)
        {
            Node newNode(NULL, NULL, points.row(0));
            return newNode;
        }
        else
        {
            int axisSplit = depth % points.cols();
            Eigen::MatrixXd indices = sort_matrix(points.col(axisSplit));
            int median = ceil(((float)(indices.rows() - 1)) / 2);
            left_block = indices.block(0, 0, median, indices.cols());
            right_block = indices.block(median + 1, 0, indices.rows(), indices.cols());
            currentNode->left = makeNode(left_block, depth + 1);
            currentNode->right = makeNode(right_block, depth + 1);
        }
        return currentNode;
    }

    std::tuple<Eigen::MatrixXd, T, int> returnNearest(Node<T> tree, Eigen::MatrixXd points, int depth)
    {
        if (tree->left == NULL)
        {
            T distance = (pow((tree->points - points), 2)).sum();
            return std::make_tuple(tree.points, distance, 0)
        }
        else
        {
            std::tuple<Eigen::MatrixXd, T, int> tup;
            std::tuple<Eigen::MatrixXd, T, int> tup2;
            int axisSplit = depth % points.cols();
            if (points.row(axisSplit) < tree.points.row(axisSplit))
            {
                 std::tie(bestGuess, distance, height)  = returnNearest(tree.left, points, depth + 1);
            }
            else
            {
                 std::tie(bestGuess, distance, height)  = returnNearest(tree.right, points, depth + 1);
            }
            if (height <= 2)
            {
                if (points.row(axisSplit) < tree.points.row(axisSplit))
                {
                    std::tie(bestGuess2, distance2, height2) = returnNearest(tree.right, points, depth + 1);
                }
                else
                {
                    std::tie(bestGuess2, distance2, height2) = returnNearest(tree.left, points, depth + 1);
                }
                T distance3 = (pow((tree->points - points), 2)).sum();

                if (distance3 < distance2)
                {
                    distance2 = distance3;
                    bestGuess2 = tree.points;
                }
                if (distance2< distance){
                    distance = distance2;
                    bestGuess = bestGuess2;
                }
            }
            return std::make_tuple(bestGuess, distance, height+1)
        }
    }

    // Node<T> make_left_node(Node<T> node, Eigen::MatrixXd points, const int depth)
    // {
    //     while (node->left != NULL && node->right != NULL)
    //     {
    //         if (points.rows() < 1)
    //         {
    //             return NULL;
    //         }
    //         else if (points.rows() < 2)
    //         {
    //             Node newNode(NULL, NULL, points.row(0));
    //             node->left = newNode;
    //             node = newNode;
    //         }
    //         else
    //         {
    //             Node newNode(NULL, NULL, points);
    //             node->left =
    //         }
    //     }
    // }

    // Node<T> make_right_node(Node<T> node, Eigen::MatrixXd points, const int depth)
    // {

    //     if (points.rows() < 1)
    //     {
    //         return NULL;
    //     }
    //     else if (points.rows() < 2)
    //     {
    //         Node newNode(NULL, NULL, points.row(0));
    //         return newNode;
    //     }
    //     else
    //     {
    //     }
    // }

  private:
    bool argsort_comp(const argsort_pair &left, const argsort_pair &right)
    {
        return left.second < right.second;
    }

    Eigen::VectorXi argsort(const Eigen::MatrixBase<T> &x)
    {
        Eigen::VectorXi indices(x.size());
        std::vector<argsort_pair> data(x.size());
        for (int i = 0; i < x.size(); i++)
        {
            data[i].first = i;
            data[i].second = x(i);
        }
        std::sort(data.begin(), data.end(), argsort_comp);
        for (int i = 0; i < data.size(); i++)
        {
            indices(data[i].first) = i;
        }
        return indices;
    }

    Eigen::MatrixXd sort_matrix(const Eigen::MatrixXd<T> &x, const Eigen::MatrixXd &y)
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
}
