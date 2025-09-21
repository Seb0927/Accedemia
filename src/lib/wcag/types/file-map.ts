export interface WcagFileMapping {
  file: string;
}

export interface WcagFileMap {
  [principleNum: string]: {
    [guidelineNum: string]: {
      [criteriaNum: string]: WcagFileMapping;
    };
  };
}