cmake_minimum_required(VERSION 3.2)

set(this_sample_name publish)

# add sample inc dir
# set(${this_sample_name}_inc_dir
# )

# add sample src files
set(${this_sample_name}_src_files
    ./main.c
)

set(CMAKE_BUILD_TYPE RelWithDebInfo)

i3_build_c_sample_target(${this_sample_name} "samples/publish")