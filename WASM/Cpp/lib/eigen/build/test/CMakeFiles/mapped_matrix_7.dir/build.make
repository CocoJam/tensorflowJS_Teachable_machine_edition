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
include test/CMakeFiles/mapped_matrix_7.dir/depend.make

# Include the progress variables for this target.
include test/CMakeFiles/mapped_matrix_7.dir/progress.make

# Include the compile flags for this target's objects.
include test/CMakeFiles/mapped_matrix_7.dir/flags.make

test/CMakeFiles/mapped_matrix_7.dir/mapped_matrix.cpp.o: test/CMakeFiles/mapped_matrix_7.dir/flags.make
test/CMakeFiles/mapped_matrix_7.dir/mapped_matrix.cpp.o: test/CMakeFiles/mapped_matrix_7.dir/includes_CXX.rsp
test/CMakeFiles/mapped_matrix_7.dir/mapped_matrix.cpp.o: ../test/mapped_matrix.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=C:\Users\james\Desktop\eigen\build\CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object test/CMakeFiles/mapped_matrix_7.dir/mapped_matrix.cpp.o"
	cd /d C:\Users\james\Desktop\eigen\build\test && C:\Users\james\emsdk\emscripten\1.38.10\em++.bat  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles\mapped_matrix_7.dir\mapped_matrix.cpp.o -c C:\Users\james\Desktop\eigen\test\mapped_matrix.cpp

test/CMakeFiles/mapped_matrix_7.dir/mapped_matrix.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/mapped_matrix_7.dir/mapped_matrix.cpp.i"
	cd /d C:\Users\james\Desktop\eigen\build\test && C:\Users\james\emsdk\emscripten\1.38.10\em++.bat $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E C:\Users\james\Desktop\eigen\test\mapped_matrix.cpp > CMakeFiles\mapped_matrix_7.dir\mapped_matrix.cpp.i

test/CMakeFiles/mapped_matrix_7.dir/mapped_matrix.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/mapped_matrix_7.dir/mapped_matrix.cpp.s"
	cd /d C:\Users\james\Desktop\eigen\build\test && C:\Users\james\emsdk\emscripten\1.38.10\em++.bat $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S C:\Users\james\Desktop\eigen\test\mapped_matrix.cpp -o CMakeFiles\mapped_matrix_7.dir\mapped_matrix.cpp.s

# Object files for target mapped_matrix_7
mapped_matrix_7_OBJECTS = \
"CMakeFiles/mapped_matrix_7.dir/mapped_matrix.cpp.o"

# External object files for target mapped_matrix_7
mapped_matrix_7_EXTERNAL_OBJECTS =

test/mapped_matrix_7.js: test/CMakeFiles/mapped_matrix_7.dir/mapped_matrix.cpp.o
test/mapped_matrix_7.js: test/CMakeFiles/mapped_matrix_7.dir/build.make
test/mapped_matrix_7.js: test/CMakeFiles/mapped_matrix_7.dir/objects1.rsp
test/mapped_matrix_7.js: test/CMakeFiles/mapped_matrix_7.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=C:\Users\james\Desktop\eigen\build\CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable mapped_matrix_7.js"
	cd /d C:\Users\james\Desktop\eigen\build\test && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles\mapped_matrix_7.dir\link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
test/CMakeFiles/mapped_matrix_7.dir/build: test/mapped_matrix_7.js

.PHONY : test/CMakeFiles/mapped_matrix_7.dir/build

test/CMakeFiles/mapped_matrix_7.dir/clean:
	cd /d C:\Users\james\Desktop\eigen\build\test && $(CMAKE_COMMAND) -P CMakeFiles\mapped_matrix_7.dir\cmake_clean.cmake
.PHONY : test/CMakeFiles/mapped_matrix_7.dir/clean

test/CMakeFiles/mapped_matrix_7.dir/depend:
	$(CMAKE_COMMAND) -E cmake_depends "MinGW Makefiles" C:\Users\james\Desktop\eigen C:\Users\james\Desktop\eigen\test C:\Users\james\Desktop\eigen\build C:\Users\james\Desktop\eigen\build\test C:\Users\james\Desktop\eigen\build\test\CMakeFiles\mapped_matrix_7.dir\DependInfo.cmake --color=$(COLOR)
.PHONY : test/CMakeFiles/mapped_matrix_7.dir/depend
