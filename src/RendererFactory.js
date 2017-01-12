/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import SchemaReader from './SchemaReader';
import Renderer from './Renderer';
import FlowRenderer from './renderers/Flow';
import ReactRenderer from './renderers/React';
import TypeScriptRenderer from './renderers/TypeScript';

import type { Options } from './types';

export default class RendererFactory {
  /**
   * Create a new renderer with the defined reader.
   *
   * @param {Object} options
   * @param {SchemaReader} reader
   * @returns {Renderer}
   */
  static factory(options: Options, reader: SchemaReader): Renderer {
    const { renderer } = options;

    switch (renderer.toLowerCase()) {
      case 'react':
        return new ReactRenderer(options, reader);

      case 'flow':
        return new FlowRenderer(options, reader);

      case 'typescript':
        return new TypeScriptRenderer(options, reader);

      default:
        throw new Error(`Renderer "${renderer || 'unknown'}" not supported.`);
    }
  }
}
