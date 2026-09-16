/**
 * Devuelve un saludo. Función pura: sin acceso al DOM, fácil de probar.
 */
export function greet(name: string): string {
  const trimmed = name.trim();
  return trimmed ? `Hola, ${trimmed}` : 'Hola, mundo';
}
