module.exports = function (grunt) {
    grunt.loadNpmTasks('catena');

    grunt.config.init({
        catena: {
            src: 'js',
            dest: 'dist/app.js',
            watch: true,
            externs: [],
            license: 'LICENSE'
        }
    });
};
