cmake_minimum_required(VERSION 3.2)

project(i3_sdk_c)

# include helper functions
include("build_all/helper.cmake")

option(skip_i3_samples "set skip_i3_samples ON if you do not wish to compile\
                        included samples with source code (default OFF)" OFF)

# set source files
set(i3_sdk_c_src_files
    ${PROJECT_SOURCE_DIR}/src/i3_client.c
    )

# set include directories
set(i3_sdk_c_inc_dir
    ${PROJECT_SOURCE_DIR}/config
    ${PROJECT_SOURCE_DIR}/inc
    )

# add project library for symbolic project reference by samples, tests, and user code
add_library(i3_sdk_c
    ${i3_sdk_c_src_files}
    )

# add public include directories (e.g. APIs)
target_include_directories(i3_sdk_c PUBLIC ${i3_sdk_c_inc_dir})

# add private include directories (e.g. dependencies)
target_include_directories(i3_sdk_c PRIVATE 
    ${PROJECT_SOURCE_DIR}/inc/
    ${PROJECT_SOURCE_DIR}/deps/paho.mqtt.c/src
    )

# add target link libraries (e.g. dependencies)
# note: there are 4 paho mqtt objects
    # paho-mqtt3c
    # paho-mqtt3cs
    # paho-mqtt3a
    # paho-mqtt3as
target_link_libraries(i3_sdk_c paho-mqtt3c)

# add subdirectories (e.g. dependencies)
add_subdirectory(${PROJECT_SOURCE_DIR}/deps/paho.mqtt.c)

if(NOT ${skip_i3_samples})
    add_subdirectory(samples)
endif()
