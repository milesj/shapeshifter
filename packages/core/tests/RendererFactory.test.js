import FlowRenderer from '../src/renderers/Flow';
import PropTypesRenderer from '../src/renderers/PropTypes';
import RendererFactory from '../src/RendererFactory';
import TypeScriptRenderer from '../src/renderers/TypeScript';
import { options } from '../../../tests/mocks';

describe('RendererFactory', () => {
  describe('factory()', () => {
    it('factories renderer objects', () => {
      expect(RendererFactory.factory('flow', options)).toBeInstanceOf(FlowRenderer);

      expect(RendererFactory.factory('prop-TYPES', options)).toBeInstanceOf(PropTypesRenderer);

      expect(RendererFactory.factory('typeSCRIPT', options)).toBeInstanceOf(TypeScriptRenderer);
    });

    it('errors for invalid renderer', () => {
      expect(() => RendererFactory.factory('foo', options)).toThrowError(
        'Renderer "foo" not supported.',
      );
    });
  });
});
