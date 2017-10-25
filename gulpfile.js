var gulp = require('gulp'),
    connect = require('gulp-connect'),
    historyApiFallback = require('connect-history-api-fallback');

    //Servidor de desarrollo web    
    gulp.task('server',function(){
        connect.server({
            root:'./app',
            hostname:'0.0.0.0',
            port:8080,
            livereload:true,
            middleware:function (connect, opt) {
                return [historyApiFallback];
            }
        });
    });

var stylus = require('gulp-stylus'),
    nib = require('nib');

//Preprocesa archivos stylus a CSS y recarga los cambios
gulp.task('css', function(){
    gulp.src('./app/stylesheets/main.styl')
        .pipe(stylus({ use:nib() }))
        .pipe(gulp.dest('./app/stylesheets'))
        .pipe(connect.reload());
});


//Recarga el navagador cuando hay cambios en el HTML
gulp.task('html', function () {
    gulp.src('./app/**/*.html')
      .pipe(connect.reload());
  });

//Vigila cambios que se produzcan en el codigo y lanza las tareas relacionadas
gulp.task('watch', function () {
    gulp.watch(['./app/*.html'], ['html']);
    gulp.watch(['./app/stylus/*.styl'], ['css']);
  });

//Tarea por defecto que lanza las tareas server-watch
gulp.task('default',['server','watch']);
    