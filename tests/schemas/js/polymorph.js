module.exports = {
  name: 'Polymorph',
  references: {
    PolymorphVideo: './polymorph-video.js',
  },
  shapes: {
    Image: {
      url: 'string',
    },
  },
  attributes: {
    item: {
      type: 'polymorph',
      valueTypes: [
        {
          type: 'shape',
          reference: 'Image',
        },
        {
          type: 'reference',
          reference: 'PolymorphVideo',
        },
      ],
    },
  },
};
