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
include test/CMakeFiles/rvalue_types_1.dir/depend.make

# Include the progress variables for this target.
include test/CMakeFiles/rvalue_types_1.dir/progress.make

# Include the compile flags for this target's objects.
include test/CMakeFiles/rvalue_types_1.dir/flags.make

test/CMakeFiles/rvalue_types_1.dir/rvalue_types.cpp.o: test/CMakeFiles/rvalue_types_1.dir/flags.make
test/CMakeFiles/rvalue_types_1.dir/rvalue_types.cpp.o: test/CMakeFiles/rvalue_types_1.dir/includes_CXX.rsp
test/CMakeFiles/rvalue_types_1.dir/rvalue_types.cpp.o: ../test/rvalue_types.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=C:\Users\james\Desktop\eigen\build\CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object test/CMakeFiles/rvalue_types_1.dir/rvalue_types.cpp.o"
	cd /d C:\Users\james\Desktop\eigen\build\test && C:\Users\james\emsdk\emscripten\1.38.10\em++.bat  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles\rvalue_types_1.dir\rvalue_types.cpp.o -c C:\Users\james\Desktop\eigen\test\rvalue_types.cpp

test/CMakeFiles/rvalue_types_1.dir/rvalue_types.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/rvalue_types_1.dir/rvalue_types.cpp.i"
	cd /d C:\Users\james\Desktop\eigen\build\test && C:\Users\james\emsdk\emscripten\1.38.10\em++.bat $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E C:\Users\james\Desktop\eigen\test\rvalue_types.cpp > CMakeFiles\rvalue_types_1.dir\rvalue_types.cpp.i

test/CMakeFiles/rvalue_types_1.dir/rvalue_types.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/rvalue_types_1.dir/rvalue_types.cpp.s"
	cd /d C:\Users\james\Desktop\eigen\build\test && C:\Users\james\emsdk\emscripten\1.38.10\em++.bat $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S C:\Users\james\Desktop\eigen\test\rvalue_types.cpp -o CMakeFiles\rvalue_types_1.dir\rvalue_types.cpp.s

# Object files for target rvalue_types_1
rvalue_types_1_OBJECTS = \
"CMakeFiles/rvalue_types_1.dir/rvalue_types.cpp.o"

# External object files for target rvalue_types_1
rvalue_types_1_EXTERNAL_OBJECTS =

test/rvalue_types_1.js: test/CMakeFiles/rvalue_types_1.dir/rvalue_types.cpp.o
test/rvalue_types_1.js: test/CMakeFiles/rvalue_types_1.dir/build.make
test/rvalue_types_1.js: test/CMakeFiles/rvalue_types_1.dir/objects1.rsp
test/rvalue_types_1.js: test/CMakeFiles/rvalue_types_1.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=C:\Users\james\Desktop\eigen\build\CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable rvalue_types_1.js"
	cd /d C:\Users\james\Desktop\eigen\build\test && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles\rvalue_types_1.dir\link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
test/CMakeFiles/rvalue_types_1.dir/build: test/rvalue_types_1.js

.PHONY : test/CMakeFiles/rvalue_types_1.dir/build

test/CMakeFiles/rvalue_types_1.dir/clean:
	cd /d C:\Users\james\Desktop\eigen\build\test && $(CMAKE_COMMAND) -P CMakeFiles\rvalue_types_1.dir\cmake_clean.cmake
.PHONY : test/CMakeFiles/rvalue_types_1.dir/clean

test/CMakeFiles/rvalue_types_1.dir/depend:
	$(CMAKE_COMMAND) -E cmake_depends "MinGW Makefiles" C:\Users\james\Desktop\eigen C:\Users\james\Desktop\eigen\test C:\Users\james\Desktop\eigen\build C:\Users\james\Desktop\eigen\build\test C:\Users\james\Desktop\eigen\build\test\CMakeFiles\rvalue_types_1.dir\DependInfo.cmake --color=$(COLOR)
.PHONY : test/CMakeFiles/rvalue_types_1.dir/depend
