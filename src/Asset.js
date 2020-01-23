
(function(ns){

var Asset = ns.Asset = Hilo.Class.create({
    Mixes: Hilo.EventMixin,

    queue: null,
    bg: null,
    ground: null,
    ready: null,
    over: null,
    numberGlyphs: null,
    birdAtlas: null,
    holdback: null,
    bgs:null,

    load: function(){
        var resources = [
            {id:'bg', src:'images/test.png'},
            {id:'ground', src:'images/ground.png'},
            {id:'ready', src:'images/ready.png'},
            {id:'over', src:'images/over.png'},
            {id:'number', src:'images/number.png'},
            {id:'bird', src:'images/bird.png'},
            {id:'holdback', src:'images/holdback.png'},
{id:'0'	, src:'imageGenerator/image/0.png'},
{id:'1'	, src:'imageGenerator/image/1.png'},
{id:'2'	, src:'imageGenerator/image/2.png'},
{id:'3'	, src:'imageGenerator/image/3.png'},
{id:'4'	, src:'imageGenerator/image/4.png'},
{id:'5'	, src:'imageGenerator/image/5.png'},
{id:'6'	, src:'imageGenerator/image/6.png'},
{id:'7'	, src:'imageGenerator/image/7.png'},
{id:'8'	, src:'imageGenerator/image/8.png'},
{id:'9'	, src:'imageGenerator/image/9.png'},
{id:'10'	, src:'imageGenerator/image/10.png'},
{id:'11'	, src:'imageGenerator/image/11.png'},
{id:'12'	, src:'imageGenerator/image/12.png'},
{id:'13'	, src:'imageGenerator/image/13.png'},
{id:'14'	, src:'imageGenerator/image/14.png'},
{id:'15'	, src:'imageGenerator/image/15.png'},
{id:'16'	, src:'imageGenerator/image/16.png'},
{id:'17'	, src:'imageGenerator/image/17.png'},
{id:'18'	, src:'imageGenerator/image/18.png'},
{id:'19'	, src:'imageGenerator/image/19.png'},
{id:'20'	, src:'imageGenerator/image/20.png'},
{id:'21'	, src:'imageGenerator/image/21.png'},
{id:'22'	, src:'imageGenerator/image/22.png'},
{id:'23'	, src:'imageGenerator/image/23.png'},
{id:'24'	, src:'imageGenerator/image/24.png'},

        ];

        this.queue = new Hilo.LoadQueue();
        this.queue.add(resources);
        this.queue.on('complete', this.onComplete.bind(this));
        this.queue.start();
    },

    onComplete: function(e){
        this.bg = this.queue.get('bg').content;
        this.ground = this.queue.get('ground').content;
        this.ready = this.queue.get('ready').content;
        this.over = this.queue.get('over').content;
        this.holdback = this.queue.get('holdback').content;
        this.bgs = new Array(20);
        for(var i = 0; i < 20; i++){
            this.bgs[i]= this.queue.get(String(i)).content;
        }
        // console.log(this.bgs)
        this.birdAtlas = new Hilo.TextureAtlas({
            image: this.queue.get('bird').content,
            frames: [
                [0, 120, 86, 60],
                [0, 60, 86, 60],
                [0, 0, 86, 60]
            ],
            sprites: {
                bird: [0, 1, 2]
            }
        });

        var number = this.queue.get('number').content;
        this.numberGlyphs = {
            0: {image:number, rect:[0,0,60,91]},
            1: {image:number, rect:[61,0,60,91]},
            2: {image:number, rect:[121,0,60,91]},
            3: {image:number, rect:[191,0,60,91]},
            4: {image:number, rect:[261,0,60,91]},
            5: {image:number, rect:[331,0,60,91]},
            6: {image:number, rect:[401,0,60,91]},
            7: {image:number, rect:[471,0,60,91]},
            8: {image:number, rect:[541,0,60,91]},
            9: {image:number, rect:[611,0,60,91]}
        };

        this.queue.off('complete');
        this.fire('complete');
    }
});

})(window.game);
