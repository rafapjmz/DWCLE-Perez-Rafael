import { describe, expect, it } from 'vitest';
import { greet } from './greeting';

describe('greet', () => {
  it('saluda por el nombre', () => {
    expect(greet('Carlos')).toBe('Hola, Carlos');
  });

  it('saluda al mundo si el nombre está vacío', () => {
    expect(greet('   ')).toBe('Hola, mundo');
  });
});
