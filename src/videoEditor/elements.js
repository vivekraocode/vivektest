export function element() {
    return {
        "id": null,
        "trueDuration": null,
        "trimmedDuration": null,
        "trimmedDurationStart": null,
        "startTime": null,
        "srcUrl": null,
        "srcType": null,
        "thumbnailUrl": null,
        "layer": null
    };
}

export let ElementsIdWise = {
    "video" : {
        "id" : "testing",
        "trueDuration": 6000,
        "trimmedDuration" : 6000,
        "startTime": 0,
        "srcUrl": "",
        "srcType": "video",
        "thumbnailUrl": "",
        "layer": 0
    }
}; //add id wise elements

export let ElementsLayerWise = {
    0 : ["testing"]
}; //add layer wise element id's