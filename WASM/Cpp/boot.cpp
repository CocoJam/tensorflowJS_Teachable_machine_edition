#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <iostream>


// em++ -std=c++17 --bind boot.cpp -o ../WASM/boot.js -s EXTRA_EXPORTED_RUNTIME_METHODS=['addOnPostRun'] -s WASM=1 -s ALLOW_MEMORY_GROWTH=1

namespace e = emscripten;

int counter = 0;

void cback(char* data, int size, void* arg) {
    std::cout << "Callback" << std::endl;
    counter++;
}

void loop() {
    std::cout << "Counter: " << counter << std::endl;
}

int main() {
    std::cout << "Main func." << std::endl;
    worker_handle worker = emscripten_create_worker("worker.js");
    emscripten_call_worker(worker, "one", 0, 0, cback, (void*)42);

    emscripten_set_main_loop(loop, 2, true);

    return 0;
}