var cssfiles = [
    "../assets/plugins/bootstrap/css/bootstrap.css",

    //THEME CSS
    "../assets/css/essentials.css",
    "../assets/css/layout.css",

    //PAGE LEVEL SCRIPTS
    "../assets/css/header-1.css",
    "../assets/css/layout-shop.css",
    "../assets/css/color_scheme/blue.css",

    //RTL SUPPORT
    "../assets/plugins/bootstrap/RTL/bootstrap-rtl.css",
    "../assets/plugins/bootstrap/RTL/bootstrap-flipped.css",
    "../assets/css/layout-RTL.css",

    //CUSTOM FONTS
    "../assets/css/fontiran.css",
    "../assets/css/layout-font-rewrite.css",

    //ANGULAR LOADING BAR
    "../assets/plugins/angularjs/angular-loading-bar/loading-bar.css",

    //CUSTOM STYLES
    "../assets/css/custom.css"
];
module.exports = {
    bundle: {
        main: {
            styles: cssfiles
        }
    },
    copy: './content/**/*.{png,svg}'
};