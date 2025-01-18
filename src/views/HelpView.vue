<template>
  <MainLayout>
    <template #main>
      <section class="px-4 py-8 bg-gray-100 sm:px-8 lg:px-16 font-poppins">
        <div class="mx-auto space-y-12 ">
          <!-- Section for Propietario -->
          <div class="flex flex-col p-6 bg-white rounded-lg shadow-md">

            <h2 class="mb-4 text-2xl font-bold text-gray-800">Cómo crear una cuenta como Propietario</h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-1">
              <!-- Text content -->
              <div>
                <p class="mb-4 text-gray-700">
                  Si usted desea registrarse como propietario, siga estos pasos. Cada uno de ellos está diseñado para
                  garantizar que pueda unirse correctamente a su condominio virtual.
                </p>
                <ol class="pl-6 space-y-3 text-gray-700 list-decimal">
                  <li>
                    <strong>Ingrese su nombre completo:</strong> Asegúrese de escribir su nombre tal como desea que
                    aparezca
                    en el sistema. Esto ayudará a identificarlo fácilmente en el condominio.
                  </li>
                  <li>
                    <strong>Seleccione el tipo de cuenta:</strong> En este caso, elija "Propietario." Esto permitirá que
                    el
                    sistema despliegue los campos correspondientes a su perfil.
                  </li>
                  <li>
                    <strong>Ingrese el número de su departamento:</strong> Este campo es obligatorio y asegura que el
                    sistema pueda asociarlo con su ubicación dentro del condominio.
                  </li>
                  <li>
                    <strong>Ingrese el código de invitación:</strong> Este código deberá solicitarlo al administrador
                    del
                    condominio. Alternativamente, puede escanear el código QR proporcionado para rellenar los datos
                    automáticamente.
                  </li>
                  <li>
                    <strong>Complete los datos restantes:</strong> Introduzca su correo electrónico y cree una
                    contraseña
                    segura con al menos seis caracteres. Confirme su contraseña antes de continuar.
                  </li>
                  <li>
                    <strong>Finalice su registro:</strong> Una vez verificados los datos, recibirá la confirmación de
                    que su
                    cuenta ha sido creada exitosamente. ¡Bienvenido a su condominio virtual!
                  </li>
                </ol>
              </div>
            </div>
            <div class="flex items-center justify-center w-full rounded-lg">
              <img class="w-full my-5 border-2 rounded-2xl border-slate-400" src="../assets/login.png"
                alt="2PWHmEQ.md.png">
            </div>
          </div>


          <!-- Section for Administrador -->
          <div class="flex flex-col p-6 bg-white rounded-lg shadow-md">

            <h2 class="mb-4 text-2xl font-bold text-gray-800">Cómo crear una cuenta como Administrador</h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-1">
              <!-- Text content -->
              <div>
                <p class="mb-4 text-gray-700">
                  Si usted es responsable de la administración de un condominio o edificio, siga estos pasos para crear
                  su
                  cuenta como administrador.
                </p>
                <ol class="pl-6 space-y-3 text-gray-700 list-decimal">
                  <li>
                    <strong>Ingrese su nombre completo:</strong> Esto permitirá que los usuarios lo identifiquen como el
                    administrador oficial del condominio.
                  </li>
                  <li>
                    <strong>Seleccione el tipo de cuenta:</strong> Elija "Administrador" para habilitar las opciones
                    avanzadas de gestión del condominio.
                  </li>
                  <li>
                    <strong>Ingrese el nombre del condominio:</strong> Este campo puede ser reemplazado por la dirección
                    del
                    edificio si no tiene un nombre oficial.
                  </li>
                  <li>
                    <strong>Complete los datos de acceso:</strong> Introduzca su correo electrónico y cree una
                    contraseña
                    segura. Confirme la contraseña para asegurarse de que no haya errores.
                  </li>
                  <li>
                    <strong>Genere su código de invitación:</strong> Una vez completado el registro, el sistema generará
                    automáticamente un código de invitación único para su condominio. Este código podrá compartirlo con
                    los
                    propietarios para que se unan fácilmente.
                  </li>
                  <li>
                    <strong>Administre su condominio:</strong> Al iniciar sesión, tendrá acceso a herramientas avanzadas
                    para gestionar usuarios, compartir códigos, y personalizar configuraciones.
                  </li>
                </ol>
              </div>
            </div>
            <div class="flex items-center justify-center w-full rounded-lg">
              <img class="w-full my-5 border-2 rounded-2xl border-slate-400" src="../assets/loginAdmin.png" alt="">
            </div>
          </div>

        </div>



        <section class="container p-4 mx-auto space-y-8">
          <h2 class="text-2xl font-bold text-center">Como Usar</h2>
          <!-- Nueva Encuesta -->
          <article class="p-6 space-y-4 bg-white border rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold">Nueva Encuesta</h2>
            <div class="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
              <img src="../assets/nuevaEncuesta.png" alt="Imagen descriptiva de nueva encuesta"
                class="w-full rounded-lg shadow md:w-1/3">
              <p class="text-gray-700">
                Como administrador, puede crear una nueva encuesta para sus propietarios. Aquí podrá ingresar el título
                de la encuesta, una descripción breve y las opciones que considere necesarias.
                Recuerde que las encuestas se envían automáticamente a todos los propietarios registrados en su
                condominio.
                <strong>Asegúrese de que la información sea relevante y clara.</strong> Una vez que configure las
                opciones, presione el botón "Enviar Encuesta" para que sea publicada.
              </p>
            </div>
          </article>

          <!-- Nuevo Anuncio -->
          <article class="p-6 space-y-4 bg-white border rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold">Nuevo Anuncio</h2>
            <div class="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
              <img src="../assets/nuevoAnuncio.png" alt="Imagen descriptiva de nuevo anuncio"
                class="w-full rounded-lg shadow md:w-1/3">
              <p class="text-gray-700">
                La sección de nuevos anuncios permite al administrador enviar información importante a todos los
                propietarios.
                Puede ingresar un título, una categoría (como mantenimiento, eventos, avisos urgentes, etc.), una
                descripción y, opcionalmente, subir una imagen que acompañe su anuncio.
                Una vez publicado, el anuncio será visible para todos los propietarios en la sección correspondiente.
              </p>
            </div>
          </article>

          <!-- Comentarios -->
          <article class="p-6 space-y-4 bg-white border rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold">Comentarios</h2>
            <div class="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
              <img src="../assets/comentariosAdmin.png" alt="Imagen descriptiva de comentarios"
                class="w-full rounded-lg shadow md:w-1/3">
              <p class="text-gray-700">
                En esta sección, el administrador podrá ver todos los comentarios realizados por los propietarios. Cada
                comentario incluye información como el autor, la fecha y el contenido del mensaje.
                Si un comentario infringe los términos o recibe reportes por ser ofensivo, el administrador podrá
                eliminarlo de forma permanente.
                Esta acción no se puede deshacer, así que utilícela con precaución.
              </p>
            </div>
          </article>

          <!-- Encuestas -->
          <article class="p-6 space-y-4 bg-white border rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold">Encuestas</h2>
            <div class="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
              <img src="../assets/encuestasAdmin.png" alt="Imagen descriptiva de encuestas"
                class="w-full rounded-lg shadow md:w-1/3">
              <p class="text-gray-700">
                Aquí podrá gestionar todas las encuestas creadas previamente. Podrá visualizar las respuestas recibidas
                y eliminar encuestas que ya no sean necesarias.
                Esta herramienta permite tener un control completo de la interacción con los propietarios y asegura que
                solo las encuestas relevantes estén activas.
              </p>
            </div>
          </article>

          <!-- Anuncios -->
          <article class="p-6 space-y-4 bg-white border rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold">Anuncios</h2>
            <div class="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
              <img src="../assets/anunciosAdmin.png" alt="Imagen descriptiva de anuncios"
                class="w-full rounded-lg shadow md:w-1/3">
              <p class="text-gray-700">
                En esta sección podrá ver todos los anuncios creados anteriormente. Si algún anuncio ya no es relevante,
                puede eliminarlo para evitar confusiones.
                Tenga en cuenta que esta acción es irreversible y el cambio se reflejará inmediatamente en las cuentas
                de los propietarios.
              </p>
            </div>
          </article>

          <!-- Usuarios -->
          <article class="p-6 space-y-4 bg-white border rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold">Usuarios</h2>
            <div class="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
              <img src="../assets/usuariosAdmin.png" alt="Imagen descriptiva de usuarios"
                class="w-full rounded-lg shadow md:w-1/3">
              <p class="text-gray-700">
                Aquí podrá gestionar todos los usuarios de su condominio. Cada usuario se muestra en una tarjeta con
                detalles como nombre, departamento, fecha de registro y estado.
                Si un usuario está bloqueado, no podrá iniciar sesión. Usted puede habilitar o bloquear usuarios según
                sea necesario.
              </p>
            </div>
          </article>

          <!-- Reportes y Quejas -->
          <article class="p-6 space-y-4 bg-white border rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold">Reportes y Quejas</h2>
            <div class="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
              <img src="../assets/reportesAdmin.png" alt="Imagen descriptiva de reportes y quejas"
                class="w-full rounded-lg shadow md:w-1/3">
              <p class="text-gray-700">
                En esta sección podrá visualizar las quejas y reportes realizados por los propietarios. Cada reporte
                incluye detalles específicos como la categoría, descripción y fecha de creación.
                Use esta información para solucionar problemas o atender necesidades de los propietarios de forma
                eficiente.
              </p>
            </div>
          </article>

          <!-- Código de Invitación -->
          <article class="p-6 space-y-4 bg-white border rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold">Código de Invitación</h2>
            <div class="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
              <img src="../assets/invitationQr.png" alt="Imagen descriptiva de código de invitación"
                class="w-full rounded-lg shadow md:w-1/3">
              <p class="text-gray-700">
                Cada administrador tiene un código de invitación único que puede compartir con los propietarios de su
                condominio. Este código permite que los propietarios se registren fácilmente, vinculándolos
                automáticamente al condominio correspondiente.
                También puede generar un código QR para facilitar el proceso de registro.
              </p>
            </div>
          </article>
        </section>



        <section class="container hidden p-4 mx-auto space-y-8">
          <h2 class="text-2xl font-bold text-center">Propietarios</h2>
          <!-- Comentar -->
          <article class="p-6 space-y-4 bg-white border rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold">Comentar</h2>
            <div class="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
              <img src="" alt="Imagen descriptiva de comentar" class="w-full rounded-lg shadow md:w-1/3">
              <p class="text-gray-700">
                Como propietario, puede dejar sus comentarios sobre cualquier tema relacionado con el condominio. Esta
                opción permite enviar sugerencias, plantear dudas o expresar cualquier inquietud que considere
                importante.
                Asegúrese de ser claro y respetuoso, ya que estos comentarios serán visibles para los administradores.
                También puede adjuntar imágenes que apoyen su mensaje si es necesario.
              </p>
            </div>
          </article>

          <!-- Ver Comentarios -->
          <article class="p-6 space-y-4 bg-white border rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold">Ver Comentarios</h2>
            <div class="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
              <img src="" alt="Imagen descriptiva de ver comentarios" class="w-full rounded-lg shadow md:w-1/3">
              <p class="text-gray-700">
                Aquí podrá ver todos los comentarios realizados por otros propietarios en el condominio. Esta sección
                permite a los propietarios mantenerse informados sobre las preocupaciones comunes o las sugerencias de
                los demás.
                Puede consultar los comentarios de otros y si lo desea, interactuar con ellos (respondiendo o aportando
                nuevas ideas).
                Recuerde que siempre debe ser respetuoso con los demás al interactuar.
              </p>
            </div>
          </article>

          <!-- Anuncios -->
          <article class="p-6 space-y-4 bg-white border rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold">Anuncios</h2>
            <div class="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
              <img src="" alt="Imagen descriptiva de anuncios" class="w-full rounded-lg shadow md:w-1/3">
              <p class="text-gray-700">
                En esta sección se encuentran todos los anuncios importantes publicados por los administradores. Los
                anuncios pueden incluir información sobre mantenimiento, eventos o cualquier otro asunto relevante para
                todos los propietarios.
                Revise esta sección periódicamente para mantenerse al tanto de las noticias y actualizaciones en su
                condominio.
                Si algún anuncio requiere acción de su parte, se le notificará por esta vía.
              </p>
            </div>
          </article>

          <!-- Encuestas -->
          <article class="p-6 space-y-4 bg-white border rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold">Encuestas</h2>
            <div class="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
              <img src="" alt="Imagen descriptiva de encuestas" class="w-full rounded-lg shadow md:w-1/3">
              <p class="text-gray-700">
                En la sección de encuestas, los propietarios pueden participar en votaciones que los administradores
                realicen para obtener opiniones sobre diferentes temas del condominio.
                Las encuestas pueden estar relacionadas con decisiones de mantenimiento, eventos, o incluso con el
                futuro de la comunidad. Asegúrese de participar para que su voz sea escuchada.
                Los resultados de las encuestas serán visibles para todos los propietarios una vez finalizada la
                votación.
              </p>
            </div>
          </article>

          <!-- Reportes y Quejas -->
          <article class="p-6 space-y-4 bg-white border rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold">Reportes y Quejas</h2>
            <div class="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
              <img src="" alt="Imagen descriptiva de reportes y quejas" class="w-full rounded-lg shadow md:w-1/3">
              <p class="text-gray-700">
                Si como propietario tiene alguna queja o reporte relacionado con el condominio, esta es la sección donde
                podrá presentar sus inquietudes.
                Desde problemas de mantenimiento hasta comportamientos inapropiados por parte de otros propietarios,
                puede registrar su reporte para que los administradores tomen las medidas correspondientes.
                Recuerde que todas las quejas se tratarán con la mayor seriedad y de manera confidencial.
              </p>
            </div>
          </article>
        </section>

      </section>
    </template>
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '@/layouts/MainLayout.vue';


</script>

<style scoped></style>
