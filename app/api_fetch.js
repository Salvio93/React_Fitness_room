import axios from 'axios';

export const fetchData = async (page, dataType, frequence) => {
  try {
    //if (dataType=="current"){}

    console.log(page,dataType,frequence)
    const response = await axios.get('http://192.168.1.31:9090/api/data', { //10.0.2.2 for android
      params: { page, dataType, frequence },
    });
    //const responselist = response.data.split(',').map(Number);
    console.log(typeof(responselist))
    /*
    if (frequence=="yearly"){
      if (dataType=="pause_time"){
        var response = {data:[page,12,13,14,15,16,17,18,19,20,21,12]}
  
        }else{
          var response = {data:[page,20,21,22,23,2,24,2,25,2,26,20]}
  
        }
    }
    if (frequence=="monthly"){
      if (dataType=="pause_time"){
      var response = {data:[page,5,6,4,5]}

      }else{
        var response = {data:[page,10,11,9,10]} //week 5 is 0 for fevr

      }
    }
    if (frequence=="weekly"){
      if (dataType=="pause_time"){
      var response = {data:[page,7,8,7,6,5,7]}

      }else{
        var response = {data:[page,14,15,16,13,12,14]}

      }
    }
    if (frequence=="dayly"){//fetch time en sec de seance

      if (dataType=="pause_time"){
      var response = {data:[page,5,5,5,5,5,5,5,5,0,0,0,0,0,5,5,5,5]}

      }else{
        var response = {data:[page,0,0,0,0,0,0,0,0,5,5,5,5,5,0,0,0,0]}

      }
    }
    */
    return responselist; 
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
