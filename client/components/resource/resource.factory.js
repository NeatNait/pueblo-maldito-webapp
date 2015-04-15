'use strict';

angular.module( 'puebloMalditoWebappApp.resource', [ 'ngResource' ] )
  .factory( 'Resource', function( $resource ) {
   return function( url, params, methods ) {
     var defaults = {
       update: { method: 'put', isArray: false },
       create: { method: 'post' }
     };

     methods = angular.extend( defaults, methods );

     var resource = $resource( url, params, methods );

     resource.prototype.$save = function() {
       if ( !this._id ) {
         return this.$create.apply(this, arguments);
       }
       else {
         return this.$update.apply(this, arguments);
       }
     };

     return resource;
   };
 });