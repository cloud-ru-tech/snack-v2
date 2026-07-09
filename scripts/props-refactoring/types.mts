export type PropDef = {
  type: string;
  values?: string[];
  defaultValue?: string;
  description?: string;
  required: boolean;
  typeRefs?: string[];
};

export type ComponentDoc = {
  displayName: string;
  propsTypeName: string | null;
  description?: string;
  props: Record<string, PropDef>;
  relatedTypes?: Record<string, unknown>;
};

export type PropsJson = Record<string, ComponentDoc>;
