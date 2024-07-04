

const colorNames = [
  'amber',
  'blue',
  'cyan',
  'deepOrange',
  'deepPurple',
  'green',
  'grey',
  'indigo',
  'lightGreen',
  'lime',
  'orange',
  'pink',
  'purple',
  'red',
  'teal',
  'yellow',
];

const fileGroupThemes = {
  image: {
    icon: 'image',
    color: 'green500',
    colorName: 'green',
    colorShade: 500,
  },
  audio: {
    icon: 'music-box',
    color: 'pink400',
    colorName: 'pink',
    colorShade: 400,
  },
  video: {
    icon: 'movie',
    color: 'deepOrange500',
    colorName: 'deepOrange',
    colorShade: 500,
  },
  word: {
    icon: 'file-word-box',
    color: 'blue500',
    colorName: 'blue',
    colorShade: 500,
  },
  powerpoint: {
    icon: 'file-powerpoint-box',
    color: 'orange500',
    colorName: 'orange',
    colorShade: 500,
  },
  excel: {
    icon: 'file-excel-box',
    color: 'green500',
    colorName: 'green',
    colorShade: 500,
  },
  text: {
    icon: 'pencil-box',
    color: 'lightBlue500',
    colorName: 'lightBlue',
    colorShade: 500,
  },
  pdf: {
    icon: 'file-pdf-box',
    color: 'red600',
    colorName: 'red',
    colorShade: 600,
  },
  compressed: {
    icon: 'zip-box',
    color: 'brown600',
    colorName: 'brown',
    colorShade: 600,
  },
  folder: {
    icon: 'folder',
    color: 'blueGrey600',
    colorName: 'blueGrey',
    colorShade: 600,
  },
  unknown: {
    icon: 'help-box',
    color: 'grey800',
    colorName: 'grey',
    colorShade: 800,
  },
};

const partitionTypeThemes = {
  pro: {
    icon: 'cloud',
    color: 'teal600',
    colorName: 'teal',
    colorShade: 600,
  },
  s3: {
    icon: 'shape',
    color: 'red500',
    colorName: 'red',
    colorShade: 500,
  },
};

export function borderRadius(top, right, bottom, left) {
  if (!right && !bottom && !left) {
    return {
      borderRadius: top,
    };
  }

  if (Number.isNaN(bottom) && Number.isNaN(left)) {
    return {
      borderTopLeftRadius: top,
      borderBottomRightRadius: right,
    };
  }

  return {
    borderTopLeftRadius: top,
    borderTopRightRadius: right,
    borderBottomRightRadius: bottom,
    borderBottomLeftRadius: left,
  };
}

export function position(type = 'absolute', top, right, bottom, left, zIndex) {
  return {
    position: type,
    top,
    right,
    bottom,
    left,
    zIndex,
  };
}



export function getPartitionTheme(partition = {}) {
  return partitionTypeThemes[partition.category];
}

export function conditionalStyler(styles = {}, pureStyles = [], conditionalStyleNames = {}) {
  const computedConditionalStyles = [];

  Object.keys(conditionalStyleNames).forEach((styleName) => {
    if (conditionalStyleNames[styleName]) {
      computedConditionalStyles.push(styles[styleName]);
    }
  });

  return [
    ...pureStyles,
    ...computedConditionalStyles,
  ];
}

export function absCenterMixin(zIndex = 1) {
  return {
    ...position('absolute', 0, 0, 0, 0, zIndex),
    margin: 'auto',
  };
}

export function getIdenticalColor(identifier = '') {
  if (!identifier) {
    return colorNames[1];
  }

  const numberMatches = identifier.match(/\d/g);

  const middleNumber = Math.round(numberMatches.length / 2);
  const colorIndex = numberMatches[middleNumber];

  const colorName = colorNames[colorIndex];

  return colorName;
}
