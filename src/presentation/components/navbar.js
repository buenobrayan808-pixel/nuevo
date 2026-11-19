export function renderNavbar(container, navigate) {
    container.innerHTML= `


            <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#" data-view="home">Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#" data-view="classes">Clases</a>
                </li>
               
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Materias
                </a>
                <ul class="dropdown-menu">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#" data-view="arqui">adquitectura</a>
                </li>                    



                </ul>
                </li>
              
            </ul>
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
        </div>
        </nav>
        
 `;
 container.addEventListener("click", (event) => {
    const link = event.target.closest("[data-view]");
    
    if (!link) return;

    event.preventDefault();

    navigate(link.dataset.view);
   
 });
}


`;

container.addEventListener("click", (event) => {
    const link = event.target.closest("[data-view]");

    if (!link) return;

    event.preventDefault();
    navigate(link.dataset.viw);

});

} ` 