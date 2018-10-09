module.exports.register = function(handlebars) {

    handlebars.registerHelper('getPrevious', function(arr, val) {
        var idx = 0;
        for (var ii=0; ii<arr.length; ii++) {
            if (arr[ii].toUpperCase() === val.toUpperCase()) {
                idx = ii;
                break;
            }
        }
        var newIdx = (idx === 0) ? arr.length-1 : idx-1;
        return (arr[newIdx].toLowerCase());
    });

    handlebars.registerHelper('getNext', function(arr, val) {
        var idx = 0;
        for (var ii=0; ii<arr.length; ii++) {
            if (arr[ii].toUpperCase() === val.toUpperCase()) {
                idx = ii;
                break;
            }
        }
        var newIdx = (idx === (arr.length-1)) ? 0 : idx+1;
        return (arr[newIdx].toLowerCase());
    });

    handlebars.registerHelper('getIndexOf', function(arr, val) {
        for (var ii=0; ii<arr.length; ii++) {
            console.log("getIndexOf()");
            console.dir(arr[ii]);
            if (arr[ii].referenceURI === val) {
                return ii;
            }
        }
        return -1;
    });

    handlebars.registerHelper('if_eq', function(a, b, opts) {
        if(a == b) {
            return opts.fn(this);
        }
    });

    handlebars.registerHelper('json', function(context) {
        return JSON.stringify(context);
    });

    handlebars.registerHelper('removeIgnore', function(arg1, arg2, options) {
        return arg1.replace(/(^.*IGNORE.*\n?)/gm, "");
    });

    handlebars.registerHelper('extractParent', function(arg1, arg2, options) {
        return arg1.split('-')[1];
    });

    handlebars.registerHelper('checkSketch', function(arg1, arg2, options) {
        var ret = '';
        var allowedTemplates = [{
                name: 'sketch',
                label: 'Sketch',
                url: 'public/documents/sketch/'
            }
        ];
        for (var ii=0; ii<allowedTemplates.length; ii++) {
            var template = allowedTemplates[ii];
            if (arg1.indexOf(template.name) !== -1) {
                var url = template.url + arg2 + '.sketch';
                ret = '<a class="btn btn--white-ghost" href="' + url + '" download="' + url + '">' + template.label + '<span class="qtr-margin-left icon-download"></span></a>';
            }
        }
        return new handlebars.SafeString(ret);
    });

    handlebars.registerHelper('removeSketch', function(arg) {
        return arg.replace('sketch', '');
    });

    handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    handlebars.registerHelper('checkTags', function(arg1, arg2, options) {
        var ret = arg1;
        var allowedTags = [{
                name: 'deprecated',
                label: 'deprecated',
                labelClass: 'label--warning label--bordered'
            },{
                name: 'new',
                label: 'new',
                labelClass: 'label--success label--bordered'
            },{
                name: 'updated',
                label: 'updated',
                labelClass: 'label--ghost'
            }
        ];
        for (var ii=0; ii<allowedTags.length; ii++) {
            var tag = allowedTags[ii];
            if (arg1.indexOf(tag.name) !== -1) {
                ret = arg1.substring(0, arg1.indexOf(tag.name)) +
                    ' <span class="label label--tiny ' + tag.labelClass +
                    ' qtr-margin-left">' + tag.label + '</span>';
            }
        }
        return new handlebars.SafeString(ret);
    });
};
