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
include test/CMakeFiles/determinant_1.dir/depend.make

# Include the progress variables for this target.
include test/CMakeFiles/determinant_1.dir/progress.make

# Include the compile flags for this target's objects.
include test/CMakeFiles/determinant_1.dir/flags.make

test/CMakeFiles/determinant_1.dir/determinant.cpp.o: test/CMakeFiles/determinant_1.dir/flags.make
test/CMakeFiles/determinant_1.dir/determinant.cpp.o: test/CMakeFiles/determinant_1.dir/includes_CXX.rsp
test/CMakeFiles/determinant_1.dir/determinant.cpp.o: ../test/determinant.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=C:\Users\james\Desktop\eigen\build\CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object test/CMakeFiles/determinant_1.dir/determinant.cpp.o"
	cd /d C:\Users\james\Desktop\eigen\build\test && C:\Users\james\emsdk\emscripten\1.38.10\em++.bat  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles\determinant_1.dir\determinant.cpp.o -c C:\Users\james\Desktop\eigen\test\determinant.cpp

test/CMakeFiles/determinant_1.dir/determinant.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/determinant_1.dir/determinant.cpp.i"
	cd /d C:\Users\james\Desktop\eigen\build\test && C:\Users\james\emsdk\emscripten\1.38.10\em++.bat $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E C:\Users\james\Desktop\eigen\test\determinant.cpp > CMakeFiles\determinant_1.dir\determinant.cpp.i

test/CMakeFiles/determinant_1.dir/determinant.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/determinant_1.dir/determinant.cpp.s"
	cd /d C:\Users\james\Desktop\eigen\build\test && C:\Users\james\emsdk\emscripten\1.38.10\em++.bat $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S C:\Users\james\Desktop\eigen\test\determinant.cpp -o CMakeFiles\determinant_1.dir\determinant.cpp.s

# Object files for target determinant_1
determinant_1_OBJECTS = \
"CMakeFiles/determinant_1.dir/determinant.cpp.o"

# External object files for target determinant_1
determinant_1_EXTERNAL_OBJECTS =

test/determinant_1.js: test/CMakeFiles/determinant_1.dir/determinant.cpp.o
test/determinant_1.js: test/CMakeFiles/determinant_1.dir/build.make
test/determinant_1.js: test/CMakeFiles/determinant_1.dir/objects1.rsp
test/determinant_1.js: test/CMakeFiles/determinant_1.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=C:\Users\james\Desktop\eigen\build\CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable determinant_1.js"
	cd /d C:\Users\james\Desktop\eigen\build\test && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles\determinant_1.dir\link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
test/CMakeFiles/determinant_1.dir/build: test/determinant_1.js

.PHONY : test/CMakeFiles/determinant_1.dir/build

test/CMakeFiles/determinant_1.dir/clean:
	cd /d C:\Users\james\Desktop\eigen\build\test && $(CMAKE_COMMAND) -P CMakeFiles\determinant_1.dir\cmake_clean.cmake
.PHONY : test/CMakeFiles/determinant_1.dir/clean

test/CMakeFiles/determinant_1.dir/depend:
	$(CMAKE_COMMAND) -E cmake_depends "MinGW Makefiles" C:\Users\james\Desktop\eigen C:\Users\james\Desktop\eigen\test C:\Users\james\Desktop\eigen\build C:\Users\james\Desktop\eigen\build\test C:\Users\james\Desktop\eigen\build\test\CMakeFiles\determinant_1.dir\DependInfo.cmake --color=$(COLOR)
.PHONY : test/CMakeFiles/determinant_1.dir/depend
