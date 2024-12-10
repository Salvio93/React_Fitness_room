import axios from 'axios';

export const fetchData = async (dataType, frequence,year=0,month=1,week=1,day=1) => {
  const monthList = ['Janvier', 'Fevier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
  const weekList = ['Week 1','Week 2','Week 3','Week 4','Week 5']
  const dayList =  ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche']
  const ip = "http://192.168.70.39:9000/api/"
  try {
    console.log(dataType,frequence,year,month,week,day)
    
    if (dataType == "air_quality"){
      /*const response = {
        env_data: {
          temperature: 22,
          humidity: 80,
          particulate: 50
        }
      }*/
        const response = await axios.get(ip+'air_quality', { 
          params: {},
        });
        console.log(response.data)

      return response.data;
    }

    if (dataType=="num_visits"){
      if (frequence=="yearly"){
        if (month < 10){
          month = "0"+month
        }
        if (day < 10){
          day = "0"+day
        }
        var date = year+"-"+month+"-"+day+"T00:00:00"
        /*const response = {
          num_visits_year : {
            year : year,
            year_count : 250,
            monthly_count : [year-2000,20,21,22,23,2,24,2,25,2,26,20]
          }
        }*/
        const response = await axios.get(ip+'number_of_sessions', { 
          params: { Frequency : "Year", UserID: 1 , Date : date},
        });
        console.log(response.data)

        return response.data; 

      }
      if (frequence=="monthly"){
        var search_month = month-1 + 2;

        if (search_month < 10){
          search_month = "0"+search_month
        }
        if (day < 10){
          day = "0"+day
        }
        var date = year+"-"+search_month+"-"+day+"T00:00:00"

        /*const response = {
          num_visits_month : {
            year : 2024,
            month : 12,
            month_count : 12,
            weekly_count : [search_month,4,2,2,4]
        
          }
        } */
        const response = await axios.get(ip+'number_of_sessions', { 
          params: { Frequency : "Month", UserID: 1 , Date : date},
        });
        return response.data; 

      }
      if (frequence=="weekly"){
        var search_month = monthList.indexOf(month) + 1;
        var search_week = 1 + (week*7);

        if (search_month < 10){
          search_month = "0"+search_month
        }
        if (search_week < 10){
          search_week = "0"+search_week
        }

        var date = year+"-"+search_month+"-"+search_week+"T00:00:00"
        
        /*const response = {
          num_visits_week : {
            year : 2024,
            month : 12, 
            week : 2,
            week_count : 4,
            daily_count : [search_month,search_week,1,0,2,1,0]
        
          }*/
        }
        const response = await axios.get(ip+'number_of_sessions', { 
          params: { Frequency : "Week", UserID: 1 , Date : date},
        });
        return response.data; 

      }
      if (frequence=="daily"){
        console.log("-------------------------------------------")
        var search_month = monthList.indexOf(month) + 1;
        var search_day =  day-1+2 + (7*(weekList.indexOf(week)));

        if (search_month < 10){
          search_month = "0"+search_month
        }
        if (search_day < 10){
          search_day = "0"+search_day
        }
        var date = year+"-"+search_month+"-"+search_day+"T00:00:00"

        /*const response = {
          exo_time_day: {
            year: year,
            month: search_month,
            day: search_day,
            day_avg: "15min+20min / 2 sessions",
            sessions: [
              {
                session_duration: "session.endDate - session.beginDate",
                env_data: {
                  temperature: 20,
                  humidity: 10,
                  particulate: 15
                },
                sets: [
                  {
                    weight: 20,
                    rep: 12,
                    set_time: "set.endDate - set.beginDate",
                    distance: [0,3,5,5,6,7,8,6,5,2,0,0,0,0,2,5,5,5],
                    times: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18']
                  },
                  {
                    weight: 25,
                    rep: 10,
                    set_time: "set.endDate - set.beginDate",
                    distance: [0,2,8,8,8,7,6,4,2,0,0,0,0,0,3,8],
                    times: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16']
                  }
                ]
              },
              {
                session_duration: "session.endDate - session.beginDate",
                env_data: {
                  temperature: 21,
                  humidity: 11,
                  particulate: 16
                },
                sets: [
                  {
                    weight: 10,
                    rep: 20,
                    set_time: "set.endDate - set.beginDate",
                    distance: [0,2,2,3,4,5,4,2,2,0,0,0,0,0,2,2],
                    times: ['1','2','3','4','5','6','7','8','9','10','11','12']
                  }
                ]
              }
            ]
          }
        }  */
        
        
        
        const response = await axios.get(ip+'session_data/detailed', { 
          params: {  Frequency : "Day", UserID: 1 , Date : date},
        });
        return response.data; 

      }    
    

    
    if(dataType=="exo_time"){
      if (frequence=="yearly"){
        if (month < 10){
          month = "0"+month
        }
        if (day < 10){
          day = "0"+day
        }
        var date = year+"-"+month+"-"+day+"T00:00:00"
        console.log(date)
        /*const response = {
          exo_time_year : {
            year : 2024,
            year_moy : "14:23",
            monthly_moy : [year-2000,12,13,14,15,16,17,18,19,20,21,12] //moyenne = end-begin de chaque set
          }
        }*/
          const response = await axios.get(ip+'mean_exercise_time', { 
            params: { Frequency : "Year", UserID: 1 , Date : date},
          });

          
          console.log(response.data);
          return response.data;

      }
      if (frequence=="monthly"){
        var search_month = month-1 +2;
        if (search_month < 10){
          search_month = "0"+search_month
        }
        if (day < 10){
          day = "0"+day
        }
        var date = year+"-"+search_month+"-"+day+"T00:00:00"
        /*const response = {
          exo_time_month : {
            year : 2024,
            month : 10,
            month_moy : "5:30",
            weekly_moy : [search_month,5,6,4,5]
        
          }
        }*/
        const response = await axios.get(ip+'mean_exercise_time', { 
          params: { Frequency : "Month", UserID: 1 , Date : date},
        });
        return response.data; 

      }
      if (frequence=="weekly"){
        var search_month = monthList.indexOf(month) + 1;
        var search_week = 1 + (week*7);


        if (search_month < 10){
          search_month = "0"+search_month
        }
        if (search_week < 10){
          search_week = "0"+search_week
        }
        var date = year+"-"+search_month+"-"+search_week+"T00:00:00"

        /*const response = {
          exo_time_week : {
            year : 2024,
            month : 12,
            week : 1,
            week_moy : "6:30",
            daily_moy : [search_month,search_week,8,7,6,5,7]
        
          }
        }*/
        const response = await axios.get(ip+'mean_exercise_time', { 
          params: { Frequency : "Week", UserID: 1 , Date : date},
        });
        return response.data; 

      }
      if (frequence=="daily"){
        var search_month = monthList.indexOf(month) + 1;
        var search_day =  day-1+2 + (7*(weekList.indexOf(week)));

        if (search_month < 10){
          search_month = "0"+search_month
        }
        if (search_day < 10){
          search_day = "0"+search_day
        }
        var date = year+"-"+search_month+"-"+search_day+"T00:00:00"

        /*const response = {
          exo_time_day: {
            year: year,
            month: search_month,
            day: search_day,
            day_avg: "15min+20min / 2 sessions",
            sessions: [
              {
                session_duration: "session.endDate - session.beginDate",
                env_data: {
                  temperature: 20,
                  humidity: 10,
                  particulate: 15
                },
                sets: [
                  {
                    weight: 20,
                    rep: 12,
                    set_time: "set.endDate - set.beginDate",
                    distance: [0,2,5,5,6,7,8,6,5,2,0,0,0,0,2,5,5,5],
                    times: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18']
                  },
                  {
                    weight: 25,
                    rep: 10,
                    set_time: "set.endDate - set.beginDate",
                    distance: [0,2,8,8,8,7,6,4,2,0,0,0,0,0,3,8],
                    times: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16']
                  }
                ]
              },
              {
                session_duration: "session.endDate - session.beginDate",
                env_data: {
                  temperature: 21,
                  humidity: 11,
                  particulate: 16
                },
                sets: [
                  {
                    weight: 10,
                    rep: 20,
                    set_time: "set.endDate - set.beginDate",
                    distance: [0,search_day,2,3,4,5,4,2,2,0,0,0,0,0,2,2],
                    times: ['1','2','3','4','5','6','7','8','9','10','11','12']
                  }
                ]
              }
            ]
          }
        }  */
        const response = await axios.get(ip+'session_data/detailed', { 
          params: { Frequency : "Day", UserID: 1 , Date : date},
        });
        return response.data; 

      }    
      if (frequence=="last"){
        /*const response = {
          exo_time_day: {
            year: year,
            month: search_month,
            day: search_day,
            day_avg: "15min+20min / 2 sessions",
            sessions: [
              {
                session_duration: "session.endDate - session.beginDate",
                env_data: {
                  temperature: 20,
                  humidity: 10,
                  particulate: 15
                },
                sets: [
                  {
                    weight: 20,
                    rep: 12,
                    set_time: "set.endDate - set.beginDate",
                    distance: [0,2,5,5,6,7,8,6,5,2,0,0,0,0,2,5,5,5],
                    times: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18']
                  },
                  {
                    weight: 25,
                    rep: 10,
                    set_time: "set.endDate - set.beginDate",
                    distance: [0,2,8,8,8,7,6,4,2,0,0,0,0,0,3,8],
                    times: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16']
                  }
                ]
              },
              {
                session_duration: "session.endDate - session.beginDate",
                env_data: {
                  temperature: 21,
                  humidity: 11,
                  particulate: 16
                },
                sets: [
                  {
                    weight: 10,
                    rep: 20,
                    set_time: "set.endDate - set.beginDate",
                    distance: [0,search_day,2,3,4,5,4,2,2,0,0,0,0,0,2,2],
                    times: ['1','2','3','4','5','6','7','8','9','10','11','12']
                  }
                ]
              }
            ]
          }
        }  */
        
        const response = await axios.get(ip+'session_data/detailed', { 
            params: { Frequency : "Day", UserID: 1 , Date : date},
          });
          return response.data; 

      }  
        
    }
    
    
    return response; 
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

