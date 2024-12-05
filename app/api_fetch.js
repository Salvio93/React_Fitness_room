import axios from 'axios';

export const fetchData = async (dataType, frequence,year=null,month=null,week=null,day=null) => {
  const monthList = ['Janvier', 'Fevier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
  const weekList = ['Week 1','Week 2','Week 3','Week 4','Week 5']
  const dayList =  ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche']
  try {
    console.log(dataType,frequence,year,month,week,day)
    if (dataType == "env_data"){
      const response = {temp : 22, humidity : 80, ppm : 50};
      return response;
    }

    if (dataType=="num_visits"){
      if (frequence=="yearly"){
        const response ={data:[year-2020,20,21,22,23,2,24,2,25,2,26,20]} /*await axios.get('http://192.168.1.31:9090/api/num_visits/year', { //10.0.2.2 for android
          params: { dataType, frequence, year },
        });*/
        return response; 

      }
      if (frequence=="monthly"){
        var search_month = month+1;
        const response = {data:[search_month,10,11,9,10]} /*await axios.get('http://192.168.1.31:9090/api/num_visits/month', { //10.0.2.2 for android
          params: { dataType, frequence, year,search_month },
        });*/
        return response; 

      }
      if (frequence=="weekly"){
        var search_month = monthList.indexOf(month) + 1;
        var search_week = 1 + (week*7);
        const response = {data:[search_month,search_week,15,16,13,12,14]} /* await axios.get('http://192.168.1.31:9090/api/num_visits/week', { //10.0.2.2 for android
          params: { dataType, frequence, year, search_month,search_week },
        });*/
        return response; 

      }
      if (frequence=="dayly"){
        var search_month = monthList.indexOf(month) + 1;
        var search_day = 1+day + 7*(weekList.indexOf(week));
        const response = {data: "donnée de test lololol"}/*await axios.get('http://192.168.1.31:9090/api/num_visits/day', { //10.0.2.2 for android
          params: { dataType, frequence , year,search_month,search_day},
        });*/
        return response; 

      }    
    }

    
    if (dataType=="session_time"){
      if (frequence=="yearly"){
        const response = {data : [year-2020,12,13,14,15,16,17,18,19,20,21,12]};/*await axios.get('http://192.168.1.31:9090/api/session_time/year', { //10.0.2.2 for android
          params: { dataType, frequence, year },
        });*/
        return response; 

      }
      if (frequence=="monthly"){
        var search_month = month+1;
        const response = {data:[search_month,5,6,4,5]}; /* await axios.get('http://192.168.1.31:9090/api/session_time/month', { //10.0.2.2 for android
          params: { dataType, frequence, year,search_month },
        });*/
        return response; 

      }
      if (frequence=="weekly"){
        var search_month = monthList.indexOf(month) + 1;
        var search_week = 1 + (week*7);
        const response ={data:[search_month,search_week,8,7,6,5,7]}; /* await axios.get('http://192.168.1.31:9090/api/session_time/week', { //10.0.2.2 for android
          params: { dataType, frequence, year, search_month,search_week },
        });*/
        return response; 

      }
      if (frequence=="dayly"){
        var search_month = monthList.indexOf(month) + 1;
        var search_day = 1+ day + 7*(weekList.indexOf(week));
        const response = {data:[search_month,search_day,5,5,5,5,5,5,5,0,0,0,0,0,5,5,5,5],label:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18']};/*await axios.get('http://192.168.1.31:9090/api/session_time/day', { //10.0.2.2 for android
          params: { dataType, frequence , year,search_month,search_day},
        });*/
        return response; 

      }    
      if (frequence=="session_data"){
        var search_month = monthList.indexOf(month) + 1;
        var search_day = 1+ day + 7*(weekList.indexOf(week));
        const response = {data:"test"} /*await axios.get('http://192.168.1.31:9090/api/session_time/day_raw_data', { //10.0.2.2 for android
          params: { dataType, frequence , year,search_month,search_day},
        });*/
        return response; 

      }    
    }
    
    console.log(response.data)
    
    return response; 
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


