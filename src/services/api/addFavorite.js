
const addFavorite = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `token ${localStorage.getItem("user_tok")}`
    );

    let data = new FormData();
    data.append('id_announcement',id)
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body : data,
      redirect: "follow",
    };
  
    try {
      const res = await fetch(
        `https://annonces-immobilieres-hadjerl.vercel.app/add_favorite/`,
        {
          ...requestOptions,
        }
      );
    } catch (error) {
      throw error;
    }
  };

export default addFavorite;