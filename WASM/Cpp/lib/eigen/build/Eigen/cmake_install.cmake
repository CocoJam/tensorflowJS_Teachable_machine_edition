# Install script for directory: C:/Users/james/Desktop/eigen/Eigen

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "C:/Program Files (x86)/Eigen3")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "Release")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "TRUE")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xDevelx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/eigen3/Eigen" TYPE FILE FILES
    "C:/Users/james/Desktop/eigen/Eigen/Cholesky"
    "C:/Users/james/Desktop/eigen/Eigen/CholmodSupport"
    "C:/Users/james/Desktop/eigen/Eigen/Core"
    "C:/Users/james/Desktop/eigen/Eigen/Dense"
    "C:/Users/james/Desktop/eigen/Eigen/Eigen"
    "C:/Users/james/Desktop/eigen/Eigen/Eigenvalues"
    "C:/Users/james/Desktop/eigen/Eigen/Geometry"
    "C:/Users/james/Desktop/eigen/Eigen/Householder"
    "C:/Users/james/Desktop/eigen/Eigen/IterativeLinearSolvers"
    "C:/Users/james/Desktop/eigen/Eigen/Jacobi"
    "C:/Users/james/Desktop/eigen/Eigen/LU"
    "C:/Users/james/Desktop/eigen/Eigen/MetisSupport"
    "C:/Users/james/Desktop/eigen/Eigen/OrderingMethods"
    "C:/Users/james/Desktop/eigen/Eigen/PaStiXSupport"
    "C:/Users/james/Desktop/eigen/Eigen/PardisoSupport"
    "C:/Users/james/Desktop/eigen/Eigen/QR"
    "C:/Users/james/Desktop/eigen/Eigen/QtAlignedMalloc"
    "C:/Users/james/Desktop/eigen/Eigen/SPQRSupport"
    "C:/Users/james/Desktop/eigen/Eigen/SVD"
    "C:/Users/james/Desktop/eigen/Eigen/Sparse"
    "C:/Users/james/Desktop/eigen/Eigen/SparseCholesky"
    "C:/Users/james/Desktop/eigen/Eigen/SparseCore"
    "C:/Users/james/Desktop/eigen/Eigen/SparseLU"
    "C:/Users/james/Desktop/eigen/Eigen/SparseQR"
    "C:/Users/james/Desktop/eigen/Eigen/StdDeque"
    "C:/Users/james/Desktop/eigen/Eigen/StdList"
    "C:/Users/james/Desktop/eigen/Eigen/StdVector"
    "C:/Users/james/Desktop/eigen/Eigen/SuperLUSupport"
    "C:/Users/james/Desktop/eigen/Eigen/UmfPackSupport"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xDevelx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/eigen3/Eigen" TYPE DIRECTORY FILES "C:/Users/james/Desktop/eigen/Eigen/src" FILES_MATCHING REGEX "/[^/]*\\.h$")
endif()

