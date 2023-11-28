import React, { Component } from "react";
import {
  FaBeer,
  FaBreadSlice,
  FaGamepad,
  FaLightbulb,
  FaParking,
  FaSwimmer,
  FaWifi,
  FaShower
} from "react-icons/fa";


export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaSwimmer />,
        title: "Swimming Pool"
      },
      {
        icon: <FaWifi />,
        title: "Free Wi-Fi"
      },
      {
        icon: <FaBreadSlice />,
        title: "Breakfast"
      },
      {
        icon: <FaShower />,
        title: "Hot Water"
      },
      {
        icon: <FaBeer />,
        title: "Strongest Beer"
      },
      {
        icon: <FaGamepad />,
        title: "Game Centre"
      },
      {
        icon: <FaLightbulb />,
        title: "No Loadshedding"
      },
      {
        icon: <FaParking />,
        title: "Free Parking"
      }
    ]
  };

  render() {
    return (
      <section className="services py-10 bg-gray-100">


        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 ">
            {this.state.services.map((item, index) => {
              return (
                <article key={index} className="service flex flex-col items-center">
                  <span className="text-4xl mb-4">{item.icon}</span>
                  <h6 className="text-xl font-semibold mb-2">{item.title}</h6>

                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}
