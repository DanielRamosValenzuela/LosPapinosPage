const baseUrl = process.env.APP_API_URL;

export const fetchSinToken = (endpoint, data, method = "GET") => {
  //console.log("fetch sin token", baseUrl);
  const url = `${baseUrl}/${endpoint}`; //locallhost:5000/api/....
  //console.log("url ST:", url, endpoint, data, method);
  if (method === "GET") {
    const salida = fetch(url).then((resp) => resp.json());
    //console.log('salida GET-ST:',salida);
    return salida;
    // fetch ( url )
    //         .then(( resp  ) => resp.json()) ;
  } else {
    const salida = fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    //console.log("salida POST-ST:", salida);
    return salida;
  }
};
export const fetchConToken = async (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`; //localhost:4000/api/auth....
  const token = localStorage.getItem("token") || "_"; //puede retornar un null
  // console.log('fetchConToken', url);
  if (method === "GET") {
    //con token hay que mandar los headers
    const salida = await fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": token,
      },
    });
    //.then ((resp) => resp.json());
    //console.log('salida GET-CT:',salida);
    return salida;
  } else {
    //  console.log('POST-CT:',url ,method,  JSON.stringify( data ));
    //http://localhost:5000/api/auth/orguser,POST, {email: "eramosarellano@gmail.com"} ,http://localhost:5000/api,{"email":"eramosarellano@gmail.com"}

    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data),
    });
  }
};
