module.exports = function (grunt) {
    grunt.loadNpmTasks('catena');

    grunt.config.init({
        catena: {
            options: {
                license: 'LICENSE'
            },
            dev: {
                src: ['js/'],
                dest: 'dist/app.js',
                options: {
                    watch: true
                }
            },
            deploy: {
                src: ['js/'],
                dest: 'dist/app.js',
                options: {
                    test: true,
                    deploy: true
                }
            }
        }
    });
};
