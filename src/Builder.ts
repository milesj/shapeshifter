/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

export type TemplateList = Set<string>;

export default class Builder {
  imports: TemplateList = new Set();

  comments: TemplateList = new Set();

  constants: TemplateList = new Set();

  header: TemplateList = new Set();

  sets: TemplateList = new Set();

  schemas: TemplateList = new Set();

  relations: TemplateList = new Set();
}
