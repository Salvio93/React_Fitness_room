import axios from 'axios';

export const fetchData = async (page, dataType) => {
  try {
    /*const response = await axios.get(`http://your-backend-url/api/data`, {
      params: { page, type: dataType },
    });*/

      if (dataType=='pause'){ var response= {data:[page,8,7,6,5,4,3,2,1], labels:['date1','date2','date3','date4','date5','date6','date7','date8','date9']}}
      else{  var response = {data:[page,11,10,9,8,7,6,5,4,3,2,1]}
      }      

    //if dataType = pause: reponse = {data:[seance1moyenne,seance2moyenne]} ou data:[[120s,200s,250s],[...]]


    return response; 
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
