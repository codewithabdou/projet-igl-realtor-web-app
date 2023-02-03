
const autocomplete = async (adr,signal) => {
  var requestOptions = {
    method: "GET",
    signal : signal,
  };

  try {
    const data = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${adr}&apiKey=e8a43530131840008db07249e563d90f`,
      requestOptions
    );
    const res = await data.json();
    return res;
  } catch (error) {
    throw error;
  }

};

export default autocomplete;
