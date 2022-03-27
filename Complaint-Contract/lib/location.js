
'use strict'

class Location
{
    constructor({latitude, longitude})
    {
        this.latitude = parseFloat(latitude);
        this.longitude = parseFloat(longitude);
        this.getDistanceFrom();
    }

    getDistanceFrom({latitude,longitude})
    {
        const R = 6371e3; 
        const A1 = this.latitude * Math.PI/180; 
        const A2 = latitude * Math.PI/180;
        const DA = (latitude-this.latitude) * Math.PI/180;
        const DL = (longitude-this.longitude) * Math.PI/180;

        const a = Math.sin(DA/2) * Math.sin(DA/2) +
                Math.cos(A1) * Math.cos(A2) *
                Math.sin(DL/2) * Math.sin(DL/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const distance = R * c; 

        return distance;
    }
    
    

}

module.exports = Location;