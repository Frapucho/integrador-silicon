/* proceso carrousel y login - cargar imagenes */
function Home() {
  return (
    <>
      <div id="carouselExampleCaptions" class="carousel slide">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://reddemediosmisiones.com.ar/download/multimedia.normal.83f10321ae72dbe1.53696c69636f6e2d4d6973696f6e65732d65313634303236343634383733365f6e6f726d616c2e6a7067.jpg"
              class="d-block w-100"
              alt="..."
              width="auto" height="800"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>Somos el futuro y vos sos parte</h5>
              <p>
                Silicon Misiones es un proyecto asociativo donde participan
                empresas de base tecnológica, universidades e institutos
                públicos y privados.
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://canal12misiones.com/wp-content/uploads/2022/07/WhatsApp-Image-2022-07-07-at-1.05.32-PM.jpeg"
              class="d-block w-100"
              alt="..."
              width="auto" height="800"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>
                Promovemos el desarrollo, la capacitación y la expansión de
                vocaciones tecnológicas.
              </h5>
              <p>
                Investigamos soluciones y aplicamos la ciencia para obtener
                soluciones concretas a las necesidades de los distintos sectores
                de la sociedad misionera.
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://siliconmisiones.gob.ar/wp-content/uploads/2022/05/1-2-1024x683.jpg"
              class="d-block w-100"
              alt="..."
              width="auto" height="800"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5></h5>
              <p></p>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default Home;
