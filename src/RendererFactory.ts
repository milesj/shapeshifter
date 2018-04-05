/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import Schematic from './Schematic';
import Builder from './Builder';
import Renderer from './Renderer';
import FlowRenderer from './renderers/Flow';
import PropTypesRenderer from './renderers/PropTypes';
import TypeScriptRenderer from './renderers/TypeScript';
import { Options, RendererType } from './types';

export default class RendererFactory {
  /**
   * Create a new renderer with the defined schematic.
   */
  static factory(
    renderer: RendererType,
    options: Options,
    builder: Builder,
    schematic: Schematic,
  ): Renderer {
    switch (renderer.toLowerCase()) {
      case 'flow':
        return new FlowRenderer(options, builder, schematic);

      case 'prop-types':
        return new PropTypesRenderer(options, builder, schematic);

      case 'typescript':
        return new TypeScriptRenderer(options, builder, schematic);

      default:
        throw new Error(`Renderer "${renderer || 'unknown'}" not supported.`);
    }
  }
}
