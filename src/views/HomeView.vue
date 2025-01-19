<template>
  <div class="">
    <MainLayout>
      <template #main>
        <section
          class="relative z-10 flex flex-col items-center justify-center min-h-screen bg-center bg-cover font-poppins lg:flex-row lg:items-start"
          style="background-image: url('https://images.unsplash.com/photo-1554902843-260acd0993f8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');">
          <section class="absolute top-0 left-0 w-full h-full bg-black opacity-50 -z-10"></section>

          <!-- Contenedor de imágenes -->
          <!-- <div class="flex"> -->
          <div class="grid grid-cols-2 gap-4 p-4 md:w-1/2 lg:grid-cols-2 ">
            <img alt="I 1" class="w-full max-w-md mx-auto border-2 border-white rounded-3xl"
              src="https://images.pexels.com/photos/4240571/pexels-photo-4240571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <img alt="I 2" class="w-full max-w-md mx-auto border-2 border-white rounded-3xl"
              src="https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600" />
            <img alt="I 3" class="w-full max-w-md mx-auto border-2 border-white rounded-3xl"
              src="https://images.pexels.com/photos/7433832/pexels-photo-7433832.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
            <img alt="I 4" class="w-full max-w-md mx-auto border-2 border-white rounded-3xl"
              src="https://images.pexels.com/photos/7433825/pexels-photo-7433825.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
            <div v-if="!sysVals().getIsUserAuth"
              class="flex justify-between w-full col-span-2 space-x-4 md:col-span-2 mt-9">
              <RouterLink :to="{ name: 'login' }" class="px-4 py-2 text-xl text-white rounded bg-sky-800">
                Iniciar Sesión
              </RouterLink>
              <RouterLink :to="{ name: 'register' }" class="px-4 py-2 text-xl bg-white rounded text-sky-800">
                Registrarse
              </RouterLink>
            </div>
          </div>

          <!-- Contenido de texto -->
          <div class="p-4 text-white md:w-1/2 lg:w-1/2">
            <h1 class="mb-4 text-3xl font-bold md:text-4xl">
              Historias y Gestión de Condominios
            </h1>

            <p class="mb-4">
              Bienvenido a una plataforma diseñada tanto para administradores como para propietarios de edificios o
              condominios. Nuestro objetivo es ofrecerte herramientas innovadoras y una comunidad activa para mejorar la
              gestión y convivencia en tu condominio.
            </p>

            <h2 class="mb-2 text-2xl font-bold">Para administradores:</h2>
            <ul class="mb-4 ml-4 list-disc list-inside">
              <li>Crear reportes detallados sobre la administración.</li>
              <li>Publicar avisos y anuncios para mantener informados a los propietarios.</li>
              <li>Gestionar encuestas y recibir retroalimentación de los residentes.</li>
              <li>Monitorear el progreso y resolver problemas reportados.</li>
            </ul>

            <h2 class="mb-2 text-2xl font-bold">Para propietarios:</h2>
            <ul class="mb-4 ml-4 list-disc list-inside">
              <li>Levantar reportes para problemas o necesidades de tu condominio.</li>
              <li>Comentar y dar seguimiento a los temas que afectan a tu comunidad.</li>
              <li>Participar en encuestas organizadas por los administradores.</li>
              <li>Presentar quejas y dar retroalimentación de manera directa.</li>
            </ul>

            <p class="mb-8">
              Ya seas administrador o propietario, nuestra plataforma está diseñada para facilitar la comunicación,
              mejorar la administración y construir una mejor comunidad. ¡Únete y sé parte del cambio!
            </p>


          </div>
        </section>


        <section class="container px-4 py-2 mx-auto font-poppins">
          <div class="grid grid-cols-1 gap-6 p-4 px-2 my-4 md:grid-cols-3 font-poppins">
            <div class="p-4 bg-white border border-red-800 rounded-lg shadow-md card">
              <h3 class="text-xl font-semibold text-red-800">Conocer Experiencias Similares</h3>
              <hr class="my-2">
              <p class="text-sm">Aquí puedes leer lo que otros usuarios han experimentado con sus administradores de
                edificios o condominios. Comparten sus historias para ayudar a otros a mejorar la convivencia en sus
                lugares.</p>
              <ul class="pl-5 mt-2 list-disc">
                <li>Administración eficiente y amigable.</li>
                <li>Comodidad en la gestión de pagos.</li>
                <li>Falta de comunicación en ocasiones.</li>
                <li>Atención rápida a las solicitudes.</li>
                <li>Excelente trato a los inquilinos/propietarios.</li>
              </ul>
              <img
                src="https://images.pexels.com/photos/1647919/pexels-photo-1647919.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Imagen ejemplo" class="mt-4 rounded-lg ">
            </div>

            <div class="p-4 bg-white border rounded-lg shadow-md border-sky-800 card">
              <h3 class="text-xl font-semibold text-sky-800">Compartir Experiencias Propias</h3>
              <hr class="my-2">
              <p class="text-sm">Comparte lo que has vivido con tu administrador de edificio o condominio. Tus
                experiencias pueden ser útiles para otros usuarios que buscan una gestión más efectiva.</p>
              <ul class="pl-5 mt-2 list-disc">
                <li>Buena disposición para resolver problemas.</li>
                <li>Se tarda en responder a las peticiones.</li>
                <li>Desorganización en la gestión de espacios comunes.</li>
                <li>Ayuda constante para mejorar las instalaciones.</li>
                <li>Proceso de renovación complicado.</li>
              </ul>
              <img
                src="https://images.pexels.com/photos/1181619/pexels-photo-1181619.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Imagen ejemplo" class="w-full mt-4 rounded-lg">
            </div>

            <div class="p-4 bg-white border rounded-lg shadow-md border-emerald-800 card">
              <h3 class="text-xl font-semibold text-emerald-800">Comentar las Administraciones</h3>
              <hr class="my-2">
              <p class="text-sm">En esta sección puedes leer sobre las vivencias de otros con sus administradores. Aquí
                también puedes dejar tu comentario y compartir lo que te ha pasado.</p>
              <ul class="pl-5 mt-2 list-disc">
                <li>Administradores amables pero poco efectivos.</li>
                <li>Mal manejo de conflictos entre inquilinos/propietarios.</li>
                <li>Responsables, pero carecen de recursos.</li>
                <li>Gran atención a las quejas, pero soluciones lentas.</li>
                <li>Organización mejorable.</li>
              </ul>
              <img
                src="https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Imagen ejemplo" class="w-full mt-4 rounded-lg">
            </div>
          </div>
        </section>

        <section class="container px-4 py-2 mx-auto font-poppins">


          <!-- Título largo centrado -->
          <h2 class="mt-10 text-2xl font-bold text-center">Comparte tu experiencia y ayuda a los demás</h2>

          <!-- Resumen largo con palabras clave remarcadas -->
          <p class="mt-4 text-lg text-justify">
            ¿Tienes algo que contar sobre tu administrador o las personas encargadas de gestionar tu edificio o
            condominio? ¡Comparte tu <strong class="text-sky-800">historia</strong> y ayuda a mejorar el proceso de
            administración! Cada experiencia es valiosa para crear un mejor ambiente. Si has tenido problemas de <strong
              class="text-sky-800">comunicación</strong> o simplemente quieres recomendar algún <strong
              class="text-sky-800">consejo</strong> que podría mejorar la convivencia, no dudes en dejar tu opinión. Lo
            que hagas ayudará a otros a tener una <strong class="text-sky-800">mejor</strong> experiencia. Tu
            participación es importante y se agradece enormemente.
          </p>

          <!-- Tarjetas de administradores -->
          <div class="grid grid-cols-1 gap-6 py-3 md:grid-cols-3 font-poppins">
            <!-- Card 1 -->
            <div class="p-4 bg-white border rounded-lg shadow-md border-emerald-800">
              <h3 class="mb-2 text-xl font-semibold text-emerald-800">Compromiso con la Comunidad</h3>
              <hr class="mb-4 border-t-2 border-gray-300">
              <ul class="pl-5 space-y-2 list-disc">
                <li>Nuestro objetivo es asegurar que todos los inquilinos/propietarios se sientan cómodos y escuchados.
                </li>
                <li>La comunicación constante es clave para mejorar la experiencia en el edificio.</li>
                <li>Estamos disponibles para resolver problemas de manera rápida y eficiente.</li>
                <li>Fomentamos un ambiente de respeto mutuo entre todos los residentes.</li>
                <li>Nos aseguramos de que las áreas comunes estén siempre en condiciones óptimas.</li>
              </ul>
              <img class="w-full mt-4 rounded-lg"
                src="https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Imagen de comunidad">
            </div>

            <!-- Card 2 -->
            <div class="p-4 bg-white border rounded-lg shadow-md border-emerald-800">
              <h3 class="mb-2 text-xl font-semibold text-emerald-800">Experiencias Positivas con el Mantenimiento</h3>
              <hr class="mb-4 border-t-2 border-gray-300">
              <ul class="pl-5 space-y-2 list-disc">
                <li>Las reparaciones se realizan de forma eficiente y en el menor tiempo posible.</li>
                <li>Siempre trabajamos con profesionales certificados para garantizar la calidad del servicio.</li>
                <li>Mantenemos una lista de pendientes actualizada para que no se nos pase ningún detalle.</li>
                <li>Nos aseguramos de que las instalaciones sean seguras para todos los residentes.</li>
                <li>Nos comprometemos a realizar mejoras continuas basadas en las necesidades de la comunidad.</li>
              </ul>
              <img class="w-full mt-4 rounded-lg"
                src="https://images.pexels.com/photos/3184395/pexels-photo-3184395.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Imagen de mantenimiento">
            </div>

            <!-- Card 3 -->
            <div class="p-4 bg-white border rounded-lg shadow-md border-emerald-800">
              <h3 class="mb-2 text-xl font-semibold text-emerald-800">La Atención al Inquilino es Nuestra Prioridad</h3>
              <hr class="mb-4 border-t-2 border-gray-300">
              <ul class="pl-5 space-y-2 list-disc">
                <li>Valoramos la retroalimentación de los inquilinos/propietarios para mejorar continuamente.</li>
                <li>Nos aseguramos de que todas las solicitudes sean atendidas con prontitud.</li>
                <li>Fomentamos un diálogo abierto para solucionar cualquier inconveniente rápidamente.</li>
                <li>Nos adaptamos a las necesidades individuales para ofrecer un mejor servicio.</li>
                <li>Estamos comprometidos en crear un ambiente armónico donde todos puedan sentirse cómodos.</li>
              </ul>
              <img class="w-full mt-4 rounded-lg"
                src="https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Imagen de atención">

            </div>
          </div>

          <!-- Título y resumen final -->
          <div class="mt-10 text-center font-poppins">
            <h2 class="text-2xl font-semibold">Tu Opinión Es Importante</h2>
            <p class="mt-4 text-base">
              Nos encantaría conocer tu experiencia como inquilino en este edificio. Valoramos cada comentario y
              buscamos mejorar
              constantemente nuestros servicios para garantizar que cada uno de nuestros residentes se sienta cómodo y
              bien atendido.
              <strong class="text-sky-800">Tu feedback</strong> es fundamental para seguir creciendo juntos como
              comunidad.
              Gracias por ser parte de este proyecto.
            </p>
          </div>
        </section>

        <section class="py-12 bg-gray-100 font-poppins">
          <div class="container px-6 mx-auto">
            <!-- Título y Resumen -->
            <div class="flex items-center justify-between space-x-6">
              <!-- Left Section -->
              <div class="flex flex-col items-center w-full md:w-2/3 ">
                <h2 class="mb-4 text-3xl font-semibold text-emerald-800">Gestiona Mejor tus Inquilinos/Propietarios</h2>
                <p class="mb-6 text-lg">
                  ¿Deseas tener un mejor control y gestionar de forma más eficiente tus inquilinos/propietarios? Aquí
                  mismo, puedes crear una cuenta y empezar a aprovechar las herramientas que te permitirán mejorar la
                  comunicación y organización de tu edificio o condominio.
                </p>
                <img class="w-full rounded-lg"
                  src="https://images.pexels.com/photos/3183159/pexels-photo-3183159.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Imagen de gestión de inquilinos/propietarios">
              </div>

              <!-- Right Section (Puntos Clave) -->
              <div class="flex flex-col items-center w-full p-6 bg-white rounded-lg shadow-md md:w-1/3">
                <h3 class="mb-4 text-2xl font-semibold text-emerald-800">Beneficios de Gestionar desde Aquí</h3>
                <ul class="pl-5 space-y-3 text-lg list-disc">
                  <li>Poder dar anuncios fácilmente a todos los inquilinos/propietarios.</li>
                  <li>Ver los comentarios, sugerencias o quejas de los inquilinos/propietarios.</li>
                  <li>Monitorear el estado de las solicitudes y mantenimiento de manera centralizada.</li>
                  <li>Acceder a reportes detallados sobre la gestión y estado del edificio.</li>
                  <li>Mejorar la comunicación con los inquilinos/propietarios a través de una plataforma única.</li>
                </ul>
              </div>
            </div>

            <!-- Llamado a la acción -->
            <div class="mt-12 text-center">
              <RouterLink class="px-4 py-2 text-xl text-white rounded bg-sky-800" :to="{ name: 'register' }">Registrarse
                Ahora</RouterLink>
            </div>
          </div>
        </section>
        <section class="py-12 bg-gray-100 font-poppins">
          <div class="container px-6 mx-auto">
            <!-- Título y Resumen -->
            <div class="flex flex-wrap items-center justify-between space-x-6 md:flex-nowrap">
              <!-- Right Section (Puntos Clave) -->
              <div class="w-full p-6 bg-white border rounded-lg shadow-md md:w-1/3 border-sky-800">
                <h3 class="mb-4 text-2xl font-semibold text-sky-800">Gestiona de Forma Más Fácil desde Tu Móvil</h3>
                <ul class="pl-5 space-y-3 text-lg list-disc">
                  <li>Accede a todos los anuncios de tus inquilinos desde cualquier lugar.</li>
                  <li>Recibe y responde a comentarios, sugerencias o quejas directamente desde tu teléfono.</li>
                  <li>Visualiza el estado de solicitudes y mantenimiento al instante.</li>
                  <li>Consulta reportes y gestiona el control de tu edificio o condominio sin necesidad de estar frente
                    a una computadora.</li>
                  <li>La plataforma es 100% compatible en móviles y tablets, ¡disponible para iOS y Android!</li>
                </ul>
              </div>

              <!-- Left Section -->
              <div class="w-full md:w-2/3">
                <h2 class="mb-4 text-3xl font-semibold text-sky-800">Prueba la Aplicación en Tu Teléfono</h2>
                <p class="mb-6 text-lg">
                  Ahora, puedes gestionar todo de manera aún más fácil y rápida con nuestra aplicación móvil. La app
                  está disponible tanto en la <strong>Play Store</strong> como en la <strong>App Store</strong>.
                  ¡Descárgala hoy mismo y comienza a disfrutar de un control total sobre tus inquilinos y empleados, sin
                  importar donde te encuentres!
                </p>
                <p class="mb-6 text-lg">
                  Crear tu cuenta es fácil y rápido; solo te tomará unos minutos. Además, toda la información que
                  manejas en la página web está sincronizada y es cross-platform, lo que significa que podrás acceder a
                  tus datos desde tu móvil, tablet o computadora sin problema alguno.
                </p>
                <!-- <img class="object-cover mb-6 w-72 h-72" src="https://via.placeholder.com/300x300" alt="Imagen de gestión en móvil"> -->
                <div class="flex flex-wrap justify-between md:flex-nowrap">
                  <img
                    src="data:image/png;base64,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"
                    alt="">
                  <img src="https://techcrunch.com/wp-content/uploads/2013/08/appstore.png" class="w-1/2" alt="">
                </div>
              </div>
            </div>

            <!-- Llamado a la acción -->
            <div class="mt-12 text-center">
              <RouterLink :to="{ name: 'home' }"
                class="px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                <i class="mr-2 fas fa-download"></i>
                Descarga la app y regístrate
              </RouterLink>
            </div>
          </div>
        </section>

        <div id="comments" class="slider">
          <div class="slide-track">
            <div class="slide">
              <CommentIlustrative img="https://via.placeholder.com/150" name="Laura Martínez"
                description="Gracias a la app" date="Enero 15, 2025" rating="⭐⭐⭐⭐⭐"
                comment="Gracias a la aplicación pude gestionar mi condominio de manera más eficiente. Todo es más fácil con las herramientas que ofrece." />
            </div>
            <div class="slide">
              <CommentIlustrative img="https://via.placeholder.com/150" name="Antonio Pérez"
                description="Excelente plataforma" date="Enero 12, 2025" rating="⭐⭐⭐⭐"
                comment="La página es muy útil. Pude expresar mi opinión sobre mi administrador y obtener una respuesta rápida. Muy buena experiencia." />
            </div>
            <div class="slide">
              <CommentIlustrative img="https://via.placeholder.com/150" name="Sandra González"
                description="Buena solución" date="Diciembre 30, 2024" rating="⭐⭐⭐⭐"
                comment="El sitio me ayudó a organizar mejor mi condominio. El administrador ha sido amable, pero la app hizo todo más fácil." />
            </div>
            <div class="slide">
              <CommentIlustrative img="https://via.placeholder.com/150" name="David Ruiz"
                description="No tan buena experiencia" date="Diciembre 20, 2024" rating="⭐⭐⭐"
                comment="No tuve una buena experiencia con la administración. No respondieron a tiempo, aunque la página me permitió dejar mi comentario." />
            </div>
            <div class="slide">
              <CommentIlustrative img="https://via.placeholder.com/150" name="Mónica Sánchez"
                description="Experiencia positiva" date="Diciembre 10, 2024" rating="⭐⭐⭐⭐⭐"
                comment="Tuve una experiencia muy positiva con la administradora. Siempre estuvo disponible y la plataforma me permitió dar feedback fácilmente." />
            </div>
            <div class="slide">
              <CommentIlustrative img="https://via.placeholder.com/150" name="Javier Gómez"
                description="Satisfacción completa" date="Noviembre 30, 2024" rating="⭐⭐⭐⭐⭐"
                comment="Estoy muy contento con la gestión de mi condominio. La plataforma facilitó la comunicación, ¡todo ha sido perfecto!" />
            </div>
            <div class="slide">
              <CommentIlustrative img="https://via.placeholder.com/150" name="Patricia López"
                description="Un gran apoyo" date="Noviembre 15, 2024" rating="⭐⭐⭐⭐"
                comment="La página ha sido un gran apoyo para gestionar todo en mi condominio. Mi administrador se ha mostrado siempre dispuesto a ayudar." />
            </div>
            <div class="slide">
              <CommentIlustrative img="https://via.placeholder.com/150" name="Carlos Álvarez"
                description="Súper fácil de usar" date="Octubre 25, 2024" rating="⭐⭐⭐⭐"
                comment="La plataforma es muy fácil de usar. Pude comunicarme rápidamente con mi administrador y gestionar los pagos sin problemas." />
            </div>
            <div class="slide">
              <CommentIlustrative img="https://via.placeholder.com/150" name="Beatriz Romero"
                description="Más organización" date="Octubre 10, 2024" rating="⭐⭐⭐⭐⭐"
                comment="La app me ha ayudado a organizar mucho mejor las cosas en el condominio. Gracias a la plataforma, todo ha sido mucho más eficiente." />
            </div>
            <div class="slide">
              <CommentIlustrative img="https://via.placeholder.com/150" name="Fernando Díaz"
                description="Un mal administrador" date="Septiembre 5, 2024" rating="⭐⭐"
                comment="Tuve una mala experiencia con mi administrador. A pesar de mis quejas en la página, no recibí una respuesta rápida. Necesito mejorar la comunicación." />
            </div>
          </div>
        </div>

        <!-- <h3 class="mt-2 text-xs text-end font-poppins text-slate-600">ⓘ Experiencias representativas de personas que
              eligen opciones naturales para su bienestar.</h3> -->


        <section class="container px-4 py-8 mx-auto font-poppins">
          <div class="flex flex-col justify-between sm:flex-row">
            <!-- Div 1: Título, Resumen y Lista -->
            <div class="flex flex-col items-center justify-center w-full mb-6 sm:w-1/2 sm:mb-0">
              <h2 class="mb-4 text-2xl font-semibold text-rose-800">Elige la versión que más te convenga</h2>
              <h3 class="mb-4 text-lg">Con nuestra plataforma, puedes elegir entre la versión web o la aplicación móvil.
                Ambos son multiplataforma y tus datos se sincronizan automáticamente.</h3>
              <ul class="pl-5 list-disc">
                <li>Control total de tu condominio</li>
                <li>Acceso a todas las funciones desde cualquier dispositivo</li>
                <li>Actualizaciones constantes y mejoras</li>
                <li>Gestión de tus empleados fácilmente</li>
                <li>Seguridad y protección de datos</li>
                <li>Soporte al cliente eficiente y rápido</li>
              </ul>
            </div>

            <!-- Div 2: Tarjetas -->
            <div class="grid w-full grid-cols-1 gap-6 sm:w-1/2 sm:grid-cols-2 lg:grid-cols-3">
              <!-- Beneficios del Administrador -->
              <!-- Card 1 -->
              <div class="p-4 text-center bg-white border rounded-lg shadow-lg border-rose-700">
                <h4 class="mb-2 text-xl font-semibold text-rose-700">Dar anuncios</h4>
                <p class="text-sm">Permite al administrador comunicar información importante a todos los propietarios de
                  manera eficiente.</p>
              </div>
              <!-- Card 2 -->
              <div class="p-4 text-center bg-white border rounded-lg shadow-lg border-rose-700">
                <h4 class="mb-2 text-xl font-semibold text-rose-700">Crear encuestas</h4>
                <p class="text-sm">Facilita la toma de decisiones mediante encuestas rápidas y efectivas para los
                  propietarios.</p>
              </div>
              <!-- Card 3 -->
              <div class="p-4 text-center bg-white border rounded-lg shadow-lg border-rose-700">
                <h4 class="mb-2 text-xl font-semibold text-rose-700">Ver comentarios</h4>
                <p class="text-sm">Accede a los comentarios de los propietarios para estar al tanto de sus opiniones y
                  sugerencias.</p>
              </div>
              <!-- Beneficios del Propietario -->
              <!-- Card 4 -->
              <div class="p-4 text-center bg-white border rounded-lg shadow-lg border-rose-700">
                <h4 class="mb-2 text-xl font-semibold text-rose-700">Votar en encuestas</h4>
                <p class="text-sm">Participa en las decisiones del condominio mediante el voto en encuestas creadas por
                  el administrador.</p>
              </div>
              <!-- Card 5 -->
              <div class="p-4 text-center bg-white border rounded-lg shadow-lg border-rose-700">
                <h4 class="mb-2 text-xl font-semibold text-rose-700">Ver anuncios</h4>
                <p class="text-sm">Mantente informado sobre las actualizaciones y noticias importantes del condominio.
                </p>
              </div>
              <!-- Card 6 -->
              <div class="p-4 text-center bg-white border rounded-lg shadow-lg border-rose-700">
                <h4 class="mb-2 text-xl font-semibold text-rose-700">Reportar fallas</h4>
                <p class="text-sm">Informa rápidamente al administrador sobre problemas o fallas en el condominio.</p>
              </div>
            </div>

          </div>
        </section>
        <section class="container px-4 py-8 mx-auto font-poppins">
          <div class="flex flex-col justify-between sm:flex-row ">
            <!-- Div 1: Tarjetas -->
            <div class="grid w-full grid-cols-1 gap-6 mb-6 sm:w-1/2 sm:grid-cols-2 lg:grid-cols-3 sm:mb-0">
              <!-- Card 1 -->
              <div class="p-4 text-center bg-white border border-orange-700 rounded-lg shadow-lg">
                <h4 class="mb-2 text-xl font-semibold text-orange-700">Gestión en Movimiento</h4>
                <p class="text-sm">Con la app móvil, puedes realizar tareas clave como registrar pagos, revisar reportes
                  o asignar tareas mientras te desplazas.</p>
              </div>
              <!-- Card 2 -->
              <div class="p-4 text-center bg-white border border-orange-700 rounded-lg shadow-lg">
                <h4 class="mb-2 text-xl font-semibold text-orange-700 break-all">Notificaciones Instantáneas</h4>
                <p class="text-sm">Recibe alertas en tiempo real sobre actividades importantes, como avisos de pago o
                  cambios en el calendario de eventos del condominio.</p>
              </div>
              <!-- Card 3 -->
              <div class="p-4 text-center bg-white border border-orange-700 rounded-lg shadow-lg">
                <h4 class="mb-2 text-xl font-semibold text-orange-700">Diseño Intuitivo</h4>
                <p class="text-sm">La interfaz móvil está diseñada para ser fácil de usar, permitiéndote acceder
                  rápidamente a las funciones que necesitas sin complicaciones.</p>
              </div>
              <!-- Card 4 -->
              <div class="p-4 text-center bg-white border border-orange-700 rounded-lg shadow-lg">
                <h4 class="mb-2 text-xl font-semibold text-orange-700">Soporte en Todo Momento</h4>
                <p class="text-sm">Nuestro equipo de soporte está disponible a través de la app para resolver cualquier
                  problema que enfrentes en minutos.</p>
              </div>
              <!-- Card 5 -->
              <div class="p-4 text-center bg-white border border-orange-700 rounded-lg shadow-lg">
                <h4 class="mb-2 text-xl font-semibold text-orange-700 break-all">Sincronización Automática</h4>
                <p class="text-sm">Todo lo que hagas en la app móvil se sincroniza al instante con la plataforma web,
                  asegurando que no pierdas información.</p>
              </div>
              <!-- Card 6 -->
              <div class="p-4 text-center bg-white border border-orange-700 rounded-lg shadow-lg">
                <h4 class="mb-2 text-xl font-semibold text-orange-700">Acceso Seguro</h4>
                <p class="text-sm">La aplicación está protegida con cifrado avanzado, garantizando que tus datos
                  personales y los del condominio estén seguros.</p>
              </div>
            </div>

            <!-- Div 2: Título, Resumen y Lista -->
            <div class="flex flex-col items-center justify-center w-full sm:w-1/2">
              <h2 class="mb-4 text-2xl font-semibold text-orange-700">Disfruta de los beneficios de la app móvil</h2>
              <h3 class="px-3 mb-4 text-center">Nuestra aplicación para dispositivos móviles está diseñada para
                brindarte comodidad, rapidez y control en la gestión de tu condominio, sin importar dónde estés.</h3>
              <ul class="pl-5 list-disc">
                <li>Realiza tareas administrativas de manera ágil y sencilla.</li>
                <li>Recibe recordatorios y notificaciones importantes en tiempo real.</li>
                <li>Accede a reportes y estadísticas al instante.</li>
                <li>Administra a tu equipo de trabajo en cualquier momento.</li>
                <li>Acceso seguro desde cualquier dispositivo móvil.</li>
                <li>Sincronización perfecta entre la versión web y la app móvil.</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="container px-4 py-8 mx-auto font-poppins">
          <div class="flex flex-col justify-between sm:flex-row">
            <!-- Div 1: Título, Resumen y Lista -->
            <div class="flex flex-col items-center w-full mb-6 justify-evenly sm:w-1/2 sm:mb-0">
              <h2 class="mb-4 text-2xl font-semibold break-all text-emerald-700">Elige la versión que más te convenga
              </h2>
              <h3 class="mb-4 text-lg">Con nuestra plataforma, puedes elegir entre la versión web o la aplicación móvil.
                Ambos son multiplataforma y tus datos se sincronizan automáticamente.</h3>
              <ul class="pl-5 list-disc">
                <li>Control total de tu condominio</li>
                <li>Acceso a todas las funciones desde cualquier dispositivo</li>
                <li>Actualizaciones constantes y mejoras</li>
                <li>Gestión de tus empleados fácilmente</li>
                <li>Seguridad y protección de datos</li>
                <li>Soporte al cliente eficiente y rápido</li>
              </ul>
            </div>

            <!-- Div 2: Tarjetas -->
            <div class="grid w-full grid-cols-1 gap-6 sm:w-1/2 sm:grid-cols-2 lg:grid-cols-3">
              <!-- Card 1 -->
              <div class="p-4 text-center bg-white border rounded-lg shadow-lg border-emerald-700">
                <h4 class="mb-2 text-xl font-semibold break-all text-emerald-700">Control Total de tu Condominio</h4>
                <p class="text-sm">Gestiona todos los aspectos de tu condominio desde cualquier dispositivo. Con nuestra
                  plataforma podrás administrar las tareas de mantenimiento, pago de servicios y más, sin importar donde
                  te encuentres.</p>
              </div>
              <!-- Card 2 -->
              <div class="p-4 text-center bg-white border rounded-lg shadow-lg border-emerald-700">
                <h4 class="mb-2 text-xl font-semibold break-all text-emerald-700">Acceso Multiplataforma</h4>
                <p class="text-sm">Accede a todas las funcionalidades de la plataforma desde cualquier dispositivo: ya
                  sea desde tu computador, teléfono móvil o tablet. Sincronización automática de datos en todos tus
                  dispositivos.</p>
              </div>
              <!-- Card 3 -->
              <div class="p-4 text-center bg-white border rounded-lg shadow-lg border-emerald-700">
                <h4 class="mb-2 text-xl font-semibold break-all text-emerald-700 ">Actualizaciones Constantes</h4>
                <p class="text-sm">Nuestra plataforma está en constante mejora, ofreciéndote nuevas características y
                  optimizaciones, garantizando una experiencia más fluida y eficiente para la gestión de tu condominio.
                </p>
              </div>
              <!-- Card 4 -->
              <div class="p-4 text-center bg-white border rounded-lg shadow-lg border-emerald-700">
                <h4 class="mb-2 text-xl font-semibold break-all text-emerald-700">Gestión de Empleados Simplificada</h4>
                <p class="text-sm">Lleva un control detallado de tus empleados, asigna tareas, revisa reportes y
                  gestiona horarios. Con nuestras herramientas, administrar tu equipo será más fácil que nunca.</p>
              </div>
              <!-- Card 5 -->
              <div class="p-4 text-center bg-white border rounded-lg shadow-lg border-emerald-700">
                <h4 class="mb-2 text-xl font-semibold break-all text-emerald-700">Seguridad Avanzada</h4>
                <p class="text-sm">Tu información está protegida con el más alto nivel de seguridad. Nuestra plataforma
                  cumple con las normas de seguridad más estrictas para garantizar que tus datos estén siempre a salvo.
                </p>
              </div>
              <!-- Card 6 -->
              <div class="p-4 text-center bg-white border rounded-lg shadow-lg border-emerald-700">
                <h4 class="mb-2 text-xl font-semibold break-all text-emerald-700">Soporte al Cliente Rápido</h4>
                <p class="text-sm">En todo momento, podrás contar con nuestro equipo de soporte para resolver cualquier
                  duda o inconveniente que tengas. Estamos aquí para ayudarte a gestionar tu condominio sin estrés.</p>
              </div>
            </div>

          </div>
        </section>

        <section class="flex flex-wrap justify-around">
          <NewsCard v-for="(news, index) in newsArr" :key="index" :title="news.title" :href="news.href"
            :summary="news.summary" :imgUrl="news.img" :source="news.source" />
        </section>
      </template>
    </MainLayout>
  </div>
</template>

<script lang="ts" setup>
import NewsCard from '@/components/NewsCard.vue';
import MainLayout from '../layouts/MainLayout.vue'
import CommentIlustrative from '@/components/animations/CommentIlustrative.vue';
import { RouterLink } from 'vue-router';
import { sysVals } from '@/stores/sysVals';
import QrCode from '@/components/Qr/QrCode.vue';


const newsArr = [
  {
    title: "Vivir en condominios: 6 de cada 10 mexicanos desconocen la normativa y estos son los riesgos",
    href: "https://www.eleconomista.com.mx/econohabitat/Vivir-en-condominios6-de-cada-10-mexicanos-desconocen-la-normativa-y-estos-son-los-riesgos-20230706-0010.html",
    summary: "Se estima que 30% de los condóminos ignoran la existencia de su reglamento y el resto sólo lo usa de forma que les sea conveniente.",
    img: "https://imagenes.eleconomista.com.mx/files/image_1000_1000/uploads/2023/07/06/66e86a1ce4418.jpeg",
    source: "El economista"
  },
  {
    title: "La Importancia de una Buena Administración de Condominios",
    href: "https://blog-casandra.com.mx/la-importancia-de-una-buena-administracion-de-condominios/",
    summary: "La administración de condominios es una tarea multifacética que implica la gestión efectiva de propiedades residenciales y comerciales compartidas por varios propietarios.",
    img: "https://blog-casandra.com.mx/wp-content/uploads/2024/07/La-Importancia-de-una-Buena-Administracion-de-Condominios-768x512.webp",
    source: "casandra.com.mx"
  },
  {
    title: "Condominios Constitución y las historias que hay detrás de este icónico lugar",
    href: "https://abcnoticias.mx/local/2022/10/21/condominios-constitucion-las-historias-que-hay-detras-de-este-iconico-lugar-173574.html",
    summary: "Los Condominios Constitución son un sitio muy conocido por todos los regiomontanos, pero pocos conocen su historia y cómo se transformó de un basurero en un complejo habitacional justo en el centro de la ciudad.",
    img: "https://abcnoticias.mx/u/fotografias/m/2022/10/21/f960x540-185753_259828_5050.jpg",
    source: "ABCNOTICIAS"
  },
  {
    title: "Congreso CDMX inicia proceso para actualizar Ley de Propiedad en Condominio",
    href: "https://oem.com.mx/la-prensa/metropoli/congreso-reformara-la-ley-de-propiedad-en-condominio-20874516",
    summary: "Diputados que forman parte de la Comisión de Unidades Habitacionales y Régimen Condominal del Congreso de la Ciudad de México, estuvieron de acuerdo en emprender todo un trabajo en torno a la construcción de una nueva legislación en la materia.",
    img: "https://oem.com.mx/la-prensa/img/14072351/1719492709/BASE_LANDSCAPE/768/001.webp",
    source: "Organización Editorial Mexicana-OEM"
  },
  {
    title: "Condominios, el mayor problema en la reconstrucción de Acapulco",
    href: "https://www.milenio.com/estados/condominios-el-mayor-problema-en-la-reconstruccion-de-acapulco",
    summary: "A un año del impacto de Otis, la reconstrucción de Acapulco ha logrado avances en la mayoría de los rubros. La amenaza que representó el huracán John no frenó la recuperación de hoteles, restaurantes, bares y hasta de la vivienda popular.",
    img: "https://images.milenio.com/uq6apqPnoMSrkz4piasuRvenwDk=/345x194/uploads/media/2024/10/20/cumplen-meses-llegada-huracan-otis.jpg",
    source: "Milenio"
  },
  {
    title: "Conoce los derechos y obligaciones de los condominios en México",
    href: "https://www.inmuebles24.com/noticias/consejos/derechos-obligaciones-condominio/",
    summary: "En el marco actual de la vivienda en México, la adquisición de propiedades en condominios ha tomado el lugar de una de las opciones más convenientes para un gran número de personas.",
    img: "https://www.inmuebles24.com/noticias/wp-content/uploads/2024/10/Conoce-los-derechos-y-obligaciones-de-los-condominios-en-Mexico-1.jpeg",
    source: "inmuebles24"
  }
];


</script>

<style scoped lang="scss">
.bg-gradient-to-r {
  background: linear-gradient(to bottom, #ffd4d4, #fde2e4);
}


@mixin white-gradient {
  background: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
}

$animationSpeed: 40s;

// Animation
@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-250px * 7))
  }
}


// Styling
.slider {
  background: #ffffff;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, .125);
  height: 200px;
  margin: auto;
  overflow: hidden;
  position: relative;
  width: 100vw;
  display: flex;
  gap: 4px;

  &::before,
  &::after {
    @include white-gradient;
    content: "";
    height: 200px;
    position: absolute;
    width: 200px;
    z-index: 2;
  }

  &::after {
    right: 0;
    top: 0;
    transform: rotateZ(180deg);
  }

  &::before {
    left: 0;
    top: 0;
  }

  .slide-track {
    animation: scroll $animationSpeed linear infinite;
    display: flex;
    gap: 25px;
    align-items: center;
    width: calc(250px * 14);
  }

  .slide {
    // height: 100px;
    // width: 250px;
  }
}
</style>
