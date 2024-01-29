import React, { useEffect, useState, useRef, memo } from "react";
import { Route } from "react-router-dom";
import { gettVehicleSnap } from "../services/snapService";
import { triggerSnap } from "../services/snapService";
import io from "socket.io-client";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
  Marker,
} from "@vis.gl/react-google-maps";

const SocketClient = (props) => {
  const { bus } = props.location.state || {}; // Add default value for destructuring
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Replace 'http://localhost:3001' with the URL where your Socket.IO server is running
    const socket = io("http://13.51.79.199:3001");

    // Event handler for receiving messages from the server
    socket.on(bus?.ThingName, (message) => {
      //console.log("Received message from server:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Event handler for connecting to the Socket.IO server
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    // Event handler for potential errors
    socket.on("error", (error) => {
      console.error("Socket.IO error:", error);
      // Handle the error as needed
    });

    // Cleanup on component unmount
    return () => {
      console.log("Disconnecting from Socket.IO server");
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures that the effect runs only once

  // Log the current state of messages whenever it changes
  useEffect(() => {
    //console.log("Current messages state:", messages);
  }, [messages]);

  //export default function LocationTracking() {
  const cent = { lat: 7.291418, lng: 80.636696 };

  return (
    <>
      <div style={{ height: "80vh", width: "100%" }}>
        <APIProvider apiKey="AIzaSyD3iZ52fsbEPy64MJPTVxJLlePde16xAMc">
          <Map
            center={cent}
            zoom={12}
            mapId="5e1c67490bdc79a3"
            fullscreenControl={false}
          >
            {messages.map((message, index) => (
              <DynamicMarker
                key={index}
                position={{ lat: message?.latitude, lng: message?.longitude }}
              />
            ))}
            {/* <AnimatedMarker positions={messages} /> */}

            <Directions endAddress={bus?.SchoolAddress} />
          </Map>
        </APIProvider>
      </div>
      <button
        type="button"
        class="btn btn-primary"
        onClick={() => triggerSnap({ thingName: bus?.ThingName })}
      >
        Snap
      </button>
      <Route
        to="/vehicleSnap"
        render={(props) => (
          <a
            href="/vehicleSnap"
            className="btn btn-primary"
            onClick={() => props.history.push("/vehicleSnap", { bus })}
          >
            See Last Snap
          </a>
        )}
      />
      <div>
        <h1>Received AWS IoT Messages:</h1>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{JSON.stringify(message)}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
//};

function Directions({ endAddress }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionService, setDirectionService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!map || !routesLibrary) return;
    setDirectionService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [map, routesLibrary]);

  useEffect(() => {
    if (!directionService || !directionsRenderer) return;

    const start = {
      location:
        "University of Peradeniya, Prof. E. O. E. Pereira Mawatha, Kandy",
      stopover: true,
    };
    const end = { location: endAddress, stopover: true };

    const waypoints = [
      //{ location: "31, Colombo Road, Piliyandala 10300", stopover: true }, // Origin
      {
        location: "Kingswood College, Randles Hill, Peradeniya Rd, Kandy 20000",
        stopover: true,
      }, // Second destination
      {
        location: "Sangaraja Mawatha, Kandy",
        stopover: true,
      }, // Second destination
      //{ location: "Maradana Rd, Colombo 01000", stopover: true }, // First destination
      // Add more waypoints with stopover: true for each
    ];

    directionService
      .route({
        origin: start.location,
        destination: end.location,
        waypoints: waypoints.map((waypoint) => ({
          location: waypoint.location,
          stopover: waypoint.stopover,
        })), // Exclude origin and destination from waypoints array
        travelMode: "DRIVING",
        provideRouteAlternatives: true,
      })
      .then((Response) => {
        directionsRenderer.setDirections(Response);
        console.log(Response);
        setRoutes(Response.routes);
      });
  }, [directionService, directionsRenderer]);

  //console.log("directionService", directionService);
  console.log(routes.selected);

  if (!leg) return null;

  return (
    <div className="card" style={{ width: "200px" }}>
      <h1>Directions</h1>
      <p1>Distance: {leg.distance.text}</p1>
      <p1>Duration: {leg.duration.text}</p1>
    </div>
  );
}

// const DynamicMarker = ({ position }) => {
//   const map = useMap();
//   const markerRef = useRef(null);

//   useEffect(() => {
//     if (!map || !position) return;

//     // Create marker if it doesn't exist
//     if (!markerRef.current) {
//       markerRef.current = new window.google.maps.Marker({
//         position,
//         map,
//       });
//     } else {
//       // Update marker position if it exists
//       markerRef.current.setPosition(position);
//     }

//     return () => {
//       // Cleanup marker on unmount
//       markerRef.current.setMap(null);
//     };
//   }, [map, position]);

//   return null; // No need to render anything for the marker
// };

// const DynamicMarker = memo(({ position }) => {
//   // Memoize the DynamicMarker component
//   const map = useMap();
//   const markerRef = useRef(null);

//   useEffect(() => {
//     if (!map || !position) return;

//     // Create marker if it doesn't exist or update position
//     if (!markerRef.current) {
//       markerRef.current = new window.google.maps.Marker({
//         position,
//         map,
//       });
//     } else {
//       markerRef.current.setPosition(position);
//     }

//     return () => {
//       // Cleanup marker on unmount
//       markerRef.current.setMap(null);
//     };
//   }, [map, position]); // Only re-run effect if map or position changes

//   return null; // No need to render anything for the marker
// });

const DynamicMarker = memo(({ position }) => {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    if (!map || !position) return;

    if (!markerRef.current) {
      markerRef.current = new window.google.maps.Marker({
        position,
        map,
      });
    } else {
      // Animate marker to new position
      animateMarker(markerRef.current, position);
    }

    return () => {
      markerRef.current.setMap(null);
    };
  }, [map, position]);

  const animateMarker = (marker, newPosition) => {
    const start = marker.getPosition();
    const end = new window.google.maps.LatLng(newPosition.lat, newPosition.lng);
    let t = 0;
    const duration = 1000; // Animation duration in milliseconds

    const animate = () => {
      if (t < duration) {
        const lat = start.lat() + ((end.lat() - start.lat()) * t) / duration;
        const lng = start.lng() + ((end.lng() - start.lng()) * t) / duration;
        const newPos = new window.google.maps.LatLng(lat, lng);
        marker.setPosition(newPos);
        t += 16; // 60 frames per second
        requestAnimationFrame(animate);
      } else {
        marker.setPosition(end);
      }
    };

    animate();
  };

  return null;
});

const AnimatedMarker = ({ positions }) => {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    if (!map || !positions || positions.length === 0) return;

    const lat = positions[positions.length - 1].latitude;
    const lng = positions[positions.length - 1].longitude;
    const lastPosition = { lat, lng };
    if (!markerRef.current) {
      markerRef.current = new window.L.Marker(lastPosition).addTo(map);
    } else {
      animateMarker(markerRef?.current, lastPosition);
    }

    return () => {
      markerRef.current.remove();
    };
  }, [map, positions]);

  const animateMarker = (marker, newPosition) => {
    const start = marker.getLatLng();
    const end = new window.L.LatLng(newPosition.lat, newPosition.lng);
    let t = 0;
    const duration = 1000; // Animation duration in milliseconds

    const animate = () => {
      if (t < duration) {
        const lat = start.lat + ((end.lat - start.lat) * t) / duration;
        const lng = start.lng + ((end.lng - start.lng) * t) / duration;
        const newPos = new window.L.LatLng(lat, lng);
        marker.setLatLng(newPos);
        t += 16; // 60 frames per second
        requestAnimationFrame(animate);
      } else {
        marker.setLatLng(end);
      }
    };

    animate();
  };

  return null;
};

export default SocketClient;
