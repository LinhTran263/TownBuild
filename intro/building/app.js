let contdiv;
let boxValue = "Message";
let wid;
let heit;
let name_input;
let building_type;
let building_choice;
let messColor = "ffffff";
let house_color = "ffffff";
let roof_color = "ffffff";

window.addEventListener('load', ()=>{
    console.log("hello");
    contdiv = document.getElementById("container1");
    wid = (contdiv.clientWidth)/1.5;
    heit = (contdiv.clientHeight)/1.5;
    console.log(wid,heit);
    let inputColor = document.getElementById("color-base");
    inputColor.addEventListener("change", ()=>{
        house_color = document.getElementById("color-base").value;
    })

    let roofColor = document.getElementById("color-roof");
    roofColor.addEventListener("change", ()=>{
        roof_color = document.getElementById("color-roof").value;
    })

    let msgColor = document.getElementById("colormsg");
    msgColor.addEventListener("change", ()=>{
        messColor = document.getElementById("colormsg").value;
    })

    
    building = document.getElementById("zodiac-select");
    building.addEventListener('change', ()=>{
        console.log("change");
        building_choice = document.getElementById("zodiac-select").value;    
        let colorB = document.getElementById("colorbase");
        let colorR = document.getElementById("colorroof");
        if(building_choice == "#designhouse"){
            colorB.style.opacity = '1';
            colorR.style.opacity = '1';
        }
        else{
            colorB.style.opacity = '0';
            colorR.style.opacity = '0';
        }    
    })

    let msgBox = document.getElementById("msg");
    msgBox.addEventListener('change', ()=>{
        boxValue = document.getElementById("msg").value;
    })

    let button = document.getElementById("submit-button");
    button.addEventListener("click", ()=>{
        name_input = document.getElementById("name").value;
        building_type = document.getElementById("zodiac-select").value;
        house_color = document.getElementById("color-base").value;
        roof_color = document.getElementById("color-roof").value;
        msg_input = document.getElementById("msg").value;
        console.log(name_input, building_type, house_color, roof_color);
        let houseObj = {
            "name": name_input,
            "type": building_type,
            "baseColor": house_color,
            "roofColor": roof_color,
            "msg": msg_input,
            "msgColor": messColor
        };

        let houseObjJSON = JSON.stringify(houseObj);
        console.log(houseObjJSON);


        fetch('/houses',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: houseObjJSON
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            //once we have confirmation that the message has been sent, get all latest messages
        })

        window.location.replace("public/index.html");

    })
});

fetch("/houses")
.then(res => res.json())
.then(data => {
    console.log(data);
})

function preload() {
    imghaunt = loadImage('public/images/haunted.jpg');
    imgblue = loadImage('public/images/blue.jpeg');
    imgred = loadImage('public/images/red.jpeg');
    imgslum = loadImage('public/images/slum.jpeg');
    imgguest = loadImage('public/images/guest.jpeg');
  }
  



function setup() {
    let canvas = createCanvas(502,568);
    canvas.parent("model1");
}
    
function draw() {
    // console.log((windowWidth/2.7)-100);
    background(255);    

    if (building_choice == ""){
        background(255);
    }
    else if (building_choice == "#hauntedhouse"){
        imghaunt.resize(502,468)
        image(imghaunt, 0, 100);
    }
    else if (building_choice == "#bluehouse"){
        imgblue.resize(502,468)
        image(imgblue, 0, 100);
    }
    else if (building_choice == "#redhouse"){
        imgred.resize(502,468)
        image(imgred, 0, 100);
    }
    else if (building_choice == "#slumhouse"){
        imgslum.resize(502,468)
        image(imgslum, 0, 100);
    }
    else if (building_choice == "#guesthouse"){
        imgguest.resize(502,468)
        image(imgguest, 0, 100);
    }

    else{
        background(255);
        fill(roof_color);
        triangle(125, 250, 375, 250, 250, 140);
        fill(house_color);
        rect(125,250,250,250);
        rect(200,350, 75,150);
        ellipse(210, 430, 10,10);    
    }
    // ellipse(60,60,30,30);
    textSize(32);
    textAlign(CENTER);
    textFont('Exo 2');
    fill(messColor);
    text(boxValue, width/2, 50);

}