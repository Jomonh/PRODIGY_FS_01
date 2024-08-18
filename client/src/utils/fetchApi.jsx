import axios from "axios";
//import React from 'react'
axios.defaults.withCredentials=true;
export default function fetchApi(url,data,successFn,failureMsg) {
    const urlHeader='http://localhost:3000'
    axios.post(urlHeader+url,data)
    .then(res=>res.data)
    .then(data=>{
        if(data.status===200){
             successFn();
        }else{
            console.log(data.msg,data.status);
            //console.log(failureMsg);
            //failureMsg(data.msg)
            //alert(data.msg)
            failureMsg(data.msg)
        }
    }).catch((err)=>{
        console.log('some error occured');
        console.log(err);
        alert('some error occured')
    })

    return 0;
}
