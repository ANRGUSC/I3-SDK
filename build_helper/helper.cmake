# build sample
function(i3_build_c_sample_target what_is_building folder)
    # define target to build
    add_executable(${what_is_building}
        ${${what_is_building}_src_files}
    )

    # folder to output executable
    set_target_properties(${what_is_building}
               PROPERTIES
               FOLDER ${folder})

    # target include directories for sdk and sample
    target_include_directories(${what_is_building} PUBLIC
                ${PROJECT_SOURCE_DIR}/inc
                ${PROJECT_SOURCE_DIR}/config
                # ${${what_is_building}_inc_dir}
    )
    target_link_libraries(${what_is_building}
                PRIVATE i3_sdk_c
    )


endfunction()