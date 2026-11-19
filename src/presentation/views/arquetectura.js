export function showArquetectura(container, navigate) {
    container.innerHTML= `

    
            <h1>apredi</h1>
        <h2>mucho</h2>
        <h3>profe</h3>
       

`;


container.addEventListener("click", (event) =>{
  console.log("entre en el navar"); 
    const  link=event.target.closest("[data-view]");

    if(!link) return;
console.log("entre en el navar222"); 
    event.preventDefault();
    navigate(link.dataset.view);

x
} ); 

}