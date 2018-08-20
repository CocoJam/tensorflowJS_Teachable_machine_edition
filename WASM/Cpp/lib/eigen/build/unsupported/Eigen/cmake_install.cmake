# Install script for directory: C:/Users/james/Desktop/eigen/unsupported/Eigen

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
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/eigen3/unsupported/Eigen" TYPE FILE FILES
    "C:/Users/james/Desktop/eigen/unsupported/Eigen/AdolcForward"
    "C:/Users/james/Desktop/eigen/unsupported/Eigen/AlignedVector3"
    "C:/Users/james/Desktop/eigen/unsupported/Eigen/ArpackSupport"
    "C:/Users/james/Desktop/eigen/unsupported/Eigen/AutoDiff"
    "C:/Users/james/Desktop/eigen/unsupported/Eigen/BVH"
    "C:/Users/james/Desktop/eigen/unsupported/Eigen/EulerAngles"
    "C:/Users/james/Desktop/eigen/unsupported/Eigen/FFT"
    "C:/Users/james/Desktop/eigen/unsupported/Eigen/IterativeSolvers"
    "C:/Users/james/Desktop/eigen/unsupported/Eigen/KroneckerProduct"
    "C:/Users/james/Desktop/eigen/unsupported/Eigen/LevenbergMarquardt"
    "C:/Users/james/Desktop/eigen/unsupported/Eigen/MatrixFunctions"
    "C:/Users/james/Desktop/eigen/unsupported/Eigen/MoreVectorization"
    "C:/Users/james/Desktop/eigen/unsupported/Eigen/MPRealSupport"
    "C:/Users/james/Desktop/eigen/unsupported/Eigen/NonLinearOptimization"
    "C:/Users/james/Desktop/eigen/unsupported/Eigen/NumericalDiff"
    "C:/Users/james/Desktop/eigen/unsupported/Eigen/OpenGLSupport"
    "C:/Users/james/Desktop/eigen/unsupported/Eigen/Polynomials"
    "C:/Users/james/Desktop/eigen/unsupported/Eigen/Skyline"
    "C:/Users/james/Desktop/eigen/unsupported/Eigen/SparseExtra"
    "C:/Users/james/Desktop/eigen/unsupported/Eigen/SpecialFunctions"
    "C:/Users/james/Desktop/eigen/unsupported/Eigen/Splines"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xDevelx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/eigen3/unsupported/Eigen" TYPE DIRECTORY FILES "C:/Users/james/Desktop/eigen/unsupported/Eigen/src" FILES_MATCHING REGEX "/[^/]*\\.h$")
endif()

if(NOT CMAKE_INSTALL_LOCAL_ONLY)
  # Include the install script for each subdirectory.
  include("C:/Users/james/Desktop/eigen/build/unsupported/Eigen/CXX11/cmake_install.cmake")

endif()

