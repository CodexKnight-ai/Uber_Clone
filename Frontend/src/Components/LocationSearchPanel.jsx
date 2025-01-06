import React from "react";

function LocationSearchPanel(props) {
  const places = [
    {
      place: "Sabarmati Ashram",
      street: "Ashram Road",
      state: "Gujarat",
      country: "India",
    },
    {
      place: "Kankaria Lake",
      street: "Kankaria",
      state: "Gujarat",
      country: "India",
    },
    {
      place: "Sidi Saiyyed Mosque",
      street: "Lal Darwaja",
      state: "Gujarat",
      country: "India",
    },
    {
      place: "Adalaj Stepwell",
      street: "Adalaj Village",
      state: "Gujarat",
      country: "India",
    },
    {
      place: "Jama Masjid",
      street: "Manek Chowk",
      state: "Gujarat",
      country: "India",
    },
    {
      place: "Science City",
      street: "Science City Road",
      state: "Gujarat",
      country: "India",
    },
    {
      place: "Law Garden",
      street: "Netaji Road, Ellisbridge",
      state: "Gujarat",
      country: "India",
    },
    {
      place: "Akshardham Temple",
      street: "Sector 20, Gandhinagar",
      state: "Gujarat",
      country: "India",
    },
    {
      place: "Auto World Vintage Car Museum",
      street: "Dastan Estate, Sardar Patel Ring Road",
      state: "Gujarat",
      country: "India",
    },
    {
      place: "Bhadra Fort",
      street: "Court Road, Bhadra",
      state: "Gujarat",
      country: "India",
    },
    {
      place: "Ellis Bridge",
      street: "Ellisbridge",
      state: "Gujarat",
      country: "India",
    },
    {
      place: "Sarkhej Roza",
      street: "Sarkhej Makarba Road",
      state: "Gujarat",
      country: "India",
    },
    {
      place: "Gandhi Ashram Museum",
      street: "Ashram Road, Sabarmati",
      state: "Gujarat",
      country: "India",
    },
    {
      place: "Vastrapur Lake",
      street: "Vastrapur",
      state: "Gujarat",
      country: "India",
    },
    {
      place: "Ahmedabad One Mall",
      street: "Vastrapur",
      state: "Gujarat",
      country: "India",
    },
    {
      place: "Heritage Walk",
      street: "Old Ahmedabad",
      state: "Gujarat",
      country: "India",
    },
    {
      place: "Gujarat Vidyapith",
      street: "Ashram Road",
      state: "Gujarat",
      country: "India",
    },
    {
      place: "Lalbhai Dalpatbhai Museum",
      street: "Navrangpura",
      state: "Gujarat",
      country: "India",
    },
    {
      place: "Kamla Nehru Zoo",
      street: "Kankaria",
      state: "Gujarat",
      country: "India",
    },
    {
      place: "Calico Museum of Textiles",
      street: "Shahibaug",
      state: "Gujarat",
      country: "India",
    },
  ];

  return (
    <div className="overflow-y-scroll">
      {places.map(function (elem, idx) {
        return (
          <div
            key={idx}
            onClick={() => {
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
            }}
            className=" flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{`${elem.place}, ${elem.street}, ${elem.state},${elem.country}`}</h4>
          </div>
        );
      })}
    </div>
  );
}

export default LocationSearchPanel;
