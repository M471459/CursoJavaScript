
const BotonEnviar = document.querySelector("#boton-enviar");
const Contenedor = document.querySelector("#contenedor");
const inputs = document.querySelectorAll("input");



let empresa={
    Nombre:'',
    Promotores:0,
    Detractores:0,
    Neutros:0,
    n:0,
    nps:0
}

function Obtener_NPS (promotores, detractores,neutros){
    return (promotores-detractores)/promotores+detractores+neutros
}

inputs.forEach((input) => {
    input.addEventListener("input", ({ target: { name, value } })=>{
    name=='Nombre'? empresa[name] = value :empresa[name]=parseInt(value)

    })
})

BotonEnviar.addEventListener("click",()=>{
    empresa.nps=Obtener_NPS(empresa.Promotores,empresa.Detractores,empresa.Neutros).toFixed(2)
    empresa.n=empresa.Promotores+empresa.Neutros+empresa.Detractores
    empresa.Promotores=(empresa.Promotores/empresa.n).toFixed(2)*100
    empresa.Detractores=(empresa.Detractores/empresa.n).toFixed(2)*100
    empresa.Neutros=(empresa.Neutros/empresa.n).toFixed(2)*100
    Contenedor.innerHTML=`<h8><br>Resumen de la Empresa ${empresa.Nombre}<br><br>Promotores: ${empresa.Promotores}%<br>Neutros: ${empresa.Neutros}%<br>Detractores: ${empresa.Detractores}%<br><b> NPS: ${empresa.nps}%</b></h1>`
    localStorage.setItem("empresa",JSON.stringify(empresa))
})




/*
function Empresa(nombre,promotores,detractores,pasivos,n){
    this.nombre=nombre
    this.promotores=promotores;
    this.detractores=detractores;
    this.pasivos=pasivos;
    this.n=n;
    this.nps=((promotores/n-detractores/n)*100).toFixed(2)  
    this.resultados=function(){console.log("Empresa: "+this.nombre+"\n"+"Promotores: "+this.promotores+"\n"+"Detractores: "+this.detractores+"\n"+"Pasivos: "+this.pasivos+"\n"+"NPS: "+this.nps+"%\n")}
}

function AgregarEncuestados(N){
    for (let j=0;j<N;j++){
        let nombre=prompt("Ingrese nombre de la Empresa N°"+(j+1)+":")
        let n=parseInt(prompt("¿Cuántos usuarios fueron encuestados en "+nombre+"?"))
        const elem=new Array(n)
        let promotores=0
        let pasivos=0
        let detractores=0
        for(let i=0;i<n;i++)
        {   
            elem[i]=parseInt(prompt("Ingrese la evaluación número "+(i+1)+" (notas de 0 a 10)"));
            if(elem[i]>8)promotores++
            else if (elem[i]>6 && elem[i]<9) pasivos++
            else detractores++ 
        }
        ArrayEmpresas[j]=new Empresa(nombre,promotores,detractores, pasivos,n);
    }
    return ArrayEmpresas;
}



console.log("Este es una calculadora de NPS (Net Promoter Score)")
let nempresas=parseInt(prompt("¿Cuantas Empresas quiere ingresar y evaluar?"))


let ArrayEmpresas=new Array(nempresas)
ArrayEmpresas=AgregarEncuestados(nempresas)


console.log("¿Que desea conocer del Benchmark? Seleccione una de las siguientes opciones:"+"\n"+
"1. Total de Empresas Encuestadas\n"+"2. Promedio de las Empresas Encuestadas\n"+"3. Buscar Resultados de Empresa por Número de Empresa\n"+"4.Buscar Resultados de Empresa por Nombre\n")
let opcion=parseInt(prompt("Seleccione Opción:"))
switch(opcion){
    case 1:
        console.log("La cantidad de empresas participantes es de:"+ArrayEmpresas.length)
        break
    case 2:
         let suma=0   
         for (k=0;k<ArrayEmpresas.length;k++){
            suma=ArrayEmpresas[k].nps
         }
         promedio=suma/ArrayEmpresas.length   
         console.log("El promedio del NPS de las empresas participantes es de: "+promedio)
         break
    case 3:
        let res=parseInt(prompt("Indique el número de la Empresa que desea conocer su NPS"))
        console.log("Estos son los resultados de la empresa "+res)
        ArrayEmpresas[res-1].resultados()
        break
    case 4:
        let  resNombre=prompt("Indique el número de la Empresa que desea conocer su NPS")
        const found = ArrayEmpresas.find((element) => element.nombre === resNombre)
        console.log("Empresa: "+found.nombre+"\n"+"Promotores: "+found.promotores+"\n"+"Detractores: "+found.detractores+"\n"+"Pasivos: "+found.pasivos+"\n"+"NPS: "+found.nps+"%\n")
         break
*/
        /*case 4:
        let nombre=prompt("Ingrese nombre de la Nueva Empresa:")
        let n=parseInt(prompt("¿Cuántos usuarios fueron encuestados en "+nombre+"?"))
        const elem=new Array(n)
        let promotores=0
        let pasivos=0
        let detractores=0
        for(let i=0;i<n;i++)
        {   
            elem[i]=parseInt(prompt("Ingrese la evaluación número "+(i+1)+" (notas de 0 a 10)"));
            if(elem[i]>8)promotores++
            else if (elem[i]>6 && elem[i]<9) pasivos++
            else detractores++ 
        }
        ArrayEmpresas.push(new Empresa(nombre,promotores,detractores, pasivos,n));
        console.log("Estos son los resultados de la nueva empresa agregada:")
        ArrayEmpresas[ArrayEmpresas.length-1].resultados();
        break;

    case 5:
        let eliminar=parseInt(prompt("¿Cuál empresa desea eliminar?"))
        console.log("La empresa "+eliminar+ " fue eliminada con los siguientes valores:")
        ArrayEmpresas[eliminar-1].resultados();
        ArrayEmpresas.slice(eliminar-1,1);
*/
    //}