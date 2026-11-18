/*
 * Class View
 *
 * Responsabilidad:
 * - Mostrar el formulario.
 * - Mostrar las clases.
 * - Capturar las acciones del usuario.
 * - Delegar las acciones al Presenter.
 *
 * NO contiene lógica de negocio.
 */

let currentPresenter = null;

export function showclassview(
    container,
    presenter
) {
console.log("Presenter al mostrar la vista:", presenter);
    currentPresenter = presenter;

    container.innerHTML = `
        <section class="classes-container">

            <header class="page-header">
                <div>
                    <h1>Gestor Escolar para el instituto San Jeronimo</h1>
                    <p>Gestión de clases</p>
                </div>
            </header>

            <section class="class-form-container">

                <h2>Registrar clase</h2>

                <form
                    id="class-form"
                    class="class-form"
                >

                    <div class="form-group">

                        <label for="class-name">
                            Nombre de la clase
                        </label>

                        <input
                            type="text"
                            id="class-name"
                            name="name"
                            placeholder="Ej: Matemáticas"
                            required
                        >

                    </div>

                    <div class="form-group">

                        <label for="class-teacher">
                            Docente
                        </label>

                        <input
                            type="text"
                            id="class-teacher"
                            name="teacher"
                            placeholder="Ej: Carlos Pérez"
                            required
                        >

                    </div>

                    <div class="form-group">

                        <label for="class-description">
                            Descripción
                        </label>

                        <textarea
                            id="class-description"
                            name="description"
                            placeholder="Descripción de la clase"
                        ></textarea>

                    </div>

                    <div class="form-group">

                        <label for="class-date">
                            Fecha
                        </label>

                        <input
                            type="date"
                            id="class-date"
                            name="date"
                            required
                        >

                    </div>

                    <div class="form-actions">

                        <button
                            type="submit"
                            id="class-submit"
                            class="button button-primary"
                        >
                            Registrar clase
                        </button>

                        <button
                            type="button"
                            id="class-cancel"
                            class="button button-secondary"
                        >
                            Cancelar
                        </button>

                    </div>

                </form>

                <p
                    id="class-message"
                    class="form-message"
                ></p>

            </section>

            <section class="class-list-container">

                <h2>Clases registradas</h2>

                <div id="class-list">
                    <p>Cargando clases...</p>
                </div>

            </section>

            <section class="sync-status-container">

                <h5>Estado de sincronización</h5>

                <div id="sync-status">
                    <p>Comprobando sincronización...</p>
                </div>

            </section>

        </section>
    `;

    const form =document.getElementById("class-form");

    form.addEventListener("submit",async (event) => {
            event.preventDefault();
            const formData =
                new FormData(form);
            console.log("Presenter al guardar:", presenter);
            console.log("Método save:", presenter?.save);
            const classData = {

                name:
                    formData.get("name"),

                teacher:
                    formData.get("teacher"),

                description:
                    formData.get("description"),

                date:
                    formData.get("date")
            };

            await presenter.save(
                classData
            );
        }
    );

    const cancelButton =
        document.getElementById(
            "class-cancel"
        );

    cancelButton.addEventListener(
        "click",
        () => {
            presenter.clearForm();
        }
    );

    presenter.loadClasses();
}


/*
 * Renderizar lista
 */

export function renderClasses(
    classes,
    presenter,
    pending
) {

    const list = document.getElementById("class-list");
    const status = document.getElementById("sync-status");

     status.innerHTML = pending
        ? "<p>Sincronizando cambios...</p>"
        : "<p>Todo está sincronizado.</p>";

    if (!list) {
        return;
    }

    if (classes.length === 0) {

        list.innerHTML = `
            <p class="empty-message">
                No hay clases registradas.
            </p>
        `;

        return;
    }

    list.innerHTML = `
                <div> class="border rounded-3 overflow-aouto">
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre clase</th>
                            <th scope="col">Docente </th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">

                        ${classes.map((classItem, index)=>`
                            <tr>
                            <th scope="row">${ index +1}</th>
                            <td>${escapeHtml(classItem.name)}</td>
                            <td>${escapeHtml(classItem.teacher)}</td>
                            <td> ${escapeHtml(classItem.description)}</td>
                            <td>${escapeHtml(classItem.date)}</td>
                            <td> <button
                            class="button button-secondary"
                            data-action="edit"
                            data-id="${classItem.id}"
                            >
                            Editar
                            </button>
                            </td>
                            <td> <button
                            class="button button-danger"
                            data-action="delete"
                            data-id="${classItem.id}"
                            >
                            Eliminar
                            </button>
                            /td>
                            </tr>
                        `).join("")}
                        </tbody>
                    </table>
                </div>;
                    
     `
    /*
     * Eventos de Editar
     */

    list
        .querySelectorAll(
            '[data-action="edit"]'
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                async () => {

                    const id =
                        button.dataset.id;

                    const classItem =
                        classes.find(
                            item =>
                                item.id === id
                        );

                    if (classItem) {

                        presenter.edit(
                            classItem
                        );
                    }
                }
            );
        });

    /*
     * Eventos de Eliminar
     */

    list
        .querySelectorAll(
            '[data-action="delete"]'
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                async () => {

                    await presenter.delete(
                        button.dataset.id
                    );
                }
            );
        });
}


/*
 * Cargar datos en el formulario
 * durante la edición.
 */

export function fillClassForm(
    classData
) {

    document.getElementById(
        "class-name"
    ).value = classData.name;

    document.getElementById(
        "class-teacher"
    ).value = classData.teacher;

    document.getElementById(
        "class-description"
    ).value = classData.description;

    document.getElementById(
        "class-date"
    ).value = classData.date;

    document.getElementById(
        "class-submit"
    ).textContent =
        "Actualizar clase";
}


/*
 * Mostrar mensajes
 */

export function showClassMessage(
    message
) {

    const element =
        document.getElementById(
            "class-message"
        );

    if (element) {
        element.textContent = message;
    }
}


/*
 * Evitar insertar directamente
 * contenido proporcionado por el usuario
 * como HTML.
 */

function escapeHtml(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}