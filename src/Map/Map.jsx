import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Marker icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Bangladesh city locations
const cities = [
 // Division level
  { name: 'Dhaka', position: [23.8103, 90.4125] },
  { name: 'Chattogram', position: [22.3569, 91.7832] },
  { name: 'Sylhet', position: [24.8949, 91.8687] },
  { name: 'Rajshahi', position: [24.3745, 88.6042] },
  { name: 'Khulna', position: [22.8456, 89.5403] },
  { name: 'Barishal', position: [22.7010, 90.3535] },
  { name: 'Rangpur', position: [25.7439, 89.2752] },
  { name: 'Mymensingh', position: [24.7471, 90.4203] },

  // Dhaka Division districts
  { name: 'Gazipur', position: [23.9999, 90.4203] },
  { name: 'Narayanganj', position: [23.6238, 90.5000] },
  { name: 'Tangail', position: [24.2513, 89.9167] },
  { name: 'Manikganj', position: [23.8617, 90.0003] },
  { name: 'Munshiganj', position: [23.5422, 90.5305] },
  { name: 'Kishoreganj', position: [24.4449, 90.7766] },
  { name: 'Narsingdi', position: [23.9322, 90.7150] },

  // Chattogram Division districts
  { name: 'Cox’s Bazar', position: [21.4272, 92.0058] },
  { name: 'Comilla', position: [23.4607, 91.1809] },
  { name: 'Feni', position: [23.0159, 91.3976] },
  { name: 'Noakhali', position: [22.8696, 91.0994] },
  { name: 'Brahmanbaria', position: [23.9571, 91.1115] },

  // Rajshahi Division districts
  { name: 'Bogura', position: [24.8510, 89.3697] },
  { name: 'Pabna', position: [24.0064, 89.2372] },
  { name: 'Natore', position: [24.4206, 88.9996] },

  // Khulna Division districts
  { name: 'Jessore', position: [23.1664, 89.2081] },
  { name: 'Satkhira', position: [22.7085, 89.0715] },
  { name: 'Bagerhat', position: [22.6516, 89.7856] },

  // Sylhet Division districts
  { name: 'Moulvibazar', position: [24.4829, 91.7774] },
  { name: 'Habiganj', position: [24.3745, 91.4155] },
  { name: 'Sunamganj', position: [25.0658, 91.3950] },
]


const CoverageMap = () => {
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden">
      <MapContainer
        center={[23.685, 90.3563]}
        zoom={7}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cities.map((city, index) => (
          <Marker key={index} position={city.position}>
            <Popup>
              📍 {city.name} <br />
              Book Delivery Available
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default CoverageMap
