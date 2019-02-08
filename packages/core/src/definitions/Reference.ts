import optimal, { bool, string } from 'optimal';
import Definition from '../Definition';
import { Options, ReferenceConfig } from '../types';

export default class ReferenceDefinition extends Definition<ReferenceConfig> {
  constructor(options: Options, attribute: string, config: Partial<ReferenceConfig> = {}) {
    super(options, attribute, config, false);

    this.config = optimal(
      this.config,
      {
        export: bool(true),
        nullable: bool(),
        optional: bool(),
        reference: string().xor('self'),
        relation: string(),
        self: bool().xor('reference'),
        subset: string(),
        type: string('reference'),
      },
      {
        name: 'ReferenceDefinition',
        unknown: true,
      },
    );
  }
}
