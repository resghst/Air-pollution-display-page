$(document).ready(function() {
  //$('.dropdown-toggle').dropdown();
  var county_name = [];
  var air_type = ['CO','NO','NO2','NOx','O3','PM2_5','PM10','SO2'];
  var air_value = [];
  getCountyArray();
//============================================================

  

//=============================================================
  function getCountyArray(){
    var i=0,county_count=0,county_flag=0;
    $.ajax({
        url: "./data/air-data.json",
        context: document.body
    }).done(function(data) {
        $( this ).addClass( "done" );
      var inputObj=data;
      console.log(inputObj);
      $.each(inputObj,function(ik,iv){
        if(ik == 'feeds'){
          $.each(iv,function(jk,jv){
            $.each(jv,function(kk,kv){
              //console.log(jv);
              if(kk=='County'){
                for(i=0;i<county_name.length;i++){
                  if(county_name[i]==kv){
                    county_flag=1;
                    }
                }
                if(county_flag==0){
                  county_name.push(kv);
                  //console.log( kv );
                }
                county_flag=0;
              }
            });
          });
        }
      });
      setingValue();
    });
  }
//=============================================================
  function setingValue(){
    var i = 0 ;
    //console.log(county_name);
    var countyString ='<select class="county form-control">';
    for (i = county_name.length - 1; i >= 0; i--) {
      countyString = countyString + '<option>' + county_name[i] + '</option>' ;
    }
      countyString = countyString + '</select>';
      $('.countyselect').append(countyString);
      //console.log(air_type);

    var airString='<select class="air form-control">'
    for (i = air_type.length - 1; i >= 0; i--) {
      airString = airString + '<option>' + air_type[i] + '</option>' ;
    }
      airString = airString + '</select>';
      $('.airselect').append(airString);
      //console.log('OK');
  }


});