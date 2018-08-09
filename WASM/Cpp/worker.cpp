#include <iostream>
#include <emscripten/emscripten.h>


// em++ -std=c++17 --bind worker.cpp   -o ../WASM/worker.js -s EXTRA_EXPORTED_RUNTIME_METHODS=['addOnPostRun','_one'] -s BUILD_AS_WORKER=1 -s WASM=1 -s ALLOW_MEMORY_GROWTH=1
extern "C" {

void one(char* data, int size) {
    for(int i=0; i<10; i++) {
        std::cout << "Worker" << std::endl;
        emscripten_worker_respond_provisionally(0, 0);
    }
    emscripten_worker_respond(0, 0);
}
}