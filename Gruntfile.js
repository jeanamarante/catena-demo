module.exports = function (grunt) {
    grunt.loadNpmTasks('catena');

    grunt.config.init({
        catena: {
            dist: {
                src: ['js/'],
                dest: 'dist/app.js',
                options: {
                    license: 'LICENSE'
                }
            }
        }
    });
};
