cmake_minimum_required(VERSION 3.2)

set(this_sample_name subscribe)

# add sample src files
set(${this_sample_name}_src_files
    ./main.c
)

i3_build_c_sample_target(${this_sample_name} "samples/subscribe")