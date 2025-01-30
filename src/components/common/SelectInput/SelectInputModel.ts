// TODO Options might need a new unique which gets updated on every time i want to re-render the below options
export interface Option {
    optionLabel: any;
    label: string;
    value: string | number;
    disabled?: boolean;
    selected?: boolean;
  }
  