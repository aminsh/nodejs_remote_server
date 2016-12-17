(function () {
    'use strict';

    angular.module('ui.navaar.widgets', [
    ]);
})();
var app = angular.module('customDirectives', []);


app.directive('onRepeatDone', function () {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attr) {
            if ($scope.$last) {
                $scope.$emit("repeat_done" + "_" + $element[0].parentElement.id, $element);
            }
        }
    };
});

app.directive("csDateToIso", ['$filter', 'PersianDateService', function ($filter, pdService) {

    var linkFunction = function (scope, element, attrs, ngModelCtrl) {

        ngModelCtrl.$parsers.push(function (datepickerValue) {
            if (!datepickerValue) return;
            var newDate = new Date(datepickerValue.getTime() - (datepickerValue.getTimezoneOffset() * 60000));
            return newDate;
        });
    };

    return {
        restrict: "A",
        require: "ngModel",
        link: linkFunction
    };
}]);

/***
 * App module: app 
 *
 ***/

var app = angular.module('app', [
    // Angular modules 
    'ngAnimate',        // Angular animations
    'ngRoute',          // Angular routes
    'ngResource',       // Angular resource
    'ui.bootstrap',     // Angular ui bootstrap
    'ui.utils',      // Angular ui utils
    'infinite-scroll',   // infinite scroll module
    'ui.bootstrap.showErrors',  // angular show errors
    'ui.bootstrap.persian.datepicker',
    //'ui.bootstrap.datepicker',
    '720kb.socialshare', //angular social share
    'ab-base64',    //base64
    'LocalStorageModule', //angular local storage
    'truncate', //angular truncate

    //app custom widgets
    'ui.navaar.widgets',

    'customDirectives', // App custom directives.
    'customFilters',    // App custom filters.

    //angulartics
    'angulartics',
    'angulartics.google.analytics',
    //'angulartics.inspectlet'

    //angular feed
    'feeds',

    //angular-img-fallback
    'dcbImgFallback',

    //angular loading bar
    'angular-loading-bar'
]);

app.constant('MARKET_ID', '17cd7dfa-25ae-4393-b89f-4c77dc3cee2c');

//This configures the routes and associates each route with a view and a controller
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/',
            {
                controller: 'IndexController',
                templateUrl: '/app/templates/index.html',
                controllerAs: 'vm',
                resolve: {
                    slideImages: ['FeaturedSlideService', function (featuredSlideService) {
                        //return featuredSlideService.getFeaturedSlides();
                        return featuredSlideService.getSlideImages();
                    }]
                },
                title: 'نوار، مرجع خرید و دانلود کتاب صوتی فارسی',
                description: 'بهترین و جدید ترین کتاب های صوتی را دانلود کرده و در کامپیوتر، تبلت و یا موبایل خود گوش نمایید.',
            })
        .when('/catalog',
            {
                controller: 'CatalogController',
                templateUrl: '/app/templates/catalog.html',
                controllerAs: 'vm',
                title: 'کاتالوگ کتابهای صوتی',
                description: 'کاتالوگ کتابهای صوتی',
            })
        .when('/catalog/:filterType',
            {
                controller: 'CatalogController',
                templateUrl: '/app/templates/catalog.html',
                controllerAs: 'vm',
                title: 'کاتالوگ کتابهای صوتی',
                description: 'کاتالوگ کتابهای صوتی',
            })
        .when('/catalog/:filterType/:filterId/:slug',
            {
                controller: 'CatalogController',
                templateUrl: '/app/templates/catalog.html',
                controllerAs: 'vm',
                title: 'کاتالوگ کتابهای صوتی',
                description: 'کاتالوگ کتابهای صوتی',
            })
        .when('/search/:keyword',
            {
                controller: 'TotalSearchController',
                templateUrl: '/app/templates/search_result_total.html',
                controllerAs: 'vm',
                title: 'نتایج جستجو',
            })
        .when('/audiobook/:audioBookId/:slug',
            {
                controller: 'AudioBookController',
                templateUrl: '/app/templates/audiobook_detail.html',
                controllerAs: 'vm',
                title: '',
                description: 'بهترین و جدید ترین کتاب های صوتی را دانلود کرده و در کامپیوتر، تبلت و یا موبایل خود گوش نمایید.',
            })
        .when('/checkout',
            {
                controller: 'CheckoutController',
                templateUrl: '/app/templates/checkout.html',
                controllerAs: 'vm',
                title: 'خرید محصولات',
            })
        .when('/app-checkout',
            {
                controller: 'AppCheckoutController',
                templateUrl: '/app/templates/app-checkout.html',
                controllerAs: 'vm',
                title: 'خرید محصولات',
            })
         .when('/confirm-payment/:orderId/:status',
            {
                controller: 'ConfirmPaymentController',
                templateUrl: '/app/templates/confirm-payment.html',
                controllerAs: 'vm',
                title: 'تایید سفارش',
            })
        //.when('/confirm-order',
        //{
        //    templateUrl: '/app/templates/confirm-order.html',
        //    title: 'تایید سفارش',
        //})
        .when('/forgot-password', {
            controller: 'ForgotPasswordController',
            templateUrl: '/app/templates/forgot-password.html',
            controllerAs: 'vm',
            title: 'بازیابی رمز عبور',
        })
        .when('/confirm-email', {
            controller: 'ConfirmEmailController',
            templateUrl: '/app/templates/confirm_email.html',
            controllerAs: 'vm',
            title: 'تایید حساب کاربری',
        })
        .when('/reset-password', {
            controller: 'ResetPasswordController',
            templateUrl: '/app/templates/reset_password.html',
            controllerAs: 'vm',
            title: 'تعیین رمز عبور جدید',
        })
         .when('/redeem', {
             controller: 'RedeemController',
             templateUrl: '/app/templates/redeem.html',
             controllerAs: 'vm',
             title: 'ثبت کد هدیه',
             description: 'با ثبت کد هدیه، نسخه دیجیتال کتاب صوتی مربوطه را به کتابخانه دیجیتال خود اضافه نمایید.',
         })
        .when('/user', {
            controller: 'UserController',
            templateUrl: '/app/templates/user.html',
            controllerAs: 'vm',
            //reloadOnSearch: false,
            title: 'حساب کاربری من',
        })
        .when('/404', {
            controller: 'NotFoundController',
            templateUrl: '/app/templates/404.html',
            controllerAs: 'vm',
            title: 'خطای 404',
        })
        .when('/contact', {
            controller: 'ContactController',
            templateUrl: '/app/templates/contact.html',
            controllerAs: 'vm',
            title: 'تماس با ما',
            description: 'تماس با',
        })
        .when('/about', {
            templateUrl: '/app/templates/about.html',
            title: 'درباره ما',
            description: 'درباره',
        })
        .when('/faq', {
            controller: 'FaqController',
            templateUrl: '/app/templates/faq.html',
            controllerAs: 'vm',
            title: 'سوالات متداول',
            description: 'سوالات متداول',
        })
        .when('/applications', {
            controller: 'ApplicationsController',
            templateUrl: '/app/templates/applications.html',
            controllerAs: 'vm',
            title: 'برنامه ها',
            description: 'برنامه ها',
        })
        .when('/privacy', {
            templateUrl: '/app/templates/privacy.html',
            title: 'حریم خصوصی',
            description: 'حریم خصوصی',
        })
        .when('/auth-redirect',
        {
            controller: 'AuthRedirectController',
            templateUrl: '/app/templates/auth-redirect.html',
            controllerAs: 'vm',
            title: 'تایید هویت',
        })
        .when('/subscription',
        {
            controller: 'SubscriptionController',
            templateUrl: '/app/templates/subscription.html',
            controllerAs: 'vm',
            title: 'اشتراک دریافت کتاب های صوتی',
        })
        .otherwise({ redirectTo: '/404' });

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
}]);

app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|mailto|navaarapp):/);
}]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}]);

//app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
//    //cfpLoadingBarProvider.parentSelector = '#header';
//    //cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Custom Loading Message...</div>';
//}]);

app.run(['$rootScope', 'PageService', '$timeout', 'ANALYTICS', '$http', 'localStorageService', '$route', function ($rootScope, PageService, $timeout, ANALYTICS, $http, localStorageService, $route) {
    $rootScope.Page = PageService;
    $rootScope.nvrAnalytics = ANALYTICS;

    var a = Guid.create().value;

    var deviceId = localStorageService.get('device-id') || Guid.create().value;
    localStorageService.set('device-id', deviceId);

    $http.defaults.headers.common['client-id'] = '3';
    $http.defaults.headers.common['version-code'] = '0';
    $http.defaults.headers.common['api-level'] = '1';
    $http.defaults.headers.common['device-id'] = deviceId;

    //$rootScope.$on('$locationChangeStart', function (event) {
    //});

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        if (current.$$route) {
            $rootScope.Page.setTitle(current.$$route.title);
            $rootScope.Page.setDescription(current.$$route.description);
            $rootScope.Page.setKeywords(current.$$route.keywords);
            $rootScope.Page.setUrl(window.location.href);

            if (current.$$route.originalPath == '/404') {
                $rootScope.Page.setStatusCode('404');
            }
        }

        //bring back the footer after a small delay for smoother animation.
        //$timeout(function () {
        //    $rootScope.showFooter = true;
        //}, 500)
    });

    $rootScope.$on('event:auth-loginRequired', function () {
        if ($rootScope.isAuthenticated) {
            $rootScope.logout();
        }
        if (!$rootScope.loginRequested) {
            $rootScope.loginRequested = true;
            $rootScope.login();
        }
    });

    $rootScope.isActiveRoute = function (path) {
        if ($route.current && $route.current.regexp) {
            return $route.current.regexp.test(path);
        }
        return false;
    };
}]);

//var serviceBase = 'http://localhost:52762/';
//var serviceBase = 'http://www.navaar.ir/';
var serviceBase = '';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});




angular.module('ui.navaar.widgets')
.directive('nvrBoxFlip', function () {
    return {
        restrict: 'EA',
        link: function ($scope, $element, $attr) {

            //SMARTY
            //if(jQuery('.box-flip').length > 0) {

            //	jQuery('.box-flip').each(function() {
            //		_height1 = jQuery('.box1',this).outerHeight();
            //		_height2 = jQuery('.box2',this).outerHeight();

            //		if(_height1 >= _height2) {
            //			_height = _height1;
            //		} else {
            //			_height = _height2;
            //		}

            //		jQuery(this).css({"min-height":_height+"px"});
            //		jQuery('.box1',this).css({"min-height":_height+"px"});
            //		jQuery('.box2',this).css({"min-height":_height+"px"});
            //	});

            //	jQuery('.box-flip').hover(function() {
            //		jQuery(this).addClass('flip');
            //	},function(){
            //		jQuery(this).removeClass('flip');
            //	});
            //}


            //Arash
            //if not use load function, the outer height is calculated wrong due to the image having not loaded yet.
            $element.each(function () {
                var image = jQuery('.box1 img', this);

                image.on('load', function () {
                    _showFlip();
                });
            });

            function _showFlip() {
                $element.each(function () {
                    _height1 = jQuery('.box1', this).outerHeight();
                    _height2 = jQuery('.box2', this).outerHeight();

                    if (_height1 >= _height2) {
                        _height = _height1;
                    } else {
                        _height = _height2;
                    }

                    jQuery(this).css({ "min-height": _height + "px" });
                    jQuery('.box1', this).css({ "min-height": _height + "px" });
                    jQuery('.box2', this).css({ "min-height": _height + "px" });
                });

                $element.hover(function () {
                    jQuery(this).addClass('flip');
                }, function () {
                    jQuery(this).removeClass('flip');
                });
            }
        }
    };
});

angular.module('ui.navaar.widgets')
.directive('nvrBtnLoading', function () {
    return {
        link: function (scope, element, attrs) {
            scope.$watch(
                function () {
                    return scope.$eval(attrs.btnLoading);
                },
                function (value) {
                    if (value) {
                        element.addClass("disabled").attr("disabled", "disabled");
                        element.data('resetText', element.html());
                        element.html(element.data('loading'));
                    } else {
                        if (!scope.$eval(attrs.ngDisabled)) {
                            element.removeClass("disabled").removeAttr("disabled");
                            element.html(element.data('resetText'));
                        }
                    }
                }
            );
        }
    };
}
);

angular.module('ui.navaar.widgets')
.directive('nvrCarousel', function () {
    return {
        restrict: 'EA',
        link: function ($scope, $element, $attr) {

            //SMARTY

            //Arash
            //var slider = jQuery(this);
            var slider = $element;
            var options = slider.attr('data-plugin-options');

            // Progress Bar
            var $opt = eval('(' + options + ')');  // convert text to json

            if ($opt.progressBar == 'true') {
                var afterInit = progressBar;
            } else {
                var afterInit = false;
            }

            var defaults = {
                items: 5,
                itemsCustom: false,
                itemsDesktop: [1199, 4],
                itemsDesktopSmall: [980, 3.3],
                itemsTablet: [768, 2.3],
                itemsTabletSmall: false,
                itemsMobile: [479, 1.3],
                singleItem: true,
                itemsScaleUp: false,

                slideSpeed: 200,
                paginationSpeed: 800,
                rewindSpeed: 1000,

                autoPlay: false,
                stopOnHover: false,

                navigation: false,
                navigationText: [
                                    '<i class="fa fa-angle-left"></i>',
                                    '<i class="fa fa-angle-right"></i>'
                ],
                rewindNav: true,
                scrollPerPage: false,

                pagination: true,
                paginationNumbers: false,

                responsive: true,
                responsiveRefreshRate: 200,
                responsiveBaseWidth: window,

                baseClass: "owl-carousel",
                theme: "owl-theme",

                lazyLoad: false,
                lazyFollow: true,
                lazyEffect: "fade",

                autoHeight: false,

                jsonPath: false,
                jsonSuccess: false,

                dragBeforeAnimFinish: true,
                mouseDrag: true,
                touchDrag: true,

                transitionStyle: false,

                addClassActive: false,

                beforeUpdate: false,
                afterUpdate: false,
                beforeInit: false,
                afterInit: afterInit,
                beforeMove: false,
                afterMove: (afterInit == false) ? false : moved,
                afterAction: false,
                startDragging: false,
                afterLazyLoad: false
            }

            var config = jQuery.extend({}, defaults, options, slider.data("plugin-options"));
            //Arash --> delay the initialization
            //slider.owlCarousel(config).addClass("owl-carousel-init");


            // Progress Bar
            //Arash
            //var elem = jQuery(this);
            var elem = $element;

            //Init progressBar where elem is $("#owl-demo")
            function progressBar(elem) {
                $elem = elem;
                //build progress bar elements
                buildProgressBar();
                //start counting
                start();
            }

            //create div#progressBar and div#bar then prepend to $("#owl-demo")
            function buildProgressBar() {
                $progressBar = jQuery("<div>", {
                    id: "progressBar"
                });
                $bar = jQuery("<div>", {
                    id: "bar"
                });
                $progressBar.append($bar).prependTo($elem);
            }

            function start() {
                //reset timer
                percentTime = 0;
                isPause = false;
                //run interval every 0.01 second
                tick = setInterval(interval, 10);
            };


            var time = 7; // time in seconds
            function interval() {
                if (isPause === false) {
                    percentTime += 1 / time;
                    $bar.css({
                        width: percentTime + "%"
                    });
                    //if percentTime is equal or greater than 100
                    if (percentTime >= 100) {
                        //slide to next item 
                        $elem.trigger('owl.next')
                    }
                }
            }

            //pause while dragging 
            function pauseOnDragging() {
                isPause = true;
            }

            //moved callback
            function moved() {
                //clear interval
                clearTimeout(tick);
                //start again
                start();
            }


            $scope.$on('repeat_done' + '_' + $element[0].id, function () {
                slider.owlCarousel(config).addClass("owl-carousel-init");
            });
        }
    };
});

angular.module('ui.navaar.widgets')
.directive('nvrJPlayer', function () {
    return {
        restrict: 'A',
        scope: {
            mp3: '=',
            ogg: '=',
            title: '=', 
            swfPath: '=',
        },
        templateUrl: 'template/jplayer/jplayer.html',
        replace: true,
        link: function (scope, element, attrs) {
            var updatePlayer = function () {
                if (!scope.mp3) return;

                var jElement = angular.element('#jquery_jplayer');

                jElement.jPlayer("destroy");
                jElement.jPlayer({
                    ready: function () {
                        $(this).jPlayer('setMedia', {
                            title: scope.title,
                            oga: scope.ogg,
                            mp3: scope.mp3,
                        }).jPlayer('play');
                    },
                    swfPath: scope.swfPath,
                    supplied: 'oga, mp3',
                    wmode: 'window',
                    smoothPlayBar: true,
                    keyEnabled: true,
                    remainingDuration: true,
                    toggleDuration: true
                });
            }

            scope.$watch('mp3', updatePlayer);

            updatePlayer();
        }
    };
});

angular.module("ui.navaar.widgets").run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/jplayer/jplayer.html",
        '<div>' +
            '<div id="jquery_jplayer" class="jp-jplayer"></div>' +
            '<div id="jp_container_1" class="jp-audio">' +
                '<div class="jp-type-single">' +
                    '<div class="jp-gui jp-interface">' +
                        '<div class="col-md-1 col-sm-1 col-xs-3">' +
                            '<ul class="jp-controls">' +
                                '<li><a href="javascript:;" class="jp-play" tabindex="1">پخش</a></li>' +
                                '<li><a href="javascript:;" class="jp-pause" tabindex="1" style="display:none">توقف</a></li>' +
                            '</ul>' +
                        '</div>' +
                        '<div class="col-md-10 col-sm-10 col-xs-8">' +
                            '<div class="jp-title truncate">' +
                                '<ul>' +
                                    '<li></li>' +
                                '</ul>' +
                            '</div>' +
                            '<div class="jp-progress">' +
                                '<div class="jp-seek-bar">' +
                                    '<div class="jp-play-bar"></div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="jp-time-holder">' +
                                '<div class="jp-current-time"></div>' +
                                '<div class="jp-duration"></div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-md-1 col-sm-1 col-xs-1">' +
                            '&nbsp' +
                        '</div>' +
                    '</div>' +
                    '<div class="jp-no-solution">' +
                        'جهت پخش کتاب صوتی، مرورگر خود را بروز رسانی نمایید و یا <a href="http://get.adobe.com/flashplayer/" target="_blank">پلاگین فلش</a> خود را بروز نمایید.' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>');
}]);
angular.module('ui.navaar.widgets')
.directive('nvrListCarousel', function () {
    return {
        restrict: 'EA',
        require: '^carousel',
        templateUrl: '/app/templates/carousel_list_normal.html',
        scope: {
            items: '=',
            prevId: '=',
            nextId: '=',
            listLabel: '=',
        },
    };
});
angular.module('ui.navaar.widgets')
.directive('nvrListCarouselFull', function () {
    return {
        restrict: 'EA',
        require: '^carousel',
        templateUrl: '/app/templates/carousel_list_full.html',
        scope: {
            items: '=',
            prevId: '=',
            nextId: '=',
            listLabel: '=',
        },
    };
});
angular.module('ui.navaar.widgets')
.directive('nvrListCarouselSuggestion', function () {
    return {
        restrict: 'EA',
        require: '^carousel',
        templateUrl: '/app/templates/carousel_list_suggestion.html',
        scope: {
            items: '=',
            prevId: '=',
            nextId: '=',
            sourceIdentifier: '=',
        },
    };
});
angular.module('ui.navaar.widgets')
.directive('nvrMap', function () {
    return {
        restrict: 'EA',
        link: function ($scope, $element, $attr) {

            loadScript('http://maps.google.com/maps/api/js?sensor=true', function () {

                loadScript(plugin_path + 'gmaps/gmaps.min.js', function () {

                    var mapId = $attr.id;
                    if (!mapId) return;

                    var map = new GMaps({
                        div: '#' + mapId,
                        lat: 35.714264,
                        lng: 51.403735,
                        scrollwheel: false
                    });

                    var marker = map.addMarker({
                        lat: 35.714264,
                        lng: 51.403735,
                        title: 'مرجع کتاب های صوتی نوار'
                    });

                });

            });

           


            //var mapId = $attr.id;
            //if (!mapId) return;

            //var map = new GMaps({
            //    div: '#' + mapId,
            //    lat: 35.6991461,
            //    lng: 51.395604,
            //    scrollwheel: false
            //});

            //var marker = map.addMarker({
            //    lat: 35.6991461,
            //    lng: 51.395604,
            //    title: 'مرجع کتاب های صوتی نوار'
            //});
        }
    };
});

angular.module('ui.navaar.widgets')
.directive('nvrMasonryGallery', function () {
    return {
        restrict: 'EA',
        link: function ($scope, $element, $attr) {

            //SMARTY
            //function _masonryGallery() {

            //	if(jQuery(".masonry-gallery").length > 0) {

            //		jQuery(".masonry-gallery").each(function() {
            //			var _container = jQuery(this),
            //				columns		= 4;

            //				 if(_container.hasClass('columns-2')) 	columns = 2;
            //			else if(_container.hasClass('columns-3')) 	columns = 3;
            //			else if(_container.hasClass('columns-4')) 	columns = 4;
            //			else if(_container.hasClass('columns-5')) 	columns = 5;
            //			else if(_container.hasClass('columns-6')) 	columns = 6;

            //			var _firstElemWidth 	= _container.find('a:eq(0)').outerWidth(),
            //				_bigImageNo 		= _container.attr('data-img-big'),
            //				_containerWidth		= _container.width();


            //			// Fix margins & Width
            //            var postWidth = (_containerWidth/columns);
            //				postWidth = Math.floor(postWidth);
            //            if((postWidth * columns) >= _containerWidth) { 
            //				_container.css({ 'margin-right': '-1px' }); 
            //			}
            //			if(columns < 6) {
            //				_container.children('a').css({"width":postWidth+"px"});
            //			}


            //			// Set Big Image
            //            if(parseInt(_bigImageNo) > 0) {

            //				_bigImageNo 	= Number(_bigImageNo) - 1; 
            //				_container.find('a:eq('+_bigImageNo+')').css({ width: _firstElemWidth*2 + 'px'});

            //				loadScript(plugin_path + 'isotope/isotope.pkgd.min.js', function() {

            //					setTimeout( function() {
            //						_container.isotope({
            //							masonry: {
            //								columnWidth: _firstElemWidth
            //							}
            //						});

            //						_container.isotope('layout');

            //					}, 1000);

            //				});

            //            }

            //		});


            //	}

            //}

            //Arash

            $scope.$on('repeat_done' + '_' + $element[0].id, function () {
                _masonryGallery();
            });

            function _masonryGallery() {
                if ($element.length > 0) {
                    var _container = jQuery($element[0]),
                                    columns = 4;

                    if (_container.hasClass('columns-2')) columns = 2;
                    else if (_container.hasClass('columns-3')) columns = 3;
                    else if (_container.hasClass('columns-4')) columns = 4;
                    else if (_container.hasClass('columns-5')) columns = 5;
                    else if (_container.hasClass('columns-6')) columns = 6;

                    var _firstElemWidth = _container.find('a:eq(0)').outerWidth(),
                        _bigImageNo = _container.attr('data-img-big'),
                        _containerWidth = _container.width();


                    // Fix margins & Width
                    var postWidth = (_containerWidth / columns);
                    postWidth = Math.floor(postWidth);
                    if ((postWidth * columns) >= _containerWidth) {
                        _container.css({ 'margin-right': '-1px' });
                    }
                    if (columns < 6) {
                        _container.children('a').css({ "width": postWidth + "px" });
                    }


                    // Set Big Image
                    if (parseInt(_bigImageNo) > 0) {

                        _bigImageNo = Number(_bigImageNo) - 1;
                        _container.find('a:eq(' + _bigImageNo + ')').css({ width: _firstElemWidth * 2 + 'px' });

                        setTimeout(function () {
                            _container.isotope({
                                masonry: {
                                    columnWidth: _firstElemWidth
                                }
                            });

                            _container.isotope('layout');

                        }, 1000);

                    }
                }
            }
        }
    };
});

angular.module('ui.navaar.widgets')
.directive('nvrMixItUp', function () {
    return {
        restrict: 'EA',
        link: function ($scope, $element, $attr) {

            //SMARTY
            //var _container = jQuery('.mix-grid');

            //if (_container.length > 0) {
            //    loadScript(plugin_path + 'mixitup/jquery.mixitup.min.js', function () {

            //        if (jQuery().mixitup) {

            //            _container.mixitup();
            //            jQuery("ul.mix-filter a").bind("click", function (e) {
            //                e.preventDefault();
            //            });

            //        }

            //    });

            //}

            //Arash
            var _container = $element;

            if (_container.length > 0) {
                //loadScript(plugin_path + 'mixitup/jquery.mixitup.min.js', function () {

                    if (jQuery().mixitup) {

                        //_container.mixitup();
                        //jQuery("ul.mix-filter a").bind("click", function (e) {
                        //    e.preventDefault();
                        //});

                        $scope.$on('repeat_done' + '_' + $element[0].id, function () {
                            _container.mixitup();
                            jQuery("ul.mix-filter a").bind("click", function (e) {
                                e.preventDefault();
                            });
                        });

                    }

                //});

            }

        }
    };
});

angular.module('ui.navaar.widgets')
.controller('PageHeaderController', [function () {
    var vm = this;
}])

.directive('nvrPageHeader', function () {
    return {
        restrict: 'EA',
        controller: 'PageHeaderController',
        scope: {
            items: '=',
            title: '=',
        },
        controller: 'PageHeaderController',
        controllerAs: 'vm',
        bindToController: true,
        template: '<section class="page-header page-header-xs">' +
				        '<div class="container">' +
                            '<h1 data-ng-bind="vm.title" itemprop="name"></h1>' +
                            '<!-- breadcrumbs -->' +
					        '<ol class="breadcrumb" itemscope itemtype="http://schema.org/BreadcrumbList">' +
						        '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemscope itemtype="http://schema.org/Thing" itemprop="item" href="/"><span itemprop="name">صفحه اصلی</span></a><meta itemprop="position" content="1" /></li>' +
						        '<li data-ng-repeat="item in vm.items" class="active" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">' +
                                    '<span data-ng-bind="item.title" data-ng-show="!item.url"/>' +
                                    '<a href="{{item.url}}" data-ng-show="item.url" itemscope itemtype="http://schema.org/Thing" itemprop="item"><span data-ng-bind="item.title" itemprop="name"></span></a><meta itemprop="position" content="{{$index + 1}}" />' +
                                '</li>' +
					        '</ol>' +
                            '<!-- /breadcrumbs -->' +
				        '</div>' +
			        '</section>',
        replace: true,
        link: function ($scope, element, attrs) {
        }
    };
});

angular.module('ui.navaar.widgets')
.directive('nvrPlayToggle', function () {
    return {
        restrict: 'EA',
        link: function ($scope, $element, $attr) {
            var vm = $scope.vm;

            $element.bind('click', function () {
                var container = angular.element('#' + $attr.container);
                if (!container || container.length != 1) {
                    throw new Exception('invalid container for jplayer.')
                }

                var overlayImage = angular.element('.play-overlay');
                if (!overlayImage.is(":hidden")) {
                    overlayImage.toggle();
                }

                var mode = $attr.mode;
                if (mode && mode == 'close') {
                    container.toggle();
                    overlayImage.toggle();
                    angular.element('#jquery_jplayer').jPlayer('pause');
                    return;
                }

                var isHidden = container.is(":hidden");

                if (isHidden) {
                    container.toggle();
                }
            })
        }
    };
});

angular.module('ui.navaar.widgets')
.directive('nvrPreloader', ['$timeout', function ($timeout) {
    return {
        restrict: 'EA',
        link: function ($scope, $element, $attr) {

            //SMARTY
            //if (jQuery('#preloader').length > 0) {

            //    jQuery(window).load(function () {

            //        jQuery('#preloader').fadeOut(1000, function () {
            //            jQuery('#preloader').remove();
            //        });

            //        // setTimeout(function() {}, 1000); 

            //    });

            //}


            //Arash
            $scope.$on('$locationChangeStart', function (event) {
                jQuery('#preloader').attr('style', '');
            });

            $scope.$on('$viewContentLoaded', function () {

                $timeout(function () {
                     jQuery('#preloader').fadeOut(1000, function () {
                });
                }, 0);
            });

        }
    };
}]);

angular.module('ui.navaar.widgets')

.constant('ratingConfig', {
    max: 5,
    stateOn: null,
    stateOff: null,
    stateHalf: null,
})

.controller('RatingController', ['$scope', '$attrs', '$parse', 'ratingConfig', function ($scope, $attrs, $parse, ratingConfig) {

    this.maxRange = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max;
    this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
    this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;
    this.stateHalf = angular.isDefined($attrs.stateHalf) ? $scope.$parent.$eval($attrs.stateHalf) : ratingConfig.stateHalf;
    this.selectState = angular.isDefined($attrs.selectState) ? $scope.$parent.$eval($attrs.selectState) : ratingConfig.selectState;

    this.createRateObjects = function (states) {
        var defaultOptions = {
            stateOn: this.stateOn,
            stateOff: this.stateOff,
            stateHalf: this.stateHalf,
            selectState: this.selectState,
        };

        for (var i = 0, n = states.length; i < n; i++) {
            states[i] = angular.extend({ index: i }, defaultOptions, states[i]);
        }
        return states;
    };

    // Get objects used in template
    $scope.range = angular.isDefined($attrs.ratingStates) ? this.createRateObjects(angular.copy($scope.$parent.$eval($attrs.ratingStates))) : this.createRateObjects(new Array(this.maxRange));

    $scope.rate = function (value) {
        if ($scope.value !== value && !$scope.readonly) {
            $scope.value = value;
            $scope.onRate({ value: value });
        }
    };

    $scope.enter = function (value) {
        if (!$scope.readonly) {
            $scope.val = value;
        }
        $scope.onHover({ value: value });
    };

    $scope.reset = function () {
        $scope.val = angular.copy($scope.value);
        $scope.onLeave();
    };

    $scope.$watch('value', function (value) {
        $scope.val = value;
    });

    $scope.readonly = false;
    if ($attrs.readonly) {
        $scope.$parent.$watch($parse($attrs.readonly), function (value) {
            $scope.readonly = !!value;
        });
    }

    $scope.getState = function (r, index, value) {

        var integerPart = Math.floor(value);
        var decimalPart = value % 1;
        //var selectState = $scope.readonly ? '' : (' ' + r.selectState);
        var selectState = (' ' + r.selectState);

        if (index < integerPart) {
            return (r.stateOn || 'glyphicon glyphicon-star marked') + selectState;

        } else if (index == integerPart) {


            if (decimalPart <= 0.25) {
                return (r.stateOff || 'glyphicon glyphicon-star-empty') + selectState;
            } else if (decimalPart >= 0.26 && decimalPart <= 0.75) {
                return (r.stateHalf || 'glyphicon glyphicon-star marked') + selectState;

            } else if (decimalPart >= 0.76) {
                return (r.stateOn || 'glyphicon glyphicon-star marked') + selectState;
            }

        } else {
            return (r.stateOff || 'glyphicon glyphicon-star-empty') + selectState;
        }
    };
}])

.directive('nvrRating', function () {
    return {
        restrict: 'EA',
        scope: {
            value: '=',
            onHover: '&',
            onLeave: '&',
            onRate: '&'
        },
        controller: 'RatingController',
        templateUrl: 'template/rating/nvr-rating.html',
        replace: true
    };
});

angular.module('ui.navaar.widgets').run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/rating/nvr-rating.html',
        '<div class="rating" data-ng-mouseleave="reset()">' +
            '<i data-ng-repeat="r in range" data-ng-mouseenter="enter($index + 1)" data-ng-click="rate($index + 1)" data-ng-class="getState(r, $index, val)"></i>' +
        '</div>');
}]);

angular.module('ui.navaar.widgets')
.directive('nvrScrollTo', function () {
    return {
        restrict: 'EA',
        link: function ($scope, $element, $attr) {
            var idToScroll = $attr.href;
            $element.on('click', function () {
                var target;
                if (idToScroll) {
                    target = angular.element('#' + idToScroll);
                } else {
                    target = $element;
                }
                $("body").animate({ scrollTop: target.offset().top }, "slow");
            });
        }
    };
});

angular.module('ui.navaar.widgets')
.directive('nvrSideNav', function () {
    return {
        restrict: 'EA',
        link: function ($scope, $element, $attr) {

            //SMARTY
            //function _sideNav() {

            //	/* Mobile Button */
            //	jQuery("div.side-nav").each(function() {
            //		var _t = jQuery('ul', this);
            //		jQuery('button', this).bind("click", function() {
            //			_t.slideToggle(300);
            //		});
            //	});


            //	/* Submenus */
            //	jQuery("div.side-nav>ul>li>a.dropdown-toggle").bind("click", function(e) {
            //		e.preventDefault();

            //		jQuery(this).next('ul').slideToggle(200);
            //		jQuery(this).closest('li').toggleClass('active');
            //	});

            //}

            //Arash
            /* Mobile Button */
            $element.each(function () {
                var _t = jQuery('ul', this);
                jQuery('button', this).bind('click', function () {
                    _t.slideToggle(300);
                });
            });


            /* Submenus */
            $element.find('ul>li>a.dropdown-toggle').bind('click', function (e) {
                e.preventDefault();

                jQuery(this).next('ul').slideToggle(200);
                jQuery(this).closest('li').toggleClass('active');
            });
        }
    };
});

angular.module('ui.navaar.widgets')
.controller('SiteSearchController', ['$location', function ($location) {
    var vm = this;
    vm.submit = submit;
    vm.value = '';

    function submit() {
        if (!vm.value || vm.value.length < 1) return;
        $location.url('/search/' + vm.value);
    }
}])
.directive('nvrSiteSearch', ['$rootScope', function ($rootScope) {
    return {
        restrict: 'EA',
        scope: {
        },
        controller: 'SiteSearchController',
        controllerAs: 'vm',
        bindToController: true,
        templateUrl: 'template/search/nvr-search.html',
        replace: true,
        link: function ($scope, $element, $attr) {
            $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
                $element.parent().hide();
                $element[0].reset();
            });
        }
    };
}]);

angular.module("ui.navaar.widgets").run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/search/nvr-search.html",
        '<form data-ng-submit="vm.submit()">' +
            '<input type="text" class="form-control" placeholder="جستجو نام کتاب، نویسنده یا راوی" data-ng-model="vm.value" />' +
        '</form>');
}]);
angular.module('ui.navaar.widgets')
.directive('nvrSliderFull', ['$timeout', function ($timeout) {
    return {
        restrict: 'EA',
        scope: {
            imageUrl: '@'
        },
        priority: 1000,
        link: function ($scope, $element, $attr) {

            //SMARTY
            //function _slider_full() {
            //    _headerHeight = 0;

            //    if (jQuery("#header").hasClass('transparent') || jQuery("#header").hasClass('translucent')) {
            //        _headerHeight = 0;
            //    } else {
            //        _headerHeight = jQuery("#header").outerHeight();

            //        if (jQuery("#topBar").length > 0) {
            //            _headerHeight = _headerHeight + jQuery("#topBar").outerHeight();
            //        }
            //    }

            //    _screenHeight = jQuery(window).height() - _headerHeight;

            //    jQuery("#slider.fullheight").height(_screenHeight);
            //}


            //Arash
            //var _headerHeight = 0;

            //if (jQuery("#header").hasClass('transparent') || jQuery("#header").hasClass('translucent')) {
            //    _headerHeight = 0;
            //} else {
            //    _headerHeight = jQuery("#header").outerHeight();

            //    if (jQuery("#topBar").length > 0) {
            //        _headerHeight = _headerHeight + jQuery("#topBar").outerHeight();
            //    }
            //}

            //var _screenHeight = jQuery(window).height() - _headerHeight;

            //$element.height(_screenHeight);

            $timeout(function () {
                var imageUrl = $scope.imageUrl;
                if (!imageUrl) {
                    _setHeight();
                } else {
                    var bgImg = new Image();
                    bgImg.onload = function () {
                        $element.css('background-image', 'url(' + bgImg.src + ')');
                        _setHeight();
                    };
                    bgImg.src = imageUrl;
                }

                function _setHeight() {
                    var _headerHeight = 0;

                    if (jQuery("#header").hasClass('transparent') || jQuery("#header").hasClass('translucent')) {
                        _headerHeight = 0;
                    } else {
                        _headerHeight = jQuery("#header").outerHeight();

                        if (jQuery("#topBar").length > 0) {
                            _headerHeight = _headerHeight + jQuery("#topBar").outerHeight();
                        }
                    }

                    var _screenHeight = jQuery(window).height() - _headerHeight;

                    $element.height(_screenHeight);
                }
            });

            //$timeout(function () {
            //    var _headerHeight = 0;

            //    if (jQuery("#header").hasClass('transparent') || jQuery("#header").hasClass('translucent')) {
            //        _headerHeight = 0;
            //    } else {
            //        _headerHeight = jQuery("#header").outerHeight();

            //        if (jQuery("#topBar").length > 0) {
            //            _headerHeight = _headerHeight + jQuery("#topBar").outerHeight();
            //        }
            //    }

            //    var _screenHeight = jQuery(window).height() - _headerHeight;

            //    $element.height(_screenHeight);
            //});
        }
    };
}]);

angular.module('ui.navaar.widgets')
.directive('nvrStickyHeader', ['$timeout', function ($timeout) {
    return {
        restrict: 'EA',
        scope: {
            imageUrl: '@'
        },
        priority: 1000,
        link: function ($scope, $element, $attr) {

            //Smarty
            //// STICKY
            //if (_header_el.hasClass('sticky')) {

            //    jQuery(window).scroll(function () {
            //        if (window.width > 768) {

            //            var _scrollTop = jQuery(document).scrollTop();
            //            _topBar_H = jQuery("#topBar").outerHeight() || 0;

            //            if (_scrollTop > _topBar_H) {
            //                _header_el.addClass('fixed');

            //                _header_H = _header_el.outerHeight() || 0;

            //                if (!_header_el.hasClass('transparent') && !_header_el.hasClass('translucent')) {
            //                    jQuery('body').css({ "padding-top": _header_H + "px" });
            //                }

            //            } else {
            //                if (!_header_el.hasClass('transparent') && !_header_el.hasClass('translucent')) {
            //                    jQuery('body').css({ "padding-top": "0px" });
            //                }

            //                _header_el.removeClass('fixed');
            //            }

            //        }
            //    });

            //} else

            //    if (_header_el.hasClass('static')) {
            //        // _header_H = _header_el.outerHeight() + "px";
            //        // jQuery('body').css({"padding-top":_header_H});
            //    }

            jQuery(window).scroll(function () {
                if (window.width > 768) {

                    //always set padding to zero due to the bug in back button.
                    jQuery('body').css({ "padding-top": "0px" });

                    var _header_el = $element;

                    var _scrollTop = jQuery(document).scrollTop();
                    _topBar_H = jQuery("#topBar").outerHeight() || 0;

                    if (_scrollTop > _topBar_H) {
                        _header_el.addClass('fixed');

                        _header_H = _header_el.outerHeight() || 0;

                        if (!_header_el.hasClass('transparent') && !_header_el.hasClass('translucent')) {
                            jQuery('body').css({ "padding-top": _header_H + "px" });
                        }

                    } else {
                        if (!_header_el.hasClass('transparent') && !_header_el.hasClass('translucent')) {
                            jQuery('body').css({ "padding-top": "0px" });
                        }

                        _header_el.removeClass('fixed');
                    }

                }
            });
        }
    };
}]);

angular.module("ui.navaar.widgets").run(["$templateCache", function ($templateCache) {
    $templateCache.put("uib/template/tabs/nvr-tabset.html",
      "<div>\n" +
      "  <ul class=\"nav nav-{{tabset.type || 'tabs'}} {{tabsNavClass}} \" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
      "  <div class=\"tab-content {{tabsContentClass}} \">\n" +
      "    <div class=\"tab-pane {{tabsPaneClass}} \"\n" +
      "         ng-repeat=\"tab in tabset.tabs\"\n" +
      "         ng-class=\"{active: tabset.active === tab.index, in: tabset.active === tab.index}\"\n" +
      "         uib-tab-content-transclude=\"tab\">\n" +
      "    </div>\n" +
      "  </div>\n" +
      "</div>\n" +
      "");
}]);

angular.module('ui.bootstrap.tabs')
.config(['$provide', function ($provide) {

    //http://stackoverflow.com/questions/30822022/angularjs-adding-custom-class-on-ui-bootstraps-tab

    // This adds the decorator to the tabset directive 
    // @see https://github.com/angular-ui/bootstrap/blob/master/src/tabs/tabs.js#L88 
    $provide.decorator('uibTabsetDirective', ['$delegate', function ($delegate) {

        // The `$delegate` contains the configuration of the tabset directive as 
        // it is defined in the ui bootstrap module.
        var directive = $delegate[0];

        // This is the original link method from the directive definition
        var link = directive.link;

        //Arash
        //Override the original templateUrl function to change the template
        directive.templateUrl = function(element, attrs) {
            return attrs.templateUrl || 'uib/template/tabs/nvr-tabset.html';
        },


        // This sets a compile method to the directive configuration which will provide
        // the modified/extended link method
        directive.compile = function () {

            // Modified link method
            return function (scope, element, attrs) {

                // Call the original `link` method
                link(scope, element, attrs);

                // Get the value for the `custom-class` attribute and assign it to the scope.
                // This is the same the original link method does for the `vertical` and ``justified` attributes
                scope.tabsNavClass = attrs.tabsNavClass;
                scope.tabsContentClass = attrs.tabsContentClass;
                scope.tabsPaneClass = attrs.tabsPaneClass;
            }
        }

        // Return the modified directive
        return $delegate;
    }]);
}]);
angular.module('ui.navaar.widgets')
.directive('nvrToggle', function () {
    return {
        restrict: 'EA',
        link: function ($scope, $element, $attr) {

            //SMARTY
            //var $_t = this,
			//previewParClosedHeight = 25;

            //jQuery("div.toggle.active > p").addClass("preview-active");
            //jQuery("div.toggle.active > div.toggle-content").slideDown(400);
            //jQuery("div.toggle > label").click(function (e) {

            //    var parentSection = jQuery(this).parent(),
            //        parentWrapper = jQuery(this).parents("div.toggle"),
            //        previewPar = false,
            //        isAccordion = parentWrapper.hasClass("toggle-accordion");

            //    if (isAccordion && typeof (e.originalEvent) != "undefined") {
            //        parentWrapper.find("div.toggle.active > label").trigger("click");
            //    }

            //    parentSection.toggleClass("active");

            //    if (parentSection.find("> p").get(0)) {

            //        previewPar = parentSection.find("> p");
            //        var previewParCurrentHeight = previewPar.css("height");
            //        var previewParAnimateHeight = previewPar.css("height");
            //        previewPar.css("height", "auto");
            //        previewPar.css("height", previewParCurrentHeight);

            //    }

            //    var toggleContent = parentSection.find("> div.toggle-content");

            //    if (parentSection.hasClass("active")) {

            //        jQuery(previewPar).animate({ height: previewParAnimateHeight }, 350, function () { jQuery(this).addClass("preview-active"); });
            //        toggleContent.slideDown(350);

            //    } else {

            //        jQuery(previewPar).animate({ height: previewParClosedHeight }, 350, function () { jQuery(this).removeClass("preview-active"); });
            //        toggleContent.slideUp(350);

            //    }

            //});


            //Arash
            var previewParClosedHeight = 25;

            if ($element.hasClass('active')) {
                $element.find('p').addClass("preview-active");
                $element.find('div.toggle-content').slideDown(400);
            }
           
            $element.find('label').click(function (e) {

                var parentSection = jQuery(this).parent(),
                    parentWrapper = jQuery(this).parents("div.toggle"),
                    previewPar = false,
                    isAccordion = parentWrapper.hasClass("toggle-accordion");

                if (isAccordion && typeof (e.originalEvent) != "undefined") {
                    parentWrapper.find("div.toggle.active > label").trigger("click");
                }

                parentSection.toggleClass("active");

                if (parentSection.find("> p").get(0)) {

                    previewPar = parentSection.find("> p");
                    var previewParCurrentHeight = previewPar.css("height");
                    var previewParAnimateHeight = previewPar.css("height");
                    previewPar.css("height", "auto");
                    previewPar.css("height", previewParCurrentHeight);

                }

                var toggleContent = parentSection.find("> div.toggle-content");

                if (parentSection.hasClass("active")) {

                    jQuery(previewPar).animate({ height: previewParAnimateHeight }, 350, function () { jQuery(this).addClass("preview-active"); });
                    toggleContent.slideDown(350);

                } else {

                    jQuery(previewPar).animate({ height: previewParClosedHeight }, 350, function () { jQuery(this).removeClass("preview-active"); });
                    toggleContent.slideUp(350);

                }

            });
           
        }
    };
});

angular.module('app').controller('AppCheckoutController',
['CartService', 'logger', '$rootScope', '$location', function (cartService, logger, $rootScope, $location) {
    logger = logger.forSource('AppCheckoutController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.processOrder = processOrder;
    vm.errors = [];
    vm.redirectingToGateway = false;
    vm.isBusy = false;

    initialize();

    /*** implementation ***/

    function initialize() {
        processOrder();
    }

    function processOrder() {
        vm.errors = [];
        vm.isBusy = true;
        cartService.processOrder().$promise
       .then(function (result) {
           vm.redirectingToGateway = true;
           vm.isBusy = false;
           var form = angular.element(result.formTag);
           angular.element('#payment').append(form);
           form.submit();
       })
       .catch(function (error) {
           var message = AppErrors.getMessage(error);
           vm.errors.push(message);
           vm.redirectingToGateway = false;
           vm.isBusy = false; 
       });
    }
}]);
angular.module('app').controller('ApplicationsController',
['$location', function ($location) {
    var vm = this;
    vm.successfullOrder = false;

    initialize();

    /*** implementation ***/

    function initialize() {
        vm.successfullOrder = $location.search().order;
    }
}]);
var controllerId = 'AsideController';
angular.module('app').controller(controllerId,
['CatalogService', 'logger', '$location', '$scope', function (catalogService, logger, $location, $scope) {
    logger = logger.forSource(controllerId);
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var constants = {
        genre: 'genre',
        publisher: 'publisher',
        author: 'author',
        narrator: 'narrator',
        translator: 'translator',
    };

    var vm = this;
    vm.genres = null;
    vm.publishers = null;
    vm.title = 'فهرست';
    vm.exploreOptions = [{ 'code': 1, 'title': 'نویسنده' }, { 'code': 2, 'title': 'راوی' }, { 'code': 3, 'title': 'مترجم' }, { 'code': 4, 'title': 'ناشر' }];

    vm.getSearchItems = getSearchItems;
    vm.onSelectItem = onSelectItem;
    vm.showOption = showOption;
    vm.hide = hide;
    vm.currentSearchOption = { 'code': 1, 'title': 'نویسنده' };

    initialize();

    /*** implementation ***/

    function initialize() {
        getGenres();
    }

    function getGenres() {
        return catalogService.getGenres().then(function (items) {
            vm.genres = items;
        });
    }

    function getPublishers() {
        return catalogService.getPublishers().then(function (items) {
            vm.publishers = items;
        });
    }

    function getSearchItems(val) {
        switch (vm.currentSearchOption.code) {
            case 1: //author
                return getArtists(val, constants.author);

            case 2: //narrator
                return getArtists(val, constants.narrator);

            case 3: //translator
                return getArtists(val, constants.translator);

            case 4: //publisher
                var items = [];
                return catalogService.getPublishers(val).then(function (data) {
                    angular.forEach(data, function (item) {
                        items.push({ 'id': item.publisherId, 'title': item.name, 'slug': item.slug });
                    });
                    return items;
                });
        }
    }

    function getArtists(val, type) {
        var items = [];
        return catalogService.getArtists(val, type).then(function (data) {
            angular.forEach(data, function (item) {
                items.push({ 'id': item.artistId, 'title': item.firstName + ' ' + item.lastName, 'slug': item.slug });
            });
            return items;
        });
    }

    function onSelectItem($item) {
        var path = '/catalog';
        switch (vm.currentSearchOption.code) {
            case 1 :   //author
                path += '/' + constants.author;
                break;
            case 2:   //narrator
                path += '/' + constants.narrator;
                break;
            case 3:   //translator
                path += '/' + constants.translator;
                break;
            case 4:   //publisher
                path += '/' + constants.publisher;
                break;
            default:
                return;
        }

        $location.path(path + '/' + $item.id + ($item.slug ? "/" + $item.slug : ''));
        vm.hide();
    }

    function hide() {
    }

    function showOption(code, title) {
        vm.currentSearchOption = { 'code': code, 'title': title };
    }
}]);
angular.module('app').controller('AudioBookController',
['CatalogService', 'UserLibraryService', 'AudioBookService', 'CartService', 'logger', '$routeParams', '$scope', '$uibModal', '$rootScope', '$location', 'AnalyticsService', 'ANALYTICS', '$anchorScroll', '$filter', function (catalogService, userLibraryService, audioBookService, cartService, logger, $routeParams, $scope, $modal, $rootScope, $location, analyticsService, ANALYTICS, $anchorScroll, $filter) {
    logger = logger.forSource('AudioBookController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.audiobook = null;
    vm.product = null;
    vm.mp3File = null;
    vm.oggFile = null;
    vm.pausePreview = true;
    vm.rcmndItems = [];

    vm.purchaseStatus = {
        visible: false,
        purchaseState: {
            visible: false,
            enabled: false,
            buttonText: 'دانلود کتاب صوتی',
            gaLabel: '',
        },
        subscriptionState: {
            visible: false,
            enabled: false,
            subscriptionMinPrice: Infinity,
            buttonText: 'دریافت با اشتراک',
            gaLabel: '',
            finishedQuota: false,
            extraDiscount: 0,
        },
        isPurchased: false,
        isLoaded: false,
    };

    vm.saveRating = saveRating;
    vm.getCurrentUrl = getCurrentUrl;
    vm.getStatusTitle = getStatusTitle;
    vm.purchase = purchase;

    initialize();

    /*** implementation ***/

    function initialize() {
        var audioBookId = $routeParams.audioBookId;
        if (audioBookId) {
            getAudioBookDetail(audioBookId);
            getSuggestions(audioBookId);
        }
    }

    function setPageMetaData() {
        var title = $rootScope.Page.getTitle();
        var description = $rootScope.Page.getDescription();
        var keywords = vm.audiobook.title;

        if (vm.audiobook.title) {
            title = vm.audiobook.title;
            description = $rootScope.Page.getTitle() + ' ' + vm.audiobook.title + ' . ' + description;
        }

        $rootScope.Page.setTitle(title);
        $rootScope.Page.setDescription(description.trim());
        $rootScope.Page.setKeywords(keywords);

        //var host = (cdnPrefix && cdnPrefix.length > 0) ? cdnPrefix
        //    : ($location.protocol() + '://' + $location.host() + ($location.port() == 80 ? '' : (':' + $location.port())));

        var host = "http://www.navaar.ir";

        $rootScope.Page.setImage(host + '/content/books/' + vm.audiobook.audioBookId + '/pic.jpg?t=' + vm.audiobook.recordVersion);
        //$rootScope.Page.setAudio(host + '/content/books/' + vm.audiobook.audioBookId + '/sample.mp3?t=' + vm.audiobook.recordVersion);
    }

    function getAudioBookDetail(id) {
        catalogService.getAudioBookDetail({
            id: id,
        })
        .$promise
        .then(function (result) {
            vm.audiobook = result;

            if (vm.audiobook && vm.audiobook.products && vm.audiobook.products.length > 0) {
                vm.product = vm.audiobook.products[0];
            }

            setPageMetaData();
            if ($scope.isAuthenticated) {
                updatePurchaseState();
            }
        })
        .catch(function (error) {
            if (error.status && error.status == 404) {
                $location.path('/404');
                return;
            }
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }

    function saveRating(value) {

        analyticsService.trackEvent(ANALYTICS.category.UI, ANALYTICS.uiAction.CLICK, 'rating-' + vm.audiobook.identifier + '-' + vm.audiobook.title, vm.audiobook.rating.average);

        audioBookService.rate({
            audioBookId: vm.audiobook.audioBookId,
            ratingValue: value,
        })
        .$promise
        .then(function (result) {
            if (result && result.count) {
                vm.audiobook.rating.average = result.average;
                vm.audiobook.rating.count = result.count;

                logSuccess('نظر شما با موفقیت ثبت شد.', result, true);
            }
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }

    function togglePlayer(audiobook) {
        if (!vm.mp3File) {
            vm.mp3File = cdnPrefix + '/content/books/' + audiobook.audioBookId + '/sample.mp3?t=' + audiobook.recordVersion;
            vm.oggFile = cdnPrefix + '/content/books/' + audiobook.audioBookId + '/sample.ogg?t=' + audiobook.recordVersion;
        }
        vm.pausePreview = !vm.pausePreview;
    }

    function getStatusTitle(status) {
        switch (status) {
            case 1:
                return ' (بزودی)';
            case 2:
                return ' (غیر قابل فروش)';
            default:
                return '';
        }
    }

    function getSuggestions(id) {
        catalogService.getCatalog({
            action: 'recommend',
            key: id,
            $top: 6,
        })
        .$promise
        .then(function (result) {
            vm.rcmndItems = result.items;
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }

    function showLogin(data) {
        if (!$rootScope.isAuthenticated) {
            $rootScope.login(data);
            return true;
        }

        return false;
    }

    function addToCart(id, transitionType) {
        if (!transitionType) {
            transitionType = 0; //the default is purchase.
        }
        cartService.save({}, {
            productId: id,
            libraryTransitionType: transitionType,
        })
        .$promise
        .then(function (result) {
            cartService.getCartTotalCount(function (result) {
                $rootScope.cartItemsCount = result.count;
            });
            $location.url('/checkout');
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }

    function getCurrentUrl() {
        return $location.absUrl();
        //return $location.absUrl().replace('http://localhost:52762', 'http://www.navaar.ir');
    }

    function updatePurchaseState() {
        vm.purchaseStatus.isLoaded = false;

        cartService.getPurchaseStatus().$promise
        .then(function (result) {
            if (vm.audiobook && vm.product) {
                vm.audiobook.purchaseInfo = result;

                //set is isPurchased
                vm.audiobook.products.forEach(function (product) {
                    if (result.libraryInfo[product.productId]) { //the product exists in user library
                        vm.purchaseStatus.isPurchased = true; //purchased
                    }
                });

                var purchaseButtonText = '', subscriptionButtonText = ''
                var purchaseButtonGALabel = '', subscriptionButtonGALabel = '';
                var purchaseStateVisible = false, subscriptionStateVisible = false;
                var purchaseButtonEnabled = false, subscriptionButtonEnabled = false;

                if (vm.purchaseStatus.isPurchased) { //8
                    //the item is already purchased
                    purchaseButtonText = 'مراجعه به کتابخانه';
                    purchaseButtonGALabel = 'purchase-library';
                    purchaseStateVisible = true;
                    purchaseButtonEnabled = true;
                } else if (vm.product.price == 0) { //2
                    //free books
                    purchaseButtonText = 'دانلود رایگان';
                    purchaseButtonGALabel = 'purchase-free';
                    purchaseStateVisible = true;
                    purchaseButtonEnabled = true;
                } else if (vm.audiobook.purchaseInfo.subscriptionInfo) {
                    //subscription option is offered
                    var subscriptionInfo = vm.audiobook.purchaseInfo.subscriptionInfo;

                    //set subscription min price
                    var minPrice = vm.purchaseStatus.subscriptionState.subscriptionMinPrice;
                    subscriptionInfo.subscriptionProducts.forEach(function (product) {
                        if (product.isActive) {
                            var itemPrice = product.price / product.planQuota;
                            if (itemPrice < minPrice) {
                                minPrice = itemPrice;
                            }
                        }
                    });
                    vm.purchaseStatus.subscriptionState.subscriptionMinPrice = minPrice;

                    //set visibility options
                    purchaseStateVisible = true;
                    subscriptionStateVisible = true;


                    //if the user has active subscription
                    if (subscriptionInfo.subscriptionMembershipInfo.hasActiveSubscription) {

                        if (subscriptionInfo.subscriptionMembershipInfo.hasSubscriptionQuota) {   //6
                            purchaseButtonText = 'خرید با قیمت ' + $filter('number')(vm.product.price / 10) + ' تومان';
                            purchaseButtonGALabel = '';
                            purchaseButtonEnabled = false;

                            subscriptionButtonText = 'دریافت رایگان با اشتراک';
                            subscriptionButtonGALabel = 'subscription-quota';
                            subscriptionButtonEnabled = true;
                        } else {    //7
                            //if the user has no available quota
                            purchaseButtonText = 'خرید با قیمت ' + $filter('number')(vm.product.price / 10.0 * (1 - subscriptionInfo.subscriptionMembershipInfo.subscriptionExtraDiscount)) + ' تومان';
                            purchaseButtonGALabel = 'purchase-subscription-discount';
                            purchaseButtonEnabled = true;

                            subscriptionButtonText = 'دریافت رایگان با اشتراک';
                            subscriptionButtonGALabel = '';
                            subscriptionButtonEnabled = false;

                            vm.purchaseStatus.subscriptionState.finishedQuota = true;
                            vm.purchaseStatus.subscriptionState.extraDiscount = subscriptionInfo.subscriptionMembershipInfo.subscriptionExtraDiscount * 100;
                        }   
                    } else {    //4,5
                        //if the user has no active subscription

                        purchaseButtonText = 'خرید با قیمت ' + $filter('number')(vm.product.price / 10) + ' تومان';
                        purchaseButtonGALabel = 'purchase-with-subscription';
                        purchaseButtonEnabled = true;

                        subscriptionButtonText = vm.product.price > vm.purchaseStatus.subscriptionState.subscriptionMinPrice ? 'از طریق طرح اشتراک: ' + $filter('number')(vm.purchaseStatus.subscriptionState.subscriptionMinPrice / 10) + ' تومان' : 'دریافت با تخفیف اشتراک';
                        subscriptionButtonGALabel = 'subscription-with-purchase';
                        subscriptionButtonEnabled = true;

                        analyticsService.trackEvent(ANALYTICS.category.UI, ANALYTICS.uiAction.SHOWN, 'subscription-shown');
                    }
                } else {    //3
                    //just show the purchase option
                    purchaseButtonText = 'خرید با قیمت ' + $filter('number')(vm.product.price / 10) + ' تومان';
                    purchaseButtonGALabel = 'purchase-just-purchase';
                    purchaseButtonEnabled = true;
                    purchaseStateVisible = true;
                }


                //set states
                vm.purchaseStatus.purchaseState.buttonText = purchaseButtonText;
                vm.purchaseStatus.subscriptionState.buttonText = subscriptionButtonText;

                vm.purchaseStatus.purchaseState.gaLabel = purchaseButtonGALabel;
                vm.purchaseStatus.subscriptionState.gaLabel = subscriptionButtonGALabel;

                vm.purchaseStatus.purchaseState.enabled = purchaseButtonEnabled;
                vm.purchaseStatus.subscriptionState.enabled = subscriptionButtonEnabled;

                vm.purchaseStatus.purchaseState.visible = purchaseStateVisible;
                vm.purchaseStatus.subscriptionState.visible = subscriptionStateVisible;
            }

            vm.purchaseStatus.isLoaded = true;



            //set purchase status visibility
            vm.purchaseStatus.visible = $rootScope.isAuthenticated && vm.audiobook.status == 0 && vm.purchaseStatus.isLoaded && vm.product;
        })
    .catch(function (error) {
        var message = AppErrors.getMessage(error);
        logError(message, error, true);

        vm.purchaseStatus.isLoaded = true;
    });
    }

    function purchase(mode) {
        //0: purchase
        //1: subscription
        mode = mode || 0;

        var product = vm.product;

        //show login if not authenticated.
        if (showLogin({ productId: product.productId, transitionType: 0 })) return;

        if (mode == 0) {    //purchase
            //go to library page if already purchased.
            if ($rootScope.isAuthenticated && vm.purchaseStatus.isPurchased) {
                $location.url('/user?library');
                return;
            }
        }
        else if (mode == 1) {   //subscription
            if (vm.audiobook.purchaseInfo.subscriptionInfo && !vm.audiobook.purchaseInfo.subscriptionInfo.subscriptionMembershipInfo.hasActiveSubscription) {
                $location.url('/subscription?r=/audiobook/' + vm.audiobook.identifier + '/' + vm.audiobook.slug);
                return;
            }
        }

        addToCart(product.productId);
    }

    $scope.$on('loggedOn', function (e) {
        updatePurchaseState();
    });
}]);
angular.module('app').controller('AuthRedirectController',
['UserManager', '$location', 'base64', '$http', function (userManager, $location, base64, $http) {
    var vm = this;

    initialize();

    /*** implementation ***/

    function initialize() {
        var encodedTicket = $location.search().ticket;
        var returnUrl = $location.search().url;
        var clientId = $location.search().clientId || 3;

        if (!encodedTicket || !returnUrl) {
            vm.errors = AppErrors.getErrors(null, 'کد مربوطه معتبر نیست.');
            return;
        }

        var decodedTicket = base64.urldecode(encodedTicket);
        var ticket = JSON.parse(decodedTicket);

        //store ticket info
        userManager.login(ticket, true);

        //clear query strings
        $location.search('ticket', null);
        $location.search('url', null);
        $location.search('clientId', null);

        if (clientId) {
            $http.defaults.headers.common['client-id'] = clientId;
        }

        //go to the requested url
        $location.path(returnUrl);
    }
}]);
angular.module('app').controller('BookTrialChangeController',
['UserLibraryService', 'logger', '$uibModalInstance', 'data', '$rootScope', '$location', 'MARKET_ID', 'CartService', function (libraryService, logger, $modalInstance, data, $rootScope, $location, marketId, cartService) {
    logger = logger.forSource('BookTrialChangeController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.data = data;
    vm.ok = ok;
    vm.cancel = cancel;
    vm.isBusy = false;

    /*** implementation ***/

    function ok() {
        vm.isBusy = true;

        changeAudiobook();
    }

    function cancel() {
        $modalInstance.dismiss('cancel');
    }

    function changeAudiobook() {
        libraryService.returnTrial({
            productId: vm.data.currentTrial.productId,
        })
        .$promise
        .then(function (result) {
            addToCart();
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
            vm.isBusy = false;
        });
    }

    function addToCart() {
        cartService.save({}, {
            productId: vm.data.productId,
            libraryTransitionType:  1, //for loan.
        })
        .$promise
        .then(function (result) {
            cartService.getCartTotalCount(function (result) {
                $rootScope.cartItemsCount = result.count;
            });
            vm.isBusy = false;
            $modalInstance.close();
            $location.url('/checkout');
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
            vm.isBusy = false;
        });
    }
}]);
angular.module('app').controller('BookTrialPurchaseController',
['CartService', 'logger', '$uibModalInstance', 'data', '$location', '$rootScope', function (cartService, logger, $modalInstance, data, $location, $rootScope) {
    logger = logger.forSource('BookTrialPurchaseController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.data = data;
    vm.ok = ok;
    vm.cancel = cancel;
    vm.isBusy = false;

    /*** implementation ***/

    function ok() {
        vm.isBusy = true;

        addToCart();
    }

    function cancel() {
        $modalInstance.dismiss('cancel');
    }

    function addToCart() {
        cartService.save({}, {
            productId: vm.data.productId,
            libraryTransitionType:  0, //the default is purchase.
        })
        .$promise
        .then(function (result) {
            cartService.getCartTotalCount(function (result) {
                $rootScope.cartItemsCount = result.count;
            });
            vm.isBusy = false;
            $modalInstance.close();
            $location.url('/checkout');
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
            vm.isBusy = false;
        });
    }
}]);
angular.module('app').controller('BookTrialReturnConfirmController',
['UserLibraryService', 'logger', '$uibModalInstance', 'data', '$rootScope', '$location', 'MARKET_ID', 'CartService', function (libraryService, logger, $modalInstance, data, $rootScope, $location, marketId, cartService) {
    logger = logger.forSource('BookTrialReturnConfirmController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.data = data;
    vm.ok = ok;
    vm.cancel = cancel;

    /*** implementation ***/

    function ok() {
        $modalInstance.close();
        $location.url('/catalog/trial');
    }

    function cancel() {
        $modalInstance.dismiss('cancel');
    }
}]);
angular.module('app').controller('BookTrialReturnController',
['UserLibraryService', 'logger', '$uibModalInstance', 'data', '$rootScope', '$location', 'MARKET_ID', '$uibModal', function (libraryService, logger, $modalInstance, data, $rootScope, $location, marketId, $modal) {
    logger = logger.forSource('BookTrialReturnController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.data = data;
    vm.ok = ok;
    vm.cancel = cancel;
    vm.isBusy = false;

    /*** implementation ***/

    function ok() {
        vm.isBusy = true;

        returnAudiobook();
    }

    function cancel() {
        $modalInstance.dismiss('cancel');
    }

    function returnAudiobook() {
        libraryService.returnTrial({
                productId: data.productId,
        })
        .$promise
        .then(function (result) {
            vm.isBusy = false;
            $modalInstance.close();
            
            // broadcast an event
            $rootScope.$broadcast('libraryTransition');


            var dlg = $modal.open({
                templateUrl: '/app/templates/book_trial_return_confirm.html',
                controller: 'BookTrialReturnConfirmController as vm',
                controllerAs: 'vm',
                resolve: {
                    data: function () {
                        return {
                            audioBook: vm.data.audioBook,
                        };
                    }
                }
            });
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
            vm.isBusy = false;
        });
    }
}]);
angular.module('app').controller('CartRemoveController',
['CartService', 'logger', '$uibModalInstance', 'data', function (cartService, logger, $modalInstance, data) {
    logger = logger.forSource('CartRemoveController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.item = data;
    vm.ok = ok;
    vm.cancel = cancel;

    /*** implementation ***/

    function ok() {
        cartService.delete({
            id: vm.item.shoppingCartItemId,
        })
        .$promise
        .then(function (result) {
            $modalInstance.close();
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }

    function cancel() {
        $modalInstance.dismiss('cancel');
    }
}]);
angular.module('app').controller('CatalogController',
['CatalogService', '$routeParams', 'logger', '$rootScope', 'CartService', '$location', '$scope', function (catalogService, $routeParams, logger, $rootScope, cartService, $location, $scope) {
    logger = logger.forSource('CatalogController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;
    var logWarning = logger.logWarning;

    var vm = this;
    vm.busy = false;
    vm.catalog = null;
    vm.filterCriteria = {
        pageNumber: 1,
        pageSize: 25,
        filterType: undefined,
        filterId: undefined,
    };
    vm.loadMore = loadMore;
    vm.isActiveFilter = isActiveFilter;
    vm.currentFilterInfo = { title: '' };
    vm.getTrial = getTrial;

    initialize();

    /*** implementation ***/

    function initialize() {
        setPageMetaData();

        vm.filterCriteria.filterType = $routeParams.filterType || 'all';
        vm.filterCriteria.filterId = $routeParams.filterId;

        getAudioBooks();
    }

    function setPageMetaData() {
        var title = $rootScope.Page.getTitle();
        var description = $rootScope.Page.getDescription();

        switch ($routeParams.filterType) {
            case 'genre':
            case 'author':
            case 'narrator':
            case 'translator':
            case 'publisher':
                if ($routeParams.slug) {
                    title += (' - ' + $routeParams.slug);
                    description += ' ' + $routeParams.slug + ' در ';
                }
                break;
            case 'latest':
                title += (' - جدیدترین ها');
                description += ' - جدیدترین ها در';
                break;
            case 'bestseller':
                title += (' - پرفروش ترین ها');
                description += (' - پرفروش ترین ها در');
                break;
            case 'comingsoon':
                title += (' - بزودی');
                description += (' - بزودی در');
                break;
            case 'trial':
                title += (' - قفسه امانت رایگان');
                description += (' - قفسه امانت رایگان در');
                break;
            case 'editor':
                title += (' - عناوین منتخب');
                description += (' - عناوین منتخب در');
                break;
            default:
                description += ' در ';
                break;
        }

        $rootScope.Page.setTitle(title);
        $rootScope.Page.setDescription(description);
    }

    function getAudioBooks() {
        vm.busy = true;
        var key;

        catalogService.getCatalog({
            action: vm.filterCriteria.filterType,
            key: vm.filterCriteria.filterId,
            $skip: (vm.filterCriteria.pageNumber - 1) * vm.filterCriteria.pageSize,
            $top: vm.filterCriteria.pageSize,
            $inlinecount: 'allpages',
        })
        .$promise
        .then(function (result) {
            var data =
            {
                items: result.items,
                totalItems: result.count,
                totalPages: Math.ceil(result.count / vm.filterCriteria.pageSize),
                page: vm.filterCriteria.pageNumber
            };


            if (vm.catalog) {
                data.items = vm.catalog.items.concat(data.items);
            }

            vm.catalog = data;
            vm.busy = false;

        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }

    function loadMore() {
        if (vm.busy) return;

        vm.filterCriteria.pageNumber++;
        getAudioBooks();
    }

    function isActiveFilter(type, key) {
        return (vm.filterCriteria.filterType == type) && (!key || vm.filterCriteria.filterId == key);
    }

    function getCurrentFilterInfo() {
        var info = { title: '' };

        switch ($routeParams.filterType) {
            case 'genre':
                $rootScope.genres.forEach(function (genre) {
                    if (genre.identifier == $routeParams.filterId) {
                        info.title = genre.name;
                    };
                });

                break;

            case 'free':
                info.title = 'عناوین رایگان';
                break;

            case 'foreign':
                info.title = 'سایر زبان ها';
                break;

            default:
                info.title = '';
                break;
        }

        return info;
    }

    function getTrial(productId) {
        if (showLogin()) return;
        addToCart(productId, 1);
    }

    function showLogin() {
        if (!$rootScope.isAuthenticated) {
            $rootScope.login();
            return true;
        }

        return false;
    }

    function addToCart(id) {
        cartService.save({}, {
            productId: id,
            libraryTransitionType: 1, //trial
        })
        .$promise
        .then(function (result) {
            cartService.getCartTotalCount(function (result) {
                $rootScope.cartItemsCount = result.count;
            });
            $location.url('/checkout');
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }

    $scope.$on('repeat_done_genres-nav', function () {
        vm.currentFilterInfo = getCurrentFilterInfo();
    });
}]);
angular.module('app').controller('ChangeEmailController',
['UserManager', 'logger', '$uibModalInstance', function ($userManager, logger, $modalInstance) {
    logger = logger.forSource('ChangeEmailController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.ok = ok;
    vm.cancel = cancel;
    vm.isBusy = false;

    /*** implementation ***/

    function ok() {
        vm.errors = [];
        vm.isBusy = true;
        $userManager.changeEmail({ email: vm.email, emailConfirm: vm.emailConfirm, password: vm.password })
                    .$promise
                    .then(function (result) {
                        vm.isBusy = false;
                        logger.logSuccess('آدرس ایمیل شما بروز رسانی گردید. لطفا مجددا با ایمیل جدید وارد سایت شوید.', result, true);
                        $modalInstance.close();
                    })
                    .catch(function (error) {
                        vm.errors = AppErrors.getErrors(error);
                        vm.isBusy = false;
                    });
    }

    function cancel() {
        $modalInstance.dismiss('cancel');
    }
}]);

angular.module('app').controller('ChangePasswordController', ['UserManager', 'logger', function ($userManager, logger) {
    logger = logger.forSource('ChangePasswordController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.errors = [];
    vm.save = save;

    function save() {
        vm.errors = [];
        $userManager.changePassword({ oldPassword: vm.password, newPassword: vm.newPassword, confirm: vm.confirm })
                    .$promise
                    .then(function (result) {
                        if (result) {
                            logSuccess('رمز عبور شما با موفقیت تغییر یافت.', result, true);
                        }
                        else {
                            vm.errors = AppErrors.getErrors();
                        }
                    })
                    .catch(function (error) {
                        vm.errors = AppErrors.getErrors(error);
                    });
    };

}]);

var controllerId = 'ChaptersController';
angular.module('app').controller(controllerId,
['ChapterService', 'logger', function (chapterService, logger) {
    logger = logger.forSource(controllerId);
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.isCollapsed = true;
    vm.template = '';
    vm.showChapters = showChapters;
    vm.chapters = null;


    /*** implementation ***/

    function showChapters(audiobookId) {
        vm.template = '/app/templates/chapters.html?v=' + appVersion;
        vm.isCollapsed = !vm.isCollapsed;
        getChapters(audiobookId);
    }

    function getChapters(audiobookId) {
        return chapterService.getChapters(audiobookId).then(function (data) {
            vm.chapters = data;
        });
    }
}]);



angular.module('app').controller('CheckoutController',
['CartService', 'logger', '$rootScope', '$location', '$uibModal', function (cartService, logger, $rootScope, $location, $modal) {
    logger = logger.forSource('CheckoutController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.checkoutEntity = null;
    vm.processOrder = processOrder;
    vm.errors = [];
    vm.redirectingToGateway = false;
    vm.applyDiscount = applyDiscount;
    vm.removeDiscount = removeDiscount;
    vm.isBusy = false;
    vm.removeItem = removeItem;
    vm.trialCondition = null;
    vm.isValid = false;
    vm.trialBookTitle = '';
    vm.showAgreementWizard = showAgreementWizard;
    vm.showProfileInfo = showProfileInfo;
    vm.showPayment = false;
    vm.hasFirstTimePurchaseOffer = false;
    vm.voucherCode = null;
    vm.appliedVouchers = [];

    initialize();

    /*** implementation ***/

    function initialize() {
        getTrialCondition();
        getCartItems();
        //vm.errors = ['خطای شماره یک', 'خطای شماره دو طولانی طولانی طولانی بازم طولانی'];
    }

    function getCartItems() {
        vm.trialBookTitle = '';
        cartService.getCheckoutEntity()
        .$promise
        .then(function (result) {
            vm.checkoutEntity = result;
            updateTotalCount();
            CheckForAppliedDiscount();
            vm.showPayment = result.sumTotalPrice && result.sumTotalPrice != 0;
            if (result.items) {
                result.items.forEach(function (item) {
                    //trial
                    if (item.transitionType == 1) {
                        vm.trialBookTitle = item.product.audioBook.title;
                    }
                    if (item.promotionType == 1) {   //first time purchase
                        vm.hasFirstTimePurchaseOffer = true;
                    }
                })
            }
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);;
            logError(message, error, true);
        });

        getAppliedVouchers();
    }

    function CheckForAppliedDiscount() {
        //check if at least one item has a promotion applied.
        vm.isDiscountApplied = false;

        if (!vm.checkoutEntity || !vm.checkoutEntity.items) {
            return;
        }

        vm.checkoutEntity.items.forEach(function (item) {
            if (item.hasPromotion) {
                vm.isDiscountApplied = true;
                return;
            }
        });
    }

    //todo : use watch
    function updateTotalCount() {
        $rootScope.cartItemsCount = vm.checkoutEntity && vm.checkoutEntity.items ? vm.checkoutEntity.items.length : 0;
    }

    function processOrder() {
        vm.errors = [];
        vm.isBusy = true;
        var needsPayment = vm.checkoutEntity.sumTotalPrice != 0;
        var promise = needsPayment ? cartService.processOrder().$promise : cartService.processOrderWithNoPayment().$promise

        promise
       .then(function (result) {
           vm.checkoutEntity.items = [];
           vm.redirectingToGateway = true;
           updateTotalCount();

           if (needsPayment) {
               var form = angular.element(result.formTag);
               angular.element('#payment').append(form);
               form.submit();
           } else {
               if (result.result) {
                   //$location.url('/confirm-order');
                   $location.url('/applications?order');
               } else {
                   throw new Error();
               }
           }
       })
       .catch(function (error) {
           var message = AppErrors.getMessage(error);
           logError(message, error, true);
           vm.redirectingToGateway = false;
           vm.isBusy = false;
           //todo : show inside form instead of toast.
           //vm.errors = [];
       });
    }

    function applyDiscount() {
        vm.isBusy = true;
        vm.voucherErrors = [];

        cartService.applyDiscount({ serialNo: vm.voucherCode })
        .$promise
        .then(function (result) {
            if (result) {
                vm.voucherCode = null;
                getCartItems();
                logSuccess('کد تخفیف اعمال گردید.', result, true);
            }
            vm.isBusy = false;

        })
        .catch(function (error) {
            vm.voucherErrors = AppErrors.getErrors(error, "خطا در ثبت کد .");
            vm.isBusy = false;
        });
    }

    function removeDiscount(id) {
        if (!vm.isDiscountApplied) {
            return;
        }

        cartService.removeDiscount({ id: id }, {})
        .$promise
        .then(function (result) {
            if (result) {
                logSuccess('کد تخفیف حذف گردید.', result, true);
                getCartItems();
            }

        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }

    function removeItem(item) {
        var dlg = $modal.open({
            templateUrl: '/app/templates/cart_remove.html',
            controller: 'CartRemoveController as vm',
            controllerAs: 'vm',            resolve: {
                data: function () {
                    return item;
                }
            }
        });

        dlg.result.then(function (result) {
            getCartItems();
            updateTotalCount();
        });
    }

    function getTrialCondition() {
        vm.errors = [];
        cartService.getTrialCondition()
        .$promise
        .then(function (result) {
            if (result && !result.membershipStatus) {
                //there is no trial item.
                vm.isValid = true;
                return;
            } else {
                vm.trialCondition = result;
                vm.isValid
            }
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }

    function showAgreementWizard() {
        var dlg = $modal.open({
            templateUrl: '/app/templates/trial_agreement_wizard.html',
            controller: 'TrialAgreementWizardController as vm',
            controllerAs: 'vm',
            resolve: {
                data: function () {
                    return vm.trialCondition && vm.trialCondition.membershipStatus && !vm.trialCondition.membershipStatus.hasMembership ? vm.trialCondition.membershipStatus.agreement : null;
                }
            }
        });

        dlg.result.then(function (result) {
            getTrialCondition();
        });
    }

    function showProfileInfo() {
        var dlg = $modal.open({
            templateUrl: '/app/templates/profile_special_membership.html',
            controller: 'ProfileSpecialMembershipController as vm',
            controllerAs: 'vm',
            resolve: {
                data: function () {
                    return vm.trialCondition && vm.trialCondition.membershipStatus && !vm.trialCondition.membershipStatus.hasMembership ? vm.trialCondition.membershipStatus.agreement : null;
                }
            }
        });

        dlg.result.then(function (result) {
            getTrialCondition();
        });
    }

    function getAppliedVouchers() {

        cartService.getAppliedVouchers()
        .$promise
        .then(function (result) {
            vm.appliedVouchers = result;
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);;
            logError(message, error, true);
        });
    }
}]);
angular.module('app').controller('ConfirmEmailController',
['UserManager', '$location', '$scope', 'userAgentDetector', 'AnalyticsService', 'ANALYTICS', 'CartService', '$timeout', '$rootScope', function ($userManager, $location, $scope, userAgentDetector, analyticsService, ANALYTICS, cartService, $timeout, $rootScope) {
    var vm = this;
    vm.errors = [];
    vm.isAndroid = false;
    vm.showWaiting = false;
    //vm.activated = false;

    initialize();

    /*** implementation ***/

    function initialize() {
        var userId = $location.search().userId;
        var code = $location.search().code;
        var customData = $location.search().cd;
        if (customData) {
            customData = fromJSON(decodeURIComponent(customData));
        }

        if (!userId || !code) {
            vm.errors = AppErrors.getErrors(null, 'کد مربوطه معتبر نیست.');
            return;
        }

        //TODO: the custom schema does not work on android. temporarly disable it.
        //vm.isAndroid = userAgentDetector.isAndroid();

        $userManager.confirmEmail({ userId: userId, code: code })
                    .$promise
                    .then(function (result) {
                        if (!result || !(result.userName && result.access_token)) {
                            vm.errors = AppErrors.getErrors();
                        } else {
                            $userManager.login(result, true);
                            analyticsService.trackEvent(ANALYTICS.category.UX, ANALYTICS.uxAction.REGISTRATION_CONFIRMED, 'email-confirm');

                            //add to shopping cart if customdata provided.
                            if (customData && customData.productId) {
                                addToCart(customData.productId, customData.transitionType);
                            } else if (customData && customData.redirectUrl) {
                                $location.url(customData.redirectUrl);
                            }
                        }
                    })
                    .catch(function (error) {
                        vm.activated = false;
                        vm.errors = AppErrors.getErrors(error);
                    });

    }

    function addToCart(id, transitionType) {
        if (!transitionType) {
            transitionType = 0; //the default is purchase.
        }
        cartService.save({}, {
            productId: id,
            libraryTransitionType: transitionType,
        })
        .$promise
        .then(function (result) {
            cartService.getCartTotalCount(function (result) {
                $rootScope.cartItemsCount = result.count;
            });
            
            vm.showWaiting = true;

            //if the add to cart was successful, then redirect the user to checkout screen after some delay.
            $timeout(function () {
                $location.url('/checkout');
            }, 5000)
        })
        .catch(function (error) {
            //do nothing
            //keep the user watching confirmation message.
        });
    }

    //$scope.$on('loggedOn', function () {
    //    $location.url('/');
    //});
}]);
angular.module('app').controller('ConfirmPaymentController',
['OrderService', 'logger', '$location', '$routeParams', 'UserLibraryService', 'AnalyticsService', 'ANALYTICS', '$rootScope', function (orderService, logger, $location, $routeParams, userLibraryService, analyticsService, ANALYTICS, $rootScope) {
    logger = logger.forSource('ConfirmPaymentController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.orderResult = null;
    vm.showAppLink = false;

    initialize();

    /*** implementation ***/

    function initialize() {
        var orderId = $routeParams.orderId;
        var status = $routeParams.status;

        if (status != '1') {
            vm.orderResult = { status: 0 };
            analyticsService.trackEvent(ANALYTICS.category.UX, ANALYTICS.uxAction.PURCHASED, 'error');
            return;
        }

        //if (orderId) {
        //    //getOrderInfo(orderId);
        //    vm.orderResult = { status: 1 };
        //    analyticsService.trackEvent(ANALYTICS.categoty.UX, ANALYTICS.uxAction.PURCHASED, 'success');
        //    $location.url('/applications?order');
        //}

        if (orderId) {
            $rootScope.getUserActivityInfo();
            getOrderInfo(orderId); 
        }
    }

    function getOrderInfo(orderId) {
        orderService.getOrderConfirmInfo({ id: orderId })
        .$promise
        .then(function (result) {
            vm.orderResult = result;
            vm.orderResult.status = 1;

            analyticsService.trackEvent(ANALYTICS.category.UX, ANALYTICS.uxAction.PURCHASED, 'success', vm.orderResult.totalOrderQty);
            if (result.subscriptionPlanIdentifier) {
                analyticsService.trackEvent(ANALYTICS.category.UX, ANALYTICS.uxAction.GOT_SUBSCRIPTION, 'success', result.subscriptionPlanIdentifier);
            }
            if (result.clientId == 2 || result.clientId == 5) {
                //cafe bazaar or google play
                //var anchor = $('#redirect-hyperlink');
                //if (anchor) {
                //    anchor.click();
                //    return;
                //}
                vm.showAppLink = true;
                return;
            }

            $location.url('/applications?order');
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }
}]);
angular.module('app').controller('ContactController',
['ContactService', 'logger', 'UserManager', function (contactService, logger, userManager) {
    logger = logger.forSource('ContactController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.send = send;
    vm.succeeded = false;
    vm.info = {};
    vm.errors = [];
    vm.userInfo = null;
    vm.isAuthenticated = false;
    vm.supportTypes = [];
    vm.email = null;

    initialize();


    /*** implementation ***/

    function initialize() {
        bindUserInfo();
        getSupportTypes();
        vm.email = 'info' + '@' + 'navaar' + '.ir';
    }

    function bindUserInfo() {
        var userInfo = userManager.getUserInfo();
        if (userInfo) {
            vm.info.name = userInfo.firstName + ' ' + userInfo.lastName;
            vm.info.email = userInfo.userName;
        }

        vm.isAuthenticated = userManager.getIsAuthenticated();
    }

    function getSupportTypes() {
        contactService.getSupportTypes()
       .$promise
       .then(function (result) {
           vm.supportTypes = result;
       })
       .catch(function (error) {
           var message = AppErrors.getMessage(error);
           logError(message, error, true);
       });
    }

    function send() {
        vm.errors = [];
        contactService.save(vm.info)
        .$promise
        .then(function (result) {
            if (!result) {
                vm.errors = AppErrors.getErrors();
            }
            else {
                vm.succeeded = true;
            }
        })
        .catch(function (error) {
            vm.errors = AppErrors.getErrors(error);
        });
    }
}]);
angular.module('app').controller('DownloadListController',
['ChapterService', 'logger', '$uibModalInstance', 'data', '$rootScope', '$location', '$uibModal', '$timeout', function (chapterService, logger, $modalInstance, data, $rootScope, $location, $modal, $timeout) {
    logger = logger.forSource('DownloadListController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.chapters = null;
    vm.cancel = cancel;
    vm.audiobook = data.audioBook;
    vm.getTempFile = getTempFile;

    initialize();

    /*** implementation ***/

    function initialize() {
        getChapters({ id: data.audioBook.identifier });
    }

    function getChapters(id) {
        chapterService.getChapters(id)
        .$promise
        .then(function (result) {
            vm.chapters = result;
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }


    function cancel() {
        $modalInstance.dismiss('cancel');
    }

    function getTempFile(chapter){
        var chapterId = chapter.chapterId;

        chapterService.download({ id: chapterId })
       .$promise
       .then(function (result) {
           if (!result.token) {
               throw new Exception();
           }
           var anchor = $('#download-hyperlink');
           anchor.attr({
               href: 'api/download-t/' + chapterId + '/?token=' + result.token,
               //download: chapter.title + '.m4a',
               target: '_blank'
           });

           window.location.href = 'api/download-t/' + chapterId + '/?token=' + result.token, '_blank';

           //$timeout(function () {
           //    var a = document.getElementById('download-hyperlink');
           //    // the code you want to run in the next digest
           //    //anchor.get(0).click();
           //    var evObj = document.createEvent('MouseEvents');
           //    evObj.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
           //    a.dispatchEvent(evObj);
           //});
       })
       .catch(function (error) {
           var message = AppErrors.getMessage(error);
           logError(message, error, true);
       });
    }
}]);
angular.module('app').controller('FaqController',
['FaqService', 'logger', function (faqService, logger) {
    logger = logger.forSource('FaqController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.isLoading = true;
    vm.faqs = [];
    vm.categories = {};
    vm.catgs = [];

    initialize();


    /*** implementation ***/

    function initialize() {
        getFaqs();
    }

    function getFaqs() {
        faqService.getFaqs()
       .$promise
       .then(function (result) {
           vm.faqs = result.items;
           vm.faqs.forEach(function (faq) {
               if (faq.category) {
                   if (!vm.categories[faq.category.code]) {
                       vm.categories[faq.category.code] = true;
                       vm.catgs.push({ code: faq.category.code, title: faq.category.title, displayOrder: faq.category.displayOrder });
                   }
               }
           });
           vm.isLoading = false;
       })
       .catch(function (error) {
           var message = AppErrors.getMessage(error);;
           logError(message, error, true);
           vm.isLoading = false;
       });
    }
}]);

angular.module('app').controller('ForgotPasswordController', ['UserManager', function ($userManager) {

    var vm = this;

    vm.succeeded = false;
    vm.errors = [];
    vm.submit = submit;

    function submit() {
        vm.succeeded = false;
        $userManager.forgotPassword({ email: vm.email })
                    .$promise
                    .then(function (result) {
                        vm.errors = [];
                        vm.succeeded = true;
                    })
                    .catch(function (error) {
                        vm.errors = AppErrors.getErrors(error);
                    });
    };

}]);
angular.module('app').controller('IndexController',
['AudioBookService', 'CatalogService', 'logger', '$rootScope', '$scope', '$route', 'slideImages', '$window', 'AnalyticsService', 'ANALYTICS', function (audioBookService, catalogService, logger, $rootScope, $scope, $route, slideImages, $window, analyticsService, ANALYTICS) {
    logger = logger.forSource('IndexController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.slides = [];
    vm.interval = 5000;
    vm.newest = [];
    vm.bestseller = [];
    vm.comingsoon = [];
    vm.trial = [];
    vm.editorPicks = [];
    vm.bestPicks = [];
    vm.free = [];
    vm.navaar = [];
    vm.featured = null;
    vm.mobileIntro = null;
    vm.allSlides = [];
    vm.mobileIntro = null;
    vm.featuredArtists = [];
    vm.isFirstVisit = true;
    vm.slideImages = slideImages;
    vm.currentLoggedInStatus = false;

    initialize();

    /*** implementation ***/

    function initialize() {

        vm.currentLoggedInStatus = $rootScope.clientInfo.loggedin;

        vm.isFirstVisit = !$rootScope.clientInfo.loggedin;

        analyticsService.trackEvent(ANALYTICS.category.PAGE_VIEW, ANALYTICS.pageViewAction.VIEW, 'index-' + (vm.isFirstVisit ? 'new-visit' : 'old-visit'));

        getFeaturedSlides();
        getBestPickAudioBooks();
        getFreeAudioBooks();
        getTrialAudioBooks();
        getNewestAudioBooks();
        getEditorPickAudioBooks();
        getBestSellerAudioBooks();
        getNavaarAudioBooks();
        getComingSoonAudioBooks();
        getFeaturedArtists();
    }

    function getFeaturedSlides() {
        return audioBookService.getFeaturedSlides()
        .$promise
        .then(function (result) {
            vm.allSlides = result;
            processSlides(result);
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }
    //function getFeaturedSlides() {
    //    return slides
    //    .$promise
    //    .then(function (result) {
    //        vm.allSlides = result;
    //        processSlides(result);
    //    })
    //    .catch(function (error) {
    //        var message = AppErrors.getMessage(error);
    //        logError(message, error, true);
    //    });
    //}

    function getNewestAudioBooks() {
        catalogService.getCatalog({
            action: 'latest',
            $top: 10,
            $inlinecount: 'allpages',
        })
        .$promise
        .then(function (result) {
            vm.newest = result.items;

        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }

    function getBestSellerAudioBooks() {
        catalogService.getCatalog({
            action: 'bestseller',
            $top: 10,
            $inlinecount: 'allpages',
        })
       .$promise
       .then(function (result) {
           vm.bestseller = result.items;

       })
       .catch(function (error) {
           var message = AppErrors.getMessage(error);
           logError(message, error, true);
       });
    }

    function getComingSoonAudioBooks() {
        catalogService.getCatalog({
            action: 'comingsoon',
            $top: 10,
            $inlinecount: 'allpages',
        })
       .$promise
       .then(function (result) {
           vm.comingsoon = result.items;

       })
       .catch(function (error) {
           var message = AppErrors.getMessage(error);
           logError(message, error, true);
       });
    }

    function getEditorPickAudioBooks() {
        catalogService.getCatalog({
            action: 'editor',
            $top: 10,
            $inlinecount: 'allpages',
        })
       .$promise
       .then(function (result) {
           vm.editorPicks = result.items;

       })
       .catch(function (error) {
           var message = AppErrors.getMessage(error);
           logError(message, error, true);
       });
    }

    function getBestPickAudioBooks() {
        catalogService.getCatalog({
            action: 'best',
            $top: 8,
            $inlinecount: 'allpages',
        })
       .$promise
       .then(function (result) {
           vm.bestPicks = result.items;

       })
       .catch(function (error) {
           var message = AppErrors.getMessage(error);
           logError(message, error, true);
       });
    }

    function getTrialAudioBooks() {
        catalogService.getCatalog({
            action: 'trial',
            $top: 10,
            $inlinecount: 'allpages',
        })
        .$promise
        .then(function (result) {
            vm.trial = result.items;

        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }

    function getFreeAudioBooks() {
        catalogService.getCatalog({
            action: 'free',
            $top: 10,
            $inlinecount: 'allpages',
        })
        .$promise
        .then(function (result) {
            vm.free = result.items;

        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }

    function getFeaturedArtists() {
        audioBookService.getFeaturedArtists()
        .$promise
        .then(function (result) {
            vm.featuredArtists = result;
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }

    function getNavaarAudioBooks() {
        catalogService.getCatalog({
            action: 'navaar',
            $top: 7,
            $inlinecount: 'allpages',
        })
       .$promise
       .then(function (result) {
           vm.navaar = result.items;
       })
       .catch(function (error) {
           var message = AppErrors.getMessage(error);
           logError(message, error, true);
       });
    }

    function processSlides(slides) {
        var isAuthenticated = $rootScope.isAuthenticated || false;
        var isFirstTime = !$rootScope.clientInfo.loggedin;
        var hasPurchased = false;

        vm.slides.clear();
        vm.mobileIntro = null;

        if (slides) {
            slides.forEach(function (slide) {
                if (slide.slideType == 0) { //WebDesktop
                    if (slide.viewMode == 2) {  //both
                        vm.slides.push(slide);
                    } else if (slide.viewMode == 1 && isAuthenticated) { //authenticated
                        vm.slides.push(slide);
                    } else if (slide.viewMode == 0 && !isAuthenticated) {   //not authenticated
                        vm.slides.push(slide);
                    } else if (slide.viewMode == 3 && isFirstTime) {   //First Time Visitor
                        vm.slides.push(slide);
                    } else if (slide.viewMode == 4 && $rootScope.userActivityInfo && $rootScope.userActivityInfo.purchaseStatus.hasPurchased
                        && !$rootScope.userActivityInfo.subscriptionStatus.hasActiveSubscription) {   //Subscription slide
                        vm.slides.push(slide);
                    }
                }
                else if (slide.slideType == 1) {    //WebMobile
                    vm.mobileIntro = slide;
                }
            });
        }
    }

    $rootScope.$on('loggedOn', function (e, ticket) {
        if ($route.current.controller == 'IndexController') {

            $rootScope.getUserActivityInfo().then(function (result) {
                //$route.reload();
                $window.location.reload();
            });
            
        }
        //if ($route.current.controller == 'IndexController' && (!vm.currentLoggedInStatus)) {
        //    vm.currentLoggedInStatus = true;
        //    $window.location.reload();
        //}
        //else {
        //    logSuccess('شما با موفقیت وارد نوار شدید.', null, true);
        //}
    });

    //$rootScope.$on('loggedOut', function (e, ticket) {
    //    if ($route.current.controller == 'IndexController') {
    //        $route.reload();
    //    }
    //});
}]);




angular.module('app').controller('LoginLiteController', ['$scope', 'UserManager', '$location', '$uibModalInstance', 'ngAuthSettings', 'AnalyticsService', 'ANALYTICS', '$uibModal', 'data', function ($scope, $userManager, $location, $modalInstance, ngAuthSettings, analyticsService, ANALYTICS, $modal, data) {
    var vm = this;
    vm.errors = [];
    vm.auth = {};
    vm.isBusy = false;
    vm.customData = data;
    vm.login = login;
    vm.register = register;
    vm.cancel = cancel;
    vm.ok = ok;
    vm.authExternalProvider = authExternalProvider;
    vm.authCompletedCB = authCompletedCB;

    function login() {
        // clear previous errors
        vm.errors = [];
        vm.isBusy = true;
        // verify user
        $userManager.acquireToken({ 'username': vm.auth.username, 'password': vm.auth.password })
                    .success(function (result) {
                        if (result.userName && result.access_token) {
                            $userManager.login(result, true);
                            analyticsService.trackEvent(ANALYTICS.category.UX, ANALYTICS.uxAction.SIGNED_IN, 'email');
                            ok();
                        }
                        else {
                            vm.errors.push(AppErrors.getMessage());
                            analyticsService.trackEvent(ANALYTICS.category.UX, ANALYTICS.uxAction.SIGNIN_FAILURE, 'email' + '-' + vm.errors.join());
                            vm.isBusy = false;
                        }
                    })
                    .error(function (result) {
                        if (result && result.error_description) {
                            vm.errors.push(result.error_description);
                            if (result.error && result.error == 'invalid_grant') {
                                vm.errors.push('اگر ثبت نام نکرده اید، لطفا روی دکمه ثبت نام کلیک نمایید.');
                            }
                        }
                        else {
                            vm.errors.push(AppErrors.getMessage());
                        }
                        analyticsService.trackEvent(ANALYTICS.category.UX, ANALYTICS.uxAction.SIGNIN_FAILURE, 'email' + '-' + vm.errors.join());
                        vm.isBusy = false;
                    });
    };

    function register() {
        vm.errors = [];
        vm.isBusy = true;

        $userManager.registerLite({ email: vm.auth.username, password: vm.auth.password, confirm: vm.auth.password, newsletter: true, market: 3, customData: JSON.stringify(vm.customData) })
                    .$promise
                    .then(function (result) {
                        if (!result) {
                            vm.errors = AppErrors.getErrors();
                            analyticsService.trackEvent(ANALYTICS.category.UX, ANALYTICS.uxAction.REGISTERATION_FAILURE, 'email' + '-' + vm.errors.join());
                            vm.isBusy = false;
                        }
                        else {
                            analyticsService.trackEvent(ANALYTICS.category.UX, ANALYTICS.uxAction.REGISTERED, 'email');
                            login();
                        }
                    })
                    .catch(function (error) {
                        vm.errors = AppErrors.getErrors(error);
                        analyticsService.trackEvent(ANALYTICS.category.UX, ANALYTICS.uxAction.REGISTERATION_FAILURE, 'email' + '-' + vm.errors.join());
                        vm.isBusy = false;
                    });
    }

    function cancel() {
        $modalInstance.dismiss("cancel");
        $userManager.setLoginRequested(false);
    }

    function ok() {
        $modalInstance.close("ok");
    }

    function authExternalProvider(provider) {

        var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html?v=' + appVersion;

        var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "/api/Account/ExternalLogin?provider=" + provider
                                                                    + "&response_type=token&client_id=" + ngAuthSettings.clientId
                                                                    + "&redirect_uri=" + redirectUri;
        window.$windowScope = vm;

        var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
    };

    function authCompletedCB(fragment) {

        $scope.$apply(function () {

            if (fragment.haslocalaccount == 'False') {

                $userManager.logout();

                var externalAuthData = {
                    provider: fragment.provider,
                    userName: fragment.external_user_name,
                    firstName: fragment.external_user_fname,
                    lastName: fragment.external_user_lname,
                    externalAccessToken: fragment.external_access_token,
                    market: 3
                };

                $userManager.registerExternal(externalAuthData).success(function (result) {
                    if (result.userName && result.access_token) {
                        $userManager.login(result, true);
                        analyticsService.trackEvent(ANALYTICS.category.UX, ANALYTICS.uxAction.REGISTERED, 'google');
                        ok();
                    }
                    else {
                        vm.errors.push(AppErrors.getMessage());
                        analyticsService.trackEvent(ANALYTICS.category.UX, ANALYTICS.uxAction.REGISTERATION_FAILURE, 'google' + '-' + vm.errors.join());
                        vm.isBusy = false;
                    }
                })
                .error(function (error) {
                    var message = AppErrors.getMessage(error);
                    vm.errors.push(message);
                    analyticsService.trackEvent(ANALYTICS.category.UX, ANALYTICS.uxAction.REGISTERATION_FAILURE, 'google' + '-' + vm.errors.join());
                    vm.isBusy = false;
                });

            }
            else {
                //Obtain access token.
                var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                $userManager.obtainAccessToken(externalData).success(function (result) {
                    if (result.userName && result.access_token) {
                        $userManager.login(result, true);
                        analyticsService.trackEvent(ANALYTICS.category.UX, ANALYTICS.uxAction.SIGNED_IN, 'google');
                        ok();
                    }
                    else {
                        vm.errors.push(AppErrors.getMessage());
                        analyticsService.trackEvent(ANALYTICS.category.UX, ANALYTICS.uxAction.SIGNIN_FAILURE, 'google' + '-' + vm.errors.join());
                        vm.isBusy = false;
                    }
                })
                .error(function (error) {
                    var message = AppErrors.getMessage(error);
                    vm.errors.push(message);
                    analyticsService.trackEvent(ANALYTICS.category.UX, ANALYTICS.uxAction.SIGNIN_FAILURE, 'google' + '-' + vm.errors.join());
                    vm.isBusy = false;
                });
            }
        });
    }
}]);
angular.module('app').controller('MasterSearchController',
['CatalogService', 'logger', function (catalogService, logger) {
    logger = logger.forSource('MasterSearchController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.getSearchResult = getSearchResult;
    vm.searchOptions = {
        minLength: 2,
        delay: 500,
    };


    /*** implementation ***/

    function getSearchResult(val) {
        if (!val)
            return [{ 'audiobooks': [], 'authorBooks': [], 'narratorBooks': [], 'translatorBooks': [], 'publisherBooks': [] }];
        return catalogService.getSearchResult(val).then(function (result) {
            result.data.totalItemsCount = result.data.audiobooks.length + result.data.authorBooks.length + result.data.narratorBooks.length + result.data.translatorBooks.length + result.data.publisherBooks.length;
            return [result.data]
        });
    }
}]);

angular.module('app').controller('NavController', ['$rootScope', '$scope', 'UserManager', 'CartService', 'CatalogService', '$uibModal', '$location', 'OrderService', 'localStorageService', 'logger', function ($rootScope, $scope, $userManager, cartService, catalogService, $modal, $location, orderService, localStorageService, logger) {

    logger = logger.forSource('NavController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    // $scope.isAuthenticated = false;
    // $scope.userName = null;

    $scope.$on('loggedOn', function (e, ticket) {
        //$scope.isAuthenticated = true;
        //$scope.userName = ticket.userName;
        getUserActivityInfo();
        $scope.getCartTotalCount();
    });

    //$scope.$on('loggedOut', function () {
    //    $scope.isAuthenticated = false;
    //    $scope.userName = null;
    //});

    $scope.getCartTotalCount = function () {
        cartService.getCartTotalCount().$promise
        .then(function (result) {
            $rootScope.cartItemsCount = result.count;
            $rootScope.hasTrial = result.hasTrial;
        });
    };

    $scope.showSubscription = false;
    if ($scope.isAuthenticated) {
        getUserActivityInfo();
        $scope.getCartTotalCount();
    }

    function login(customData) {
        //var dlg = dialogs.create('/app/templates/login.html', 'LoginController');

        var dlg = $modal.open({
            templateUrl: '/app/templates/login_lite.html',
            controller: 'LoginLiteController as vm',
            controllerAs: 'vm',
            windowClass: 'app-modal-login',
            //size: 'sm',
            resolve: {
                data: function () {
                    return customData;
                }
            }
        });
    }

    $scope.login = login;
    $rootScope.login = login;

    $scope.logout = function () {
        $scope.showSubscription = false;
        $userManager.logout();
        $location.path('/');
    }

    $rootScope.logout = $scope.logout;

    $scope.goToPath = function (path) {
        $location.path(path);
    }

    //$scope.search = function () {
    //    var keyword = $scope.keyword;
    //    if (!keyword) return;
    //    $location.path(/search/ + keyword);
    //}

    initialize();

    /*** implementation ***/

    function initialize() {
        getGenres();
    }

    function getGenres() {
        catalogService.getGenres()
        .$promise
        .then(function (result) {
            $scope.genres = result;
            $rootScope.genres = result;
        })
        .catch(function (error) {
            //var message = AppErrors.getMessage(error);
            //logError(message, error, true);
        });
    }

    $scope.showGuide = function () {

        var dlg = $modal.open({
            templateUrl: '/app/templates/guide.html',
            windowClass: 'guide-modal',
            size: 'lg',
        });
    }

    function getUserActivityInfo() {
        return orderService.getUserActivityInfo()
        .$promise
        .then(function (result) {
            $rootScope.userActivityInfo = result;

            if (result && result.purchaseStatus.hasPurchased && !result.subscriptionStatus.hasActiveSubscription) {
                $scope.showSubscription = true;
            }

            return result;
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }

    $rootScope.getUserActivityInfo = getUserActivityInfo;
}]);

angular.module('app').controller('NotFoundController',
['CatalogService', 'logger', '$location', function (catalogService, logger, $location) {
    logger = logger.forSource('NotFoundController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.audiobooks = [];

    initialize();

    /*** implementation ***/

    function initialize() {
        getCatalog();
    }

    function getCatalog() {
        catalogService.getCatalog({
            action: 'bestseller',
            $top: 10,
        })
         .$promise
         .then(function (result) {
             vm.audiobooks = result.items;
         })
         .catch(function (error) {
             var message = AppErrors.getMessage(error);
             logError(message, error, true);
         });
    }
}]);
angular.module('app').controller('OrderCancelController',
['OrderService', 'logger', '$uibModalInstance', 'data', function (orderService, logger, $modalInstance, data) {
    logger = logger.forSource('OrderCancelController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.item = data;
    vm.ok = ok;
    vm.cancel = cancel;

    /*** implementation ***/

    function ok() {
        orderService.cancelOrder({
            id: vm.item.orderId,
        })
        .$promise
        .then(function (result) {
            $modalInstance.close();
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }

    function cancel() {
        $modalInstance.dismiss('cancel');
    }
}]);
angular.module('app').controller('OrderItemController',
['OrderService', function (orderService) {

    var vm = this;
    vm.isCollapsed = true;
    vm.template = '';
    vm.showOrderItems = showOrderItems;
    vm.orderItems = null;

    /*** implementation ***/

    function showOrderItems(orderId) {
        vm.template = '/app/templates/order_items.html?v=' + appVersion;
        vm.isCollapsed = !vm.isCollapsed;
        getOrderItems(orderId);
    }

    function getOrderItems(orderId) {
        return orderService.getOrderItems(orderId).then(function (data) {
            vm.orderItems = data;
        });
    }
}]);



angular.module('app').controller('PlayerController',
['ContactService', 'logger', 'UserManager', '$rootScope', function (contactService, logger, userManager, $rootScope) {
    logger = logger.forSource('PlayerController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;

    vm.mp3File = null;
    vm.oggFile = null;
    vm.cdnPrefix = '';
    vm.togglePlayer = togglePlayer;
    vm.title = '';
    vm.currentBook = null;

    $rootScope.togglePlayer = vm.togglePlayer;

    initialize();


    /*** implementation ***/

    function initialize() {

    }

    function togglePlayer(audiobook) {

        if (!vm.currentBook || vm.currentBook.audioBookId != audiobook.audioBookId) {
            vm.mp3File = cdnPrefix + '/content/books/' + audiobook.audioBookId + '/sample.mp3?t=' + audiobook.recordVersion;
            vm.oggFile = cdnPrefix + '/content/books/' + audiobook.audioBookId + '/sample.ogg?t=' + audiobook.recordVersion;
            vm.currentBook = audiobook;
        }
    }
}]);
angular.module('app').controller('ProductChooserController',
['CartService', 'UserLibraryService', 'logger', '$uibModalInstance', 'data', '$rootScope', '$location', '$uibModal', 'AnalyticsService', 'ANALYTICS', function (cartService, libraryService, logger, $modalInstance, data, $rootScope, $location, $modal, analyticsService, ANALYTICS) {
    logger = logger.forSource('ProductChooserController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.audiobook = data.audiobook;
    vm.trialItems = data.trialItems;
    vm.cancel = cancel;
    vm.getPrice = getPrice;
    vm.getFirstPurchasePrice = getFirstPurchasePrice;
    vm.getFirstPurchaseDiscountPercent = getFirstPurchaseDiscountPercent;
    vm.transitionInfo = null;
    vm.purchase = purchase;
    vm.getTrial = getTrial;
    vm.changeTrial = changeTrial;
    vm.returnTrial = returnTrial;
    vm.hasUnconfiremedOrder = false;
    vm.error = null;
    vm.includesSubscription = false;
    vm.getWithSubscription = getWithSubscription;

    initialize();

    /*** implementation ***/

    function initialize() {
        calculateTransitionInfo();
        if (vm.audiobook) {
            vm.audiobook.calculateTransitionInfo = calculateTransitionInfo;
        }
    }

    function calculateTransitionInfo() {
        var info = {
            purchase: true, //the purchase option is always available.
            getTrial: false,
            changeTrial: false,
            returnTrial: false,
            trialTitle: '',
        }

        if (vm.audiobook.subscriptionInfo
            && vm.audiobook.subscriptionInfo.products
            && vm.audiobook.subscriptionInfo.products.length > 0
            && vm.audiobook.subscriptionInfo.userMembershipStatus &&
            !vm.audiobook.subscriptionInfo.userMembershipStatus.hasActiveSubscription) {
            analyticsService.trackEvent(ANALYTICS.category.UI, ANALYTICS.uiAction.SHOWN, 'subscription-shown');
        }

        vm.audiobook.products.forEach(function (product) {
            if (product.isSubscription) {
                vm.includesSubscription = true;
            }
            if (!product.publicationType.countable) {
                if (!$rootScope.isAuthenticated) {
                    if (product.hasTrial) {
                        info.getTrial = true;
                    }
                } else {
                    tranInfo = product.transitionInfo;

                    if (tranInfo) {
                        //first check if the user has this book in his library

                        var mode = tranInfo.ownershipMode;
                        if (mode == 0) {
                            //if the user has already purchased this audiobook then it cannot be purchased again.
                            //close the dialog.
                            $modalInstance.close();
                        } else if (mode == 1) {
                            //if this audiobook has already been loaned to the user, then it can only be returned.
                            info.returnTrial = true;
                        } else if (mode == 2 && product.hasTrial) {
                            //if the audiobooks is already returned and can be loaned again then, show the options.
                            info.getTrial = true;
                        }
                    } else if (product.hasTrial && vm.trialItems && vm.trialItems.length > 0) {
                        //show change option if this book is loanable the user has already a trial item in his library.
                        var librayItem = vm.trialItems[0];
                        info.changeTrial = true;
                        info.trialTitle = librayItem.audioBook.title;
                    } else if (product.hasTrial) {
                        //this book is not in the user's library and has trial option enabled.
                        info.getTrial = true;
                    }
                }
            }
        });

        vm.transitionInfo = info;
    }

    function cancel() {
        $modalInstance.dismiss('cancel');
    }

    function purchase(product) {
        if (showLogin({ productId: product.productId, transitionType: 0 })) return;
        addToCart(product.productId);
    }

    function getTrial(product) {
        if (showLogin({ productId: product.productId, transitionType: 1 })) return;
        addToCart(product.productId, 1);
    }
    function changeTrial(product) {
        if (showLogin()) return;

        $modalInstance.close();

        var dlg = $modal.open({
            templateUrl: '/app/templates/book_trial_change.html',
            controller: 'BookTrialChangeController as vm',
            controllerAs: 'vm',
            resolve: {
                data: function () {
                    return {
                        productId: product.productId,
                        audioBook: vm.audiobook,
                        currentTrial: vm.trialItems && vm.trialItems.length > 0 ? vm.trialItems[0] : null,
                    };
                }
            }
        });
    }
    function returnTrial(product) {
        if (showLogin()) return;

        $modalInstance.close();

        var dlg = $modal.open({
            templateUrl: '/app/templates/book_trial_return.html',
            controller: 'BookTrialReturnController as vm',
            controllerAs: 'vm',
            resolve: {
                data: function () {
                    return {
                        productId: product.productId,
                        audioBook: vm.audiobook,
                    };
                }
            }
        });
    }

    function addToCart(id, transitionType) {
        vm.error = null;
        vm.hasUnconfiremedOrder = false;

        if (!transitionType) {
            transitionType = 0; //the default is purchase.
        }
        cartService.save({}, {
            productId: id,
            libraryTransitionType: transitionType,
        })
        .$promise
        .then(function (result) {
            cartService.getCartTotalCount(function (result) {
                $rootScope.cartItemsCount = result.count;
            });
            $modalInstance.close();
            $location.url('/checkout');
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            //logError(message, error, true);


            //TODO: fine a better way. don't use string processing as it may change on the server.
            if (message.indexOf('سفارشات ناتمام') > 0) {
                vm.hasUnconfiremedOrder = true;
                message = null;
            }

            vm.error = message;
        });
    }

    function getPrice(product) {
        if (product) {
            //return product.price / (1 + vm.audiobook.vat) / 10.0;
            return product.price / 10.0;
        }
    }

    function getFirstPurchasePrice(product) {
        if (product && product.firstTimeOfferInfo && product.firstTimeOfferInfo.applicable) {
            var discountValue = Math.min(product.price * product.firstTimeOfferInfo.discountPercentageValue, product.firstTimeOfferInfo.maxDiscountAmount);

            return (product.price - discountValue) / 10.0;
        } else if (product) {
            return product.price / 10.0;
        }
    }

    function getFirstPurchaseDiscountPercent(product) {
        if (product && product.firstTimeOfferInfo && product.firstTimeOfferInfo.applicable) {
            var discountValue = Math.min(product.price * product.firstTimeOfferInfo.discountPercentageValue, product.firstTimeOfferInfo.maxDiscountAmount);

            return discountValue / product.price * 100;
        }

        return 0;
    }

    function showLogin(data) {
        if (!$rootScope.isAuthenticated) {
            $rootScope.login(data);
            return true;
        }

        return false;
    }

    function getWithSubscription(product) {
        if (showLogin({ productId: product.productId, transitionType: 0 })) return;
        if (!vm.audiobook.subscriptionInfo.userMembershipStatus.hasActiveSubscription) {
            $modalInstance.close();
            $location.url('/subscription?r=/audiobook/' + vm.audiobook.identifier + '/' + vm.audiobook.slug);
            return;
        }

        addToCart(product.productId);
    }
}]);

angular.module('app').controller('ProfileController', ['UserManager', '$location', 'logger', '$uibModal', '$rootScope', function ($userManager, $location, logger, $modal, $rootScope) {
    logger = logger.forSource('ProfileController');

    var vm = this;
    vm.errors = [];
    vm.occupations = [];
    vm.save = save;
    vm.today = today;
    vm.clear = clear;
    vm.openPersian = openPersian;
    vm.changeEmail = changeEmail;

    initialize();

    function initialize() {

        $userManager.getProfile()
                    .$promise
                    .then(function (result) {
                        vm.firstname = result.firstName;
                        vm.lastname = result.lastName;
                        vm.gender = result.gender != null ? result.gender.toString() : null;
                        vm.birthdate = result.birthday;
                        vm.mobileno = result.mobileNo;
                        vm.occupation = result.occupation;
                        vm.email = result.email;
                    })
                    .catch(function (error) {
                        vm.errors = AppErrors.getErrors(error);
                    });

        getOccupations();
    }

    function save() {
        vm.errors = [];
        $userManager.editProfile({ firstname: vm.firstname, lastname: vm.lastname, gender: vm.gender, birthday: vm.birthdate, mobileno: vm.mobileno, occupation: vm.occupation })
                    .$promise
                    .then(function (result) {
                        logger.logSuccess('اطلاعات پروفایل شما بروز رسانی گردید.', result, true);
                    })
                    .catch(function (error) {
                        vm.errors = AppErrors.getErrors(error);
                    });
    };

    function getOccupations() {
        $userManager.getOccupations()
       .$promise
       .then(function (result) {
           vm.occupations = result;
       })
       .catch(function (error) {
           var message = AppErrors.getMessage(error);
           logError(message, error, true);
       });
    }

    //persian date
    function today() {
        vm.birthdate = new Date();
    };

    function clear() {
        vm.birthdate = null;
    };

    function openPersian($event) {
        $event.preventDefault();
        $event.stopPropagation();

        vm.persianIsOpen = true;
        vm.gregorianIsOpen = false;
    };

    function changeEmail() {
        var dlg = $modal.open({
            templateUrl: '/app/templates/change_email.html',
            controller: 'ChangeEmailController as vm',
            controllerAs: 'vm',
        });

        dlg.result.then(function (result) {
            $userManager.logout();
            $location.url('/');
            $rootScope.login();
        });
    }
}]);

angular.module('app').controller('ProfileSpecialMembershipController', ['UserManager', '$location', 'logger', '$uibModalInstance', function ($userManager, $location, logger, $modalInstance) {
    logger = logger.forSource('ProfileSpecialMembershipController');

    var vm = this;
    vm.errors = [];
    vm.gender = null;
    vm.birthdate = null;
    vm.mobileno = null;
    vm.occupation = null;
    vm.update = update;
    vm.cancel = cancel;
    vm.today = today;
    vm.clear = clear;
    vm.openPersian = openPersian;
    vm.dateOptions = {
        startingDay: 6
    };
    vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    vm.format = vm.formats[1];
    vm.occupations = [];

    initialize();

    //implementation
    function initialize() {
        getProfile();
        getOccupations();
    }

    function getProfile() {
        $userManager.getProfile()
                    .$promise
                    .then(function (result) {
                        vm.firstname = result.firstName;
                        vm.lastname = result.lastName;
                        vm.gender = result.gender;
                        vm.birthdate = result.birthday;
                        vm.mobileno = result.mobileNo;
                        vm.occupation = result.occupation;
                    })
                    .catch(function (error) {
                        vm.errors = AppErrors.getErrors(error);
                    });
    }

    function update() {
        vm.errors = [];

        $userManager.updateProfile({ firstName: vm.firstname, lastName: vm.lastname, gender: vm.gender, birthday: vm.birthdate, mobileno: vm.mobileno, occupation: vm.occupation })
                     .$promise
                     .then(function (result) {
                         $modalInstance.close();
                     })
                     .catch(function (error) {
                         vm.errors = AppErrors.getErrors(error);
                     });
    };

    function cancel() {
        $modalInstance.dismiss('cancel');
    }

    function getOccupations() {
        $userManager.getOccupations()
       .$promise
       .then(function (result) {
           vm.occupations = result;
       })
       .catch(function (error) {
           var message = AppErrors.getMessage(error);
           logError(message, error, true);
       });
    }

    //persian date
    function today() {
        vm.birthdate = new Date();
    };

    function clear() {
        vm.birthdate = null;
    };

    function openPersian($event) {
        $event.preventDefault();
        $event.stopPropagation();

        vm.persianIsOpen = true;
        vm.gregorianIsOpen = false;
    };
}]);

angular.module('app').controller('PurchaseHistoryController',
['OrderService', 'logger', '$uibModal', '$location', function (orderService, logger, $modal, $location) {

    logger = logger.forSource('PurchaseHistoryController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.purchaseHisotry = null;
    vm.processPayment = processPayment;
    vm.cancelOrder = cancelOrder;
    vm.getOrderItems = getOrderItems;
    vm.orderItemsTemplate = '';
    vm.errors = [];

    initialize();

    /*** implementation ***/

    function initialize() {

        getPurchaseHistory();
    }

    function getPurchaseHistory() {
        orderService.getPurchaseHistory()
        .$promise
        .then(function (result) {
            vm.purchaseHisotry = result;
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }

    function processPayment(orderId) {
        vm.errors = [];

        orderService.processPayment({ id: orderId })
        .$promise
        .then(function (result) {
            var form = angular.element(result.formTag);
            angular.element('#payment').append(form);
            form.submit();
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);

            //TODO : show errors inside form instead of toast.
            //vm.errors = [];
        });
    }

    function cancelOrder(order) {
        var dlg = $modal.open({
            templateUrl: '/app/templates/order_cancel.html',
            controller: 'OrderCancelController as vm',
            controllerAs: 'vm',
            resolve: {
                data: function () {
                    return order;
                }
            }
        });

        dlg.result.then(function (result) {
            getPurchaseHistory();
        });
    }

    function getOrderItems(index) {
        var order = vm.purchaseHisotry[index];
        if (!order || order.orderItems) {
            return;
        }
        order.template = '/app/templates/order_items.html';

        orderService.getOrderItems({ id: order.orderId })
        .$promise
        .then(function (result) {
            order.orderItems = result;
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }
}]);



angular.module('app')
            .controller('RedeemController', ['CartService', '$location', 'logger', function (cartService, $location, logger) {
                logger = logger.forSource('RedeemController');
                var logError = logger.logError;
                var logSuccess = logger.logSuccess;

                var vm = this;

                vm.errors = [];
                vm.submitRedeem = submitRedeem;

                function submitRedeem() {
                    vm.errors = [];
                    cartService.redeem({ redeemText: vm.redeemText })
                    .$promise
                    .then(function (result) {
                        if (result) {
                            $location.url('/checkout');
                        }

                    })
                    .catch(function (error) {
                        if (error.status == 401) {
                            vm.errors = ['لطفا مشخصات حساب کاربری خود را وارد نمایید.'];
                        } else {
                            vm.errors = AppErrors.getErrors(error, "خطا در ثبت کد .");
                        }
                    });
                };
            }]);
angular.module('app').controller('ResetPasswordController', ['UserManager', '$location', 'logger', function ($userManager, $location, logger) {
    logger = logger.forSource('ResetPasswordController');

    var vm = this;
    vm.errors = [];
    //vm.succeeded = false;
    vm.code = null;
    vm.reset = reset;

    initialize();

    function initialize() {
        var code = $location.search().code;

        if (!code) {
            vm.errors = AppErrors.getErrors(null, 'کد فعال سازی معتبر نمی باشد.');

            return;
        }

        vm.code = code;
    }

    function reset() {
        vm.errors = [];
        vm.succeeded = false;
        $userManager.resetPassword({ email: vm.email, password: vm.password, confirm: vm.confirm, code: vm.code })
                    .$promise
                    .then(function (result) {
                        if (!result) {
                            vm.errors = AppErrors.getErrors();
                        }
                        else {
                            logger.logSuccess('کلمه عبور شما با موفقیت تغییر یافت.', result, true);
                            $location.url('/');
                        }
                    })
                    .catch(function (error) {
                        vm.errors = AppErrors.getErrors(error);
                    });
    };

}]);

angular.module('app').controller('SubscriptionController', ['SubscriptionService', 'CartService', 'logger', '$location', '$rootScope', function (subscriptionService, cartService, logger, $location, $rootScope) {
    logger = logger.forSource('SubscriptionController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.addToCart = addToCart;
    vm.getSubcsriptionPlans = getSubcsriptionPlans;
    vm.getGridSize = getGridSize;
    vm.getPlanMenu = getPlanMenu;
    vm.plans = [];
    vm.returnUrl = null;
    vm.isLoading = true;
    vm.guide = '';
    initialize();

    /*** implementation ***/

    function initialize() {
        getSubcsriptionGuide();
        getSubcsriptionPlans();
        vm.returnUrl = $location.search().r || undefined;
    }

    function addToCart(productId) {
        addToCart(productId);
    }

    function getSubcsriptionPlans() {
        subscriptionService.getSubscriptionPlans()
        .$promise
        .then(function (result) {
            vm.plans = result.items;
            vm.isLoading = false;
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);;
            logError(message, error, true);
            vm.isLoading = false;
        });
    }

    function getSubcsriptionGuide() {
        subscriptionService.getSubscriptionGuide()
        .$promise
        .then(function (result) {
            vm.guide = result.guide;
            vm.isLoading = false;
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);;
            logError(message, error, true);
            vm.isLoading = false;
        });
    }

    function addToCart(id) {
        cartService.save({}, {
            productId: id,
            libraryTransitionType: 0,
        })
        .$promise
        .then(function (result) {
            cartService.getCartTotalCount(function (result) {
                $rootScope.cartItemsCount = result.count;
            });
            $location.url('/checkout');
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }

    function getGridSize() {
        if (vm.plans.length == 0) return '';
        else if (vm.plans.length % 9 == 0) return '4';
        else if (vm.plans.length % 5 == 0) return '5th';
        else if (vm.plans.length % 4 == 0) return '3';
        else if (vm.plans.length % 3 == 0) return '4';
        else if (vm.plans.length % 2 == 0) return '6';
        else if (vm.plans.length == 1) return '12';
        else if (vm.plans.length == 7) return '4';
        else return '3';
    }

    function getPlanMenu(selectedPlan) {
        var planMenu = [];
        vm.plans.forEach(function (plan) {
            if (plan.identifier != selectedPlan) {
                planMenu.push(plan.identifier);
            }
        });

        return planMenu.sort().join();
    }
}]);
angular.module('app').controller('SubscriptionHistoryController',
['SubscriptionService', 'logger', '$uibModal', '$location', function (subscriptionService, logger, $modal, $location) {

    logger = logger.forSource('SubscriptionHistoryController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.subscriptionHistory = null;
    vm.errors = [];
    vm.currentDate = new Date();

    initialize();

    /*** implementation ***/

    function initialize() {

        getSubscriptionHistory();
    }

    function getSubscriptionHistory() {
        subscriptionService.getSubscriptionHistory()
        .$promise
        .then(function (result) {
            vm.subscriptionHistory = result;
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }
}]);



angular.module('app').controller('TotalSearchController',
['CatalogService', 'logger', '$routeParams', '$analytics', function (catalogService, logger, $routeParams, $analytics) {
    logger = logger.forSource('TotalSearchController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.busy = false;
    vm.catalog = null;
    vm.hasResult = false;
    vm.isLoading = true;
    vm.filterCriteria = {
        pageNumber: 1,
        pageSize: 25,
        totalItems: 0,
    };
    vm.loadMore = loadMore;

    initialize();

    /*** implementation ***/

    function initialize() {
        var keyword = $routeParams.keyword;
        if (!keyword) {
            return;
        }

        vm.filterCriteria.keyword = keyword;

        searchAudioBooks();
    }

    function searchAudioBooks() {
        vm.busy = true;

        catalogService.getTotalSearchResult({
            key: vm.filterCriteria.keyword,
            $skip: (vm.filterCriteria.pageNumber - 1) * vm.filterCriteria.pageSize,
            $top: vm.filterCriteria.pageSize,
            $inlinecount: 'allpages',
        })
        .$promise
        .then(function (result) {
            var data =
            {
                items: result.items,
                totalItems: result.count,
                totalPages: Math.ceil(result.count / vm.filterCriteria.pageSize),
                page: vm.filterCriteria.pageNumber
            };


            if (vm.catalog) {
                data.items = vm.catalog.items.concat(data.items);
            }

            vm.catalog = data;
            vm.busy = false;

            vm.hasResult = vm.catalog.totalItems > 0;

            if (!vm.hasResult) {
                //if there is no search result show the user some content.
                getCatalog();
            }

            vm.isLoading = false;

        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
            vm.isLoading = false;
        });

        if (vm.filterCriteria.keyword.length > 1) {
            $analytics.pageTrack('/search_results.html?term=' + vm.filterCriteria.keyword);
        }
    }

    function loadMore() {
        if (vm.busy) return;

        vm.filterCriteria.pageNumber++;
        searchAudioBooks();
    }

    function getCatalog() {
        catalogService.getCatalog({
            action: 'bestseller',
            $top: 8,
        })
         .$promise
         .then(function (result) {
            var data =
            {
                items: result.items,
                totalItems: result.items.length,
                totalPages: 1,
                page: 1
            };

            vm.catalog = data;
         })
         .catch(function (error) {
             var message = AppErrors.getMessage(error);
             logError(message, error, true);
         });
    }
}]);
angular.module('app').controller('TrialAgreementWizardController',
['CartService', 'logger', '$uibModalInstance', 'data', function (cartService, logger, $modalInstance, data) {
    logger = logger.forSource('TrialAgreementWizardController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.agreement = data;
    vm.ok = ok;
    vm.cancel = cancel;
    vm.currentStep = 1;

    /*** implementation ***/

    function ok() {

        if (vm.agreement.length != vm.currentStep) {
            vm.currentStep = vm.currentStep + 1;
            return;
        }

        vm.currentStep = vm.currentStep + 1;
        cartService.acceptMembership()
        .$promise
        .then(function (result) {
            $modalInstance.close();
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }

    function cancel() {
        $modalInstance.dismiss('cancel');
    }
}]);
angular.module('app').controller('UserController', ['$location', '$scope', function ($location, $scope) {
    var vm = this;
    vm.tabs = [];
    vm.selectTab = selectTab;
    vm.currentPage = null;
    vm.activeIndex = 0;
    $scope.pills = 'pills';

    initialize();

    /*** implementation ***/

    function initialize() {
        var page = ($location.search().profile && 'profile') || ($location.search().purchase && 'purchase') || ($location.search().library && 'library') || ($location.search().password && 'password') || ($location.search().subscription && 'subscription') || 'profile';

        vm.tabs = [
            {
                title: 'اطلاعات کاربر',
                key: 'profile',
                template: '/app/templates/profile.html',
                isLoaded: page == 'profile',
                active: page == 'profile',
            },
            {
                title: 'کتابخانه',
                key: 'library',
                template: '/app/templates/user_library.html',
                isLoaded: page == 'library',
                active: page == 'library',
            },
            {
                title: 'تاریخچه خرید',
                key: 'purchase',
                template: '/app/templates/purchase_history.html',
                isLoaded: page == 'purchase',
                active: page == 'purchase',
            },
            {
                title: 'اشتراک',
                key: 'subscription',
                template: '/app/templates/subscription_history.html',
                isLoaded: page == 'subscription',
                active: page == 'subscription',
            },
            {
                title: 'رمز عبور',
                key: 'password',
                template: '/app/templates/change-password.html',
                isLoaded: page == 'password',
                active: page == 'password',
            },
        ];

        var index = 0;
        vm.tabs.forEach(function (tab) {
            if (tab.active) {
                vm.activeIndex = index;
            }
            tab.index = index;
            index++;
        });
    }

    function selectTab(tab) {
        vm.activeIndex = tab.index;
        vm.currentPage = tab.title;
        //$location.$$search = {};
        //$location.search(tab.key, true);
    }
}]);
angular.module('app').controller('UserLibraryController',
['UserLibraryService', '$uibModal', 'logger', function (userLibraryService, $modal, logger) {

    logger = logger.forSource('UserLibraryController');
    var logError = logger.logError;
    var logSuccess = logger.logSuccess;

    var vm = this;
    vm.library = null;
    vm.showDowloadList = showDowloadList;
    vm.Access_Mode_App = 0;
    vm.Access_Mode_Web = 1;
    vm.hasDownload = true;
    vm.purchaseTrial = purchaseTrial;
    vm.returnTrial = returnTrial;

    initialize();

    /*** implementation ***/

    function initialize() {

        getUserLibrary();
    }

    function getUserLibrary() {
        userLibraryService.getUserLibrary()
        .$promise
        .then(function (result) {
            vm.library = result;
        })
        .catch(function (error) {
            var message = AppErrors.getMessage(error);
            logError(message, error, true);
        });
    }

    function showDowloadList(data) {
        var dlg = $modal.open({
            templateUrl: '/app/templates/book_download_list.html',
            controller: 'DownloadListController as vm',
            controllerAs: 'vm',
            resolve: {
                data: function () {
                    return data;
                }
            }
        });
    }

    function purchaseTrial(data){
        var dlg = $modal.open({
            templateUrl: '/app/templates/book_trial_purchase.html',
            controller: 'BookTrialPurchaseController as vm',
            controllerAs: 'vm',
            resolve: {
                data: function () {
                    return data;
                }
            }
        });
    }

    function returnTrial(data){
        var dlg = $modal.open({
            templateUrl: '/app/templates/book_trial_return.html',
            controller: 'BookTrialReturnController as vm',
            controllerAs: 'vm',
            resolve: {
                data: function () {
                    return data;
                }
            }
        });

        dlg.result.then(function (result) {
            getUserLibrary();
        });
    }
}]);



var app = angular.module('customFilters', []);

app.filter('persianTime', function () {
    return function (input) {
        if (!input) {
            return;
        }
        var parts = input.split(':');
        if (parts.length < 2) {
            throw new Exception("invalid time");
        }
        var hours = parseInt(parts[0].trim(), 10);
        var minutes = parseInt(parts[1].trim(), 10);

        var result = ''
        if (hours > 0) {
            result += hours.toString() + ' ساعت';
            if (minutes > 0) {
                result += ' و ';
            }
        }
        if (minutes > 0) {
            result += minutes.toString() + ' دقیقه';
        }

        return result;
    };
});

app.filter('cdn', function () {
    return function (input) {
        return cdnPrefix + input;
    };
});

app.filter('picMode', function () {
    return function (input, mode) {
        picmode = mode || 'stretch';
        return input + '&mode=stretch';
    };
});

app.filter('recordVersion', function () {
    return function (input, t) {
        if (!t) {
            return input;
        }

        return input + '&t=' + t;
    };
});

app.filter('html', ['$sce', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    };
}]);

app.filter('audiobookPrefix', function () {
    return function (input) {
        return 'کتاب صوتی ' + (input || '');
    };
});

app.filter('timeSymbol', function () {
    return function (input) {
        var parts = input.split(':');
        if (parts.length < 3) return input;
        return parts[0] + ':' + parts[1] + '\':' + parts[2] + '"';
    };
});

app.filter('reverse', function () {
    return function (items) {
        return items.slice().reverse();
    };
});
angular.module('app').factory('AnalyticsService', ['$analytics', function ($analytics) {
    
    return {
        trackEvent: trackEvent,
    };

    function trackEvent(category, event, label, value) {
        var trackingData = { category: category };
        
        if (label) {
            trackingData.label = label;
        }
        if(value){
            trackingData.value = value;
        }
        $analytics.eventTrack(event, trackingData);
    }
}]);

angular
      .module('app')
      .constant('ANALYTICS', {
          category: {
              UI: 'UI',
              UX: 'UX',
              SAMPLE_PLAYBACK: 'BookPreview',
              SOCIAL: 'SOCIAL',
              PAGE_VIEW: 'PAGE_VIEW',
              //NET: 'NET',
              //APP: 'APP',
          },
          uiAction: {
              CLICK: 'CLICK',
              HOVER: 'HOVER',
              SHOWN: 'SHOWN',
          },
          uxAction:{
              REGISTERED: 'REGISTERED',
              REGISTERATION_FAILURE: 'REGISTERATION_FAILURE',
              SIGNED_IN: 'SIGNED_IN',
              SIGNIN_FAILURE: 'SIGNIN_FAILURE',
              PURCHASED: 'PURCHASED',
              REGISTRATION_CONFIRMED: 'REGISTRATION_CONFIRMED',
              GOT_SUBSCRIPTION: 'GOT_SUBSCRIPTION',
          },
          socialAction:{
              SHARE: 'SHARE',
          },
          samplePlaybackAction:{
              PLAY: 'Play',
              PLAY_INLINE: 'Play-Inline',
          },
          pageViewAction: {
              VIEW: 'VIEW',
          },
          //appAction: {
              
          //},
          //netAction: {

          //},
          //screen: {

          //},
      });
angular.module('app').factory('AudioBookService',
    ['$resource', function ($resource) {

        var manager = $resource('/api/audiobooks/:action', null, {
            getFeaturedSlides: { method: 'GET', url: '/api/slides', isArray: true },
            getFeaturedArtists: { method: 'GET', url: '/api/featured-artists', isArray: true },
            getMobileIntro: { method: 'GET', url: '/api/slides/mobile'},
            rate: { method: 'POST', params: { action: 'rate' } }
        });

        return manager;

    }]);
angular.module('app').factory('CartService',
    ['$resource', function ($resource) {

        var manager = $resource('/api/cart/:action/:id', null, {
            'update': { method: 'PUT' },
            getCartTotalCount: { method: 'POST', url: '/api/cart/count' },
            getCartItems: { method: 'POST', url: '/api/cart/items'},
            clearCart: { method: 'POST', url: '/api/cart/clear' },
            processOrder: { method: 'POST', url: '/api/orders/process' },
            processOrderWithNoPayment: { method: 'POST', url: '/api/orders/process-no-payment' },
            applyDiscount: { method: 'POST', url: '/api/cart/applydiscount' },
            removeDiscount: { method: 'POST', url: '/api/cart/removediscount/:id' },
            getCheckoutEntity: { method: 'POST', url: '/api/cart/checkout'},
            getTrialCondition: { method: 'POST', url: '/api/cart/trial-condition' },
            acceptMembership: { method: 'POST', url: '/api/cart/accept-membership' },
            redeem: { method: 'POST', params: { action: 'redeem', serialNo: '@redeemText' } },
            getPurchaseStatus: { method: 'POST', url: '/api/cart/purchase-status' },
            getAppliedVouchers: { method: 'POST', url: '/api/cart/vouchers', isArray: true },
        });

        return manager;
    }]);
angular.module('app').factory('CatalogService',
    ['$resource', function ($resource) {

        var manager = $resource('/api/audiobooks/:action/:key', null, {
            getCatalog: { method: 'GET' },
            getAudioBookSummary: { method: 'GET', url: '/api/audiobooks/:id/summary', cache: true },
            getAudioBookDetail: { method: 'GET', url: '/api/audiobooks/:id/detail2', cache: true },
            //getChapters: { method: 'GET', url: '/api/chapters/:id', isArray: true },
            getGenres: { method: 'GET', url: '/api/genres', isArray: true },
            getTotalSearchResult: { method: 'GET', params: { action: 'search', key: '@key' } },
        });

        return manager;

    }]);

//function getSearchResult(val) {
//    return $http({
//        method: 'POST',
//        url: '/api/catalog/search/overview',
//        data: '"' + val + '"',
//        headers: { 'Content-Type': 'application/json' }
//    });
//}
angular.module('app').factory('ChapterService',
    ['$resource', function ($resource) {

        var manager = $resource('/api/chapters/:action/:id', null, {
            getChapters: { method: 'GET', url: '/api/chapters/:id', isArray: true },
            download: { method: 'POST', url: '/api/download/:id', params: {id:'@id'}},
        });

        return manager;

    }]);
angular.module('app').factory('ContactService',
    ['$resource', function ($resource) {

        var manager = $resource('/api/contacts/:action/:id', null, {
            getSupportTypes: { method: 'GET', url: '/api/contacts/support-types', isArray: true },
        });
        return manager;

    }]);
/***

 JayData EntityManagerFactory

 ***/
angular.module('app')
    .factory('EntityManagerFactory', ['$data', '$rootScope', 'UserManager', function ($data, $rootScope, userManager) {
        var serviceRoot = window.location.protocol + '//' + window.location.host + '/';
        var serviceName = serviceRoot + 'odata/';
        var cache = {};
        var factory = {
            newManager: newManager,
            serviceName: serviceName
        };

        return factory;

        function newManager() {
            var manager = new entityManager(serviceName);
            return manager;
        }

        //used to execute jaydata queries.
        function entityManager(serviceName) {
            return {
                executeQuery: executeQuery,
                executeAction: executeAction,
                saveChanges: saveChanges,
            };

            //get data context.
            function getContext() {
                var d = new $data.PromiseHandler();

                $data.initService(serviceName)
                    .then(function (context) {
                        //send authorization token on each request.
                        context.prepareRequest = function (cfg) {
                            cfg[0].headers['Authorization'] = 'Bearer ' + userManager.getAccessToken();
                        };
                        d.deferred.resolve(context);
                    })
                    .fail(function () {
                        d.deferred.reject.apply(d.deferred, arguments);
                    });

                return d.getPromise();
            }

            //execute entity set queries.
            function executeQuery(query) {
                var d = new $data.PromiseHandler();

                getContext()
                    .then(function (context) {
                        query(context).toLiveArray()
                            .then(function (result) {
                                d.deferred.resolve(result);
                            })
                        .error(function () {
                            d.deferred.reject.apply(d.deferred, arguments);
                        });
                    }).
                fail(function () {
                    d.deferred.reject.apply(d.deferred, arguments);
                });

                return d.getPromise();
            }

            //execute odata actions.
            function executeAction(action) {
                var d = new $data.PromiseHandler();

                getContext()
                    .then(function (context) {
                        action(context)
                            .then(function (result) {
                                d.deferred.resolve(result);
                                if (!$rootScope.$$phase) $rootScope.$apply();
                            })
                        .fail(function () {
                            d.deferred.reject.apply(d.deferred, arguments);
                        });
                    })
                .fail(function () {
                    d.deferred.reject.apply(d.deferred, arguments);
                    if (!$rootScope.$$phase) $rootScope.$apply();
                });

                return d.getPromise();
            }

            //save data context changes.
            function saveChanges(query) {
                var d = new $data.PromiseHandler();

                getContext()
                    .then(function (context) {
                        query(context).saveChanges()
                            .then(function (result) {
                                d.deferred.resolve(result);
                            }, function () {
                                context.stateManager.reset();
                            })
                        .catch(function () {
                            d.deferred.reject.apply(d.deferred, arguments);
                        });
                    }).
                fail(function () {
                    d.deferred.reject.apply(d.deferred, arguments);
                });

                return d.getPromise();
            }
        }
    }]);
angular.module('app').factory('FaqService',
    ['$resource', function ($resource) {

        var manager = $resource('/api/faqs/:action/:id', null, {
            getFaqs: { method: 'GET', params: { action: 'items' } },
        });

        return manager;

    }]);
angular.module('app').factory('FeaturedSlideService',
    ['AudioBookService', 'preloader', '$q', '$rootScope', '$window', function (audioBookService, preloader, $q, $rootScope, $window) {

        var service = {
            getFeaturedSlides: getFeaturedSlides,
            getSlideImages: getSlideImages,
        }

        return service;

        function getFeaturedSlides() {
            var promise = audioBookService.getFeaturedSlides();

            promise
                .$promise
                .then(function (result) {
                    var images = [];
                    result.forEach(function (slide) {
                        images.push(slide.imageUrl);

                        preloader.preloadImages(images).then(
                            function handleResolve(imageLocations) {
                            },
                            function handleReject(imageLocation) {
                            },
                            function handleNotify(event) {
                            }
                        );
                    });
                });

            return promise;
        }

        function getSlideImages() {
            var deferred = $q.defer();

            audioBookService.getFeaturedSlides()
            .$promise
                .then(function (result) {
                    var images = getImages(result);

                    var userAgent = $window.navigator.userAgent;
                    if (userAgent.toLowerCase().indexOf('prerender') == -1) {
                        preloader.preloadImages(images.desktop.concat(images.mobile)).then(
                            function handleResolve(imageLocations) {
                                deferred.resolve(images);
                            }
                        );
                    } else {
                        //do not preload images if the request is from prerender agent.
                        deferred.resolve(images);
                    }
                });

            return deferred.promise;
        }

        function getImages(slides) {
            var isAuthenticated = $rootScope.isAuthenticated || false;
            var isFirstTime = !$rootScope.clientInfo.loggedin;

            var images = { desktop: [], mobile: [] };

            if (slides) {
                slides.forEach(function (slide) {
                    if (slide.slideType == 0) { //WebDesktop
                        if (slide.viewMode == 2) {  //both
                            images.desktop.push(slide.imageUrl);
                        } else if (slide.viewMode == 1 && isAuthenticated) { //authenticated
                            images.desktop.push(slide.imageUrl);
                        } else if (slide.viewMode == 0 && !isAuthenticated) {   //not authenticated
                            images.desktop.push(slide.imageUrl);
                        } else if (slide.viewMode == 3 && isFirstTime) {   //First Time Visitor
                            images.desktop.push(slide.imageUrl);
                        } else if (slide.viewMode == 4 && $rootScope.userActivityInfo && $rootScope.userActivityInfo.purchaseStatus.hasPurchased
                            && !$rootScope.userActivityInfo.subscriptionStatus.hasActiveSubscription) {   //Subscription slide
                            images.desktop.push(slide.imageUrl);
                        }
                    }
                    else if (slide.slideType == 1) {    //WebMobile
                        images.mobile.push(slide.imageUrl);
                    }
                });
            }

            return images;
        }
    }]);
angular.module('app').factory('OrderService',
    ['$resource', function ($resource) {

        var manager = $resource('/api/orders/:action/:id', null, {
            getOrderConfirmInfo: { method: 'POST', params: { action: 'info', id: '@id' } },
            getPurchaseHistory: { method: 'POST', params: { action: 'history' }, isArray: true },
            getOrderItems: { method: 'POST', params: { action: 'items', id: '@id' }, isArray: true },
            processPayment: { method: 'POST', params: { action: 'payment', id: '@id' } },
            cancelOrder: { method: 'POST', params: { action: 'cancel', id: '@id' } },
            getUserActivityInfo: { method: 'POST', params: { action: 'user-activity-info' } },
        });

        return manager;

    }]);
angular.module('app').factory('PageService', function () {
    var title = '', description = '', keywords = '', url = '', image = '', audio = '', statusCode = '200';
    return {
        getTitle: function () { return title; },
        setTitle: function (newTitle) { title = newTitle; },

        getDescription: function () { return description; },
        setDescription: function (newDescription) { description = newDescription; },

        getKeywords: function () { return keywords; },
        setKeywords: function (newKeywords) { keywords = newKeywords; },

        getUrl: function () { return url; },
        setUrl: function (newUrl) { url = newUrl; },

        getImage: function () { return image; },
        setImage: function (newImage) { image = newImage; },

        getAudio: function () { return audio; },
        setAudio: function (newAudio) { audio = newAudio; },

        getStatusCode: function () { return statusCode; },
        setStatusCode: function (newStatusCode) { statusCode = newStatusCode; },
    };
});
angular.module('app').factory('preloader',
    ['$q', '$rootScope', function ($q, $rootScope) {

        // I manage the preloading of image objects. Accepts an array of image URLs.
        function Preloader(imageLocations) {
            // I am the image SRC values to preload.
            this.imageLocations = imageLocations;
            // As the images load, we'll need to keep track of the load/error
            // counts when announing the progress on the loading.
            this.imageCount = this.imageLocations.length;
            this.loadCount = 0;
            this.errorCount = 0;
            // I am the possible states that the preloader can be in.
            this.states = {
                PENDING: 1,
                LOADING: 2,
                RESOLVED: 3,
                REJECTED: 4
            };
            // I keep track of the current state of the preloader.
            this.state = this.states.PENDING;
            // When loading the images, a promise will be returned to indicate
            // when the loading has completed (and / or progressed).
            this.deferred = $q.defer();
            this.promise = this.deferred.promise;
        }
        // ---
        // STATIC METHODS.
        // ---
        // I reload the given images [Array] and return a promise. The promise
        // will be resolved with the array of image locations.
        Preloader.preloadImages = function (imageLocations) {
            var preloader = new Preloader(imageLocations);
            return (preloader.load());
        };
        // ---
        // INSTANCE METHODS.
        // ---
        Preloader.prototype = {
            // Best practice for "instnceof" operator.
            constructor: Preloader,
            // ---
            // PUBLIC METHODS.
            // ---
            // I determine if the preloader has started loading images yet.
            isInitiated: function isInitiated() {
                return (this.state !== this.states.PENDING);
            },
            // I determine if the preloader has failed to load all of the images.
            isRejected: function isRejected() {
                return (this.state === this.states.REJECTED);
            },
            // I determine if the preloader has successfully loaded all of the images.
            isResolved: function isResolved() {
                return (this.state === this.states.RESOLVED);
            },
            // I initiate the preload of the images. Returns a promise.
            load: function load() {
                // If the images are already loading, return the existing promise.
                if (this.isInitiated()) {
                    return (this.promise);
                }
                this.state = this.states.LOADING;
                for (var i = 0 ; i < this.imageCount ; i++) {
                    this.loadImageLocation(this.imageLocations[i]);
                }
                // Return the deferred promise for the load event.
                return (this.promise);
            },
            // ---
            // PRIVATE METHODS.
            // ---
            // I handle the load-failure of the given image location.
            handleImageError: function handleImageError(imageLocation) {
                this.errorCount++;
                // If the preload action has already failed, ignore further action.
                if (this.isRejected()) {
                    return;
                }
                this.state = this.states.REJECTED;
                this.deferred.reject(imageLocation);
            },
            // I handle the load-success of the given image location.
            handleImageLoad: function handleImageLoad(imageLocation) {
                this.loadCount++;
                // If the preload action has already failed, ignore further action.
                if (this.isRejected()) {
                    return;
                }
                // Notify the progress of the overall deferred. This is different
                // than Resolving the deferred - you can call notify many times
                // before the ultimate resolution (or rejection) of the deferred.
                this.deferred.notify({
                    percent: Math.ceil(this.loadCount / this.imageCount * 100),
                    imageLocation: imageLocation
                });
                // If all of the images have loaded, we can resolve the deferred
                // value that we returned to the calling context.
                if (this.loadCount === this.imageCount) {
                    this.state = this.states.RESOLVED;
                    this.deferred.resolve(this.imageLocations);
                }
            },
            // I load the given image location and then wire the load / error
            // events back into the preloader instance.
            // --
            // NOTE: The load/error events trigger a $digest.
            loadImageLocation: function loadImageLocation(imageLocation) {
                var preloader = this;
                // When it comes to creating the image object, it is critical that
                // we bind the event handlers BEFORE we actually set the image
                // source. Failure to do so will prevent the events from proper
                // triggering in some browsers.
                var image = $(new Image())
                    .load(
                        function (event) {
                            // Since the load event is asynchronous, we have to
                            // tell AngularJS that something changed.
                            $rootScope.$apply(
                                function () {
                                    preloader.handleImageLoad(event.target.src);
                                    // Clean up object reference to help with the
                                    // garbage collection in the closure.
                                    preloader = image = event = null;
                                }
                            );
                        }
                    )
                    .error(
                        function (event) {
                            // Since the load event is asynchronous, we have to
                            // tell AngularJS that something changed.
                            $rootScope.$apply(
                                function () {
                                    preloader.handleImageError(event.target.src);
                                    // Clean up object reference to help with the
                                    // garbage collection in the closure.
                                    preloader = image = event = null;
                                }
                            );
                        }
                    )
                    .prop("src", imageLocation)
                ;
            }
        };
        // Return the factory instance.
        return (Preloader);
    }]);
angular.module('app')
            .factory('RedeemService', ['$http', '$resource', '$rootScope', function ($http, $resource, $rootScope) {

              
                var service = $resource('/api/serial/:action', null, {
                    redeem: { method: 'POST', params: { action: 'redeem', serialNo: '@redeemText' } }
                });
                return service;
            }]);

angular.module('app').factory('SubscriptionService',
    ['$resource', function ($resource) {

        var manager = $resource('/api/subscriptions/:action/:id', null, {
            getSubscriptionPlans: { method: 'GET', url: '/api/subscriptions/plans' },
            getSubscriptionHistory: { method: 'POST', params: { action: 'history' }, isArray: true },
            getSubscriptionGuide: { method: 'GET', url: '/api/settings/subscription-guide' },
        });

        return manager;

    }]);
(function () {
    'use strict';

    angular
        .module('app')
        .factory('userAgentDetector', userAgentDetector);

    userAgentDetector.$inject = ['$window'];

    function userAgentDetector($window) {
        var service = {
            isAndroid: isAndroid
        };

        return service;

        function isAndroid() {

            var userAgent = $window.navigator.userAgent;

            if (userAgent.match(/Android/i)) {
                return true;
            }

            return false;
        }
    }
})();
angular.module('app').factory('UserInterestService',
    ['$resource', function ($resource) {

        var manager = $resource('/api/userinterests', null, {
            'update': { method: 'PUT' },
        });

        return manager;
    }]);
angular.module('app').factory('UserLibraryService',
    ['$resource', function ($resource) {

        var manager = $resource('/api/library', null, {
            getUserLibrary: { method: 'POST', isArray: true },
            trialBook: { method: 'POST', url: '/api/library/trial/:productId/:marketId', params: { productId: '@productId', marketId: '@marketId' } },
            returnTrial: { method: 'POST', url: '/api/library/trial-return', params: { productId: '@productId'} },
        });

        manager.getUserLibraryDic = function () {
            return manager.getUserLibrary().$promise
                .then(function (response) {
                    var result = {};
                    if (response) {
                        response.forEach(function (item) {
                            result[item.productId] = item;
                        });
                    }

                    return result;
                });
        }

        return manager;

    }]);

angular.module('app').factory('UserManager', ['$http', '$resource', '$rootScope', '$analytics', function ($http, $resource, $rootScope, $analytics) {

    var // mIsAuthenticated = false,
        // mUserName = null,
        mAccessToken = null,
        // mReturnUrl = null,
        storageAccessToken = 'access_token',
        storageUserInfo = "userInfo"
    storageClientInfo = "clientInfo";


    var manager = $resource('/api/account/:action', null, {
        registerLite: { method: 'POST', params: { action: 'register' } },
        register: { method: 'POST', params: { action: 'register', email: '@email', password: '@password', confirm: '@confirm', firstname: '@firstname', lastname: '@lastname', newsletter: '@newsletter', market: '@market', birthday: '@birthday', occupation: '@occupation', mobileno: '@mobileno', gender: '@gender' } },
        changePassword: { method: 'POST', params: { action: 'changepassword' } },
        forgotPassword: { method: 'POST', params: { action: 'forgotpassword' } },
        resetPassword: { method: 'POST', params: { action: 'resetpassword' } },
        confirmEmail: { method: 'POST', params: { action: 'confirmemail', userId: '@userId', code: '@code' } },
        editProfile: { method: 'POST', params: { action: 'editprofile' } },
        updateProfile: { method: 'POST', params: { action: 'updateProfile' } },
        getProfile: { method: 'GET', params: { action: 'editprofile' } },
        getOccupations: { method: 'GET', url: '/api/occupations', isArray: true },
        resendVerification: { method: 'POST', params: { action: 'resendverification', email: '@email' } },
        changeEmail: { method: 'POST', params: { action: 'changeemail' } },
    });

    //$rootScope.$on('$locationChangeStart', function () {
    //    // mReturnUrn = $lo
    //});

    if ((mAccessToken = localStorage.getItem(storageAccessToken))) {
        // mIsAuthenticated = true;
        $rootScope.isAuthenticated = true;
        $rootScope.userInfo = fromJSON(localStorage.getItem(storageUserInfo));
    }
    else if ((mAccessToken = sessionStorage.getItem(storageAccessToken))) {
        // mIsAuthenticated = true;
        $rootScope.isAuthenticated = true;
        $rootScope.userInfo = fromJSON(sessionStorage.getItem(storageUserInfo));
    }
    
    //set client info
    var clientInfo = localStorage.getItem(storageClientInfo);
    if (!clientInfo) {
        clientInfo = toJSON({ loggedin: false || ($rootScope.isAuthenticated || false) });
        localStorage.setItem(storageClientInfo, clientInfo);
    }
    $rootScope.clientInfo = fromJSON(clientInfo);


    //var userActivityInfo = localStorage.getItem('userActivityInfo');
    //if (userActivityInfo) {
    //    $rootScope.userActivityInfo = fromJSON(userActivityInfo);
    //}
    

    // set request header for authorization
    if (mAccessToken) {
        //$http.defaults.headers.common.Authorization = "Bearer " + mAccessToken;

        //set userId for GA tracking on page reload.
        if ($rootScope.userInfo) {
            if (!$rootScope.userInfo.userId) {
                //if the user has not userId set, then force him to logout.
                logout();
            } else {
                $analytics.setUsername($rootScope.userInfo.userId);
            }
        }
    }

    manager.getIsAuthenticated = function () {
        // return mIsAuthenticated;
        return $rootScope.isAuthenticated;
    };

    manager.getLoginRequested = function () {
        return $rootScope.loginRequested;
    };

    manager.setLoginRequested = function (value) {
        $rootScope.loginRequested = value;
    };

    manager.getUserName = function () {
        return $rootScope.userInfo ? $rootScope.userInfo.userName : null;
    };

    manager.getUserInfo = function () {
        return $rootScope.userInfo ? $rootScope.userInfo : null;
    };

    manager.getAccessToken = function () {
        return mAccessToken;
    };

    manager.login = function (ticket, persistent) {
        // mIsAuthenticated = true;
        // set global scope properties
        $rootScope.isAuthenticated = true;
        $rootScope.userInfo = { 'userName': ticket.userName, 'firstName': ticket.firstName, 'lastName': ticket.lastName, 'userId': ticket.userId };
        $rootScope.clientInfo.loggedin = true;

        // store token locally for next usage
        mAccessToken = ticket.access_token;

        // set request header for authorization
        //$http.defaults.headers.common.Authorization = "Bearer " + mAccessToken;

        // broadcast an event
        $rootScope.$broadcast('loggedOn', ticket);

        // store token and username in browser storage
        var store = window[(persistent ? 'local' : 'session') + 'Storage'];
        store.setItem(storageAccessToken, ticket.access_token);
        store.setItem(storageUserInfo, toJSON($rootScope.userInfo));
        store.setItem(storageClientInfo, toJSON($rootScope.clientInfo));


        //set GA user id tracking.
        $analytics.setUsername($rootScope.userInfo.userId);
    }


    function logout() {
        //$http({
        //    method: 'POST',
        //    url: 'api/account/logout',
        //});
        // mIsAuthenticated = false;

        // clear global scope properties
        $rootScope.isAuthenticated = false;
        $rootScope.userInfo = null;
        $rootScope.userActivityInfo = null;

        //clear GA user id tracking.
        $analytics.setUsername(null);

        // cleaar stored token
        mAccessToken = null;

        // broadcast an event
        $rootScope.$broadcast('loggedOut');

        // store token and username in browser storage
        localStorage.removeItem('access_token');
        sessionStorage.removeItem('access_token');
        localStorage.removeItem(storageUserInfo);
        sessionStorage.removeItem(storageUserInfo);

        // set request header for authorization
        delete $http.defaults.headers.common.Authorization;
    }
    manager.logout = logout;

    manager.acquireToken = function (credential) {
        return $http({
            method: 'POST',
            url: '/token',
            data: $.param({ 'grant_type': 'password', username: credential.username, password: credential.password }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
    };

    manager.authentication = {
        isAuth: false,
        userName: "",
        useRefreshTokens: false
    };;

    manager.registerExternal = function (registerExternalData) {

        var promise = $http({
            method: 'POST',
            url: '/api/account/registerexternal',
            data: registerExternalData,
        });

        return promise;
    };

    manager.obtainAccessToken = function (externalData) {

        var promise = $http({
            method: 'POST',
            url: '/api/account/ObtainLocalAccessToken',
            data: externalData,
        });

        return promise;
    };

    return manager;

}]);
(function () {
    'use strict';

    angular
        .module('app')
        .factory('authInterceptor', ['$q', '$injector', '$location', '$rootScope', authInterceptor]);

    function authInterceptor($q, $injector, $location, $rootScope) {
        var service = {
            request: request,
            responseError: responseError,
        };

        return service;



        function request(config) {
            config.headers = config.headers || {};
            var userManagerService = getUserManagerService();
            var accessToken = userManagerService.getAccessToken();

            if (accessToken) {
                config.headers.Authorization = 'Bearer ' + accessToken;
            }

            var url = config.url.toLowerCase();

            //append appVersion to html requests (not ng templates) to prevent caching old files.
            if (url.indexOf('.html') > 0 && !config.cache.get(config.url)) {
                if (url.indexOf('?') > 0) {
                    url += '&v=' + appVersion;
                }
                else {
                    url += '?v=' + appVersion;
                }

                config.url = url;
            }

            return config;
        }

        function responseError(rejection) {
            if (rejection.status === 401) {
                $rootScope.$broadcast('event:auth-loginRequired');
            }
            return $q.reject(rejection);
        }

        function getUserManagerService() {
            var auth = $injector.get('UserManager');
            return auth;
        }
    }
})();
/***
 * Service: logger 
 *
 * Provides semantic logging services with help of
 * Angular's $log service that writes to the console and
 * John Papa's 'toastr.js': https://github.com/CodeSeven/toastr
 *
 ***/
angular.module('app').factory('logger', ['$log', logger]);

function logger($log) {

    toastr.options = {
        positionClass: "toast-top-left"
        //positionClass: "toast-bottom-left"
    };

    var service = {
        forSource: forSource,
        log: log,
        logError: logError,
        logSuccess: logSuccess,
        logWarning: logWarning
    };

    return service;

    function forSource(src) {
        return {
            log: function (m, d, s) { log(m, d, src, s); },
            logError: function (m, d, s) { logError(m, d, src, s); },
            logSuccess: function (m, d, s) { logSuccess(m, d, src, s); },
            logWarning: function (m, d, s) { logWarning(m, d, src, s); },
        };
    }

    function log(message, data, source, showToast) {
        logIt(message, data, source, showToast, 'info');
    }

    function logWarning(message, data, source, showToast) {
        logIt(message, data, source, showToast, 'warning');
    }

    function logSuccess(message, data, source, showToast) {
        logIt(message, data, source, showToast, 'success');
    }

    function logError(message, data, source, showToast) {
        logIt(message, data, source, showToast, 'error');
    }

    function logIt(message, data, source, showToast, toastType) {
        var write = (toastType === 'error') ? $log.error : $log.log;
        source = source ? '[' + source + '] ' : '';
        write(source, message, data);

        if (showToast) {
            if (toastType === 'error') {
                toastr.error(message);
            } else if (toastType === 'warning') {
                toastr.warning(message);
            } else if (toastType === 'success') {
                toastr.success(message);
            } else {
                toastr.info(message);
            }
        }
    }
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMubW9kdWxlLmpzIiwiQ3VzdG9tRGlyZWN0aXZlcy5qcyIsImFwcC5qcyIsIm52ckJveEZsaXAuanMiLCJudnJCdG5Mb2FkaW5nLmpzIiwibnZyQ2Fyb3VzZWwuanMiLCJudnJKUGxheWVyLmpzIiwibnZyTGlzdENhcm91c2VsLmpzIiwibnZyTGlzdENhcm91c2VsRnVsbC5qcyIsIm52ckxpc3RDYXJvdXNlbFN1Z2dlc3Rpb24uanMiLCJudnJNYXAuanMiLCJudnJNYXNvbnJ5R2FsbGVyeS5qcyIsIm52ck1peEl0VXAuanMiLCJudnJQYWdlSGVhZGVyLmpzIiwibnZyUGxheVRvZ2dsZS5qcyIsIm52clByZWxvYWRlci5qcyIsIm52clJhdGluZy5qcyIsIm52clNjcm9sbFRvLmpzIiwibnZyU2lkZU5hdi5qcyIsIm52clNpdGVTZWFyY2guanMiLCJudnJTbGlkZXJGdWxsLmpzIiwibnZyU3RpY2t5SGVhZGVyLmpzIiwibnZyVGFic2V0LmpzIiwibnZyVG9nZ2xlLmpzIiwiY29udHJvbGxlcnMvQXBwQ2hlY2tvdXRDb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvQXBwbGljYXRpb25zQ29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL0FzaWRlQ29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL0F1ZGlvQm9va0NvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9BdXRoUmVkaXJlY3RDb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvQm9va1RyaWFsQ2hhbmdlQ29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL0Jvb2tUcmlhbFB1cmNoYXNlQ29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL0Jvb2tUcmlhbFJldHVybkNvbmZpcm1Db250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvQm9va1RyaWFsUmV0dXJuQ29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL0NhcnRSZW1vdmVDb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvQ2F0YWxvZ0NvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9DaGFuZ2VFbWFpbENvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9DaGFuZ2VQYXNzd29yZENvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9DaGFwdGVyc0NvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9DaGVja291dENvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9Db25maXJtRW1haWxDb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvQ29uZmlybVBheW1lbnRDb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9Eb3dubG9hZExpc3RDb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvRmFxQ29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL0ZvcmdvdFBhc3N3b3JkQ29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL0luZGV4Q29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL0xvZ2luTGl0ZUNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9NYXN0ZXJTZWFyY2hDb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvTmF2Q29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL05vdEZvdW5kQ29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL09yZGVyQ2FuY2VsQ29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL09yZGVySXRlbUNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9QbGF5ZXJDb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvUHJvZHVjdENob29zZXJDb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvUHJvZmlsZUNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9Qcm9maWxlU3BlY2lhbE1lbWJlcnNoaXBDb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvUHVyY2hhc2VIaXN0b3J5Q29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL1JlZGVlbUNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9SZXNldFBhc3N3b3JkQ29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL1N1YnNjcmlwdGlvbkNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9TdWJzY3JpcHRpb25IaXN0b3J5Q29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL1RvdGFsU2VhcmNoQ29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL1RyaWFsQWdyZWVtZW50V2l6YXJkQ29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL1VzZXJDb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvVXNlckxpYnJhcnlDb250cm9sbGVyLmpzIiwiZmlsdGVycy9DdXN0b21GaWx0ZXJzLmpzIiwic2VydmljZXMvQW5hbHl0aWNzU2VydmljZS5qcyIsInNlcnZpY2VzL0F1ZGlvQm9va1NlcnZpY2UuanMiLCJzZXJ2aWNlcy9DYXJ0U2VydmljZS5qcyIsInNlcnZpY2VzL0NhdGFsb2dTZXJ2aWNlLmpzIiwic2VydmljZXMvQ2hhcHRlclNlcnZpY2UuanMiLCJzZXJ2aWNlcy9Db250YWN0U2VydmljZS5qcyIsInNlcnZpY2VzL0VudGl0eU1hbmFnZXJGYWN0b3J5LmpzIiwic2VydmljZXMvRmFxU2VydmljZS5qcyIsInNlcnZpY2VzL0ZlYXR1cmVkU2xpZGVTZXJ2aWNlLmpzIiwic2VydmljZXMvT3JkZXJTZXJ2aWNlLmpzIiwic2VydmljZXMvUGFnZVNlcnZpY2UuanMiLCJzZXJ2aWNlcy9QcmVsb2FkZXIuanMiLCJzZXJ2aWNlcy9SZWRlZW1TZXJ2aWNlLmpzIiwic2VydmljZXMvU3Vic2NyaXB0aW9uU2VydmljZS5qcyIsInNlcnZpY2VzL1VzZXJBZ2VudERldGVjdG9yLmpzIiwic2VydmljZXMvVXNlckludGVyZXN0U2VydmljZS5qcyIsInNlcnZpY2VzL1VzZXJMaWJyYXJ5U2VydmljZS5qcyIsInNlcnZpY2VzL1VzZXJNYW5hZ2VyU2VydmljZS5qcyIsImF1dGgtaW50ZXJjZXB0b3IuanMiLCJsb2dnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25TQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2UkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ3VpLm5hdmFhci53aWRnZXRzJywgW1xuICAgIF0pO1xufSkoKTsiLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2N1c3RvbURpcmVjdGl2ZXMnLCBbXSk7XHJcblxyXG5cclxuYXBwLmRpcmVjdGl2ZSgnb25SZXBlYXREb25lJywgZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cikge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLiRsYXN0KSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGVtaXQoXCJyZXBlYXRfZG9uZVwiICsgXCJfXCIgKyAkZWxlbWVudFswXS5wYXJlbnRFbGVtZW50LmlkLCAkZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KTtcclxuXHJcbmFwcC5kaXJlY3RpdmUoXCJjc0RhdGVUb0lzb1wiLCBbJyRmaWx0ZXInLCAnUGVyc2lhbkRhdGVTZXJ2aWNlJywgZnVuY3Rpb24gKCRmaWx0ZXIsIHBkU2VydmljZSkge1xyXG5cclxuICAgIHZhciBsaW5rRnVuY3Rpb24gPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBuZ01vZGVsQ3RybCkge1xyXG5cclxuICAgICAgICBuZ01vZGVsQ3RybC4kcGFyc2Vycy5wdXNoKGZ1bmN0aW9uIChkYXRlcGlja2VyVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKCFkYXRlcGlja2VyVmFsdWUpIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlcGlja2VyVmFsdWUuZ2V0VGltZSgpIC0gKGRhdGVwaWNrZXJWYWx1ZS5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDApKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ld0RhdGU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6IFwiQVwiLFxyXG4gICAgICAgIHJlcXVpcmU6IFwibmdNb2RlbFwiLFxyXG4gICAgICAgIGxpbms6IGxpbmtGdW5jdGlvblxyXG4gICAgfTtcclxufV0pO1xyXG4iLCIvKioqXHJcbiAqIEFwcCBtb2R1bGU6IGFwcCBcclxuICpcclxuICoqKi9cclxuXHJcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xyXG4gICAgLy8gQW5ndWxhciBtb2R1bGVzIFxyXG4gICAgJ25nQW5pbWF0ZScsICAgICAgICAvLyBBbmd1bGFyIGFuaW1hdGlvbnNcclxuICAgICduZ1JvdXRlJywgICAgICAgICAgLy8gQW5ndWxhciByb3V0ZXNcclxuICAgICduZ1Jlc291cmNlJywgICAgICAgLy8gQW5ndWxhciByZXNvdXJjZVxyXG4gICAgJ3VpLmJvb3RzdHJhcCcsICAgICAvLyBBbmd1bGFyIHVpIGJvb3RzdHJhcFxyXG4gICAgJ3VpLnV0aWxzJywgICAgICAvLyBBbmd1bGFyIHVpIHV0aWxzXHJcbiAgICAnaW5maW5pdGUtc2Nyb2xsJywgICAvLyBpbmZpbml0ZSBzY3JvbGwgbW9kdWxlXHJcbiAgICAndWkuYm9vdHN0cmFwLnNob3dFcnJvcnMnLCAgLy8gYW5ndWxhciBzaG93IGVycm9yc1xyXG4gICAgJ3VpLmJvb3RzdHJhcC5wZXJzaWFuLmRhdGVwaWNrZXInLFxyXG4gICAgLy8ndWkuYm9vdHN0cmFwLmRhdGVwaWNrZXInLFxyXG4gICAgJzcyMGtiLnNvY2lhbHNoYXJlJywgLy9hbmd1bGFyIHNvY2lhbCBzaGFyZVxyXG4gICAgJ2FiLWJhc2U2NCcsICAgIC8vYmFzZTY0XHJcbiAgICAnTG9jYWxTdG9yYWdlTW9kdWxlJywgLy9hbmd1bGFyIGxvY2FsIHN0b3JhZ2VcclxuICAgICd0cnVuY2F0ZScsIC8vYW5ndWxhciB0cnVuY2F0ZVxyXG5cclxuICAgIC8vYXBwIGN1c3RvbSB3aWRnZXRzXHJcbiAgICAndWkubmF2YWFyLndpZGdldHMnLFxyXG5cclxuICAgICdjdXN0b21EaXJlY3RpdmVzJywgLy8gQXBwIGN1c3RvbSBkaXJlY3RpdmVzLlxyXG4gICAgJ2N1c3RvbUZpbHRlcnMnLCAgICAvLyBBcHAgY3VzdG9tIGZpbHRlcnMuXHJcblxyXG4gICAgLy9hbmd1bGFydGljc1xyXG4gICAgJ2FuZ3VsYXJ0aWNzJyxcclxuICAgICdhbmd1bGFydGljcy5nb29nbGUuYW5hbHl0aWNzJyxcclxuICAgIC8vJ2FuZ3VsYXJ0aWNzLmluc3BlY3RsZXQnXHJcblxyXG4gICAgLy9hbmd1bGFyIGZlZWRcclxuICAgICdmZWVkcycsXHJcblxyXG4gICAgLy9hbmd1bGFyLWltZy1mYWxsYmFja1xyXG4gICAgJ2RjYkltZ0ZhbGxiYWNrJyxcclxuXHJcbiAgICAvL2FuZ3VsYXIgbG9hZGluZyBiYXJcclxuICAgICdhbmd1bGFyLWxvYWRpbmctYmFyJ1xyXG5dKTtcclxuXHJcbmFwcC5jb25zdGFudCgnTUFSS0VUX0lEJywgJzE3Y2Q3ZGZhLTI1YWUtNDM5My1iODlmLTRjNzdkYzNjZWUyYycpO1xyXG5cclxuLy9UaGlzIGNvbmZpZ3VyZXMgdGhlIHJvdXRlcyBhbmQgYXNzb2NpYXRlcyBlYWNoIHJvdXRlIHdpdGggYSB2aWV3IGFuZCBhIGNvbnRyb2xsZXJcclxuYXBwLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgJyRsb2NhdGlvblByb3ZpZGVyJywgZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xyXG4gICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAud2hlbignLycsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdJbmRleENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvYXBwL3RlbXBsYXRlcy9pbmRleC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZUltYWdlczogWydGZWF0dXJlZFNsaWRlU2VydmljZScsIGZ1bmN0aW9uIChmZWF0dXJlZFNsaWRlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBmZWF0dXJlZFNsaWRlU2VydmljZS5nZXRGZWF0dXJlZFNsaWRlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmVhdHVyZWRTbGlkZVNlcnZpY2UuZ2V0U2xpZGVJbWFnZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn2YbZiNin2LHYjCDZhdix2KzYuSDYrtix24zYryDZiCDYr9in2YbZhNmI2K8g2qnYqtin2Kgg2LXZiNiq24wg2YHYp9ix2LPbjCcsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ9io2YfYqtix24zZhiDZiCDYrNiv24zYryDYqtix24zZhiDaqdiq2KfYqCDZh9in24wg2LXZiNiq24wg2LHYpyDYr9in2YbZhNmI2K8g2qnYsdiv2Ycg2Ygg2K/YsSDaqdin2YXZvtuM2YjYqtix2Iwg2KrYqNmE2Kog2Ygg24zYpyDZhdmI2KjYp9uM2YQg2K7ZiNivINqv2YjYtCDZhtmF2KfbjNuM2K8uJyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAud2hlbignL2NhdGFsb2cnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ2F0YWxvZ0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvYXBwL3RlbXBsYXRlcy9jYXRhbG9nLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfaqdin2KrYp9mE2YjaryDaqdiq2KfYqNmH2KfbjCDYtdmI2KrbjCcsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ9qp2KfYqtin2YTZiNqvINqp2KrYp9io2YfYp9uMINi12YjYqtuMJyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAud2hlbignL2NhdGFsb2cvOmZpbHRlclR5cGUnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ2F0YWxvZ0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvYXBwL3RlbXBsYXRlcy9jYXRhbG9nLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfaqdin2KrYp9mE2YjaryDaqdiq2KfYqNmH2KfbjCDYtdmI2KrbjCcsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ9qp2KfYqtin2YTZiNqvINqp2KrYp9io2YfYp9uMINi12YjYqtuMJyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAud2hlbignL2NhdGFsb2cvOmZpbHRlclR5cGUvOmZpbHRlcklkLzpzbHVnJyxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NhdGFsb2dDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2FwcC90ZW1wbGF0ZXMvY2F0YWxvZy5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn2qnYp9iq2KfZhNmI2q8g2qnYqtin2KjZh9in24wg2LXZiNiq24wnLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICfaqdin2KrYp9mE2YjaryDaqdiq2KfYqNmH2KfbjCDYtdmI2KrbjCcsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLndoZW4oJy9zZWFyY2gvOmtleXdvcmQnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnVG90YWxTZWFyY2hDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2FwcC90ZW1wbGF0ZXMvc2VhcmNoX3Jlc3VsdF90b3RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn2YbYqtin24zYrCDYrNiz2KrYrNmIJyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAud2hlbignL2F1ZGlvYm9vay86YXVkaW9Cb29rSWQvOnNsdWcnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQXVkaW9Cb29rQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9hcHAvdGVtcGxhdGVzL2F1ZGlvYm9va19kZXRhaWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ9io2YfYqtix24zZhiDZiCDYrNiv24zYryDYqtix24zZhiDaqdiq2KfYqCDZh9in24wg2LXZiNiq24wg2LHYpyDYr9in2YbZhNmI2K8g2qnYsdiv2Ycg2Ygg2K/YsSDaqdin2YXZvtuM2YjYqtix2Iwg2KrYqNmE2Kog2Ygg24zYpyDZhdmI2KjYp9uM2YQg2K7ZiNivINqv2YjYtCDZhtmF2KfbjNuM2K8uJyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAud2hlbignL2NoZWNrb3V0JyxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NoZWNrb3V0Q29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9hcHAvdGVtcGxhdGVzL2NoZWNrb3V0Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfYrtix24zYryDZhdit2LXZiNmE2KfYqicsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLndoZW4oJy9hcHAtY2hlY2tvdXQnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQXBwQ2hlY2tvdXRDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2FwcC90ZW1wbGF0ZXMvYXBwLWNoZWNrb3V0Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfYrtix24zYryDZhdit2LXZiNmE2KfYqicsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgIC53aGVuKCcvY29uZmlybS1wYXltZW50LzpvcmRlcklkLzpzdGF0dXMnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29uZmlybVBheW1lbnRDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2FwcC90ZW1wbGF0ZXMvY29uZmlybS1wYXltZW50Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfYqtin24zbjNivINiz2YHYp9ix2LQnLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vLndoZW4oJy9jb25maXJtLW9yZGVyJyxcclxuICAgICAgICAvL3tcclxuICAgICAgICAvLyAgICB0ZW1wbGF0ZVVybDogJy9hcHAvdGVtcGxhdGVzL2NvbmZpcm0tb3JkZXIuaHRtbCcsXHJcbiAgICAgICAgLy8gICAgdGl0bGU6ICfYqtin24zbjNivINiz2YHYp9ix2LQnLFxyXG4gICAgICAgIC8vfSlcclxuICAgICAgICAud2hlbignL2ZvcmdvdC1wYXNzd29yZCcsIHtcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0ZvcmdvdFBhc3N3b3JkQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2FwcC90ZW1wbGF0ZXMvZm9yZ290LXBhc3N3b3JkLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHRpdGxlOiAn2KjYp9iy24zYp9io24wg2LHZhdiyINi52KjZiNixJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC53aGVuKCcvY29uZmlybS1lbWFpbCcsIHtcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0NvbmZpcm1FbWFpbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9hcHAvdGVtcGxhdGVzL2NvbmZpcm1fZW1haWwuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgdGl0bGU6ICfYqtin24zbjNivINit2LPYp9ioINqp2KfYsdio2LHbjCcsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAud2hlbignL3Jlc2V0LXBhc3N3b3JkJywge1xyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnUmVzZXRQYXNzd29yZENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9hcHAvdGVtcGxhdGVzL3Jlc2V0X3Bhc3N3b3JkLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHRpdGxlOiAn2KrYuduM24zZhiDYsdmF2LIg2LnYqNmI2LEg2KzYr9uM2K8nLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgIC53aGVuKCcvcmVkZWVtJywge1xyXG4gICAgICAgICAgICAgY29udHJvbGxlcjogJ1JlZGVlbUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvYXBwL3RlbXBsYXRlcy9yZWRlZW0uaHRtbCcsXHJcbiAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgICB0aXRsZTogJ9ir2KjYqiDaqdivINmH2K/bjNmHJyxcclxuICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAn2KjYpyDYq9io2Kog2qnYryDZh9iv24zZh9iMINmG2LPYrtmHINiv24zYrNuM2KrYp9mEINqp2KrYp9ioINi12YjYqtuMINmF2LHYqNmI2LfZhyDYsdinINio2Ycg2qnYqtin2KjYrtin2YbZhyDYr9uM2KzbjNiq2KfZhCDYrtmI2K8g2KfYttin2YHZhyDZhtmF2KfbjNuM2K8uJyxcclxuICAgICAgICAgfSlcclxuICAgICAgICAud2hlbignL3VzZXInLCB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdVc2VyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2FwcC90ZW1wbGF0ZXMvdXNlci5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICAvL3JlbG9hZE9uU2VhcmNoOiBmYWxzZSxcclxuICAgICAgICAgICAgdGl0bGU6ICfYrdiz2KfYqCDaqdin2LHYqNix24wg2YXZhicsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAud2hlbignLzQwNCcsIHtcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ05vdEZvdW5kQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2FwcC90ZW1wbGF0ZXMvNDA0Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHRpdGxlOiAn2K7Yt9in24wgNDA0JyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC53aGVuKCcvY29udGFjdCcsIHtcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0NvbnRhY3RDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvYXBwL3RlbXBsYXRlcy9jb250YWN0Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHRpdGxlOiAn2KrZhdin2LMg2KjYpyDZhdinJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICfYqtmF2KfYsyDYqNinJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC53aGVuKCcvYWJvdXQnLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2FwcC90ZW1wbGF0ZXMvYWJvdXQuaHRtbCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiAn2K/Ysdio2KfYsdmHINmF2KcnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ9iv2LHYqNin2LHZhycsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAud2hlbignL2ZhcScsIHtcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0ZhcUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9hcHAvdGVtcGxhdGVzL2ZhcS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICB0aXRsZTogJ9iz2YjYp9mE2KfYqiDZhdiq2K/Yp9mI2YQnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ9iz2YjYp9mE2KfYqiDZhdiq2K/Yp9mI2YQnLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLndoZW4oJy9hcHBsaWNhdGlvbnMnLCB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBcHBsaWNhdGlvbnNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvYXBwL3RlbXBsYXRlcy9hcHBsaWNhdGlvbnMuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgdGl0bGU6ICfYqNix2YbYp9mF2Ycg2YfYpycsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAn2KjYsdmG2KfZhdmHINmH2KcnLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLndoZW4oJy9wcml2YWN5Jywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9hcHAvdGVtcGxhdGVzL3ByaXZhY3kuaHRtbCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiAn2K3YsduM2YUg2K7YtdmI2LXbjCcsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAn2K3YsduM2YUg2K7YtdmI2LXbjCcsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAud2hlbignL2F1dGgtcmVkaXJlY3QnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhSZWRpcmVjdENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9hcHAvdGVtcGxhdGVzL2F1dGgtcmVkaXJlY3QuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgdGl0bGU6ICfYqtin24zbjNivINmH2YjbjNiqJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC53aGVuKCcvc3Vic2NyaXB0aW9uJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdTdWJzY3JpcHRpb25Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvYXBwL3RlbXBsYXRlcy9zdWJzY3JpcHRpb24uaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgdGl0bGU6ICfYp9i02KrYsdin2qkg2K/YsduM2KfZgdiqINqp2KrYp9ioINmH2KfbjCDYtdmI2KrbjCcsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAub3RoZXJ3aXNlKHsgcmVkaXJlY3RUbzogJy80MDQnIH0pO1xyXG5cclxuICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcclxuICAgICRsb2NhdGlvblByb3ZpZGVyLmhhc2hQcmVmaXgoJyEnKTtcclxufV0pO1xyXG5cclxuYXBwLmNvbmZpZyhbJyRjb21waWxlUHJvdmlkZXInLCBmdW5jdGlvbiAoJGNvbXBpbGVQcm92aWRlcikge1xyXG4gICAgJGNvbXBpbGVQcm92aWRlci5hSHJlZlNhbml0aXphdGlvbldoaXRlbGlzdCgvXlxccyooaHR0cHM/fG1haWx0b3xuYXZhYXJhcHApOi8pO1xyXG59XSk7XHJcblxyXG5hcHAuY29uZmlnKFsnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XHJcbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdhdXRoSW50ZXJjZXB0b3InKTtcclxufV0pO1xyXG5cclxuLy9hcHAuY29uZmlnKFsnY2ZwTG9hZGluZ0JhclByb3ZpZGVyJywgZnVuY3Rpb24gKGNmcExvYWRpbmdCYXJQcm92aWRlcikge1xyXG4vLyAgICAvL2NmcExvYWRpbmdCYXJQcm92aWRlci5wYXJlbnRTZWxlY3RvciA9ICcjaGVhZGVyJztcclxuLy8gICAgLy9jZnBMb2FkaW5nQmFyUHJvdmlkZXIuc3Bpbm5lclRlbXBsYXRlID0gJzxkaXY+PHNwYW4gY2xhc3M9XCJmYSBmYS1zcGlubmVyXCI+Q3VzdG9tIExvYWRpbmcgTWVzc2FnZS4uLjwvZGl2Pic7XHJcbi8vfV0pO1xyXG5cclxuYXBwLnJ1bihbJyRyb290U2NvcGUnLCAnUGFnZVNlcnZpY2UnLCAnJHRpbWVvdXQnLCAnQU5BTFlUSUNTJywgJyRodHRwJywgJ2xvY2FsU3RvcmFnZVNlcnZpY2UnLCAnJHJvdXRlJywgZnVuY3Rpb24gKCRyb290U2NvcGUsIFBhZ2VTZXJ2aWNlLCAkdGltZW91dCwgQU5BTFlUSUNTLCAkaHR0cCwgbG9jYWxTdG9yYWdlU2VydmljZSwgJHJvdXRlKSB7XHJcbiAgICAkcm9vdFNjb3BlLlBhZ2UgPSBQYWdlU2VydmljZTtcclxuICAgICRyb290U2NvcGUubnZyQW5hbHl0aWNzID0gQU5BTFlUSUNTO1xyXG5cclxuICAgIHZhciBhID0gR3VpZC5jcmVhdGUoKS52YWx1ZTtcclxuXHJcbiAgICB2YXIgZGV2aWNlSWQgPSBsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnZGV2aWNlLWlkJykgfHwgR3VpZC5jcmVhdGUoKS52YWx1ZTtcclxuICAgIGxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KCdkZXZpY2UtaWQnLCBkZXZpY2VJZCk7XHJcblxyXG4gICAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ2NsaWVudC1pZCddID0gJzMnO1xyXG4gICAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ3ZlcnNpb24tY29kZSddID0gJzAnO1xyXG4gICAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ2FwaS1sZXZlbCddID0gJzEnO1xyXG4gICAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ2RldmljZS1pZCddID0gZGV2aWNlSWQ7XHJcblxyXG4gICAgLy8kcm9vdFNjb3BlLiRvbignJGxvY2F0aW9uQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIC8vfSk7XHJcblxyXG4gICAgJHJvb3RTY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbiAoZXZlbnQsIGN1cnJlbnQsIHByZXZpb3VzKSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQuJCRyb3V0ZSkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLlBhZ2Uuc2V0VGl0bGUoY3VycmVudC4kJHJvdXRlLnRpdGxlKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5QYWdlLnNldERlc2NyaXB0aW9uKGN1cnJlbnQuJCRyb3V0ZS5kZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuUGFnZS5zZXRLZXl3b3JkcyhjdXJyZW50LiQkcm91dGUua2V5d29yZHMpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLlBhZ2Uuc2V0VXJsKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50LiQkcm91dGUub3JpZ2luYWxQYXRoID09ICcvNDA0Jykge1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5QYWdlLnNldFN0YXR1c0NvZGUoJzQwNCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2JyaW5nIGJhY2sgdGhlIGZvb3RlciBhZnRlciBhIHNtYWxsIGRlbGF5IGZvciBzbW9vdGhlciBhbmltYXRpb24uXHJcbiAgICAgICAgLy8kdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gICAgJHJvb3RTY29wZS5zaG93Rm9vdGVyID0gdHJ1ZTtcclxuICAgICAgICAvL30sIDUwMClcclxuICAgIH0pO1xyXG5cclxuICAgICRyb290U2NvcGUuJG9uKCdldmVudDphdXRoLWxvZ2luUmVxdWlyZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCRyb290U2NvcGUuaXNBdXRoZW50aWNhdGVkKSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUubG9nb3V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghJHJvb3RTY29wZS5sb2dpblJlcXVlc3RlZCkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmxvZ2luUmVxdWVzdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5sb2dpbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICRyb290U2NvcGUuaXNBY3RpdmVSb3V0ZSA9IGZ1bmN0aW9uIChwYXRoKSB7XHJcbiAgICAgICAgaWYgKCRyb3V0ZS5jdXJyZW50ICYmICRyb3V0ZS5jdXJyZW50LnJlZ2V4cCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJHJvdXRlLmN1cnJlbnQucmVnZXhwLnRlc3QocGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcbn1dKTtcclxuXHJcbi8vdmFyIHNlcnZpY2VCYXNlID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6NTI3NjIvJztcclxuLy92YXIgc2VydmljZUJhc2UgPSAnaHR0cDovL3d3dy5uYXZhYXIuaXIvJztcclxudmFyIHNlcnZpY2VCYXNlID0gJyc7XHJcbmFwcC5jb25zdGFudCgnbmdBdXRoU2V0dGluZ3MnLCB7XHJcbiAgICBhcGlTZXJ2aWNlQmFzZVVyaTogc2VydmljZUJhc2UsXHJcbiAgICBjbGllbnRJZDogJ25nQXV0aEFwcCdcclxufSk7XHJcblxyXG5cclxuXHJcbiIsImFuZ3VsYXIubW9kdWxlKCd1aS5uYXZhYXIud2lkZ2V0cycpXHJcbi5kaXJlY3RpdmUoJ252ckJveEZsaXAnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRUEnLFxyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cikge1xyXG5cclxuICAgICAgICAgICAgLy9TTUFSVFlcclxuICAgICAgICAgICAgLy9pZihqUXVlcnkoJy5ib3gtZmxpcCcpLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgIC8vXHRqUXVlcnkoJy5ib3gtZmxpcCcpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vXHRcdF9oZWlnaHQxID0galF1ZXJ5KCcuYm94MScsdGhpcykub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgICAgICAgLy9cdFx0X2hlaWdodDIgPSBqUXVlcnkoJy5ib3gyJyx0aGlzKS5vdXRlckhlaWdodCgpO1xyXG5cclxuICAgICAgICAgICAgLy9cdFx0aWYoX2hlaWdodDEgPj0gX2hlaWdodDIpIHtcclxuICAgICAgICAgICAgLy9cdFx0XHRfaGVpZ2h0ID0gX2hlaWdodDE7XHJcbiAgICAgICAgICAgIC8vXHRcdH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vXHRcdFx0X2hlaWdodCA9IF9oZWlnaHQyO1xyXG4gICAgICAgICAgICAvL1x0XHR9XHJcblxyXG4gICAgICAgICAgICAvL1x0XHRqUXVlcnkodGhpcykuY3NzKHtcIm1pbi1oZWlnaHRcIjpfaGVpZ2h0K1wicHhcIn0pO1xyXG4gICAgICAgICAgICAvL1x0XHRqUXVlcnkoJy5ib3gxJyx0aGlzKS5jc3Moe1wibWluLWhlaWdodFwiOl9oZWlnaHQrXCJweFwifSk7XHJcbiAgICAgICAgICAgIC8vXHRcdGpRdWVyeSgnLmJveDInLHRoaXMpLmNzcyh7XCJtaW4taGVpZ2h0XCI6X2hlaWdodCtcInB4XCJ9KTtcclxuICAgICAgICAgICAgLy9cdH0pO1xyXG5cclxuICAgICAgICAgICAgLy9cdGpRdWVyeSgnLmJveC1mbGlwJykuaG92ZXIoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vXHRcdGpRdWVyeSh0aGlzKS5hZGRDbGFzcygnZmxpcCcpO1xyXG4gICAgICAgICAgICAvL1x0fSxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAvL1x0XHRqUXVlcnkodGhpcykucmVtb3ZlQ2xhc3MoJ2ZsaXAnKTtcclxuICAgICAgICAgICAgLy9cdH0pO1xyXG4gICAgICAgICAgICAvL31cclxuXHJcblxyXG4gICAgICAgICAgICAvL0FyYXNoXHJcbiAgICAgICAgICAgIC8vaWYgbm90IHVzZSBsb2FkIGZ1bmN0aW9uLCB0aGUgb3V0ZXIgaGVpZ2h0IGlzIGNhbGN1bGF0ZWQgd3JvbmcgZHVlIHRvIHRoZSBpbWFnZSBoYXZpbmcgbm90IGxvYWRlZCB5ZXQuXHJcbiAgICAgICAgICAgICRlbGVtZW50LmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGltYWdlID0galF1ZXJ5KCcuYm94MSBpbWcnLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbWFnZS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfc2hvd0ZsaXAoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIF9zaG93RmxpcCgpIHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9oZWlnaHQxID0galF1ZXJ5KCcuYm94MScsIHRoaXMpLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2hlaWdodDIgPSBqUXVlcnkoJy5ib3gyJywgdGhpcykub3V0ZXJIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9oZWlnaHQxID49IF9oZWlnaHQyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9oZWlnaHQgPSBfaGVpZ2h0MTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfaGVpZ2h0ID0gX2hlaWdodDI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkodGhpcykuY3NzKHsgXCJtaW4taGVpZ2h0XCI6IF9oZWlnaHQgKyBcInB4XCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcuYm94MScsIHRoaXMpLmNzcyh7IFwibWluLWhlaWdodFwiOiBfaGVpZ2h0ICsgXCJweFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnLmJveDInLCB0aGlzKS5jc3MoeyBcIm1pbi1oZWlnaHRcIjogX2hlaWdodCArIFwicHhcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmhvdmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkodGhpcykuYWRkQ2xhc3MoJ2ZsaXAnKTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkodGhpcykucmVtb3ZlQ2xhc3MoJ2ZsaXAnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCd1aS5uYXZhYXIud2lkZ2V0cycpXHJcbi5kaXJlY3RpdmUoJ252ckJ0bkxvYWRpbmcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzY29wZS4kZXZhbChhdHRycy5idG5Mb2FkaW5nKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhcImRpc2FibGVkXCIpLmF0dHIoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ3Jlc2V0VGV4dCcsIGVsZW1lbnQuaHRtbCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKGVsZW1lbnQuZGF0YSgnbG9hZGluZycpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNjb3BlLiRldmFsKGF0dHJzLm5nRGlzYWJsZWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKGVsZW1lbnQuZGF0YSgncmVzZXRUZXh0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuKTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ3VpLm5hdmFhci53aWRnZXRzJylcclxuLmRpcmVjdGl2ZSgnbnZyQ2Fyb3VzZWwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRUEnLFxyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cikge1xyXG5cclxuICAgICAgICAgICAgLy9TTUFSVFlcclxuXHJcbiAgICAgICAgICAgIC8vQXJhc2hcclxuICAgICAgICAgICAgLy92YXIgc2xpZGVyID0galF1ZXJ5KHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgc2xpZGVyID0gJGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gc2xpZGVyLmF0dHIoJ2RhdGEtcGx1Z2luLW9wdGlvbnMnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFByb2dyZXNzIEJhclxyXG4gICAgICAgICAgICB2YXIgJG9wdCA9IGV2YWwoJygnICsgb3B0aW9ucyArICcpJyk7ICAvLyBjb252ZXJ0IHRleHQgdG8ganNvblxyXG5cclxuICAgICAgICAgICAgaWYgKCRvcHQucHJvZ3Jlc3NCYXIgPT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWZ0ZXJJbml0ID0gcHJvZ3Jlc3NCYXI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWZ0ZXJJbml0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBkZWZhdWx0cyA9IHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zOiA1LFxyXG4gICAgICAgICAgICAgICAgaXRlbXNDdXN0b206IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaXRlbXNEZXNrdG9wOiBbMTE5OSwgNF0sXHJcbiAgICAgICAgICAgICAgICBpdGVtc0Rlc2t0b3BTbWFsbDogWzk4MCwgMy4zXSxcclxuICAgICAgICAgICAgICAgIGl0ZW1zVGFibGV0OiBbNzY4LCAyLjNdLFxyXG4gICAgICAgICAgICAgICAgaXRlbXNUYWJsZXRTbWFsbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpdGVtc01vYmlsZTogWzQ3OSwgMS4zXSxcclxuICAgICAgICAgICAgICAgIHNpbmdsZUl0ZW06IHRydWUsXHJcbiAgICAgICAgICAgICAgICBpdGVtc1NjYWxlVXA6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIHNsaWRlU3BlZWQ6IDIwMCxcclxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb25TcGVlZDogODAwLFxyXG4gICAgICAgICAgICAgICAgcmV3aW5kU3BlZWQ6IDEwMDAsXHJcblxyXG4gICAgICAgICAgICAgICAgYXV0b1BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc3RvcE9uSG92ZXI6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvblRleHQ6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwiZmEgZmEtYW5nbGUtbGVmdFwiPjwvaT4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGkgY2xhc3M9XCJmYSBmYS1hbmdsZS1yaWdodFwiPjwvaT4nXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgcmV3aW5kTmF2OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsUGVyUGFnZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb25OdW1iZXJzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2l2ZVJlZnJlc2hSYXRlOiAyMDAsXHJcbiAgICAgICAgICAgICAgICByZXNwb25zaXZlQmFzZVdpZHRoOiB3aW5kb3csXHJcblxyXG4gICAgICAgICAgICAgICAgYmFzZUNsYXNzOiBcIm93bC1jYXJvdXNlbFwiLFxyXG4gICAgICAgICAgICAgICAgdGhlbWU6IFwib3dsLXRoZW1lXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgbGF6eUxvYWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbGF6eUZvbGxvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGxhenlFZmZlY3Q6IFwiZmFkZVwiLFxyXG5cclxuICAgICAgICAgICAgICAgIGF1dG9IZWlnaHQ6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIGpzb25QYXRoOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGpzb25TdWNjZXNzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICBkcmFnQmVmb3JlQW5pbUZpbmlzaDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG1vdXNlRHJhZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRvdWNoRHJhZzogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uU3R5bGU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIGFkZENsYXNzQWN0aXZlOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICBiZWZvcmVVcGRhdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYWZ0ZXJVcGRhdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYmVmb3JlSW5pdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBhZnRlckluaXQ6IGFmdGVySW5pdCxcclxuICAgICAgICAgICAgICAgIGJlZm9yZU1vdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYWZ0ZXJNb3ZlOiAoYWZ0ZXJJbml0ID09IGZhbHNlKSA/IGZhbHNlIDogbW92ZWQsXHJcbiAgICAgICAgICAgICAgICBhZnRlckFjdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzdGFydERyYWdnaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGFmdGVyTGF6eUxvYWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBjb25maWcgPSBqUXVlcnkuZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucywgc2xpZGVyLmRhdGEoXCJwbHVnaW4tb3B0aW9uc1wiKSk7XHJcbiAgICAgICAgICAgIC8vQXJhc2ggLS0+IGRlbGF5IHRoZSBpbml0aWFsaXphdGlvblxyXG4gICAgICAgICAgICAvL3NsaWRlci5vd2xDYXJvdXNlbChjb25maWcpLmFkZENsYXNzKFwib3dsLWNhcm91c2VsLWluaXRcIik7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gUHJvZ3Jlc3MgQmFyXHJcbiAgICAgICAgICAgIC8vQXJhc2hcclxuICAgICAgICAgICAgLy92YXIgZWxlbSA9IGpRdWVyeSh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIGVsZW0gPSAkZWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgIC8vSW5pdCBwcm9ncmVzc0JhciB3aGVyZSBlbGVtIGlzICQoXCIjb3dsLWRlbW9cIilcclxuICAgICAgICAgICAgZnVuY3Rpb24gcHJvZ3Jlc3NCYXIoZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgJGVsZW0gPSBlbGVtO1xyXG4gICAgICAgICAgICAgICAgLy9idWlsZCBwcm9ncmVzcyBiYXIgZWxlbWVudHNcclxuICAgICAgICAgICAgICAgIGJ1aWxkUHJvZ3Jlc3NCYXIoKTtcclxuICAgICAgICAgICAgICAgIC8vc3RhcnQgY291bnRpbmdcclxuICAgICAgICAgICAgICAgIHN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vY3JlYXRlIGRpdiNwcm9ncmVzc0JhciBhbmQgZGl2I2JhciB0aGVuIHByZXBlbmQgdG8gJChcIiNvd2wtZGVtb1wiKVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBidWlsZFByb2dyZXNzQmFyKCkge1xyXG4gICAgICAgICAgICAgICAgJHByb2dyZXNzQmFyID0galF1ZXJ5KFwiPGRpdj5cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInByb2dyZXNzQmFyXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgJGJhciA9IGpRdWVyeShcIjxkaXY+XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJiYXJcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAkcHJvZ3Jlc3NCYXIuYXBwZW5kKCRiYXIpLnByZXBlbmRUbygkZWxlbSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHN0YXJ0KCkge1xyXG4gICAgICAgICAgICAgICAgLy9yZXNldCB0aW1lclxyXG4gICAgICAgICAgICAgICAgcGVyY2VudFRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgaXNQYXVzZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy9ydW4gaW50ZXJ2YWwgZXZlcnkgMC4wMSBzZWNvbmRcclxuICAgICAgICAgICAgICAgIHRpY2sgPSBzZXRJbnRlcnZhbChpbnRlcnZhbCwgMTApO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciB0aW1lID0gNzsgLy8gdGltZSBpbiBzZWNvbmRzXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGludGVydmFsKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzUGF1c2UgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudFRpbWUgKz0gMSAvIHRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJhci5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogcGVyY2VudFRpbWUgKyBcIiVcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgcGVyY2VudFRpbWUgaXMgZXF1YWwgb3IgZ3JlYXRlciB0aGFuIDEwMFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwZXJjZW50VGltZSA+PSAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zbGlkZSB0byBuZXh0IGl0ZW0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtLnRyaWdnZXIoJ293bC5uZXh0JylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vcGF1c2Ugd2hpbGUgZHJhZ2dpbmcgXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHBhdXNlT25EcmFnZ2luZygpIHtcclxuICAgICAgICAgICAgICAgIGlzUGF1c2UgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL21vdmVkIGNhbGxiYWNrXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1vdmVkKCkge1xyXG4gICAgICAgICAgICAgICAgLy9jbGVhciBpbnRlcnZhbFxyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpY2spO1xyXG4gICAgICAgICAgICAgICAgLy9zdGFydCBhZ2FpblxyXG4gICAgICAgICAgICAgICAgc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJ3JlcGVhdF9kb25lJyArICdfJyArICRlbGVtZW50WzBdLmlkLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXIub3dsQ2Fyb3VzZWwoY29uZmlnKS5hZGRDbGFzcyhcIm93bC1jYXJvdXNlbC1pbml0XCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ3VpLm5hdmFhci53aWRnZXRzJylcclxuLmRpcmVjdGl2ZSgnbnZySlBsYXllcicsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICBtcDM6ICc9JyxcclxuICAgICAgICAgICAgb2dnOiAnPScsXHJcbiAgICAgICAgICAgIHRpdGxlOiAnPScsIFxyXG4gICAgICAgICAgICBzd2ZQYXRoOiAnPScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlL2pwbGF5ZXIvanBsYXllci5odG1sJyxcclxuICAgICAgICByZXBsYWNlOiB0cnVlLFxyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgICAgICAgdmFyIHVwZGF0ZVBsYXllciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghc2NvcGUubXAzKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGpFbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KCcjanF1ZXJ5X2pwbGF5ZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICBqRWxlbWVudC5qUGxheWVyKFwiZGVzdHJveVwiKTtcclxuICAgICAgICAgICAgICAgIGpFbGVtZW50LmpQbGF5ZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWR5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykualBsYXllcignc2V0TWVkaWEnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogc2NvcGUudGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZ2E6IHNjb3BlLm9nZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1wMzogc2NvcGUubXAzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5qUGxheWVyKCdwbGF5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzd2ZQYXRoOiBzY29wZS5zd2ZQYXRoLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1cHBsaWVkOiAnb2dhLCBtcDMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHdtb2RlOiAnd2luZG93JyxcclxuICAgICAgICAgICAgICAgICAgICBzbW9vdGhQbGF5QmFyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGtleUVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVtYWluaW5nRHVyYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlRHVyYXRpb246IHRydWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzY29wZS4kd2F0Y2goJ21wMycsIHVwZGF0ZVBsYXllcik7XHJcblxyXG4gICAgICAgICAgICB1cGRhdGVQbGF5ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKFwidWkubmF2YWFyLndpZGdldHNcIikucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsIGZ1bmN0aW9uICgkdGVtcGxhdGVDYWNoZSkge1xyXG4gICAgJHRlbXBsYXRlQ2FjaGUucHV0KFwidGVtcGxhdGUvanBsYXllci9qcGxheWVyLmh0bWxcIixcclxuICAgICAgICAnPGRpdj4nICtcclxuICAgICAgICAgICAgJzxkaXYgaWQ9XCJqcXVlcnlfanBsYXllclwiIGNsYXNzPVwianAtanBsYXllclwiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAnPGRpdiBpZD1cImpwX2NvbnRhaW5lcl8xXCIgY2xhc3M9XCJqcC1hdWRpb1wiPicgK1xyXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJqcC10eXBlLXNpbmdsZVwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwianAtZ3VpIGpwLWludGVyZmFjZVwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNvbC1tZC0xIGNvbC1zbS0xIGNvbC14cy0zXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHVsIGNsYXNzPVwianAtY29udHJvbHNcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGxpPjxhIGhyZWY9XCJqYXZhc2NyaXB0OjtcIiBjbGFzcz1cImpwLXBsYXlcIiB0YWJpbmRleD1cIjFcIj7Zvtiu2LQ8L2E+PC9saT4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGxpPjxhIGhyZWY9XCJqYXZhc2NyaXB0OjtcIiBjbGFzcz1cImpwLXBhdXNlXCIgdGFiaW5kZXg9XCIxXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj7YqtmI2YLZgTwvYT48L2xpPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvdWw+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjb2wtbWQtMTAgY29sLXNtLTEwIGNvbC14cy04XCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImpwLXRpdGxlIHRydW5jYXRlXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzx1bD4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxsaT48L2xpPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3VsPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJqcC1wcm9ncmVzc1wiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwianAtc2Vlay1iYXJcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJqcC1wbGF5LWJhclwiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwianAtdGltZS1ob2xkZXJcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImpwLWN1cnJlbnQtdGltZVwiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwianAtZHVyYXRpb25cIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNvbC1tZC0xIGNvbC1zbS0xIGNvbC14cy0xXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJm5ic3AnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImpwLW5vLXNvbHV0aW9uXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICfYrNmH2Kog2b7Yrti0INqp2KrYp9ioINi12YjYqtuM2Iwg2YXYsdmI2LHar9ixINiu2YjYryDYsdinINio2LHZiNiyINix2LPYp9mG24wg2YbZhdin24zbjNivINmIINuM2KcgPGEgaHJlZj1cImh0dHA6Ly9nZXQuYWRvYmUuY29tL2ZsYXNocGxheWVyL1wiIHRhcmdldD1cIl9ibGFua1wiPtm+2YTYp9qv24zZhiDZgdmE2LQ8L2E+INiu2YjYryDYsdinINio2LHZiNiyINmG2YXYp9uM24zYry4nICtcclxuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAnPC9kaXY+JyArXHJcbiAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAnPC9kaXY+Jyk7XHJcbn1dKTsiLCJhbmd1bGFyLm1vZHVsZSgndWkubmF2YWFyLndpZGdldHMnKVxyXG4uZGlyZWN0aXZlKCdudnJMaXN0Q2Fyb3VzZWwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRUEnLFxyXG4gICAgICAgIHJlcXVpcmU6ICdeY2Fyb3VzZWwnLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnL2FwcC90ZW1wbGF0ZXMvY2Fyb3VzZWxfbGlzdF9ub3JtYWwuaHRtbCcsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgaXRlbXM6ICc9JyxcclxuICAgICAgICAgICAgcHJldklkOiAnPScsXHJcbiAgICAgICAgICAgIG5leHRJZDogJz0nLFxyXG4gICAgICAgICAgICBsaXN0TGFiZWw6ICc9JyxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxufSk7IiwiYW5ndWxhci5tb2R1bGUoJ3VpLm5hdmFhci53aWRnZXRzJylcclxuLmRpcmVjdGl2ZSgnbnZyTGlzdENhcm91c2VsRnVsbCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFQScsXHJcbiAgICAgICAgcmVxdWlyZTogJ15jYXJvdXNlbCcsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICcvYXBwL3RlbXBsYXRlcy9jYXJvdXNlbF9saXN0X2Z1bGwuaHRtbCcsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgaXRlbXM6ICc9JyxcclxuICAgICAgICAgICAgcHJldklkOiAnPScsXHJcbiAgICAgICAgICAgIG5leHRJZDogJz0nLFxyXG4gICAgICAgICAgICBsaXN0TGFiZWw6ICc9JyxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxufSk7IiwiYW5ndWxhci5tb2R1bGUoJ3VpLm5hdmFhci53aWRnZXRzJylcclxuLmRpcmVjdGl2ZSgnbnZyTGlzdENhcm91c2VsU3VnZ2VzdGlvbicsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFQScsXHJcbiAgICAgICAgcmVxdWlyZTogJ15jYXJvdXNlbCcsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICcvYXBwL3RlbXBsYXRlcy9jYXJvdXNlbF9saXN0X3N1Z2dlc3Rpb24uaHRtbCcsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgaXRlbXM6ICc9JyxcclxuICAgICAgICAgICAgcHJldklkOiAnPScsXHJcbiAgICAgICAgICAgIG5leHRJZDogJz0nLFxyXG4gICAgICAgICAgICBzb3VyY2VJZGVudGlmaWVyOiAnPScsXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbn0pOyIsImFuZ3VsYXIubW9kdWxlKCd1aS5uYXZhYXIud2lkZ2V0cycpXHJcbi5kaXJlY3RpdmUoJ252ck1hcCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFQScsXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyKSB7XHJcblxyXG4gICAgICAgICAgICBsb2FkU2NyaXB0KCdodHRwOi8vbWFwcy5nb29nbGUuY29tL21hcHMvYXBpL2pzP3NlbnNvcj10cnVlJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxvYWRTY3JpcHQocGx1Z2luX3BhdGggKyAnZ21hcHMvZ21hcHMubWluLmpzJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWFwSWQgPSAkYXR0ci5pZDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW1hcElkKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXAgPSBuZXcgR01hcHMoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXY6ICcjJyArIG1hcElkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXQ6IDM1LjcxNDI2NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG5nOiA1MS40MDM3MzUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWFya2VyID0gbWFwLmFkZE1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdDogMzUuNzE0MjY0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsbmc6IDUxLjQwMzczNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfZhdix2KzYuSDaqdiq2KfYqCDZh9in24wg2LXZiNiq24wg2YbZiNin2LEnXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgLy92YXIgbWFwSWQgPSAkYXR0ci5pZDtcclxuICAgICAgICAgICAgLy9pZiAoIW1hcElkKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBtYXAgPSBuZXcgR01hcHMoe1xyXG4gICAgICAgICAgICAvLyAgICBkaXY6ICcjJyArIG1hcElkLFxyXG4gICAgICAgICAgICAvLyAgICBsYXQ6IDM1LjY5OTE0NjEsXHJcbiAgICAgICAgICAgIC8vICAgIGxuZzogNTEuMzk1NjA0LFxyXG4gICAgICAgICAgICAvLyAgICBzY3JvbGx3aGVlbDogZmFsc2VcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIG1hcmtlciA9IG1hcC5hZGRNYXJrZXIoe1xyXG4gICAgICAgICAgICAvLyAgICBsYXQ6IDM1LjY5OTE0NjEsXHJcbiAgICAgICAgICAgIC8vICAgIGxuZzogNTEuMzk1NjA0LFxyXG4gICAgICAgICAgICAvLyAgICB0aXRsZTogJ9mF2LHYrNi5INqp2KrYp9ioINmH2KfbjCDYtdmI2KrbjCDZhtmI2KfYsSdcclxuICAgICAgICAgICAgLy99KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ3VpLm5hdmFhci53aWRnZXRzJylcclxuLmRpcmVjdGl2ZSgnbnZyTWFzb25yeUdhbGxlcnknLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRUEnLFxyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cikge1xyXG5cclxuICAgICAgICAgICAgLy9TTUFSVFlcclxuICAgICAgICAgICAgLy9mdW5jdGlvbiBfbWFzb25yeUdhbGxlcnkoKSB7XHJcblxyXG4gICAgICAgICAgICAvL1x0aWYoalF1ZXJ5KFwiLm1hc29ucnktZ2FsbGVyeVwiKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAvL1x0XHRqUXVlcnkoXCIubWFzb25yeS1nYWxsZXJ5XCIpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vXHRcdFx0dmFyIF9jb250YWluZXIgPSBqUXVlcnkodGhpcyksXHJcbiAgICAgICAgICAgIC8vXHRcdFx0XHRjb2x1bW5zXHRcdD0gNDtcclxuXHJcbiAgICAgICAgICAgIC8vXHRcdFx0XHQgaWYoX2NvbnRhaW5lci5oYXNDbGFzcygnY29sdW1ucy0yJykpIFx0Y29sdW1ucyA9IDI7XHJcbiAgICAgICAgICAgIC8vXHRcdFx0ZWxzZSBpZihfY29udGFpbmVyLmhhc0NsYXNzKCdjb2x1bW5zLTMnKSkgXHRjb2x1bW5zID0gMztcclxuICAgICAgICAgICAgLy9cdFx0XHRlbHNlIGlmKF9jb250YWluZXIuaGFzQ2xhc3MoJ2NvbHVtbnMtNCcpKSBcdGNvbHVtbnMgPSA0O1xyXG4gICAgICAgICAgICAvL1x0XHRcdGVsc2UgaWYoX2NvbnRhaW5lci5oYXNDbGFzcygnY29sdW1ucy01JykpIFx0Y29sdW1ucyA9IDU7XHJcbiAgICAgICAgICAgIC8vXHRcdFx0ZWxzZSBpZihfY29udGFpbmVyLmhhc0NsYXNzKCdjb2x1bW5zLTYnKSkgXHRjb2x1bW5zID0gNjtcclxuXHJcbiAgICAgICAgICAgIC8vXHRcdFx0dmFyIF9maXJzdEVsZW1XaWR0aCBcdD0gX2NvbnRhaW5lci5maW5kKCdhOmVxKDApJykub3V0ZXJXaWR0aCgpLFxyXG4gICAgICAgICAgICAvL1x0XHRcdFx0X2JpZ0ltYWdlTm8gXHRcdD0gX2NvbnRhaW5lci5hdHRyKCdkYXRhLWltZy1iaWcnKSxcclxuICAgICAgICAgICAgLy9cdFx0XHRcdF9jb250YWluZXJXaWR0aFx0XHQ9IF9jb250YWluZXIud2lkdGgoKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL1x0XHRcdC8vIEZpeCBtYXJnaW5zICYgV2lkdGhcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB2YXIgcG9zdFdpZHRoID0gKF9jb250YWluZXJXaWR0aC9jb2x1bW5zKTtcclxuICAgICAgICAgICAgLy9cdFx0XHRcdHBvc3RXaWR0aCA9IE1hdGguZmxvb3IocG9zdFdpZHRoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpZigocG9zdFdpZHRoICogY29sdW1ucykgPj0gX2NvbnRhaW5lcldpZHRoKSB7IFxyXG4gICAgICAgICAgICAvL1x0XHRcdFx0X2NvbnRhaW5lci5jc3MoeyAnbWFyZ2luLXJpZ2h0JzogJy0xcHgnIH0pOyBcclxuICAgICAgICAgICAgLy9cdFx0XHR9XHJcbiAgICAgICAgICAgIC8vXHRcdFx0aWYoY29sdW1ucyA8IDYpIHtcclxuICAgICAgICAgICAgLy9cdFx0XHRcdF9jb250YWluZXIuY2hpbGRyZW4oJ2EnKS5jc3Moe1wid2lkdGhcIjpwb3N0V2lkdGgrXCJweFwifSk7XHJcbiAgICAgICAgICAgIC8vXHRcdFx0fVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vXHRcdFx0Ly8gU2V0IEJpZyBJbWFnZVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGlmKHBhcnNlSW50KF9iaWdJbWFnZU5vKSA+IDApIHtcclxuXHJcbiAgICAgICAgICAgIC8vXHRcdFx0XHRfYmlnSW1hZ2VObyBcdD0gTnVtYmVyKF9iaWdJbWFnZU5vKSAtIDE7IFxyXG4gICAgICAgICAgICAvL1x0XHRcdFx0X2NvbnRhaW5lci5maW5kKCdhOmVxKCcrX2JpZ0ltYWdlTm8rJyknKS5jc3MoeyB3aWR0aDogX2ZpcnN0RWxlbVdpZHRoKjIgKyAncHgnfSk7XHJcblxyXG4gICAgICAgICAgICAvL1x0XHRcdFx0bG9hZFNjcmlwdChwbHVnaW5fcGF0aCArICdpc290b3BlL2lzb3RvcGUucGtnZC5taW4uanMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIC8vXHRcdFx0XHRcdHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvL1x0XHRcdFx0XHRcdF9jb250YWluZXIuaXNvdG9wZSh7XHJcbiAgICAgICAgICAgIC8vXHRcdFx0XHRcdFx0XHRtYXNvbnJ5OiB7XHJcbiAgICAgICAgICAgIC8vXHRcdFx0XHRcdFx0XHRcdGNvbHVtbldpZHRoOiBfZmlyc3RFbGVtV2lkdGhcclxuICAgICAgICAgICAgLy9cdFx0XHRcdFx0XHRcdH1cclxuICAgICAgICAgICAgLy9cdFx0XHRcdFx0XHR9KTtcclxuXHJcbiAgICAgICAgICAgIC8vXHRcdFx0XHRcdFx0X2NvbnRhaW5lci5pc290b3BlKCdsYXlvdXQnKTtcclxuXHJcbiAgICAgICAgICAgIC8vXHRcdFx0XHRcdH0sIDEwMDApO1xyXG5cclxuICAgICAgICAgICAgLy9cdFx0XHRcdH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1x0XHR9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL1x0fVxyXG5cclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAvL0FyYXNoXHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCdyZXBlYXRfZG9uZScgKyAnXycgKyAkZWxlbWVudFswXS5pZCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX21hc29ucnlHYWxsZXJ5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gX21hc29ucnlHYWxsZXJ5KCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCRlbGVtZW50Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2NvbnRhaW5lciA9IGpRdWVyeSgkZWxlbWVudFswXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnMgPSA0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoX2NvbnRhaW5lci5oYXNDbGFzcygnY29sdW1ucy0yJykpIGNvbHVtbnMgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKF9jb250YWluZXIuaGFzQ2xhc3MoJ2NvbHVtbnMtMycpKSBjb2x1bW5zID0gMztcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChfY29udGFpbmVyLmhhc0NsYXNzKCdjb2x1bW5zLTQnKSkgY29sdW1ucyA9IDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoX2NvbnRhaW5lci5oYXNDbGFzcygnY29sdW1ucy01JykpIGNvbHVtbnMgPSA1O1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKF9jb250YWluZXIuaGFzQ2xhc3MoJ2NvbHVtbnMtNicpKSBjb2x1bW5zID0gNjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9maXJzdEVsZW1XaWR0aCA9IF9jb250YWluZXIuZmluZCgnYTplcSgwKScpLm91dGVyV2lkdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2JpZ0ltYWdlTm8gPSBfY29udGFpbmVyLmF0dHIoJ2RhdGEtaW1nLWJpZycpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY29udGFpbmVyV2lkdGggPSBfY29udGFpbmVyLndpZHRoKCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBGaXggbWFyZ2lucyAmIFdpZHRoXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvc3RXaWR0aCA9IChfY29udGFpbmVyV2lkdGggLyBjb2x1bW5zKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3N0V2lkdGggPSBNYXRoLmZsb29yKHBvc3RXaWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChwb3N0V2lkdGggKiBjb2x1bW5zKSA+PSBfY29udGFpbmVyV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRhaW5lci5jc3MoeyAnbWFyZ2luLXJpZ2h0JzogJy0xcHgnIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sdW1ucyA8IDYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRhaW5lci5jaGlsZHJlbignYScpLmNzcyh7IFwid2lkdGhcIjogcG9zdFdpZHRoICsgXCJweFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBCaWcgSW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoX2JpZ0ltYWdlTm8pID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX2JpZ0ltYWdlTm8gPSBOdW1iZXIoX2JpZ0ltYWdlTm8pIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRhaW5lci5maW5kKCdhOmVxKCcgKyBfYmlnSW1hZ2VObyArICcpJykuY3NzKHsgd2lkdGg6IF9maXJzdEVsZW1XaWR0aCAqIDIgKyAncHgnIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGFpbmVyLmlzb3RvcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc29ucnk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uV2lkdGg6IF9maXJzdEVsZW1XaWR0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250YWluZXIuaXNvdG9wZSgnbGF5b3V0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCd1aS5uYXZhYXIud2lkZ2V0cycpXHJcbi5kaXJlY3RpdmUoJ252ck1peEl0VXAnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRUEnLFxyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cikge1xyXG5cclxuICAgICAgICAgICAgLy9TTUFSVFlcclxuICAgICAgICAgICAgLy92YXIgX2NvbnRhaW5lciA9IGpRdWVyeSgnLm1peC1ncmlkJyk7XHJcblxyXG4gICAgICAgICAgICAvL2lmIChfY29udGFpbmVyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8gICAgbG9hZFNjcmlwdChwbHVnaW5fcGF0aCArICdtaXhpdHVwL2pxdWVyeS5taXhpdHVwLm1pbi5qcycsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAoalF1ZXJ5KCkubWl4aXR1cCkge1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBfY29udGFpbmVyLm1peGl0dXAoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBqUXVlcnkoXCJ1bC5taXgtZmlsdGVyIGFcIikuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgLy9BcmFzaFxyXG4gICAgICAgICAgICB2YXIgX2NvbnRhaW5lciA9ICRlbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgaWYgKF9jb250YWluZXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy9sb2FkU2NyaXB0KHBsdWdpbl9wYXRoICsgJ21peGl0dXAvanF1ZXJ5Lm1peGl0dXAubWluLmpzJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoalF1ZXJ5KCkubWl4aXR1cCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9fY29udGFpbmVyLm1peGl0dXAoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9qUXVlcnkoXCJ1bC5taXgtZmlsdGVyIGFcIikuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS4kb24oJ3JlcGVhdF9kb25lJyArICdfJyArICRlbGVtZW50WzBdLmlkLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGFpbmVyLm1peGl0dXAoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeShcInVsLm1peC1maWx0ZXIgYVwiKS5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ3VpLm5hdmFhci53aWRnZXRzJylcclxuLmNvbnRyb2xsZXIoJ1BhZ2VIZWFkZXJDb250cm9sbGVyJywgW2Z1bmN0aW9uICgpIHtcclxuICAgIHZhciB2bSA9IHRoaXM7XHJcbn1dKVxyXG5cclxuLmRpcmVjdGl2ZSgnbnZyUGFnZUhlYWRlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFQScsXHJcbiAgICAgICAgY29udHJvbGxlcjogJ1BhZ2VIZWFkZXJDb250cm9sbGVyJyxcclxuICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICBpdGVtczogJz0nLFxyXG4gICAgICAgICAgICB0aXRsZTogJz0nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udHJvbGxlcjogJ1BhZ2VIZWFkZXJDb250cm9sbGVyJyxcclxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcclxuICAgICAgICB0ZW1wbGF0ZTogJzxzZWN0aW9uIGNsYXNzPVwicGFnZS1oZWFkZXIgcGFnZS1oZWFkZXIteHNcIj4nICtcclxuXHRcdFx0XHQgICAgICAgICc8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGgxIGRhdGEtbmctYmluZD1cInZtLnRpdGxlXCIgaXRlbXByb3A9XCJuYW1lXCI+PC9oMT4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8IS0tIGJyZWFkY3J1bWJzIC0tPicgK1xyXG5cdFx0XHRcdFx0ICAgICAgICAnPG9sIGNsYXNzPVwiYnJlYWRjcnVtYlwiIGl0ZW1zY29wZSBpdGVtdHlwZT1cImh0dHA6Ly9zY2hlbWEub3JnL0JyZWFkY3J1bWJMaXN0XCI+JyArXHJcblx0XHRcdFx0XHRcdCAgICAgICAgJzxsaSBpdGVtcHJvcD1cIml0ZW1MaXN0RWxlbWVudFwiIGl0ZW1zY29wZSBpdGVtdHlwZT1cImh0dHA6Ly9zY2hlbWEub3JnL0xpc3RJdGVtXCI+PGEgaXRlbXNjb3BlIGl0ZW10eXBlPVwiaHR0cDovL3NjaGVtYS5vcmcvVGhpbmdcIiBpdGVtcHJvcD1cIml0ZW1cIiBocmVmPVwiL1wiPjxzcGFuIGl0ZW1wcm9wPVwibmFtZVwiPti12YHYrdmHINin2LXZhNuMPC9zcGFuPjwvYT48bWV0YSBpdGVtcHJvcD1cInBvc2l0aW9uXCIgY29udGVudD1cIjFcIiAvPjwvbGk+JyArXHJcblx0XHRcdFx0XHRcdCAgICAgICAgJzxsaSBkYXRhLW5nLXJlcGVhdD1cIml0ZW0gaW4gdm0uaXRlbXNcIiBjbGFzcz1cImFjdGl2ZVwiIGl0ZW1wcm9wPVwiaXRlbUxpc3RFbGVtZW50XCIgaXRlbXNjb3BlIGl0ZW10eXBlPVwiaHR0cDovL3NjaGVtYS5vcmcvTGlzdEl0ZW1cIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGRhdGEtbmctYmluZD1cIml0ZW0udGl0bGVcIiBkYXRhLW5nLXNob3c9XCIhaXRlbS51cmxcIi8+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YSBocmVmPVwie3tpdGVtLnVybH19XCIgZGF0YS1uZy1zaG93PVwiaXRlbS51cmxcIiBpdGVtc2NvcGUgaXRlbXR5cGU9XCJodHRwOi8vc2NoZW1hLm9yZy9UaGluZ1wiIGl0ZW1wcm9wPVwiaXRlbVwiPjxzcGFuIGRhdGEtbmctYmluZD1cIml0ZW0udGl0bGVcIiBpdGVtcHJvcD1cIm5hbWVcIj48L3NwYW4+PC9hPjxtZXRhIGl0ZW1wcm9wPVwicG9zaXRpb25cIiBjb250ZW50PVwie3skaW5kZXggKyAxfX1cIiAvPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2xpPicgK1xyXG5cdFx0XHRcdFx0ICAgICAgICAnPC9vbD4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8IS0tIC9icmVhZGNydW1icyAtLT4nICtcclxuXHRcdFx0XHQgICAgICAgICc8L2Rpdj4nICtcclxuXHRcdFx0ICAgICAgICAnPC9zZWN0aW9uPicsXHJcbiAgICAgICAgcmVwbGFjZTogdHJ1ZSxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoJHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgndWkubmF2YWFyLndpZGdldHMnKVxyXG4uZGlyZWN0aXZlKCdudnJQbGF5VG9nZ2xlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0VBJyxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHIpIHtcclxuICAgICAgICAgICAgdmFyIHZtID0gJHNjb3BlLnZtO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gYW5ndWxhci5lbGVtZW50KCcjJyArICRhdHRyLmNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbnRhaW5lciB8fCBjb250YWluZXIubGVuZ3RoICE9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdpbnZhbGlkIGNvbnRhaW5lciBmb3IganBsYXllci4nKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvdmVybGF5SW1hZ2UgPSBhbmd1bGFyLmVsZW1lbnQoJy5wbGF5LW92ZXJsYXknKTtcclxuICAgICAgICAgICAgICAgIGlmICghb3ZlcmxheUltYWdlLmlzKFwiOmhpZGRlblwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlJbWFnZS50b2dnbGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbW9kZSA9ICRhdHRyLm1vZGU7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9kZSAmJiBtb2RlID09ICdjbG9zZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudG9nZ2xlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheUltYWdlLnRvZ2dsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnI2pxdWVyeV9qcGxheWVyJykualBsYXllcigncGF1c2UnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlzSGlkZGVuID0gY29udGFpbmVyLmlzKFwiOmhpZGRlblwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNIaWRkZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudG9nZ2xlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCd1aS5uYXZhYXIud2lkZ2V0cycpXHJcbi5kaXJlY3RpdmUoJ252clByZWxvYWRlcicsIFsnJHRpbWVvdXQnLCBmdW5jdGlvbiAoJHRpbWVvdXQpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFQScsXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyKSB7XHJcblxyXG4gICAgICAgICAgICAvL1NNQVJUWVxyXG4gICAgICAgICAgICAvL2lmIChqUXVlcnkoJyNwcmVsb2FkZXInKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAvLyAgICBqUXVlcnkod2luZG93KS5sb2FkKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICBqUXVlcnkoJyNwcmVsb2FkZXInKS5mYWRlT3V0KDEwMDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBqUXVlcnkoJyNwcmVsb2FkZXInKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7fSwgMTAwMCk7IFxyXG5cclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL31cclxuXHJcblxyXG4gICAgICAgICAgICAvL0FyYXNoXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRsb2NhdGlvbkNoYW5nZVN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkoJyNwcmVsb2FkZXInKS5hdHRyKCdzdHlsZScsICcnKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCckdmlld0NvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJyNwcmVsb2FkZXInKS5mYWRlT3V0KDEwMDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCd1aS5uYXZhYXIud2lkZ2V0cycpXHJcblxyXG4uY29uc3RhbnQoJ3JhdGluZ0NvbmZpZycsIHtcclxuICAgIG1heDogNSxcclxuICAgIHN0YXRlT246IG51bGwsXHJcbiAgICBzdGF0ZU9mZjogbnVsbCxcclxuICAgIHN0YXRlSGFsZjogbnVsbCxcclxufSlcclxuXHJcbi5jb250cm9sbGVyKCdSYXRpbmdDb250cm9sbGVyJywgWyckc2NvcGUnLCAnJGF0dHJzJywgJyRwYXJzZScsICdyYXRpbmdDb25maWcnLCBmdW5jdGlvbiAoJHNjb3BlLCAkYXR0cnMsICRwYXJzZSwgcmF0aW5nQ29uZmlnKSB7XHJcblxyXG4gICAgdGhpcy5tYXhSYW5nZSA9IGFuZ3VsYXIuaXNEZWZpbmVkKCRhdHRycy5tYXgpID8gJHNjb3BlLiRwYXJlbnQuJGV2YWwoJGF0dHJzLm1heCkgOiByYXRpbmdDb25maWcubWF4O1xyXG4gICAgdGhpcy5zdGF0ZU9uID0gYW5ndWxhci5pc0RlZmluZWQoJGF0dHJzLnN0YXRlT24pID8gJHNjb3BlLiRwYXJlbnQuJGV2YWwoJGF0dHJzLnN0YXRlT24pIDogcmF0aW5nQ29uZmlnLnN0YXRlT247XHJcbiAgICB0aGlzLnN0YXRlT2ZmID0gYW5ndWxhci5pc0RlZmluZWQoJGF0dHJzLnN0YXRlT2ZmKSA/ICRzY29wZS4kcGFyZW50LiRldmFsKCRhdHRycy5zdGF0ZU9mZikgOiByYXRpbmdDb25maWcuc3RhdGVPZmY7XHJcbiAgICB0aGlzLnN0YXRlSGFsZiA9IGFuZ3VsYXIuaXNEZWZpbmVkKCRhdHRycy5zdGF0ZUhhbGYpID8gJHNjb3BlLiRwYXJlbnQuJGV2YWwoJGF0dHJzLnN0YXRlSGFsZikgOiByYXRpbmdDb25maWcuc3RhdGVIYWxmO1xyXG4gICAgdGhpcy5zZWxlY3RTdGF0ZSA9IGFuZ3VsYXIuaXNEZWZpbmVkKCRhdHRycy5zZWxlY3RTdGF0ZSkgPyAkc2NvcGUuJHBhcmVudC4kZXZhbCgkYXR0cnMuc2VsZWN0U3RhdGUpIDogcmF0aW5nQ29uZmlnLnNlbGVjdFN0YXRlO1xyXG5cclxuICAgIHRoaXMuY3JlYXRlUmF0ZU9iamVjdHMgPSBmdW5jdGlvbiAoc3RhdGVzKSB7XHJcbiAgICAgICAgdmFyIGRlZmF1bHRPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBzdGF0ZU9uOiB0aGlzLnN0YXRlT24sXHJcbiAgICAgICAgICAgIHN0YXRlT2ZmOiB0aGlzLnN0YXRlT2ZmLFxyXG4gICAgICAgICAgICBzdGF0ZUhhbGY6IHRoaXMuc3RhdGVIYWxmLFxyXG4gICAgICAgICAgICBzZWxlY3RTdGF0ZTogdGhpcy5zZWxlY3RTdGF0ZSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbiA9IHN0YXRlcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgc3RhdGVzW2ldID0gYW5ndWxhci5leHRlbmQoeyBpbmRleDogaSB9LCBkZWZhdWx0T3B0aW9ucywgc3RhdGVzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlcztcclxuICAgIH07XHJcblxyXG4gICAgLy8gR2V0IG9iamVjdHMgdXNlZCBpbiB0ZW1wbGF0ZVxyXG4gICAgJHNjb3BlLnJhbmdlID0gYW5ndWxhci5pc0RlZmluZWQoJGF0dHJzLnJhdGluZ1N0YXRlcykgPyB0aGlzLmNyZWF0ZVJhdGVPYmplY3RzKGFuZ3VsYXIuY29weSgkc2NvcGUuJHBhcmVudC4kZXZhbCgkYXR0cnMucmF0aW5nU3RhdGVzKSkpIDogdGhpcy5jcmVhdGVSYXRlT2JqZWN0cyhuZXcgQXJyYXkodGhpcy5tYXhSYW5nZSkpO1xyXG5cclxuICAgICRzY29wZS5yYXRlID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKCRzY29wZS52YWx1ZSAhPT0gdmFsdWUgJiYgISRzY29wZS5yZWFkb25seSkge1xyXG4gICAgICAgICAgICAkc2NvcGUudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgJHNjb3BlLm9uUmF0ZSh7IHZhbHVlOiB2YWx1ZSB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5lbnRlciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICghJHNjb3BlLnJlYWRvbmx5KSB7XHJcbiAgICAgICAgICAgICRzY29wZS52YWwgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJHNjb3BlLm9uSG92ZXIoeyB2YWx1ZTogdmFsdWUgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkc2NvcGUudmFsID0gYW5ndWxhci5jb3B5KCRzY29wZS52YWx1ZSk7XHJcbiAgICAgICAgJHNjb3BlLm9uTGVhdmUoKTtcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLiR3YXRjaCgndmFsdWUnLCBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAkc2NvcGUudmFsID0gdmFsdWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkc2NvcGUucmVhZG9ubHkgPSBmYWxzZTtcclxuICAgIGlmICgkYXR0cnMucmVhZG9ubHkpIHtcclxuICAgICAgICAkc2NvcGUuJHBhcmVudC4kd2F0Y2goJHBhcnNlKCRhdHRycy5yZWFkb25seSksIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUucmVhZG9ubHkgPSAhIXZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgICRzY29wZS5nZXRTdGF0ZSA9IGZ1bmN0aW9uIChyLCBpbmRleCwgdmFsdWUpIHtcclxuXHJcbiAgICAgICAgdmFyIGludGVnZXJQYXJ0ID0gTWF0aC5mbG9vcih2YWx1ZSk7XHJcbiAgICAgICAgdmFyIGRlY2ltYWxQYXJ0ID0gdmFsdWUgJSAxO1xyXG4gICAgICAgIC8vdmFyIHNlbGVjdFN0YXRlID0gJHNjb3BlLnJlYWRvbmx5ID8gJycgOiAoJyAnICsgci5zZWxlY3RTdGF0ZSk7XHJcbiAgICAgICAgdmFyIHNlbGVjdFN0YXRlID0gKCcgJyArIHIuc2VsZWN0U3RhdGUpO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPCBpbnRlZ2VyUGFydCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKHIuc3RhdGVPbiB8fCAnZ2x5cGhpY29uIGdseXBoaWNvbi1zdGFyIG1hcmtlZCcpICsgc2VsZWN0U3RhdGU7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT0gaW50ZWdlclBhcnQpIHtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoZGVjaW1hbFBhcnQgPD0gMC4yNSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChyLnN0YXRlT2ZmIHx8ICdnbHlwaGljb24gZ2x5cGhpY29uLXN0YXItZW1wdHknKSArIHNlbGVjdFN0YXRlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRlY2ltYWxQYXJ0ID49IDAuMjYgJiYgZGVjaW1hbFBhcnQgPD0gMC43NSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChyLnN0YXRlSGFsZiB8fCAnZ2x5cGhpY29uIGdseXBoaWNvbi1zdGFyIG1hcmtlZCcpICsgc2VsZWN0U3RhdGU7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRlY2ltYWxQYXJ0ID49IDAuNzYpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoci5zdGF0ZU9uIHx8ICdnbHlwaGljb24gZ2x5cGhpY29uLXN0YXIgbWFya2VkJykgKyBzZWxlY3RTdGF0ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gKHIuc3RhdGVPZmYgfHwgJ2dseXBoaWNvbiBnbHlwaGljb24tc3Rhci1lbXB0eScpICsgc2VsZWN0U3RhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufV0pXHJcblxyXG4uZGlyZWN0aXZlKCdudnJSYXRpbmcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRUEnLFxyXG4gICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiAnPScsXHJcbiAgICAgICAgICAgIG9uSG92ZXI6ICcmJyxcclxuICAgICAgICAgICAgb25MZWF2ZTogJyYnLFxyXG4gICAgICAgICAgICBvblJhdGU6ICcmJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udHJvbGxlcjogJ1JhdGluZ0NvbnRyb2xsZXInLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGUvcmF0aW5nL252ci1yYXRpbmcuaHRtbCcsXHJcbiAgICAgICAgcmVwbGFjZTogdHJ1ZVxyXG4gICAgfTtcclxufSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgndWkubmF2YWFyLndpZGdldHMnKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uICgkdGVtcGxhdGVDYWNoZSkge1xyXG4gICAgJHRlbXBsYXRlQ2FjaGUucHV0KCd0ZW1wbGF0ZS9yYXRpbmcvbnZyLXJhdGluZy5odG1sJyxcclxuICAgICAgICAnPGRpdiBjbGFzcz1cInJhdGluZ1wiIGRhdGEtbmctbW91c2VsZWF2ZT1cInJlc2V0KClcIj4nICtcclxuICAgICAgICAgICAgJzxpIGRhdGEtbmctcmVwZWF0PVwiciBpbiByYW5nZVwiIGRhdGEtbmctbW91c2VlbnRlcj1cImVudGVyKCRpbmRleCArIDEpXCIgZGF0YS1uZy1jbGljaz1cInJhdGUoJGluZGV4ICsgMSlcIiBkYXRhLW5nLWNsYXNzPVwiZ2V0U3RhdGUociwgJGluZGV4LCB2YWwpXCI+PC9pPicgK1xyXG4gICAgICAgICc8L2Rpdj4nKTtcclxufV0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgndWkubmF2YWFyLndpZGdldHMnKVxyXG4uZGlyZWN0aXZlKCdudnJTY3JvbGxUbycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFQScsXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyKSB7XHJcbiAgICAgICAgICAgIHZhciBpZFRvU2Nyb2xsID0gJGF0dHIuaHJlZjtcclxuICAgICAgICAgICAgJGVsZW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldDtcclxuICAgICAgICAgICAgICAgIGlmIChpZFRvU2Nyb2xsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gYW5ndWxhci5lbGVtZW50KCcjJyArIGlkVG9TY3JvbGwpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSAkZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICQoXCJib2R5XCIpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3AgfSwgXCJzbG93XCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ3VpLm5hdmFhci53aWRnZXRzJylcclxuLmRpcmVjdGl2ZSgnbnZyU2lkZU5hdicsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFQScsXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyKSB7XHJcblxyXG4gICAgICAgICAgICAvL1NNQVJUWVxyXG4gICAgICAgICAgICAvL2Z1bmN0aW9uIF9zaWRlTmF2KCkge1xyXG5cclxuICAgICAgICAgICAgLy9cdC8qIE1vYmlsZSBCdXR0b24gKi9cclxuICAgICAgICAgICAgLy9cdGpRdWVyeShcImRpdi5zaWRlLW5hdlwiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvL1x0XHR2YXIgX3QgPSBqUXVlcnkoJ3VsJywgdGhpcyk7XHJcbiAgICAgICAgICAgIC8vXHRcdGpRdWVyeSgnYnV0dG9uJywgdGhpcykuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvL1x0XHRcdF90LnNsaWRlVG9nZ2xlKDMwMCk7XHJcbiAgICAgICAgICAgIC8vXHRcdH0pO1xyXG4gICAgICAgICAgICAvL1x0fSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9cdC8qIFN1Ym1lbnVzICovXHJcbiAgICAgICAgICAgIC8vXHRqUXVlcnkoXCJkaXYuc2lkZS1uYXY+dWw+bGk+YS5kcm9wZG93bi10b2dnbGVcIikuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgLy9cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgLy9cdFx0alF1ZXJ5KHRoaXMpLm5leHQoJ3VsJykuc2xpZGVUb2dnbGUoMjAwKTtcclxuICAgICAgICAgICAgLy9cdFx0alF1ZXJ5KHRoaXMpLmNsb3Nlc3QoJ2xpJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAvL1x0fSk7XHJcblxyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIC8vQXJhc2hcclxuICAgICAgICAgICAgLyogTW9iaWxlIEJ1dHRvbiAqL1xyXG4gICAgICAgICAgICAkZWxlbWVudC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdCA9IGpRdWVyeSgndWwnLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIGpRdWVyeSgnYnV0dG9uJywgdGhpcykuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3Quc2xpZGVUb2dnbGUoMzAwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvKiBTdWJtZW51cyAqL1xyXG4gICAgICAgICAgICAkZWxlbWVudC5maW5kKCd1bD5saT5hLmRyb3Bkb3duLXRvZ2dsZScpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBqUXVlcnkodGhpcykubmV4dCgndWwnKS5zbGlkZVRvZ2dsZSgyMDApO1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KHRoaXMpLmNsb3Nlc3QoJ2xpJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ3VpLm5hdmFhci53aWRnZXRzJylcclxuLmNvbnRyb2xsZXIoJ1NpdGVTZWFyY2hDb250cm9sbGVyJywgWyckbG9jYXRpb24nLCBmdW5jdGlvbiAoJGxvY2F0aW9uKSB7XHJcbiAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgdm0uc3VibWl0ID0gc3VibWl0O1xyXG4gICAgdm0udmFsdWUgPSAnJztcclxuXHJcbiAgICBmdW5jdGlvbiBzdWJtaXQoKSB7XHJcbiAgICAgICAgaWYgKCF2bS52YWx1ZSB8fCB2bS52YWx1ZS5sZW5ndGggPCAxKSByZXR1cm47XHJcbiAgICAgICAgJGxvY2F0aW9uLnVybCgnL3NlYXJjaC8nICsgdm0udmFsdWUpO1xyXG4gICAgfVxyXG59XSlcclxuLmRpcmVjdGl2ZSgnbnZyU2l0ZVNlYXJjaCcsIFsnJHJvb3RTY29wZScsIGZ1bmN0aW9uICgkcm9vdFNjb3BlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRUEnLFxyXG4gICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb250cm9sbGVyOiAnU2l0ZVNlYXJjaENvbnRyb2xsZXInLFxyXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGUvc2VhcmNoL252ci1zZWFyY2guaHRtbCcsXHJcbiAgICAgICAgcmVwbGFjZTogdHJ1ZSxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHIpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbiAoZXZlbnQsIGN1cnJlbnQsIHByZXZpb3VzKSB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5wYXJlbnQoKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudFswXS5yZXNldCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShcInVpLm5hdmFhci53aWRnZXRzXCIpLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLCBmdW5jdGlvbiAoJHRlbXBsYXRlQ2FjaGUpIHtcclxuICAgICR0ZW1wbGF0ZUNhY2hlLnB1dChcInRlbXBsYXRlL3NlYXJjaC9udnItc2VhcmNoLmh0bWxcIixcclxuICAgICAgICAnPGZvcm0gZGF0YS1uZy1zdWJtaXQ9XCJ2bS5zdWJtaXQoKVwiPicgK1xyXG4gICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cItis2LPYqtis2Ygg2YbYp9mFINqp2KrYp9io2Iwg2YbZiNuM2LPZhtiv2Ycg24zYpyDYsdin2YjbjFwiIGRhdGEtbmctbW9kZWw9XCJ2bS52YWx1ZVwiIC8+JyArXHJcbiAgICAgICAgJzwvZm9ybT4nKTtcclxufV0pOyIsImFuZ3VsYXIubW9kdWxlKCd1aS5uYXZhYXIud2lkZ2V0cycpXHJcbi5kaXJlY3RpdmUoJ252clNsaWRlckZ1bGwnLCBbJyR0aW1lb3V0JywgZnVuY3Rpb24gKCR0aW1lb3V0KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRUEnLFxyXG4gICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgIGltYWdlVXJsOiAnQCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByaW9yaXR5OiAxMDAwLFxyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cikge1xyXG5cclxuICAgICAgICAgICAgLy9TTUFSVFlcclxuICAgICAgICAgICAgLy9mdW5jdGlvbiBfc2xpZGVyX2Z1bGwoKSB7XHJcbiAgICAgICAgICAgIC8vICAgIF9oZWFkZXJIZWlnaHQgPSAwO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgaWYgKGpRdWVyeShcIiNoZWFkZXJcIikuaGFzQ2xhc3MoJ3RyYW5zcGFyZW50JykgfHwgalF1ZXJ5KFwiI2hlYWRlclwiKS5oYXNDbGFzcygndHJhbnNsdWNlbnQnKSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgX2hlYWRlckhlaWdodCA9IDA7XHJcbiAgICAgICAgICAgIC8vICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBfaGVhZGVySGVpZ2h0ID0galF1ZXJ5KFwiI2hlYWRlclwiKS5vdXRlckhlaWdodCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgIGlmIChqUXVlcnkoXCIjdG9wQmFyXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBfaGVhZGVySGVpZ2h0ID0gX2hlYWRlckhlaWdodCArIGpRdWVyeShcIiN0b3BCYXJcIikub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gICAgX3NjcmVlbkhlaWdodCA9IGpRdWVyeSh3aW5kb3cpLmhlaWdodCgpIC0gX2hlYWRlckhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIC8vICAgIGpRdWVyeShcIiNzbGlkZXIuZnVsbGhlaWdodFwiKS5oZWlnaHQoX3NjcmVlbkhlaWdodCk7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vQXJhc2hcclxuICAgICAgICAgICAgLy92YXIgX2hlYWRlckhlaWdodCA9IDA7XHJcblxyXG4gICAgICAgICAgICAvL2lmIChqUXVlcnkoXCIjaGVhZGVyXCIpLmhhc0NsYXNzKCd0cmFuc3BhcmVudCcpIHx8IGpRdWVyeShcIiNoZWFkZXJcIikuaGFzQ2xhc3MoJ3RyYW5zbHVjZW50JykpIHtcclxuICAgICAgICAgICAgLy8gICAgX2hlYWRlckhlaWdodCA9IDA7XHJcbiAgICAgICAgICAgIC8vfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgX2hlYWRlckhlaWdodCA9IGpRdWVyeShcIiNoZWFkZXJcIikub3V0ZXJIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgIGlmIChqUXVlcnkoXCIjdG9wQmFyXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIF9oZWFkZXJIZWlnaHQgPSBfaGVhZGVySGVpZ2h0ICsgalF1ZXJ5KFwiI3RvcEJhclwiKS5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgLy92YXIgX3NjcmVlbkhlaWdodCA9IGpRdWVyeSh3aW5kb3cpLmhlaWdodCgpIC0gX2hlYWRlckhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIC8vJGVsZW1lbnQuaGVpZ2h0KF9zY3JlZW5IZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGltYWdlVXJsID0gJHNjb3BlLmltYWdlVXJsO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpbWFnZVVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zZXRIZWlnaHQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJnSW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmdJbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAndXJsKCcgKyBiZ0ltZy5zcmMgKyAnKScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfc2V0SGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBiZ0ltZy5zcmMgPSBpbWFnZVVybDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBfc2V0SGVpZ2h0KCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfaGVhZGVySGVpZ2h0ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGpRdWVyeShcIiNoZWFkZXJcIikuaGFzQ2xhc3MoJ3RyYW5zcGFyZW50JykgfHwgalF1ZXJ5KFwiI2hlYWRlclwiKS5oYXNDbGFzcygndHJhbnNsdWNlbnQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfaGVhZGVySGVpZ2h0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfaGVhZGVySGVpZ2h0ID0galF1ZXJ5KFwiI2hlYWRlclwiKS5vdXRlckhlaWdodCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGpRdWVyeShcIiN0b3BCYXJcIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2hlYWRlckhlaWdodCA9IF9oZWFkZXJIZWlnaHQgKyBqUXVlcnkoXCIjdG9wQmFyXCIpLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfc2NyZWVuSGVpZ2h0ID0galF1ZXJ5KHdpbmRvdykuaGVpZ2h0KCkgLSBfaGVhZGVySGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5oZWlnaHQoX3NjcmVlbkhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8kdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vICAgIHZhciBfaGVhZGVySGVpZ2h0ID0gMDtcclxuXHJcbiAgICAgICAgICAgIC8vICAgIGlmIChqUXVlcnkoXCIjaGVhZGVyXCIpLmhhc0NsYXNzKCd0cmFuc3BhcmVudCcpIHx8IGpRdWVyeShcIiNoZWFkZXJcIikuaGFzQ2xhc3MoJ3RyYW5zbHVjZW50JykpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIF9oZWFkZXJIZWlnaHQgPSAwO1xyXG4gICAgICAgICAgICAvLyAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgX2hlYWRlckhlaWdodCA9IGpRdWVyeShcIiNoZWFkZXJcIikub3V0ZXJIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAoalF1ZXJ5KFwiI3RvcEJhclwiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgX2hlYWRlckhlaWdodCA9IF9oZWFkZXJIZWlnaHQgKyBqUXVlcnkoXCIjdG9wQmFyXCIpLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vICAgIHZhciBfc2NyZWVuSGVpZ2h0ID0galF1ZXJ5KHdpbmRvdykuaGVpZ2h0KCkgLSBfaGVhZGVySGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgLy8gICAgJGVsZW1lbnQuaGVpZ2h0KF9zY3JlZW5IZWlnaHQpO1xyXG4gICAgICAgICAgICAvL30pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1dKTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ3VpLm5hdmFhci53aWRnZXRzJylcclxuLmRpcmVjdGl2ZSgnbnZyU3RpY2t5SGVhZGVyJywgWyckdGltZW91dCcsIGZ1bmN0aW9uICgkdGltZW91dCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0VBJyxcclxuICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICBpbWFnZVVybDogJ0AnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcmlvcml0eTogMTAwMCxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHIpIHtcclxuXHJcbiAgICAgICAgICAgIC8vU21hcnR5XHJcbiAgICAgICAgICAgIC8vLy8gU1RJQ0tZXG4gICAgICAgICAgICAvL2lmIChfaGVhZGVyX2VsLmhhc0NsYXNzKCdzdGlja3knKSkge1xyXG5cbiAgICAgICAgICAgIC8vICAgIGpRdWVyeSh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAod2luZG93LndpZHRoID4gNzY4KSB7XHJcblxuICAgICAgICAgICAgLy8gICAgICAgICAgICB2YXIgX3Njcm9sbFRvcCA9IGpRdWVyeShkb2N1bWVudCkuc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgIF90b3BCYXJfSCA9IGpRdWVyeShcIiN0b3BCYXJcIikub3V0ZXJIZWlnaHQoKSB8fCAwO1xuXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGlmIChfc2Nyb2xsVG9wID4gX3RvcEJhcl9IKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIF9oZWFkZXJfZWwuYWRkQ2xhc3MoJ2ZpeGVkJyk7XG5cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIF9oZWFkZXJfSCA9IF9oZWFkZXJfZWwub3V0ZXJIZWlnaHQoKSB8fCAwO1xuXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBpZiAoIV9oZWFkZXJfZWwuaGFzQ2xhc3MoJ3RyYW5zcGFyZW50JykgJiYgIV9oZWFkZXJfZWwuaGFzQ2xhc3MoJ3RyYW5zbHVjZW50JykpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnYm9keScpLmNzcyh7IFwicGFkZGluZy10b3BcIjogX2hlYWRlcl9IICsgXCJweFwiIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcblxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBpZiAoIV9oZWFkZXJfZWwuaGFzQ2xhc3MoJ3RyYW5zcGFyZW50JykgJiYgIV9oZWFkZXJfZWwuaGFzQ2xhc3MoJ3RyYW5zbHVjZW50JykpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnYm9keScpLmNzcyh7IFwicGFkZGluZy10b3BcIjogXCIwcHhcIiB9KTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBfaGVhZGVyX2VsLnJlbW92ZUNsYXNzKCdmaXhlZCcpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH1cclxuXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuXG4gICAgICAgICAgICAvL30gZWxzZVxuXG4gICAgICAgICAgICAvLyAgICBpZiAoX2hlYWRlcl9lbC5oYXNDbGFzcygnc3RhdGljJykpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAvLyBfaGVhZGVyX0ggPSBfaGVhZGVyX2VsLm91dGVySGVpZ2h0KCkgKyBcInB4XCI7XG4gICAgICAgICAgICAvLyAgICAgICAgLy8galF1ZXJ5KCdib2R5JykuY3NzKHtcInBhZGRpbmctdG9wXCI6X2hlYWRlcl9IfSk7XG4gICAgICAgICAgICAvLyAgICB9XHJcblxuICAgICAgICAgICAgalF1ZXJ5KHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cud2lkdGggPiA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hbHdheXMgc2V0IHBhZGRpbmcgdG8gemVybyBkdWUgdG8gdGhlIGJ1ZyBpbiBiYWNrIGJ1dHRvbi5cclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJ2JvZHknKS5jc3MoeyBcInBhZGRpbmctdG9wXCI6IFwiMHB4XCIgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfaGVhZGVyX2VsID0gJGVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIF9zY3JvbGxUb3AgPSBqUXVlcnkoZG9jdW1lbnQpLnNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfdG9wQmFyX0ggPSBqUXVlcnkoXCIjdG9wQmFyXCIpLm91dGVySGVpZ2h0KCkgfHwgMDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoX3Njcm9sbFRvcCA+IF90b3BCYXJfSCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfaGVhZGVyX2VsLmFkZENsYXNzKCdmaXhlZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBfaGVhZGVyX0ggPSBfaGVhZGVyX2VsLm91dGVySGVpZ2h0KCkgfHwgMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfaGVhZGVyX2VsLmhhc0NsYXNzKCd0cmFuc3BhcmVudCcpICYmICFfaGVhZGVyX2VsLmhhc0NsYXNzKCd0cmFuc2x1Y2VudCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJ2JvZHknKS5jc3MoeyBcInBhZGRpbmctdG9wXCI6IF9oZWFkZXJfSCArIFwicHhcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfaGVhZGVyX2VsLmhhc0NsYXNzKCd0cmFuc3BhcmVudCcpICYmICFfaGVhZGVyX2VsLmhhc0NsYXNzKCd0cmFuc2x1Y2VudCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJ2JvZHknKS5jc3MoeyBcInBhZGRpbmctdG9wXCI6IFwiMHB4XCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgX2hlYWRlcl9lbC5yZW1vdmVDbGFzcygnZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufV0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZShcInVpLm5hdmFhci53aWRnZXRzXCIpLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLCBmdW5jdGlvbiAoJHRlbXBsYXRlQ2FjaGUpIHtcclxuICAgICR0ZW1wbGF0ZUNhY2hlLnB1dChcInVpYi90ZW1wbGF0ZS90YWJzL252ci10YWJzZXQuaHRtbFwiLFxyXG4gICAgICBcIjxkaXY+XFxuXCIgK1xyXG4gICAgICBcIiAgPHVsIGNsYXNzPVxcXCJuYXYgbmF2LXt7dGFic2V0LnR5cGUgfHwgJ3RhYnMnfX0ge3t0YWJzTmF2Q2xhc3N9fSBcXFwiIG5nLWNsYXNzPVxcXCJ7J25hdi1zdGFja2VkJzogdmVydGljYWwsICduYXYtanVzdGlmaWVkJzoganVzdGlmaWVkfVxcXCIgbmctdHJhbnNjbHVkZT48L3VsPlxcblwiICtcclxuICAgICAgXCIgIDxkaXYgY2xhc3M9XFxcInRhYi1jb250ZW50IHt7dGFic0NvbnRlbnRDbGFzc319IFxcXCI+XFxuXCIgK1xyXG4gICAgICBcIiAgICA8ZGl2IGNsYXNzPVxcXCJ0YWItcGFuZSB7e3RhYnNQYW5lQ2xhc3N9fSBcXFwiXFxuXCIgK1xyXG4gICAgICBcIiAgICAgICAgIG5nLXJlcGVhdD1cXFwidGFiIGluIHRhYnNldC50YWJzXFxcIlxcblwiICtcclxuICAgICAgXCIgICAgICAgICBuZy1jbGFzcz1cXFwie2FjdGl2ZTogdGFic2V0LmFjdGl2ZSA9PT0gdGFiLmluZGV4LCBpbjogdGFic2V0LmFjdGl2ZSA9PT0gdGFiLmluZGV4fVxcXCJcXG5cIiArXHJcbiAgICAgIFwiICAgICAgICAgdWliLXRhYi1jb250ZW50LXRyYW5zY2x1ZGU9XFxcInRhYlxcXCI+XFxuXCIgK1xyXG4gICAgICBcIiAgICA8L2Rpdj5cXG5cIiArXHJcbiAgICAgIFwiICA8L2Rpdj5cXG5cIiArXHJcbiAgICAgIFwiPC9kaXY+XFxuXCIgK1xyXG4gICAgICBcIlwiKTtcclxufV0pO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3VpLmJvb3RzdHJhcC50YWJzJylcclxuLmNvbmZpZyhbJyRwcm92aWRlJywgZnVuY3Rpb24gKCRwcm92aWRlKSB7XHJcblxyXG4gICAgLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwODIyMDIyL2FuZ3VsYXJqcy1hZGRpbmctY3VzdG9tLWNsYXNzLW9uLXVpLWJvb3RzdHJhcHMtdGFiXHJcblxyXG4gICAgLy8gVGhpcyBhZGRzIHRoZSBkZWNvcmF0b3IgdG8gdGhlIHRhYnNldCBkaXJlY3RpdmUgXHJcbiAgICAvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyLXVpL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9zcmMvdGFicy90YWJzLmpzI0w4OCBcclxuICAgICRwcm92aWRlLmRlY29yYXRvcigndWliVGFic2V0RGlyZWN0aXZlJywgWyckZGVsZWdhdGUnLCBmdW5jdGlvbiAoJGRlbGVnYXRlKSB7XHJcblxyXG4gICAgICAgIC8vIFRoZSBgJGRlbGVnYXRlYCBjb250YWlucyB0aGUgY29uZmlndXJhdGlvbiBvZiB0aGUgdGFic2V0IGRpcmVjdGl2ZSBhcyBcclxuICAgICAgICAvLyBpdCBpcyBkZWZpbmVkIGluIHRoZSB1aSBib290c3RyYXAgbW9kdWxlLlxyXG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSAkZGVsZWdhdGVbMF07XHJcblxyXG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIG9yaWdpbmFsIGxpbmsgbWV0aG9kIGZyb20gdGhlIGRpcmVjdGl2ZSBkZWZpbml0aW9uXHJcbiAgICAgICAgdmFyIGxpbmsgPSBkaXJlY3RpdmUubGluaztcclxuXHJcbiAgICAgICAgLy9BcmFzaFxyXG4gICAgICAgIC8vT3ZlcnJpZGUgdGhlIG9yaWdpbmFsIHRlbXBsYXRlVXJsIGZ1bmN0aW9uIHRvIGNoYW5nZSB0aGUgdGVtcGxhdGVcclxuICAgICAgICBkaXJlY3RpdmUudGVtcGxhdGVVcmwgPSBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xyXG4gICAgICAgICAgICByZXR1cm4gYXR0cnMudGVtcGxhdGVVcmwgfHwgJ3VpYi90ZW1wbGF0ZS90YWJzL252ci10YWJzZXQuaHRtbCc7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8vIFRoaXMgc2V0cyBhIGNvbXBpbGUgbWV0aG9kIHRvIHRoZSBkaXJlY3RpdmUgY29uZmlndXJhdGlvbiB3aGljaCB3aWxsIHByb3ZpZGVcclxuICAgICAgICAvLyB0aGUgbW9kaWZpZWQvZXh0ZW5kZWQgbGluayBtZXRob2RcclxuICAgICAgICBkaXJlY3RpdmUuY29tcGlsZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIE1vZGlmaWVkIGxpbmsgbWV0aG9kXHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2FsbCB0aGUgb3JpZ2luYWwgYGxpbmtgIG1ldGhvZFxyXG4gICAgICAgICAgICAgICAgbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgdmFsdWUgZm9yIHRoZSBgY3VzdG9tLWNsYXNzYCBhdHRyaWJ1dGUgYW5kIGFzc2lnbiBpdCB0byB0aGUgc2NvcGUuXHJcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIHRoZSBzYW1lIHRoZSBvcmlnaW5hbCBsaW5rIG1ldGhvZCBkb2VzIGZvciB0aGUgYHZlcnRpY2FsYCBhbmQgYGBqdXN0aWZpZWRgIGF0dHJpYnV0ZXNcclxuICAgICAgICAgICAgICAgIHNjb3BlLnRhYnNOYXZDbGFzcyA9IGF0dHJzLnRhYnNOYXZDbGFzcztcclxuICAgICAgICAgICAgICAgIHNjb3BlLnRhYnNDb250ZW50Q2xhc3MgPSBhdHRycy50YWJzQ29udGVudENsYXNzO1xyXG4gICAgICAgICAgICAgICAgc2NvcGUudGFic1BhbmVDbGFzcyA9IGF0dHJzLnRhYnNQYW5lQ2xhc3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgbW9kaWZpZWQgZGlyZWN0aXZlXHJcbiAgICAgICAgcmV0dXJuICRkZWxlZ2F0ZTtcclxuICAgIH1dKTtcclxufV0pOyIsImFuZ3VsYXIubW9kdWxlKCd1aS5uYXZhYXIud2lkZ2V0cycpXHJcbi5kaXJlY3RpdmUoJ252clRvZ2dsZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFQScsXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyKSB7XHJcblxyXG4gICAgICAgICAgICAvL1NNQVJUWVxyXG4gICAgICAgICAgICAvL3ZhciAkX3QgPSB0aGlzLFxyXG5cdFx0XHQvL3ByZXZpZXdQYXJDbG9zZWRIZWlnaHQgPSAyNTtcclxuXHJcbiAgICAgICAgICAgIC8valF1ZXJ5KFwiZGl2LnRvZ2dsZS5hY3RpdmUgPiBwXCIpLmFkZENsYXNzKFwicHJldmlldy1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIC8valF1ZXJ5KFwiZGl2LnRvZ2dsZS5hY3RpdmUgPiBkaXYudG9nZ2xlLWNvbnRlbnRcIikuc2xpZGVEb3duKDQwMCk7XHJcbiAgICAgICAgICAgIC8valF1ZXJ5KFwiZGl2LnRvZ2dsZSA+IGxhYmVsXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICAvLyAgICB2YXIgcGFyZW50U2VjdGlvbiA9IGpRdWVyeSh0aGlzKS5wYXJlbnQoKSxcclxuICAgICAgICAgICAgLy8gICAgICAgIHBhcmVudFdyYXBwZXIgPSBqUXVlcnkodGhpcykucGFyZW50cyhcImRpdi50b2dnbGVcIiksXHJcbiAgICAgICAgICAgIC8vICAgICAgICBwcmV2aWV3UGFyID0gZmFsc2UsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpc0FjY29yZGlvbiA9IHBhcmVudFdyYXBwZXIuaGFzQ2xhc3MoXCJ0b2dnbGUtYWNjb3JkaW9uXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgaWYgKGlzQWNjb3JkaW9uICYmIHR5cGVvZiAoZS5vcmlnaW5hbEV2ZW50KSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBwYXJlbnRXcmFwcGVyLmZpbmQoXCJkaXYudG9nZ2xlLmFjdGl2ZSA+IGxhYmVsXCIpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuICAgICAgICAgICAgLy8gICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gICAgcGFyZW50U2VjdGlvbi50b2dnbGVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgIGlmIChwYXJlbnRTZWN0aW9uLmZpbmQoXCI+IHBcIikuZ2V0KDApKSB7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgcHJldmlld1BhciA9IHBhcmVudFNlY3Rpb24uZmluZChcIj4gcFwiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIHZhciBwcmV2aWV3UGFyQ3VycmVudEhlaWdodCA9IHByZXZpZXdQYXIuY3NzKFwiaGVpZ2h0XCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgdmFyIHByZXZpZXdQYXJBbmltYXRlSGVpZ2h0ID0gcHJldmlld1Bhci5jc3MoXCJoZWlnaHRcIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBwcmV2aWV3UGFyLmNzcyhcImhlaWdodFwiLCBcImF1dG9cIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBwcmV2aWV3UGFyLmNzcyhcImhlaWdodFwiLCBwcmV2aWV3UGFyQ3VycmVudEhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICAvLyAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAgICB2YXIgdG9nZ2xlQ29udGVudCA9IHBhcmVudFNlY3Rpb24uZmluZChcIj4gZGl2LnRvZ2dsZS1jb250ZW50XCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgaWYgKHBhcmVudFNlY3Rpb24uaGFzQ2xhc3MoXCJhY3RpdmVcIikpIHtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICBqUXVlcnkocHJldmlld1BhcikuYW5pbWF0ZSh7IGhlaWdodDogcHJldmlld1BhckFuaW1hdGVIZWlnaHQgfSwgMzUwLCBmdW5jdGlvbiAoKSB7IGpRdWVyeSh0aGlzKS5hZGRDbGFzcyhcInByZXZpZXctYWN0aXZlXCIpOyB9KTtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRvZ2dsZUNvbnRlbnQuc2xpZGVEb3duKDM1MCk7XHJcblxyXG4gICAgICAgICAgICAvLyAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgIGpRdWVyeShwcmV2aWV3UGFyKS5hbmltYXRlKHsgaGVpZ2h0OiBwcmV2aWV3UGFyQ2xvc2VkSGVpZ2h0IH0sIDM1MCwgZnVuY3Rpb24gKCkgeyBqUXVlcnkodGhpcykucmVtb3ZlQ2xhc3MoXCJwcmV2aWV3LWFjdGl2ZVwiKTsgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0b2dnbGVDb250ZW50LnNsaWRlVXAoMzUwKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9BcmFzaFxyXG4gICAgICAgICAgICB2YXIgcHJldmlld1BhckNsb3NlZEhlaWdodCA9IDI1O1xyXG5cclxuICAgICAgICAgICAgaWYgKCRlbGVtZW50Lmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZCgncCcpLmFkZENsYXNzKFwicHJldmlldy1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5maW5kKCdkaXYudG9nZ2xlLWNvbnRlbnQnKS5zbGlkZURvd24oNDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAkZWxlbWVudC5maW5kKCdsYWJlbCcpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudFNlY3Rpb24gPSBqUXVlcnkodGhpcykucGFyZW50KCksXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50V3JhcHBlciA9IGpRdWVyeSh0aGlzKS5wYXJlbnRzKFwiZGl2LnRvZ2dsZVwiKSxcclxuICAgICAgICAgICAgICAgICAgICBwcmV2aWV3UGFyID0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNBY2NvcmRpb24gPSBwYXJlbnRXcmFwcGVyLmhhc0NsYXNzKFwidG9nZ2xlLWFjY29yZGlvblwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNBY2NvcmRpb24gJiYgdHlwZW9mIChlLm9yaWdpbmFsRXZlbnQpICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRXcmFwcGVyLmZpbmQoXCJkaXYudG9nZ2xlLmFjdGl2ZSA+IGxhYmVsXCIpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwYXJlbnRTZWN0aW9uLnRvZ2dsZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRTZWN0aW9uLmZpbmQoXCI+IHBcIikuZ2V0KDApKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZpZXdQYXIgPSBwYXJlbnRTZWN0aW9uLmZpbmQoXCI+IHBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZpZXdQYXJDdXJyZW50SGVpZ2h0ID0gcHJldmlld1Bhci5jc3MoXCJoZWlnaHRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZpZXdQYXJBbmltYXRlSGVpZ2h0ID0gcHJldmlld1Bhci5jc3MoXCJoZWlnaHRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlld1Bhci5jc3MoXCJoZWlnaHRcIiwgXCJhdXRvXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZpZXdQYXIuY3NzKFwiaGVpZ2h0XCIsIHByZXZpZXdQYXJDdXJyZW50SGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRvZ2dsZUNvbnRlbnQgPSBwYXJlbnRTZWN0aW9uLmZpbmQoXCI+IGRpdi50b2dnbGUtY29udGVudFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50U2VjdGlvbi5oYXNDbGFzcyhcImFjdGl2ZVwiKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkocHJldmlld1BhcikuYW5pbWF0ZSh7IGhlaWdodDogcHJldmlld1BhckFuaW1hdGVIZWlnaHQgfSwgMzUwLCBmdW5jdGlvbiAoKSB7IGpRdWVyeSh0aGlzKS5hZGRDbGFzcyhcInByZXZpZXctYWN0aXZlXCIpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVDb250ZW50LnNsaWRlRG93bigzNTApO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeShwcmV2aWV3UGFyKS5hbmltYXRlKHsgaGVpZ2h0OiBwcmV2aWV3UGFyQ2xvc2VkSGVpZ2h0IH0sIDM1MCwgZnVuY3Rpb24gKCkgeyBqUXVlcnkodGhpcykucmVtb3ZlQ2xhc3MoXCJwcmV2aWV3LWFjdGl2ZVwiKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQ29udGVudC5zbGlkZVVwKDM1MCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdBcHBDaGVja291dENvbnRyb2xsZXInLFxyXG5bJ0NhcnRTZXJ2aWNlJywgJ2xvZ2dlcicsICckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsIGZ1bmN0aW9uIChjYXJ0U2VydmljZSwgbG9nZ2VyLCAkcm9vdFNjb3BlLCAkbG9jYXRpb24pIHtcclxuICAgIGxvZ2dlciA9IGxvZ2dlci5mb3JTb3VyY2UoJ0FwcENoZWNrb3V0Q29udHJvbGxlcicpO1xyXG4gICAgdmFyIGxvZ0Vycm9yID0gbG9nZ2VyLmxvZ0Vycm9yO1xyXG4gICAgdmFyIGxvZ1N1Y2Nlc3MgPSBsb2dnZXIubG9nU3VjY2VzcztcclxuXHJcbiAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgdm0ucHJvY2Vzc09yZGVyID0gcHJvY2Vzc09yZGVyO1xyXG4gICAgdm0uZXJyb3JzID0gW107XHJcbiAgICB2bS5yZWRpcmVjdGluZ1RvR2F0ZXdheSA9IGZhbHNlO1xyXG4gICAgdm0uaXNCdXN5ID0gZmFsc2U7XHJcblxyXG4gICAgaW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgIC8qKiogaW1wbGVtZW50YXRpb24gKioqL1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgcHJvY2Vzc09yZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHJvY2Vzc09yZGVyKCkge1xyXG4gICAgICAgIHZtLmVycm9ycyA9IFtdO1xyXG4gICAgICAgIHZtLmlzQnVzeSA9IHRydWU7XHJcbiAgICAgICAgY2FydFNlcnZpY2UucHJvY2Vzc09yZGVyKCkuJHByb21pc2VcclxuICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICB2bS5yZWRpcmVjdGluZ1RvR2F0ZXdheSA9IHRydWU7XHJcbiAgICAgICAgICAgdm0uaXNCdXN5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgdmFyIGZvcm0gPSBhbmd1bGFyLmVsZW1lbnQocmVzdWx0LmZvcm1UYWcpO1xyXG4gICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnI3BheW1lbnQnKS5hcHBlbmQoZm9ybSk7XHJcbiAgICAgICAgICAgZm9ybS5zdWJtaXQoKTtcclxuICAgICAgIH0pXHJcbiAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBBcHBFcnJvcnMuZ2V0TWVzc2FnZShlcnJvcik7XHJcbiAgICAgICAgICAgdm0uZXJyb3JzLnB1c2gobWVzc2FnZSk7XHJcbiAgICAgICAgICAgdm0ucmVkaXJlY3RpbmdUb0dhdGV3YXkgPSBmYWxzZTtcclxuICAgICAgICAgICB2bS5pc0J1c3kgPSBmYWxzZTsgXHJcbiAgICAgICB9KTtcclxuICAgIH1cclxufV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdBcHBsaWNhdGlvbnNDb250cm9sbGVyJyxcclxuWyckbG9jYXRpb24nLCBmdW5jdGlvbiAoJGxvY2F0aW9uKSB7XHJcbiAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgdm0uc3VjY2Vzc2Z1bGxPcmRlciA9IGZhbHNlO1xyXG5cclxuICAgIGluaXRpYWxpemUoKTtcclxuXHJcbiAgICAvKioqIGltcGxlbWVudGF0aW9uICoqKi9cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIHZtLnN1Y2Nlc3NmdWxsT3JkZXIgPSAkbG9jYXRpb24uc2VhcmNoKCkub3JkZXI7XHJcbiAgICB9XHJcbn1dKTsiLCJ2YXIgY29udHJvbGxlcklkID0gJ0FzaWRlQ29udHJvbGxlcic7XHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKGNvbnRyb2xsZXJJZCxcclxuWydDYXRhbG9nU2VydmljZScsICdsb2dnZXInLCAnJGxvY2F0aW9uJywgJyRzY29wZScsIGZ1bmN0aW9uIChjYXRhbG9nU2VydmljZSwgbG9nZ2VyLCAkbG9jYXRpb24sICRzY29wZSkge1xyXG4gICAgbG9nZ2VyID0gbG9nZ2VyLmZvclNvdXJjZShjb250cm9sbGVySWQpO1xyXG4gICAgdmFyIGxvZ0Vycm9yID0gbG9nZ2VyLmxvZ0Vycm9yO1xyXG4gICAgdmFyIGxvZ1N1Y2Nlc3MgPSBsb2dnZXIubG9nU3VjY2VzcztcclxuXHJcbiAgICB2YXIgY29uc3RhbnRzID0ge1xyXG4gICAgICAgIGdlbnJlOiAnZ2VucmUnLFxyXG4gICAgICAgIHB1Ymxpc2hlcjogJ3B1Ymxpc2hlcicsXHJcbiAgICAgICAgYXV0aG9yOiAnYXV0aG9yJyxcclxuICAgICAgICBuYXJyYXRvcjogJ25hcnJhdG9yJyxcclxuICAgICAgICB0cmFuc2xhdG9yOiAndHJhbnNsYXRvcicsXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICB2bS5nZW5yZXMgPSBudWxsO1xyXG4gICAgdm0ucHVibGlzaGVycyA9IG51bGw7XHJcbiAgICB2bS50aXRsZSA9ICfZgdmH2LHYs9iqJztcclxuICAgIHZtLmV4cGxvcmVPcHRpb25zID0gW3sgJ2NvZGUnOiAxLCAndGl0bGUnOiAn2YbZiNuM2LPZhtiv2YcnIH0sIHsgJ2NvZGUnOiAyLCAndGl0bGUnOiAn2LHYp9mI24wnIH0sIHsgJ2NvZGUnOiAzLCAndGl0bGUnOiAn2YXYqtix2KzZhScgfSwgeyAnY29kZSc6IDQsICd0aXRsZSc6ICfZhtin2LTYsScgfV07XHJcblxyXG4gICAgdm0uZ2V0U2VhcmNoSXRlbXMgPSBnZXRTZWFyY2hJdGVtcztcclxuICAgIHZtLm9uU2VsZWN0SXRlbSA9IG9uU2VsZWN0SXRlbTtcclxuICAgIHZtLnNob3dPcHRpb24gPSBzaG93T3B0aW9uO1xyXG4gICAgdm0uaGlkZSA9IGhpZGU7XHJcbiAgICB2bS5jdXJyZW50U2VhcmNoT3B0aW9uID0geyAnY29kZSc6IDEsICd0aXRsZSc6ICfZhtmI24zYs9mG2K/ZhycgfTtcclxuXHJcbiAgICBpbml0aWFsaXplKCk7XHJcblxyXG4gICAgLyoqKiBpbXBsZW1lbnRhdGlvbiAqKiovXHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICBnZXRHZW5yZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRHZW5yZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhdGFsb2dTZXJ2aWNlLmdldEdlbnJlcygpLnRoZW4oZnVuY3Rpb24gKGl0ZW1zKSB7XHJcbiAgICAgICAgICAgIHZtLmdlbnJlcyA9IGl0ZW1zO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFB1Ymxpc2hlcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhdGFsb2dTZXJ2aWNlLmdldFB1Ymxpc2hlcnMoKS50aGVuKGZ1bmN0aW9uIChpdGVtcykge1xyXG4gICAgICAgICAgICB2bS5wdWJsaXNoZXJzID0gaXRlbXM7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2VhcmNoSXRlbXModmFsKSB7XHJcbiAgICAgICAgc3dpdGNoICh2bS5jdXJyZW50U2VhcmNoT3B0aW9uLmNvZGUpIHtcclxuICAgICAgICAgICAgY2FzZSAxOiAvL2F1dGhvclxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldEFydGlzdHModmFsLCBjb25zdGFudHMuYXV0aG9yKTtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgMjogLy9uYXJyYXRvclxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldEFydGlzdHModmFsLCBjb25zdGFudHMubmFycmF0b3IpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAzOiAvL3RyYW5zbGF0b3JcclxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRBcnRpc3RzKHZhbCwgY29uc3RhbnRzLnRyYW5zbGF0b3IpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSA0OiAvL3B1Ymxpc2hlclxyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1zID0gW107XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2F0YWxvZ1NlcnZpY2UuZ2V0UHVibGlzaGVycyh2YWwpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goZGF0YSwgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7ICdpZCc6IGl0ZW0ucHVibGlzaGVySWQsICd0aXRsZSc6IGl0ZW0ubmFtZSwgJ3NsdWcnOiBpdGVtLnNsdWcgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEFydGlzdHModmFsLCB0eXBlKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gW107XHJcbiAgICAgICAgcmV0dXJuIGNhdGFsb2dTZXJ2aWNlLmdldEFydGlzdHModmFsLCB0eXBlKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChkYXRhLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7ICdpZCc6IGl0ZW0uYXJ0aXN0SWQsICd0aXRsZSc6IGl0ZW0uZmlyc3ROYW1lICsgJyAnICsgaXRlbS5sYXN0TmFtZSwgJ3NsdWcnOiBpdGVtLnNsdWcgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbXM7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25TZWxlY3RJdGVtKCRpdGVtKSB7XHJcbiAgICAgICAgdmFyIHBhdGggPSAnL2NhdGFsb2cnO1xyXG4gICAgICAgIHN3aXRjaCAodm0uY3VycmVudFNlYXJjaE9wdGlvbi5jb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMSA6ICAgLy9hdXRob3JcclxuICAgICAgICAgICAgICAgIHBhdGggKz0gJy8nICsgY29uc3RhbnRzLmF1dGhvcjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6ICAgLy9uYXJyYXRvclxyXG4gICAgICAgICAgICAgICAgcGF0aCArPSAnLycgKyBjb25zdGFudHMubmFycmF0b3I7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOiAgIC8vdHJhbnNsYXRvclxyXG4gICAgICAgICAgICAgICAgcGF0aCArPSAnLycgKyBjb25zdGFudHMudHJhbnNsYXRvcjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6ICAgLy9wdWJsaXNoZXJcclxuICAgICAgICAgICAgICAgIHBhdGggKz0gJy8nICsgY29uc3RhbnRzLnB1Ymxpc2hlcjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGxvY2F0aW9uLnBhdGgocGF0aCArICcvJyArICRpdGVtLmlkICsgKCRpdGVtLnNsdWcgPyBcIi9cIiArICRpdGVtLnNsdWcgOiAnJykpO1xyXG4gICAgICAgIHZtLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dPcHRpb24oY29kZSwgdGl0bGUpIHtcclxuICAgICAgICB2bS5jdXJyZW50U2VhcmNoT3B0aW9uID0geyAnY29kZSc6IGNvZGUsICd0aXRsZSc6IHRpdGxlIH07XHJcbiAgICB9XHJcbn1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignQXVkaW9Cb29rQ29udHJvbGxlcicsXHJcblsnQ2F0YWxvZ1NlcnZpY2UnLCAnVXNlckxpYnJhcnlTZXJ2aWNlJywgJ0F1ZGlvQm9va1NlcnZpY2UnLCAnQ2FydFNlcnZpY2UnLCAnbG9nZ2VyJywgJyRyb3V0ZVBhcmFtcycsICckc2NvcGUnLCAnJHVpYk1vZGFsJywgJyRyb290U2NvcGUnLCAnJGxvY2F0aW9uJywgJ0FuYWx5dGljc1NlcnZpY2UnLCAnQU5BTFlUSUNTJywgJyRhbmNob3JTY3JvbGwnLCAnJGZpbHRlcicsIGZ1bmN0aW9uIChjYXRhbG9nU2VydmljZSwgdXNlckxpYnJhcnlTZXJ2aWNlLCBhdWRpb0Jvb2tTZXJ2aWNlLCBjYXJ0U2VydmljZSwgbG9nZ2VyLCAkcm91dGVQYXJhbXMsICRzY29wZSwgJG1vZGFsLCAkcm9vdFNjb3BlLCAkbG9jYXRpb24sIGFuYWx5dGljc1NlcnZpY2UsIEFOQUxZVElDUywgJGFuY2hvclNjcm9sbCwgJGZpbHRlcikge1xyXG4gICAgbG9nZ2VyID0gbG9nZ2VyLmZvclNvdXJjZSgnQXVkaW9Cb29rQ29udHJvbGxlcicpO1xyXG4gICAgdmFyIGxvZ0Vycm9yID0gbG9nZ2VyLmxvZ0Vycm9yO1xyXG4gICAgdmFyIGxvZ1N1Y2Nlc3MgPSBsb2dnZXIubG9nU3VjY2VzcztcclxuXHJcbiAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgdm0uYXVkaW9ib29rID0gbnVsbDtcclxuICAgIHZtLnByb2R1Y3QgPSBudWxsO1xyXG4gICAgdm0ubXAzRmlsZSA9IG51bGw7XHJcbiAgICB2bS5vZ2dGaWxlID0gbnVsbDtcclxuICAgIHZtLnBhdXNlUHJldmlldyA9IHRydWU7XHJcbiAgICB2bS5yY21uZEl0ZW1zID0gW107XHJcblxyXG4gICAgdm0ucHVyY2hhc2VTdGF0dXMgPSB7XHJcbiAgICAgICAgdmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgcHVyY2hhc2VTdGF0ZToge1xyXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGJ1dHRvblRleHQ6ICfYr9in2YbZhNmI2K8g2qnYqtin2Kgg2LXZiNiq24wnLFxyXG4gICAgICAgICAgICBnYUxhYmVsOiAnJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1YnNjcmlwdGlvblN0YXRlOiB7XHJcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uTWluUHJpY2U6IEluZmluaXR5LFxyXG4gICAgICAgICAgICBidXR0b25UZXh0OiAn2K/YsduM2KfZgdiqINio2Kcg2KfYtNiq2LHYp9qpJyxcclxuICAgICAgICAgICAgZ2FMYWJlbDogJycsXHJcbiAgICAgICAgICAgIGZpbmlzaGVkUXVvdGE6IGZhbHNlLFxyXG4gICAgICAgICAgICBleHRyYURpc2NvdW50OiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNQdXJjaGFzZWQ6IGZhbHNlLFxyXG4gICAgICAgIGlzTG9hZGVkOiBmYWxzZSxcclxuICAgIH07XHJcblxyXG4gICAgdm0uc2F2ZVJhdGluZyA9IHNhdmVSYXRpbmc7XHJcbiAgICB2bS5nZXRDdXJyZW50VXJsID0gZ2V0Q3VycmVudFVybDtcclxuICAgIHZtLmdldFN0YXR1c1RpdGxlID0gZ2V0U3RhdHVzVGl0bGU7XHJcbiAgICB2bS5wdXJjaGFzZSA9IHB1cmNoYXNlO1xyXG5cclxuICAgIGluaXRpYWxpemUoKTtcclxuXHJcbiAgICAvKioqIGltcGxlbWVudGF0aW9uICoqKi9cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIHZhciBhdWRpb0Jvb2tJZCA9ICRyb3V0ZVBhcmFtcy5hdWRpb0Jvb2tJZDtcclxuICAgICAgICBpZiAoYXVkaW9Cb29rSWQpIHtcclxuICAgICAgICAgICAgZ2V0QXVkaW9Cb29rRGV0YWlsKGF1ZGlvQm9va0lkKTtcclxuICAgICAgICAgICAgZ2V0U3VnZ2VzdGlvbnMoYXVkaW9Cb29rSWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRQYWdlTWV0YURhdGEoKSB7XHJcbiAgICAgICAgdmFyIHRpdGxlID0gJHJvb3RTY29wZS5QYWdlLmdldFRpdGxlKCk7XHJcbiAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gJHJvb3RTY29wZS5QYWdlLmdldERlc2NyaXB0aW9uKCk7XHJcbiAgICAgICAgdmFyIGtleXdvcmRzID0gdm0uYXVkaW9ib29rLnRpdGxlO1xyXG5cclxuICAgICAgICBpZiAodm0uYXVkaW9ib29rLnRpdGxlKSB7XHJcbiAgICAgICAgICAgIHRpdGxlID0gdm0uYXVkaW9ib29rLnRpdGxlO1xyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA9ICRyb290U2NvcGUuUGFnZS5nZXRUaXRsZSgpICsgJyAnICsgdm0uYXVkaW9ib29rLnRpdGxlICsgJyAuICcgKyBkZXNjcmlwdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuUGFnZS5zZXRUaXRsZSh0aXRsZSk7XHJcbiAgICAgICAgJHJvb3RTY29wZS5QYWdlLnNldERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uLnRyaW0oKSk7XHJcbiAgICAgICAgJHJvb3RTY29wZS5QYWdlLnNldEtleXdvcmRzKGtleXdvcmRzKTtcclxuXHJcbiAgICAgICAgLy92YXIgaG9zdCA9IChjZG5QcmVmaXggJiYgY2RuUHJlZml4Lmxlbmd0aCA+IDApID8gY2RuUHJlZml4XHJcbiAgICAgICAgLy8gICAgOiAoJGxvY2F0aW9uLnByb3RvY29sKCkgKyAnOi8vJyArICRsb2NhdGlvbi5ob3N0KCkgKyAoJGxvY2F0aW9uLnBvcnQoKSA9PSA4MCA/ICcnIDogKCc6JyArICRsb2NhdGlvbi5wb3J0KCkpKSk7XHJcblxyXG4gICAgICAgIHZhciBob3N0ID0gXCJodHRwOi8vd3d3Lm5hdmFhci5pclwiO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLlBhZ2Uuc2V0SW1hZ2UoaG9zdCArICcvY29udGVudC9ib29rcy8nICsgdm0uYXVkaW9ib29rLmF1ZGlvQm9va0lkICsgJy9waWMuanBnP3Q9JyArIHZtLmF1ZGlvYm9vay5yZWNvcmRWZXJzaW9uKTtcclxuICAgICAgICAvLyRyb290U2NvcGUuUGFnZS5zZXRBdWRpbyhob3N0ICsgJy9jb250ZW50L2Jvb2tzLycgKyB2bS5hdWRpb2Jvb2suYXVkaW9Cb29rSWQgKyAnL3NhbXBsZS5tcDM/dD0nICsgdm0uYXVkaW9ib29rLnJlY29yZFZlcnNpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEF1ZGlvQm9va0RldGFpbChpZCkge1xyXG4gICAgICAgIGNhdGFsb2dTZXJ2aWNlLmdldEF1ZGlvQm9va0RldGFpbCh7XHJcbiAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgdm0uYXVkaW9ib29rID0gcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHZtLmF1ZGlvYm9vayAmJiB2bS5hdWRpb2Jvb2sucHJvZHVjdHMgJiYgdm0uYXVkaW9ib29rLnByb2R1Y3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHZtLnByb2R1Y3QgPSB2bS5hdWRpb2Jvb2sucHJvZHVjdHNbMF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNldFBhZ2VNZXRhRGF0YSgpO1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmlzQXV0aGVudGljYXRlZCkge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlUHVyY2hhc2VTdGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgJiYgZXJyb3Iuc3RhdHVzID09IDQwNCkge1xyXG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy80MDQnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEFwcEVycm9ycy5nZXRNZXNzYWdlKGVycm9yKTtcclxuICAgICAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNhdmVSYXRpbmcodmFsdWUpIHtcclxuXHJcbiAgICAgICAgYW5hbHl0aWNzU2VydmljZS50cmFja0V2ZW50KEFOQUxZVElDUy5jYXRlZ29yeS5VSSwgQU5BTFlUSUNTLnVpQWN0aW9uLkNMSUNLLCAncmF0aW5nLScgKyB2bS5hdWRpb2Jvb2suaWRlbnRpZmllciArICctJyArIHZtLmF1ZGlvYm9vay50aXRsZSwgdm0uYXVkaW9ib29rLnJhdGluZy5hdmVyYWdlKTtcclxuXHJcbiAgICAgICAgYXVkaW9Cb29rU2VydmljZS5yYXRlKHtcclxuICAgICAgICAgICAgYXVkaW9Cb29rSWQ6IHZtLmF1ZGlvYm9vay5hdWRpb0Jvb2tJZCxcclxuICAgICAgICAgICAgcmF0aW5nVmFsdWU6IHZhbHVlLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5jb3VudCkge1xyXG4gICAgICAgICAgICAgICAgdm0uYXVkaW9ib29rLnJhdGluZy5hdmVyYWdlID0gcmVzdWx0LmF2ZXJhZ2U7XHJcbiAgICAgICAgICAgICAgICB2bS5hdWRpb2Jvb2sucmF0aW5nLmNvdW50ID0gcmVzdWx0LmNvdW50O1xyXG5cclxuICAgICAgICAgICAgICAgIGxvZ1N1Y2Nlc3MoJ9mG2LjYsSDYtNmF2Kcg2KjYpyDZhdmI2YHZgtuM2Kog2KvYqNiqINi02K8uJywgcmVzdWx0LCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEFwcEVycm9ycy5nZXRNZXNzYWdlKGVycm9yKTtcclxuICAgICAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvZ2dsZVBsYXllcihhdWRpb2Jvb2spIHtcclxuICAgICAgICBpZiAoIXZtLm1wM0ZpbGUpIHtcclxuICAgICAgICAgICAgdm0ubXAzRmlsZSA9IGNkblByZWZpeCArICcvY29udGVudC9ib29rcy8nICsgYXVkaW9ib29rLmF1ZGlvQm9va0lkICsgJy9zYW1wbGUubXAzP3Q9JyArIGF1ZGlvYm9vay5yZWNvcmRWZXJzaW9uO1xyXG4gICAgICAgICAgICB2bS5vZ2dGaWxlID0gY2RuUHJlZml4ICsgJy9jb250ZW50L2Jvb2tzLycgKyBhdWRpb2Jvb2suYXVkaW9Cb29rSWQgKyAnL3NhbXBsZS5vZ2c/dD0nICsgYXVkaW9ib29rLnJlY29yZFZlcnNpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZtLnBhdXNlUHJldmlldyA9ICF2bS5wYXVzZVByZXZpZXc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U3RhdHVzVGl0bGUoc3RhdHVzKSB7XHJcbiAgICAgICAgc3dpdGNoIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcgKNio2LLZiNiv24wpJztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcgKNi624zYsSDZgtin2KjZhCDZgdix2YjYtCknO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTdWdnZXN0aW9ucyhpZCkge1xyXG4gICAgICAgIGNhdGFsb2dTZXJ2aWNlLmdldENhdGFsb2coe1xyXG4gICAgICAgICAgICBhY3Rpb246ICdyZWNvbW1lbmQnLFxyXG4gICAgICAgICAgICBrZXk6IGlkLFxyXG4gICAgICAgICAgICAkdG9wOiA2LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB2bS5yY21uZEl0ZW1zID0gcmVzdWx0Lml0ZW1zO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEFwcEVycm9ycy5nZXRNZXNzYWdlKGVycm9yKTtcclxuICAgICAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dMb2dpbihkYXRhKSB7XHJcbiAgICAgICAgaWYgKCEkcm9vdFNjb3BlLmlzQXV0aGVudGljYXRlZCkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmxvZ2luKGRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRUb0NhcnQoaWQsIHRyYW5zaXRpb25UeXBlKSB7XHJcbiAgICAgICAgaWYgKCF0cmFuc2l0aW9uVHlwZSkge1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uVHlwZSA9IDA7IC8vdGhlIGRlZmF1bHQgaXMgcHVyY2hhc2UuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhcnRTZXJ2aWNlLnNhdmUoe30sIHtcclxuICAgICAgICAgICAgcHJvZHVjdElkOiBpZCxcclxuICAgICAgICAgICAgbGlicmFyeVRyYW5zaXRpb25UeXBlOiB0cmFuc2l0aW9uVHlwZSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgY2FydFNlcnZpY2UuZ2V0Q2FydFRvdGFsQ291bnQoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5jYXJ0SXRlbXNDb3VudCA9IHJlc3VsdC5jb3VudDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRsb2NhdGlvbi51cmwoJy9jaGVja291dCcpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEFwcEVycm9ycy5nZXRNZXNzYWdlKGVycm9yKTtcclxuICAgICAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEN1cnJlbnRVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuICRsb2NhdGlvbi5hYnNVcmwoKTtcclxuICAgICAgICAvL3JldHVybiAkbG9jYXRpb24uYWJzVXJsKCkucmVwbGFjZSgnaHR0cDovL2xvY2FsaG9zdDo1Mjc2MicsICdodHRwOi8vd3d3Lm5hdmFhci5pcicpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVB1cmNoYXNlU3RhdGUoKSB7XHJcbiAgICAgICAgdm0ucHVyY2hhc2VTdGF0dXMuaXNMb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgY2FydFNlcnZpY2UuZ2V0UHVyY2hhc2VTdGF0dXMoKS4kcHJvbWlzZVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKHZtLmF1ZGlvYm9vayAmJiB2bS5wcm9kdWN0KSB7XHJcbiAgICAgICAgICAgICAgICB2bS5hdWRpb2Jvb2sucHVyY2hhc2VJbmZvID0gcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vc2V0IGlzIGlzUHVyY2hhc2VkXHJcbiAgICAgICAgICAgICAgICB2bS5hdWRpb2Jvb2sucHJvZHVjdHMuZm9yRWFjaChmdW5jdGlvbiAocHJvZHVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQubGlicmFyeUluZm9bcHJvZHVjdC5wcm9kdWN0SWRdKSB7IC8vdGhlIHByb2R1Y3QgZXhpc3RzIGluIHVzZXIgbGlicmFyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5wdXJjaGFzZVN0YXR1cy5pc1B1cmNoYXNlZCA9IHRydWU7IC8vcHVyY2hhc2VkXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHB1cmNoYXNlQnV0dG9uVGV4dCA9ICcnLCBzdWJzY3JpcHRpb25CdXR0b25UZXh0ID0gJydcclxuICAgICAgICAgICAgICAgIHZhciBwdXJjaGFzZUJ1dHRvbkdBTGFiZWwgPSAnJywgc3Vic2NyaXB0aW9uQnV0dG9uR0FMYWJlbCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgdmFyIHB1cmNoYXNlU3RhdGVWaXNpYmxlID0gZmFsc2UsIHN1YnNjcmlwdGlvblN0YXRlVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdmFyIHB1cmNoYXNlQnV0dG9uRW5hYmxlZCA9IGZhbHNlLCBzdWJzY3JpcHRpb25CdXR0b25FbmFibGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHZtLnB1cmNoYXNlU3RhdHVzLmlzUHVyY2hhc2VkKSB7IC8vOFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhlIGl0ZW0gaXMgYWxyZWFkeSBwdXJjaGFzZWRcclxuICAgICAgICAgICAgICAgICAgICBwdXJjaGFzZUJ1dHRvblRleHQgPSAn2YXYsdin2KzYudmHINio2Ycg2qnYqtin2KjYrtin2YbZhyc7XHJcbiAgICAgICAgICAgICAgICAgICAgcHVyY2hhc2VCdXR0b25HQUxhYmVsID0gJ3B1cmNoYXNlLWxpYnJhcnknO1xyXG4gICAgICAgICAgICAgICAgICAgIHB1cmNoYXNlU3RhdGVWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBwdXJjaGFzZUJ1dHRvbkVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2bS5wcm9kdWN0LnByaWNlID09IDApIHsgLy8yXHJcbiAgICAgICAgICAgICAgICAgICAgLy9mcmVlIGJvb2tzXHJcbiAgICAgICAgICAgICAgICAgICAgcHVyY2hhc2VCdXR0b25UZXh0ID0gJ9iv2KfZhtmE2YjYryDYsdin24zar9in2YYnO1xyXG4gICAgICAgICAgICAgICAgICAgIHB1cmNoYXNlQnV0dG9uR0FMYWJlbCA9ICdwdXJjaGFzZS1mcmVlJztcclxuICAgICAgICAgICAgICAgICAgICBwdXJjaGFzZVN0YXRlVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcHVyY2hhc2VCdXR0b25FbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodm0uYXVkaW9ib29rLnB1cmNoYXNlSW5mby5zdWJzY3JpcHRpb25JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zdWJzY3JpcHRpb24gb3B0aW9uIGlzIG9mZmVyZWRcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3Vic2NyaXB0aW9uSW5mbyA9IHZtLmF1ZGlvYm9vay5wdXJjaGFzZUluZm8uc3Vic2NyaXB0aW9uSW5mbztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZXQgc3Vic2NyaXB0aW9uIG1pbiBwcmljZVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW5QcmljZSA9IHZtLnB1cmNoYXNlU3RhdHVzLnN1YnNjcmlwdGlvblN0YXRlLnN1YnNjcmlwdGlvbk1pblByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbkluZm8uc3Vic2NyaXB0aW9uUHJvZHVjdHMuZm9yRWFjaChmdW5jdGlvbiAocHJvZHVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvZHVjdC5pc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1QcmljZSA9IHByb2R1Y3QucHJpY2UgLyBwcm9kdWN0LnBsYW5RdW90YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtUHJpY2UgPCBtaW5QcmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pblByaWNlID0gaXRlbVByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0ucHVyY2hhc2VTdGF0dXMuc3Vic2NyaXB0aW9uU3RhdGUuc3Vic2NyaXB0aW9uTWluUHJpY2UgPSBtaW5QcmljZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZXQgdmlzaWJpbGl0eSBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgcHVyY2hhc2VTdGF0ZVZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvblN0YXRlVmlzaWJsZSA9IHRydWU7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIHRoZSB1c2VyIGhhcyBhY3RpdmUgc3Vic2NyaXB0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1YnNjcmlwdGlvbkluZm8uc3Vic2NyaXB0aW9uTWVtYmVyc2hpcEluZm8uaGFzQWN0aXZlU3Vic2NyaXB0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uSW5mby5zdWJzY3JpcHRpb25NZW1iZXJzaGlwSW5mby5oYXNTdWJzY3JpcHRpb25RdW90YSkgeyAgIC8vNlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVyY2hhc2VCdXR0b25UZXh0ID0gJ9iu2LHbjNivINio2Kcg2YLbjNmF2KogJyArICRmaWx0ZXIoJ251bWJlcicpKHZtLnByb2R1Y3QucHJpY2UgLyAxMCkgKyAnINiq2YjZhdin2YYnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVyY2hhc2VCdXR0b25HQUxhYmVsID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXJjaGFzZUJ1dHRvbkVuYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb25CdXR0b25UZXh0ID0gJ9iv2LHbjNin2YHYqiDYsdin24zar9in2YYg2KjYpyDYp9i02KrYsdin2qknO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uQnV0dG9uR0FMYWJlbCA9ICdzdWJzY3JpcHRpb24tcXVvdGEnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uQnV0dG9uRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAgIC8vN1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiB0aGUgdXNlciBoYXMgbm8gYXZhaWxhYmxlIHF1b3RhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXJjaGFzZUJ1dHRvblRleHQgPSAn2K7YsduM2K8g2KjYpyDZgtuM2YXYqiAnICsgJGZpbHRlcignbnVtYmVyJykodm0ucHJvZHVjdC5wcmljZSAvIDEwLjAgKiAoMSAtIHN1YnNjcmlwdGlvbkluZm8uc3Vic2NyaXB0aW9uTWVtYmVyc2hpcEluZm8uc3Vic2NyaXB0aW9uRXh0cmFEaXNjb3VudCkpICsgJyDYqtmI2YXYp9mGJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1cmNoYXNlQnV0dG9uR0FMYWJlbCA9ICdwdXJjaGFzZS1zdWJzY3JpcHRpb24tZGlzY291bnQnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVyY2hhc2VCdXR0b25FbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb25CdXR0b25UZXh0ID0gJ9iv2LHbjNin2YHYqiDYsdin24zar9in2YYg2KjYpyDYp9i02KrYsdin2qknO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uQnV0dG9uR0FMYWJlbCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uQnV0dG9uRW5hYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLnB1cmNoYXNlU3RhdHVzLnN1YnNjcmlwdGlvblN0YXRlLmZpbmlzaGVkUXVvdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0ucHVyY2hhc2VTdGF0dXMuc3Vic2NyaXB0aW9uU3RhdGUuZXh0cmFEaXNjb3VudCA9IHN1YnNjcmlwdGlvbkluZm8uc3Vic2NyaXB0aW9uTWVtYmVyc2hpcEluZm8uc3Vic2NyaXB0aW9uRXh0cmFEaXNjb3VudCAqIDEwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAgIC8vNCw1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgdGhlIHVzZXIgaGFzIG5vIGFjdGl2ZSBzdWJzY3JpcHRpb25cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1cmNoYXNlQnV0dG9uVGV4dCA9ICfYrtix24zYryDYqNinINmC24zZhdiqICcgKyAkZmlsdGVyKCdudW1iZXInKSh2bS5wcm9kdWN0LnByaWNlIC8gMTApICsgJyDYqtmI2YXYp9mGJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHVyY2hhc2VCdXR0b25HQUxhYmVsID0gJ3B1cmNoYXNlLXdpdGgtc3Vic2NyaXB0aW9uJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHVyY2hhc2VCdXR0b25FbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbkJ1dHRvblRleHQgPSB2bS5wcm9kdWN0LnByaWNlID4gdm0ucHVyY2hhc2VTdGF0dXMuc3Vic2NyaXB0aW9uU3RhdGUuc3Vic2NyaXB0aW9uTWluUHJpY2UgPyAn2KfYsiDYt9ix24zZgiDYt9ix2K0g2KfYtNiq2LHYp9qpOiAnICsgJGZpbHRlcignbnVtYmVyJykodm0ucHVyY2hhc2VTdGF0dXMuc3Vic2NyaXB0aW9uU3RhdGUuc3Vic2NyaXB0aW9uTWluUHJpY2UgLyAxMCkgKyAnINiq2YjZhdin2YYnIDogJ9iv2LHbjNin2YHYqiDYqNinINiq2K7ZgduM2YEg2KfYtNiq2LHYp9qpJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uQnV0dG9uR0FMYWJlbCA9ICdzdWJzY3JpcHRpb24td2l0aC1wdXJjaGFzZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbkJ1dHRvbkVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5hbHl0aWNzU2VydmljZS50cmFja0V2ZW50KEFOQUxZVElDUy5jYXRlZ29yeS5VSSwgQU5BTFlUSUNTLnVpQWN0aW9uLlNIT1dOLCAnc3Vic2NyaXB0aW9uLXNob3duJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgICAgLy8zXHJcbiAgICAgICAgICAgICAgICAgICAgLy9qdXN0IHNob3cgdGhlIHB1cmNoYXNlIG9wdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIHB1cmNoYXNlQnV0dG9uVGV4dCA9ICfYrtix24zYryDYqNinINmC24zZhdiqICcgKyAkZmlsdGVyKCdudW1iZXInKSh2bS5wcm9kdWN0LnByaWNlIC8gMTApICsgJyDYqtmI2YXYp9mGJztcclxuICAgICAgICAgICAgICAgICAgICBwdXJjaGFzZUJ1dHRvbkdBTGFiZWwgPSAncHVyY2hhc2UtanVzdC1wdXJjaGFzZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgcHVyY2hhc2VCdXR0b25FbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBwdXJjaGFzZVN0YXRlVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vc2V0IHN0YXRlc1xyXG4gICAgICAgICAgICAgICAgdm0ucHVyY2hhc2VTdGF0dXMucHVyY2hhc2VTdGF0ZS5idXR0b25UZXh0ID0gcHVyY2hhc2VCdXR0b25UZXh0O1xyXG4gICAgICAgICAgICAgICAgdm0ucHVyY2hhc2VTdGF0dXMuc3Vic2NyaXB0aW9uU3RhdGUuYnV0dG9uVGV4dCA9IHN1YnNjcmlwdGlvbkJ1dHRvblRleHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdm0ucHVyY2hhc2VTdGF0dXMucHVyY2hhc2VTdGF0ZS5nYUxhYmVsID0gcHVyY2hhc2VCdXR0b25HQUxhYmVsO1xyXG4gICAgICAgICAgICAgICAgdm0ucHVyY2hhc2VTdGF0dXMuc3Vic2NyaXB0aW9uU3RhdGUuZ2FMYWJlbCA9IHN1YnNjcmlwdGlvbkJ1dHRvbkdBTGFiZWw7XHJcblxyXG4gICAgICAgICAgICAgICAgdm0ucHVyY2hhc2VTdGF0dXMucHVyY2hhc2VTdGF0ZS5lbmFibGVkID0gcHVyY2hhc2VCdXR0b25FbmFibGVkO1xyXG4gICAgICAgICAgICAgICAgdm0ucHVyY2hhc2VTdGF0dXMuc3Vic2NyaXB0aW9uU3RhdGUuZW5hYmxlZCA9IHN1YnNjcmlwdGlvbkJ1dHRvbkVuYWJsZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdm0ucHVyY2hhc2VTdGF0dXMucHVyY2hhc2VTdGF0ZS52aXNpYmxlID0gcHVyY2hhc2VTdGF0ZVZpc2libGU7XHJcbiAgICAgICAgICAgICAgICB2bS5wdXJjaGFzZVN0YXR1cy5zdWJzY3JpcHRpb25TdGF0ZS52aXNpYmxlID0gc3Vic2NyaXB0aW9uU3RhdGVWaXNpYmxlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2bS5wdXJjaGFzZVN0YXR1cy5pc0xvYWRlZCA9IHRydWU7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vc2V0IHB1cmNoYXNlIHN0YXR1cyB2aXNpYmlsaXR5XHJcbiAgICAgICAgICAgIHZtLnB1cmNoYXNlU3RhdHVzLnZpc2libGUgPSAkcm9vdFNjb3BlLmlzQXV0aGVudGljYXRlZCAmJiB2bS5hdWRpb2Jvb2suc3RhdHVzID09IDAgJiYgdm0ucHVyY2hhc2VTdGF0dXMuaXNMb2FkZWQgJiYgdm0ucHJvZHVjdDtcclxuICAgICAgICB9KVxyXG4gICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgIHZhciBtZXNzYWdlID0gQXBwRXJyb3JzLmdldE1lc3NhZ2UoZXJyb3IpO1xyXG4gICAgICAgIGxvZ0Vycm9yKG1lc3NhZ2UsIGVycm9yLCB0cnVlKTtcclxuXHJcbiAgICAgICAgdm0ucHVyY2hhc2VTdGF0dXMuaXNMb2FkZWQgPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHVyY2hhc2UobW9kZSkge1xyXG4gICAgICAgIC8vMDogcHVyY2hhc2VcclxuICAgICAgICAvLzE6IHN1YnNjcmlwdGlvblxyXG4gICAgICAgIG1vZGUgPSBtb2RlIHx8IDA7XHJcblxyXG4gICAgICAgIHZhciBwcm9kdWN0ID0gdm0ucHJvZHVjdDtcclxuXHJcbiAgICAgICAgLy9zaG93IGxvZ2luIGlmIG5vdCBhdXRoZW50aWNhdGVkLlxyXG4gICAgICAgIGlmIChzaG93TG9naW4oeyBwcm9kdWN0SWQ6IHByb2R1Y3QucHJvZHVjdElkLCB0cmFuc2l0aW9uVHlwZTogMCB9KSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAobW9kZSA9PSAwKSB7ICAgIC8vcHVyY2hhc2VcclxuICAgICAgICAgICAgLy9nbyB0byBsaWJyYXJ5IHBhZ2UgaWYgYWxyZWFkeSBwdXJjaGFzZWQuXHJcbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmlzQXV0aGVudGljYXRlZCAmJiB2bS5wdXJjaGFzZVN0YXR1cy5pc1B1cmNoYXNlZCkge1xyXG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnVybCgnL3VzZXI/bGlicmFyeScpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG1vZGUgPT0gMSkgeyAgIC8vc3Vic2NyaXB0aW9uXHJcbiAgICAgICAgICAgIGlmICh2bS5hdWRpb2Jvb2sucHVyY2hhc2VJbmZvLnN1YnNjcmlwdGlvbkluZm8gJiYgIXZtLmF1ZGlvYm9vay5wdXJjaGFzZUluZm8uc3Vic2NyaXB0aW9uSW5mby5zdWJzY3JpcHRpb25NZW1iZXJzaGlwSW5mby5oYXNBY3RpdmVTdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgICAgICRsb2NhdGlvbi51cmwoJy9zdWJzY3JpcHRpb24/cj0vYXVkaW9ib29rLycgKyB2bS5hdWRpb2Jvb2suaWRlbnRpZmllciArICcvJyArIHZtLmF1ZGlvYm9vay5zbHVnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWRkVG9DYXJ0KHByb2R1Y3QucHJvZHVjdElkKTtcclxuICAgIH1cclxuXHJcbiAgICAkc2NvcGUuJG9uKCdsb2dnZWRPbicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdXBkYXRlUHVyY2hhc2VTdGF0ZSgpO1xyXG4gICAgfSk7XHJcbn1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignQXV0aFJlZGlyZWN0Q29udHJvbGxlcicsXHJcblsnVXNlck1hbmFnZXInLCAnJGxvY2F0aW9uJywgJ2Jhc2U2NCcsICckaHR0cCcsIGZ1bmN0aW9uICh1c2VyTWFuYWdlciwgJGxvY2F0aW9uLCBiYXNlNjQsICRodHRwKSB7XHJcbiAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgIGluaXRpYWxpemUoKTtcclxuXHJcbiAgICAvKioqIGltcGxlbWVudGF0aW9uICoqKi9cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIHZhciBlbmNvZGVkVGlja2V0ID0gJGxvY2F0aW9uLnNlYXJjaCgpLnRpY2tldDtcclxuICAgICAgICB2YXIgcmV0dXJuVXJsID0gJGxvY2F0aW9uLnNlYXJjaCgpLnVybDtcclxuICAgICAgICB2YXIgY2xpZW50SWQgPSAkbG9jYXRpb24uc2VhcmNoKCkuY2xpZW50SWQgfHwgMztcclxuXHJcbiAgICAgICAgaWYgKCFlbmNvZGVkVGlja2V0IHx8ICFyZXR1cm5VcmwpIHtcclxuICAgICAgICAgICAgdm0uZXJyb3JzID0gQXBwRXJyb3JzLmdldEVycm9ycyhudWxsLCAn2qnYryDZhdix2KjZiNi32Ycg2YXYudiq2KjYsSDZhtuM2LPYqi4nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGRlY29kZWRUaWNrZXQgPSBiYXNlNjQudXJsZGVjb2RlKGVuY29kZWRUaWNrZXQpO1xyXG4gICAgICAgIHZhciB0aWNrZXQgPSBKU09OLnBhcnNlKGRlY29kZWRUaWNrZXQpO1xyXG5cclxuICAgICAgICAvL3N0b3JlIHRpY2tldCBpbmZvXHJcbiAgICAgICAgdXNlck1hbmFnZXIubG9naW4odGlja2V0LCB0cnVlKTtcclxuXHJcbiAgICAgICAgLy9jbGVhciBxdWVyeSBzdHJpbmdzXHJcbiAgICAgICAgJGxvY2F0aW9uLnNlYXJjaCgndGlja2V0JywgbnVsbCk7XHJcbiAgICAgICAgJGxvY2F0aW9uLnNlYXJjaCgndXJsJywgbnVsbCk7XHJcbiAgICAgICAgJGxvY2F0aW9uLnNlYXJjaCgnY2xpZW50SWQnLCBudWxsKTtcclxuXHJcbiAgICAgICAgaWYgKGNsaWVudElkKSB7XHJcbiAgICAgICAgICAgICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydjbGllbnQtaWQnXSA9IGNsaWVudElkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9nbyB0byB0aGUgcmVxdWVzdGVkIHVybFxyXG4gICAgICAgICRsb2NhdGlvbi5wYXRoKHJldHVyblVybCk7XHJcbiAgICB9XHJcbn1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignQm9va1RyaWFsQ2hhbmdlQ29udHJvbGxlcicsXHJcblsnVXNlckxpYnJhcnlTZXJ2aWNlJywgJ2xvZ2dlcicsICckdWliTW9kYWxJbnN0YW5jZScsICdkYXRhJywgJyRyb290U2NvcGUnLCAnJGxvY2F0aW9uJywgJ01BUktFVF9JRCcsICdDYXJ0U2VydmljZScsIGZ1bmN0aW9uIChsaWJyYXJ5U2VydmljZSwgbG9nZ2VyLCAkbW9kYWxJbnN0YW5jZSwgZGF0YSwgJHJvb3RTY29wZSwgJGxvY2F0aW9uLCBtYXJrZXRJZCwgY2FydFNlcnZpY2UpIHtcclxuICAgIGxvZ2dlciA9IGxvZ2dlci5mb3JTb3VyY2UoJ0Jvb2tUcmlhbENoYW5nZUNvbnRyb2xsZXInKTtcclxuICAgIHZhciBsb2dFcnJvciA9IGxvZ2dlci5sb2dFcnJvcjtcclxuICAgIHZhciBsb2dTdWNjZXNzID0gbG9nZ2VyLmxvZ1N1Y2Nlc3M7XHJcblxyXG4gICAgdmFyIHZtID0gdGhpcztcclxuICAgIHZtLmRhdGEgPSBkYXRhO1xyXG4gICAgdm0ub2sgPSBvaztcclxuICAgIHZtLmNhbmNlbCA9IGNhbmNlbDtcclxuICAgIHZtLmlzQnVzeSA9IGZhbHNlO1xyXG5cclxuICAgIC8qKiogaW1wbGVtZW50YXRpb24gKioqL1xyXG5cclxuICAgIGZ1bmN0aW9uIG9rKCkge1xyXG4gICAgICAgIHZtLmlzQnVzeSA9IHRydWU7XHJcblxyXG4gICAgICAgIGNoYW5nZUF1ZGlvYm9vaygpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNhbmNlbCgpIHtcclxuICAgICAgICAkbW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGFuZ2VBdWRpb2Jvb2soKSB7XHJcbiAgICAgICAgbGlicmFyeVNlcnZpY2UucmV0dXJuVHJpYWwoe1xyXG4gICAgICAgICAgICBwcm9kdWN0SWQ6IHZtLmRhdGEuY3VycmVudFRyaWFsLnByb2R1Y3RJZCxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgYWRkVG9DYXJ0KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gQXBwRXJyb3JzLmdldE1lc3NhZ2UoZXJyb3IpO1xyXG4gICAgICAgICAgICBsb2dFcnJvcihtZXNzYWdlLCBlcnJvciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHZtLmlzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFRvQ2FydCgpIHtcclxuICAgICAgICBjYXJ0U2VydmljZS5zYXZlKHt9LCB7XHJcbiAgICAgICAgICAgIHByb2R1Y3RJZDogdm0uZGF0YS5wcm9kdWN0SWQsXHJcbiAgICAgICAgICAgIGxpYnJhcnlUcmFuc2l0aW9uVHlwZTogIDEsIC8vZm9yIGxvYW4uXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuJHByb21pc2VcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGNhcnRTZXJ2aWNlLmdldENhcnRUb3RhbENvdW50KGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuY2FydEl0ZW1zQ291bnQgPSByZXN1bHQuY291bnQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2bS5pc0J1c3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgJG1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnVybCgnL2NoZWNrb3V0Jyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gQXBwRXJyb3JzLmdldE1lc3NhZ2UoZXJyb3IpO1xyXG4gICAgICAgICAgICBsb2dFcnJvcihtZXNzYWdlLCBlcnJvciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHZtLmlzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ0Jvb2tUcmlhbFB1cmNoYXNlQ29udHJvbGxlcicsXHJcblsnQ2FydFNlcnZpY2UnLCAnbG9nZ2VyJywgJyR1aWJNb2RhbEluc3RhbmNlJywgJ2RhdGEnLCAnJGxvY2F0aW9uJywgJyRyb290U2NvcGUnLCBmdW5jdGlvbiAoY2FydFNlcnZpY2UsIGxvZ2dlciwgJG1vZGFsSW5zdGFuY2UsIGRhdGEsICRsb2NhdGlvbiwgJHJvb3RTY29wZSkge1xyXG4gICAgbG9nZ2VyID0gbG9nZ2VyLmZvclNvdXJjZSgnQm9va1RyaWFsUHVyY2hhc2VDb250cm9sbGVyJyk7XHJcbiAgICB2YXIgbG9nRXJyb3IgPSBsb2dnZXIubG9nRXJyb3I7XHJcbiAgICB2YXIgbG9nU3VjY2VzcyA9IGxvZ2dlci5sb2dTdWNjZXNzO1xyXG5cclxuICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICB2bS5kYXRhID0gZGF0YTtcclxuICAgIHZtLm9rID0gb2s7XHJcbiAgICB2bS5jYW5jZWwgPSBjYW5jZWw7XHJcbiAgICB2bS5pc0J1c3kgPSBmYWxzZTtcclxuXHJcbiAgICAvKioqIGltcGxlbWVudGF0aW9uICoqKi9cclxuXHJcbiAgICBmdW5jdGlvbiBvaygpIHtcclxuICAgICAgICB2bS5pc0J1c3kgPSB0cnVlO1xyXG5cclxuICAgICAgICBhZGRUb0NhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjYW5jZWwoKSB7XHJcbiAgICAgICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkVG9DYXJ0KCkge1xyXG4gICAgICAgIGNhcnRTZXJ2aWNlLnNhdmUoe30sIHtcclxuICAgICAgICAgICAgcHJvZHVjdElkOiB2bS5kYXRhLnByb2R1Y3RJZCxcclxuICAgICAgICAgICAgbGlicmFyeVRyYW5zaXRpb25UeXBlOiAgMCwgLy90aGUgZGVmYXVsdCBpcyBwdXJjaGFzZS5cclxuICAgICAgICB9KVxyXG4gICAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgY2FydFNlcnZpY2UuZ2V0Q2FydFRvdGFsQ291bnQoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5jYXJ0SXRlbXNDb3VudCA9IHJlc3VsdC5jb3VudDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZtLmlzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xyXG4gICAgICAgICAgICAkbG9jYXRpb24udXJsKCcvY2hlY2tvdXQnKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBBcHBFcnJvcnMuZ2V0TWVzc2FnZShlcnJvcik7XHJcbiAgICAgICAgICAgIGxvZ0Vycm9yKG1lc3NhZ2UsIGVycm9yLCB0cnVlKTtcclxuICAgICAgICAgICAgdm0uaXNCdXN5ID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignQm9va1RyaWFsUmV0dXJuQ29uZmlybUNvbnRyb2xsZXInLFxyXG5bJ1VzZXJMaWJyYXJ5U2VydmljZScsICdsb2dnZXInLCAnJHVpYk1vZGFsSW5zdGFuY2UnLCAnZGF0YScsICckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsICdNQVJLRVRfSUQnLCAnQ2FydFNlcnZpY2UnLCBmdW5jdGlvbiAobGlicmFyeVNlcnZpY2UsIGxvZ2dlciwgJG1vZGFsSW5zdGFuY2UsIGRhdGEsICRyb290U2NvcGUsICRsb2NhdGlvbiwgbWFya2V0SWQsIGNhcnRTZXJ2aWNlKSB7XHJcbiAgICBsb2dnZXIgPSBsb2dnZXIuZm9yU291cmNlKCdCb29rVHJpYWxSZXR1cm5Db25maXJtQ29udHJvbGxlcicpO1xyXG4gICAgdmFyIGxvZ0Vycm9yID0gbG9nZ2VyLmxvZ0Vycm9yO1xyXG4gICAgdmFyIGxvZ1N1Y2Nlc3MgPSBsb2dnZXIubG9nU3VjY2VzcztcclxuXHJcbiAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgdm0uZGF0YSA9IGRhdGE7XHJcbiAgICB2bS5vayA9IG9rO1xyXG4gICAgdm0uY2FuY2VsID0gY2FuY2VsO1xyXG5cclxuICAgIC8qKiogaW1wbGVtZW50YXRpb24gKioqL1xyXG5cclxuICAgIGZ1bmN0aW9uIG9rKCkge1xyXG4gICAgICAgICRtb2RhbEluc3RhbmNlLmNsb3NlKCk7XHJcbiAgICAgICAgJGxvY2F0aW9uLnVybCgnL2NhdGFsb2cvdHJpYWwnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjYW5jZWwoKSB7XHJcbiAgICAgICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICB9XHJcbn1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignQm9va1RyaWFsUmV0dXJuQ29udHJvbGxlcicsXHJcblsnVXNlckxpYnJhcnlTZXJ2aWNlJywgJ2xvZ2dlcicsICckdWliTW9kYWxJbnN0YW5jZScsICdkYXRhJywgJyRyb290U2NvcGUnLCAnJGxvY2F0aW9uJywgJ01BUktFVF9JRCcsICckdWliTW9kYWwnLCBmdW5jdGlvbiAobGlicmFyeVNlcnZpY2UsIGxvZ2dlciwgJG1vZGFsSW5zdGFuY2UsIGRhdGEsICRyb290U2NvcGUsICRsb2NhdGlvbiwgbWFya2V0SWQsICRtb2RhbCkge1xyXG4gICAgbG9nZ2VyID0gbG9nZ2VyLmZvclNvdXJjZSgnQm9va1RyaWFsUmV0dXJuQ29udHJvbGxlcicpO1xyXG4gICAgdmFyIGxvZ0Vycm9yID0gbG9nZ2VyLmxvZ0Vycm9yO1xyXG4gICAgdmFyIGxvZ1N1Y2Nlc3MgPSBsb2dnZXIubG9nU3VjY2VzcztcclxuXHJcbiAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgdm0uZGF0YSA9IGRhdGE7XHJcbiAgICB2bS5vayA9IG9rO1xyXG4gICAgdm0uY2FuY2VsID0gY2FuY2VsO1xyXG4gICAgdm0uaXNCdXN5ID0gZmFsc2U7XHJcblxyXG4gICAgLyoqKiBpbXBsZW1lbnRhdGlvbiAqKiovXHJcblxyXG4gICAgZnVuY3Rpb24gb2soKSB7XHJcbiAgICAgICAgdm0uaXNCdXN5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuQXVkaW9ib29rKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FuY2VsKCkge1xyXG4gICAgICAgICRtb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJldHVybkF1ZGlvYm9vaygpIHtcclxuICAgICAgICBsaWJyYXJ5U2VydmljZS5yZXR1cm5UcmlhbCh7XHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IGRhdGEucHJvZHVjdElkLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB2bS5pc0J1c3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgJG1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGJyb2FkY2FzdCBhbiBldmVudFxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2xpYnJhcnlUcmFuc2l0aW9uJyk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGRsZyA9ICRtb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2FwcC90ZW1wbGF0ZXMvYm9va190cmlhbF9yZXR1cm5fY29uZmlybS5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdCb29rVHJpYWxSZXR1cm5Db25maXJtQ29udHJvbGxlciBhcyB2bScsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVkaW9Cb29rOiB2bS5kYXRhLmF1ZGlvQm9vayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEFwcEVycm9ycy5nZXRNZXNzYWdlKGVycm9yKTtcclxuICAgICAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgICAgICB2bS5pc0J1c3kgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdDYXJ0UmVtb3ZlQ29udHJvbGxlcicsXHJcblsnQ2FydFNlcnZpY2UnLCAnbG9nZ2VyJywgJyR1aWJNb2RhbEluc3RhbmNlJywgJ2RhdGEnLCBmdW5jdGlvbiAoY2FydFNlcnZpY2UsIGxvZ2dlciwgJG1vZGFsSW5zdGFuY2UsIGRhdGEpIHtcclxuICAgIGxvZ2dlciA9IGxvZ2dlci5mb3JTb3VyY2UoJ0NhcnRSZW1vdmVDb250cm9sbGVyJyk7XHJcbiAgICB2YXIgbG9nRXJyb3IgPSBsb2dnZXIubG9nRXJyb3I7XHJcbiAgICB2YXIgbG9nU3VjY2VzcyA9IGxvZ2dlci5sb2dTdWNjZXNzO1xyXG5cclxuICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICB2bS5pdGVtID0gZGF0YTtcclxuICAgIHZtLm9rID0gb2s7XHJcbiAgICB2bS5jYW5jZWwgPSBjYW5jZWw7XHJcblxyXG4gICAgLyoqKiBpbXBsZW1lbnRhdGlvbiAqKiovXHJcblxyXG4gICAgZnVuY3Rpb24gb2soKSB7XHJcbiAgICAgICAgY2FydFNlcnZpY2UuZGVsZXRlKHtcclxuICAgICAgICAgICAgaWQ6IHZtLml0ZW0uc2hvcHBpbmdDYXJ0SXRlbUlkLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEFwcEVycm9ycy5nZXRNZXNzYWdlKGVycm9yKTtcclxuICAgICAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNhbmNlbCgpIHtcclxuICAgICAgICAkbW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgIH1cclxufV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdDYXRhbG9nQ29udHJvbGxlcicsXHJcblsnQ2F0YWxvZ1NlcnZpY2UnLCAnJHJvdXRlUGFyYW1zJywgJ2xvZ2dlcicsICckcm9vdFNjb3BlJywgJ0NhcnRTZXJ2aWNlJywgJyRsb2NhdGlvbicsICckc2NvcGUnLCBmdW5jdGlvbiAoY2F0YWxvZ1NlcnZpY2UsICRyb3V0ZVBhcmFtcywgbG9nZ2VyLCAkcm9vdFNjb3BlLCBjYXJ0U2VydmljZSwgJGxvY2F0aW9uLCAkc2NvcGUpIHtcclxuICAgIGxvZ2dlciA9IGxvZ2dlci5mb3JTb3VyY2UoJ0NhdGFsb2dDb250cm9sbGVyJyk7XHJcbiAgICB2YXIgbG9nRXJyb3IgPSBsb2dnZXIubG9nRXJyb3I7XHJcbiAgICB2YXIgbG9nU3VjY2VzcyA9IGxvZ2dlci5sb2dTdWNjZXNzO1xyXG4gICAgdmFyIGxvZ1dhcm5pbmcgPSBsb2dnZXIubG9nV2FybmluZztcclxuXHJcbiAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgdm0uYnVzeSA9IGZhbHNlO1xyXG4gICAgdm0uY2F0YWxvZyA9IG51bGw7XHJcbiAgICB2bS5maWx0ZXJDcml0ZXJpYSA9IHtcclxuICAgICAgICBwYWdlTnVtYmVyOiAxLFxyXG4gICAgICAgIHBhZ2VTaXplOiAyNSxcclxuICAgICAgICBmaWx0ZXJUeXBlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgZmlsdGVySWQ6IHVuZGVmaW5lZCxcclxuICAgIH07XHJcbiAgICB2bS5sb2FkTW9yZSA9IGxvYWRNb3JlO1xyXG4gICAgdm0uaXNBY3RpdmVGaWx0ZXIgPSBpc0FjdGl2ZUZpbHRlcjtcclxuICAgIHZtLmN1cnJlbnRGaWx0ZXJJbmZvID0geyB0aXRsZTogJycgfTtcclxuICAgIHZtLmdldFRyaWFsID0gZ2V0VHJpYWw7XHJcblxyXG4gICAgaW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgIC8qKiogaW1wbGVtZW50YXRpb24gKioqL1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgc2V0UGFnZU1ldGFEYXRhKCk7XHJcblxyXG4gICAgICAgIHZtLmZpbHRlckNyaXRlcmlhLmZpbHRlclR5cGUgPSAkcm91dGVQYXJhbXMuZmlsdGVyVHlwZSB8fCAnYWxsJztcclxuICAgICAgICB2bS5maWx0ZXJDcml0ZXJpYS5maWx0ZXJJZCA9ICRyb3V0ZVBhcmFtcy5maWx0ZXJJZDtcclxuXHJcbiAgICAgICAgZ2V0QXVkaW9Cb29rcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFBhZ2VNZXRhRGF0YSgpIHtcclxuICAgICAgICB2YXIgdGl0bGUgPSAkcm9vdFNjb3BlLlBhZ2UuZ2V0VGl0bGUoKTtcclxuICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSAkcm9vdFNjb3BlLlBhZ2UuZ2V0RGVzY3JpcHRpb24oKTtcclxuXHJcbiAgICAgICAgc3dpdGNoICgkcm91dGVQYXJhbXMuZmlsdGVyVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdnZW5yZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2F1dGhvcic6XHJcbiAgICAgICAgICAgIGNhc2UgJ25hcnJhdG9yJzpcclxuICAgICAgICAgICAgY2FzZSAndHJhbnNsYXRvcic6XHJcbiAgICAgICAgICAgIGNhc2UgJ3B1Ymxpc2hlcic6XHJcbiAgICAgICAgICAgICAgICBpZiAoJHJvdXRlUGFyYW1zLnNsdWcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZSArPSAoJyAtICcgKyAkcm91dGVQYXJhbXMuc2x1Zyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gKz0gJyAnICsgJHJvdXRlUGFyYW1zLnNsdWcgKyAnINiv2LEgJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdsYXRlc3QnOlxyXG4gICAgICAgICAgICAgICAgdGl0bGUgKz0gKCcgLSDYrNiv24zYr9iq2LHbjNmGINmH2KcnKTtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uICs9ICcgLSDYrNiv24zYr9iq2LHbjNmGINmH2Kcg2K/YsSc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmVzdHNlbGxlcic6XHJcbiAgICAgICAgICAgICAgICB0aXRsZSArPSAoJyAtINm+2LHZgdix2YjYtCDYqtix24zZhiDZh9inJyk7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiArPSAoJyAtINm+2LHZgdix2YjYtCDYqtix24zZhiDZh9inINiv2LEnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdjb21pbmdzb29uJzpcclxuICAgICAgICAgICAgICAgIHRpdGxlICs9ICgnIC0g2KjYstmI2K/bjCcpO1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gKz0gKCcgLSDYqNiy2YjYr9uMINiv2LEnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0cmlhbCc6XHJcbiAgICAgICAgICAgICAgICB0aXRsZSArPSAoJyAtINmC2YHYs9mHINin2YXYp9mG2Kog2LHYp9uM2q/Yp9mGJyk7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiArPSAoJyAtINmC2YHYs9mHINin2YXYp9mG2Kog2LHYp9uM2q/Yp9mGINiv2LEnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdlZGl0b3InOlxyXG4gICAgICAgICAgICAgICAgdGl0bGUgKz0gKCcgLSDYudmG2KfZiNuM2YYg2YXZhtiq2K7YqCcpO1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gKz0gKCcgLSDYudmG2KfZiNuM2YYg2YXZhtiq2K7YqCDYr9ixJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uICs9ICcg2K/YsSAnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLlBhZ2Uuc2V0VGl0bGUodGl0bGUpO1xyXG4gICAgICAgICRyb290U2NvcGUuUGFnZS5zZXREZXNjcmlwdGlvbihkZXNjcmlwdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0QXVkaW9Cb29rcygpIHtcclxuICAgICAgICB2bS5idXN5ID0gdHJ1ZTtcclxuICAgICAgICB2YXIga2V5O1xyXG5cclxuICAgICAgICBjYXRhbG9nU2VydmljZS5nZXRDYXRhbG9nKHtcclxuICAgICAgICAgICAgYWN0aW9uOiB2bS5maWx0ZXJDcml0ZXJpYS5maWx0ZXJUeXBlLFxyXG4gICAgICAgICAgICBrZXk6IHZtLmZpbHRlckNyaXRlcmlhLmZpbHRlcklkLFxyXG4gICAgICAgICAgICAkc2tpcDogKHZtLmZpbHRlckNyaXRlcmlhLnBhZ2VOdW1iZXIgLSAxKSAqIHZtLmZpbHRlckNyaXRlcmlhLnBhZ2VTaXplLFxyXG4gICAgICAgICAgICAkdG9wOiB2bS5maWx0ZXJDcml0ZXJpYS5wYWdlU2l6ZSxcclxuICAgICAgICAgICAgJGlubGluZWNvdW50OiAnYWxscGFnZXMnLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zOiByZXN1bHQuaXRlbXMsXHJcbiAgICAgICAgICAgICAgICB0b3RhbEl0ZW1zOiByZXN1bHQuY291bnQsXHJcbiAgICAgICAgICAgICAgICB0b3RhbFBhZ2VzOiBNYXRoLmNlaWwocmVzdWx0LmNvdW50IC8gdm0uZmlsdGVyQ3JpdGVyaWEucGFnZVNpemUpLFxyXG4gICAgICAgICAgICAgICAgcGFnZTogdm0uZmlsdGVyQ3JpdGVyaWEucGFnZU51bWJlclxyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICh2bS5jYXRhbG9nKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLml0ZW1zID0gdm0uY2F0YWxvZy5pdGVtcy5jb25jYXQoZGF0YS5pdGVtcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZtLmNhdGFsb2cgPSBkYXRhO1xyXG4gICAgICAgICAgICB2bS5idXN5ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEFwcEVycm9ycy5nZXRNZXNzYWdlKGVycm9yKTtcclxuICAgICAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxvYWRNb3JlKCkge1xyXG4gICAgICAgIGlmICh2bS5idXN5KSByZXR1cm47XHJcblxyXG4gICAgICAgIHZtLmZpbHRlckNyaXRlcmlhLnBhZ2VOdW1iZXIrKztcclxuICAgICAgICBnZXRBdWRpb0Jvb2tzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNBY3RpdmVGaWx0ZXIodHlwZSwga2V5KSB7XHJcbiAgICAgICAgcmV0dXJuICh2bS5maWx0ZXJDcml0ZXJpYS5maWx0ZXJUeXBlID09IHR5cGUpICYmICgha2V5IHx8IHZtLmZpbHRlckNyaXRlcmlhLmZpbHRlcklkID09IGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q3VycmVudEZpbHRlckluZm8oKSB7XHJcbiAgICAgICAgdmFyIGluZm8gPSB7IHRpdGxlOiAnJyB9O1xyXG5cclxuICAgICAgICBzd2l0Y2ggKCRyb3V0ZVBhcmFtcy5maWx0ZXJUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2dlbnJlJzpcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuZ2VucmVzLmZvckVhY2goZnVuY3Rpb24gKGdlbnJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdlbnJlLmlkZW50aWZpZXIgPT0gJHJvdXRlUGFyYW1zLmZpbHRlcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm8udGl0bGUgPSBnZW5yZS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2ZyZWUnOlxyXG4gICAgICAgICAgICAgICAgaW5mby50aXRsZSA9ICfYudmG2KfZiNuM2YYg2LHYp9uM2q/Yp9mGJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnZm9yZWlnbic6XHJcbiAgICAgICAgICAgICAgICBpbmZvLnRpdGxlID0gJ9iz2KfbjNixINiy2KjYp9mGINmH2KcnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgaW5mby50aXRsZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW5mbztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRUcmlhbChwcm9kdWN0SWQpIHtcclxuICAgICAgICBpZiAoc2hvd0xvZ2luKCkpIHJldHVybjtcclxuICAgICAgICBhZGRUb0NhcnQocHJvZHVjdElkLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzaG93TG9naW4oKSB7XHJcbiAgICAgICAgaWYgKCEkcm9vdFNjb3BlLmlzQXV0aGVudGljYXRlZCkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmxvZ2luKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFRvQ2FydChpZCkge1xyXG4gICAgICAgIGNhcnRTZXJ2aWNlLnNhdmUoe30sIHtcclxuICAgICAgICAgICAgcHJvZHVjdElkOiBpZCxcclxuICAgICAgICAgICAgbGlicmFyeVRyYW5zaXRpb25UeXBlOiAxLCAvL3RyaWFsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuJHByb21pc2VcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGNhcnRTZXJ2aWNlLmdldENhcnRUb3RhbENvdW50KGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuY2FydEl0ZW1zQ291bnQgPSByZXN1bHQuY291bnQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkbG9jYXRpb24udXJsKCcvY2hlY2tvdXQnKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBBcHBFcnJvcnMuZ2V0TWVzc2FnZShlcnJvcik7XHJcbiAgICAgICAgICAgIGxvZ0Vycm9yKG1lc3NhZ2UsIGVycm9yLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAkc2NvcGUuJG9uKCdyZXBlYXRfZG9uZV9nZW5yZXMtbmF2JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZtLmN1cnJlbnRGaWx0ZXJJbmZvID0gZ2V0Q3VycmVudEZpbHRlckluZm8oKTtcclxuICAgIH0pO1xyXG59XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ0NoYW5nZUVtYWlsQ29udHJvbGxlcicsXHJcblsnVXNlck1hbmFnZXInLCAnbG9nZ2VyJywgJyR1aWJNb2RhbEluc3RhbmNlJywgZnVuY3Rpb24gKCR1c2VyTWFuYWdlciwgbG9nZ2VyLCAkbW9kYWxJbnN0YW5jZSkge1xyXG4gICAgbG9nZ2VyID0gbG9nZ2VyLmZvclNvdXJjZSgnQ2hhbmdlRW1haWxDb250cm9sbGVyJyk7XHJcbiAgICB2YXIgbG9nRXJyb3IgPSBsb2dnZXIubG9nRXJyb3I7XHJcbiAgICB2YXIgbG9nU3VjY2VzcyA9IGxvZ2dlci5sb2dTdWNjZXNzO1xyXG5cclxuICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICB2bS5vayA9IG9rO1xyXG4gICAgdm0uY2FuY2VsID0gY2FuY2VsO1xyXG4gICAgdm0uaXNCdXN5ID0gZmFsc2U7XHJcblxyXG4gICAgLyoqKiBpbXBsZW1lbnRhdGlvbiAqKiovXHJcblxyXG4gICAgZnVuY3Rpb24gb2soKSB7XHJcbiAgICAgICAgdm0uZXJyb3JzID0gW107XHJcbiAgICAgICAgdm0uaXNCdXN5ID0gdHJ1ZTtcclxuICAgICAgICAkdXNlck1hbmFnZXIuY2hhbmdlRW1haWwoeyBlbWFpbDogdm0uZW1haWwsIGVtYWlsQ29uZmlybTogdm0uZW1haWxDb25maXJtLCBwYXNzd29yZDogdm0ucGFzc3dvcmQgfSlcclxuICAgICAgICAgICAgICAgICAgICAuJHByb21pc2VcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmlzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nU3VjY2Vzcygn2KLYr9ix2LMg2KfbjNmF24zZhCDYtNmF2Kcg2KjYsdmI2LIg2LHYs9in2YbbjCDar9ix2K/bjNivLiDZhNi32YHYpyDZhdis2K/Yr9inINio2Kcg2KfbjNmF24zZhCDYrNiv24zYryDZiNin2LHYryDYs9in24zYqiDYtNmI24zYry4nLCByZXN1bHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5lcnJvcnMgPSBBcHBFcnJvcnMuZ2V0RXJyb3JzKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uaXNCdXN5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FuY2VsKCkge1xyXG4gICAgICAgICRtb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgfVxyXG59XSk7IiwiXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdDaGFuZ2VQYXNzd29yZENvbnRyb2xsZXInLCBbJ1VzZXJNYW5hZ2VyJywgJ2xvZ2dlcicsIGZ1bmN0aW9uICgkdXNlck1hbmFnZXIsIGxvZ2dlcikge1xyXG4gICAgbG9nZ2VyID0gbG9nZ2VyLmZvclNvdXJjZSgnQ2hhbmdlUGFzc3dvcmRDb250cm9sbGVyJyk7XHJcbiAgICB2YXIgbG9nRXJyb3IgPSBsb2dnZXIubG9nRXJyb3I7XHJcbiAgICB2YXIgbG9nU3VjY2VzcyA9IGxvZ2dlci5sb2dTdWNjZXNzO1xyXG5cclxuICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICB2bS5lcnJvcnMgPSBbXTtcclxuICAgIHZtLnNhdmUgPSBzYXZlO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNhdmUoKSB7XHJcbiAgICAgICAgdm0uZXJyb3JzID0gW107XHJcbiAgICAgICAgJHVzZXJNYW5hZ2VyLmNoYW5nZVBhc3N3b3JkKHsgb2xkUGFzc3dvcmQ6IHZtLnBhc3N3b3JkLCBuZXdQYXNzd29yZDogdm0ubmV3UGFzc3dvcmQsIGNvbmZpcm06IHZtLmNvbmZpcm0gfSlcclxuICAgICAgICAgICAgICAgICAgICAuJHByb21pc2VcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZ1N1Y2Nlc3MoJ9ix2YXYsiDYudio2YjYsSDYtNmF2Kcg2KjYpyDZhdmI2YHZgtuM2Kog2KrYutuM24zYsSDbjNin2YHYqi4nLCByZXN1bHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0uZXJyb3JzID0gQXBwRXJyb3JzLmdldEVycm9ycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmVycm9ycyA9IEFwcEVycm9ycy5nZXRFcnJvcnMoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbn1dKTtcclxuIiwidmFyIGNvbnRyb2xsZXJJZCA9ICdDaGFwdGVyc0NvbnRyb2xsZXInO1xyXG5hbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcihjb250cm9sbGVySWQsXHJcblsnQ2hhcHRlclNlcnZpY2UnLCAnbG9nZ2VyJywgZnVuY3Rpb24gKGNoYXB0ZXJTZXJ2aWNlLCBsb2dnZXIpIHtcclxuICAgIGxvZ2dlciA9IGxvZ2dlci5mb3JTb3VyY2UoY29udHJvbGxlcklkKTtcclxuICAgIHZhciBsb2dFcnJvciA9IGxvZ2dlci5sb2dFcnJvcjtcclxuICAgIHZhciBsb2dTdWNjZXNzID0gbG9nZ2VyLmxvZ1N1Y2Nlc3M7XHJcblxyXG4gICAgdmFyIHZtID0gdGhpcztcclxuICAgIHZtLmlzQ29sbGFwc2VkID0gdHJ1ZTtcclxuICAgIHZtLnRlbXBsYXRlID0gJyc7XHJcbiAgICB2bS5zaG93Q2hhcHRlcnMgPSBzaG93Q2hhcHRlcnM7XHJcbiAgICB2bS5jaGFwdGVycyA9IG51bGw7XHJcblxyXG5cclxuICAgIC8qKiogaW1wbGVtZW50YXRpb24gKioqL1xyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dDaGFwdGVycyhhdWRpb2Jvb2tJZCkge1xyXG4gICAgICAgIHZtLnRlbXBsYXRlID0gJy9hcHAvdGVtcGxhdGVzL2NoYXB0ZXJzLmh0bWw/dj0nICsgYXBwVmVyc2lvbjtcclxuICAgICAgICB2bS5pc0NvbGxhcHNlZCA9ICF2bS5pc0NvbGxhcHNlZDtcclxuICAgICAgICBnZXRDaGFwdGVycyhhdWRpb2Jvb2tJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q2hhcHRlcnMoYXVkaW9ib29rSWQpIHtcclxuICAgICAgICByZXR1cm4gY2hhcHRlclNlcnZpY2UuZ2V0Q2hhcHRlcnMoYXVkaW9ib29rSWQpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgdm0uY2hhcHRlcnMgPSBkYXRhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XSk7XHJcblxyXG5cclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ0NoZWNrb3V0Q29udHJvbGxlcicsXHJcblsnQ2FydFNlcnZpY2UnLCAnbG9nZ2VyJywgJyRyb290U2NvcGUnLCAnJGxvY2F0aW9uJywgJyR1aWJNb2RhbCcsIGZ1bmN0aW9uIChjYXJ0U2VydmljZSwgbG9nZ2VyLCAkcm9vdFNjb3BlLCAkbG9jYXRpb24sICRtb2RhbCkge1xyXG4gICAgbG9nZ2VyID0gbG9nZ2VyLmZvclNvdXJjZSgnQ2hlY2tvdXRDb250cm9sbGVyJyk7XHJcbiAgICB2YXIgbG9nRXJyb3IgPSBsb2dnZXIubG9nRXJyb3I7XHJcbiAgICB2YXIgbG9nU3VjY2VzcyA9IGxvZ2dlci5sb2dTdWNjZXNzO1xyXG5cclxuICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICB2bS5jaGVja291dEVudGl0eSA9IG51bGw7XHJcbiAgICB2bS5wcm9jZXNzT3JkZXIgPSBwcm9jZXNzT3JkZXI7XHJcbiAgICB2bS5lcnJvcnMgPSBbXTtcclxuICAgIHZtLnJlZGlyZWN0aW5nVG9HYXRld2F5ID0gZmFsc2U7XHJcbiAgICB2bS5hcHBseURpc2NvdW50ID0gYXBwbHlEaXNjb3VudDtcclxuICAgIHZtLnJlbW92ZURpc2NvdW50ID0gcmVtb3ZlRGlzY291bnQ7XHJcbiAgICB2bS5pc0J1c3kgPSBmYWxzZTtcclxuICAgIHZtLnJlbW92ZUl0ZW0gPSByZW1vdmVJdGVtO1xyXG4gICAgdm0udHJpYWxDb25kaXRpb24gPSBudWxsO1xyXG4gICAgdm0uaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgdm0udHJpYWxCb29rVGl0bGUgPSAnJztcclxuICAgIHZtLnNob3dBZ3JlZW1lbnRXaXphcmQgPSBzaG93QWdyZWVtZW50V2l6YXJkO1xyXG4gICAgdm0uc2hvd1Byb2ZpbGVJbmZvID0gc2hvd1Byb2ZpbGVJbmZvO1xyXG4gICAgdm0uc2hvd1BheW1lbnQgPSBmYWxzZTtcclxuICAgIHZtLmhhc0ZpcnN0VGltZVB1cmNoYXNlT2ZmZXIgPSBmYWxzZTtcclxuICAgIHZtLnZvdWNoZXJDb2RlID0gbnVsbDtcclxuICAgIHZtLmFwcGxpZWRWb3VjaGVycyA9IFtdO1xyXG5cclxuICAgIGluaXRpYWxpemUoKTtcclxuXHJcbiAgICAvKioqIGltcGxlbWVudGF0aW9uICoqKi9cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIGdldFRyaWFsQ29uZGl0aW9uKCk7XHJcbiAgICAgICAgZ2V0Q2FydEl0ZW1zKCk7XHJcbiAgICAgICAgLy92bS5lcnJvcnMgPSBbJ9iu2LfYp9uMINi02YXYp9ix2Ycg24zaqScsICfYrti32KfbjCDYtNmF2KfYsdmHINiv2Ygg2LfZiNmE2KfZhtuMINi32YjZhNin2YbbjCDYt9mI2YTYp9mG24wg2KjYp9iy2YUg2LfZiNmE2KfZhtuMJ107XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q2FydEl0ZW1zKCkge1xyXG4gICAgICAgIHZtLnRyaWFsQm9va1RpdGxlID0gJyc7XHJcbiAgICAgICAgY2FydFNlcnZpY2UuZ2V0Q2hlY2tvdXRFbnRpdHkoKVxyXG4gICAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgdm0uY2hlY2tvdXRFbnRpdHkgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIHVwZGF0ZVRvdGFsQ291bnQoKTtcclxuICAgICAgICAgICAgQ2hlY2tGb3JBcHBsaWVkRGlzY291bnQoKTtcclxuICAgICAgICAgICAgdm0uc2hvd1BheW1lbnQgPSByZXN1bHQuc3VtVG90YWxQcmljZSAmJiByZXN1bHQuc3VtVG90YWxQcmljZSAhPSAwO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0Lml0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQuaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdHJpYWxcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS50cmFuc2l0aW9uVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLnRyaWFsQm9va1RpdGxlID0gaXRlbS5wcm9kdWN0LmF1ZGlvQm9vay50aXRsZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ucHJvbW90aW9uVHlwZSA9PSAxKSB7ICAgLy9maXJzdCB0aW1lIHB1cmNoYXNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmhhc0ZpcnN0VGltZVB1cmNoYXNlT2ZmZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBBcHBFcnJvcnMuZ2V0TWVzc2FnZShlcnJvcik7O1xyXG4gICAgICAgICAgICBsb2dFcnJvcihtZXNzYWdlLCBlcnJvciwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGdldEFwcGxpZWRWb3VjaGVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIENoZWNrRm9yQXBwbGllZERpc2NvdW50KCkge1xyXG4gICAgICAgIC8vY2hlY2sgaWYgYXQgbGVhc3Qgb25lIGl0ZW0gaGFzIGEgcHJvbW90aW9uIGFwcGxpZWQuXHJcbiAgICAgICAgdm0uaXNEaXNjb3VudEFwcGxpZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKCF2bS5jaGVja291dEVudGl0eSB8fCAhdm0uY2hlY2tvdXRFbnRpdHkuaXRlbXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm0uY2hlY2tvdXRFbnRpdHkuaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5oYXNQcm9tb3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIHZtLmlzRGlzY291bnRBcHBsaWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vdG9kbyA6IHVzZSB3YXRjaFxyXG4gICAgZnVuY3Rpb24gdXBkYXRlVG90YWxDb3VudCgpIHtcclxuICAgICAgICAkcm9vdFNjb3BlLmNhcnRJdGVtc0NvdW50ID0gdm0uY2hlY2tvdXRFbnRpdHkgJiYgdm0uY2hlY2tvdXRFbnRpdHkuaXRlbXMgPyB2bS5jaGVja291dEVudGl0eS5pdGVtcy5sZW5ndGggOiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHByb2Nlc3NPcmRlcigpIHtcclxuICAgICAgICB2bS5lcnJvcnMgPSBbXTtcclxuICAgICAgICB2bS5pc0J1c3kgPSB0cnVlO1xyXG4gICAgICAgIHZhciBuZWVkc1BheW1lbnQgPSB2bS5jaGVja291dEVudGl0eS5zdW1Ub3RhbFByaWNlICE9IDA7XHJcbiAgICAgICAgdmFyIHByb21pc2UgPSBuZWVkc1BheW1lbnQgPyBjYXJ0U2VydmljZS5wcm9jZXNzT3JkZXIoKS4kcHJvbWlzZSA6IGNhcnRTZXJ2aWNlLnByb2Nlc3NPcmRlcldpdGhOb1BheW1lbnQoKS4kcHJvbWlzZVxyXG5cclxuICAgICAgICBwcm9taXNlXHJcbiAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgdm0uY2hlY2tvdXRFbnRpdHkuaXRlbXMgPSBbXTtcclxuICAgICAgICAgICB2bS5yZWRpcmVjdGluZ1RvR2F0ZXdheSA9IHRydWU7XHJcbiAgICAgICAgICAgdXBkYXRlVG90YWxDb3VudCgpO1xyXG5cclxuICAgICAgICAgICBpZiAobmVlZHNQYXltZW50KSB7XHJcbiAgICAgICAgICAgICAgIHZhciBmb3JtID0gYW5ndWxhci5lbGVtZW50KHJlc3VsdC5mb3JtVGFnKTtcclxuICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCcjcGF5bWVudCcpLmFwcGVuZChmb3JtKTtcclxuICAgICAgICAgICAgICAgZm9ybS5zdWJtaXQoKTtcclxuICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgLy8kbG9jYXRpb24udXJsKCcvY29uZmlybS1vcmRlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLnVybCgnL2FwcGxpY2F0aW9ucz9vcmRlcicpO1xyXG4gICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICB9XHJcbiAgICAgICB9KVxyXG4gICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgIHZhciBtZXNzYWdlID0gQXBwRXJyb3JzLmdldE1lc3NhZ2UoZXJyb3IpO1xyXG4gICAgICAgICAgIGxvZ0Vycm9yKG1lc3NhZ2UsIGVycm9yLCB0cnVlKTtcclxuICAgICAgICAgICB2bS5yZWRpcmVjdGluZ1RvR2F0ZXdheSA9IGZhbHNlO1xyXG4gICAgICAgICAgIHZtLmlzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgIC8vdG9kbyA6IHNob3cgaW5zaWRlIGZvcm0gaW5zdGVhZCBvZiB0b2FzdC5cclxuICAgICAgICAgICAvL3ZtLmVycm9ycyA9IFtdO1xyXG4gICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYXBwbHlEaXNjb3VudCgpIHtcclxuICAgICAgICB2bS5pc0J1c3kgPSB0cnVlO1xyXG4gICAgICAgIHZtLnZvdWNoZXJFcnJvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgY2FydFNlcnZpY2UuYXBwbHlEaXNjb3VudCh7IHNlcmlhbE5vOiB2bS52b3VjaGVyQ29kZSB9KVxyXG4gICAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdm0udm91Y2hlckNvZGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZ2V0Q2FydEl0ZW1zKCk7XHJcbiAgICAgICAgICAgICAgICBsb2dTdWNjZXNzKCfaqdivINiq2K7ZgduM2YEg2KfYudmF2KfZhCDar9ix2K/bjNivLicsIHJlc3VsdCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdm0uaXNCdXN5ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB2bS52b3VjaGVyRXJyb3JzID0gQXBwRXJyb3JzLmdldEVycm9ycyhlcnJvciwgXCLYrti32Kcg2K/YsSDYq9io2Kog2qnYryAuXCIpO1xyXG4gICAgICAgICAgICB2bS5pc0J1c3kgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVEaXNjb3VudChpZCkge1xyXG4gICAgICAgIGlmICghdm0uaXNEaXNjb3VudEFwcGxpZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FydFNlcnZpY2UucmVtb3ZlRGlzY291bnQoeyBpZDogaWQgfSwge30pXHJcbiAgICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBsb2dTdWNjZXNzKCfaqdivINiq2K7ZgduM2YEg2K3YsNmBINqv2LHYr9uM2K8uJywgcmVzdWx0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGdldENhcnRJdGVtcygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEFwcEVycm9ycy5nZXRNZXNzYWdlKGVycm9yKTtcclxuICAgICAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZUl0ZW0oaXRlbSkge1xyXG4gICAgICAgIHZhciBkbGcgPSAkbW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2FwcC90ZW1wbGF0ZXMvY2FydF9yZW1vdmUuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDYXJ0UmVtb3ZlQ29udHJvbGxlciBhcyB2bScsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJywgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGxnLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgZ2V0Q2FydEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIHVwZGF0ZVRvdGFsQ291bnQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRUcmlhbENvbmRpdGlvbigpIHtcclxuICAgICAgICB2bS5lcnJvcnMgPSBbXTtcclxuICAgICAgICBjYXJ0U2VydmljZS5nZXRUcmlhbENvbmRpdGlvbigpXHJcbiAgICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ICYmICFyZXN1bHQubWVtYmVyc2hpcFN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgLy90aGVyZSBpcyBubyB0cmlhbCBpdGVtLlxyXG4gICAgICAgICAgICAgICAgdm0uaXNWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2bS50cmlhbENvbmRpdGlvbiA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIHZtLmlzVmFsaWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEFwcEVycm9ycy5nZXRNZXNzYWdlKGVycm9yKTtcclxuICAgICAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dBZ3JlZW1lbnRXaXphcmQoKSB7XHJcbiAgICAgICAgdmFyIGRsZyA9ICRtb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvYXBwL3RlbXBsYXRlcy90cmlhbF9hZ3JlZW1lbnRfd2l6YXJkLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnVHJpYWxBZ3JlZW1lbnRXaXphcmRDb250cm9sbGVyIGFzIHZtJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZtLnRyaWFsQ29uZGl0aW9uICYmIHZtLnRyaWFsQ29uZGl0aW9uLm1lbWJlcnNoaXBTdGF0dXMgJiYgIXZtLnRyaWFsQ29uZGl0aW9uLm1lbWJlcnNoaXBTdGF0dXMuaGFzTWVtYmVyc2hpcCA/IHZtLnRyaWFsQ29uZGl0aW9uLm1lbWJlcnNoaXBTdGF0dXMuYWdyZWVtZW50IDogbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkbGcucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBnZXRUcmlhbENvbmRpdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dQcm9maWxlSW5mbygpIHtcclxuICAgICAgICB2YXIgZGxnID0gJG1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9hcHAvdGVtcGxhdGVzL3Byb2ZpbGVfc3BlY2lhbF9tZW1iZXJzaGlwLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnUHJvZmlsZVNwZWNpYWxNZW1iZXJzaGlwQ29udHJvbGxlciBhcyB2bScsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2bS50cmlhbENvbmRpdGlvbiAmJiB2bS50cmlhbENvbmRpdGlvbi5tZW1iZXJzaGlwU3RhdHVzICYmICF2bS50cmlhbENvbmRpdGlvbi5tZW1iZXJzaGlwU3RhdHVzLmhhc01lbWJlcnNoaXAgPyB2bS50cmlhbENvbmRpdGlvbi5tZW1iZXJzaGlwU3RhdHVzLmFncmVlbWVudCA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGxnLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgZ2V0VHJpYWxDb25kaXRpb24oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRBcHBsaWVkVm91Y2hlcnMoKSB7XHJcblxyXG4gICAgICAgIGNhcnRTZXJ2aWNlLmdldEFwcGxpZWRWb3VjaGVycygpXHJcbiAgICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB2bS5hcHBsaWVkVm91Y2hlcnMgPSByZXN1bHQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gQXBwRXJyb3JzLmdldE1lc3NhZ2UoZXJyb3IpOztcclxuICAgICAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ0NvbmZpcm1FbWFpbENvbnRyb2xsZXInLFxyXG5bJ1VzZXJNYW5hZ2VyJywgJyRsb2NhdGlvbicsICckc2NvcGUnLCAndXNlckFnZW50RGV0ZWN0b3InLCAnQW5hbHl0aWNzU2VydmljZScsICdBTkFMWVRJQ1MnLCAnQ2FydFNlcnZpY2UnLCAnJHRpbWVvdXQnLCAnJHJvb3RTY29wZScsIGZ1bmN0aW9uICgkdXNlck1hbmFnZXIsICRsb2NhdGlvbiwgJHNjb3BlLCB1c2VyQWdlbnREZXRlY3RvciwgYW5hbHl0aWNzU2VydmljZSwgQU5BTFlUSUNTLCBjYXJ0U2VydmljZSwgJHRpbWVvdXQsICRyb290U2NvcGUpIHtcclxuICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICB2bS5lcnJvcnMgPSBbXTtcclxuICAgIHZtLmlzQW5kcm9pZCA9IGZhbHNlO1xyXG4gICAgdm0uc2hvd1dhaXRpbmcgPSBmYWxzZTtcclxuICAgIC8vdm0uYWN0aXZhdGVkID0gZmFsc2U7XHJcblxyXG4gICAgaW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgIC8qKiogaW1wbGVtZW50YXRpb24gKioqL1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgdmFyIHVzZXJJZCA9ICRsb2NhdGlvbi5zZWFyY2goKS51c2VySWQ7XHJcbiAgICAgICAgdmFyIGNvZGUgPSAkbG9jYXRpb24uc2VhcmNoKCkuY29kZTtcclxuICAgICAgICB2YXIgY3VzdG9tRGF0YSA9ICRsb2NhdGlvbi5zZWFyY2goKS5jZDtcclxuICAgICAgICBpZiAoY3VzdG9tRGF0YSkge1xyXG4gICAgICAgICAgICBjdXN0b21EYXRhID0gZnJvbUpTT04oZGVjb2RlVVJJQ29tcG9uZW50KGN1c3RvbURhdGEpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdXNlcklkIHx8ICFjb2RlKSB7XHJcbiAgICAgICAgICAgIHZtLmVycm9ycyA9IEFwcEVycm9ycy5nZXRFcnJvcnMobnVsbCwgJ9qp2K8g2YXYsdio2YjYt9mHINmF2LnYqtio2LEg2YbbjNiz2KouJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vVE9ETzogdGhlIGN1c3RvbSBzY2hlbWEgZG9lcyBub3Qgd29yayBvbiBhbmRyb2lkLiB0ZW1wb3Jhcmx5IGRpc2FibGUgaXQuXHJcbiAgICAgICAgLy92bS5pc0FuZHJvaWQgPSB1c2VyQWdlbnREZXRlY3Rvci5pc0FuZHJvaWQoKTtcclxuXHJcbiAgICAgICAgJHVzZXJNYW5hZ2VyLmNvbmZpcm1FbWFpbCh7IHVzZXJJZDogdXNlcklkLCBjb2RlOiBjb2RlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCB8fCAhKHJlc3VsdC51c2VyTmFtZSAmJiByZXN1bHQuYWNjZXNzX3Rva2VuKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0uZXJyb3JzID0gQXBwRXJyb3JzLmdldEVycm9ycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHVzZXJNYW5hZ2VyLmxvZ2luKHJlc3VsdCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmFseXRpY3NTZXJ2aWNlLnRyYWNrRXZlbnQoQU5BTFlUSUNTLmNhdGVnb3J5LlVYLCBBTkFMWVRJQ1MudXhBY3Rpb24uUkVHSVNUUkFUSU9OX0NPTkZJUk1FRCwgJ2VtYWlsLWNvbmZpcm0nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2FkZCB0byBzaG9wcGluZyBjYXJ0IGlmIGN1c3RvbWRhdGEgcHJvdmlkZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VzdG9tRGF0YSAmJiBjdXN0b21EYXRhLnByb2R1Y3RJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZFRvQ2FydChjdXN0b21EYXRhLnByb2R1Y3RJZCwgY3VzdG9tRGF0YS50cmFuc2l0aW9uVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1c3RvbURhdGEgJiYgY3VzdG9tRGF0YS5yZWRpcmVjdFVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi51cmwoY3VzdG9tRGF0YS5yZWRpcmVjdFVybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uYWN0aXZhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmVycm9ycyA9IEFwcEVycm9ycy5nZXRFcnJvcnMoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRUb0NhcnQoaWQsIHRyYW5zaXRpb25UeXBlKSB7XHJcbiAgICAgICAgaWYgKCF0cmFuc2l0aW9uVHlwZSkge1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uVHlwZSA9IDA7IC8vdGhlIGRlZmF1bHQgaXMgcHVyY2hhc2UuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhcnRTZXJ2aWNlLnNhdmUoe30sIHtcclxuICAgICAgICAgICAgcHJvZHVjdElkOiBpZCxcclxuICAgICAgICAgICAgbGlicmFyeVRyYW5zaXRpb25UeXBlOiB0cmFuc2l0aW9uVHlwZSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgY2FydFNlcnZpY2UuZ2V0Q2FydFRvdGFsQ291bnQoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5jYXJ0SXRlbXNDb3VudCA9IHJlc3VsdC5jb3VudDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2bS5zaG93V2FpdGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvL2lmIHRoZSBhZGQgdG8gY2FydCB3YXMgc3VjY2Vzc2Z1bCwgdGhlbiByZWRpcmVjdCB0aGUgdXNlciB0byBjaGVja291dCBzY3JlZW4gYWZ0ZXIgc29tZSBkZWxheS5cclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnVybCgnL2NoZWNrb3V0Jyk7XHJcbiAgICAgICAgICAgIH0sIDUwMDApXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIC8vZG8gbm90aGluZ1xyXG4gICAgICAgICAgICAvL2tlZXAgdGhlIHVzZXIgd2F0Y2hpbmcgY29uZmlybWF0aW9uIG1lc3NhZ2UuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8kc2NvcGUuJG9uKCdsb2dnZWRPbicsIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgICRsb2NhdGlvbi51cmwoJy8nKTtcclxuICAgIC8vfSk7XHJcbn1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignQ29uZmlybVBheW1lbnRDb250cm9sbGVyJyxcclxuWydPcmRlclNlcnZpY2UnLCAnbG9nZ2VyJywgJyRsb2NhdGlvbicsICckcm91dGVQYXJhbXMnLCAnVXNlckxpYnJhcnlTZXJ2aWNlJywgJ0FuYWx5dGljc1NlcnZpY2UnLCAnQU5BTFlUSUNTJywgJyRyb290U2NvcGUnLCBmdW5jdGlvbiAob3JkZXJTZXJ2aWNlLCBsb2dnZXIsICRsb2NhdGlvbiwgJHJvdXRlUGFyYW1zLCB1c2VyTGlicmFyeVNlcnZpY2UsIGFuYWx5dGljc1NlcnZpY2UsIEFOQUxZVElDUywgJHJvb3RTY29wZSkge1xyXG4gICAgbG9nZ2VyID0gbG9nZ2VyLmZvclNvdXJjZSgnQ29uZmlybVBheW1lbnRDb250cm9sbGVyJyk7XHJcbiAgICB2YXIgbG9nRXJyb3IgPSBsb2dnZXIubG9nRXJyb3I7XHJcbiAgICB2YXIgbG9nU3VjY2VzcyA9IGxvZ2dlci5sb2dTdWNjZXNzO1xyXG5cclxuICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICB2bS5vcmRlclJlc3VsdCA9IG51bGw7XHJcbiAgICB2bS5zaG93QXBwTGluayA9IGZhbHNlO1xyXG5cclxuICAgIGluaXRpYWxpemUoKTtcclxuXHJcbiAgICAvKioqIGltcGxlbWVudGF0aW9uICoqKi9cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIHZhciBvcmRlcklkID0gJHJvdXRlUGFyYW1zLm9yZGVySWQ7XHJcbiAgICAgICAgdmFyIHN0YXR1cyA9ICRyb3V0ZVBhcmFtcy5zdGF0dXM7XHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMgIT0gJzEnKSB7XHJcbiAgICAgICAgICAgIHZtLm9yZGVyUmVzdWx0ID0geyBzdGF0dXM6IDAgfTtcclxuICAgICAgICAgICAgYW5hbHl0aWNzU2VydmljZS50cmFja0V2ZW50KEFOQUxZVElDUy5jYXRlZ29yeS5VWCwgQU5BTFlUSUNTLnV4QWN0aW9uLlBVUkNIQVNFRCwgJ2Vycm9yJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaWYgKG9yZGVySWQpIHtcclxuICAgICAgICAvLyAgICAvL2dldE9yZGVySW5mbyhvcmRlcklkKTtcclxuICAgICAgICAvLyAgICB2bS5vcmRlclJlc3VsdCA9IHsgc3RhdHVzOiAxIH07XHJcbiAgICAgICAgLy8gICAgYW5hbHl0aWNzU2VydmljZS50cmFja0V2ZW50KEFOQUxZVElDUy5jYXRlZ290eS5VWCwgQU5BTFlUSUNTLnV4QWN0aW9uLlBVUkNIQVNFRCwgJ3N1Y2Nlc3MnKTtcclxuICAgICAgICAvLyAgICAkbG9jYXRpb24udXJsKCcvYXBwbGljYXRpb25zP29yZGVyJyk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIGlmIChvcmRlcklkKSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuZ2V0VXNlckFjdGl2aXR5SW5mbygpO1xyXG4gICAgICAgICAgICBnZXRPcmRlckluZm8ob3JkZXJJZCk7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRPcmRlckluZm8ob3JkZXJJZCkge1xyXG4gICAgICAgIG9yZGVyU2VydmljZS5nZXRPcmRlckNvbmZpcm1JbmZvKHsgaWQ6IG9yZGVySWQgfSlcclxuICAgICAgICAuJHByb21pc2VcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHZtLm9yZGVyUmVzdWx0ID0gcmVzdWx0O1xyXG4gICAgICAgICAgICB2bS5vcmRlclJlc3VsdC5zdGF0dXMgPSAxO1xyXG5cclxuICAgICAgICAgICAgYW5hbHl0aWNzU2VydmljZS50cmFja0V2ZW50KEFOQUxZVElDUy5jYXRlZ29yeS5VWCwgQU5BTFlUSUNTLnV4QWN0aW9uLlBVUkNIQVNFRCwgJ3N1Y2Nlc3MnLCB2bS5vcmRlclJlc3VsdC50b3RhbE9yZGVyUXR5KTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5zdWJzY3JpcHRpb25QbGFuSWRlbnRpZmllcikge1xyXG4gICAgICAgICAgICAgICAgYW5hbHl0aWNzU2VydmljZS50cmFja0V2ZW50KEFOQUxZVElDUy5jYXRlZ29yeS5VWCwgQU5BTFlUSUNTLnV4QWN0aW9uLkdPVF9TVUJTQ1JJUFRJT04sICdzdWNjZXNzJywgcmVzdWx0LnN1YnNjcmlwdGlvblBsYW5JZGVudGlmaWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmVzdWx0LmNsaWVudElkID09IDIgfHwgcmVzdWx0LmNsaWVudElkID09IDUpIHtcclxuICAgICAgICAgICAgICAgIC8vY2FmZSBiYXphYXIgb3IgZ29vZ2xlIHBsYXlcclxuICAgICAgICAgICAgICAgIC8vdmFyIGFuY2hvciA9ICQoJyNyZWRpcmVjdC1oeXBlcmxpbmsnKTtcclxuICAgICAgICAgICAgICAgIC8vaWYgKGFuY2hvcikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgYW5jaG9yLmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgIHZtLnNob3dBcHBMaW5rID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJGxvY2F0aW9uLnVybCgnL2FwcGxpY2F0aW9ucz9vcmRlcicpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEFwcEVycm9ycy5nZXRNZXNzYWdlKGVycm9yKTtcclxuICAgICAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ0NvbnRhY3RDb250cm9sbGVyJyxcclxuWydDb250YWN0U2VydmljZScsICdsb2dnZXInLCAnVXNlck1hbmFnZXInLCBmdW5jdGlvbiAoY29udGFjdFNlcnZpY2UsIGxvZ2dlciwgdXNlck1hbmFnZXIpIHtcclxuICAgIGxvZ2dlciA9IGxvZ2dlci5mb3JTb3VyY2UoJ0NvbnRhY3RDb250cm9sbGVyJyk7XHJcbiAgICB2YXIgbG9nRXJyb3IgPSBsb2dnZXIubG9nRXJyb3I7XHJcbiAgICB2YXIgbG9nU3VjY2VzcyA9IGxvZ2dlci5sb2dTdWNjZXNzO1xyXG5cclxuICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICB2bS5zZW5kID0gc2VuZDtcclxuICAgIHZtLnN1Y2NlZWRlZCA9IGZhbHNlO1xyXG4gICAgdm0uaW5mbyA9IHt9O1xyXG4gICAgdm0uZXJyb3JzID0gW107XHJcbiAgICB2bS51c2VySW5mbyA9IG51bGw7XHJcbiAgICB2bS5pc0F1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcclxuICAgIHZtLnN1cHBvcnRUeXBlcyA9IFtdO1xyXG4gICAgdm0uZW1haWwgPSBudWxsO1xyXG5cclxuICAgIGluaXRpYWxpemUoKTtcclxuXHJcblxyXG4gICAgLyoqKiBpbXBsZW1lbnRhdGlvbiAqKiovXHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICBiaW5kVXNlckluZm8oKTtcclxuICAgICAgICBnZXRTdXBwb3J0VHlwZXMoKTtcclxuICAgICAgICB2bS5lbWFpbCA9ICdpbmZvJyArICdAJyArICduYXZhYXInICsgJy5pcic7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYmluZFVzZXJJbmZvKCkge1xyXG4gICAgICAgIHZhciB1c2VySW5mbyA9IHVzZXJNYW5hZ2VyLmdldFVzZXJJbmZvKCk7XHJcbiAgICAgICAgaWYgKHVzZXJJbmZvKSB7XHJcbiAgICAgICAgICAgIHZtLmluZm8ubmFtZSA9IHVzZXJJbmZvLmZpcnN0TmFtZSArICcgJyArIHVzZXJJbmZvLmxhc3ROYW1lO1xyXG4gICAgICAgICAgICB2bS5pbmZvLmVtYWlsID0gdXNlckluZm8udXNlck5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2bS5pc0F1dGhlbnRpY2F0ZWQgPSB1c2VyTWFuYWdlci5nZXRJc0F1dGhlbnRpY2F0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTdXBwb3J0VHlwZXMoKSB7XHJcbiAgICAgICAgY29udGFjdFNlcnZpY2UuZ2V0U3VwcG9ydFR5cGVzKClcclxuICAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgIHZtLnN1cHBvcnRUeXBlcyA9IHJlc3VsdDtcclxuICAgICAgIH0pXHJcbiAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBBcHBFcnJvcnMuZ2V0TWVzc2FnZShlcnJvcik7XHJcbiAgICAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2VuZCgpIHtcclxuICAgICAgICB2bS5lcnJvcnMgPSBbXTtcclxuICAgICAgICBjb250YWN0U2VydmljZS5zYXZlKHZtLmluZm8pXHJcbiAgICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdm0uZXJyb3JzID0gQXBwRXJyb3JzLmdldEVycm9ycygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdm0uc3VjY2VlZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB2bS5lcnJvcnMgPSBBcHBFcnJvcnMuZ2V0RXJyb3JzKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdEb3dubG9hZExpc3RDb250cm9sbGVyJyxcclxuWydDaGFwdGVyU2VydmljZScsICdsb2dnZXInLCAnJHVpYk1vZGFsSW5zdGFuY2UnLCAnZGF0YScsICckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsICckdWliTW9kYWwnLCAnJHRpbWVvdXQnLCBmdW5jdGlvbiAoY2hhcHRlclNlcnZpY2UsIGxvZ2dlciwgJG1vZGFsSW5zdGFuY2UsIGRhdGEsICRyb290U2NvcGUsICRsb2NhdGlvbiwgJG1vZGFsLCAkdGltZW91dCkge1xyXG4gICAgbG9nZ2VyID0gbG9nZ2VyLmZvclNvdXJjZSgnRG93bmxvYWRMaXN0Q29udHJvbGxlcicpO1xyXG4gICAgdmFyIGxvZ0Vycm9yID0gbG9nZ2VyLmxvZ0Vycm9yO1xyXG4gICAgdmFyIGxvZ1N1Y2Nlc3MgPSBsb2dnZXIubG9nU3VjY2VzcztcclxuXHJcbiAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgdm0uY2hhcHRlcnMgPSBudWxsO1xyXG4gICAgdm0uY2FuY2VsID0gY2FuY2VsO1xyXG4gICAgdm0uYXVkaW9ib29rID0gZGF0YS5hdWRpb0Jvb2s7XHJcbiAgICB2bS5nZXRUZW1wRmlsZSA9IGdldFRlbXBGaWxlO1xyXG5cclxuICAgIGluaXRpYWxpemUoKTtcclxuXHJcbiAgICAvKioqIGltcGxlbWVudGF0aW9uICoqKi9cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIGdldENoYXB0ZXJzKHsgaWQ6IGRhdGEuYXVkaW9Cb29rLmlkZW50aWZpZXIgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q2hhcHRlcnMoaWQpIHtcclxuICAgICAgICBjaGFwdGVyU2VydmljZS5nZXRDaGFwdGVycyhpZClcclxuICAgICAgICAuJHByb21pc2VcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHZtLmNoYXB0ZXJzID0gcmVzdWx0O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEFwcEVycm9ycy5nZXRNZXNzYWdlKGVycm9yKTtcclxuICAgICAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBjYW5jZWwoKSB7XHJcbiAgICAgICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VGVtcEZpbGUoY2hhcHRlcil7XHJcbiAgICAgICAgdmFyIGNoYXB0ZXJJZCA9IGNoYXB0ZXIuY2hhcHRlcklkO1xyXG5cclxuICAgICAgICBjaGFwdGVyU2VydmljZS5kb3dubG9hZCh7IGlkOiBjaGFwdGVySWQgfSlcclxuICAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgIGlmICghcmVzdWx0LnRva2VuKSB7XHJcbiAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oKTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgdmFyIGFuY2hvciA9ICQoJyNkb3dubG9hZC1oeXBlcmxpbmsnKTtcclxuICAgICAgICAgICBhbmNob3IuYXR0cih7XHJcbiAgICAgICAgICAgICAgIGhyZWY6ICdhcGkvZG93bmxvYWQtdC8nICsgY2hhcHRlcklkICsgJy8/dG9rZW49JyArIHJlc3VsdC50b2tlbixcclxuICAgICAgICAgICAgICAgLy9kb3dubG9hZDogY2hhcHRlci50aXRsZSArICcubTRhJyxcclxuICAgICAgICAgICAgICAgdGFyZ2V0OiAnX2JsYW5rJ1xyXG4gICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdhcGkvZG93bmxvYWQtdC8nICsgY2hhcHRlcklkICsgJy8/dG9rZW49JyArIHJlc3VsdC50b2tlbiwgJ19ibGFuayc7XHJcblxyXG4gICAgICAgICAgIC8vJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgIC8vICAgIHZhciBhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rvd25sb2FkLWh5cGVybGluaycpO1xyXG4gICAgICAgICAgIC8vICAgIC8vIHRoZSBjb2RlIHlvdSB3YW50IHRvIHJ1biBpbiB0aGUgbmV4dCBkaWdlc3RcclxuICAgICAgICAgICAvLyAgICAvL2FuY2hvci5nZXQoMCkuY2xpY2soKTtcclxuICAgICAgICAgICAvLyAgICB2YXIgZXZPYmogPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKTtcclxuICAgICAgICAgICAvLyAgICBldk9iai5pbml0TW91c2VFdmVudCgnY2xpY2snLCB0cnVlLCB0cnVlLCB3aW5kb3csIDAsIDAsIDAsIDAsIDAsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAwLCBudWxsKTtcclxuICAgICAgICAgICAvLyAgICBhLmRpc3BhdGNoRXZlbnQoZXZPYmopO1xyXG4gICAgICAgICAgIC8vfSk7XHJcbiAgICAgICB9KVxyXG4gICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgIHZhciBtZXNzYWdlID0gQXBwRXJyb3JzLmdldE1lc3NhZ2UoZXJyb3IpO1xyXG4gICAgICAgICAgIGxvZ0Vycm9yKG1lc3NhZ2UsIGVycm9yLCB0cnVlKTtcclxuICAgICAgIH0pO1xyXG4gICAgfVxyXG59XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ0ZhcUNvbnRyb2xsZXInLFxyXG5bJ0ZhcVNlcnZpY2UnLCAnbG9nZ2VyJywgZnVuY3Rpb24gKGZhcVNlcnZpY2UsIGxvZ2dlcikge1xyXG4gICAgbG9nZ2VyID0gbG9nZ2VyLmZvclNvdXJjZSgnRmFxQ29udHJvbGxlcicpO1xyXG4gICAgdmFyIGxvZ0Vycm9yID0gbG9nZ2VyLmxvZ0Vycm9yO1xyXG4gICAgdmFyIGxvZ1N1Y2Nlc3MgPSBsb2dnZXIubG9nU3VjY2VzcztcclxuXHJcbiAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgdm0uaXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgIHZtLmZhcXMgPSBbXTtcclxuICAgIHZtLmNhdGVnb3JpZXMgPSB7fTtcclxuICAgIHZtLmNhdGdzID0gW107XHJcblxyXG4gICAgaW5pdGlhbGl6ZSgpO1xyXG5cclxuXHJcbiAgICAvKioqIGltcGxlbWVudGF0aW9uICoqKi9cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIGdldEZhcXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRGYXFzKCkge1xyXG4gICAgICAgIGZhcVNlcnZpY2UuZ2V0RmFxcygpXHJcbiAgICAgICAuJHByb21pc2VcclxuICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICB2bS5mYXFzID0gcmVzdWx0Lml0ZW1zO1xyXG4gICAgICAgICAgIHZtLmZhcXMuZm9yRWFjaChmdW5jdGlvbiAoZmFxKSB7XHJcbiAgICAgICAgICAgICAgIGlmIChmYXEuY2F0ZWdvcnkpIHtcclxuICAgICAgICAgICAgICAgICAgIGlmICghdm0uY2F0ZWdvcmllc1tmYXEuY2F0ZWdvcnkuY29kZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICB2bS5jYXRlZ29yaWVzW2ZhcS5jYXRlZ29yeS5jb2RlXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdm0uY2F0Z3MucHVzaCh7IGNvZGU6IGZhcS5jYXRlZ29yeS5jb2RlLCB0aXRsZTogZmFxLmNhdGVnb3J5LnRpdGxlLCBkaXNwbGF5T3JkZXI6IGZhcS5jYXRlZ29yeS5kaXNwbGF5T3JkZXIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICB9KTtcclxuICAgICAgICAgICB2bS5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgIH0pXHJcbiAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBBcHBFcnJvcnMuZ2V0TWVzc2FnZShlcnJvcik7O1xyXG4gICAgICAgICAgIGxvZ0Vycm9yKG1lc3NhZ2UsIGVycm9yLCB0cnVlKTtcclxuICAgICAgICAgICB2bS5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgIH0pO1xyXG4gICAgfVxyXG59XSk7IiwiXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdGb3Jnb3RQYXNzd29yZENvbnRyb2xsZXInLCBbJ1VzZXJNYW5hZ2VyJywgZnVuY3Rpb24gKCR1c2VyTWFuYWdlcikge1xyXG5cclxuICAgIHZhciB2bSA9IHRoaXM7XHJcblxyXG4gICAgdm0uc3VjY2VlZGVkID0gZmFsc2U7XHJcbiAgICB2bS5lcnJvcnMgPSBbXTtcclxuICAgIHZtLnN1Ym1pdCA9IHN1Ym1pdDtcclxuXHJcbiAgICBmdW5jdGlvbiBzdWJtaXQoKSB7XHJcbiAgICAgICAgdm0uc3VjY2VlZGVkID0gZmFsc2U7XHJcbiAgICAgICAgJHVzZXJNYW5hZ2VyLmZvcmdvdFBhc3N3b3JkKHsgZW1haWw6IHZtLmVtYWlsIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5lcnJvcnMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uc3VjY2VlZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZXJyb3JzID0gQXBwRXJyb3JzLmdldEVycm9ycyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxufV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdJbmRleENvbnRyb2xsZXInLFxyXG5bJ0F1ZGlvQm9va1NlcnZpY2UnLCAnQ2F0YWxvZ1NlcnZpY2UnLCAnbG9nZ2VyJywgJyRyb290U2NvcGUnLCAnJHNjb3BlJywgJyRyb3V0ZScsICdzbGlkZUltYWdlcycsICckd2luZG93JywgJ0FuYWx5dGljc1NlcnZpY2UnLCAnQU5BTFlUSUNTJywgZnVuY3Rpb24gKGF1ZGlvQm9va1NlcnZpY2UsIGNhdGFsb2dTZXJ2aWNlLCBsb2dnZXIsICRyb290U2NvcGUsICRzY29wZSwgJHJvdXRlLCBzbGlkZUltYWdlcywgJHdpbmRvdywgYW5hbHl0aWNzU2VydmljZSwgQU5BTFlUSUNTKSB7XHJcbiAgICBsb2dnZXIgPSBsb2dnZXIuZm9yU291cmNlKCdJbmRleENvbnRyb2xsZXInKTtcclxuICAgIHZhciBsb2dFcnJvciA9IGxvZ2dlci5sb2dFcnJvcjtcclxuICAgIHZhciBsb2dTdWNjZXNzID0gbG9nZ2VyLmxvZ1N1Y2Nlc3M7XHJcblxyXG4gICAgdmFyIHZtID0gdGhpcztcclxuICAgIHZtLnNsaWRlcyA9IFtdO1xyXG4gICAgdm0uaW50ZXJ2YWwgPSA1MDAwO1xyXG4gICAgdm0ubmV3ZXN0ID0gW107XHJcbiAgICB2bS5iZXN0c2VsbGVyID0gW107XHJcbiAgICB2bS5jb21pbmdzb29uID0gW107XHJcbiAgICB2bS50cmlhbCA9IFtdO1xyXG4gICAgdm0uZWRpdG9yUGlja3MgPSBbXTtcclxuICAgIHZtLmJlc3RQaWNrcyA9IFtdO1xyXG4gICAgdm0uZnJlZSA9IFtdO1xyXG4gICAgdm0ubmF2YWFyID0gW107XHJcbiAgICB2bS5mZWF0dXJlZCA9IG51bGw7XHJcbiAgICB2bS5tb2JpbGVJbnRybyA9IG51bGw7XHJcbiAgICB2bS5hbGxTbGlkZXMgPSBbXTtcclxuICAgIHZtLm1vYmlsZUludHJvID0gbnVsbDtcclxuICAgIHZtLmZlYXR1cmVkQXJ0aXN0cyA9IFtdO1xyXG4gICAgdm0uaXNGaXJzdFZpc2l0ID0gdHJ1ZTtcclxuICAgIHZtLnNsaWRlSW1hZ2VzID0gc2xpZGVJbWFnZXM7XHJcbiAgICB2bS5jdXJyZW50TG9nZ2VkSW5TdGF0dXMgPSBmYWxzZTtcclxuXHJcbiAgICBpbml0aWFsaXplKCk7XHJcblxyXG4gICAgLyoqKiBpbXBsZW1lbnRhdGlvbiAqKiovXHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuXHJcbiAgICAgICAgdm0uY3VycmVudExvZ2dlZEluU3RhdHVzID0gJHJvb3RTY29wZS5jbGllbnRJbmZvLmxvZ2dlZGluO1xyXG5cclxuICAgICAgICB2bS5pc0ZpcnN0VmlzaXQgPSAhJHJvb3RTY29wZS5jbGllbnRJbmZvLmxvZ2dlZGluO1xyXG5cclxuICAgICAgICBhbmFseXRpY3NTZXJ2aWNlLnRyYWNrRXZlbnQoQU5BTFlUSUNTLmNhdGVnb3J5LlBBR0VfVklFVywgQU5BTFlUSUNTLnBhZ2VWaWV3QWN0aW9uLlZJRVcsICdpbmRleC0nICsgKHZtLmlzRmlyc3RWaXNpdCA/ICduZXctdmlzaXQnIDogJ29sZC12aXNpdCcpKTtcclxuXHJcbiAgICAgICAgZ2V0RmVhdHVyZWRTbGlkZXMoKTtcclxuICAgICAgICBnZXRCZXN0UGlja0F1ZGlvQm9va3MoKTtcclxuICAgICAgICBnZXRGcmVlQXVkaW9Cb29rcygpO1xyXG4gICAgICAgIGdldFRyaWFsQXVkaW9Cb29rcygpO1xyXG4gICAgICAgIGdldE5ld2VzdEF1ZGlvQm9va3MoKTtcclxuICAgICAgICBnZXRFZGl0b3JQaWNrQXVkaW9Cb29rcygpO1xyXG4gICAgICAgIGdldEJlc3RTZWxsZXJBdWRpb0Jvb2tzKCk7XHJcbiAgICAgICAgZ2V0TmF2YWFyQXVkaW9Cb29rcygpO1xyXG4gICAgICAgIGdldENvbWluZ1Nvb25BdWRpb0Jvb2tzKCk7XHJcbiAgICAgICAgZ2V0RmVhdHVyZWRBcnRpc3RzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RmVhdHVyZWRTbGlkZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGF1ZGlvQm9va1NlcnZpY2UuZ2V0RmVhdHVyZWRTbGlkZXMoKVxyXG4gICAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgdm0uYWxsU2xpZGVzID0gcmVzdWx0O1xyXG4gICAgICAgICAgICBwcm9jZXNzU2xpZGVzKHJlc3VsdCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gQXBwRXJyb3JzLmdldE1lc3NhZ2UoZXJyb3IpO1xyXG4gICAgICAgICAgICBsb2dFcnJvcihtZXNzYWdlLCBlcnJvciwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvL2Z1bmN0aW9uIGdldEZlYXR1cmVkU2xpZGVzKCkge1xyXG4gICAgLy8gICAgcmV0dXJuIHNsaWRlc1xyXG4gICAgLy8gICAgLiRwcm9taXNlXHJcbiAgICAvLyAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAvLyAgICAgICAgdm0uYWxsU2xpZGVzID0gcmVzdWx0O1xyXG4gICAgLy8gICAgICAgIHByb2Nlc3NTbGlkZXMocmVzdWx0KTtcclxuICAgIC8vICAgIH0pXHJcbiAgICAvLyAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAvLyAgICAgICAgdmFyIG1lc3NhZ2UgPSBBcHBFcnJvcnMuZ2V0TWVzc2FnZShlcnJvcik7XHJcbiAgICAvLyAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgLy8gICAgfSk7XHJcbiAgICAvL31cclxuXHJcbiAgICBmdW5jdGlvbiBnZXROZXdlc3RBdWRpb0Jvb2tzKCkge1xyXG4gICAgICAgIGNhdGFsb2dTZXJ2aWNlLmdldENhdGFsb2coe1xyXG4gICAgICAgICAgICBhY3Rpb246ICdsYXRlc3QnLFxyXG4gICAgICAgICAgICAkdG9wOiAxMCxcclxuICAgICAgICAgICAgJGlubGluZWNvdW50OiAnYWxscGFnZXMnLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB2bS5uZXdlc3QgPSByZXN1bHQuaXRlbXM7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEFwcEVycm9ycy5nZXRNZXNzYWdlKGVycm9yKTtcclxuICAgICAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEJlc3RTZWxsZXJBdWRpb0Jvb2tzKCkge1xyXG4gICAgICAgIGNhdGFsb2dTZXJ2aWNlLmdldENhdGFsb2coe1xyXG4gICAgICAgICAgICBhY3Rpb246ICdiZXN0c2VsbGVyJyxcclxuICAgICAgICAgICAgJHRvcDogMTAsXHJcbiAgICAgICAgICAgICRpbmxpbmVjb3VudDogJ2FsbHBhZ2VzJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgdm0uYmVzdHNlbGxlciA9IHJlc3VsdC5pdGVtcztcclxuXHJcbiAgICAgICB9KVxyXG4gICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgIHZhciBtZXNzYWdlID0gQXBwRXJyb3JzLmdldE1lc3NhZ2UoZXJyb3IpO1xyXG4gICAgICAgICAgIGxvZ0Vycm9yKG1lc3NhZ2UsIGVycm9yLCB0cnVlKTtcclxuICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldENvbWluZ1Nvb25BdWRpb0Jvb2tzKCkge1xyXG4gICAgICAgIGNhdGFsb2dTZXJ2aWNlLmdldENhdGFsb2coe1xyXG4gICAgICAgICAgICBhY3Rpb246ICdjb21pbmdzb29uJyxcclxuICAgICAgICAgICAgJHRvcDogMTAsXHJcbiAgICAgICAgICAgICRpbmxpbmVjb3VudDogJ2FsbHBhZ2VzJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgdm0uY29taW5nc29vbiA9IHJlc3VsdC5pdGVtcztcclxuXHJcbiAgICAgICB9KVxyXG4gICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgIHZhciBtZXNzYWdlID0gQXBwRXJyb3JzLmdldE1lc3NhZ2UoZXJyb3IpO1xyXG4gICAgICAgICAgIGxvZ0Vycm9yKG1lc3NhZ2UsIGVycm9yLCB0cnVlKTtcclxuICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEVkaXRvclBpY2tBdWRpb0Jvb2tzKCkge1xyXG4gICAgICAgIGNhdGFsb2dTZXJ2aWNlLmdldENhdGFsb2coe1xyXG4gICAgICAgICAgICBhY3Rpb246ICdlZGl0b3InLFxyXG4gICAgICAgICAgICAkdG9wOiAxMCxcclxuICAgICAgICAgICAgJGlubGluZWNvdW50OiAnYWxscGFnZXMnLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAuJHByb21pc2VcclxuICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICB2bS5lZGl0b3JQaWNrcyA9IHJlc3VsdC5pdGVtcztcclxuXHJcbiAgICAgICB9KVxyXG4gICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgIHZhciBtZXNzYWdlID0gQXBwRXJyb3JzLmdldE1lc3NhZ2UoZXJyb3IpO1xyXG4gICAgICAgICAgIGxvZ0Vycm9yKG1lc3NhZ2UsIGVycm9yLCB0cnVlKTtcclxuICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEJlc3RQaWNrQXVkaW9Cb29rcygpIHtcclxuICAgICAgICBjYXRhbG9nU2VydmljZS5nZXRDYXRhbG9nKHtcclxuICAgICAgICAgICAgYWN0aW9uOiAnYmVzdCcsXHJcbiAgICAgICAgICAgICR0b3A6IDgsXHJcbiAgICAgICAgICAgICRpbmxpbmVjb3VudDogJ2FsbHBhZ2VzJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgdm0uYmVzdFBpY2tzID0gcmVzdWx0Lml0ZW1zO1xyXG5cclxuICAgICAgIH0pXHJcbiAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBBcHBFcnJvcnMuZ2V0TWVzc2FnZShlcnJvcik7XHJcbiAgICAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VHJpYWxBdWRpb0Jvb2tzKCkge1xyXG4gICAgICAgIGNhdGFsb2dTZXJ2aWNlLmdldENhdGFsb2coe1xyXG4gICAgICAgICAgICBhY3Rpb246ICd0cmlhbCcsXHJcbiAgICAgICAgICAgICR0b3A6IDEwLFxyXG4gICAgICAgICAgICAkaW5saW5lY291bnQ6ICdhbGxwYWdlcycsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuJHByb21pc2VcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHZtLnRyaWFsID0gcmVzdWx0Lml0ZW1zO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBBcHBFcnJvcnMuZ2V0TWVzc2FnZShlcnJvcik7XHJcbiAgICAgICAgICAgIGxvZ0Vycm9yKG1lc3NhZ2UsIGVycm9yLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRGcmVlQXVkaW9Cb29rcygpIHtcclxuICAgICAgICBjYXRhbG9nU2VydmljZS5nZXRDYXRhbG9nKHtcclxuICAgICAgICAgICAgYWN0aW9uOiAnZnJlZScsXHJcbiAgICAgICAgICAgICR0b3A6IDEwLFxyXG4gICAgICAgICAgICAkaW5saW5lY291bnQ6ICdhbGxwYWdlcycsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuJHByb21pc2VcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHZtLmZyZWUgPSByZXN1bHQuaXRlbXM7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEFwcEVycm9ycy5nZXRNZXNzYWdlKGVycm9yKTtcclxuICAgICAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEZlYXR1cmVkQXJ0aXN0cygpIHtcclxuICAgICAgICBhdWRpb0Jvb2tTZXJ2aWNlLmdldEZlYXR1cmVkQXJ0aXN0cygpXHJcbiAgICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB2bS5mZWF0dXJlZEFydGlzdHMgPSByZXN1bHQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gQXBwRXJyb3JzLmdldE1lc3NhZ2UoZXJyb3IpO1xyXG4gICAgICAgICAgICBsb2dFcnJvcihtZXNzYWdlLCBlcnJvciwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TmF2YWFyQXVkaW9Cb29rcygpIHtcclxuICAgICAgICBjYXRhbG9nU2VydmljZS5nZXRDYXRhbG9nKHtcclxuICAgICAgICAgICAgYWN0aW9uOiAnbmF2YWFyJyxcclxuICAgICAgICAgICAgJHRvcDogNyxcclxuICAgICAgICAgICAgJGlubGluZWNvdW50OiAnYWxscGFnZXMnLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAuJHByb21pc2VcclxuICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICB2bS5uYXZhYXIgPSByZXN1bHQuaXRlbXM7XHJcbiAgICAgICB9KVxyXG4gICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgIHZhciBtZXNzYWdlID0gQXBwRXJyb3JzLmdldE1lc3NhZ2UoZXJyb3IpO1xyXG4gICAgICAgICAgIGxvZ0Vycm9yKG1lc3NhZ2UsIGVycm9yLCB0cnVlKTtcclxuICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHByb2Nlc3NTbGlkZXMoc2xpZGVzKSB7XHJcbiAgICAgICAgdmFyIGlzQXV0aGVudGljYXRlZCA9ICRyb290U2NvcGUuaXNBdXRoZW50aWNhdGVkIHx8IGZhbHNlO1xyXG4gICAgICAgIHZhciBpc0ZpcnN0VGltZSA9ICEkcm9vdFNjb3BlLmNsaWVudEluZm8ubG9nZ2VkaW47XHJcbiAgICAgICAgdmFyIGhhc1B1cmNoYXNlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB2bS5zbGlkZXMuY2xlYXIoKTtcclxuICAgICAgICB2bS5tb2JpbGVJbnRybyA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChzbGlkZXMpIHtcclxuICAgICAgICAgICAgc2xpZGVzLmZvckVhY2goZnVuY3Rpb24gKHNsaWRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xpZGUuc2xpZGVUeXBlID09IDApIHsgLy9XZWJEZXNrdG9wXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlLnZpZXdNb2RlID09IDIpIHsgIC8vYm90aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5zbGlkZXMucHVzaChzbGlkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzbGlkZS52aWV3TW9kZSA9PSAxICYmIGlzQXV0aGVudGljYXRlZCkgeyAvL2F1dGhlbnRpY2F0ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uc2xpZGVzLnB1c2goc2xpZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2xpZGUudmlld01vZGUgPT0gMCAmJiAhaXNBdXRoZW50aWNhdGVkKSB7ICAgLy9ub3QgYXV0aGVudGljYXRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5zbGlkZXMucHVzaChzbGlkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzbGlkZS52aWV3TW9kZSA9PSAzICYmIGlzRmlyc3RUaW1lKSB7ICAgLy9GaXJzdCBUaW1lIFZpc2l0b3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uc2xpZGVzLnB1c2goc2xpZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2xpZGUudmlld01vZGUgPT0gNCAmJiAkcm9vdFNjb3BlLnVzZXJBY3Rpdml0eUluZm8gJiYgJHJvb3RTY29wZS51c2VyQWN0aXZpdHlJbmZvLnB1cmNoYXNlU3RhdHVzLmhhc1B1cmNoYXNlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiAhJHJvb3RTY29wZS51c2VyQWN0aXZpdHlJbmZvLnN1YnNjcmlwdGlvblN0YXR1cy5oYXNBY3RpdmVTdWJzY3JpcHRpb24pIHsgICAvL1N1YnNjcmlwdGlvbiBzbGlkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5zbGlkZXMucHVzaChzbGlkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2xpZGUuc2xpZGVUeXBlID09IDEpIHsgICAgLy9XZWJNb2JpbGVcclxuICAgICAgICAgICAgICAgICAgICB2bS5tb2JpbGVJbnRybyA9IHNsaWRlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgJHJvb3RTY29wZS4kb24oJ2xvZ2dlZE9uJywgZnVuY3Rpb24gKGUsIHRpY2tldCkge1xyXG4gICAgICAgIGlmICgkcm91dGUuY3VycmVudC5jb250cm9sbGVyID09ICdJbmRleENvbnRyb2xsZXInKSB7XHJcblxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmdldFVzZXJBY3Rpdml0eUluZm8oKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIC8vJHJvdXRlLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2lmICgkcm91dGUuY3VycmVudC5jb250cm9sbGVyID09ICdJbmRleENvbnRyb2xsZXInICYmICghdm0uY3VycmVudExvZ2dlZEluU3RhdHVzKSkge1xyXG4gICAgICAgIC8vICAgIHZtLmN1cnJlbnRMb2dnZWRJblN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgJHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAvL31cclxuICAgICAgICAvL2Vsc2Uge1xyXG4gICAgICAgIC8vICAgIGxvZ1N1Y2Nlc3MoJ9i02YXYpyDYqNinINmF2YjZgdmC24zYqiDZiNin2LHYryDZhtmI2KfYsSDYtNiv24zYry4nLCBudWxsLCB0cnVlKTtcclxuICAgICAgICAvL31cclxuICAgIH0pO1xyXG5cclxuICAgIC8vJHJvb3RTY29wZS4kb24oJ2xvZ2dlZE91dCcsIGZ1bmN0aW9uIChlLCB0aWNrZXQpIHtcclxuICAgIC8vICAgIGlmICgkcm91dGUuY3VycmVudC5jb250cm9sbGVyID09ICdJbmRleENvbnRyb2xsZXInKSB7XHJcbiAgICAvLyAgICAgICAgJHJvdXRlLnJlbG9hZCgpO1xyXG4gICAgLy8gICAgfVxyXG4gICAgLy99KTtcclxufV0pO1xyXG5cclxuXHJcbiIsIlxyXG5hbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignTG9naW5MaXRlQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJ1VzZXJNYW5hZ2VyJywgJyRsb2NhdGlvbicsICckdWliTW9kYWxJbnN0YW5jZScsICduZ0F1dGhTZXR0aW5ncycsICdBbmFseXRpY3NTZXJ2aWNlJywgJ0FOQUxZVElDUycsICckdWliTW9kYWwnLCAnZGF0YScsIGZ1bmN0aW9uICgkc2NvcGUsICR1c2VyTWFuYWdlciwgJGxvY2F0aW9uLCAkbW9kYWxJbnN0YW5jZSwgbmdBdXRoU2V0dGluZ3MsIGFuYWx5dGljc1NlcnZpY2UsIEFOQUxZVElDUywgJG1vZGFsLCBkYXRhKSB7XHJcbiAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgdm0uZXJyb3JzID0gW107XHJcbiAgICB2bS5hdXRoID0ge307XHJcbiAgICB2bS5pc0J1c3kgPSBmYWxzZTtcclxuICAgIHZtLmN1c3RvbURhdGEgPSBkYXRhO1xyXG4gICAgdm0ubG9naW4gPSBsb2dpbjtcclxuICAgIHZtLnJlZ2lzdGVyID0gcmVnaXN0ZXI7XHJcbiAgICB2bS5jYW5jZWwgPSBjYW5jZWw7XHJcbiAgICB2bS5vayA9IG9rO1xyXG4gICAgdm0uYXV0aEV4dGVybmFsUHJvdmlkZXIgPSBhdXRoRXh0ZXJuYWxQcm92aWRlcjtcclxuICAgIHZtLmF1dGhDb21wbGV0ZWRDQiA9IGF1dGhDb21wbGV0ZWRDQjtcclxuXHJcbiAgICBmdW5jdGlvbiBsb2dpbigpIHtcclxuICAgICAgICAvLyBjbGVhciBwcmV2aW91cyBlcnJvcnNcclxuICAgICAgICB2bS5lcnJvcnMgPSBbXTtcclxuICAgICAgICB2bS5pc0J1c3kgPSB0cnVlO1xyXG4gICAgICAgIC8vIHZlcmlmeSB1c2VyXHJcbiAgICAgICAgJHVzZXJNYW5hZ2VyLmFjcXVpcmVUb2tlbih7ICd1c2VybmFtZSc6IHZtLmF1dGgudXNlcm5hbWUsICdwYXNzd29yZCc6IHZtLmF1dGgucGFzc3dvcmQgfSlcclxuICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudXNlck5hbWUgJiYgcmVzdWx0LmFjY2Vzc190b2tlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHVzZXJNYW5hZ2VyLmxvZ2luKHJlc3VsdCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmFseXRpY3NTZXJ2aWNlLnRyYWNrRXZlbnQoQU5BTFlUSUNTLmNhdGVnb3J5LlVYLCBBTkFMWVRJQ1MudXhBY3Rpb24uU0lHTkVEX0lOLCAnZW1haWwnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5lcnJvcnMucHVzaChBcHBFcnJvcnMuZ2V0TWVzc2FnZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuYWx5dGljc1NlcnZpY2UudHJhY2tFdmVudChBTkFMWVRJQ1MuY2F0ZWdvcnkuVVgsIEFOQUxZVElDUy51eEFjdGlvbi5TSUdOSU5fRkFJTFVSRSwgJ2VtYWlsJyArICctJyArIHZtLmVycm9ycy5qb2luKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0uaXNCdXN5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5lcnJvcihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LmVycm9yX2Rlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5lcnJvcnMucHVzaChyZXN1bHQuZXJyb3JfZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5lcnJvciAmJiByZXN1bHQuZXJyb3IgPT0gJ2ludmFsaWRfZ3JhbnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0uZXJyb3JzLnB1c2goJ9in2q/YsSDYq9io2Kog2YbYp9mFINmG2qnYsdiv2Ycg2KfbjNiv2Iwg2YTYt9mB2Kcg2LHZiNuMINiv2qnZhdmHINir2KjYqiDZhtin2YUg2qnZhNuM2qkg2YbZhdin24zbjNivLicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0uZXJyb3JzLnB1c2goQXBwRXJyb3JzLmdldE1lc3NhZ2UoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5hbHl0aWNzU2VydmljZS50cmFja0V2ZW50KEFOQUxZVElDUy5jYXRlZ29yeS5VWCwgQU5BTFlUSUNTLnV4QWN0aW9uLlNJR05JTl9GQUlMVVJFLCAnZW1haWwnICsgJy0nICsgdm0uZXJyb3JzLmpvaW4oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmlzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiByZWdpc3RlcigpIHtcclxuICAgICAgICB2bS5lcnJvcnMgPSBbXTtcclxuICAgICAgICB2bS5pc0J1c3kgPSB0cnVlO1xyXG5cclxuICAgICAgICAkdXNlck1hbmFnZXIucmVnaXN0ZXJMaXRlKHsgZW1haWw6IHZtLmF1dGgudXNlcm5hbWUsIHBhc3N3b3JkOiB2bS5hdXRoLnBhc3N3b3JkLCBjb25maXJtOiB2bS5hdXRoLnBhc3N3b3JkLCBuZXdzbGV0dGVyOiB0cnVlLCBtYXJrZXQ6IDMsIGN1c3RvbURhdGE6IEpTT04uc3RyaW5naWZ5KHZtLmN1c3RvbURhdGEpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0uZXJyb3JzID0gQXBwRXJyb3JzLmdldEVycm9ycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5hbHl0aWNzU2VydmljZS50cmFja0V2ZW50KEFOQUxZVElDUy5jYXRlZ29yeS5VWCwgQU5BTFlUSUNTLnV4QWN0aW9uLlJFR0lTVEVSQVRJT05fRkFJTFVSRSwgJ2VtYWlsJyArICctJyArIHZtLmVycm9ycy5qb2luKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0uaXNCdXN5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmFseXRpY3NTZXJ2aWNlLnRyYWNrRXZlbnQoQU5BTFlUSUNTLmNhdGVnb3J5LlVYLCBBTkFMWVRJQ1MudXhBY3Rpb24uUkVHSVNURVJFRCwgJ2VtYWlsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dpbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmVycm9ycyA9IEFwcEVycm9ycy5nZXRFcnJvcnMoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmFseXRpY3NTZXJ2aWNlLnRyYWNrRXZlbnQoQU5BTFlUSUNTLmNhdGVnb3J5LlVYLCBBTkFMWVRJQ1MudXhBY3Rpb24uUkVHSVNURVJBVElPTl9GQUlMVVJFLCAnZW1haWwnICsgJy0nICsgdm0uZXJyb3JzLmpvaW4oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmlzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNhbmNlbCgpIHtcclxuICAgICAgICAkbW9kYWxJbnN0YW5jZS5kaXNtaXNzKFwiY2FuY2VsXCIpO1xyXG4gICAgICAgICR1c2VyTWFuYWdlci5zZXRMb2dpblJlcXVlc3RlZChmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb2soKSB7XHJcbiAgICAgICAgJG1vZGFsSW5zdGFuY2UuY2xvc2UoXCJva1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhdXRoRXh0ZXJuYWxQcm92aWRlcihwcm92aWRlcikge1xyXG5cclxuICAgICAgICB2YXIgcmVkaXJlY3RVcmkgPSBsb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyBsb2NhdGlvbi5ob3N0ICsgJy9hdXRoY29tcGxldGUuaHRtbD92PScgKyBhcHBWZXJzaW9uO1xyXG5cclxuICAgICAgICB2YXIgZXh0ZXJuYWxQcm92aWRlclVybCA9IG5nQXV0aFNldHRpbmdzLmFwaVNlcnZpY2VCYXNlVXJpICsgXCIvYXBpL0FjY291bnQvRXh0ZXJuYWxMb2dpbj9wcm92aWRlcj1cIiArIHByb3ZpZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiZyZXNwb25zZV90eXBlPXRva2VuJmNsaWVudF9pZD1cIiArIG5nQXV0aFNldHRpbmdzLmNsaWVudElkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiZyZWRpcmVjdF91cmk9XCIgKyByZWRpcmVjdFVyaTtcclxuICAgICAgICB3aW5kb3cuJHdpbmRvd1Njb3BlID0gdm07XHJcblxyXG4gICAgICAgIHZhciBvYXV0aFdpbmRvdyA9IHdpbmRvdy5vcGVuKGV4dGVybmFsUHJvdmlkZXJVcmwsIFwiQXV0aGVudGljYXRlIEFjY291bnRcIiwgXCJsb2NhdGlvbj0wLHN0YXR1cz0wLHdpZHRoPTYwMCxoZWlnaHQ9NzUwXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBhdXRoQ29tcGxldGVkQ0IoZnJhZ21lbnQpIHtcclxuXHJcbiAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZnJhZ21lbnQuaGFzbG9jYWxhY2NvdW50ID09ICdGYWxzZScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkdXNlck1hbmFnZXIubG9nb3V0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGV4dGVybmFsQXV0aERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXI6IGZyYWdtZW50LnByb3ZpZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJOYW1lOiBmcmFnbWVudC5leHRlcm5hbF91c2VyX25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBmcmFnbWVudC5leHRlcm5hbF91c2VyX2ZuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBmcmFnbWVudC5leHRlcm5hbF91c2VyX2xuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4dGVybmFsQWNjZXNzVG9rZW46IGZyYWdtZW50LmV4dGVybmFsX2FjY2Vzc190b2tlbixcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXQ6IDNcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgJHVzZXJNYW5hZ2VyLnJlZ2lzdGVyRXh0ZXJuYWwoZXh0ZXJuYWxBdXRoRGF0YSkuc3VjY2VzcyhmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC51c2VyTmFtZSAmJiByZXN1bHQuYWNjZXNzX3Rva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR1c2VyTWFuYWdlci5sb2dpbihyZXN1bHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmFseXRpY3NTZXJ2aWNlLnRyYWNrRXZlbnQoQU5BTFlUSUNTLmNhdGVnb3J5LlVYLCBBTkFMWVRJQ1MudXhBY3Rpb24uUkVHSVNURVJFRCwgJ2dvb2dsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZXJyb3JzLnB1c2goQXBwRXJyb3JzLmdldE1lc3NhZ2UoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuYWx5dGljc1NlcnZpY2UudHJhY2tFdmVudChBTkFMWVRJQ1MuY2F0ZWdvcnkuVVgsIEFOQUxZVElDUy51eEFjdGlvbi5SRUdJU1RFUkFUSU9OX0ZBSUxVUkUsICdnb29nbGUnICsgJy0nICsgdm0uZXJyb3JzLmpvaW4oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmlzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBBcHBFcnJvcnMuZ2V0TWVzc2FnZShlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uZXJyb3JzLnB1c2gobWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5hbHl0aWNzU2VydmljZS50cmFja0V2ZW50KEFOQUxZVElDUy5jYXRlZ29yeS5VWCwgQU5BTFlUSUNTLnV4QWN0aW9uLlJFR0lTVEVSQVRJT05fRkFJTFVSRSwgJ2dvb2dsZScgKyAnLScgKyB2bS5lcnJvcnMuam9pbigpKTtcclxuICAgICAgICAgICAgICAgICAgICB2bS5pc0J1c3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vT2J0YWluIGFjY2VzcyB0b2tlbi5cclxuICAgICAgICAgICAgICAgIHZhciBleHRlcm5hbERhdGEgPSB7IHByb3ZpZGVyOiBmcmFnbWVudC5wcm92aWRlciwgZXh0ZXJuYWxBY2Nlc3NUb2tlbjogZnJhZ21lbnQuZXh0ZXJuYWxfYWNjZXNzX3Rva2VuIH07XHJcbiAgICAgICAgICAgICAgICAkdXNlck1hbmFnZXIub2J0YWluQWNjZXNzVG9rZW4oZXh0ZXJuYWxEYXRhKS5zdWNjZXNzKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnVzZXJOYW1lICYmIHJlc3VsdC5hY2Nlc3NfdG9rZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHVzZXJNYW5hZ2VyLmxvZ2luKHJlc3VsdCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuYWx5dGljc1NlcnZpY2UudHJhY2tFdmVudChBTkFMWVRJQ1MuY2F0ZWdvcnkuVVgsIEFOQUxZVElDUy51eEFjdGlvbi5TSUdORURfSU4sICdnb29nbGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmVycm9ycy5wdXNoKEFwcEVycm9ycy5nZXRNZXNzYWdlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmFseXRpY3NTZXJ2aWNlLnRyYWNrRXZlbnQoQU5BTFlUSUNTLmNhdGVnb3J5LlVYLCBBTkFMWVRJQ1MudXhBY3Rpb24uU0lHTklOX0ZBSUxVUkUsICdnb29nbGUnICsgJy0nICsgdm0uZXJyb3JzLmpvaW4oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmlzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBBcHBFcnJvcnMuZ2V0TWVzc2FnZShlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uZXJyb3JzLnB1c2gobWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5hbHl0aWNzU2VydmljZS50cmFja0V2ZW50KEFOQUxZVElDUy5jYXRlZ29yeS5VWCwgQU5BTFlUSUNTLnV4QWN0aW9uLlNJR05JTl9GQUlMVVJFLCAnZ29vZ2xlJyArICctJyArIHZtLmVycm9ycy5qb2luKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmlzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdNYXN0ZXJTZWFyY2hDb250cm9sbGVyJyxcclxuWydDYXRhbG9nU2VydmljZScsICdsb2dnZXInLCBmdW5jdGlvbiAoY2F0YWxvZ1NlcnZpY2UsIGxvZ2dlcikge1xyXG4gICAgbG9nZ2VyID0gbG9nZ2VyLmZvclNvdXJjZSgnTWFzdGVyU2VhcmNoQ29udHJvbGxlcicpO1xyXG4gICAgdmFyIGxvZ0Vycm9yID0gbG9nZ2VyLmxvZ0Vycm9yO1xyXG4gICAgdmFyIGxvZ1N1Y2Nlc3MgPSBsb2dnZXIubG9nU3VjY2VzcztcclxuXHJcbiAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgdm0uZ2V0U2VhcmNoUmVzdWx0ID0gZ2V0U2VhcmNoUmVzdWx0O1xyXG4gICAgdm0uc2VhcmNoT3B0aW9ucyA9IHtcclxuICAgICAgICBtaW5MZW5ndGg6IDIsXHJcbiAgICAgICAgZGVsYXk6IDUwMCxcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKiogaW1wbGVtZW50YXRpb24gKioqL1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNlYXJjaFJlc3VsdCh2YWwpIHtcclxuICAgICAgICBpZiAoIXZhbClcclxuICAgICAgICAgICAgcmV0dXJuIFt7ICdhdWRpb2Jvb2tzJzogW10sICdhdXRob3JCb29rcyc6IFtdLCAnbmFycmF0b3JCb29rcyc6IFtdLCAndHJhbnNsYXRvckJvb2tzJzogW10sICdwdWJsaXNoZXJCb29rcyc6IFtdIH1dO1xyXG4gICAgICAgIHJldHVybiBjYXRhbG9nU2VydmljZS5nZXRTZWFyY2hSZXN1bHQodmFsKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcmVzdWx0LmRhdGEudG90YWxJdGVtc0NvdW50ID0gcmVzdWx0LmRhdGEuYXVkaW9ib29rcy5sZW5ndGggKyByZXN1bHQuZGF0YS5hdXRob3JCb29rcy5sZW5ndGggKyByZXN1bHQuZGF0YS5uYXJyYXRvckJvb2tzLmxlbmd0aCArIHJlc3VsdC5kYXRhLnRyYW5zbGF0b3JCb29rcy5sZW5ndGggKyByZXN1bHQuZGF0YS5wdWJsaXNoZXJCb29rcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHJldHVybiBbcmVzdWx0LmRhdGFdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1dKTsiLCJcclxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ05hdkNvbnRyb2xsZXInLCBbJyRyb290U2NvcGUnLCAnJHNjb3BlJywgJ1VzZXJNYW5hZ2VyJywgJ0NhcnRTZXJ2aWNlJywgJ0NhdGFsb2dTZXJ2aWNlJywgJyR1aWJNb2RhbCcsICckbG9jYXRpb24nLCAnT3JkZXJTZXJ2aWNlJywgJ2xvY2FsU3RvcmFnZVNlcnZpY2UnLCAnbG9nZ2VyJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRzY29wZSwgJHVzZXJNYW5hZ2VyLCBjYXJ0U2VydmljZSwgY2F0YWxvZ1NlcnZpY2UsICRtb2RhbCwgJGxvY2F0aW9uLCBvcmRlclNlcnZpY2UsIGxvY2FsU3RvcmFnZVNlcnZpY2UsIGxvZ2dlcikge1xyXG5cclxuICAgIGxvZ2dlciA9IGxvZ2dlci5mb3JTb3VyY2UoJ05hdkNvbnRyb2xsZXInKTtcclxuICAgIHZhciBsb2dFcnJvciA9IGxvZ2dlci5sb2dFcnJvcjtcclxuICAgIHZhciBsb2dTdWNjZXNzID0gbG9nZ2VyLmxvZ1N1Y2Nlc3M7XHJcblxyXG4gICAgLy8gJHNjb3BlLmlzQXV0aGVudGljYXRlZCA9IGZhbHNlO1xyXG4gICAgLy8gJHNjb3BlLnVzZXJOYW1lID0gbnVsbDtcclxuXHJcbiAgICAkc2NvcGUuJG9uKCdsb2dnZWRPbicsIGZ1bmN0aW9uIChlLCB0aWNrZXQpIHtcclxuICAgICAgICAvLyRzY29wZS5pc0F1dGhlbnRpY2F0ZWQgPSB0cnVlO1xyXG4gICAgICAgIC8vJHNjb3BlLnVzZXJOYW1lID0gdGlja2V0LnVzZXJOYW1lO1xyXG4gICAgICAgIGdldFVzZXJBY3Rpdml0eUluZm8oKTtcclxuICAgICAgICAkc2NvcGUuZ2V0Q2FydFRvdGFsQ291bnQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vJHNjb3BlLiRvbignbG9nZ2VkT3V0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gICAgJHNjb3BlLmlzQXV0aGVudGljYXRlZCA9IGZhbHNlO1xyXG4gICAgLy8gICAgJHNjb3BlLnVzZXJOYW1lID0gbnVsbDtcclxuICAgIC8vfSk7XHJcblxyXG4gICAgJHNjb3BlLmdldENhcnRUb3RhbENvdW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNhcnRTZXJ2aWNlLmdldENhcnRUb3RhbENvdW50KCkuJHByb21pc2VcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuY2FydEl0ZW1zQ291bnQgPSByZXN1bHQuY291bnQ7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuaGFzVHJpYWwgPSByZXN1bHQuaGFzVHJpYWw7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5zaG93U3Vic2NyaXB0aW9uID0gZmFsc2U7XHJcbiAgICBpZiAoJHNjb3BlLmlzQXV0aGVudGljYXRlZCkge1xyXG4gICAgICAgIGdldFVzZXJBY3Rpdml0eUluZm8oKTtcclxuICAgICAgICAkc2NvcGUuZ2V0Q2FydFRvdGFsQ291bnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2dpbihjdXN0b21EYXRhKSB7XHJcbiAgICAgICAgLy92YXIgZGxnID0gZGlhbG9ncy5jcmVhdGUoJy9hcHAvdGVtcGxhdGVzL2xvZ2luLmh0bWwnLCAnTG9naW5Db250cm9sbGVyJyk7XHJcblxyXG4gICAgICAgIHZhciBkbGcgPSAkbW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2FwcC90ZW1wbGF0ZXMvbG9naW5fbGl0ZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luTGl0ZUNvbnRyb2xsZXIgYXMgdm0nLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHdpbmRvd0NsYXNzOiAnYXBwLW1vZGFsLWxvZ2luJyxcclxuICAgICAgICAgICAgLy9zaXplOiAnc20nLFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1c3RvbURhdGE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAkc2NvcGUubG9naW4gPSBsb2dpbjtcclxuICAgICRyb290U2NvcGUubG9naW4gPSBsb2dpbjtcclxuXHJcbiAgICAkc2NvcGUubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICRzY29wZS5zaG93U3Vic2NyaXB0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgJHVzZXJNYW5hZ2VyLmxvZ291dCgpO1xyXG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XHJcbiAgICB9XHJcblxyXG4gICAgJHJvb3RTY29wZS5sb2dvdXQgPSAkc2NvcGUubG9nb3V0O1xyXG5cclxuICAgICRzY29wZS5nb1RvUGF0aCA9IGZ1bmN0aW9uIChwYXRoKSB7XHJcbiAgICAgICAgJGxvY2F0aW9uLnBhdGgocGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8kc2NvcGUuc2VhcmNoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gICAgdmFyIGtleXdvcmQgPSAkc2NvcGUua2V5d29yZDtcclxuICAgIC8vICAgIGlmICgha2V5d29yZCkgcmV0dXJuO1xyXG4gICAgLy8gICAgJGxvY2F0aW9uLnBhdGgoL3NlYXJjaC8gKyBrZXl3b3JkKTtcclxuICAgIC8vfVxyXG5cclxuICAgIGluaXRpYWxpemUoKTtcclxuXHJcbiAgICAvKioqIGltcGxlbWVudGF0aW9uICoqKi9cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIGdldEdlbnJlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEdlbnJlcygpIHtcclxuICAgICAgICBjYXRhbG9nU2VydmljZS5nZXRHZW5yZXMoKVxyXG4gICAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmdlbnJlcyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5nZW5yZXMgPSByZXN1bHQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIC8vdmFyIG1lc3NhZ2UgPSBBcHBFcnJvcnMuZ2V0TWVzc2FnZShlcnJvcik7XHJcbiAgICAgICAgICAgIC8vbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgICRzY29wZS5zaG93R3VpZGUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhciBkbGcgPSAkbW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2FwcC90ZW1wbGF0ZXMvZ3VpZGUuaHRtbCcsXHJcbiAgICAgICAgICAgIHdpbmRvd0NsYXNzOiAnZ3VpZGUtbW9kYWwnLFxyXG4gICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFVzZXJBY3Rpdml0eUluZm8oKSB7XHJcbiAgICAgICAgcmV0dXJuIG9yZGVyU2VydmljZS5nZXRVc2VyQWN0aXZpdHlJbmZvKClcclxuICAgICAgICAuJHByb21pc2VcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUudXNlckFjdGl2aXR5SW5mbyA9IHJlc3VsdDtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LnB1cmNoYXNlU3RhdHVzLmhhc1B1cmNoYXNlZCAmJiAhcmVzdWx0LnN1YnNjcmlwdGlvblN0YXR1cy5oYXNBY3RpdmVTdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zaG93U3Vic2NyaXB0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBBcHBFcnJvcnMuZ2V0TWVzc2FnZShlcnJvcik7XHJcbiAgICAgICAgICAgIGxvZ0Vycm9yKG1lc3NhZ2UsIGVycm9yLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAkcm9vdFNjb3BlLmdldFVzZXJBY3Rpdml0eUluZm8gPSBnZXRVc2VyQWN0aXZpdHlJbmZvO1xyXG59XSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdOb3RGb3VuZENvbnRyb2xsZXInLFxyXG5bJ0NhdGFsb2dTZXJ2aWNlJywgJ2xvZ2dlcicsICckbG9jYXRpb24nLCBmdW5jdGlvbiAoY2F0YWxvZ1NlcnZpY2UsIGxvZ2dlciwgJGxvY2F0aW9uKSB7XHJcbiAgICBsb2dnZXIgPSBsb2dnZXIuZm9yU291cmNlKCdOb3RGb3VuZENvbnRyb2xsZXInKTtcclxuICAgIHZhciBsb2dFcnJvciA9IGxvZ2dlci5sb2dFcnJvcjtcclxuICAgIHZhciBsb2dTdWNjZXNzID0gbG9nZ2VyLmxvZ1N1Y2Nlc3M7XHJcblxyXG4gICAgdmFyIHZtID0gdGhpcztcclxuICAgIHZtLmF1ZGlvYm9va3MgPSBbXTtcclxuXHJcbiAgICBpbml0aWFsaXplKCk7XHJcblxyXG4gICAgLyoqKiBpbXBsZW1lbnRhdGlvbiAqKiovXHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICBnZXRDYXRhbG9nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q2F0YWxvZygpIHtcclxuICAgICAgICBjYXRhbG9nU2VydmljZS5nZXRDYXRhbG9nKHtcclxuICAgICAgICAgICAgYWN0aW9uOiAnYmVzdHNlbGxlcicsXHJcbiAgICAgICAgICAgICR0b3A6IDEwLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICB2bS5hdWRpb2Jvb2tzID0gcmVzdWx0Lml0ZW1zO1xyXG4gICAgICAgICB9KVxyXG4gICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEFwcEVycm9ycy5nZXRNZXNzYWdlKGVycm9yKTtcclxuICAgICAgICAgICAgIGxvZ0Vycm9yKG1lc3NhZ2UsIGVycm9yLCB0cnVlKTtcclxuICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignT3JkZXJDYW5jZWxDb250cm9sbGVyJyxcclxuWydPcmRlclNlcnZpY2UnLCAnbG9nZ2VyJywgJyR1aWJNb2RhbEluc3RhbmNlJywgJ2RhdGEnLCBmdW5jdGlvbiAob3JkZXJTZXJ2aWNlLCBsb2dnZXIsICRtb2RhbEluc3RhbmNlLCBkYXRhKSB7XHJcbiAgICBsb2dnZXIgPSBsb2dnZXIuZm9yU291cmNlKCdPcmRlckNhbmNlbENvbnRyb2xsZXInKTtcclxuICAgIHZhciBsb2dFcnJvciA9IGxvZ2dlci5sb2dFcnJvcjtcclxuICAgIHZhciBsb2dTdWNjZXNzID0gbG9nZ2VyLmxvZ1N1Y2Nlc3M7XHJcblxyXG4gICAgdmFyIHZtID0gdGhpcztcclxuICAgIHZtLml0ZW0gPSBkYXRhO1xyXG4gICAgdm0ub2sgPSBvaztcclxuICAgIHZtLmNhbmNlbCA9IGNhbmNlbDtcclxuXHJcbiAgICAvKioqIGltcGxlbWVudGF0aW9uICoqKi9cclxuXHJcbiAgICBmdW5jdGlvbiBvaygpIHtcclxuICAgICAgICBvcmRlclNlcnZpY2UuY2FuY2VsT3JkZXIoe1xyXG4gICAgICAgICAgICBpZDogdm0uaXRlbS5vcmRlcklkLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEFwcEVycm9ycy5nZXRNZXNzYWdlKGVycm9yKTtcclxuICAgICAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNhbmNlbCgpIHtcclxuICAgICAgICAkbW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgIH1cclxufV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdPcmRlckl0ZW1Db250cm9sbGVyJyxcclxuWydPcmRlclNlcnZpY2UnLCBmdW5jdGlvbiAob3JkZXJTZXJ2aWNlKSB7XHJcblxyXG4gICAgdmFyIHZtID0gdGhpcztcclxuICAgIHZtLmlzQ29sbGFwc2VkID0gdHJ1ZTtcclxuICAgIHZtLnRlbXBsYXRlID0gJyc7XHJcbiAgICB2bS5zaG93T3JkZXJJdGVtcyA9IHNob3dPcmRlckl0ZW1zO1xyXG4gICAgdm0ub3JkZXJJdGVtcyA9IG51bGw7XHJcblxyXG4gICAgLyoqKiBpbXBsZW1lbnRhdGlvbiAqKiovXHJcblxyXG4gICAgZnVuY3Rpb24gc2hvd09yZGVySXRlbXMob3JkZXJJZCkge1xyXG4gICAgICAgIHZtLnRlbXBsYXRlID0gJy9hcHAvdGVtcGxhdGVzL29yZGVyX2l0ZW1zLmh0bWw/dj0nICsgYXBwVmVyc2lvbjtcclxuICAgICAgICB2bS5pc0NvbGxhcHNlZCA9ICF2bS5pc0NvbGxhcHNlZDtcclxuICAgICAgICBnZXRPcmRlckl0ZW1zKG9yZGVySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldE9yZGVySXRlbXMob3JkZXJJZCkge1xyXG4gICAgICAgIHJldHVybiBvcmRlclNlcnZpY2UuZ2V0T3JkZXJJdGVtcyhvcmRlcklkKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHZtLm9yZGVySXRlbXMgPSBkYXRhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XSk7XHJcblxyXG5cclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ1BsYXllckNvbnRyb2xsZXInLFxyXG5bJ0NvbnRhY3RTZXJ2aWNlJywgJ2xvZ2dlcicsICdVc2VyTWFuYWdlcicsICckcm9vdFNjb3BlJywgZnVuY3Rpb24gKGNvbnRhY3RTZXJ2aWNlLCBsb2dnZXIsIHVzZXJNYW5hZ2VyLCAkcm9vdFNjb3BlKSB7XHJcbiAgICBsb2dnZXIgPSBsb2dnZXIuZm9yU291cmNlKCdQbGF5ZXJDb250cm9sbGVyJyk7XHJcbiAgICB2YXIgbG9nRXJyb3IgPSBsb2dnZXIubG9nRXJyb3I7XHJcbiAgICB2YXIgbG9nU3VjY2VzcyA9IGxvZ2dlci5sb2dTdWNjZXNzO1xyXG5cclxuICAgIHZhciB2bSA9IHRoaXM7XHJcblxyXG4gICAgdm0ubXAzRmlsZSA9IG51bGw7XHJcbiAgICB2bS5vZ2dGaWxlID0gbnVsbDtcclxuICAgIHZtLmNkblByZWZpeCA9ICcnO1xyXG4gICAgdm0udG9nZ2xlUGxheWVyID0gdG9nZ2xlUGxheWVyO1xyXG4gICAgdm0udGl0bGUgPSAnJztcclxuICAgIHZtLmN1cnJlbnRCb29rID0gbnVsbDtcclxuXHJcbiAgICAkcm9vdFNjb3BlLnRvZ2dsZVBsYXllciA9IHZtLnRvZ2dsZVBsYXllcjtcclxuXHJcbiAgICBpbml0aWFsaXplKCk7XHJcblxyXG5cclxuICAgIC8qKiogaW1wbGVtZW50YXRpb24gKioqL1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvZ2dsZVBsYXllcihhdWRpb2Jvb2spIHtcclxuXHJcbiAgICAgICAgaWYgKCF2bS5jdXJyZW50Qm9vayB8fCB2bS5jdXJyZW50Qm9vay5hdWRpb0Jvb2tJZCAhPSBhdWRpb2Jvb2suYXVkaW9Cb29rSWQpIHtcclxuICAgICAgICAgICAgdm0ubXAzRmlsZSA9IGNkblByZWZpeCArICcvY29udGVudC9ib29rcy8nICsgYXVkaW9ib29rLmF1ZGlvQm9va0lkICsgJy9zYW1wbGUubXAzP3Q9JyArIGF1ZGlvYm9vay5yZWNvcmRWZXJzaW9uO1xyXG4gICAgICAgICAgICB2bS5vZ2dGaWxlID0gY2RuUHJlZml4ICsgJy9jb250ZW50L2Jvb2tzLycgKyBhdWRpb2Jvb2suYXVkaW9Cb29rSWQgKyAnL3NhbXBsZS5vZ2c/dD0nICsgYXVkaW9ib29rLnJlY29yZFZlcnNpb247XHJcbiAgICAgICAgICAgIHZtLmN1cnJlbnRCb29rID0gYXVkaW9ib29rO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdQcm9kdWN0Q2hvb3NlckNvbnRyb2xsZXInLFxyXG5bJ0NhcnRTZXJ2aWNlJywgJ1VzZXJMaWJyYXJ5U2VydmljZScsICdsb2dnZXInLCAnJHVpYk1vZGFsSW5zdGFuY2UnLCAnZGF0YScsICckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsICckdWliTW9kYWwnLCAnQW5hbHl0aWNzU2VydmljZScsICdBTkFMWVRJQ1MnLCBmdW5jdGlvbiAoY2FydFNlcnZpY2UsIGxpYnJhcnlTZXJ2aWNlLCBsb2dnZXIsICRtb2RhbEluc3RhbmNlLCBkYXRhLCAkcm9vdFNjb3BlLCAkbG9jYXRpb24sICRtb2RhbCwgYW5hbHl0aWNzU2VydmljZSwgQU5BTFlUSUNTKSB7XHJcbiAgICBsb2dnZXIgPSBsb2dnZXIuZm9yU291cmNlKCdQcm9kdWN0Q2hvb3NlckNvbnRyb2xsZXInKTtcclxuICAgIHZhciBsb2dFcnJvciA9IGxvZ2dlci5sb2dFcnJvcjtcclxuICAgIHZhciBsb2dTdWNjZXNzID0gbG9nZ2VyLmxvZ1N1Y2Nlc3M7XHJcblxyXG4gICAgdmFyIHZtID0gdGhpcztcclxuICAgIHZtLmF1ZGlvYm9vayA9IGRhdGEuYXVkaW9ib29rO1xyXG4gICAgdm0udHJpYWxJdGVtcyA9IGRhdGEudHJpYWxJdGVtcztcclxuICAgIHZtLmNhbmNlbCA9IGNhbmNlbDtcclxuICAgIHZtLmdldFByaWNlID0gZ2V0UHJpY2U7XHJcbiAgICB2bS5nZXRGaXJzdFB1cmNoYXNlUHJpY2UgPSBnZXRGaXJzdFB1cmNoYXNlUHJpY2U7XHJcbiAgICB2bS5nZXRGaXJzdFB1cmNoYXNlRGlzY291bnRQZXJjZW50ID0gZ2V0Rmlyc3RQdXJjaGFzZURpc2NvdW50UGVyY2VudDtcclxuICAgIHZtLnRyYW5zaXRpb25JbmZvID0gbnVsbDtcclxuICAgIHZtLnB1cmNoYXNlID0gcHVyY2hhc2U7XHJcbiAgICB2bS5nZXRUcmlhbCA9IGdldFRyaWFsO1xyXG4gICAgdm0uY2hhbmdlVHJpYWwgPSBjaGFuZ2VUcmlhbDtcclxuICAgIHZtLnJldHVyblRyaWFsID0gcmV0dXJuVHJpYWw7XHJcbiAgICB2bS5oYXNVbmNvbmZpcmVtZWRPcmRlciA9IGZhbHNlO1xyXG4gICAgdm0uZXJyb3IgPSBudWxsO1xyXG4gICAgdm0uaW5jbHVkZXNTdWJzY3JpcHRpb24gPSBmYWxzZTtcclxuICAgIHZtLmdldFdpdGhTdWJzY3JpcHRpb24gPSBnZXRXaXRoU3Vic2NyaXB0aW9uO1xyXG5cclxuICAgIGluaXRpYWxpemUoKTtcclxuXHJcbiAgICAvKioqIGltcGxlbWVudGF0aW9uICoqKi9cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIGNhbGN1bGF0ZVRyYW5zaXRpb25JbmZvKCk7XHJcbiAgICAgICAgaWYgKHZtLmF1ZGlvYm9vaykge1xyXG4gICAgICAgICAgICB2bS5hdWRpb2Jvb2suY2FsY3VsYXRlVHJhbnNpdGlvbkluZm8gPSBjYWxjdWxhdGVUcmFuc2l0aW9uSW5mbztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlVHJhbnNpdGlvbkluZm8oKSB7XHJcbiAgICAgICAgdmFyIGluZm8gPSB7XHJcbiAgICAgICAgICAgIHB1cmNoYXNlOiB0cnVlLCAvL3RoZSBwdXJjaGFzZSBvcHRpb24gaXMgYWx3YXlzIGF2YWlsYWJsZS5cclxuICAgICAgICAgICAgZ2V0VHJpYWw6IGZhbHNlLFxyXG4gICAgICAgICAgICBjaGFuZ2VUcmlhbDogZmFsc2UsXHJcbiAgICAgICAgICAgIHJldHVyblRyaWFsOiBmYWxzZSxcclxuICAgICAgICAgICAgdHJpYWxUaXRsZTogJycsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodm0uYXVkaW9ib29rLnN1YnNjcmlwdGlvbkluZm9cclxuICAgICAgICAgICAgJiYgdm0uYXVkaW9ib29rLnN1YnNjcmlwdGlvbkluZm8ucHJvZHVjdHNcclxuICAgICAgICAgICAgJiYgdm0uYXVkaW9ib29rLnN1YnNjcmlwdGlvbkluZm8ucHJvZHVjdHMubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICAmJiB2bS5hdWRpb2Jvb2suc3Vic2NyaXB0aW9uSW5mby51c2VyTWVtYmVyc2hpcFN0YXR1cyAmJlxyXG4gICAgICAgICAgICAhdm0uYXVkaW9ib29rLnN1YnNjcmlwdGlvbkluZm8udXNlck1lbWJlcnNoaXBTdGF0dXMuaGFzQWN0aXZlU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIGFuYWx5dGljc1NlcnZpY2UudHJhY2tFdmVudChBTkFMWVRJQ1MuY2F0ZWdvcnkuVUksIEFOQUxZVElDUy51aUFjdGlvbi5TSE9XTiwgJ3N1YnNjcmlwdGlvbi1zaG93bicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm0uYXVkaW9ib29rLnByb2R1Y3RzLmZvckVhY2goZnVuY3Rpb24gKHByb2R1Y3QpIHtcclxuICAgICAgICAgICAgaWYgKHByb2R1Y3QuaXNTdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgICAgIHZtLmluY2x1ZGVzU3Vic2NyaXB0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXByb2R1Y3QucHVibGljYXRpb25UeXBlLmNvdW50YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkcm9vdFNjb3BlLmlzQXV0aGVudGljYXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9kdWN0Lmhhc1RyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uZ2V0VHJpYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbkluZm8gPSBwcm9kdWN0LnRyYW5zaXRpb25JbmZvO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodHJhbkluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9maXJzdCBjaGVjayBpZiB0aGUgdXNlciBoYXMgdGhpcyBib29rIGluIGhpcyBsaWJyYXJ5XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW9kZSA9IHRyYW5JbmZvLm93bmVyc2hpcE1vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2RlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgdGhlIHVzZXIgaGFzIGFscmVhZHkgcHVyY2hhc2VkIHRoaXMgYXVkaW9ib29rIHRoZW4gaXQgY2Fubm90IGJlIHB1cmNoYXNlZCBhZ2Fpbi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2xvc2UgdGhlIGRpYWxvZy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRtb2RhbEluc3RhbmNlLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobW9kZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIHRoaXMgYXVkaW9ib29rIGhhcyBhbHJlYWR5IGJlZW4gbG9hbmVkIHRvIHRoZSB1c2VyLCB0aGVuIGl0IGNhbiBvbmx5IGJlIHJldHVybmVkLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5yZXR1cm5UcmlhbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobW9kZSA9PSAyICYmIHByb2R1Y3QuaGFzVHJpYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgdGhlIGF1ZGlvYm9va3MgaXMgYWxyZWFkeSByZXR1cm5lZCBhbmQgY2FuIGJlIGxvYW5lZCBhZ2FpbiB0aGVuLCBzaG93IHRoZSBvcHRpb25zLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5nZXRUcmlhbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb2R1Y3QuaGFzVHJpYWwgJiYgdm0udHJpYWxJdGVtcyAmJiB2bS50cmlhbEl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zaG93IGNoYW5nZSBvcHRpb24gaWYgdGhpcyBib29rIGlzIGxvYW5hYmxlIHRoZSB1c2VyIGhhcyBhbHJlYWR5IGEgdHJpYWwgaXRlbSBpbiBoaXMgbGlicmFyeS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpYnJheUl0ZW0gPSB2bS50cmlhbEl0ZW1zWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvLmNoYW5nZVRyaWFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mby50cmlhbFRpdGxlID0gbGlicmF5SXRlbS5hdWRpb0Jvb2sudGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9kdWN0Lmhhc1RyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBib29rIGlzIG5vdCBpbiB0aGUgdXNlcidzIGxpYnJhcnkgYW5kIGhhcyB0cmlhbCBvcHRpb24gZW5hYmxlZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5nZXRUcmlhbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZtLnRyYW5zaXRpb25JbmZvID0gaW5mbztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjYW5jZWwoKSB7XHJcbiAgICAgICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHVyY2hhc2UocHJvZHVjdCkge1xyXG4gICAgICAgIGlmIChzaG93TG9naW4oeyBwcm9kdWN0SWQ6IHByb2R1Y3QucHJvZHVjdElkLCB0cmFuc2l0aW9uVHlwZTogMCB9KSkgcmV0dXJuO1xyXG4gICAgICAgIGFkZFRvQ2FydChwcm9kdWN0LnByb2R1Y3RJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VHJpYWwocHJvZHVjdCkge1xyXG4gICAgICAgIGlmIChzaG93TG9naW4oeyBwcm9kdWN0SWQ6IHByb2R1Y3QucHJvZHVjdElkLCB0cmFuc2l0aW9uVHlwZTogMSB9KSkgcmV0dXJuO1xyXG4gICAgICAgIGFkZFRvQ2FydChwcm9kdWN0LnByb2R1Y3RJZCwgMSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjaGFuZ2VUcmlhbChwcm9kdWN0KSB7XHJcbiAgICAgICAgaWYgKHNob3dMb2dpbigpKSByZXR1cm47XHJcblxyXG4gICAgICAgICRtb2RhbEluc3RhbmNlLmNsb3NlKCk7XHJcblxyXG4gICAgICAgIHZhciBkbGcgPSAkbW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2FwcC90ZW1wbGF0ZXMvYm9va190cmlhbF9jaGFuZ2UuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdCb29rVHJpYWxDaGFuZ2VDb250cm9sbGVyIGFzIHZtJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0LnByb2R1Y3RJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXVkaW9Cb29rOiB2bS5hdWRpb2Jvb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUcmlhbDogdm0udHJpYWxJdGVtcyAmJiB2bS50cmlhbEl0ZW1zLmxlbmd0aCA+IDAgPyB2bS50cmlhbEl0ZW1zWzBdIDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZXR1cm5UcmlhbChwcm9kdWN0KSB7XHJcbiAgICAgICAgaWYgKHNob3dMb2dpbigpKSByZXR1cm47XHJcblxyXG4gICAgICAgICRtb2RhbEluc3RhbmNlLmNsb3NlKCk7XHJcblxyXG4gICAgICAgIHZhciBkbGcgPSAkbW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2FwcC90ZW1wbGF0ZXMvYm9va190cmlhbF9yZXR1cm4uaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdCb29rVHJpYWxSZXR1cm5Db250cm9sbGVyIGFzIHZtJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0LnByb2R1Y3RJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXVkaW9Cb29rOiB2bS5hdWRpb2Jvb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFRvQ2FydChpZCwgdHJhbnNpdGlvblR5cGUpIHtcclxuICAgICAgICB2bS5lcnJvciA9IG51bGw7XHJcbiAgICAgICAgdm0uaGFzVW5jb25maXJlbWVkT3JkZXIgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKCF0cmFuc2l0aW9uVHlwZSkge1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uVHlwZSA9IDA7IC8vdGhlIGRlZmF1bHQgaXMgcHVyY2hhc2UuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhcnRTZXJ2aWNlLnNhdmUoe30sIHtcclxuICAgICAgICAgICAgcHJvZHVjdElkOiBpZCxcclxuICAgICAgICAgICAgbGlicmFyeVRyYW5zaXRpb25UeXBlOiB0cmFuc2l0aW9uVHlwZSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgY2FydFNlcnZpY2UuZ2V0Q2FydFRvdGFsQ291bnQoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5jYXJ0SXRlbXNDb3VudCA9IHJlc3VsdC5jb3VudDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRtb2RhbEluc3RhbmNlLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICRsb2NhdGlvbi51cmwoJy9jaGVja291dCcpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEFwcEVycm9ycy5nZXRNZXNzYWdlKGVycm9yKTtcclxuICAgICAgICAgICAgLy9sb2dFcnJvcihtZXNzYWdlLCBlcnJvciwgdHJ1ZSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9UT0RPOiBmaW5lIGEgYmV0dGVyIHdheS4gZG9uJ3QgdXNlIHN0cmluZyBwcm9jZXNzaW5nIGFzIGl0IG1heSBjaGFuZ2Ugb24gdGhlIHNlcnZlci5cclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuaW5kZXhPZign2LPZgdin2LHYtNin2Kog2YbYp9iq2YXYp9mFJykgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB2bS5oYXNVbmNvbmZpcmVtZWRPcmRlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdm0uZXJyb3IgPSBtZXNzYWdlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFByaWNlKHByb2R1Y3QpIHtcclxuICAgICAgICBpZiAocHJvZHVjdCkge1xyXG4gICAgICAgICAgICAvL3JldHVybiBwcm9kdWN0LnByaWNlIC8gKDEgKyB2bS5hdWRpb2Jvb2sudmF0KSAvIDEwLjA7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9kdWN0LnByaWNlIC8gMTAuMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Rmlyc3RQdXJjaGFzZVByaWNlKHByb2R1Y3QpIHtcclxuICAgICAgICBpZiAocHJvZHVjdCAmJiBwcm9kdWN0LmZpcnN0VGltZU9mZmVySW5mbyAmJiBwcm9kdWN0LmZpcnN0VGltZU9mZmVySW5mby5hcHBsaWNhYmxlKSB7XHJcbiAgICAgICAgICAgIHZhciBkaXNjb3VudFZhbHVlID0gTWF0aC5taW4ocHJvZHVjdC5wcmljZSAqIHByb2R1Y3QuZmlyc3RUaW1lT2ZmZXJJbmZvLmRpc2NvdW50UGVyY2VudGFnZVZhbHVlLCBwcm9kdWN0LmZpcnN0VGltZU9mZmVySW5mby5tYXhEaXNjb3VudEFtb3VudCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKHByb2R1Y3QucHJpY2UgLSBkaXNjb3VudFZhbHVlKSAvIDEwLjA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwcm9kdWN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9kdWN0LnByaWNlIC8gMTAuMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Rmlyc3RQdXJjaGFzZURpc2NvdW50UGVyY2VudChwcm9kdWN0KSB7XHJcbiAgICAgICAgaWYgKHByb2R1Y3QgJiYgcHJvZHVjdC5maXJzdFRpbWVPZmZlckluZm8gJiYgcHJvZHVjdC5maXJzdFRpbWVPZmZlckluZm8uYXBwbGljYWJsZSkge1xyXG4gICAgICAgICAgICB2YXIgZGlzY291bnRWYWx1ZSA9IE1hdGgubWluKHByb2R1Y3QucHJpY2UgKiBwcm9kdWN0LmZpcnN0VGltZU9mZmVySW5mby5kaXNjb3VudFBlcmNlbnRhZ2VWYWx1ZSwgcHJvZHVjdC5maXJzdFRpbWVPZmZlckluZm8ubWF4RGlzY291bnRBbW91bnQpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRpc2NvdW50VmFsdWUgLyBwcm9kdWN0LnByaWNlICogMTAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2hvd0xvZ2luKGRhdGEpIHtcclxuICAgICAgICBpZiAoISRyb290U2NvcGUuaXNBdXRoZW50aWNhdGVkKSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUubG9naW4oZGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFdpdGhTdWJzY3JpcHRpb24ocHJvZHVjdCkge1xyXG4gICAgICAgIGlmIChzaG93TG9naW4oeyBwcm9kdWN0SWQ6IHByb2R1Y3QucHJvZHVjdElkLCB0cmFuc2l0aW9uVHlwZTogMCB9KSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdm0uYXVkaW9ib29rLnN1YnNjcmlwdGlvbkluZm8udXNlck1lbWJlcnNoaXBTdGF0dXMuaGFzQWN0aXZlU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgICRtb2RhbEluc3RhbmNlLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICRsb2NhdGlvbi51cmwoJy9zdWJzY3JpcHRpb24/cj0vYXVkaW9ib29rLycgKyB2bS5hdWRpb2Jvb2suaWRlbnRpZmllciArICcvJyArIHZtLmF1ZGlvYm9vay5zbHVnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWRkVG9DYXJ0KHByb2R1Y3QucHJvZHVjdElkKTtcclxuICAgIH1cclxufV0pOyIsIlxyXG5hbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignUHJvZmlsZUNvbnRyb2xsZXInLCBbJ1VzZXJNYW5hZ2VyJywgJyRsb2NhdGlvbicsICdsb2dnZXInLCAnJHVpYk1vZGFsJywgJyRyb290U2NvcGUnLCBmdW5jdGlvbiAoJHVzZXJNYW5hZ2VyLCAkbG9jYXRpb24sIGxvZ2dlciwgJG1vZGFsLCAkcm9vdFNjb3BlKSB7XHJcbiAgICBsb2dnZXIgPSBsb2dnZXIuZm9yU291cmNlKCdQcm9maWxlQ29udHJvbGxlcicpO1xyXG5cclxuICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICB2bS5lcnJvcnMgPSBbXTtcclxuICAgIHZtLm9jY3VwYXRpb25zID0gW107XHJcbiAgICB2bS5zYXZlID0gc2F2ZTtcclxuICAgIHZtLnRvZGF5ID0gdG9kYXk7XHJcbiAgICB2bS5jbGVhciA9IGNsZWFyO1xyXG4gICAgdm0ub3BlblBlcnNpYW4gPSBvcGVuUGVyc2lhbjtcclxuICAgIHZtLmNoYW5nZUVtYWlsID0gY2hhbmdlRW1haWw7XHJcblxyXG4gICAgaW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XHJcblxyXG4gICAgICAgICR1c2VyTWFuYWdlci5nZXRQcm9maWxlKClcclxuICAgICAgICAgICAgICAgICAgICAuJHByb21pc2VcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmZpcnN0bmFtZSA9IHJlc3VsdC5maXJzdE5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmxhc3RuYW1lID0gcmVzdWx0Lmxhc3ROYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5nZW5kZXIgPSByZXN1bHQuZ2VuZGVyICE9IG51bGwgPyByZXN1bHQuZ2VuZGVyLnRvU3RyaW5nKCkgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5iaXJ0aGRhdGUgPSByZXN1bHQuYmlydGhkYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLm1vYmlsZW5vID0gcmVzdWx0Lm1vYmlsZU5vO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5vY2N1cGF0aW9uID0gcmVzdWx0Lm9jY3VwYXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmVtYWlsID0gcmVzdWx0LmVtYWlsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5lcnJvcnMgPSBBcHBFcnJvcnMuZ2V0RXJyb3JzKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZ2V0T2NjdXBhdGlvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzYXZlKCkge1xyXG4gICAgICAgIHZtLmVycm9ycyA9IFtdO1xyXG4gICAgICAgICR1c2VyTWFuYWdlci5lZGl0UHJvZmlsZSh7IGZpcnN0bmFtZTogdm0uZmlyc3RuYW1lLCBsYXN0bmFtZTogdm0ubGFzdG5hbWUsIGdlbmRlcjogdm0uZ2VuZGVyLCBiaXJ0aGRheTogdm0uYmlydGhkYXRlLCBtb2JpbGVubzogdm0ubW9iaWxlbm8sIG9jY3VwYXRpb246IHZtLm9jY3VwYXRpb24gfSlcclxuICAgICAgICAgICAgICAgICAgICAuJHByb21pc2VcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2dTdWNjZXNzKCfYp9i32YTYp9i52KfYqiDZvtix2YjZgdin24zZhCDYtNmF2Kcg2KjYsdmI2LIg2LHYs9in2YbbjCDar9ix2K/bjNivLicsIHJlc3VsdCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmVycm9ycyA9IEFwcEVycm9ycy5nZXRFcnJvcnMoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRPY2N1cGF0aW9ucygpIHtcclxuICAgICAgICAkdXNlck1hbmFnZXIuZ2V0T2NjdXBhdGlvbnMoKVxyXG4gICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgdm0ub2NjdXBhdGlvbnMgPSByZXN1bHQ7XHJcbiAgICAgICB9KVxyXG4gICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgIHZhciBtZXNzYWdlID0gQXBwRXJyb3JzLmdldE1lc3NhZ2UoZXJyb3IpO1xyXG4gICAgICAgICAgIGxvZ0Vycm9yKG1lc3NhZ2UsIGVycm9yLCB0cnVlKTtcclxuICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vcGVyc2lhbiBkYXRlXHJcbiAgICBmdW5jdGlvbiB0b2RheSgpIHtcclxuICAgICAgICB2bS5iaXJ0aGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBjbGVhcigpIHtcclxuICAgICAgICB2bS5iaXJ0aGRhdGUgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuUGVyc2lhbigkZXZlbnQpIHtcclxuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIHZtLnBlcnNpYW5Jc09wZW4gPSB0cnVlO1xyXG4gICAgICAgIHZtLmdyZWdvcmlhbklzT3BlbiA9IGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBjaGFuZ2VFbWFpbCgpIHtcclxuICAgICAgICB2YXIgZGxnID0gJG1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9hcHAvdGVtcGxhdGVzL2NoYW5nZV9lbWFpbC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0NoYW5nZUVtYWlsQ29udHJvbGxlciBhcyB2bScsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGxnLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgJHVzZXJNYW5hZ2VyLmxvZ291dCgpO1xyXG4gICAgICAgICAgICAkbG9jYXRpb24udXJsKCcvJyk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUubG9naW4oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufV0pOyIsIlxyXG5hbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignUHJvZmlsZVNwZWNpYWxNZW1iZXJzaGlwQ29udHJvbGxlcicsIFsnVXNlck1hbmFnZXInLCAnJGxvY2F0aW9uJywgJ2xvZ2dlcicsICckdWliTW9kYWxJbnN0YW5jZScsIGZ1bmN0aW9uICgkdXNlck1hbmFnZXIsICRsb2NhdGlvbiwgbG9nZ2VyLCAkbW9kYWxJbnN0YW5jZSkge1xyXG4gICAgbG9nZ2VyID0gbG9nZ2VyLmZvclNvdXJjZSgnUHJvZmlsZVNwZWNpYWxNZW1iZXJzaGlwQ29udHJvbGxlcicpO1xyXG5cclxuICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICB2bS5lcnJvcnMgPSBbXTtcclxuICAgIHZtLmdlbmRlciA9IG51bGw7XHJcbiAgICB2bS5iaXJ0aGRhdGUgPSBudWxsO1xyXG4gICAgdm0ubW9iaWxlbm8gPSBudWxsO1xyXG4gICAgdm0ub2NjdXBhdGlvbiA9IG51bGw7XHJcbiAgICB2bS51cGRhdGUgPSB1cGRhdGU7XHJcbiAgICB2bS5jYW5jZWwgPSBjYW5jZWw7XHJcbiAgICB2bS50b2RheSA9IHRvZGF5O1xyXG4gICAgdm0uY2xlYXIgPSBjbGVhcjtcclxuICAgIHZtLm9wZW5QZXJzaWFuID0gb3BlblBlcnNpYW47XHJcbiAgICB2bS5kYXRlT3B0aW9ucyA9IHtcclxuICAgICAgICBzdGFydGluZ0RheTogNlxyXG4gICAgfTtcclxuICAgIHZtLmZvcm1hdHMgPSBbJ2RkLU1NTU0teXl5eScsICd5eXl5L01NL2RkJywgJ2RkLk1NLnl5eXknLCAnc2hvcnREYXRlJ107XHJcbiAgICB2bS5mb3JtYXQgPSB2bS5mb3JtYXRzWzFdO1xyXG4gICAgdm0ub2NjdXBhdGlvbnMgPSBbXTtcclxuXHJcbiAgICBpbml0aWFsaXplKCk7XHJcblxyXG4gICAgLy9pbXBsZW1lbnRhdGlvblxyXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICBnZXRQcm9maWxlKCk7XHJcbiAgICAgICAgZ2V0T2NjdXBhdGlvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRQcm9maWxlKCkge1xyXG4gICAgICAgICR1c2VyTWFuYWdlci5nZXRQcm9maWxlKClcclxuICAgICAgICAgICAgICAgICAgICAuJHByb21pc2VcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmZpcnN0bmFtZSA9IHJlc3VsdC5maXJzdE5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmxhc3RuYW1lID0gcmVzdWx0Lmxhc3ROYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5nZW5kZXIgPSByZXN1bHQuZ2VuZGVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5iaXJ0aGRhdGUgPSByZXN1bHQuYmlydGhkYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLm1vYmlsZW5vID0gcmVzdWx0Lm1vYmlsZU5vO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5vY2N1cGF0aW9uID0gcmVzdWx0Lm9jY3VwYXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmVycm9ycyA9IEFwcEVycm9ycy5nZXRFcnJvcnMoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcclxuICAgICAgICB2bS5lcnJvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgJHVzZXJNYW5hZ2VyLnVwZGF0ZVByb2ZpbGUoeyBmaXJzdE5hbWU6IHZtLmZpcnN0bmFtZSwgbGFzdE5hbWU6IHZtLmxhc3RuYW1lLCBnZW5kZXI6IHZtLmdlbmRlciwgYmlydGhkYXk6IHZtLmJpcnRoZGF0ZSwgbW9iaWxlbm86IHZtLm1vYmlsZW5vLCBvY2N1cGF0aW9uOiB2bS5vY2N1cGF0aW9uIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB2bS5lcnJvcnMgPSBBcHBFcnJvcnMuZ2V0RXJyb3JzKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGNhbmNlbCgpIHtcclxuICAgICAgICAkbW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRPY2N1cGF0aW9ucygpIHtcclxuICAgICAgICAkdXNlck1hbmFnZXIuZ2V0T2NjdXBhdGlvbnMoKVxyXG4gICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgdm0ub2NjdXBhdGlvbnMgPSByZXN1bHQ7XHJcbiAgICAgICB9KVxyXG4gICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgIHZhciBtZXNzYWdlID0gQXBwRXJyb3JzLmdldE1lc3NhZ2UoZXJyb3IpO1xyXG4gICAgICAgICAgIGxvZ0Vycm9yKG1lc3NhZ2UsIGVycm9yLCB0cnVlKTtcclxuICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vcGVyc2lhbiBkYXRlXHJcbiAgICBmdW5jdGlvbiB0b2RheSgpIHtcclxuICAgICAgICB2bS5iaXJ0aGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBjbGVhcigpIHtcclxuICAgICAgICB2bS5iaXJ0aGRhdGUgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuUGVyc2lhbigkZXZlbnQpIHtcclxuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIHZtLnBlcnNpYW5Jc09wZW4gPSB0cnVlO1xyXG4gICAgICAgIHZtLmdyZWdvcmlhbklzT3BlbiA9IGZhbHNlO1xyXG4gICAgfTtcclxufV0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignUHVyY2hhc2VIaXN0b3J5Q29udHJvbGxlcicsXHJcblsnT3JkZXJTZXJ2aWNlJywgJ2xvZ2dlcicsICckdWliTW9kYWwnLCAnJGxvY2F0aW9uJywgZnVuY3Rpb24gKG9yZGVyU2VydmljZSwgbG9nZ2VyLCAkbW9kYWwsICRsb2NhdGlvbikge1xyXG5cclxuICAgIGxvZ2dlciA9IGxvZ2dlci5mb3JTb3VyY2UoJ1B1cmNoYXNlSGlzdG9yeUNvbnRyb2xsZXInKTtcclxuICAgIHZhciBsb2dFcnJvciA9IGxvZ2dlci5sb2dFcnJvcjtcclxuICAgIHZhciBsb2dTdWNjZXNzID0gbG9nZ2VyLmxvZ1N1Y2Nlc3M7XHJcblxyXG4gICAgdmFyIHZtID0gdGhpcztcclxuICAgIHZtLnB1cmNoYXNlSGlzb3RyeSA9IG51bGw7XHJcbiAgICB2bS5wcm9jZXNzUGF5bWVudCA9IHByb2Nlc3NQYXltZW50O1xyXG4gICAgdm0uY2FuY2VsT3JkZXIgPSBjYW5jZWxPcmRlcjtcclxuICAgIHZtLmdldE9yZGVySXRlbXMgPSBnZXRPcmRlckl0ZW1zO1xyXG4gICAgdm0ub3JkZXJJdGVtc1RlbXBsYXRlID0gJyc7XHJcbiAgICB2bS5lcnJvcnMgPSBbXTtcclxuXHJcbiAgICBpbml0aWFsaXplKCk7XHJcblxyXG4gICAgLyoqKiBpbXBsZW1lbnRhdGlvbiAqKiovXHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuXHJcbiAgICAgICAgZ2V0UHVyY2hhc2VIaXN0b3J5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0UHVyY2hhc2VIaXN0b3J5KCkge1xyXG4gICAgICAgIG9yZGVyU2VydmljZS5nZXRQdXJjaGFzZUhpc3RvcnkoKVxyXG4gICAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgdm0ucHVyY2hhc2VIaXNvdHJ5ID0gcmVzdWx0O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEFwcEVycm9ycy5nZXRNZXNzYWdlKGVycm9yKTtcclxuICAgICAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHByb2Nlc3NQYXltZW50KG9yZGVySWQpIHtcclxuICAgICAgICB2bS5lcnJvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgb3JkZXJTZXJ2aWNlLnByb2Nlc3NQYXltZW50KHsgaWQ6IG9yZGVySWQgfSlcclxuICAgICAgICAuJHByb21pc2VcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gYW5ndWxhci5lbGVtZW50KHJlc3VsdC5mb3JtVGFnKTtcclxuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCcjcGF5bWVudCcpLmFwcGVuZChmb3JtKTtcclxuICAgICAgICAgICAgZm9ybS5zdWJtaXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBBcHBFcnJvcnMuZ2V0TWVzc2FnZShlcnJvcik7XHJcbiAgICAgICAgICAgIGxvZ0Vycm9yKG1lc3NhZ2UsIGVycm9yLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vVE9ETyA6IHNob3cgZXJyb3JzIGluc2lkZSBmb3JtIGluc3RlYWQgb2YgdG9hc3QuXHJcbiAgICAgICAgICAgIC8vdm0uZXJyb3JzID0gW107XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FuY2VsT3JkZXIob3JkZXIpIHtcclxuICAgICAgICB2YXIgZGxnID0gJG1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9hcHAvdGVtcGxhdGVzL29yZGVyX2NhbmNlbC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ09yZGVyQ2FuY2VsQ29udHJvbGxlciBhcyB2bScsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcmRlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkbGcucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBnZXRQdXJjaGFzZUhpc3RvcnkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRPcmRlckl0ZW1zKGluZGV4KSB7XHJcbiAgICAgICAgdmFyIG9yZGVyID0gdm0ucHVyY2hhc2VIaXNvdHJ5W2luZGV4XTtcclxuICAgICAgICBpZiAoIW9yZGVyIHx8IG9yZGVyLm9yZGVySXRlbXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvcmRlci50ZW1wbGF0ZSA9ICcvYXBwL3RlbXBsYXRlcy9vcmRlcl9pdGVtcy5odG1sJztcclxuXHJcbiAgICAgICAgb3JkZXJTZXJ2aWNlLmdldE9yZGVySXRlbXMoeyBpZDogb3JkZXIub3JkZXJJZCB9KVxyXG4gICAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgb3JkZXIub3JkZXJJdGVtcyA9IHJlc3VsdDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBBcHBFcnJvcnMuZ2V0TWVzc2FnZShlcnJvcik7XHJcbiAgICAgICAgICAgIGxvZ0Vycm9yKG1lc3NhZ2UsIGVycm9yLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufV0pO1xyXG5cclxuXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgICAgICAuY29udHJvbGxlcignUmVkZWVtQ29udHJvbGxlcicsIFsnQ2FydFNlcnZpY2UnLCAnJGxvY2F0aW9uJywgJ2xvZ2dlcicsIGZ1bmN0aW9uIChjYXJ0U2VydmljZSwgJGxvY2F0aW9uLCBsb2dnZXIpIHtcclxuICAgICAgICAgICAgICAgIGxvZ2dlciA9IGxvZ2dlci5mb3JTb3VyY2UoJ1JlZGVlbUNvbnRyb2xsZXInKTtcclxuICAgICAgICAgICAgICAgIHZhciBsb2dFcnJvciA9IGxvZ2dlci5sb2dFcnJvcjtcclxuICAgICAgICAgICAgICAgIHZhciBsb2dTdWNjZXNzID0gbG9nZ2VyLmxvZ1N1Y2Nlc3M7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICB2bS5lcnJvcnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHZtLnN1Ym1pdFJlZGVlbSA9IHN1Ym1pdFJlZGVlbTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBzdWJtaXRSZWRlZW0oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uZXJyb3JzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgY2FydFNlcnZpY2UucmVkZWVtKHsgcmVkZWVtVGV4dDogdm0ucmVkZWVtVGV4dCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLnVybCgnL2NoZWNrb3V0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT0gNDAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5lcnJvcnMgPSBbJ9mE2LfZgdinINmF2LTYrti12KfYqiDYrdiz2KfYqCDaqdin2LHYqNix24wg2K7ZiNivINix2Kcg2YjYp9ix2K8g2YbZhdin24zbjNivLiddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0uZXJyb3JzID0gQXBwRXJyb3JzLmdldEVycm9ycyhlcnJvciwgXCLYrti32Kcg2K/YsSDYq9io2Kog2qnYryAuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ1Jlc2V0UGFzc3dvcmRDb250cm9sbGVyJywgWydVc2VyTWFuYWdlcicsICckbG9jYXRpb24nLCAnbG9nZ2VyJywgZnVuY3Rpb24gKCR1c2VyTWFuYWdlciwgJGxvY2F0aW9uLCBsb2dnZXIpIHtcclxuICAgIGxvZ2dlciA9IGxvZ2dlci5mb3JTb3VyY2UoJ1Jlc2V0UGFzc3dvcmRDb250cm9sbGVyJyk7XHJcblxyXG4gICAgdmFyIHZtID0gdGhpcztcclxuICAgIHZtLmVycm9ycyA9IFtdO1xyXG4gICAgLy92bS5zdWNjZWVkZWQgPSBmYWxzZTtcclxuICAgIHZtLmNvZGUgPSBudWxsO1xyXG4gICAgdm0ucmVzZXQgPSByZXNldDtcclxuXHJcbiAgICBpbml0aWFsaXplKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICB2YXIgY29kZSA9ICRsb2NhdGlvbi5zZWFyY2goKS5jb2RlO1xyXG5cclxuICAgICAgICBpZiAoIWNvZGUpIHtcclxuICAgICAgICAgICAgdm0uZXJyb3JzID0gQXBwRXJyb3JzLmdldEVycm9ycyhudWxsLCAn2qnYryDZgdi52KfZhCDYs9in2LLbjCDZhdi52KrYqNixINmG2YXbjCDYqNin2LTYry4nKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZtLmNvZGUgPSBjb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xyXG4gICAgICAgIHZtLmVycm9ycyA9IFtdO1xyXG4gICAgICAgIHZtLnN1Y2NlZWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICR1c2VyTWFuYWdlci5yZXNldFBhc3N3b3JkKHsgZW1haWw6IHZtLmVtYWlsLCBwYXNzd29yZDogdm0ucGFzc3dvcmQsIGNvbmZpcm06IHZtLmNvbmZpcm0sIGNvZGU6IHZtLmNvZGUgfSlcclxuICAgICAgICAgICAgICAgICAgICAuJHByb21pc2VcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5lcnJvcnMgPSBBcHBFcnJvcnMuZ2V0RXJyb3JzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nU3VjY2Vzcygn2qnZhNmF2Ycg2LnYqNmI2LEg2LTZhdinINio2Kcg2YXZiNmB2YLbjNiqINiq2LrbjNuM2LEg24zYp9mB2KouJywgcmVzdWx0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi51cmwoJy8nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5lcnJvcnMgPSBBcHBFcnJvcnMuZ2V0RXJyb3JzKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG59XSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdTdWJzY3JpcHRpb25Db250cm9sbGVyJywgWydTdWJzY3JpcHRpb25TZXJ2aWNlJywgJ0NhcnRTZXJ2aWNlJywgJ2xvZ2dlcicsICckbG9jYXRpb24nLCAnJHJvb3RTY29wZScsIGZ1bmN0aW9uIChzdWJzY3JpcHRpb25TZXJ2aWNlLCBjYXJ0U2VydmljZSwgbG9nZ2VyLCAkbG9jYXRpb24sICRyb290U2NvcGUpIHtcclxuICAgIGxvZ2dlciA9IGxvZ2dlci5mb3JTb3VyY2UoJ1N1YnNjcmlwdGlvbkNvbnRyb2xsZXInKTtcclxuICAgIHZhciBsb2dFcnJvciA9IGxvZ2dlci5sb2dFcnJvcjtcclxuICAgIHZhciBsb2dTdWNjZXNzID0gbG9nZ2VyLmxvZ1N1Y2Nlc3M7XHJcblxyXG4gICAgdmFyIHZtID0gdGhpcztcclxuICAgIHZtLmFkZFRvQ2FydCA9IGFkZFRvQ2FydDtcclxuICAgIHZtLmdldFN1YmNzcmlwdGlvblBsYW5zID0gZ2V0U3ViY3NyaXB0aW9uUGxhbnM7XHJcbiAgICB2bS5nZXRHcmlkU2l6ZSA9IGdldEdyaWRTaXplO1xyXG4gICAgdm0uZ2V0UGxhbk1lbnUgPSBnZXRQbGFuTWVudTtcclxuICAgIHZtLnBsYW5zID0gW107XHJcbiAgICB2bS5yZXR1cm5VcmwgPSBudWxsO1xyXG4gICAgdm0uaXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgIHZtLmd1aWRlID0gJyc7XHJcbiAgICBpbml0aWFsaXplKCk7XHJcblxyXG4gICAgLyoqKiBpbXBsZW1lbnRhdGlvbiAqKiovXHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICBnZXRTdWJjc3JpcHRpb25HdWlkZSgpO1xyXG4gICAgICAgIGdldFN1YmNzcmlwdGlvblBsYW5zKCk7XHJcbiAgICAgICAgdm0ucmV0dXJuVXJsID0gJGxvY2F0aW9uLnNlYXJjaCgpLnIgfHwgdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFRvQ2FydChwcm9kdWN0SWQpIHtcclxuICAgICAgICBhZGRUb0NhcnQocHJvZHVjdElkKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTdWJjc3JpcHRpb25QbGFucygpIHtcclxuICAgICAgICBzdWJzY3JpcHRpb25TZXJ2aWNlLmdldFN1YnNjcmlwdGlvblBsYW5zKClcclxuICAgICAgICAuJHByb21pc2VcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHZtLnBsYW5zID0gcmVzdWx0Lml0ZW1zO1xyXG4gICAgICAgICAgICB2bS5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBBcHBFcnJvcnMuZ2V0TWVzc2FnZShlcnJvcik7O1xyXG4gICAgICAgICAgICBsb2dFcnJvcihtZXNzYWdlLCBlcnJvciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHZtLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFN1YmNzcmlwdGlvbkd1aWRlKCkge1xyXG4gICAgICAgIHN1YnNjcmlwdGlvblNlcnZpY2UuZ2V0U3Vic2NyaXB0aW9uR3VpZGUoKVxyXG4gICAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgdm0uZ3VpZGUgPSByZXN1bHQuZ3VpZGU7XHJcbiAgICAgICAgICAgIHZtLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEFwcEVycm9ycy5nZXRNZXNzYWdlKGVycm9yKTs7XHJcbiAgICAgICAgICAgIGxvZ0Vycm9yKG1lc3NhZ2UsIGVycm9yLCB0cnVlKTtcclxuICAgICAgICAgICAgdm0uaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkVG9DYXJ0KGlkKSB7XHJcbiAgICAgICAgY2FydFNlcnZpY2Uuc2F2ZSh7fSwge1xyXG4gICAgICAgICAgICBwcm9kdWN0SWQ6IGlkLFxyXG4gICAgICAgICAgICBsaWJyYXJ5VHJhbnNpdGlvblR5cGU6IDAsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuJHByb21pc2VcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGNhcnRTZXJ2aWNlLmdldENhcnRUb3RhbENvdW50KGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuY2FydEl0ZW1zQ291bnQgPSByZXN1bHQuY291bnQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkbG9jYXRpb24udXJsKCcvY2hlY2tvdXQnKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBBcHBFcnJvcnMuZ2V0TWVzc2FnZShlcnJvcik7XHJcbiAgICAgICAgICAgIGxvZ0Vycm9yKG1lc3NhZ2UsIGVycm9yLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRHcmlkU2l6ZSgpIHtcclxuICAgICAgICBpZiAodm0ucGxhbnMubGVuZ3RoID09IDApIHJldHVybiAnJztcclxuICAgICAgICBlbHNlIGlmICh2bS5wbGFucy5sZW5ndGggJSA5ID09IDApIHJldHVybiAnNCc7XHJcbiAgICAgICAgZWxzZSBpZiAodm0ucGxhbnMubGVuZ3RoICUgNSA9PSAwKSByZXR1cm4gJzV0aCc7XHJcbiAgICAgICAgZWxzZSBpZiAodm0ucGxhbnMubGVuZ3RoICUgNCA9PSAwKSByZXR1cm4gJzMnO1xyXG4gICAgICAgIGVsc2UgaWYgKHZtLnBsYW5zLmxlbmd0aCAlIDMgPT0gMCkgcmV0dXJuICc0JztcclxuICAgICAgICBlbHNlIGlmICh2bS5wbGFucy5sZW5ndGggJSAyID09IDApIHJldHVybiAnNic7XHJcbiAgICAgICAgZWxzZSBpZiAodm0ucGxhbnMubGVuZ3RoID09IDEpIHJldHVybiAnMTInO1xyXG4gICAgICAgIGVsc2UgaWYgKHZtLnBsYW5zLmxlbmd0aCA9PSA3KSByZXR1cm4gJzQnO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuICczJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRQbGFuTWVudShzZWxlY3RlZFBsYW4pIHtcclxuICAgICAgICB2YXIgcGxhbk1lbnUgPSBbXTtcclxuICAgICAgICB2bS5wbGFucy5mb3JFYWNoKGZ1bmN0aW9uIChwbGFuKSB7XHJcbiAgICAgICAgICAgIGlmIChwbGFuLmlkZW50aWZpZXIgIT0gc2VsZWN0ZWRQbGFuKSB7XHJcbiAgICAgICAgICAgICAgICBwbGFuTWVudS5wdXNoKHBsYW4uaWRlbnRpZmllcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBsYW5NZW51LnNvcnQoKS5qb2luKCk7XHJcbiAgICB9XHJcbn1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignU3Vic2NyaXB0aW9uSGlzdG9yeUNvbnRyb2xsZXInLFxyXG5bJ1N1YnNjcmlwdGlvblNlcnZpY2UnLCAnbG9nZ2VyJywgJyR1aWJNb2RhbCcsICckbG9jYXRpb24nLCBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uU2VydmljZSwgbG9nZ2VyLCAkbW9kYWwsICRsb2NhdGlvbikge1xyXG5cclxuICAgIGxvZ2dlciA9IGxvZ2dlci5mb3JTb3VyY2UoJ1N1YnNjcmlwdGlvbkhpc3RvcnlDb250cm9sbGVyJyk7XHJcbiAgICB2YXIgbG9nRXJyb3IgPSBsb2dnZXIubG9nRXJyb3I7XHJcbiAgICB2YXIgbG9nU3VjY2VzcyA9IGxvZ2dlci5sb2dTdWNjZXNzO1xyXG5cclxuICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICB2bS5zdWJzY3JpcHRpb25IaXN0b3J5ID0gbnVsbDtcclxuICAgIHZtLmVycm9ycyA9IFtdO1xyXG4gICAgdm0uY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgIGluaXRpYWxpemUoKTtcclxuXHJcbiAgICAvKioqIGltcGxlbWVudGF0aW9uICoqKi9cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG5cclxuICAgICAgICBnZXRTdWJzY3JpcHRpb25IaXN0b3J5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U3Vic2NyaXB0aW9uSGlzdG9yeSgpIHtcclxuICAgICAgICBzdWJzY3JpcHRpb25TZXJ2aWNlLmdldFN1YnNjcmlwdGlvbkhpc3RvcnkoKVxyXG4gICAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgdm0uc3Vic2NyaXB0aW9uSGlzdG9yeSA9IHJlc3VsdDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBBcHBFcnJvcnMuZ2V0TWVzc2FnZShlcnJvcik7XHJcbiAgICAgICAgICAgIGxvZ0Vycm9yKG1lc3NhZ2UsIGVycm9yLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufV0pO1xyXG5cclxuXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdUb3RhbFNlYXJjaENvbnRyb2xsZXInLFxyXG5bJ0NhdGFsb2dTZXJ2aWNlJywgJ2xvZ2dlcicsICckcm91dGVQYXJhbXMnLCAnJGFuYWx5dGljcycsIGZ1bmN0aW9uIChjYXRhbG9nU2VydmljZSwgbG9nZ2VyLCAkcm91dGVQYXJhbXMsICRhbmFseXRpY3MpIHtcclxuICAgIGxvZ2dlciA9IGxvZ2dlci5mb3JTb3VyY2UoJ1RvdGFsU2VhcmNoQ29udHJvbGxlcicpO1xyXG4gICAgdmFyIGxvZ0Vycm9yID0gbG9nZ2VyLmxvZ0Vycm9yO1xyXG4gICAgdmFyIGxvZ1N1Y2Nlc3MgPSBsb2dnZXIubG9nU3VjY2VzcztcclxuXHJcbiAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgdm0uYnVzeSA9IGZhbHNlO1xyXG4gICAgdm0uY2F0YWxvZyA9IG51bGw7XHJcbiAgICB2bS5oYXNSZXN1bHQgPSBmYWxzZTtcclxuICAgIHZtLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICB2bS5maWx0ZXJDcml0ZXJpYSA9IHtcclxuICAgICAgICBwYWdlTnVtYmVyOiAxLFxyXG4gICAgICAgIHBhZ2VTaXplOiAyNSxcclxuICAgICAgICB0b3RhbEl0ZW1zOiAwLFxyXG4gICAgfTtcclxuICAgIHZtLmxvYWRNb3JlID0gbG9hZE1vcmU7XHJcblxyXG4gICAgaW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgIC8qKiogaW1wbGVtZW50YXRpb24gKioqL1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgdmFyIGtleXdvcmQgPSAkcm91dGVQYXJhbXMua2V5d29yZDtcclxuICAgICAgICBpZiAoIWtleXdvcmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm0uZmlsdGVyQ3JpdGVyaWEua2V5d29yZCA9IGtleXdvcmQ7XHJcblxyXG4gICAgICAgIHNlYXJjaEF1ZGlvQm9va3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZWFyY2hBdWRpb0Jvb2tzKCkge1xyXG4gICAgICAgIHZtLmJ1c3kgPSB0cnVlO1xyXG5cclxuICAgICAgICBjYXRhbG9nU2VydmljZS5nZXRUb3RhbFNlYXJjaFJlc3VsdCh7XHJcbiAgICAgICAgICAgIGtleTogdm0uZmlsdGVyQ3JpdGVyaWEua2V5d29yZCxcclxuICAgICAgICAgICAgJHNraXA6ICh2bS5maWx0ZXJDcml0ZXJpYS5wYWdlTnVtYmVyIC0gMSkgKiB2bS5maWx0ZXJDcml0ZXJpYS5wYWdlU2l6ZSxcclxuICAgICAgICAgICAgJHRvcDogdm0uZmlsdGVyQ3JpdGVyaWEucGFnZVNpemUsXHJcbiAgICAgICAgICAgICRpbmxpbmVjb3VudDogJ2FsbHBhZ2VzJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtczogcmVzdWx0Lml0ZW1zLFxyXG4gICAgICAgICAgICAgICAgdG90YWxJdGVtczogcmVzdWx0LmNvdW50LFxyXG4gICAgICAgICAgICAgICAgdG90YWxQYWdlczogTWF0aC5jZWlsKHJlc3VsdC5jb3VudCAvIHZtLmZpbHRlckNyaXRlcmlhLnBhZ2VTaXplKSxcclxuICAgICAgICAgICAgICAgIHBhZ2U6IHZtLmZpbHRlckNyaXRlcmlhLnBhZ2VOdW1iZXJcclxuICAgICAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAodm0uY2F0YWxvZykge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5pdGVtcyA9IHZtLmNhdGFsb2cuaXRlbXMuY29uY2F0KGRhdGEuaXRlbXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2bS5jYXRhbG9nID0gZGF0YTtcclxuICAgICAgICAgICAgdm0uYnVzeSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdm0uaGFzUmVzdWx0ID0gdm0uY2F0YWxvZy50b3RhbEl0ZW1zID4gMDtcclxuXHJcbiAgICAgICAgICAgIGlmICghdm0uaGFzUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAvL2lmIHRoZXJlIGlzIG5vIHNlYXJjaCByZXN1bHQgc2hvdyB0aGUgdXNlciBzb21lIGNvbnRlbnQuXHJcbiAgICAgICAgICAgICAgICBnZXRDYXRhbG9nKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZtLmlzTG9hZGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBBcHBFcnJvcnMuZ2V0TWVzc2FnZShlcnJvcik7XHJcbiAgICAgICAgICAgIGxvZ0Vycm9yKG1lc3NhZ2UsIGVycm9yLCB0cnVlKTtcclxuICAgICAgICAgICAgdm0uaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh2bS5maWx0ZXJDcml0ZXJpYS5rZXl3b3JkLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgJGFuYWx5dGljcy5wYWdlVHJhY2soJy9zZWFyY2hfcmVzdWx0cy5odG1sP3Rlcm09JyArIHZtLmZpbHRlckNyaXRlcmlhLmtleXdvcmQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkTW9yZSgpIHtcclxuICAgICAgICBpZiAodm0uYnVzeSkgcmV0dXJuO1xyXG5cclxuICAgICAgICB2bS5maWx0ZXJDcml0ZXJpYS5wYWdlTnVtYmVyKys7XHJcbiAgICAgICAgc2VhcmNoQXVkaW9Cb29rcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldENhdGFsb2coKSB7XHJcbiAgICAgICAgY2F0YWxvZ1NlcnZpY2UuZ2V0Q2F0YWxvZyh7XHJcbiAgICAgICAgICAgIGFjdGlvbjogJ2Jlc3RzZWxsZXInLFxyXG4gICAgICAgICAgICAkdG9wOiA4LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgIC4kcHJvbWlzZVxyXG4gICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID1cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IHJlc3VsdC5pdGVtcyxcclxuICAgICAgICAgICAgICAgIHRvdGFsSXRlbXM6IHJlc3VsdC5pdGVtcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICB0b3RhbFBhZ2VzOiAxLFxyXG4gICAgICAgICAgICAgICAgcGFnZTogMVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdm0uY2F0YWxvZyA9IGRhdGE7XHJcbiAgICAgICAgIH0pXHJcbiAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gQXBwRXJyb3JzLmdldE1lc3NhZ2UoZXJyb3IpO1xyXG4gICAgICAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgICB9KTtcclxuICAgIH1cclxufV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdUcmlhbEFncmVlbWVudFdpemFyZENvbnRyb2xsZXInLFxyXG5bJ0NhcnRTZXJ2aWNlJywgJ2xvZ2dlcicsICckdWliTW9kYWxJbnN0YW5jZScsICdkYXRhJywgZnVuY3Rpb24gKGNhcnRTZXJ2aWNlLCBsb2dnZXIsICRtb2RhbEluc3RhbmNlLCBkYXRhKSB7XHJcbiAgICBsb2dnZXIgPSBsb2dnZXIuZm9yU291cmNlKCdUcmlhbEFncmVlbWVudFdpemFyZENvbnRyb2xsZXInKTtcclxuICAgIHZhciBsb2dFcnJvciA9IGxvZ2dlci5sb2dFcnJvcjtcclxuICAgIHZhciBsb2dTdWNjZXNzID0gbG9nZ2VyLmxvZ1N1Y2Nlc3M7XHJcblxyXG4gICAgdmFyIHZtID0gdGhpcztcclxuICAgIHZtLmFncmVlbWVudCA9IGRhdGE7XHJcbiAgICB2bS5vayA9IG9rO1xyXG4gICAgdm0uY2FuY2VsID0gY2FuY2VsO1xyXG4gICAgdm0uY3VycmVudFN0ZXAgPSAxO1xyXG5cclxuICAgIC8qKiogaW1wbGVtZW50YXRpb24gKioqL1xyXG5cclxuICAgIGZ1bmN0aW9uIG9rKCkge1xyXG5cclxuICAgICAgICBpZiAodm0uYWdyZWVtZW50Lmxlbmd0aCAhPSB2bS5jdXJyZW50U3RlcCkge1xyXG4gICAgICAgICAgICB2bS5jdXJyZW50U3RlcCA9IHZtLmN1cnJlbnRTdGVwICsgMTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm0uY3VycmVudFN0ZXAgPSB2bS5jdXJyZW50U3RlcCArIDE7XHJcbiAgICAgICAgY2FydFNlcnZpY2UuYWNjZXB0TWVtYmVyc2hpcCgpXHJcbiAgICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEFwcEVycm9ycy5nZXRNZXNzYWdlKGVycm9yKTtcclxuICAgICAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNhbmNlbCgpIHtcclxuICAgICAgICAkbW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgIH1cclxufV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdVc2VyQ29udHJvbGxlcicsIFsnJGxvY2F0aW9uJywgJyRzY29wZScsIGZ1bmN0aW9uICgkbG9jYXRpb24sICRzY29wZSkge1xyXG4gICAgdmFyIHZtID0gdGhpcztcclxuICAgIHZtLnRhYnMgPSBbXTtcclxuICAgIHZtLnNlbGVjdFRhYiA9IHNlbGVjdFRhYjtcclxuICAgIHZtLmN1cnJlbnRQYWdlID0gbnVsbDtcclxuICAgIHZtLmFjdGl2ZUluZGV4ID0gMDtcclxuICAgICRzY29wZS5waWxscyA9ICdwaWxscyc7XHJcblxyXG4gICAgaW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgIC8qKiogaW1wbGVtZW50YXRpb24gKioqL1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgdmFyIHBhZ2UgPSAoJGxvY2F0aW9uLnNlYXJjaCgpLnByb2ZpbGUgJiYgJ3Byb2ZpbGUnKSB8fCAoJGxvY2F0aW9uLnNlYXJjaCgpLnB1cmNoYXNlICYmICdwdXJjaGFzZScpIHx8ICgkbG9jYXRpb24uc2VhcmNoKCkubGlicmFyeSAmJiAnbGlicmFyeScpIHx8ICgkbG9jYXRpb24uc2VhcmNoKCkucGFzc3dvcmQgJiYgJ3Bhc3N3b3JkJykgfHwgKCRsb2NhdGlvbi5zZWFyY2goKS5zdWJzY3JpcHRpb24gJiYgJ3N1YnNjcmlwdGlvbicpIHx8ICdwcm9maWxlJztcclxuXHJcbiAgICAgICAgdm0udGFicyA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfYp9i32YTYp9i52KfYqiDaqdin2LHYqNixJyxcclxuICAgICAgICAgICAgICAgIGtleTogJ3Byb2ZpbGUnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICcvYXBwL3RlbXBsYXRlcy9wcm9maWxlLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgaXNMb2FkZWQ6IHBhZ2UgPT0gJ3Byb2ZpbGUnLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlOiBwYWdlID09ICdwcm9maWxlJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfaqdiq2KfYqNiu2KfZhtmHJyxcclxuICAgICAgICAgICAgICAgIGtleTogJ2xpYnJhcnknLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICcvYXBwL3RlbXBsYXRlcy91c2VyX2xpYnJhcnkuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBpc0xvYWRlZDogcGFnZSA9PSAnbGlicmFyeScsXHJcbiAgICAgICAgICAgICAgICBhY3RpdmU6IHBhZ2UgPT0gJ2xpYnJhcnknLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ9iq2KfYsduM2K7ahtmHINiu2LHbjNivJyxcclxuICAgICAgICAgICAgICAgIGtleTogJ3B1cmNoYXNlJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnL2FwcC90ZW1wbGF0ZXMvcHVyY2hhc2VfaGlzdG9yeS5odG1sJyxcclxuICAgICAgICAgICAgICAgIGlzTG9hZGVkOiBwYWdlID09ICdwdXJjaGFzZScsXHJcbiAgICAgICAgICAgICAgICBhY3RpdmU6IHBhZ2UgPT0gJ3B1cmNoYXNlJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfYp9i02KrYsdin2qknLFxyXG4gICAgICAgICAgICAgICAga2V5OiAnc3Vic2NyaXB0aW9uJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnL2FwcC90ZW1wbGF0ZXMvc3Vic2NyaXB0aW9uX2hpc3RvcnkuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBpc0xvYWRlZDogcGFnZSA9PSAnc3Vic2NyaXB0aW9uJyxcclxuICAgICAgICAgICAgICAgIGFjdGl2ZTogcGFnZSA9PSAnc3Vic2NyaXB0aW9uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfYsdmF2LIg2LnYqNmI2LEnLFxyXG4gICAgICAgICAgICAgICAga2V5OiAncGFzc3dvcmQnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICcvYXBwL3RlbXBsYXRlcy9jaGFuZ2UtcGFzc3dvcmQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBpc0xvYWRlZDogcGFnZSA9PSAncGFzc3dvcmQnLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlOiBwYWdlID09ICdwYXNzd29yZCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICB2bS50YWJzLmZvckVhY2goZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICBpZiAodGFiLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgdm0uYWN0aXZlSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0YWIuaW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZWxlY3RUYWIodGFiKSB7XHJcbiAgICAgICAgdm0uYWN0aXZlSW5kZXggPSB0YWIuaW5kZXg7XHJcbiAgICAgICAgdm0uY3VycmVudFBhZ2UgPSB0YWIudGl0bGU7XHJcbiAgICAgICAgLy8kbG9jYXRpb24uJCRzZWFyY2ggPSB7fTtcclxuICAgICAgICAvLyRsb2NhdGlvbi5zZWFyY2godGFiLmtleSwgdHJ1ZSk7XHJcbiAgICB9XHJcbn1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignVXNlckxpYnJhcnlDb250cm9sbGVyJyxcclxuWydVc2VyTGlicmFyeVNlcnZpY2UnLCAnJHVpYk1vZGFsJywgJ2xvZ2dlcicsIGZ1bmN0aW9uICh1c2VyTGlicmFyeVNlcnZpY2UsICRtb2RhbCwgbG9nZ2VyKSB7XHJcblxyXG4gICAgbG9nZ2VyID0gbG9nZ2VyLmZvclNvdXJjZSgnVXNlckxpYnJhcnlDb250cm9sbGVyJyk7XHJcbiAgICB2YXIgbG9nRXJyb3IgPSBsb2dnZXIubG9nRXJyb3I7XHJcbiAgICB2YXIgbG9nU3VjY2VzcyA9IGxvZ2dlci5sb2dTdWNjZXNzO1xyXG5cclxuICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICB2bS5saWJyYXJ5ID0gbnVsbDtcclxuICAgIHZtLnNob3dEb3dsb2FkTGlzdCA9IHNob3dEb3dsb2FkTGlzdDtcclxuICAgIHZtLkFjY2Vzc19Nb2RlX0FwcCA9IDA7XHJcbiAgICB2bS5BY2Nlc3NfTW9kZV9XZWIgPSAxO1xyXG4gICAgdm0uaGFzRG93bmxvYWQgPSB0cnVlO1xyXG4gICAgdm0ucHVyY2hhc2VUcmlhbCA9IHB1cmNoYXNlVHJpYWw7XHJcbiAgICB2bS5yZXR1cm5UcmlhbCA9IHJldHVyblRyaWFsO1xyXG5cclxuICAgIGluaXRpYWxpemUoKTtcclxuXHJcbiAgICAvKioqIGltcGxlbWVudGF0aW9uICoqKi9cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG5cclxuICAgICAgICBnZXRVc2VyTGlicmFyeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFVzZXJMaWJyYXJ5KCkge1xyXG4gICAgICAgIHVzZXJMaWJyYXJ5U2VydmljZS5nZXRVc2VyTGlicmFyeSgpXHJcbiAgICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB2bS5saWJyYXJ5ID0gcmVzdWx0O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IEFwcEVycm9ycy5nZXRNZXNzYWdlKGVycm9yKTtcclxuICAgICAgICAgICAgbG9nRXJyb3IobWVzc2FnZSwgZXJyb3IsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dEb3dsb2FkTGlzdChkYXRhKSB7XHJcbiAgICAgICAgdmFyIGRsZyA9ICRtb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvYXBwL3RlbXBsYXRlcy9ib29rX2Rvd25sb2FkX2xpc3QuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdEb3dubG9hZExpc3RDb250cm9sbGVyIGFzIHZtJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwdXJjaGFzZVRyaWFsKGRhdGEpe1xyXG4gICAgICAgIHZhciBkbGcgPSAkbW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2FwcC90ZW1wbGF0ZXMvYm9va190cmlhbF9wdXJjaGFzZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0Jvb2tUcmlhbFB1cmNoYXNlQ29udHJvbGxlciBhcyB2bScsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmV0dXJuVHJpYWwoZGF0YSl7XHJcbiAgICAgICAgdmFyIGRsZyA9ICRtb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvYXBwL3RlbXBsYXRlcy9ib29rX3RyaWFsX3JldHVybi5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0Jvb2tUcmlhbFJldHVybkNvbnRyb2xsZXIgYXMgdm0nLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkbGcucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBnZXRVc2VyTGlicmFyeSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XSk7XHJcblxyXG5cclxuIiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdjdXN0b21GaWx0ZXJzJywgW10pO1xyXG5cclxuYXBwLmZpbHRlcigncGVyc2lhblRpbWUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlucHV0KSB7XHJcbiAgICAgICAgaWYgKCFpbnB1dCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwYXJ0cyA9IGlucHV0LnNwbGl0KCc6Jyk7XHJcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcImludmFsaWQgdGltZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGhvdXJzID0gcGFyc2VJbnQocGFydHNbMF0udHJpbSgpLCAxMCk7XHJcbiAgICAgICAgdmFyIG1pbnV0ZXMgPSBwYXJzZUludChwYXJ0c1sxXS50cmltKCksIDEwKTtcclxuXHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICcnXHJcbiAgICAgICAgaWYgKGhvdXJzID4gMCkge1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gaG91cnMudG9TdHJpbmcoKSArICcg2LPYp9i52KonO1xyXG4gICAgICAgICAgICBpZiAobWludXRlcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSAnINmIICc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1pbnV0ZXMgPiAwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSBtaW51dGVzLnRvU3RyaW5nKCkgKyAnINiv2YLbjNmC2YcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcbn0pO1xyXG5cclxuYXBwLmZpbHRlcignY2RuJywgZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBjZG5QcmVmaXggKyBpbnB1dDtcclxuICAgIH07XHJcbn0pO1xyXG5cclxuYXBwLmZpbHRlcigncGljTW9kZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoaW5wdXQsIG1vZGUpIHtcclxuICAgICAgICBwaWNtb2RlID0gbW9kZSB8fCAnc3RyZXRjaCc7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0ICsgJyZtb2RlPXN0cmV0Y2gnO1xyXG4gICAgfTtcclxufSk7XHJcblxyXG5hcHAuZmlsdGVyKCdyZWNvcmRWZXJzaW9uJywgZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpbnB1dCwgdCkge1xyXG4gICAgICAgIGlmICghdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW5wdXQgKyAnJnQ9JyArIHQ7XHJcbiAgICB9O1xyXG59KTtcclxuXHJcbmFwcC5maWx0ZXIoJ2h0bWwnLCBbJyRzY2UnLCBmdW5jdGlvbiAoJHNjZSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKGlucHV0KTtcclxuICAgIH07XHJcbn1dKTtcclxuXHJcbmFwcC5maWx0ZXIoJ2F1ZGlvYm9va1ByZWZpeCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gJ9qp2KrYp9ioINi12YjYqtuMICcgKyAoaW5wdXQgfHwgJycpO1xyXG4gICAgfTtcclxufSk7XHJcblxyXG5hcHAuZmlsdGVyKCd0aW1lU3ltYm9sJywgZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpbnB1dCkge1xyXG4gICAgICAgIHZhciBwYXJ0cyA9IGlucHV0LnNwbGl0KCc6Jyk7XHJcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA8IDMpIHJldHVybiBpbnB1dDtcclxuICAgICAgICByZXR1cm4gcGFydHNbMF0gKyAnOicgKyBwYXJ0c1sxXSArICdcXCc6JyArIHBhcnRzWzJdICsgJ1wiJztcclxuICAgIH07XHJcbn0pO1xyXG5cclxuYXBwLmZpbHRlcigncmV2ZXJzZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoaXRlbXMpIHtcclxuICAgICAgICByZXR1cm4gaXRlbXMuc2xpY2UoKS5yZXZlcnNlKCk7XHJcbiAgICB9O1xyXG59KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuZmFjdG9yeSgnQW5hbHl0aWNzU2VydmljZScsIFsnJGFuYWx5dGljcycsIGZ1bmN0aW9uICgkYW5hbHl0aWNzKSB7XHJcbiAgICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHJhY2tFdmVudDogdHJhY2tFdmVudCxcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gdHJhY2tFdmVudChjYXRlZ29yeSwgZXZlbnQsIGxhYmVsLCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciB0cmFja2luZ0RhdGEgPSB7IGNhdGVnb3J5OiBjYXRlZ29yeSB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChsYWJlbCkge1xyXG4gICAgICAgICAgICB0cmFja2luZ0RhdGEubGFiZWwgPSBsYWJlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodmFsdWUpe1xyXG4gICAgICAgICAgICB0cmFja2luZ0RhdGEudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJGFuYWx5dGljcy5ldmVudFRyYWNrKGV2ZW50LCB0cmFja2luZ0RhdGEpO1xyXG4gICAgfVxyXG59XSk7XHJcblxyXG5hbmd1bGFyXHJcbiAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgIC5jb25zdGFudCgnQU5BTFlUSUNTJywge1xyXG4gICAgICAgICAgY2F0ZWdvcnk6IHtcclxuICAgICAgICAgICAgICBVSTogJ1VJJyxcclxuICAgICAgICAgICAgICBVWDogJ1VYJyxcclxuICAgICAgICAgICAgICBTQU1QTEVfUExBWUJBQ0s6ICdCb29rUHJldmlldycsXHJcbiAgICAgICAgICAgICAgU09DSUFMOiAnU09DSUFMJyxcclxuICAgICAgICAgICAgICBQQUdFX1ZJRVc6ICdQQUdFX1ZJRVcnLFxyXG4gICAgICAgICAgICAgIC8vTkVUOiAnTkVUJyxcclxuICAgICAgICAgICAgICAvL0FQUDogJ0FQUCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdWlBY3Rpb246IHtcclxuICAgICAgICAgICAgICBDTElDSzogJ0NMSUNLJyxcclxuICAgICAgICAgICAgICBIT1ZFUjogJ0hPVkVSJyxcclxuICAgICAgICAgICAgICBTSE9XTjogJ1NIT1dOJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB1eEFjdGlvbjp7XHJcbiAgICAgICAgICAgICAgUkVHSVNURVJFRDogJ1JFR0lTVEVSRUQnLFxyXG4gICAgICAgICAgICAgIFJFR0lTVEVSQVRJT05fRkFJTFVSRTogJ1JFR0lTVEVSQVRJT05fRkFJTFVSRScsXHJcbiAgICAgICAgICAgICAgU0lHTkVEX0lOOiAnU0lHTkVEX0lOJyxcclxuICAgICAgICAgICAgICBTSUdOSU5fRkFJTFVSRTogJ1NJR05JTl9GQUlMVVJFJyxcclxuICAgICAgICAgICAgICBQVVJDSEFTRUQ6ICdQVVJDSEFTRUQnLFxyXG4gICAgICAgICAgICAgIFJFR0lTVFJBVElPTl9DT05GSVJNRUQ6ICdSRUdJU1RSQVRJT05fQ09ORklSTUVEJyxcclxuICAgICAgICAgICAgICBHT1RfU1VCU0NSSVBUSU9OOiAnR09UX1NVQlNDUklQVElPTicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc29jaWFsQWN0aW9uOntcclxuICAgICAgICAgICAgICBTSEFSRTogJ1NIQVJFJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzYW1wbGVQbGF5YmFja0FjdGlvbjp7XHJcbiAgICAgICAgICAgICAgUExBWTogJ1BsYXknLFxyXG4gICAgICAgICAgICAgIFBMQVlfSU5MSU5FOiAnUGxheS1JbmxpbmUnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHBhZ2VWaWV3QWN0aW9uOiB7XHJcbiAgICAgICAgICAgICAgVklFVzogJ1ZJRVcnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIC8vYXBwQWN0aW9uOiB7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAvL25ldEFjdGlvbjoge1xyXG5cclxuICAgICAgICAgIC8vfSxcclxuICAgICAgICAgIC8vc2NyZWVuOiB7XHJcblxyXG4gICAgICAgICAgLy99LFxyXG4gICAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuZmFjdG9yeSgnQXVkaW9Cb29rU2VydmljZScsXHJcbiAgICBbJyRyZXNvdXJjZScsIGZ1bmN0aW9uICgkcmVzb3VyY2UpIHtcclxuXHJcbiAgICAgICAgdmFyIG1hbmFnZXIgPSAkcmVzb3VyY2UoJy9hcGkvYXVkaW9ib29rcy86YWN0aW9uJywgbnVsbCwge1xyXG4gICAgICAgICAgICBnZXRGZWF0dXJlZFNsaWRlczogeyBtZXRob2Q6ICdHRVQnLCB1cmw6ICcvYXBpL3NsaWRlcycsIGlzQXJyYXk6IHRydWUgfSxcclxuICAgICAgICAgICAgZ2V0RmVhdHVyZWRBcnRpc3RzOiB7IG1ldGhvZDogJ0dFVCcsIHVybDogJy9hcGkvZmVhdHVyZWQtYXJ0aXN0cycsIGlzQXJyYXk6IHRydWUgfSxcclxuICAgICAgICAgICAgZ2V0TW9iaWxlSW50cm86IHsgbWV0aG9kOiAnR0VUJywgdXJsOiAnL2FwaS9zbGlkZXMvbW9iaWxlJ30sXHJcbiAgICAgICAgICAgIHJhdGU6IHsgbWV0aG9kOiAnUE9TVCcsIHBhcmFtczogeyBhY3Rpb246ICdyYXRlJyB9IH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hbmFnZXI7XHJcblxyXG4gICAgfV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5mYWN0b3J5KCdDYXJ0U2VydmljZScsXHJcbiAgICBbJyRyZXNvdXJjZScsIGZ1bmN0aW9uICgkcmVzb3VyY2UpIHtcclxuXHJcbiAgICAgICAgdmFyIG1hbmFnZXIgPSAkcmVzb3VyY2UoJy9hcGkvY2FydC86YWN0aW9uLzppZCcsIG51bGwsIHtcclxuICAgICAgICAgICAgJ3VwZGF0ZSc6IHsgbWV0aG9kOiAnUFVUJyB9LFxyXG4gICAgICAgICAgICBnZXRDYXJ0VG90YWxDb3VudDogeyBtZXRob2Q6ICdQT1NUJywgdXJsOiAnL2FwaS9jYXJ0L2NvdW50JyB9LFxyXG4gICAgICAgICAgICBnZXRDYXJ0SXRlbXM6IHsgbWV0aG9kOiAnUE9TVCcsIHVybDogJy9hcGkvY2FydC9pdGVtcyd9LFxyXG4gICAgICAgICAgICBjbGVhckNhcnQ6IHsgbWV0aG9kOiAnUE9TVCcsIHVybDogJy9hcGkvY2FydC9jbGVhcicgfSxcclxuICAgICAgICAgICAgcHJvY2Vzc09yZGVyOiB7IG1ldGhvZDogJ1BPU1QnLCB1cmw6ICcvYXBpL29yZGVycy9wcm9jZXNzJyB9LFxyXG4gICAgICAgICAgICBwcm9jZXNzT3JkZXJXaXRoTm9QYXltZW50OiB7IG1ldGhvZDogJ1BPU1QnLCB1cmw6ICcvYXBpL29yZGVycy9wcm9jZXNzLW5vLXBheW1lbnQnIH0sXHJcbiAgICAgICAgICAgIGFwcGx5RGlzY291bnQ6IHsgbWV0aG9kOiAnUE9TVCcsIHVybDogJy9hcGkvY2FydC9hcHBseWRpc2NvdW50JyB9LFxyXG4gICAgICAgICAgICByZW1vdmVEaXNjb3VudDogeyBtZXRob2Q6ICdQT1NUJywgdXJsOiAnL2FwaS9jYXJ0L3JlbW92ZWRpc2NvdW50LzppZCcgfSxcclxuICAgICAgICAgICAgZ2V0Q2hlY2tvdXRFbnRpdHk6IHsgbWV0aG9kOiAnUE9TVCcsIHVybDogJy9hcGkvY2FydC9jaGVja291dCd9LFxyXG4gICAgICAgICAgICBnZXRUcmlhbENvbmRpdGlvbjogeyBtZXRob2Q6ICdQT1NUJywgdXJsOiAnL2FwaS9jYXJ0L3RyaWFsLWNvbmRpdGlvbicgfSxcclxuICAgICAgICAgICAgYWNjZXB0TWVtYmVyc2hpcDogeyBtZXRob2Q6ICdQT1NUJywgdXJsOiAnL2FwaS9jYXJ0L2FjY2VwdC1tZW1iZXJzaGlwJyB9LFxyXG4gICAgICAgICAgICByZWRlZW06IHsgbWV0aG9kOiAnUE9TVCcsIHBhcmFtczogeyBhY3Rpb246ICdyZWRlZW0nLCBzZXJpYWxObzogJ0ByZWRlZW1UZXh0JyB9IH0sXHJcbiAgICAgICAgICAgIGdldFB1cmNoYXNlU3RhdHVzOiB7IG1ldGhvZDogJ1BPU1QnLCB1cmw6ICcvYXBpL2NhcnQvcHVyY2hhc2Utc3RhdHVzJyB9LFxyXG4gICAgICAgICAgICBnZXRBcHBsaWVkVm91Y2hlcnM6IHsgbWV0aG9kOiAnUE9TVCcsIHVybDogJy9hcGkvY2FydC92b3VjaGVycycsIGlzQXJyYXk6IHRydWUgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hbmFnZXI7XHJcbiAgICB9XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ0NhdGFsb2dTZXJ2aWNlJyxcclxuICAgIFsnJHJlc291cmNlJywgZnVuY3Rpb24gKCRyZXNvdXJjZSkge1xyXG5cclxuICAgICAgICB2YXIgbWFuYWdlciA9ICRyZXNvdXJjZSgnL2FwaS9hdWRpb2Jvb2tzLzphY3Rpb24vOmtleScsIG51bGwsIHtcclxuICAgICAgICAgICAgZ2V0Q2F0YWxvZzogeyBtZXRob2Q6ICdHRVQnIH0sXHJcbiAgICAgICAgICAgIGdldEF1ZGlvQm9va1N1bW1hcnk6IHsgbWV0aG9kOiAnR0VUJywgdXJsOiAnL2FwaS9hdWRpb2Jvb2tzLzppZC9zdW1tYXJ5JywgY2FjaGU6IHRydWUgfSxcclxuICAgICAgICAgICAgZ2V0QXVkaW9Cb29rRGV0YWlsOiB7IG1ldGhvZDogJ0dFVCcsIHVybDogJy9hcGkvYXVkaW9ib29rcy86aWQvZGV0YWlsMicsIGNhY2hlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIC8vZ2V0Q2hhcHRlcnM6IHsgbWV0aG9kOiAnR0VUJywgdXJsOiAnL2FwaS9jaGFwdGVycy86aWQnLCBpc0FycmF5OiB0cnVlIH0sXHJcbiAgICAgICAgICAgIGdldEdlbnJlczogeyBtZXRob2Q6ICdHRVQnLCB1cmw6ICcvYXBpL2dlbnJlcycsIGlzQXJyYXk6IHRydWUgfSxcclxuICAgICAgICAgICAgZ2V0VG90YWxTZWFyY2hSZXN1bHQ6IHsgbWV0aG9kOiAnR0VUJywgcGFyYW1zOiB7IGFjdGlvbjogJ3NlYXJjaCcsIGtleTogJ0BrZXknIH0gfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hbmFnZXI7XHJcblxyXG4gICAgfV0pO1xyXG5cclxuLy9mdW5jdGlvbiBnZXRTZWFyY2hSZXN1bHQodmFsKSB7XHJcbi8vICAgIHJldHVybiAkaHR0cCh7XHJcbi8vICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuLy8gICAgICAgIHVybDogJy9hcGkvY2F0YWxvZy9zZWFyY2gvb3ZlcnZpZXcnLFxyXG4vLyAgICAgICAgZGF0YTogJ1wiJyArIHZhbCArICdcIicsXHJcbi8vICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfVxyXG4vLyAgICB9KTtcclxuLy99IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ0NoYXB0ZXJTZXJ2aWNlJyxcclxuICAgIFsnJHJlc291cmNlJywgZnVuY3Rpb24gKCRyZXNvdXJjZSkge1xyXG5cclxuICAgICAgICB2YXIgbWFuYWdlciA9ICRyZXNvdXJjZSgnL2FwaS9jaGFwdGVycy86YWN0aW9uLzppZCcsIG51bGwsIHtcclxuICAgICAgICAgICAgZ2V0Q2hhcHRlcnM6IHsgbWV0aG9kOiAnR0VUJywgdXJsOiAnL2FwaS9jaGFwdGVycy86aWQnLCBpc0FycmF5OiB0cnVlIH0sXHJcbiAgICAgICAgICAgIGRvd25sb2FkOiB7IG1ldGhvZDogJ1BPU1QnLCB1cmw6ICcvYXBpL2Rvd25sb2FkLzppZCcsIHBhcmFtczoge2lkOidAaWQnfX0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBtYW5hZ2VyO1xyXG5cclxuICAgIH1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuZmFjdG9yeSgnQ29udGFjdFNlcnZpY2UnLFxyXG4gICAgWyckcmVzb3VyY2UnLCBmdW5jdGlvbiAoJHJlc291cmNlKSB7XHJcblxyXG4gICAgICAgIHZhciBtYW5hZ2VyID0gJHJlc291cmNlKCcvYXBpL2NvbnRhY3RzLzphY3Rpb24vOmlkJywgbnVsbCwge1xyXG4gICAgICAgICAgICBnZXRTdXBwb3J0VHlwZXM6IHsgbWV0aG9kOiAnR0VUJywgdXJsOiAnL2FwaS9jb250YWN0cy9zdXBwb3J0LXR5cGVzJywgaXNBcnJheTogdHJ1ZSB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBtYW5hZ2VyO1xyXG5cclxuICAgIH1dKTsiLCIvKioqXHJcblxyXG4gSmF5RGF0YSBFbnRpdHlNYW5hZ2VyRmFjdG9yeVxyXG5cclxuICoqKi9cclxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbiAgICAuZmFjdG9yeSgnRW50aXR5TWFuYWdlckZhY3RvcnknLCBbJyRkYXRhJywgJyRyb290U2NvcGUnLCAnVXNlck1hbmFnZXInLCBmdW5jdGlvbiAoJGRhdGEsICRyb290U2NvcGUsIHVzZXJNYW5hZ2VyKSB7XHJcbiAgICAgICAgdmFyIHNlcnZpY2VSb290ID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgJy8nO1xyXG4gICAgICAgIHZhciBzZXJ2aWNlTmFtZSA9IHNlcnZpY2VSb290ICsgJ29kYXRhLyc7XHJcbiAgICAgICAgdmFyIGNhY2hlID0ge307XHJcbiAgICAgICAgdmFyIGZhY3RvcnkgPSB7XHJcbiAgICAgICAgICAgIG5ld01hbmFnZXI6IG5ld01hbmFnZXIsXHJcbiAgICAgICAgICAgIHNlcnZpY2VOYW1lOiBzZXJ2aWNlTmFtZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBmYWN0b3J5O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBuZXdNYW5hZ2VyKCkge1xyXG4gICAgICAgICAgICB2YXIgbWFuYWdlciA9IG5ldyBlbnRpdHlNYW5hZ2VyKHNlcnZpY2VOYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hbmFnZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3VzZWQgdG8gZXhlY3V0ZSBqYXlkYXRhIHF1ZXJpZXMuXHJcbiAgICAgICAgZnVuY3Rpb24gZW50aXR5TWFuYWdlcihzZXJ2aWNlTmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZXhlY3V0ZVF1ZXJ5OiBleGVjdXRlUXVlcnksXHJcbiAgICAgICAgICAgICAgICBleGVjdXRlQWN0aW9uOiBleGVjdXRlQWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgc2F2ZUNoYW5nZXM6IHNhdmVDaGFuZ2VzLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy9nZXQgZGF0YSBjb250ZXh0LlxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRDb250ZXh0KCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGQgPSBuZXcgJGRhdGEuUHJvbWlzZUhhbmRsZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkZGF0YS5pbml0U2VydmljZShzZXJ2aWNlTmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlbmQgYXV0aG9yaXphdGlvbiB0b2tlbiBvbiBlYWNoIHJlcXVlc3QuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQucHJlcGFyZVJlcXVlc3QgPSBmdW5jdGlvbiAoY2ZnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZmdbMF0uaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gJ0JlYXJlciAnICsgdXNlck1hbmFnZXIuZ2V0QWNjZXNzVG9rZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZC5kZWZlcnJlZC5yZXNvbHZlKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkLmRlZmVycmVkLnJlamVjdC5hcHBseShkLmRlZmVycmVkLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBkLmdldFByb21pc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9leGVjdXRlIGVudGl0eSBzZXQgcXVlcmllcy5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZXhlY3V0ZVF1ZXJ5KHF1ZXJ5KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZCA9IG5ldyAkZGF0YS5Qcm9taXNlSGFuZGxlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGdldENvbnRleHQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5KGNvbnRleHQpLnRvTGl2ZUFycmF5KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLmRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lcnJvcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLmRlZmVycmVkLnJlamVjdC5hcHBseShkLmRlZmVycmVkLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5cclxuICAgICAgICAgICAgICAgIGZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGQuZGVmZXJyZWQucmVqZWN0LmFwcGx5KGQuZGVmZXJyZWQsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5nZXRQcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vZXhlY3V0ZSBvZGF0YSBhY3Rpb25zLlxyXG4gICAgICAgICAgICBmdW5jdGlvbiBleGVjdXRlQWN0aW9uKGFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGQgPSBuZXcgJGRhdGEuUHJvbWlzZUhhbmRsZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBnZXRDb250ZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oY29udGV4dClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLmRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISRyb290U2NvcGUuJCRwaGFzZSkgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQuZGVmZXJyZWQucmVqZWN0LmFwcGx5KGQuZGVmZXJyZWQsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZC5kZWZlcnJlZC5yZWplY3QuYXBwbHkoZC5kZWZlcnJlZCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISRyb290U2NvcGUuJCRwaGFzZSkgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBkLmdldFByb21pc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9zYXZlIGRhdGEgY29udGV4dCBjaGFuZ2VzLlxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzYXZlQ2hhbmdlcyhxdWVyeSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGQgPSBuZXcgJGRhdGEuUHJvbWlzZUhhbmRsZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBnZXRDb250ZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeShjb250ZXh0KS5zYXZlQ2hhbmdlcygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5kZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdGF0ZU1hbmFnZXIucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLmRlZmVycmVkLnJlamVjdC5hcHBseShkLmRlZmVycmVkLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5cclxuICAgICAgICAgICAgICAgIGZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGQuZGVmZXJyZWQucmVqZWN0LmFwcGx5KGQuZGVmZXJyZWQsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5nZXRQcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ0ZhcVNlcnZpY2UnLFxyXG4gICAgWyckcmVzb3VyY2UnLCBmdW5jdGlvbiAoJHJlc291cmNlKSB7XHJcblxyXG4gICAgICAgIHZhciBtYW5hZ2VyID0gJHJlc291cmNlKCcvYXBpL2ZhcXMvOmFjdGlvbi86aWQnLCBudWxsLCB7XHJcbiAgICAgICAgICAgIGdldEZhcXM6IHsgbWV0aG9kOiAnR0VUJywgcGFyYW1zOiB7IGFjdGlvbjogJ2l0ZW1zJyB9IH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBtYW5hZ2VyO1xyXG5cclxuICAgIH1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuZmFjdG9yeSgnRmVhdHVyZWRTbGlkZVNlcnZpY2UnLFxyXG4gICAgWydBdWRpb0Jvb2tTZXJ2aWNlJywgJ3ByZWxvYWRlcicsICckcScsICckcm9vdFNjb3BlJywgJyR3aW5kb3cnLCBmdW5jdGlvbiAoYXVkaW9Cb29rU2VydmljZSwgcHJlbG9hZGVyLCAkcSwgJHJvb3RTY29wZSwgJHdpbmRvdykge1xyXG5cclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgZ2V0RmVhdHVyZWRTbGlkZXM6IGdldEZlYXR1cmVkU2xpZGVzLFxyXG4gICAgICAgICAgICBnZXRTbGlkZUltYWdlczogZ2V0U2xpZGVJbWFnZXMsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RmVhdHVyZWRTbGlkZXMoKSB7XHJcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gYXVkaW9Cb29rU2VydmljZS5nZXRGZWF0dXJlZFNsaWRlcygpO1xyXG5cclxuICAgICAgICAgICAgcHJvbWlzZVxyXG4gICAgICAgICAgICAgICAgLiRwcm9taXNlXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGltYWdlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKGZ1bmN0aW9uIChzbGlkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZXMucHVzaChzbGlkZS5pbWFnZVVybCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVsb2FkZXIucHJlbG9hZEltYWdlcyhpbWFnZXMpLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVSZXNvbHZlKGltYWdlTG9jYXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gaGFuZGxlUmVqZWN0KGltYWdlTG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVOb3RpZnkoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRTbGlkZUltYWdlcygpIHtcclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAgICAgICAgIGF1ZGlvQm9va1NlcnZpY2UuZ2V0RmVhdHVyZWRTbGlkZXMoKVxyXG4gICAgICAgICAgICAuJHByb21pc2VcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW1hZ2VzID0gZ2V0SW1hZ2VzKHJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1c2VyQWdlbnQgPSAkd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ3ByZXJlbmRlcicpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWxvYWRlci5wcmVsb2FkSW1hZ2VzKGltYWdlcy5kZXNrdG9wLmNvbmNhdChpbWFnZXMubW9iaWxlKSkudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGhhbmRsZVJlc29sdmUoaW1hZ2VMb2NhdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGltYWdlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kbyBub3QgcHJlbG9hZCBpbWFnZXMgaWYgdGhlIHJlcXVlc3QgaXMgZnJvbSBwcmVyZW5kZXIgYWdlbnQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoaW1hZ2VzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0SW1hZ2VzKHNsaWRlcykge1xyXG4gICAgICAgICAgICB2YXIgaXNBdXRoZW50aWNhdGVkID0gJHJvb3RTY29wZS5pc0F1dGhlbnRpY2F0ZWQgfHwgZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBpc0ZpcnN0VGltZSA9ICEkcm9vdFNjb3BlLmNsaWVudEluZm8ubG9nZ2VkaW47XHJcblxyXG4gICAgICAgICAgICB2YXIgaW1hZ2VzID0geyBkZXNrdG9wOiBbXSwgbW9iaWxlOiBbXSB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHNsaWRlcykge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVzLmZvckVhY2goZnVuY3Rpb24gKHNsaWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlLnNsaWRlVHlwZSA9PSAwKSB7IC8vV2ViRGVza3RvcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2xpZGUudmlld01vZGUgPT0gMikgeyAgLy9ib3RoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZXMuZGVza3RvcC5wdXNoKHNsaWRlLmltYWdlVXJsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzbGlkZS52aWV3TW9kZSA9PSAxICYmIGlzQXV0aGVudGljYXRlZCkgeyAvL2F1dGhlbnRpY2F0ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlcy5kZXNrdG9wLnB1c2goc2xpZGUuaW1hZ2VVcmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNsaWRlLnZpZXdNb2RlID09IDAgJiYgIWlzQXV0aGVudGljYXRlZCkgeyAgIC8vbm90IGF1dGhlbnRpY2F0ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlcy5kZXNrdG9wLnB1c2goc2xpZGUuaW1hZ2VVcmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNsaWRlLnZpZXdNb2RlID09IDMgJiYgaXNGaXJzdFRpbWUpIHsgICAvL0ZpcnN0IFRpbWUgVmlzaXRvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VzLmRlc2t0b3AucHVzaChzbGlkZS5pbWFnZVVybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2xpZGUudmlld01vZGUgPT0gNCAmJiAkcm9vdFNjb3BlLnVzZXJBY3Rpdml0eUluZm8gJiYgJHJvb3RTY29wZS51c2VyQWN0aXZpdHlJbmZvLnB1cmNoYXNlU3RhdHVzLmhhc1B1cmNoYXNlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgISRyb290U2NvcGUudXNlckFjdGl2aXR5SW5mby5zdWJzY3JpcHRpb25TdGF0dXMuaGFzQWN0aXZlU3Vic2NyaXB0aW9uKSB7ICAgLy9TdWJzY3JpcHRpb24gc2xpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlcy5kZXNrdG9wLnB1c2goc2xpZGUuaW1hZ2VVcmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNsaWRlLnNsaWRlVHlwZSA9PSAxKSB7ICAgIC8vV2ViTW9iaWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlcy5tb2JpbGUucHVzaChzbGlkZS5pbWFnZVVybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBpbWFnZXM7XHJcbiAgICAgICAgfVxyXG4gICAgfV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5mYWN0b3J5KCdPcmRlclNlcnZpY2UnLFxyXG4gICAgWyckcmVzb3VyY2UnLCBmdW5jdGlvbiAoJHJlc291cmNlKSB7XHJcblxyXG4gICAgICAgIHZhciBtYW5hZ2VyID0gJHJlc291cmNlKCcvYXBpL29yZGVycy86YWN0aW9uLzppZCcsIG51bGwsIHtcclxuICAgICAgICAgICAgZ2V0T3JkZXJDb25maXJtSW5mbzogeyBtZXRob2Q6ICdQT1NUJywgcGFyYW1zOiB7IGFjdGlvbjogJ2luZm8nLCBpZDogJ0BpZCcgfSB9LFxyXG4gICAgICAgICAgICBnZXRQdXJjaGFzZUhpc3Rvcnk6IHsgbWV0aG9kOiAnUE9TVCcsIHBhcmFtczogeyBhY3Rpb246ICdoaXN0b3J5JyB9LCBpc0FycmF5OiB0cnVlIH0sXHJcbiAgICAgICAgICAgIGdldE9yZGVySXRlbXM6IHsgbWV0aG9kOiAnUE9TVCcsIHBhcmFtczogeyBhY3Rpb246ICdpdGVtcycsIGlkOiAnQGlkJyB9LCBpc0FycmF5OiB0cnVlIH0sXHJcbiAgICAgICAgICAgIHByb2Nlc3NQYXltZW50OiB7IG1ldGhvZDogJ1BPU1QnLCBwYXJhbXM6IHsgYWN0aW9uOiAncGF5bWVudCcsIGlkOiAnQGlkJyB9IH0sXHJcbiAgICAgICAgICAgIGNhbmNlbE9yZGVyOiB7IG1ldGhvZDogJ1BPU1QnLCBwYXJhbXM6IHsgYWN0aW9uOiAnY2FuY2VsJywgaWQ6ICdAaWQnIH0gfSxcclxuICAgICAgICAgICAgZ2V0VXNlckFjdGl2aXR5SW5mbzogeyBtZXRob2Q6ICdQT1NUJywgcGFyYW1zOiB7IGFjdGlvbjogJ3VzZXItYWN0aXZpdHktaW5mbycgfSB9LFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbWFuYWdlcjtcclxuXHJcbiAgICB9XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ1BhZ2VTZXJ2aWNlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHRpdGxlID0gJycsIGRlc2NyaXB0aW9uID0gJycsIGtleXdvcmRzID0gJycsIHVybCA9ICcnLCBpbWFnZSA9ICcnLCBhdWRpbyA9ICcnLCBzdGF0dXNDb2RlID0gJzIwMCc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldFRpdGxlOiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aXRsZTsgfSxcclxuICAgICAgICBzZXRUaXRsZTogZnVuY3Rpb24gKG5ld1RpdGxlKSB7IHRpdGxlID0gbmV3VGl0bGU7IH0sXHJcblxyXG4gICAgICAgIGdldERlc2NyaXB0aW9uOiBmdW5jdGlvbiAoKSB7IHJldHVybiBkZXNjcmlwdGlvbjsgfSxcclxuICAgICAgICBzZXREZXNjcmlwdGlvbjogZnVuY3Rpb24gKG5ld0Rlc2NyaXB0aW9uKSB7IGRlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247IH0sXHJcblxyXG4gICAgICAgIGdldEtleXdvcmRzOiBmdW5jdGlvbiAoKSB7IHJldHVybiBrZXl3b3JkczsgfSxcclxuICAgICAgICBzZXRLZXl3b3JkczogZnVuY3Rpb24gKG5ld0tleXdvcmRzKSB7IGtleXdvcmRzID0gbmV3S2V5d29yZHM7IH0sXHJcblxyXG4gICAgICAgIGdldFVybDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdXJsOyB9LFxyXG4gICAgICAgIHNldFVybDogZnVuY3Rpb24gKG5ld1VybCkgeyB1cmwgPSBuZXdVcmw7IH0sXHJcblxyXG4gICAgICAgIGdldEltYWdlOiBmdW5jdGlvbiAoKSB7IHJldHVybiBpbWFnZTsgfSxcclxuICAgICAgICBzZXRJbWFnZTogZnVuY3Rpb24gKG5ld0ltYWdlKSB7IGltYWdlID0gbmV3SW1hZ2U7IH0sXHJcblxyXG4gICAgICAgIGdldEF1ZGlvOiBmdW5jdGlvbiAoKSB7IHJldHVybiBhdWRpbzsgfSxcclxuICAgICAgICBzZXRBdWRpbzogZnVuY3Rpb24gKG5ld0F1ZGlvKSB7IGF1ZGlvID0gbmV3QXVkaW87IH0sXHJcblxyXG4gICAgICAgIGdldFN0YXR1c0NvZGU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN0YXR1c0NvZGU7IH0sXHJcbiAgICAgICAgc2V0U3RhdHVzQ29kZTogZnVuY3Rpb24gKG5ld1N0YXR1c0NvZGUpIHsgc3RhdHVzQ29kZSA9IG5ld1N0YXR1c0NvZGU7IH0sXHJcbiAgICB9O1xyXG59KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuZmFjdG9yeSgncHJlbG9hZGVyJyxcclxuICAgIFsnJHEnLCAnJHJvb3RTY29wZScsIGZ1bmN0aW9uICgkcSwgJHJvb3RTY29wZSkge1xyXG5cclxuICAgICAgICAvLyBJIG1hbmFnZSB0aGUgcHJlbG9hZGluZyBvZiBpbWFnZSBvYmplY3RzLiBBY2NlcHRzIGFuIGFycmF5IG9mIGltYWdlIFVSTHMuXHJcbiAgICAgICAgZnVuY3Rpb24gUHJlbG9hZGVyKGltYWdlTG9jYXRpb25zKSB7XHJcbiAgICAgICAgICAgIC8vIEkgYW0gdGhlIGltYWdlIFNSQyB2YWx1ZXMgdG8gcHJlbG9hZC5cclxuICAgICAgICAgICAgdGhpcy5pbWFnZUxvY2F0aW9ucyA9IGltYWdlTG9jYXRpb25zO1xyXG4gICAgICAgICAgICAvLyBBcyB0aGUgaW1hZ2VzIGxvYWQsIHdlJ2xsIG5lZWQgdG8ga2VlcCB0cmFjayBvZiB0aGUgbG9hZC9lcnJvclxyXG4gICAgICAgICAgICAvLyBjb3VudHMgd2hlbiBhbm5vdW5pbmcgdGhlIHByb2dyZXNzIG9uIHRoZSBsb2FkaW5nLlxyXG4gICAgICAgICAgICB0aGlzLmltYWdlQ291bnQgPSB0aGlzLmltYWdlTG9jYXRpb25zLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5sb2FkQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAvLyBJIGFtIHRoZSBwb3NzaWJsZSBzdGF0ZXMgdGhhdCB0aGUgcHJlbG9hZGVyIGNhbiBiZSBpbi5cclxuICAgICAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XHJcbiAgICAgICAgICAgICAgICBQRU5ESU5HOiAxLFxyXG4gICAgICAgICAgICAgICAgTE9BRElORzogMixcclxuICAgICAgICAgICAgICAgIFJFU09MVkVEOiAzLFxyXG4gICAgICAgICAgICAgICAgUkVKRUNURUQ6IDRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLy8gSSBrZWVwIHRyYWNrIG9mIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBwcmVsb2FkZXIuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLnN0YXRlcy5QRU5ESU5HO1xyXG4gICAgICAgICAgICAvLyBXaGVuIGxvYWRpbmcgdGhlIGltYWdlcywgYSBwcm9taXNlIHdpbGwgYmUgcmV0dXJuZWQgdG8gaW5kaWNhdGVcclxuICAgICAgICAgICAgLy8gd2hlbiB0aGUgbG9hZGluZyBoYXMgY29tcGxldGVkIChhbmQgLyBvciBwcm9ncmVzc2VkKS5cclxuICAgICAgICAgICAgdGhpcy5kZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvbWlzZSA9IHRoaXMuZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gLS0tXHJcbiAgICAgICAgLy8gU1RBVElDIE1FVEhPRFMuXHJcbiAgICAgICAgLy8gLS0tXHJcbiAgICAgICAgLy8gSSByZWxvYWQgdGhlIGdpdmVuIGltYWdlcyBbQXJyYXldIGFuZCByZXR1cm4gYSBwcm9taXNlLiBUaGUgcHJvbWlzZVxyXG4gICAgICAgIC8vIHdpbGwgYmUgcmVzb2x2ZWQgd2l0aCB0aGUgYXJyYXkgb2YgaW1hZ2UgbG9jYXRpb25zLlxyXG4gICAgICAgIFByZWxvYWRlci5wcmVsb2FkSW1hZ2VzID0gZnVuY3Rpb24gKGltYWdlTG9jYXRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciBwcmVsb2FkZXIgPSBuZXcgUHJlbG9hZGVyKGltYWdlTG9jYXRpb25zKTtcclxuICAgICAgICAgICAgcmV0dXJuIChwcmVsb2FkZXIubG9hZCgpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIC0tLVxyXG4gICAgICAgIC8vIElOU1RBTkNFIE1FVEhPRFMuXHJcbiAgICAgICAgLy8gLS0tXHJcbiAgICAgICAgUHJlbG9hZGVyLnByb3RvdHlwZSA9IHtcclxuICAgICAgICAgICAgLy8gQmVzdCBwcmFjdGljZSBmb3IgXCJpbnN0bmNlb2ZcIiBvcGVyYXRvci5cclxuICAgICAgICAgICAgY29uc3RydWN0b3I6IFByZWxvYWRlcixcclxuICAgICAgICAgICAgLy8gLS0tXHJcbiAgICAgICAgICAgIC8vIFBVQkxJQyBNRVRIT0RTLlxyXG4gICAgICAgICAgICAvLyAtLS1cclxuICAgICAgICAgICAgLy8gSSBkZXRlcm1pbmUgaWYgdGhlIHByZWxvYWRlciBoYXMgc3RhcnRlZCBsb2FkaW5nIGltYWdlcyB5ZXQuXHJcbiAgICAgICAgICAgIGlzSW5pdGlhdGVkOiBmdW5jdGlvbiBpc0luaXRpYXRlZCgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5zdGF0ZSAhPT0gdGhpcy5zdGF0ZXMuUEVORElORyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIEkgZGV0ZXJtaW5lIGlmIHRoZSBwcmVsb2FkZXIgaGFzIGZhaWxlZCB0byBsb2FkIGFsbCBvZiB0aGUgaW1hZ2VzLlxyXG4gICAgICAgICAgICBpc1JlamVjdGVkOiBmdW5jdGlvbiBpc1JlamVjdGVkKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLnN0YXRlID09PSB0aGlzLnN0YXRlcy5SRUpFQ1RFRCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIEkgZGV0ZXJtaW5lIGlmIHRoZSBwcmVsb2FkZXIgaGFzIHN1Y2Nlc3NmdWxseSBsb2FkZWQgYWxsIG9mIHRoZSBpbWFnZXMuXHJcbiAgICAgICAgICAgIGlzUmVzb2x2ZWQ6IGZ1bmN0aW9uIGlzUmVzb2x2ZWQoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuc3RhdGUgPT09IHRoaXMuc3RhdGVzLlJFU09MVkVEKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gSSBpbml0aWF0ZSB0aGUgcHJlbG9hZCBvZiB0aGUgaW1hZ2VzLiBSZXR1cm5zIGEgcHJvbWlzZS5cclxuICAgICAgICAgICAgbG9hZDogZnVuY3Rpb24gbG9hZCgpIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBpbWFnZXMgYXJlIGFscmVhZHkgbG9hZGluZywgcmV0dXJuIHRoZSBleGlzdGluZyBwcm9taXNlLlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJbml0aWF0ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5wcm9taXNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLnN0YXRlcy5MT0FESU5HO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAgOyBpIDwgdGhpcy5pbWFnZUNvdW50IDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkSW1hZ2VMb2NhdGlvbih0aGlzLmltYWdlTG9jYXRpb25zW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgZGVmZXJyZWQgcHJvbWlzZSBmb3IgdGhlIGxvYWQgZXZlbnQuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMucHJvbWlzZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIC0tLVxyXG4gICAgICAgICAgICAvLyBQUklWQVRFIE1FVEhPRFMuXHJcbiAgICAgICAgICAgIC8vIC0tLVxyXG4gICAgICAgICAgICAvLyBJIGhhbmRsZSB0aGUgbG9hZC1mYWlsdXJlIG9mIHRoZSBnaXZlbiBpbWFnZSBsb2NhdGlvbi5cclxuICAgICAgICAgICAgaGFuZGxlSW1hZ2VFcnJvcjogZnVuY3Rpb24gaGFuZGxlSW1hZ2VFcnJvcihpbWFnZUxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yQ291bnQrKztcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBwcmVsb2FkIGFjdGlvbiBoYXMgYWxyZWFkeSBmYWlsZWQsIGlnbm9yZSBmdXJ0aGVyIGFjdGlvbi5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzUmVqZWN0ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLnN0YXRlcy5SRUpFQ1RFRDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmZXJyZWQucmVqZWN0KGltYWdlTG9jYXRpb24pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBJIGhhbmRsZSB0aGUgbG9hZC1zdWNjZXNzIG9mIHRoZSBnaXZlbiBpbWFnZSBsb2NhdGlvbi5cclxuICAgICAgICAgICAgaGFuZGxlSW1hZ2VMb2FkOiBmdW5jdGlvbiBoYW5kbGVJbWFnZUxvYWQoaW1hZ2VMb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQ291bnQrKztcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBwcmVsb2FkIGFjdGlvbiBoYXMgYWxyZWFkeSBmYWlsZWQsIGlnbm9yZSBmdXJ0aGVyIGFjdGlvbi5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzUmVqZWN0ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIE5vdGlmeSB0aGUgcHJvZ3Jlc3Mgb2YgdGhlIG92ZXJhbGwgZGVmZXJyZWQuIFRoaXMgaXMgZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICAvLyB0aGFuIFJlc29sdmluZyB0aGUgZGVmZXJyZWQgLSB5b3UgY2FuIGNhbGwgbm90aWZ5IG1hbnkgdGltZXNcclxuICAgICAgICAgICAgICAgIC8vIGJlZm9yZSB0aGUgdWx0aW1hdGUgcmVzb2x1dGlvbiAob3IgcmVqZWN0aW9uKSBvZiB0aGUgZGVmZXJyZWQuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmVycmVkLm5vdGlmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudDogTWF0aC5jZWlsKHRoaXMubG9hZENvdW50IC8gdGhpcy5pbWFnZUNvdW50ICogMTAwKSxcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZUxvY2F0aW9uOiBpbWFnZUxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIElmIGFsbCBvZiB0aGUgaW1hZ2VzIGhhdmUgbG9hZGVkLCB3ZSBjYW4gcmVzb2x2ZSB0aGUgZGVmZXJyZWRcclxuICAgICAgICAgICAgICAgIC8vIHZhbHVlIHRoYXQgd2UgcmV0dXJuZWQgdG8gdGhlIGNhbGxpbmcgY29udGV4dC5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvYWRDb3VudCA9PT0gdGhpcy5pbWFnZUNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuc3RhdGVzLlJFU09MVkVEO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmZXJyZWQucmVzb2x2ZSh0aGlzLmltYWdlTG9jYXRpb25zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gSSBsb2FkIHRoZSBnaXZlbiBpbWFnZSBsb2NhdGlvbiBhbmQgdGhlbiB3aXJlIHRoZSBsb2FkIC8gZXJyb3JcclxuICAgICAgICAgICAgLy8gZXZlbnRzIGJhY2sgaW50byB0aGUgcHJlbG9hZGVyIGluc3RhbmNlLlxyXG4gICAgICAgICAgICAvLyAtLVxyXG4gICAgICAgICAgICAvLyBOT1RFOiBUaGUgbG9hZC9lcnJvciBldmVudHMgdHJpZ2dlciBhICRkaWdlc3QuXHJcbiAgICAgICAgICAgIGxvYWRJbWFnZUxvY2F0aW9uOiBmdW5jdGlvbiBsb2FkSW1hZ2VMb2NhdGlvbihpbWFnZUxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJlbG9hZGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIC8vIFdoZW4gaXQgY29tZXMgdG8gY3JlYXRpbmcgdGhlIGltYWdlIG9iamVjdCwgaXQgaXMgY3JpdGljYWwgdGhhdFxyXG4gICAgICAgICAgICAgICAgLy8gd2UgYmluZCB0aGUgZXZlbnQgaGFuZGxlcnMgQkVGT1JFIHdlIGFjdHVhbGx5IHNldCB0aGUgaW1hZ2VcclxuICAgICAgICAgICAgICAgIC8vIHNvdXJjZS4gRmFpbHVyZSB0byBkbyBzbyB3aWxsIHByZXZlbnQgdGhlIGV2ZW50cyBmcm9tIHByb3BlclxyXG4gICAgICAgICAgICAgICAgLy8gdHJpZ2dlcmluZyBpbiBzb21lIGJyb3dzZXJzLlxyXG4gICAgICAgICAgICAgICAgdmFyIGltYWdlID0gJChuZXcgSW1hZ2UoKSlcclxuICAgICAgICAgICAgICAgICAgICAubG9hZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSB0aGUgbG9hZCBldmVudCBpcyBhc3luY2hyb25vdXMsIHdlIGhhdmUgdG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRlbGwgQW5ndWxhckpTIHRoYXQgc29tZXRoaW5nIGNoYW5nZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZWxvYWRlci5oYW5kbGVJbWFnZUxvYWQoZXZlbnQudGFyZ2V0LnNyYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENsZWFuIHVwIG9iamVjdCByZWZlcmVuY2UgdG8gaGVscCB3aXRoIHRoZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnYXJiYWdlIGNvbGxlY3Rpb24gaW4gdGhlIGNsb3N1cmUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZWxvYWRlciA9IGltYWdlID0gZXZlbnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLmVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBsb2FkIGV2ZW50IGlzIGFzeW5jaHJvbm91cywgd2UgaGF2ZSB0b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGVsbCBBbmd1bGFySlMgdGhhdCBzb21ldGhpbmcgY2hhbmdlZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlbG9hZGVyLmhhbmRsZUltYWdlRXJyb3IoZXZlbnQudGFyZ2V0LnNyYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENsZWFuIHVwIG9iamVjdCByZWZlcmVuY2UgdG8gaGVscCB3aXRoIHRoZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnYXJiYWdlIGNvbGxlY3Rpb24gaW4gdGhlIGNsb3N1cmUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZWxvYWRlciA9IGltYWdlID0gZXZlbnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLnByb3AoXCJzcmNcIiwgaW1hZ2VMb2NhdGlvbilcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBmYWN0b3J5IGluc3RhbmNlLlxyXG4gICAgICAgIHJldHVybiAoUHJlbG9hZGVyKTtcclxuICAgIH1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAgICAgLmZhY3RvcnkoJ1JlZGVlbVNlcnZpY2UnLCBbJyRodHRwJywgJyRyZXNvdXJjZScsICckcm9vdFNjb3BlJywgZnVuY3Rpb24gKCRodHRwLCAkcmVzb3VyY2UsICRyb290U2NvcGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB2YXIgc2VydmljZSA9ICRyZXNvdXJjZSgnL2FwaS9zZXJpYWwvOmFjdGlvbicsIG51bGwsIHtcclxuICAgICAgICAgICAgICAgICAgICByZWRlZW06IHsgbWV0aG9kOiAnUE9TVCcsIHBhcmFtczogeyBhY3Rpb246ICdyZWRlZW0nLCBzZXJpYWxObzogJ0ByZWRlZW1UZXh0JyB9IH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcbiAgICAgICAgICAgIH1dKTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ1N1YnNjcmlwdGlvblNlcnZpY2UnLFxyXG4gICAgWyckcmVzb3VyY2UnLCBmdW5jdGlvbiAoJHJlc291cmNlKSB7XHJcblxyXG4gICAgICAgIHZhciBtYW5hZ2VyID0gJHJlc291cmNlKCcvYXBpL3N1YnNjcmlwdGlvbnMvOmFjdGlvbi86aWQnLCBudWxsLCB7XHJcbiAgICAgICAgICAgIGdldFN1YnNjcmlwdGlvblBsYW5zOiB7IG1ldGhvZDogJ0dFVCcsIHVybDogJy9hcGkvc3Vic2NyaXB0aW9ucy9wbGFucycgfSxcclxuICAgICAgICAgICAgZ2V0U3Vic2NyaXB0aW9uSGlzdG9yeTogeyBtZXRob2Q6ICdQT1NUJywgcGFyYW1zOiB7IGFjdGlvbjogJ2hpc3RvcnknIH0sIGlzQXJyYXk6IHRydWUgfSxcclxuICAgICAgICAgICAgZ2V0U3Vic2NyaXB0aW9uR3VpZGU6IHsgbWV0aG9kOiAnR0VUJywgdXJsOiAnL2FwaS9zZXR0aW5ncy9zdWJzY3JpcHRpb24tZ3VpZGUnIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBtYW5hZ2VyO1xyXG5cclxuICAgIH1dKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5mYWN0b3J5KCd1c2VyQWdlbnREZXRlY3RvcicsIHVzZXJBZ2VudERldGVjdG9yKTtcclxuXHJcbiAgICB1c2VyQWdlbnREZXRlY3Rvci4kaW5qZWN0ID0gWyckd2luZG93J107XHJcblxyXG4gICAgZnVuY3Rpb24gdXNlckFnZW50RGV0ZWN0b3IoJHdpbmRvdykge1xyXG4gICAgICAgIHZhciBzZXJ2aWNlID0ge1xyXG4gICAgICAgICAgICBpc0FuZHJvaWQ6IGlzQW5kcm9pZFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBpc0FuZHJvaWQoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdXNlckFnZW50ID0gJHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xyXG5cclxuICAgICAgICAgICAgaWYgKHVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ1VzZXJJbnRlcmVzdFNlcnZpY2UnLFxyXG4gICAgWyckcmVzb3VyY2UnLCBmdW5jdGlvbiAoJHJlc291cmNlKSB7XHJcblxyXG4gICAgICAgIHZhciBtYW5hZ2VyID0gJHJlc291cmNlKCcvYXBpL3VzZXJpbnRlcmVzdHMnLCBudWxsLCB7XHJcbiAgICAgICAgICAgICd1cGRhdGUnOiB7IG1ldGhvZDogJ1BVVCcgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hbmFnZXI7XHJcbiAgICB9XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ1VzZXJMaWJyYXJ5U2VydmljZScsXHJcbiAgICBbJyRyZXNvdXJjZScsIGZ1bmN0aW9uICgkcmVzb3VyY2UpIHtcclxuXHJcbiAgICAgICAgdmFyIG1hbmFnZXIgPSAkcmVzb3VyY2UoJy9hcGkvbGlicmFyeScsIG51bGwsIHtcclxuICAgICAgICAgICAgZ2V0VXNlckxpYnJhcnk6IHsgbWV0aG9kOiAnUE9TVCcsIGlzQXJyYXk6IHRydWUgfSxcclxuICAgICAgICAgICAgdHJpYWxCb29rOiB7IG1ldGhvZDogJ1BPU1QnLCB1cmw6ICcvYXBpL2xpYnJhcnkvdHJpYWwvOnByb2R1Y3RJZC86bWFya2V0SWQnLCBwYXJhbXM6IHsgcHJvZHVjdElkOiAnQHByb2R1Y3RJZCcsIG1hcmtldElkOiAnQG1hcmtldElkJyB9IH0sXHJcbiAgICAgICAgICAgIHJldHVyblRyaWFsOiB7IG1ldGhvZDogJ1BPU1QnLCB1cmw6ICcvYXBpL2xpYnJhcnkvdHJpYWwtcmV0dXJuJywgcGFyYW1zOiB7IHByb2R1Y3RJZDogJ0Bwcm9kdWN0SWQnfSB9LFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtYW5hZ2VyLmdldFVzZXJMaWJyYXJ5RGljID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWFuYWdlci5nZXRVc2VyTGlicmFyeSgpLiRwcm9taXNlXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpdGVtLnByb2R1Y3RJZF0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtYW5hZ2VyO1xyXG5cclxuICAgIH1dKTsiLCJcclxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ1VzZXJNYW5hZ2VyJywgWyckaHR0cCcsICckcmVzb3VyY2UnLCAnJHJvb3RTY29wZScsICckYW5hbHl0aWNzJywgZnVuY3Rpb24gKCRodHRwLCAkcmVzb3VyY2UsICRyb290U2NvcGUsICRhbmFseXRpY3MpIHtcclxuXHJcbiAgICB2YXIgLy8gbUlzQXV0aGVudGljYXRlZCA9IGZhbHNlLFxyXG4gICAgICAgIC8vIG1Vc2VyTmFtZSA9IG51bGwsXHJcbiAgICAgICAgbUFjY2Vzc1Rva2VuID0gbnVsbCxcclxuICAgICAgICAvLyBtUmV0dXJuVXJsID0gbnVsbCxcclxuICAgICAgICBzdG9yYWdlQWNjZXNzVG9rZW4gPSAnYWNjZXNzX3Rva2VuJyxcclxuICAgICAgICBzdG9yYWdlVXNlckluZm8gPSBcInVzZXJJbmZvXCJcclxuICAgIHN0b3JhZ2VDbGllbnRJbmZvID0gXCJjbGllbnRJbmZvXCI7XHJcblxyXG5cclxuICAgIHZhciBtYW5hZ2VyID0gJHJlc291cmNlKCcvYXBpL2FjY291bnQvOmFjdGlvbicsIG51bGwsIHtcclxuICAgICAgICByZWdpc3RlckxpdGU6IHsgbWV0aG9kOiAnUE9TVCcsIHBhcmFtczogeyBhY3Rpb246ICdyZWdpc3RlcicgfSB9LFxyXG4gICAgICAgIHJlZ2lzdGVyOiB7IG1ldGhvZDogJ1BPU1QnLCBwYXJhbXM6IHsgYWN0aW9uOiAncmVnaXN0ZXInLCBlbWFpbDogJ0BlbWFpbCcsIHBhc3N3b3JkOiAnQHBhc3N3b3JkJywgY29uZmlybTogJ0Bjb25maXJtJywgZmlyc3RuYW1lOiAnQGZpcnN0bmFtZScsIGxhc3RuYW1lOiAnQGxhc3RuYW1lJywgbmV3c2xldHRlcjogJ0BuZXdzbGV0dGVyJywgbWFya2V0OiAnQG1hcmtldCcsIGJpcnRoZGF5OiAnQGJpcnRoZGF5Jywgb2NjdXBhdGlvbjogJ0BvY2N1cGF0aW9uJywgbW9iaWxlbm86ICdAbW9iaWxlbm8nLCBnZW5kZXI6ICdAZ2VuZGVyJyB9IH0sXHJcbiAgICAgICAgY2hhbmdlUGFzc3dvcmQ6IHsgbWV0aG9kOiAnUE9TVCcsIHBhcmFtczogeyBhY3Rpb246ICdjaGFuZ2VwYXNzd29yZCcgfSB9LFxyXG4gICAgICAgIGZvcmdvdFBhc3N3b3JkOiB7IG1ldGhvZDogJ1BPU1QnLCBwYXJhbXM6IHsgYWN0aW9uOiAnZm9yZ290cGFzc3dvcmQnIH0gfSxcclxuICAgICAgICByZXNldFBhc3N3b3JkOiB7IG1ldGhvZDogJ1BPU1QnLCBwYXJhbXM6IHsgYWN0aW9uOiAncmVzZXRwYXNzd29yZCcgfSB9LFxyXG4gICAgICAgIGNvbmZpcm1FbWFpbDogeyBtZXRob2Q6ICdQT1NUJywgcGFyYW1zOiB7IGFjdGlvbjogJ2NvbmZpcm1lbWFpbCcsIHVzZXJJZDogJ0B1c2VySWQnLCBjb2RlOiAnQGNvZGUnIH0gfSxcclxuICAgICAgICBlZGl0UHJvZmlsZTogeyBtZXRob2Q6ICdQT1NUJywgcGFyYW1zOiB7IGFjdGlvbjogJ2VkaXRwcm9maWxlJyB9IH0sXHJcbiAgICAgICAgdXBkYXRlUHJvZmlsZTogeyBtZXRob2Q6ICdQT1NUJywgcGFyYW1zOiB7IGFjdGlvbjogJ3VwZGF0ZVByb2ZpbGUnIH0gfSxcclxuICAgICAgICBnZXRQcm9maWxlOiB7IG1ldGhvZDogJ0dFVCcsIHBhcmFtczogeyBhY3Rpb246ICdlZGl0cHJvZmlsZScgfSB9LFxyXG4gICAgICAgIGdldE9jY3VwYXRpb25zOiB7IG1ldGhvZDogJ0dFVCcsIHVybDogJy9hcGkvb2NjdXBhdGlvbnMnLCBpc0FycmF5OiB0cnVlIH0sXHJcbiAgICAgICAgcmVzZW5kVmVyaWZpY2F0aW9uOiB7IG1ldGhvZDogJ1BPU1QnLCBwYXJhbXM6IHsgYWN0aW9uOiAncmVzZW5kdmVyaWZpY2F0aW9uJywgZW1haWw6ICdAZW1haWwnIH0gfSxcclxuICAgICAgICBjaGFuZ2VFbWFpbDogeyBtZXRob2Q6ICdQT1NUJywgcGFyYW1zOiB7IGFjdGlvbjogJ2NoYW5nZWVtYWlsJyB9IH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyRyb290U2NvcGUuJG9uKCckbG9jYXRpb25DaGFuZ2VTdGFydCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgIC8vIG1SZXR1cm5Vcm4gPSAkbG9cclxuICAgIC8vfSk7XHJcblxyXG4gICAgaWYgKChtQWNjZXNzVG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlQWNjZXNzVG9rZW4pKSkge1xyXG4gICAgICAgIC8vIG1Jc0F1dGhlbnRpY2F0ZWQgPSB0cnVlO1xyXG4gICAgICAgICRyb290U2NvcGUuaXNBdXRoZW50aWNhdGVkID0gdHJ1ZTtcclxuICAgICAgICAkcm9vdFNjb3BlLnVzZXJJbmZvID0gZnJvbUpTT04obG9jYWxTdG9yYWdlLmdldEl0ZW0oc3RvcmFnZVVzZXJJbmZvKSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICgobUFjY2Vzc1Rva2VuID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlQWNjZXNzVG9rZW4pKSkge1xyXG4gICAgICAgIC8vIG1Jc0F1dGhlbnRpY2F0ZWQgPSB0cnVlO1xyXG4gICAgICAgICRyb290U2NvcGUuaXNBdXRoZW50aWNhdGVkID0gdHJ1ZTtcclxuICAgICAgICAkcm9vdFNjb3BlLnVzZXJJbmZvID0gZnJvbUpTT04oc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlVXNlckluZm8pKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy9zZXQgY2xpZW50IGluZm9cclxuICAgIHZhciBjbGllbnRJbmZvID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oc3RvcmFnZUNsaWVudEluZm8pO1xyXG4gICAgaWYgKCFjbGllbnRJbmZvKSB7XHJcbiAgICAgICAgY2xpZW50SW5mbyA9IHRvSlNPTih7IGxvZ2dlZGluOiBmYWxzZSB8fCAoJHJvb3RTY29wZS5pc0F1dGhlbnRpY2F0ZWQgfHwgZmFsc2UpIH0pO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHN0b3JhZ2VDbGllbnRJbmZvLCBjbGllbnRJbmZvKTtcclxuICAgIH1cclxuICAgICRyb290U2NvcGUuY2xpZW50SW5mbyA9IGZyb21KU09OKGNsaWVudEluZm8pO1xyXG5cclxuXHJcbiAgICAvL3ZhciB1c2VyQWN0aXZpdHlJbmZvID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJBY3Rpdml0eUluZm8nKTtcclxuICAgIC8vaWYgKHVzZXJBY3Rpdml0eUluZm8pIHtcclxuICAgIC8vICAgICRyb290U2NvcGUudXNlckFjdGl2aXR5SW5mbyA9IGZyb21KU09OKHVzZXJBY3Rpdml0eUluZm8pO1xyXG4gICAgLy99XHJcbiAgICBcclxuXHJcbiAgICAvLyBzZXQgcmVxdWVzdCBoZWFkZXIgZm9yIGF1dGhvcml6YXRpb25cclxuICAgIGlmIChtQWNjZXNzVG9rZW4pIHtcclxuICAgICAgICAvLyRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uLkF1dGhvcml6YXRpb24gPSBcIkJlYXJlciBcIiArIG1BY2Nlc3NUb2tlbjtcclxuXHJcbiAgICAgICAgLy9zZXQgdXNlcklkIGZvciBHQSB0cmFja2luZyBvbiBwYWdlIHJlbG9hZC5cclxuICAgICAgICBpZiAoJHJvb3RTY29wZS51c2VySW5mbykge1xyXG4gICAgICAgICAgICBpZiAoISRyb290U2NvcGUudXNlckluZm8udXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICAvL2lmIHRoZSB1c2VyIGhhcyBub3QgdXNlcklkIHNldCwgdGhlbiBmb3JjZSBoaW0gdG8gbG9nb3V0LlxyXG4gICAgICAgICAgICAgICAgbG9nb3V0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkYW5hbHl0aWNzLnNldFVzZXJuYW1lKCRyb290U2NvcGUudXNlckluZm8udXNlcklkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtYW5hZ2VyLmdldElzQXV0aGVudGljYXRlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyByZXR1cm4gbUlzQXV0aGVudGljYXRlZDtcclxuICAgICAgICByZXR1cm4gJHJvb3RTY29wZS5pc0F1dGhlbnRpY2F0ZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIG1hbmFnZXIuZ2V0TG9naW5SZXF1ZXN0ZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICRyb290U2NvcGUubG9naW5SZXF1ZXN0ZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIG1hbmFnZXIuc2V0TG9naW5SZXF1ZXN0ZWQgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAkcm9vdFNjb3BlLmxvZ2luUmVxdWVzdGVkID0gdmFsdWU7XHJcbiAgICB9O1xyXG5cclxuICAgIG1hbmFnZXIuZ2V0VXNlck5hbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICRyb290U2NvcGUudXNlckluZm8gPyAkcm9vdFNjb3BlLnVzZXJJbmZvLnVzZXJOYW1lIDogbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgbWFuYWdlci5nZXRVc2VySW5mbyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJHJvb3RTY29wZS51c2VySW5mbyA/ICRyb290U2NvcGUudXNlckluZm8gOiBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBtYW5hZ2VyLmdldEFjY2Vzc1Rva2VuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBtQWNjZXNzVG9rZW47XHJcbiAgICB9O1xyXG5cclxuICAgIG1hbmFnZXIubG9naW4gPSBmdW5jdGlvbiAodGlja2V0LCBwZXJzaXN0ZW50KSB7XHJcbiAgICAgICAgLy8gbUlzQXV0aGVudGljYXRlZCA9IHRydWU7XHJcbiAgICAgICAgLy8gc2V0IGdsb2JhbCBzY29wZSBwcm9wZXJ0aWVzXHJcbiAgICAgICAgJHJvb3RTY29wZS5pc0F1dGhlbnRpY2F0ZWQgPSB0cnVlO1xyXG4gICAgICAgICRyb290U2NvcGUudXNlckluZm8gPSB7ICd1c2VyTmFtZSc6IHRpY2tldC51c2VyTmFtZSwgJ2ZpcnN0TmFtZSc6IHRpY2tldC5maXJzdE5hbWUsICdsYXN0TmFtZSc6IHRpY2tldC5sYXN0TmFtZSwgJ3VzZXJJZCc6IHRpY2tldC51c2VySWQgfTtcclxuICAgICAgICAkcm9vdFNjb3BlLmNsaWVudEluZm8ubG9nZ2VkaW4gPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyBzdG9yZSB0b2tlbiBsb2NhbGx5IGZvciBuZXh0IHVzYWdlXHJcbiAgICAgICAgbUFjY2Vzc1Rva2VuID0gdGlja2V0LmFjY2Vzc190b2tlbjtcclxuXHJcbiAgICAgICAgLy8gc2V0IHJlcXVlc3QgaGVhZGVyIGZvciBhdXRob3JpemF0aW9uXHJcbiAgICAgICAgLy8kaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vbi5BdXRob3JpemF0aW9uID0gXCJCZWFyZXIgXCIgKyBtQWNjZXNzVG9rZW47XHJcblxyXG4gICAgICAgIC8vIGJyb2FkY2FzdCBhbiBldmVudFxyXG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnbG9nZ2VkT24nLCB0aWNrZXQpO1xyXG5cclxuICAgICAgICAvLyBzdG9yZSB0b2tlbiBhbmQgdXNlcm5hbWUgaW4gYnJvd3NlciBzdG9yYWdlXHJcbiAgICAgICAgdmFyIHN0b3JlID0gd2luZG93WyhwZXJzaXN0ZW50ID8gJ2xvY2FsJyA6ICdzZXNzaW9uJykgKyAnU3RvcmFnZSddO1xyXG4gICAgICAgIHN0b3JlLnNldEl0ZW0oc3RvcmFnZUFjY2Vzc1Rva2VuLCB0aWNrZXQuYWNjZXNzX3Rva2VuKTtcclxuICAgICAgICBzdG9yZS5zZXRJdGVtKHN0b3JhZ2VVc2VySW5mbywgdG9KU09OKCRyb290U2NvcGUudXNlckluZm8pKTtcclxuICAgICAgICBzdG9yZS5zZXRJdGVtKHN0b3JhZ2VDbGllbnRJbmZvLCB0b0pTT04oJHJvb3RTY29wZS5jbGllbnRJbmZvKSk7XHJcblxyXG5cclxuICAgICAgICAvL3NldCBHQSB1c2VyIGlkIHRyYWNraW5nLlxyXG4gICAgICAgICRhbmFseXRpY3Muc2V0VXNlcm5hbWUoJHJvb3RTY29wZS51c2VySW5mby51c2VySWQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBsb2dvdXQoKSB7XHJcbiAgICAgICAgLy8kaHR0cCh7XHJcbiAgICAgICAgLy8gICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgLy8gICAgdXJsOiAnYXBpL2FjY291bnQvbG9nb3V0JyxcclxuICAgICAgICAvL30pO1xyXG4gICAgICAgIC8vIG1Jc0F1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gY2xlYXIgZ2xvYmFsIHNjb3BlIHByb3BlcnRpZXNcclxuICAgICAgICAkcm9vdFNjb3BlLmlzQXV0aGVudGljYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICRyb290U2NvcGUudXNlckluZm8gPSBudWxsO1xyXG4gICAgICAgICRyb290U2NvcGUudXNlckFjdGl2aXR5SW5mbyA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vY2xlYXIgR0EgdXNlciBpZCB0cmFja2luZy5cclxuICAgICAgICAkYW5hbHl0aWNzLnNldFVzZXJuYW1lKG51bGwpO1xyXG5cclxuICAgICAgICAvLyBjbGVhYXIgc3RvcmVkIHRva2VuXHJcbiAgICAgICAgbUFjY2Vzc1Rva2VuID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gYnJvYWRjYXN0IGFuIGV2ZW50XHJcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdsb2dnZWRPdXQnKTtcclxuXHJcbiAgICAgICAgLy8gc3RvcmUgdG9rZW4gYW5kIHVzZXJuYW1lIGluIGJyb3dzZXIgc3RvcmFnZVxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhY2Nlc3NfdG9rZW4nKTtcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdhY2Nlc3NfdG9rZW4nKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShzdG9yYWdlVXNlckluZm8pO1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oc3RvcmFnZVVzZXJJbmZvKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHJlcXVlc3QgaGVhZGVyIGZvciBhdXRob3JpemF0aW9uXHJcbiAgICAgICAgZGVsZXRlICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uLkF1dGhvcml6YXRpb247XHJcbiAgICB9XHJcbiAgICBtYW5hZ2VyLmxvZ291dCA9IGxvZ291dDtcclxuXHJcbiAgICBtYW5hZ2VyLmFjcXVpcmVUb2tlbiA9IGZ1bmN0aW9uIChjcmVkZW50aWFsKSB7XHJcbiAgICAgICAgcmV0dXJuICRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIHVybDogJy90b2tlbicsXHJcbiAgICAgICAgICAgIGRhdGE6ICQucGFyYW0oeyAnZ3JhbnRfdHlwZSc6ICdwYXNzd29yZCcsIHVzZXJuYW1lOiBjcmVkZW50aWFsLnVzZXJuYW1lLCBwYXNzd29yZDogY3JlZGVudGlhbC5wYXNzd29yZCB9KSxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBtYW5hZ2VyLmF1dGhlbnRpY2F0aW9uID0ge1xyXG4gICAgICAgIGlzQXV0aDogZmFsc2UsXHJcbiAgICAgICAgdXNlck5hbWU6IFwiXCIsXHJcbiAgICAgICAgdXNlUmVmcmVzaFRva2VuczogZmFsc2VcclxuICAgIH07O1xyXG5cclxuICAgIG1hbmFnZXIucmVnaXN0ZXJFeHRlcm5hbCA9IGZ1bmN0aW9uIChyZWdpc3RlckV4dGVybmFsRGF0YSkge1xyXG5cclxuICAgICAgICB2YXIgcHJvbWlzZSA9ICRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIHVybDogJy9hcGkvYWNjb3VudC9yZWdpc3RlcmV4dGVybmFsJyxcclxuICAgICAgICAgICAgZGF0YTogcmVnaXN0ZXJFeHRlcm5hbERhdGEsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfTtcclxuXHJcbiAgICBtYW5hZ2VyLm9idGFpbkFjY2Vzc1Rva2VuID0gZnVuY3Rpb24gKGV4dGVybmFsRGF0YSkge1xyXG5cclxuICAgICAgICB2YXIgcHJvbWlzZSA9ICRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIHVybDogJy9hcGkvYWNjb3VudC9PYnRhaW5Mb2NhbEFjY2Vzc1Rva2VuJyxcclxuICAgICAgICAgICAgZGF0YTogZXh0ZXJuYWxEYXRhLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG1hbmFnZXI7XHJcblxyXG59XSk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuZmFjdG9yeSgnYXV0aEludGVyY2VwdG9yJywgWyckcScsICckaW5qZWN0b3InLCAnJGxvY2F0aW9uJywgJyRyb290U2NvcGUnLCBhdXRoSW50ZXJjZXB0b3JdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBhdXRoSW50ZXJjZXB0b3IoJHEsICRpbmplY3RvciwgJGxvY2F0aW9uLCAkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3Q6IHJlcXVlc3QsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IHJlc3BvbnNlRXJyb3IsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcblxyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcclxuICAgICAgICAgICAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcclxuICAgICAgICAgICAgdmFyIHVzZXJNYW5hZ2VyU2VydmljZSA9IGdldFVzZXJNYW5hZ2VyU2VydmljZSgpO1xyXG4gICAgICAgICAgICB2YXIgYWNjZXNzVG9rZW4gPSB1c2VyTWFuYWdlclNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhY2Nlc3NUb2tlbikge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIGFjY2Vzc1Rva2VuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdXJsID0gY29uZmlnLnVybC50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICAgICAgLy9hcHBlbmQgYXBwVmVyc2lvbiB0byBodG1sIHJlcXVlc3RzIChub3QgbmcgdGVtcGxhdGVzKSB0byBwcmV2ZW50IGNhY2hpbmcgb2xkIGZpbGVzLlxyXG4gICAgICAgICAgICBpZiAodXJsLmluZGV4T2YoJy5odG1sJykgPiAwICYmICFjb25maWcuY2FjaGUuZ2V0KGNvbmZpZy51cmwpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXJsLmluZGV4T2YoJz8nKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmwgKz0gJyZ2PScgKyBhcHBWZXJzaW9uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsICs9ICc/dj0nICsgYXBwVmVyc2lvbjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25maWcudXJsID0gdXJsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVzcG9uc2VFcnJvcihyZWplY3Rpb24pIHtcclxuICAgICAgICAgICAgaWYgKHJlamVjdGlvbi5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdldmVudDphdXRoLWxvZ2luUmVxdWlyZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlamVjdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRVc2VyTWFuYWdlclNlcnZpY2UoKSB7XHJcbiAgICAgICAgICAgIHZhciBhdXRoID0gJGluamVjdG9yLmdldCgnVXNlck1hbmFnZXInKTtcclxuICAgICAgICAgICAgcmV0dXJuIGF1dGg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIi8qKipcclxuICogU2VydmljZTogbG9nZ2VyIFxyXG4gKlxyXG4gKiBQcm92aWRlcyBzZW1hbnRpYyBsb2dnaW5nIHNlcnZpY2VzIHdpdGggaGVscCBvZlxyXG4gKiBBbmd1bGFyJ3MgJGxvZyBzZXJ2aWNlIHRoYXQgd3JpdGVzIHRvIHRoZSBjb25zb2xlIGFuZFxyXG4gKiBKb2huIFBhcGEncyAndG9hc3RyLmpzJzogaHR0cHM6Ly9naXRodWIuY29tL0NvZGVTZXZlbi90b2FzdHJcclxuICpcclxuICoqKi9cclxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ2xvZ2dlcicsIFsnJGxvZycsIGxvZ2dlcl0pO1xyXG5cclxuZnVuY3Rpb24gbG9nZ2VyKCRsb2cpIHtcclxuXHJcbiAgICB0b2FzdHIub3B0aW9ucyA9IHtcclxuICAgICAgICBwb3NpdGlvbkNsYXNzOiBcInRvYXN0LXRvcC1sZWZ0XCJcclxuICAgICAgICAvL3Bvc2l0aW9uQ2xhc3M6IFwidG9hc3QtYm90dG9tLWxlZnRcIlxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICBmb3JTb3VyY2U6IGZvclNvdXJjZSxcclxuICAgICAgICBsb2c6IGxvZyxcclxuICAgICAgICBsb2dFcnJvcjogbG9nRXJyb3IsXHJcbiAgICAgICAgbG9nU3VjY2VzczogbG9nU3VjY2VzcyxcclxuICAgICAgICBsb2dXYXJuaW5nOiBsb2dXYXJuaW5nXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAgIGZ1bmN0aW9uIGZvclNvdXJjZShzcmMpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsb2c6IGZ1bmN0aW9uIChtLCBkLCBzKSB7IGxvZyhtLCBkLCBzcmMsIHMpOyB9LFxyXG4gICAgICAgICAgICBsb2dFcnJvcjogZnVuY3Rpb24gKG0sIGQsIHMpIHsgbG9nRXJyb3IobSwgZCwgc3JjLCBzKTsgfSxcclxuICAgICAgICAgICAgbG9nU3VjY2VzczogZnVuY3Rpb24gKG0sIGQsIHMpIHsgbG9nU3VjY2VzcyhtLCBkLCBzcmMsIHMpOyB9LFxyXG4gICAgICAgICAgICBsb2dXYXJuaW5nOiBmdW5jdGlvbiAobSwgZCwgcykgeyBsb2dXYXJuaW5nKG0sIGQsIHNyYywgcyk7IH0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2cobWVzc2FnZSwgZGF0YSwgc291cmNlLCBzaG93VG9hc3QpIHtcclxuICAgICAgICBsb2dJdChtZXNzYWdlLCBkYXRhLCBzb3VyY2UsIHNob3dUb2FzdCwgJ2luZm8nKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2dXYXJuaW5nKG1lc3NhZ2UsIGRhdGEsIHNvdXJjZSwgc2hvd1RvYXN0KSB7XHJcbiAgICAgICAgbG9nSXQobWVzc2FnZSwgZGF0YSwgc291cmNlLCBzaG93VG9hc3QsICd3YXJuaW5nJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9nU3VjY2VzcyhtZXNzYWdlLCBkYXRhLCBzb3VyY2UsIHNob3dUb2FzdCkge1xyXG4gICAgICAgIGxvZ0l0KG1lc3NhZ2UsIGRhdGEsIHNvdXJjZSwgc2hvd1RvYXN0LCAnc3VjY2VzcycpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxvZ0Vycm9yKG1lc3NhZ2UsIGRhdGEsIHNvdXJjZSwgc2hvd1RvYXN0KSB7XHJcbiAgICAgICAgbG9nSXQobWVzc2FnZSwgZGF0YSwgc291cmNlLCBzaG93VG9hc3QsICdlcnJvcicpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxvZ0l0KG1lc3NhZ2UsIGRhdGEsIHNvdXJjZSwgc2hvd1RvYXN0LCB0b2FzdFR5cGUpIHtcclxuICAgICAgICB2YXIgd3JpdGUgPSAodG9hc3RUeXBlID09PSAnZXJyb3InKSA/ICRsb2cuZXJyb3IgOiAkbG9nLmxvZztcclxuICAgICAgICBzb3VyY2UgPSBzb3VyY2UgPyAnWycgKyBzb3VyY2UgKyAnXSAnIDogJyc7XHJcbiAgICAgICAgd3JpdGUoc291cmNlLCBtZXNzYWdlLCBkYXRhKTtcclxuXHJcbiAgICAgICAgaWYgKHNob3dUb2FzdCkge1xyXG4gICAgICAgICAgICBpZiAodG9hc3RUeXBlID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdHIuZXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodG9hc3RUeXBlID09PSAnd2FybmluZycpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0ci53YXJuaW5nKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRvYXN0VHlwZSA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdHIuc3VjY2VzcyhtZXNzYWdlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0ci5pbmZvKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
