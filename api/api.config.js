module.exports = {
  async headers() {   
     return [
        {
          //matching all API routes
          source: "/path*",
          headers:[
            {key: 'Access-Control-Allow-Credencials', value: true},
            {key:'Access-Control-Allow-Origin', value:'*'},
            {key:'Access-Control-Allow-Methods', value:'GET,OPTIONS,PATCH,DELETE,POST,PUT'},
            {key:"Content-Type", value:"application/json"},
            
          ]
        } 
     ]  
  }
}

