/*GLOBAL VARIABLES*/
// Defines the default character
var Character = "";
// Array of all models using Spine Version 4.1;
var Char41 = ["c010_03", "c014", "c015", "c070_02", "c082_01", "c090_02", "c101_01", "c131_01", "c132", "c142_01", "c200_01", "c201_01", "c212_02", "c260_01", "c263", "c270", "c271", "c272", "c280", "c282_01", "c321", "c330", "c331", "c350", "c350_01", "c351", "c353", "c380", "c382", "c450", "c451", "c470", "c810", "c810_01", "c810_02", "c811", "c811_01", "c811_02", "c812", "c813", "c901", "c945", "c946", "c962", "c963", "c964", "c160", "c161", "c221", "c222", "c240", "c281", "c290", "c310", "c361", "c390", "c391", "c016", "c030_02", "c043_01", "c072_02", "c072_04", "c091_01", "c112_02", "c162", "c170_02", "c182", "c183", "c192", "c192_01", "c194", "c195", "c224", "c225", "c225_01", "c226", "c230_01", "c242_01", "c270_01", "c272", "c283", "c284", "c314", "c321_01", "c350_02", "c352_02", "c354", "c355", "c381_01", "c382_01", "c400_01", "c403", "c411", "c412", "c441", "c450_01", "c450_02", "c451_01", "c470_01", "c481", "c490", "c491", "c500", "c501", "c501_01", "c510", "c511", "c511_01", "c513", "c514", "c550", "c551", "c560", "c562", "c570", "c580", "c810_01", "c820", "c820_01", "c820_02", "c821", "c821_01", "c821_02", "c822", "c830", "c830_01", "c830_02", "c830_03", "c831", "c831_01", "c831_02", "c832", "c832_01", "c832_02", "c832_03", "c832_04", "c833", "c834", "c834_01", "c834_02", "c835", "c835_01", "c835_02", "c836", "c030_02", "c032_01", "c033", "c043", "c082_02", "c062", "c093", "c094", "c095", "c101_02", "c130_01", "c140_02", "c180_01", "c181_02", "c210_02", "c220_01", "c231_01", "c233_01", "c260_02", "c271_01", "c280_01", "c313", "c330_01", "c351_01", "c390_01", "c391_01", "c401_01", "c430_02", "c431_01", "c440", "c480", "c910_01", "c915", "c942", "c943", "c960", "c961", "c967", "c970", "c971", "c973", "c974", "c974_01", "c975", "c976", "c977", "c979", "c980", "c981", "c982", "c983", "c985", "c988", "c989", "c990", "c991", "c992", "c994", "c451_02", "c310_01", "c520", "c521", "c170_03", "c902_01", "c993", "c996", "c142"]
// Default skin being used on the player
var skin = false;
// Default skin value
var defaultskin = "default";
// Array for "bg" skin
var bgskin = ["c351_01", "c470_01", "c351", "c070_02", "c810_02", "c015", "c830_02", "c835_02", "c830_03", "c441", "c821_01", "c090_01", "c095", "c411", "c481", "c352_01", "c352_02", "c321_01", "c832_02", "c832_04", "c132", "c350_02", "c062", "c450_02", "c430_02", "c831_02", "c283", "c203", "c284", "c224"]
// Default speed value
var speed = 1;
// Default flip value
var flip = false;
// Default loop values
var loop = false;
var timer = null;
// Default position and animation value
var stance = "";
var expressionfb = "";
var expressioncover = "";
var expressionaim = "";
// Selects the canvas of the Spine player
var canvas = document.querySelector("#player-container");
// Creates the player
var reproductor = new spine.SpinePlayer("player-container", {
    skelUrl: "image/" + Character + "/"  + Character + "_00.skel",
    atlasUrl: "image/" + Character + "/"  + Character + "_00.atlas",
    skin: defaultskin,
    animation: "idle", // Initializes with the default animation
    backgroundColor: "#00000000",
    showControls: false, // Hides the Spine player controls
    alpha: true, // Does not make the background transparent
});

/**************************************************************************************************************/

/*MAIN CODE*/
window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {

            // Sets player based on the Character value
            if (properties.character){
                Character = properties.character.value;

                //Changes the Spine version based on Character value
                let spineVersionLoader;
                if (Char41.includes(Character)) {
                    spineVersionLoader = spine41
                } else {
                    spineVersionLoader = spine
                }                
                //Change defaultskin for old player models
                if (Character === "c010_01" || Character === "c907_01"){ 
                    defaultskin = "00";
                } else {
                    defaultskin = "default"
                }
                // Changes the player based on the Character value
                reproductor.dispose();
                reproductor = new spineVersionLoader.SpinePlayer("player-container", {
                    skelUrl: "image/" + Character + "/"  + Character + "_00.skel",
                    atlasUrl: "image/" + Character + "/"  + Character + "_00.atlas",
                    skin: defaultskin,
                    animation: "idle",
                    backgroundColor: "#00000000",
                    alpha: true,
                    showControls: false,
                });               
            };

            
            //Sets player based on the stance value
            if (properties.stance){
                stance = properties.stance.value;

                //Loads the expressions values from properties on startup
                if (properties.expressionfb) {
                    expressionfb = properties.expressionfb.value;
                }
                if (properties.expressioncover) {
                    expressioncover = properties.expressioncover.value;
                }
                if (properties.expressionaim) {
                    expressionaim = properties.expressionaim.value;
                }

                //Changes the Spine version based on Character value
                let spineVersionLoader;
                if (Char41.includes(Character)) {
                    spineVersionLoader = spine41
                } else {
                    spineVersionLoader = spine
                }

                // Clears loop when changing stance - Need to toggle it off/on to re-enable
                if (timer != null){
                    clearInterval(timer);
                }       
                
                // Changes the player based on the Stance value and Character value
                setTimeout(() => {
                    if (stance == "fb"){
                        reproductor.dispose();
                        reproductor = new spineVersionLoader.SpinePlayer("player-container", {
                            skelUrl: "image/" + Character + "/"  + Character + "_00.skel",
                            atlasUrl: "image/" + Character + "/"  + Character + "_00.atlas",
                            skin: defaultskin,
                            animation: expressionfb,
                            backgroundColor: "#00000000",
                            alpha: true,
                            showControls: false,
                        });
                    }
                }, 100);

                setTimeout(() => {
                    if (stance == "cover"){
                        reproductor.dispose();
                        reproductor = new spineVersionLoader.SpinePlayer("player-container", {
                            skelUrl: "image/" + Character + "/cover/"  + Character + "_cover_00.skel",
                            atlasUrl: "image/" + Character + "/cover/"  + Character + "_cover_00.atlas",
                            skin: defaultskin,
                            animation: expressioncover,
                            backgroundColor: "#00000000",
                            alpha: true,
                            showControls: false,
                        });
                    }
                }, 100);

                setTimeout(() => {
                    if (stance == "aim"){
                        reproductor.dispose();
                        reproductor = new spineVersionLoader.SpinePlayer("player-container", {
                            skelUrl: "image/" + Character + "/aim/"  + Character + "_aim_00.skel",
                            atlasUrl: "image/" + Character + "/aim/"  + Character + "_aim_00.atlas",
                            skin: defaultskin,
                            animation: expressionaim,
                            backgroundColor: "#00000000",
                            alpha: true,
                            showControls: false,
                        });                    
                    }
                }, 100);


                //Loads loop on startup if enabled
                if (properties.loop) {
                    loop = properties.loop.value;

                    if (loop == true){
                        if ( stance == "fb"){
                            timer = setInterval(function() { 
                                reproductor.setAnimation("action", false);
                                reproductor.addAnimation("idle", true, 0);
                            }, 10000);
                        }
                        if ( stance == "cover"){
                            timer = setInterval(function() { 
                                reproductor.setAnimation("cover_reload", false);
                                reproductor.addAnimation("cover_idle", true, 0);
                            }, 8000);
                        }
                        if ( stance == "aim"){
                            timer = setInterval(function() { 
                                reproductor.setAnimation("aim_fire", true);
                                setTimeout(() => {
                                    reproductor.setAnimation("aim_idle", true);
                                }, 4000);
                            }, 8000);
                        }
                    }
                };

                // Loads flip on startup if enabled
                if (properties.flip){
                    flip = properties.flip.value;
                    if (flip == true){
                        document.getElementById("player-container").style.transform = 'scale(-1, 1) rotate(0deg)';
                    }
                }

            }
            

            // Applies the scheme colour
            if (properties.schemecolor) {
                var schemeColor = properties.schemecolor.value.split(' ');
                schemeColor = schemeColor.map(function (c) {
                    return Math.ceil(c * 255);
                });
                document.body.style.backgroundColor = 'rgb(' + schemeColor + ')';
            }

            //Changes the animation of the player for Full Body
            if (properties.expressionfb) { 
                var expfb = properties.expressionfb.value;
                    switch (expfb){
                        case "idle":
                            reproductor.setAnimation("idle", true);
                            break;
                            
                        case "idle_02":
                            reproductor.setAnimation("idle_02");
                            break;  
                            
                        case "action":
                            reproductor.setAnimation("action");
                            break;
                            
                        case "angry":
                            reproductor.setAnimation("angry");
                            break;      
                            
                        case "delight":
                            reproductor.setAnimation("delight");
                            break;
                            
                        case "shy":
                            reproductor.setAnimation("shy");
                            break;
                            
                        case "surprise":
                            reproductor.setAnimation("surprise");
                            break;
                            
                        case "think":
                            reproductor.setAnimation("think");
                            break;
                            
                        case "expression_0":
                            reproductor.setAnimation("expression_0");
                            break;
                            
                        case "no":
                            reproductor.setAnimation("no");
                            break;
                            
                        case "pain":
                            reproductor.setAnimation("pain");
                            break;
                            
                        case "sad":
                            reproductor.setAnimation("sad");
                            break;
                            
                        case "smile":
                            reproductor.setAnimation("smile");
                            break;
                            
                        case "special":
                            reproductor.setAnimation("special");
                            break;
                            
                        case "good":
                            reproductor.setAnimation("good");
                            break;
                            
                        case "worry":
                            reproductor.setAnimation("worry");
                            break;
                            
                        case "void":
                            reproductor.setAnimation("void");
                            break;
                            
                        case "shy2":
                            reproductor.setAnimation("shy2");
                            break;
                            
                        case "etc":
                            reproductor.setAnimation("etc");
                            break;
                            
                        case "expression_1":
                            reproductor.setAnimation("expression_1");
                            break;
                            
                        case "rage":
                            reproductor.setAnimation("rage");
                            break;
                            
                        case "idle_alt":
                            reproductor.setAnimation("idle_alt");
                            break;
                            
                        case "expression_0_alt":
                            reproductor.setAnimation("expression_0_alt");
                            break;
                            
                        case "sleep_01":
                            reproductor.setAnimation("sleep_01");
                            break;
                            
                        case "sleep_02":
                            reproductor.setAnimation("sleep_02");
                            break;
                            
                        case "skillcut_1":
                            reproductor.setAnimation("skillcut_1");
                            break; 
                    }
            }

            //Changes the animation of the player for Cover
            if (properties.expressioncover) { 
                var expcover = properties.expressioncover.value;
                    switch (expcover){
                        case "cover_idle":
                            reproductor.setAnimation("cover_idle", true);
                            break;
                            
                        case "cover_reload":
                            reproductor.setAnimation("cover_reload");
                            break;  
                            
                        case "cover_hit":
                            reproductor.setAnimation("cover_hit");
                            break;
                            
                        case "cover_stun":
                            reproductor.setAnimation("cover_stun");
                            break;      
                            
                        case "to_aim":
                            reproductor.setAnimation("to_aim");
                            break;
                            
                        case "to_cover":
                            reproductor.setAnimation("to_cover");
                            break;
                    }
            }

            //Changes the animation of the player for Aim
            if (properties.expressionaim) { 
                var expaim = properties.expressionaim.value;
                    switch (expaim){
                        case "aim_idle":
                            reproductor.setAnimation("aim_idle", true);
                            break;
                            
                        case "aim_fire":
                            reproductor.setAnimation("aim_fire");
                            break;  
                            
                        case "aim_hit":
                            reproductor.setAnimation("aim_hit");
                            break;
                            
                        case "aim_x":
                            reproductor.setAnimation("aim_x");
                            break;      
                            
                        case "aim_y":
                            reproductor.setAnimation("aim_y");
                            break;
                            
                        case "to_aim":
                            reproductor.setAnimation("to_aim");
                            break;
                            
                        case "to_cover":
                            reproductor.setAnimation("to_cover");
                            break; 
                    }
            }

            //Reads background image selection and sets the background
            if (properties.customimage) { 
                var customimage = properties.customimage.value;
                if (customimage != "") { 
                    customimage = customimage.replace("%3A", ":");
                    document.body.style.backgroundImage = "url('" + customimage + "')";
                } else {
                    document.body.style.backgroundImage = "";
                }
            }

            //Reads video background selection and sets to background
            if (properties.videobackground) {
                 var videoBackground = properties.videobackground.value;
                 videoBackground = videoBackground.replace("%3A", ":");
                document.getElementById("video2").src = ""+videoBackground+"";
            }

            // Fits background image to screen
            if (properties.fit) {
                var fit = properties.fit.value;

                if (fit == 1) {
                    document.body.style.backgroundSize = "cover";
                    document.body.style.backgroundRepeat = "no-repeat";
                } else if (fit == 2) {
                    document.body.style.backgroundSize = "100% 100%";
                    document.body.style.backgroundRepeat = "no-repeat";
                } else if (fit == 3) {
                    document.body.style.backgroundSize = "auto";
                    document.body.style.backgroundRepeat = "repeat";
                } else {
                    document.body.style.backgroundSize = "auto";
                    document.body.style.backgroundRepeat = "no-repeat";
                }
            }

            // Anchors background image to screen
            if (properties.anchor) {
                var anchor = properties.anchor.value;
                var positions = new Array("left top",
                                          "center top",
                                          "right top",
                                          "left center",
                                          "center center",
                                          "right center",
                                          "left bottom",
                                          "center bottom",
                                          "right bottom");

                if (anchor != 10) {
                    document.body.style.backgroundPosition = positions[anchor-1];
                }
            }

            // Applies movement in X axis to the player - Uses camera to move and not canvas, added additonal values into spine-player and spiner-player4.1
            if (properties.posX) {
                posX = properties.posX.value;
                reproductor.posx = (-posX);
                //canvas.style.left = `${posX}vh`;
            }

            // Applies movement in Y axis to the player - Uses camera to move and not canvas, added additonal values into spine-player and spiner-player4.1
            if (properties.posY) {
                posY = properties.posY.value;
                reproductor.posy = (-posY);
                //canvas.style.top = `${-posY}vh`;
            }

            // Applies the size to the player - Uses camera to zoom and not canvas, added additonal values into spine-player and spiner-player4.1
            if (properties.size) {
                size = properties.size.value;
                reproductor.zoom = 10.0 / size;
                //canvas.style.width = canvas.style.height;
                //canvas.style.height = `${size * 20}vh`;
            }

            // Applies speed to the players animation
            if (properties.speed) {
                speed = properties.speed.value;
                reproductor.animationState.timeScale = speed;
            }

            // Flips the player model when selecting skin button
            if (properties.flip){
                flip = properties.flip.value;
                if (flip == true){
                    document.getElementById("player-container").style.transform = 'scale(-1, 1) rotate(0deg)';
                }
                if (flip == false){ 
                    document.getElementById("player-container").style.transform = 'scale(1, 1) rotate(-0deg)';
                }
            }


            // Changes the default skin based on player character and skin button
            if (properties.skin){
                skin = properties.skin.value;
                if (skin == true && bgskin.includes(Character)){
                    reproductor.skeleton.setSkinByName("bg");
                    reproductor.skeleton.setSlotsToSetupPose();
                }

                if (skin == true){
                    reproductor.skeleton.setSkinByName("acc");
                    reproductor.skeleton.setSlotsToSetupPose();
                }

                if (skin == false){ 
                    reproductor.skeleton.setSkinByName("default");
                    reproductor.skeleton.setSlotsToSetupPose();
                }
            }

            // Loops action animation when selecting loop button
            if (properties.loop) {
                loop = properties.loop.value;
                    
                if (loop == true){
                    if ( stance == "fb"){
                        timer = setInterval(function() { 
                            reproductor.setAnimation("action", false);
                            reproductor.addAnimation("idle", true, 0);
                        }, 10000);
                    }
                    if ( stance == "cover"){
                        timer = setInterval(function() { 
                            reproductor.setAnimation("cover_reload", false);
                            reproductor.addAnimation("cover_idle", true, 0);
                        }, 8000);
                    }
                    if ( stance == "aim"){
                        timer = setInterval(function() { 
                            reproductor.setAnimation("aim_fire", true);
                            setTimeout(() => {
                                reproductor.setAnimation("aim_idle", true);
                            }, 4000);
                        }, 8000);
                    }
                }

                if (loop == false){
                    if ( stance == "fb"){
                        clearTimeout(timer);
                        reproductor.setAnimation(expressionfb);
                    }
                    if ( stance == "cover"){
                        clearTimeout(timer);
                        reproductor.setAnimation(expressioncover);
                    }
                    if ( stance == "aim"){
                        clearTimeout(timer);
                        reproductor.setAnimation(expressionaim);
                    } 
                }

            }
    }
};


/*************************************************************************************************************************/
