
(function(ns){

var Bird = ns.Bird = Hilo.Class.create({
    Extends: Hilo.Sprite,
    constructor: function(properties){
        Bird.superclass.constructor.call(this, properties);
        
        this.addFrame(properties.atlas.getSprite('bird'));
        this.interval = 6;
        this.pivotX = 43;
        this.pivotY = 30;

        this.gravity = 10 / 1000 * 0.3;
        this.flyHeight = 80;
        this.initVelocity = Math.sqrt(2 * this.flyHeight * this.gravity);
    },


    getReady: function(){
    },

    startFly: function(){
    },
    
    onUpdate: function(){
       
    }
});

})(window.game);