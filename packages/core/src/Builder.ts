export type TemplateList = Set<string>;

export type TemplateMap = Map<string, string>;

export default class Builder {
  imports: TemplateList = new Set();

  comments: TemplateList = new Set();

  constants: TemplateList = new Set();

  header: TemplateList = new Set();

  sets: TemplateList = new Set();

  schemas: TemplateMap = new Map();

  relations: TemplateList = new Set();
}
