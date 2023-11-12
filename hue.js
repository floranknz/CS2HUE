const http = require('http');
const fs = require('fs');

const hueAPI = "http://192.168.1.194/api/WWNKlzc7RrWWvU8NXuUBkJCi6zt2SPsLi32Zo9EH"

const colors =
{
    "bomb": {
        "on": true,
        "colormode": "xy",
        "xy": [
            0.6904,
            0.3091
        ],
    },
    "ct": {
        "on": true,
        "colormode": "xy",
        "xy": [
			0.1553,
			0.1284
		],
    },
    "t": {
        "on": true,
        "colormode": "xy",
        "xy": [
			0.5964,
			0.3797
		],
    },
    "default": {
        "on": true,
        "colormode": "ct",
        "ct": 399,
    },
}

const cockpitLights = [];
const ambientLights = [];

async function getLightData(light) {
    try {
        const response = await fetch(`${hueAPI}/lights/${light}`);
        const body = await response.json();
        const state = body.state;
        return state;
    } catch (error) {
        console.error(error);
    }
}

function updateLightData(light, body){
    const request = fetch(`${hueAPI}/lights/${light}/state`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    })

    request.then(async response => {
        try{
            const body = await response.json();
            console.log(body);
        }catch(e){
            console.log(e);
        }
    })

}

async function blinkLight(light){
    setInterval(async () => {
        const state = await getLightData(light);
        if(state.on === true){
            updateLightData(42, { on : false });
        }else{
            updateLightData(42, { on : true });
        }
    }, 1000)
    
}

function bombPlanted(){
    updateLightData(42, colors.bomb);
    blinkLight(42);
}

function getCSGameState(){
    const request = fetch('http://localhost:8080');

    console.log(request);
}

getCSGameState();