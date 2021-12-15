import React,{useState} from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Marker,Polyline } from "react-google-maps"
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'

const options = { closeBoxURL: '', enableEventPropagation: true };

const optionsPolyline = {
    strokeColor: 'red',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: '#085daa',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
  };

  

  const Map = (props) => {
  //   const [positions,setPositions] =useState( [{
  //     lat: 21.027763, lng: 105.834160, label: "position 1"
  //   }, {
  //     lat: 21.027763, lng: 106, label: "position 2"
  //   }, {
  //     lat: 21.127763, lng: 106.1, label: "position 3"
  //   },
  //   // {
  //   //   lat: 203.59583593019192, lng: 112.78009333955667, label: "position 3"
  //   // }
  // ])
  const [positions,setPositions] =useState({
    lat:props.lat,
    lng:props.lng,
    label:props.label
  })
    return (
      <div>
        <GoogleMap
            defaultZoom={12}
            
            defaultCenter={{ lat: 21.027763, lng: 106 }}

            onClick={(e)=>{
              // const newPositions =Array(positions.length+1).fill();
              // for(var i= 0;i<positions.length;i++)
              //   newPositions[i]=positions[i]              
              if(true)
              {
                setPositions({
                  lat:e.latLng.lat(),
                  lng:e.latLng.lng(),
                  label:'123'
                })
              }

            }}
            
          >
            {positions?(
              <Marker
              position={new window.google.maps.LatLng(positions)}
            >   
              <InfoBox
                options={options}
              >
                <>
                  <div style={{ backgroundColor: 'green', color: 'white', borderRadius:'1em', padding: '0.2em' }}>
                    {positions.label}
                  </div>
                </>
              </InfoBox>  
                      
            </Marker>
            ):null}
            {/* <Polyline
              path={positions}
              options={optionsPolyline}
            /> */}
          
        </GoogleMap>
      </div>
    );
  }
  
  export default withScriptjs(withGoogleMap(Map));
