# CMAKE generated file: DO NOT EDIT!
# Generated by "MinGW Makefiles" Generator, CMake Version 3.12

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list


# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

SHELL = cmd.exe

# The CMake executable.
CMAKE_COMMAND = "C:\Program Files\CMake\bin\cmake.exe"

# The command to remove a file.
RM = "C:\Program Files\CMake\bin\cmake.exe" -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = C:\Users\james\Desktop\eigen

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = C:\Users\james\Desktop\eigen\build

# Include any dependencies generated for this target.
include doc/examples/CMakeFiles/Tutorial_BlockOperations_vector.dir/depend.make

# Include the progress variables for this target.
include doc/examples/CMakeFiles/Tutorial_BlockOperations_vector.dir/progress.make

# Include the compile flags for this target's objects.
include doc/examples/CMakeFiles/Tutorial_BlockOperations_vector.dir/flags.make

doc/examples/CMakeFiles/Tutorial_BlockOperations_vector.dir/Tutorial_BlockOperations_vector.cpp.o: doc/examples/CMakeFiles/Tutorial_BlockOperations_vector.dir/flags.make
doc/examples/CMakeFiles/Tutorial_BlockOperations_vector.dir/Tutorial_BlockOperations_vector.cpp.o: doc/examples/CMakeFiles/Tutorial_BlockOperations_vector.dir/includes_CXX.rsp
doc/examples/CMakeFiles/Tutorial_BlockOperations_vector.dir/Tutorial_BlockOperations_vector.cpp.o: ../doc/examples/Tutorial_BlockOperations_vector.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=C:\Users\james\Desktop\eigen\build\CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object doc/examples/CMakeFiles/Tutorial_BlockOperations_vector.dir/Tutorial_BlockOperations_vector.cpp.o"
	cd /d C:\Users\james\Desktop\eigen\build\doc\examples && C:\Users\james\emsdk\emscripten\1.38.10\em++.bat  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles\Tutorial_BlockOperations_vector.dir\Tutorial_BlockOperations_vector.cpp.o -c C:\Users\james\Desktop\eigen\doc\examples\Tutorial_BlockOperations_vector.cpp

doc/examples/CMakeFiles/Tutorial_BlockOperations_vector.dir/Tutorial_BlockOperations_vector.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/Tutorial_BlockOperations_vector.dir/Tutorial_BlockOperations_vector.cpp.i"
	cd /d C:\Users\james\Desktop\eigen\build\doc\examples && C:\Users\james\emsdk\emscripten\1.38.10\em++.bat $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E C:\Users\james\Desktop\eigen\doc\examples\Tutorial_BlockOperations_vector.cpp > CMakeFiles\Tutorial_BlockOperations_vector.dir\Tutorial_BlockOperations_vector.cpp.i

doc/examples/CMakeFiles/Tutorial_BlockOperations_vector.dir/Tutorial_BlockOperations_vector.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/Tutorial_BlockOperations_vector.dir/Tutorial_BlockOperations_vector.cpp.s"
	cd /d C:\Users\james\Desktop\eigen\build\doc\examples && C:\Users\james\emsdk\emscripten\1.38.10\em++.bat $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S C:\Users\james\Desktop\eigen\doc\examples\Tutorial_BlockOperations_vector.cpp -o CMakeFiles\Tutorial_BlockOperations_vector.dir\Tutorial_BlockOperations_vector.cpp.s

# Object files for target Tutorial_BlockOperations_vector
Tutorial_BlockOperations_vector_OBJECTS = \
"CMakeFiles/Tutorial_BlockOperations_vector.dir/Tutorial_BlockOperations_vector.cpp.o"

# External object files for target Tutorial_BlockOperations_vector
Tutorial_BlockOperations_vector_EXTERNAL_OBJECTS =

doc/examples/Tutorial_BlockOperations_vector.js: doc/examples/CMakeFiles/Tutorial_BlockOperations_vector.dir/Tutorial_BlockOperations_vector.cpp.o
doc/examples/Tutorial_BlockOperations_vector.js: doc/examples/CMakeFiles/Tutorial_BlockOperations_vector.dir/build.make
doc/examples/Tutorial_BlockOperations_vector.js: doc/examples/CMakeFiles/Tutorial_BlockOperations_vector.dir/objects1.rsp
doc/examples/Tutorial_BlockOperations_vector.js: doc/examples/CMakeFiles/Tutorial_BlockOperations_vector.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=C:\Users\james\Desktop\eigen\build\CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable Tutorial_BlockOperations_vector.js"
	cd /d C:\Users\james\Desktop\eigen\build\doc\examples && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles\Tutorial_BlockOperations_vector.dir\link.txt --verbose=$(VERBOSE)
	cd /d C:\Users\james\Desktop\eigen\build\doc\examples && \"C:\Users\james\emsdk\node\8.9.1_64bit\bin\node.exe\" C:/Users/james/Desktop/eigen/build/doc/examples/Tutorial_BlockOperations_vector.js >C:/Users/james/Desktop/eigen/build/doc/examples/Tutorial_BlockOperations_vector.out

# Rule to build all files generated by this target.
doc/examples/CMakeFiles/Tutorial_BlockOperations_vector.dir/build: doc/examples/Tutorial_BlockOperations_vector.js

.PHONY : doc/examples/CMakeFiles/Tutorial_BlockOperations_vector.dir/build

doc/examples/CMakeFiles/Tutorial_BlockOperations_vector.dir/clean:
	cd /d C:\Users\james\Desktop\eigen\build\doc\examples && $(CMAKE_COMMAND) -P CMakeFiles\Tutorial_BlockOperations_vector.dir\cmake_clean.cmake
.PHONY : doc/examples/CMakeFiles/Tutorial_BlockOperations_vector.dir/clean

doc/examples/CMakeFiles/Tutorial_BlockOperations_vector.dir/depend:
	$(CMAKE_COMMAND) -E cmake_depends "MinGW Makefiles" C:\Users\james\Desktop\eigen C:\Users\james\Desktop\eigen\doc\examples C:\Users\james\Desktop\eigen\build C:\Users\james\Desktop\eigen\build\doc\examples C:\Users\james\Desktop\eigen\build\doc\examples\CMakeFiles\Tutorial_BlockOperations_vector.dir\DependInfo.cmake --color=$(COLOR)
.PHONY : doc/examples/CMakeFiles/Tutorial_BlockOperations_vector.dir/depend
