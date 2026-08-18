export type TerminalInputProps = {
  onSubmit: (input: string) => void;
  disabled?: boolean;
  history?: string[];
  onNavigateHistory?: (value: string) => void;
  onAutocomplete?: () => string | null;
};
