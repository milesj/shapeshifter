/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Schematic from './Schematic';
import Renderer from './Renderer';
import FlowRenderer from './renderers/Flow';
import ReactRenderer from './renderers/React';
import TypeScriptRenderer from './renderers/TypeScript';

import type { Options } from './types';

export default class RendererFactory {

  /**
   * Create a new renderer with the defined schematic.
   */
  static factory(options: Options, schematic: Schematic): Renderer {
    const { renderer } = options;

    switch (renderer.toLowerCase()) {
      case 'react':
        return new ReactRenderer(options, schematic);

      case 'flow':
        return new FlowRenderer(options, schematic);

      case 'typescript':
        return new TypeScriptRenderer(options, schematic);

      default:
        throw new Error(`Renderer "${renderer || 'unknown'}" not supported.`);
    }
  }
}
