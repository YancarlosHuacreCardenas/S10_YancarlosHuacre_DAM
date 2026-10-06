export function validarNombre(nombre: string): boolean {
  return nombre.trim().length >= 3;
}

export function validarCorreo(correo: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(correo.trim()) || (correo.includes('@') && correo.trim().length >= 5);
}

export function validarCurso(curso: string): boolean {
  return curso.trim().length >= 3;
}

export function validarEdad(edad: string): boolean {
  const numero = Number(edad);
  return !isNaN(numero) && numero >= 16 && numero <= 99;
}