(function() {

    window.onload = function() {
        game.init();
    }

    var game = window.game = {
        width: 0,
        height: 0,

        asset: null,
        stage: null,
        ticker: null,
        state: null,
        score: 0,
        mapCnt: 0,
        mapLocations:[
[0, 10],
[19, 28],
[13, 13],
[15, 12],
[18, 0],
[18, 2],
[14, 17],
[0, 14],
[1, 9],
[4, 15],
[4, 0],
[12, 18],
[8, 22],
[17, 1],
[17, 4],
[11, 5],
[1, 0],
[14, 12],
[8, 21],
[2, 14],
[2, 11],
[6, 22],
[1, 26],
[17, 13],
[0, 0]
],
    bg: null,
    ground: null,
    bird: null,
    holdbacks: null,
    gameReadyScene: null,
    gameOverScene: null,
    scaleX: null,
    scaleY: null,

    init: function() {
    this.asset = new game.Asset();
    this.asset.on('complete', function(e) {
        this.asset.off('complete');
        this.initStage();
    }.bind(this));
    this.asset.load();
    },

    initStage: function() {
    this.width = Math.min(innerWidth, 450) * 2;
    this.height = Math.min(innerHeight, 750) * 2;
    this.scale = 0.5;

    //w
    var renderType = location.search.indexOf('dom') != -1 ? 'dom' : 'canvas';

    //w
    this.stage = new Hilo.Stage({
        renderType: renderType,
        width: this.width,
        height: this.height,
        scaleX: this.scale,
        scaleY: this.scale
    });
    document.body.appendChild(this.stage.canvas);

    //w
    this.ticker = new Hilo.Ticker(60);
    this.ticker.addTick(Hilo.Tween);
    this.ticker.addTick(this.stage);
    this.ticker.start(true);

    //w
    this.stage.enableDOMEvent(Hilo.event.POINTER_START, true);
    this.stage.on(Hilo.event.POINTER_START, this.onUserInput.bind(this));

    //w
    this.stage.onUpdate = this.onUpdate.bind(this);

    //w
    this.initBackground();
    this.initScenes();
    this.initBird();
    this.initCurrentScore();

    this.gameReady();
    },

    initBackground: function() {
    var bgWidth = this.width * this.scale;
    var bgHeight = this.height * this.scale;

    var bgImg = this.asset.bg;
    var groundOffset = 60;
    var groundImg = this.asset.ground;

    console.log(bgImg);
    this.scaleX = this.width / bgImg.width;
    this.scaleY = (this.height-groundImg.height) / bgImg.height;

    this.bg = new Hilo.Bitmap({
        id: 'bg',
        image: bgImg,
        scaleX: this.scaleX,
        scaleY: this.scaleY,
    }).addTo(this.stage);

    this.ground = new Hilo.Bitmap({
        id: 'ground',
        image: groundImg,
        scaleX: (this.width + groundOffset * 2) / groundImg.width
    }).addTo(this.stage);

    this.ground.y = this.height - this.ground.height;

    Hilo.Tween.to(this.ground, {
        x: -groundOffset * this.ground.scaleX
    }, {
        duration: 400,
        loop: true
    });
    },

    initCurrentScore: function() {
    this.currentScore = new Hilo.BitmapText({
        id: 'score',
        glyphs: this.asset.numberGlyphs,
        textAlign: 'center'
    }).addTo(this.stage);

    this.currentScore.x = this.width - this.currentScore.width >> 1;
    this.currentScore.y = this.height-130;
    },

    initBird: function() {
    this.bird = new game.Bird({
        id: 'bird',
        atlas: this.asset.birdAtlas,
        startX: 100,
        startY: this.height >> 1,
        groundY: this.ground.y - 12
    }).addTo(this.stage, this.ground.depth - 1);
    },


    initScenes: function() {
    this.gameReadyScene = new game.ReadyScene({
        id: 'readyScene',
        width: this.width,
        height: this.height,
        image: this.asset.ready
    }).addTo(this.stage);

    this.gameOverScene = new game.OverScene({
        id: 'overScene',
        width: this.width,
        height: this.height,
        image: this.asset.over,
        numberGlyphs: this.asset.numberGlyphs,
        visible: false
    }).addTo(this.stage);

    this.gameOverScene.getChildById('start').on(Hilo.event.POINTER_START, function(e) {
        e.stopImmediatePropagation && e.stopImmediatePropagation();
        this.gameReady();
    }.bind(this));
    },

    onUserInput: function(e) {
    if (this.state !== 'over' && !this.gameOverScene.contains(e.eventTarget)) {
        if (this.state !== 'playing') this.gameStart();
        // console.log(e.eventTarget, e.stageX, e.stageY);
        // console.log(, this.mapLocations[this.mapCnt][1]);
        else{
            var x1 = this.mapLocations[this.mapCnt][0]*44.15;
            var y1 = this.mapLocations[this.mapCnt][1]*40.4    ;
            console.log(e.stageX, e.stageY);
            console.log(e.eventTarget, x1, y1);
            if (e.stageX>=x1 & e.stageX<=x1+50 & e.stageY>=y1 & e.stageY<=y1+50){
            // console.log(String(this.width),this.height);
                this.score = this.score+1;
                this.mapCnt = (this.mapCnt+1)%20;
                this.changeMap();
                // this.bg.image = this.bgs[mapCnt];

            } else{
                this.score = this.score-1;
                console.log(this.score);
            }
            if (this.score<0){
                this.init();
            }
        }

    }
    },

    onUpdate: function(delta) {
    if (this.state === 'ready') {
        return;
    }

    if (this.bird.isDead) {
        this.gameOver();
    } else {
        this.currentScore.setText(this.calcScore());

    }
    },

    changeMap: function() {
    var bgImg2 =this.asset.bgs[this.mapCnt];
    new Hilo.Bitmap({
        id:"bg2",
        image:bgImg2,
        scaleX: this.scaleX,
        scaleY: this.scaleY,
    }).addTo(this.stage);
    // this.mapCnt = (this.mapCnt+1)%20;
    console.log(bgImg2);
    },

    gameReady: function() {
    this.gameOverScene.hide();
    this.state = 'ready';
    this.score = 0;
    this.currentScore.visible = true;
    this.currentScore.setText(this.score);
    this.gameReadyScene.visible = true;

    },

    gameStart: function() {
    this.state = 'playing';
    this.gameReadyScene.visible = false;
    this.changeMap();
    },

    gameOver: function() {
    if (this.state !== 'over') {
        this.state = 'over';
        this.bird.goto(0, true);
        this.currentScore.visible = false;
        this.gameOverScene.show(this.calcScore(), this.saveBestScore());
    }
    },

    calcScore: function() {
    // var count = this.holdbacks.calcPassThrough(this.bird.x);
    return this.score = this.score;
    },

    saveBestScore: function() {
    var score = this.score,
        best = 0;
    if (Hilo.browser.supportStorage) {
        best = parseInt(localStorage.getItem('hilo-flappy-best-score')) || 0;
    }
    if (score > best) {
        best = score;
        localStorage.setItem('hilo-flappy-best-score', score);
    }
    return best;
    }
    };

    })();
