import React from 'react'
import './Map.css';
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet'
import { showDataOnMap } from './utils';

function Map({ countries, casesType, center, zoom }) {
    console.log("inside map");
    console.log(countries);
    console.log("inside map");
    const position = [20.5937, 78.9629]
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {showDataOnMap(countries, casesType)}
                <Marker position={position}>
                    <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                </Marker>
                {/*Loop through countries and draw the circles*/}
            </LeafletMap>
        </div>
    )
}

export default Map
