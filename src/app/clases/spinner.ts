export class Spinner {
  static mostrarSpiner(){
    let spinner = document.querySelector(".spinner");
    // @ts-ignore
    spinner.classList.add("d-block");
    // @ts-ignore
    spinner.classList.remove("d-none");
  }
  static ocultarSpinner(){

    let spinner = document.querySelector(".spinner");
    // @ts-ignore
    spinner.classList.add("d-none");
    // @ts-ignore
    spinner.classList.remove("d-block");

  }
}
