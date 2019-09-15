cmake_minimum_required(VERSION 3.2)

project(i3_sdk_c)

option(skip_i3_samples "set skip_i3_samples ON if you do not wish to compile\
                        included samples with source code (default OFF)" OFF)

# set source files
set(is_sdk_c_src_files
    ${PROJECT_SOURCE_DIR}/src/i3_client.c
    )

# set include directories
set(i3_sdk_c_inc_dir
    ${PROJECT_SOURCE_DIR}/src/config
    ${PROJECT_SOURCE_DIR}/src/inc
    )

# add public include directories (e.g. APIs)
target_include_directories(i3_sdk_c PUBLIC i3_sdk_c_inc_dir)

# add private include direcotries (e.g. dependencies)
# target_include_directories(i3_sdk_c PRIVATE ...)

# add subdirectories (e.g. dependencies)
# add_subdirectory(...)

if(NOT ${skip_i3_samples})
    add_subdirectory(samples)
endif()