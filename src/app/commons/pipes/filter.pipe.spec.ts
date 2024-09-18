import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;
  let items = [
    { name: 'Producto 1' },
    { name: 'Producto 2' },
    { name: 'Producto 3' }
  ];

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('debe crear la pipe correctamente', () => {
    expect(pipe).toBeTruthy();
  });

  it('debe retornar todos los elementos si no se pasa valor de filtro', () => {

    const filteredItems = pipe.transform(items, '');
    expect(filteredItems.length).toBe(3);
    expect(filteredItems).toEqual(items);
  });

  it('debe filtrar elementos correctamente según el valor del filtro', () => {

    const filteredItems = pipe.transform(items, 'Producto 1');
    expect(filteredItems.length).toBe(1);
    expect(filteredItems[0].name).toBe('Producto 1');
  });

  it('debe filtrar correctamente sin distinguir mayúsculas y minúsculas', () => {

    const filteredItems = pipe.transform(items, 'producto');
    expect(filteredItems.length).toBe(3);
  });

  it('debe retornar un array vacío si ningún elemento coincide con el filtro', () => {

    const filteredItems = pipe.transform(items, 'Producto 4');
    expect(filteredItems.length).toBe(0);
  });
});
