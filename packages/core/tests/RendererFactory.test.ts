import FlowRenderer from '../src/renderers/Flow';
import PropTypesRenderer from '../src/renderers/PropTypes';
import RendererFactory from '../src/RendererFactory';
import TypeScriptRenderer from '../src/renderers/TypeScript';
import Builder from '../src/Builder';
import Schematic from '../src/Schematic';
import { options } from '../../../tests/mocks';

describe('RendererFactory', () => {
  describe('factory()', () => {
    const schematic = new Schematic('', { attributes: { id: 'key' }, name: 'TestSchema' }, options);

    it('factories renderer objects', () => {
      expect(RendererFactory.factory('flow', options, new Builder(), schematic)).toBeInstanceOf(
        FlowRenderer,
      );

      expect(
        RendererFactory.factory('prop-types', options, new Builder(), schematic),
      ).toBeInstanceOf(PropTypesRenderer);

      expect(
        RendererFactory.factory('typescript', options, new Builder(), schematic),
      ).toBeInstanceOf(TypeScriptRenderer);
    });

    it('errors for invalid renderer', () => {
      // @ts-ignore
      expect(() => RendererFactory.factory('foo', options, new Builder(), schematic)).toThrowError(
        'Renderer "foo" not supported.',
      );
    });
  });
});
