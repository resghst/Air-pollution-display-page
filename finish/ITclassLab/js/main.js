$(document).ready(function() {
  //$('.dropdown-toggle').dropdown();
  var county_name = [];
  var air_type = ['CO','NO','NO2','NOx','O3','PM2_5','PM10','SO2'];
  var air_value = [];
  getCountyArray();
//============================================================
  $('.search').click(function() {
    var searchCounty = $('.county.form-control').val();
    var searchAir = $('.air.form-control').val();
    var inContext='<table class="table table-bordered"><tr><td class="taitle">城市</td><td class="taitle">站點</td><td class="taitle">'+searchAir+'</td><td class="taitle">更新時間</td></tr>';

    $.ajax({
        url: "./data/air-data.json",
        context: document.body
    }).done(function(data) {
        $( this ).addClass( "done" );
        var inputObj=data;
        //console.log(inputObj);
        $('.showArea').empty();
      $.each(inputObj,function(ik,iv){
        if(ik == 'feeds'){
          $.each(iv,function(jk,jv){
            $.each(jv,function(kk,kv){
              if(kk=='County' && kv == searchCounty ){
                var county = '<td class="'+'active'+'">'+ kv +'</td>' ;
                var site   = '<td class="'+'active'+'">'+jv['SiteName']+'　－　'+jv['SiteType']+'</td>' ;
                var air    = '<td class="'+'active'+'">'+jv[searchAir]+'</td>' ;
                var publish=  '<td class="'+'active'+'">'+ jv['PublishTime'] +'</td>' ;
                inContext=inContext+'<tr>'+county+site+air+publish+'</tr>';
                console.log(inContext);
              }
            });
          });
        }
      });
      inContext=inContext+'</table>';
      console.log(inContext);
      $('.showArea').append(inContext);
    });
  });
  

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
    var countyString ='<select class="county form-control" ><option disabled selected value>Touch　<span class="glyphicon glyphicon-menu-down"></span></option>';
    for (i = county_name.length - 1; i >= 0; i--) {
      countyString = countyString + '<option>' + county_name[i] + '</option>' ;
    }
      countyString = countyString + '</select>';
      $('.countyselect').append(countyString);
      //console.log(air_type);

    var airString='<select class="air form-control"><option disabled selected value>Touch</option>'
    for (i = air_type.length - 1; i >= 0; i--) {
      airString = airString + '<option>' + air_type[i] + '</option>' ;
    }
      airString = airString + '</select>';
      $('.airselect').append(airString);
      //console.log('OK');
  }


});