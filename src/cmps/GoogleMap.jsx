import GoogleMapReact from 'google-map-react';
import defaultRobotImg from '../assets/img/blue-robot.png'

export const GoogleMap = ({ markers, defaultLocation }) => {
    const defaultProps = {
        defaultCenter: {
            ...defaultLocation
        },
        defaultZoom: 9
    };

    const handleApiLoaded = (map, maps) => {
        const infoWindow = new maps.InfoWindow();

        markers.forEach(currMarker => {
            const img = {
                url: defaultRobotImg,
                scaledSize: new maps.Size(50, 50)
            }
            const marker = new maps.Marker({
                position: { lat: currMarker.lat, lng: currMarker.lng },
                map,
                title: currMarker.title,
                icon: img,
                animation: maps.Animation.DROP,
            });

            marker.addListener('mouseover', () => {
                marker.setAnimation(maps.Animation.BOUNCE)
                setTimeout(() => marker.setAnimation(null), 2000)

                infoWindow.setContent(marker.getTitle())
                infoWindow.open(map, marker)
            })

            marker.addListener('mouseout', function () {
                infoWindow.close()
            });

            marker.addListener('click', () => {
                map.setCenter(marker.getPosition())
                map.setZoom(12)
            })
        })
    }

    return (
        // Important! Always set the container height explicitly
        <div className="google-map" style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: '' }}
                {...defaultProps}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
            </GoogleMapReact>
        </div >
    )
}