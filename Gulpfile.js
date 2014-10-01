var gulp = require('gulp');
var jslint = require('gulp-jslint');
var webserver = require('gulp-webserver');

gulp.task('serve', function() {
    gulp.src('app')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('jslint', function () {
    return gulp.src([
        './app/scripts/*.js',
        './app/tests/*.js'
        ])
        .pipe(jslint({
            vars: true,
            unparam: true,
            nomen: true,
            white: true,
            errorsOnly: false,
            plusplus: true,
            bitwise: true,
            todo: true,
            browser: true,
            devel: true
        }));
});

gulp.task('fetch_translation', function () {
    var Transifex = require('transifex'),
        fs = require('fs');
        
    var transifex = new Transifex({
        project_slug: 'jabber-firefox-os',
        credential: 'JabberFFOS:JabberFirefoxOS'
    });
    
    var webappManifest = JSON.parse(fs.readFileSync('./app/manifest.webapp', 'utf8'));
    webappManifest.locales = {};
    
    transifex.resourcesInstanceMethods(
        'jabber-firefox-os', 
        'jabberproperties', 
        true, 
        function(instanceErr, instanceData) {
        
        for(var i = 0, iLen = instanceData.available_languages.length; i < iLen; i++) {
        
            if(instanceData.available_languages[i].code == 'en') {
                continue;
            }
        
            transifex.translationStringsMethod(
                'jabber-firefox-os', 
                'jabberproperties', 
                instanceData.available_languages[i].code, 
                (function(locale, err, data) {
                
                var l20n = '',
                    jabberId = '',
                    jabberIdPlaceholder = '',
                    password = '',
                    passwordPlaceholder = '',
                    serverUrl = '',
                    serverUrlPlaceholder = '',
                    nickname = '',
                    nicknamePlaceholder = '';
                
                if(!!data && data.length) {
                    data = JSON.parse(data);
    
                    var manifestLocale = {};
    
                    for(var j = 0, jLen = data.length; j < jLen; j++) {
                        var item = data[j];
                        
                        if(!!item.translation) {
                            switch(item.key) {
                            
                                case 'brandName':
                                    manifestLocale.name = item.translation;
                                    break;
                            
                                case 'brandDescription':
                                    manifestLocale.description = item.translation;
                                    l20n += '<' + item.key + ' "' + item.translation + '" content: "' + item.translation + '">' + "\n";
                                    break;
                                    
                                case 'jabberId':
                                    jabberId = item.translation;
                                    break;
                                    
                                case 'jabberId.placeholder':
                                    jabberIdPlaceholder = item.translation;
                                    break;
                                    
                                case 'password':
                                    password = item.translation;
                                    break;
                                    
                                case 'password.placeholder':
                                    passwordPlaceholder = item.translation;
                                    break;
                                    
                                case 'serverUrl':
                                    serverUrl = item.translation;
                                    break;
                                    
                                case 'serverUrl.placeholder':
                                    serverUrlPlaceholder = item.translation;
                                    break;
                                    
                                case 'nickname':
                                    nickname = item.translation;
                                    break;
                                    
                                case 'nickname.placeholder':
                                    nicknamePlaceholder = item.translation;
                                    break;
                                    
                                default:
                                    if(item.translation.indexOf('"') > -1) {
                                        l20n += '<' + item.key + ' """' + "\n";
                                        l20n += '  ' + item.translation + "\n";
                                        l20n += '""">' + "\n";
                                    }
                                    else {
                                        l20n += '<' + item.key + ' "' + item.translation + '">' + "\n";
                                    }
                            }
                        }
                    }
                    if(jabberId != '') {
                        l20n += '<jabberId "' + jabberId + '" placeholder: "' + jabberIdPlaceholder + '">' + "\n";
                    }
                    if(password != '') {
                        l20n += '<password "' + password + '" placeholder: "' + passwordPlaceholder + '">' + "\n";
                    }
                    if(serverUrl != '') {
                        l20n += '<serverUrl "' + serverUrl + '" placeholder: "' + serverUrlPlaceholder + '">' + "\n";
                    }
                    if(nickname != '') {
                        l20n += '<nickname "' + nickname + '" placeholder: "' + nicknamePlaceholder + '">' + "\n";
                    }
                    
                    if(l20n !== '') {
                        var dir = './app/locales/' + locale + '/',
                            file = dir + 'jabber.l20n';
                        
                        if(!fs.existsSync(dir)){
                            fs.mkdirSync(dir, 0766, function(err){
                                if(err){ 
                                    console.log(err);
                                }
                            });
                        }
                        fs.writeFileSync(file, l20n, 'utf8');
                        
                        webappManifest.locales[locale] = manifestLocale;
                        fs.writeFileSync('./app/manifest.webapp', JSON.stringify(webappManifest, null, 2), 'utf8');
                    }
                }
            }).bind(this, instanceData.available_languages[i].code));
        }
    });
});

gulp.task('default', ['fetch_translation', 'jslint', 'serve']);
