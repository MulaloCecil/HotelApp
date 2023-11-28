import axios from "axios";

const BASE_URL = "https://hotels-api-4ltr.onrender.com/api";

const getHotels = () => {
  const options = {
    method: "GET",
    url: `${BASE_URL}/hotels`,
    headers: {
      "X-RapidAPI-Key": "75f51407d8mshd3dd2d6598878efp1b4b57jsn8c60e9c041c0",
      "X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
    },
  };

  return axios.request(options);
};

const getHotelBySlug = (slug) => {
  const options = {
    method: "GET",
    url: `${BASE_URL}/hotels/${slug}`,
    headers: {
      "X-RapidAPI-Key": "75f51407d8mshd3dd2d6598878efp1b4b57jsn8c60e9c041c0",
      "X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
    },
  };

  return axios.request(options);
};

export { getHotels, getHotelBySlug };
