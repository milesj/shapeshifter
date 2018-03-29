import FlowRenderer from '../src/renderers/Flow';
import ReactRenderer from '../src/renderers/React';
import RendererFactory from '../src/RendererFactory';
import TypeScriptRenderer from '../src/renderers/TypeScript';
import { options } from './mocks';

describe('RendererFactory', () => {
  describe('factory()', () => {
    it('factories renderer objects', () => {
      expect(
        RendererFactory.factory({
          ...options,
          renderer: 'flow',
        }),
      ).toBeInstanceOf(FlowRenderer);

      expect(
        RendererFactory.factory({
          ...options,
          renderer: 'ReAcT',
        }),
      ).toBeInstanceOf(ReactRenderer);

      expect(
        RendererFactory.factory({
          ...options,
          renderer: 'TYPESCRIPT',
        }),
      ).toBeInstanceOf(TypeScriptRenderer);
    });

    it('errors for invalid renderer', () => {
      expect(() =>
        RendererFactory.factory({
          ...options,
          renderer: 'foo',
        }),
      ).toThrowError('Renderer "foo" not supported.');
    });
  });
});
