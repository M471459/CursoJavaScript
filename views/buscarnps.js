const BotonEnviar = document.querySelector("#boton-enviar");
const Contenedor = document.querySelector("#contenedor2");
const inputs = document.querySelectorAll("input");

let empresa={
    Nombre:'',
    Promotores:0,
    Detractores:0,
    Neutros:0,
    n:0,
    nps:0
}

let $id_encuesta;

function Obtener_NPS (promotores, detractores,neutros){
    return ((promotores-detractores)/(promotores+detractores+neutros)).toFixed(2)*100
}



function Obtener_NPS (promotores, detractores,neutros){
    return ((promotores-detractores)/(promotores+detractores+neutros)).toFixed(2)*100
}

inputs.forEach((input) => {



    input.addEventListener("input", ({ target: { name, value } })=>{
    name=='Nombre'? empresa[name] = value :empresa[name]=parseInt(value)

    })
})

BotonEnviar.addEventListener("click",()=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "bearer {buC0sAX9uQB6SDRXa6iCbpHMAL-KUF0tjuvEyMplqGpCmJiXfK2KMQ8iii2ABl2mdOF6w0JIb8xEdUVz3gkbuM5e6o0zv.7FTv67PKJYifHDamBUSR0sLR7C9DU1rteC}");
        myHeaders.append("Cookie", "attr_multitouch=\"bAqulvSrbwC+FNSlUyqpeQ0d2oE=\"; cdp_seg=\"sukDPGARpF5kvgQSRKdhkWmYmtE=\"; ep201=\"tldExHz0G46g8JB26vvK9spdXFo=\"; ep202=\"u0q4Rb3T0WqMgKkkgT++ZMCCAf0=\"; ep203=\"iCUkic2ErHCBQXA08uSoR5gpImk=\"");
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        $url="https://api.surveymonkey.com/v3/surveys"
        fetch($url, requestOptions)
        .then((respuesta) => {return respuesta.json()})
        .then((data) => {
            if(empresa.Nombre=="Bata")$id_encuesta=516747415
            else if (empresa.Nombre=="Colbun")$id_encuesta=516741737
            $url_response=$url+"/"+$id_encuesta+"/responses/bulk"
      

            fetch($url_response, requestOptions)
            .then(response => response.json())
            .then(result => {

                empresa.n=result.total
                empresa.Detractores=0;
                empresa.Neutros=0;
                empresa.Promotores=0;

                for (let j=0;j<empresa.n;j++){
                    
                    const choice_id=parseInt(result.data[j].pages[0].questions[0].answers[0].text);

                    
                    if (choice_id<=6) empresa.Detractores++;
                    else if (choice_id>6 && choice_id<=8)empresa.Neutros++;
                    else empresa.Promotores++;
                    
                }

                empresa.nps=Obtener_NPS(empresa.Promotores,empresa.Detractores,empresa.Neutros)
                empresa.Detractores=(empresa.Detractores/empresa.n).toFixed(2)*100
                empresa.Neutros=(empresa.Neutros/empresa.n).toFixed(2)*100
                empresa.Promotores=(empresa.Promotores/empresa.n).toFixed(2)*100
                

                const $id_page=result.data[1].pages[0].id



                Contenedor.innerHTML=`<h8><br>Resumen de la Empresa ${empresa.Nombre}<br><br>Total Encuestados:${empresa.n}<br>Promotores: ${empresa.Promotores}%<br>Neutros: ${empresa.Neutros}%<br>Detractores: ${empresa.Detractores}%<br><b> NPS: ${empresa.nps}%</b></h1>`
                localStorage.setItem("empresa",JSON.stringify(empresa))

            })
            .catch(error => console.log('error', error));


        })
        .catch(error => console.log('error', error));

})
