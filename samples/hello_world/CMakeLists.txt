cmake_minimum_required(VERSION 3.2)

set(this_sample_name hello_world)

# add sample inc files
# set(${this_sample_name}_inc_dir
#     ${PROJECT_SOURCE_DIR}/samples/${this_sample_name}/config
#     ${PROJECT_SOURCE_DIR}/samples/common/inc
# )

# add sample src files
set(${this_sample_name}_src_files
    ./main.c
)

i3_build_c_sample_target(${this_sample_name} "samples/hello_world")